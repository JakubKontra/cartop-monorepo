import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { TimelineDataPoint } from '@/gql/graphql';
import { format, parseISO } from 'date-fns';
import { cs } from 'date-fns/locale';

interface DashboardTimelineChartProps {
  data: TimelineDataPoint[];
}

export function DashboardTimelineChart({ data }: DashboardTimelineChartProps) {
  const chartData = data.map((point) => {
    // Parse date more safely - handle both ISO strings and Date objects
    let dateObj: Date;
    let formattedDate: string;

    try {
      // Try multiple parsing strategies
      if (typeof point.date === 'string') {
        // Try ISO format first
        dateObj = parseISO(point.date);

        // If invalid, try adding time component
        if (isNaN(dateObj.getTime())) {
          dateObj = new Date(point.date + 'T00:00:00.000Z');
        }

        // If still invalid, try direct Date constructor
        if (isNaN(dateObj.getTime())) {
          dateObj = new Date(point.date);
        }
      } else {
        dateObj = new Date(point.date);
      }

      // Final validation
      if (isNaN(dateObj.getTime())) {
        // Use current date as absolute fallback
        console.warn('Invalid date in timeline:', point.date);
        dateObj = new Date();
      }

      formattedDate = format(dateObj, 'd. MMM', { locale: cs });
    } catch (e) {
      console.error('Error parsing date:', point.date, e);
      // Fallback to showing the raw date string
      formattedDate = String(point.date);
      dateObj = new Date();
    }

    return {
      date: point.date,
      formattedDate,
      newCarRequests: point.newCarRequests,
      completedOnboardings: point.completedOnboardings,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      let fullDate: string;

      try {
        let dateObj: Date;

        if (typeof dataPoint.date === 'string') {
          dateObj = parseISO(dataPoint.date);
          if (isNaN(dateObj.getTime())) {
            dateObj = new Date(dataPoint.date + 'T00:00:00.000Z');
          }
          if (isNaN(dateObj.getTime())) {
            dateObj = new Date(dataPoint.date);
          }
        } else {
          dateObj = new Date(dataPoint.date);
        }

        if (isNaN(dateObj.getTime())) {
          fullDate = String(dataPoint.date);
        } else {
          fullDate = format(dateObj, 'd. MMMM yyyy', { locale: cs });
        }
      } catch (e) {
        fullDate = String(dataPoint.date);
      }

      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="font-medium mb-2">{fullDate}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString('cs-CZ')}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Časová osa (posledních 30 dní)</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            Žádná data k zobrazení
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOnboardings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="formattedDate"
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => {
                  if (value === 'newCarRequests') return 'Nové poptávky';
                  if (value === 'completedOnboardings') return 'Dokončené onboardingy';
                  return value;
                }}
              />
              <Area
                type="monotone"
                dataKey="newCarRequests"
                stroke="#0088FE"
                fillOpacity={1}
                fill="url(#colorRequests)"
              />
              <Area
                type="monotone"
                dataKey="completedOnboardings"
                stroke="#00C49F"
                fillOpacity={1}
                fill="url(#colorOnboardings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
