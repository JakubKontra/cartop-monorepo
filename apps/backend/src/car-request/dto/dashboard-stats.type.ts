import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

/**
 * Overview Statistics Type
 * Key performance indicators for the dashboard
 */
@ObjectType()
export class DashboardOverviewStats {
  @Field(() => Int)
  activeCarRequests: number;

  @Field(() => Int)
  totalVehicles: number;

  @Field(() => Int)
  awaitingAction: number;

  @Field(() => Int)
  completedOnboardingsThisMonth: number;

  @Field(() => Float)
  activeCarRequestsChange: number; // Percentage change from last period

  @Field(() => Float)
  totalVehiclesChange: number;
}

/**
 * Brand Statistics Type
 * Statistics per brand
 */
@ObjectType()
export class BrandStats {
  @Field()
  brandId: string;

  @Field()
  brandName: string;

  @Field(() => Int)
  calculationsCount: number;

  @Field(() => Float)
  percentage: number;
}

/**
 * Agent Performance Type
 * Statistics per agent
 */
@ObjectType()
export class AgentPerformance {
  @Field()
  agentId: string;

  @Field()
  agentName: string;

  @Field(() => Int)
  carRequestsCount: number;

  @Field(() => Int)
  vehiclesCount: number;

  @Field(() => Float, { nullable: true })
  conversionRate?: number; // Percentage of completed vs total

  @Field(() => Float, { nullable: true })
  averageProcessingDays?: number;
}

/**
 * Leasing Company Statistics Type
 * Statistics per leasing company
 */
@ObjectType()
export class LeasingCompanyStats {
  @Field()
  leasingCompanyId: string;

  @Field()
  leasingCompanyName: string;

  @Field(() => Int)
  calculationsCount: number;

  @Field(() => Int)
  completedOnboardingsCount: number;

  @Field(() => Float, { nullable: true })
  conversionRate?: number;
}

/**
 * Timeline Data Point Type
 * Data point for timeline charts
 */
@ObjectType()
export class TimelineDataPoint {
  @Field()
  date: string; // ISO date string (YYYY-MM-DD)

  @Field(() => Int)
  newCarRequests: number;

  @Field(() => Int)
  completedOnboardings: number;
}

/**
 * Vehicle Funnel Stats Type
 * Conversion funnel statistics
 */
@ObjectType()
export class VehicleFunnelStats {
  @Field(() => Int)
  created: number;

  @Field(() => Int)
  hasOffers: number;

  @Field(() => Int)
  leasingCompanySelected: number;

  @Field(() => Int)
  onboardingComplete: number;

  @Field(() => Int)
  ordered: number;
}

/**
 * Main Dashboard Statistics Type
 * Complete dashboard data
 */
@ObjectType()
export class DashboardStats {
  @Field(() => DashboardOverviewStats)
  overview: DashboardOverviewStats;

  @Field(() => [BrandStats])
  topBrands: BrandStats[];

  @Field(() => [AgentPerformance])
  agentPerformance: AgentPerformance[];

  @Field(() => [LeasingCompanyStats])
  leasingCompanies: LeasingCompanyStats[];

  @Field(() => [TimelineDataPoint])
  timeline: TimelineDataPoint[];

  @Field(() => VehicleFunnelStats)
  funnel: VehicleFunnelStats;
}
