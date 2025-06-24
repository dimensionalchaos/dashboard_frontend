import { useState } from "react";
import { TopicNavigation, Topic } from "./TopicNavigation";
import { SentimentPieChart } from "./SentimentPieChart";
import { TopicBarChart } from "./TopicBarChart";
import { AISuggestions } from "./AISuggestions";

// Mock data - in a real app this would come from an API
const mockTopics: Topic[] = [
  {
    id: "customer-support",
    name: "Customer Support",
    count: 1247,
    lastUpdated: "2 min ago",
  },
  {
    id: "product-feedback",
    name: "Product Feedback",
    count: 892,
    lastUpdated: "5 min ago",
  },
  {
    id: "social-media",
    name: "Social Media",
    count: 2156,
    lastUpdated: "1 min ago",
  },
  { id: "reviews", name: "Reviews", count: 654, lastUpdated: "3 min ago" },
  { id: "surveys", name: "Surveys", count: 387, lastUpdated: "7 min ago" },
];

const mockSentimentData = {
  "customer-support": [
    {
      name: "Positive",
      value: 687,
      percentage: 55,
      color: "hsl(var(--sentiment-positive))",
    },
    {
      name: "Neutral",
      value: 312,
      percentage: 25,
      color: "hsl(var(--sentiment-neutral))",
    },
    {
      name: "Negative",
      value: 248,
      percentage: 20,
      color: "hsl(var(--sentiment-negative))",
    },
  ],
  "product-feedback": [
    {
      name: "Positive",
      value: 534,
      percentage: 60,
      color: "hsl(var(--sentiment-positive))",
    },
    {
      name: "Neutral",
      value: 178,
      percentage: 20,
      color: "hsl(var(--sentiment-neutral))",
    },
    {
      name: "Negative",
      value: 180,
      percentage: 20,
      color: "hsl(var(--sentiment-negative))",
    },
  ],
  "social-media": [
    {
      name: "Positive",
      value: 862,
      percentage: 40,
      color: "hsl(var(--sentiment-positive))",
    },
    {
      name: "Neutral",
      value: 647,
      percentage: 30,
      color: "hsl(var(--sentiment-neutral))",
    },
    {
      name: "Negative",
      value: 647,
      percentage: 30,
      color: "hsl(var(--sentiment-negative))",
    },
  ],
  reviews: [
    {
      name: "Positive",
      value: 458,
      percentage: 70,
      color: "hsl(var(--sentiment-positive))",
    },
    {
      name: "Neutral",
      value: 131,
      percentage: 20,
      color: "hsl(var(--sentiment-neutral))",
    },
    {
      name: "Negative",
      value: 65,
      percentage: 10,
      color: "hsl(var(--sentiment-negative))",
    },
  ],
  surveys: [
    {
      name: "Positive",
      value: 232,
      percentage: 60,
      color: "hsl(var(--sentiment-positive))",
    },
    {
      name: "Neutral",
      value: 116,
      percentage: 30,
      color: "hsl(var(--sentiment-neutral))",
    },
    {
      name: "Negative",
      value: 39,
      percentage: 10,
      color: "hsl(var(--sentiment-negative))",
    },
  ],
};

const mockPositiveTopics = {
  "customer-support": [
    { name: "Quick Resolution", value: 156, trend: "up" as const, change: 12 },
    { name: "Helpful Staff", value: 134, trend: "up" as const, change: 8 },
    { name: "Easy Process", value: 98, trend: "down" as const, change: 3 },
  ],
  "product-feedback": [
    { name: "User Interface", value: 198, trend: "up" as const, change: 15 },
    { name: "Performance", value: 167, trend: "up" as const, change: 22 },
    { name: "New Features", value: 145, trend: "up" as const, change: 18 },
  ],
  "social-media": [
    { name: "Brand Loyalty", value: 245, trend: "up" as const, change: 25 },
    { name: "Product Quality", value: 198, trend: "up" as const, change: 12 },
    { name: "Innovation", value: 156, trend: "down" as const, change: 5 },
  ],
  reviews: [
    { name: "Value for Money", value: 178, trend: "up" as const, change: 18 },
    { name: "Quality", value: 145, trend: "up" as const, change: 14 },
    { name: "Design", value: 123, trend: "up" as const, change: 9 },
  ],
  surveys: [
    { name: "Satisfaction", value: 89, trend: "up" as const, change: 16 },
    { name: "Recommendation", value: 76, trend: "up" as const, change: 12 },
    { name: "Loyalty", value: 67, trend: "down" as const, change: 2 },
  ],
};

