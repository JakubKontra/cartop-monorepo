import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeasingCompany } from './leasing-company.entity';
import { LeasingCompanyService } from './leasing-company.service';
import { LeasingCompanyAdminResolver } from './leasing-company-admin.resolver';
import { File } from '../file/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeasingCompany, File]), // Include File entity for logo relation
  ],
  providers: [LeasingCompanyService, LeasingCompanyAdminResolver],
  exports: [LeasingCompanyService],
})
export class LeasingCompanyModule {}
