import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRequest } from './entities/car-request.entity';
import { CarRequestStatus } from './entities/car-request-status.entity';
import { CarRequestState } from './entities/car-request-state.entity';
import { CarRequestLog } from './entities/car-request-log.entity';
import { CarRequestService } from './car-request.service';
import { CarRequestAdminResolver } from './car-request-admin.resolver';
import { User } from '../model/user/user.entity';
import { CatalogBrand } from '../catalog/brand/catalog-brand.entity';
import { CatalogModel } from '../catalog/model/catalog-model.entity';
import { LeasingCompany } from '../leasing-company/leasing-company.entity';
import { CarRequestCalculation } from '../car-request-calculation/entities/car-request-calculation.entity';
import { Onboarding } from '../onboarding/entities/onboarding.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarRequest,
      CarRequestStatus,
      CarRequestState,
      CarRequestLog,
      User,
      CatalogBrand,
      CatalogModel,
      LeasingCompany,
      CarRequestCalculation,
      Onboarding,
    ]),
  ],
  providers: [CarRequestService, CarRequestAdminResolver],
  exports: [CarRequestService],
})
export class CarRequestModule {}