const mockNegativeTopics = {
  "customer-support": [
    { name: "Long Wait Times", value: 87, trend: "down" as const, change: 8 },
    { name: "Complex Process", value: 76, trend: "up" as const, change: 12 },
    {
      name: "Lack of Follow-up",
      value: 65,
      trend: "down" as const,
      change: 15,
    },
  ],
  "product-feedback": [
    { name: "Bugs & Issues", value: 78, trend: "down" as const, change: 18 },
    { name: "Missing Features", value: 65, trend: "up" as const, change: 5 },
    { name: "Complexity", value: 45, trend: "down" as const, change: 22 },
  ],
  "social-media": [
    { name: "Pricing Concerns", value: 198, trend: "up" as const, change: 15 },
    { name: "Shipping Issues", value: 156, trend: "down" as const, change: 8 },
    {
      name: "Product Availability",
      value: 134,
      trend: "up" as const,
      change: 12,
    },
  ],
  reviews: [
    { name: "Shipping Delays", value: 34, trend: "down" as const, change: 25 },
    { name: "Poor Packaging", value: 23, trend: "up" as const, change: 8 },
    { name: "Wrong Item", value: 18, trend: "down" as const, change: 12 },
  ],
  surveys: [
    { name: "Price Sensitivity", value: 21, trend: "up" as const, change: 15 },
    { name: "Feature Requests", value: 12, trend: "down" as const, change: 5 },
    { name: "Support Issues", value: 6, trend: "down" as const, change: 35 },
  ],
};

const mockSuggestions = {
  "customer-support": [
    {
      id: "1",
      type: "warning" as const,
      title: "Increase in wait time complaints",
      description: "Consider adding more support staff during peak hours",
      priority: "high" as const,
      action: "Review Staffing",
    },
    {
      id: "2",
      type: "opportunity" as const,
      title: "High satisfaction with quick resolutions",
      description: "Promote fast resolution times in marketing materials",
      priority: "medium" as const,
      action: "Create Campaign",
    },
  ],
  "product-feedback": [
    {
      id: "1",
      type: "success" as const,
      title: "UI improvements well received",
      description: "Recent design updates showing positive response",
      priority: "low" as const,
    },
    {
      id: "2",
      type: "opportunity" as const,
      title: "Performance optimizations needed",
      description: "Users requesting faster load times and responsiveness",
      priority: "high" as const,
      action: "Optimize Performance",
    },
  ],
  "social-media": [
    {
      id: "1",
      type: "warning" as const,
      title: "Pricing concerns trending",
      description: "Monitor competitive pricing and value proposition",
      priority: "high" as const,
      action: "Price Analysis",
    },
    {
      id: "2",
      type: "opportunity" as const,
      title: "Strong brand loyalty signals",
      description: "Leverage loyal customers for testimonials and referrals",
      priority: "medium" as const,
      action: "Launch Referral Program",
    },
  ],
  reviews: [
    {
      id: "1",
      type: "success" as const,
      title: "Excellent review sentiment",
      description: "Maintaining high positive review ratio",
      priority: "low" as const,
    },
    {
      id: "2",
      type: "info" as const,
      title: "Shipping feedback opportunity",
      description: "Minor improvements to packaging could boost ratings",
      priority: "medium" as const,
      action: "Improve Packaging",
    },
  ],
  surveys: [
    {
      id: "1",
      type: "opportunity" as const,
      title: "High recommendation scores",
      description: "Leverage satisfied customers for case studies",
      priority: "medium" as const,
      action: "Create Case Studies",
    },
    {
      id: "2",
      type: "info" as const,
      title: "Feature request patterns",
      description: "Consider prioritizing most requested features",
      priority: "low" as const,
      action: "Review Roadmap",
    },
  ],
};

