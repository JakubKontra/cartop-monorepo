import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeasingCompany } from './leasing-company.entity';
import { CreateLeasingCompanyInput } from './dto/create-leasing-company.input';
import { UpdateLeasingCompanyInput } from './dto/update-leasing-company.input';

@Injectable()
export class LeasingCompanyService {
  constructor(
    @InjectRepository(LeasingCompany)
    private readonly leasingCompanyRepository: Repository<LeasingCompany>,
  ) {}

  // === CREATE ===

  async create(input: CreateLeasingCompanyInput): Promise<LeasingCompany> {
    // Check if name already exists
    const existing = await this.leasingCompanyRepository.findOne({
      where: { name: input.name },
    });

    if (existing) {
      throw new ConflictException(
        `Leasing company with name "${input.name}" already exists`,
      );
    }

    const leasingCompany = this.leasingCompanyRepository.create(input);
    const saved = await this.leasingCompanyRepository.save(leasingCompany);
    return this.findOne(saved.id);
  }

  // === READ ===

  async findAll(): Promise<LeasingCompany[]> {
    return this.leasingCompanyRepository.find({
      relations: ['logo'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<LeasingCompany> {
    const leasingCompany = await this.leasingCompanyRepository.findOne({
      where: { id },
      relations: ['logo'],
    });

    if (!leasingCompany) {
      throw new NotFoundException(`Leasing company with ID ${id} not found`);
    }

    return leasingCompany;
  }

  async findByName(name: string): Promise<LeasingCompany | null> {
    return this.leasingCompanyRepository.findOne({
      where: { name },
      relations: ['logo'],
    });
  }

  // === UPDATE ===

  async update(
    id: string,
    input: UpdateLeasingCompanyInput,
  ): Promise<LeasingCompany> {
    const leasingCompany = await this.findOne(id);

    // Check name uniqueness if being updated
    if (input.name && input.name !== leasingCompany.name) {
      const existing = await this.findByName(input.name);
      if (existing) {
        throw new ConflictException(
          `Leasing company with name "${input.name}" already exists`,
        );
      }
    }

    Object.assign(leasingCompany, input);
    return this.leasingCompanyRepository.save(leasingCompany);
  }

  // === DELETE ===

  async remove(id: string): Promise<boolean> {
    const leasingCompany = await this.findOne(id);
    await this.leasingCompanyRepository.remove(leasingCompany);
    return true;
  }

  // === UTILITY ===

  async count(): Promise<number> {
    return this.leasingCompanyRepository.count();
  }
}
