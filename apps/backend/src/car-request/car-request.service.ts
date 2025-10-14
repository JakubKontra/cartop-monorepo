import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarRequest } from './entities/car-request.entity';
import { CreateCarRequestInput } from './dto/create-car-request.input';
import { UpdateCarRequestInput } from './dto/update-car-request.input';

@Injectable()
export class CarRequestService {
  constructor(
    @InjectRepository(CarRequest)
    private readonly carRequestRepository: Repository<CarRequest>,
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
      ],
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
  ): Promise<CarRequest> {
    const carRequest = await this.findOne(id);

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
}
