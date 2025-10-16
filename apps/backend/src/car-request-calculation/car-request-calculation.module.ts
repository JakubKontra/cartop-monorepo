import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRequestCalculation } from './entities/car-request-calculation.entity';
import { CarRequestCalculationOffer } from './entities/car-request-calculation-offer.entity';
import { CarRequestCalculationItem } from './entities/car-request-calculation-item.entity';
import { CarRequestCalculationService } from './car-request-calculation.service';
import { CarRequestCalculationAdminResolver } from './car-request-calculation-admin.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarRequestCalculation,
      CarRequestCalculationOffer,
      CarRequestCalculationItem,
    ]),
  ],
  providers: [
    CarRequestCalculationService,
    CarRequestCalculationAdminResolver,
  ],
  exports: [CarRequestCalculationService],
})
export class CarRequestCalculationModule {}
