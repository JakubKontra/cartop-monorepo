import { registerEnumType } from '@nestjs/graphql';

export enum PricePeriod {
  MONTHLY = 'MONTHLY',
  ONE_TIME = 'ONE_TIME',
}

registerEnumType(PricePeriod, {
  name: 'PricePeriod',
  description: 'Period for which the price is valid',
});
