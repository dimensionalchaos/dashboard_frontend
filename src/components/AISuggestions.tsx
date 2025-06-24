import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Suggestion {
  id: string;
  type: "opportunity" | "warning" | "success" | "info";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  action?: string;
}

interface SummaryMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

interface AISuggestionsProps {
  suggestions: Suggestion[];
  summary: SummaryMetric[];
}

const getSuggestionIcon = (type: string) => {
  switch (type) {
    case "opportunity":
      return <TrendingUp className="w-4 h-4" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4" />;
    case "success":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getSuggestionColor = (type: string) => {
  switch (type) {
    case "opportunity":
      return "text-sentiment-positive bg-sentiment-positive/10 border-sentiment-positive/20";
    case "warning":
      return "text-sentiment-negative bg-sentiment-negative/10 border-sentiment-negative/20";
    case "success":
      return "text-brand-500 bg-brand-500/10 border-brand-500/20";
    default:
      return "text-sentiment-neutral bg-sentiment-neutral/10 border-sentiment-neutral/20";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-sentiment-negative text-white";
    case "medium":
      return "bg-sentiment-neutral text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const AISuggestions = ({ suggestions, summary }: AISuggestionsProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <span>AI Insights & Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {summary.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="text-xs text-muted-foreground">
                {metric.label}
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-lg font-semibold text-foreground">
                  {metric.value}
                </div>
                <div
                  className={`flex items-center space-x-1 text-xs ${
                    metric.trend === "up"
                      ? "text-sentiment-positive"
                      : "text-sentiment-negative"
                  }`}
                >
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingUp className="w-3 h-3 rotate-180" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            AI Recommendations
          </h4>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className={`p-3 rounded-lg border ${getSuggestionColor(suggestion.type)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getSuggestionIcon(suggestion.type)}
                    <span className="text-sm font-medium">
                      {suggestion.title}
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getPriorityColor(suggestion.priority)}`}
                  >
                    {suggestion.priority}
                  </Badge>
                </div>
                <p className="text-xs mb-3 opacity-90">
                  {suggestion.description}
                </p>
                {suggestion.action && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7 border-current"
                  >
                    {suggestion.action}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="text-xs">
              Export Report
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              Set Alerts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
