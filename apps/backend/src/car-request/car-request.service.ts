import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarRequest } from './entities/car-request.entity';
import { CarRequestState } from './entities/car-request-state.entity';
import { CarRequestStatus } from './entities/car-request-status.entity';
import { CarRequestLog } from './entities/car-request-log.entity';
import { CreateCarRequestInput } from './dto/create-car-request.input';
import { UpdateCarRequestInput } from './dto/update-car-request.input';
import { CreateCarRequestLogInput } from './dto/create-car-request-log.input';
import { CarRequestLogFilterInput } from './dto/car-request-log-filter.input';
import { CarRequestLogAction } from './enums/car-request-log-action.enum';

@Injectable()
export class CarRequestService {
  constructor(
    @InjectRepository(CarRequest)
    private readonly carRequestRepository: Repository<CarRequest>,
    @InjectRepository(CarRequestState)
    private readonly carRequestStateRepository: Repository<CarRequestState>,
    @InjectRepository(CarRequestStatus)
    private readonly carRequestStatusRepository: Repository<CarRequestStatus>,
    @InjectRepository(CarRequestLog)
    private readonly carRequestLogRepository: Repository<CarRequestLog>,
  ) {}

  // === CREATE ===

  async create(input: CreateCarRequestInput): Promise<CarRequest> {
    const carRequest = this.carRequestRepository.create(input);
    const saved = await this.carRequestRepository.save(carRequest);
    return this.findOne(saved.id);
  }

  // === READ ===

