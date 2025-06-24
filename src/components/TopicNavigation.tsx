import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Topic {
  id: string;
  name: string;
  count: number;
  lastUpdated: string;
}

interface TopicNavigationProps {
  topics: Topic[];
  activeTopic: string;
  onTopicChange: (topicId: string) => void;
}

export const TopicNavigation = ({
  topics,
  activeTopic,
  onTopicChange,
}: TopicNavigationProps) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary-foreground"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  SentimentIQ
                </h1>
                <p className="text-sm text-muted-foreground">
                  Real-time sentiment analysis
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="bg-brand-500/10 text-brand-500 border-brand-500/20"
            >
              Live
            </Badge>
          </div>
        </div>

        <div className="flex space-x-1 pb-2">
          {topics.map((topic) => (
            <Button
              key={topic.id}
              variant={activeTopic === topic.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onTopicChange(topic.id)}
              className={`relative ${
                activeTopic === topic.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {topic.name}
              <Badge
                variant="secondary"
                className={`ml-2 text-xs ${
                  activeTopic === topic.id
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {topic.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
