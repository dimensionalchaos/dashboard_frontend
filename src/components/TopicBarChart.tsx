import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TopicData {
  name: string;
  value: number;
}

interface TopicBarChartProps {
  title: string;
  data: TopicData[];
  type: "positive" | "negative";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">{label}</p>
        <p className="text-muted-foreground">
          Mentions:{" "}
          <span className="font-semibold text-foreground">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export const TopicBarChart = ({ title, data, type }: TopicBarChartProps) => {
  const barColor =
    type === "positive"
      ? "hsl(var(--sentiment-positive))"
      : "hsl(var(--sentiment-negative))";
  const iconColor =
    type === "positive" ? "text-sentiment-positive" : "text-sentiment-negative";

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {type === "positive" ? (
            <TrendingUp className={`w-5 h-5 ${iconColor}`} />
          ) : (
            <TrendingDown className={`w-5 h-5 ${iconColor}`} />
          )}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={barColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