  async findAll(limit?: number, offset?: number): Promise<CarRequest[]> {
    return this.carRequestRepository.find({
      relations: [
        'customer',
        'assignedAgent',
        'brand',
        'model',
        'leasingCompany',
        'status',
        'state',
      ],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: string): Promise<CarRequest> {
    const carRequest = await this.carRequestRepository.findOne({
      where: { id },
      relations: [
        'customer',
        'assignedAgent',
        'brand',
        'model',
        'leasingCompany',
        'status',
        'state',
        'logs',
        'logs.author',
      ],
      order: {
        logs: {
          createdAt: 'DESC',
        },
      },
    });

    if (!carRequest) {
      throw new NotFoundException(`Car request with ID ${id} not found`);
    }

    return carRequest;
  }

  // === UPDATE ===

  async update(
    id: string,
    input: UpdateCarRequestInput,
    authorId?: string,
  ): Promise<CarRequest> {
    const carRequest = await this.findOne(id);

    // Track changes for logging
    const oldStatusId = carRequest.statusId;
    const oldStateId = carRequest.stateId;
    const oldAgentId = carRequest.assignedAgentId;

    // Clear relations if IDs are being updated
    if (input.brandId !== undefined && input.brandId !== carRequest.brandId) {
      carRequest.brand = undefined;
    }
    if (input.modelId !== undefined && input.modelId !== carRequest.modelId) {
      carRequest.model = undefined;
    }
    if (input.leasingCompanyId !== undefined && input.leasingCompanyId !== carRequest.leasingCompanyId) {
      carRequest.leasingCompany = undefined;
    }
    if (input.customerId !== undefined && input.customerId !== carRequest.customerId) {
      carRequest.customer = undefined;
    }
    if (input.assignedAgentId !== undefined && input.assignedAgentId !== carRequest.assignedAgentId) {
      carRequest.assignedAgent = undefined;
    }
    if (input.statusId !== undefined && input.statusId !== carRequest.statusId) {
      carRequest.status = undefined;
    }
    if (input.stateId !== undefined && input.stateId !== carRequest.stateId) {
      carRequest.state = undefined;
    }

    Object.assign(carRequest, input);
    const saved = await this.carRequestRepository.save(carRequest);

    // Create log entries for important changes
    if (input.statusId !== undefined) {
      await this.logStatusChange(id, oldStatusId, input.statusId, authorId);
    }
    if (input.stateId !== undefined) {
      await this.logStateChange(id, oldStateId, input.stateId, authorId);
    }
    if (input.assignedAgentId !== undefined) {
      await this.logAssignmentChange(id, oldAgentId, input.assignedAgentId, authorId);
    }

    return this.findOne(saved.id);
  }

  // === DELETE ===

  async remove(id: string): Promise<boolean> {
    const carRequest = await this.findOne(id);
    await this.carRequestRepository.remove(carRequest);
    return true;
  }

  // === UTILITY ===

  async count(): Promise<number> {
    return this.carRequestRepository.count();
  }

  // === CAR REQUEST STATES ===

  async findAllStates(): Promise<CarRequestState[]> {
    return this.carRequestStateRepository.find({
      order: { code: 'ASC' },
    });
  }

  // === CAR REQUEST STATUSES ===

  async findAllStatuses(): Promise<CarRequestStatus[]> {
    return this.carRequestStatusRepository.find({
      order: { displayOrder: 'ASC' },
    });
  }

  // === CAR REQUEST LOGS ===

  /**
   * Create a new log entry for a car request
   */
  async createLog(input: CreateCarRequestLogInput): Promise<CarRequestLog> {
    const log = this.carRequestLogRepository.create(input);
    return this.carRequestLogRepository.save(log);
  }

  /**
   * Get logs for a car request with optional filtering
   */
  async getLogsByCarRequest(
    filter: CarRequestLogFilterInput,
  ): Promise<CarRequestLog[]> {
    const queryBuilder = this.carRequestLogRepository
      .createQueryBuilder('log')
      .leftJoinAndSelect('log.author', 'author')
      .orderBy('log.createdAt', 'DESC');

    if (filter.carRequestId) {
      queryBuilder.andWhere('log.carRequestId = :carRequestId', {
        carRequestId: filter.carRequestId,
      });
    }

    if (filter.actionTypes && filter.actionTypes.length > 0) {
      queryBuilder.andWhere('log.actionType IN (:...actionTypes)', {
        actionTypes: filter.actionTypes,
      });
    }

    if (filter.authorId) {
      queryBuilder.andWhere('log.authorId = :authorId', {
        authorId: filter.authorId,
      });
    }

    if (filter.startDate && filter.endDate) {
      queryBuilder.andWhere('log.createdAt BETWEEN :startDate AND :endDate', {
        startDate: filter.startDate,
        endDate: filter.endDate,
      });
    } else if (filter.startDate) {
      queryBuilder.andWhere('log.createdAt >= :startDate', {
        startDate: filter.startDate,
      });
    } else if (filter.endDate) {
      queryBuilder.andWhere('log.createdAt <= :endDate', {
        endDate: filter.endDate,
      });
    }

    return queryBuilder.getMany();
  }

  /**
   * Create a log entry for status change
   */
  async logStatusChange(
    carRequestId: string,
    oldStatusId: string | undefined,
    newStatusId: string | undefined,
    authorId?: string,
  ): Promise<void> {
    if (oldStatusId === newStatusId) return;

    await this.createLog({
      carRequestId,
      message: 'Status changed',
      actionType: CarRequestLogAction.STATUS_CHANGED,
      metadata: {
        oldStatusId,
        newStatusId,
      },
      authorId,
    });
  }

  /**
   * Create a log entry for state change
   */
  async logStateChange(
    carRequestId: string,
    oldStateId: string | undefined,
    newStateId: string | undefined,
    authorId?: string,
  ): Promise<void> {
    if (oldStateId === newStateId) return;

    await this.createLog({
      carRequestId,
      message: 'State changed',
      actionType: CarRequestLogAction.STATE_CHANGED,
      metadata: {
        oldStateId,
        newStateId,
      },
      authorId,
    });
  }

  /**
   * Create a log entry for assignment change
   */
  async logAssignmentChange(
    carRequestId: string,
    oldAgentId: string | undefined,
    newAgentId: string | undefined,
    authorId?: string,
  ): Promise<void> {
    if (oldAgentId === newAgentId) return;

    await this.createLog({
      carRequestId,
      message: newAgentId
        ? 'Agent assigned'
        : 'Agent unassigned',
      actionType: CarRequestLogAction.ASSIGNED,
      metadata: {
        oldAgentId,
        newAgentId,
      },
      authorId,
    });
  }
}