const mockSummary = {
  "customer-support": [
    {
      label: "Total Mentions",
      value: "1,247",
      change: 8,
      trend: "up" as const,
    },
    {
      label: "Avg Sentiment",
      value: "3.2/5",
      change: 12,
      trend: "up" as const,
    },
    { label: "Response Rate", value: "94%", change: 5, trend: "up" as const },
    {
      label: "Resolution Time",
      value: "2.3h",
      change: -15,
      trend: "down" as const,
    },
  ],
  "product-feedback": [
    { label: "Total Feedback", value: "892", change: 15, trend: "up" as const },
    { label: "Avg Rating", value: "4.1/5", change: 8, trend: "up" as const },
    {
      label: "Feature Requests",
      value: "156",
      change: 22,
      trend: "up" as const,
    },
    { label: "Bug Reports", value: "34", change: -18, trend: "down" as const },
  ],
  "social-media": [
    {
      label: "Total Mentions",
      value: "2,156",
      change: 12,
      trend: "up" as const,
    },
    {
      label: "Engagement Rate",
      value: "5.8%",
      change: 15,
      trend: "up" as const,
    },
    { label: "Share of Voice", value: "34%", change: 8, trend: "up" as const },
    {
      label: "Brand Mentions",
      value: "1,456",
      change: 18,
      trend: "up" as const,
    },
  ],
  reviews: [
    { label: "Total Reviews", value: "654", change: 22, trend: "up" as const },
    { label: "Avg Rating", value: "4.6/5", change: 5, trend: "up" as const },
    { label: "5-Star Reviews", value: "458", change: 28, trend: "up" as const },
    { label: "Response Rate", value: "98%", change: 3, trend: "up" as const },
  ],
  surveys: [
    { label: "Responses", value: "387", change: 8, trend: "up" as const },
    { label: "NPS Score", value: "67", change: 12, trend: "up" as const },
    { label: "Completion Rate", value: "89%", change: 5, trend: "up" as const },
    { label: "Satisfaction", value: "4.2/5", change: 15, trend: "up" as const },
  ],
};

export const SentimentDashboard = () => {
  const [activeTopic, setActiveTopic] = useState("customer-support");

  const currentSentimentData =
    mockSentimentData[activeTopic as keyof typeof mockSentimentData] ||
    mockSentimentData["customer-support"];
  const currentPositiveTopics =
    mockPositiveTopics[activeTopic as keyof typeof mockPositiveTopics] ||
    mockPositiveTopics["customer-support"];
  const currentNegativeTopics =
    mockNegativeTopics[activeTopic as keyof typeof mockNegativeTopics] ||
    mockNegativeTopics["customer-support"];
  const currentSuggestions =
    mockSuggestions[activeTopic as keyof typeof mockSuggestions] ||
    mockSuggestions["customer-support"];
  const currentSummary =
    mockSummary[activeTopic as keyof typeof mockSummary] ||
    mockSummary["customer-support"];

  return (
    <div className="min-h-screen bg-background">
      <TopicNavigation
        topics={mockTopics}
        activeTopic={activeTopic}
        onTopicChange={setActiveTopic}
      />

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sentiment Distribution */}
          <div className="order-1">
            <SentimentPieChart data={currentSentimentData} />
          </div>

          {/* AI Suggestions & Summary */}
          <div className="order-2">
            <AISuggestions
              suggestions={currentSuggestions}
              summary={currentSummary}
            />
          </div>

          {/* Top Positive Topics */}
          <div className="order-3">
            <TopicBarChart
              title="Top 3 Positive Topics"
              data={currentPositiveTopics}
              type="positive"
            />
          </div>

          {/* Top Negative Topics */}
          <div className="order-4">
            <TopicBarChart
              title="Top 3 Negative Topics"
              data={currentNegativeTopics}
              type="negative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
