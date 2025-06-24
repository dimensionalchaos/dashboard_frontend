import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AISuggestionsProps {
  analysisText?: string;
}

export const AISuggestions = ({ analysisText }: AISuggestionsProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <span>AI Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] p-4 rounded-lg bg-muted/30 border border-dashed border-border">
          {analysisText ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                {analysisText}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  AI analysis will appear here when data is available
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
