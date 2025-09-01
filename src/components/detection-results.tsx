import { Shield, ShieldAlert, TrendingUp, Brain, Cpu, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DetectionResult {
  overallScore: number;
  classification: 'pristine' | 'forged' | 'suspicious';
  confidence: number;
  analysisDetails: {
    cnnFeatures: {
      score: number;
      confidence: number;
      keyFeatures: string[];
    };
    dpFeatures: {
      ela: { score: number; description: string };
      dct: { score: number; description: string };
      dwt: { score: number; description: string };
      lbp: { score: number; description: string };
      edges: { score: number; description: string };
      color: { score: number; description: string };
    };
    fusionScore: number;
  };
  processingTime: number;
  imageMetadata: {
    size: string;
    format: string;
    compression: string;
  };
}

interface DetectionResultsProps {
  result: DetectionResult;
  className?: string;
}

export function DetectionResults({ result, className }: DetectionResultsProps) {
  const getClassificationIcon = () => {
    switch (result.classification) {
      case 'pristine':
        return <Shield className="w-5 h-5 text-success" />;
      case 'suspicious':
        return <ShieldAlert className="w-5 h-5 text-warning" />;
      case 'forged':
        return <ShieldAlert className="w-5 h-5 text-destructive" />;
    }
  };

  const getClassificationColor = () => {
    switch (result.classification) {
      case 'pristine': return 'text-success';
      case 'suspicious': return 'text-warning';
      case 'forged': return 'text-destructive';
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-success';
    if (score < 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Result */}
      <Card className="border-2">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            {getClassificationIcon()}
          </div>
          <CardTitle className={cn("text-2xl", getClassificationColor())}>
            {result.classification.toUpperCase()}
          </CardTitle>
          <CardDescription>
            Forgery probability: {result.overallScore.toFixed(1)}% • Confidence: {result.confidence.toFixed(1)}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span>Forgery Score</span>
              <span className={getScoreColor(result.overallScore)}>
                {result.overallScore.toFixed(1)}%
              </span>
            </div>
            <Progress value={result.overallScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* CNN Analysis */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">CNN Deep Features</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Neural Network Score</span>
              <Badge variant="outline" className={getScoreColor(result.analysisDetails.cnnFeatures.score)}>
                {result.analysisDetails.cnnFeatures.score.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={result.analysisDetails.cnnFeatures.score} className="h-2" />
            <div className="flex flex-wrap gap-2">
              {result.analysisDetails.cnnFeatures.keyFeatures.map((feature, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Processing Features */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Digital Processing Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(result.analysisDetails.dpFeatures).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">
                    {key === 'ela' ? 'Error Level Analysis' :
                     key === 'dct' ? 'DCT Histogram' :
                     key === 'dwt' ? 'Wavelet Transform' :
                     key === 'lbp' ? 'Local Binary Pattern' :
                     key === 'edges' ? 'Edge Detection' : 'Color Analysis'}
                  </span>
                  <span className={cn("text-xs", getScoreColor(data.score))}>
                    {data.score.toFixed(1)}%
                  </span>
                </div>
                <Progress value={data.score} className="h-1.5" />
                <p className="text-xs text-muted-foreground">{data.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fusion Analysis */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Feature Fusion</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Late Fusion Score</span>
              <Badge variant="outline" className={getScoreColor(result.analysisDetails.fusionScore)}>
                {result.analysisDetails.fusionScore.toFixed(1)}%
              </Badge>
            </div>
            <Progress value={result.analysisDetails.fusionScore} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Combined CNN and digital processing features using late fusion MLP
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Image Metadata</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Size:</span>
              <span className="ml-2 text-muted-foreground">{result.imageMetadata.size}</span>
            </div>
            <div>
              <span className="font-medium">Format:</span>
              <span className="ml-2 text-muted-foreground">{result.imageMetadata.format}</span>
            </div>
            <div>
              <span className="font-medium">Compression:</span>
              <span className="ml-2 text-muted-foreground">{result.imageMetadata.compression}</span>
            </div>
            <div>
              <span className="font-medium">Processing Time:</span>
              <span className="ml-2 text-muted-foreground">{result.processingTime}ms</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}