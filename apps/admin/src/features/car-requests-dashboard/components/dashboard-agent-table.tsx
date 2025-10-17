import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AgentPerformance } from '@/gql/graphql';

interface DashboardAgentTableProps {
  data: AgentPerformance[];
}

export function DashboardAgentTable({ data }: DashboardAgentTableProps) {
  // Sort by carRequestsCount descending
  const sortedData = [...data].sort((a, b) => b.carRequestsCount - a.carRequestsCount);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Výkonnost agentů</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
            Žádná data k zobrazení
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead className="text-right">Poptávky</TableHead>
                  <TableHead className="text-right">Vozidla</TableHead>
                  <TableHead className="text-right">Konverze</TableHead>
                  <TableHead className="text-right">Průměr dní</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((agent) => (
                  <TableRow key={agent.agentId}>
                    <TableCell className="font-medium">{agent.agentName}</TableCell>
                    <TableCell className="text-right">
                      {agent.carRequestsCount.toLocaleString('cs-CZ')}
                    </TableCell>
                    <TableCell className="text-right">
                      {agent.vehiclesCount.toLocaleString('cs-CZ')}
                    </TableCell>
                    <TableCell className="text-right">
                      {agent.conversionRate !== null && agent.conversionRate !== undefined
                        ? `${agent.conversionRate.toFixed(1)}%`
                        : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      {agent.averageProcessingDays !== null &&
                      agent.averageProcessingDays !== undefined
                        ? agent.averageProcessingDays.toFixed(1)
                        : '—'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
