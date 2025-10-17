import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon, CarIcon, FileTextIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import type { DashboardOverviewStats } from '@/gql/graphql';

interface DashboardOverviewCardsProps {
  data: DashboardOverviewStats;
}

interface StatCardProps {
  title: string;
  value: number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, change, icon, description }: StatCardProps) {
  const hasChange = typeof change === 'number' && !isNaN(change);
  const isPositive = hasChange && change > 0;
  const isNegative = hasChange && change < 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value.toLocaleString('cs-CZ')}</div>
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        {hasChange && (
          <div className="flex items-center mt-1">
            {isPositive && <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />}
            {isNegative && <ArrowDownIcon className="h-3 w-3 text-red-500 mr-1" />}
            <span
              className={`text-xs ${
                isPositive ? 'text-green-500' : isNegative ? 'text-red-500' : 'text-muted-foreground'
              }`}
            >
              {isPositive && '+'}
              {change.toFixed(1)}% od minulého měsíce
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function DashboardOverviewCards({ data }: DashboardOverviewCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Aktivní poptávky"
        value={data.activeCarRequests}
        change={data.activeCarRequestsChange}
        icon={<FileTextIcon />}
        description="Celkový počet probíhajících poptávek"
      />
      <StatCard
        title="Celkem vozidel"
        value={data.totalVehicles}
        change={data.totalVehiclesChange}
        icon={<CarIcon />}
        description="Počet kalkulací ve všech poptávkách"
      />
      <StatCard
        title="Čeká na akci"
        value={data.awaitingAction}
        icon={<AlertCircleIcon />}
        description="Poptávky vyžadující pozornost"
      />
      <StatCard
        title="Dokončené onboardingy"
        value={data.completedOnboardingsThisMonth}
        icon={<CheckCircleIcon />}
        description="Tento měsíc"
      />
    </div>
  );
}
