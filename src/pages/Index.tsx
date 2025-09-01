import { useState } from "react";
import { Shield, Brain, Cpu, TrendingUp, Github, FileText } from "lucide-react";
import { FileUpload } from "@/components/ui/file-upload";
import { AnalysisProgress } from "@/components/analysis-progress";
import { DetectionResults } from "@/components/detection-results";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDetectionAnalysis } from "@/hooks/use-detection-analysis";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { steps, result, isAnalyzing, analyzeImage, reset } = useDetectionAnalysis();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    reset();
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeImage(selectedFile);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ForgeDetect</h1>
                <p className="text-sm text-muted-foreground">CNN + Digital Processing</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Brain className="w-3 h-3" />
                ResNet-18
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Cpu className="w-3 h-3" />
                Multi-DP
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Advanced Image Forgery Detection
            </h2>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
              State-of-the-art fusion of Convolutional Neural Networks and Digital Processing techniques 
              for comprehensive image authenticity analysis.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="w-4 h-4 text-primary" />
                Deep CNN Features
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Cpu className="w-4 h-4 text-primary" />
                ELA, DCT, DWT, LBP Analysis
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                Late Fusion MLP
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload & Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                  <CardDescription>
                    Upload an image for comprehensive forgery analysis using our hybrid CNN + DP approach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    onFileSelect={handleFileSelect}
                    accept="image/*"
                    maxSize={10}
                    disabled={isAnalyzing}
                  />
                  
                  {selectedFile && !isAnalyzing && !result && (
                    <div className="mt-4 flex gap-2">
                      <Button 
                        onClick={handleAnalyze}
                        className="flex-1 bg-gradient-primary hover:opacity-90"
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Analyze Image
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        Reset
                      </Button>
                    </div>
                  )}

                  {result && (
                    <div className="mt-4">
                      <Button variant="outline" onClick={handleReset} className="w-full">
                        Analyze New Image
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Methodology */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Detection Methodology
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Brain className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">CNN Feature Extraction</h4>
                        <p className="text-xs text-muted-foreground">
                          ResNet-18 backbone for high-level semantic features
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Digital Processing</h4>
                        <p className="text-xs text-muted-foreground">
                          ELA, DCT, DWT, LBP, edge density, color analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Late Fusion</h4>
                        <p className="text-xs text-muted-foreground">
                          MLP combines CNN and DP features for final classification
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis & Results */}
            <div className="space-y-6">
              {isAnalyzing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis in Progress</CardTitle>
                    <CardDescription>
                      Processing image through CNN and digital processing pipeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalysisProgress steps={steps} />
                  </CardContent>
                </Card>
              )}

              {result && (
                <DetectionResults result={result} />
              )}

              {!selectedFile && !isAnalyzing && !result && (
                <Card className="text-center py-12">
                  <CardContent>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                      Upload an image to begin comprehensive forgery detection using our hybrid 
                      CNN + Digital Processing approach.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Technical Details */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  Technical Implementation
                </CardTitle>
                <CardDescription>
                  Complete end-to-end starter kit architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Dataset Preparation</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• CASIA, CoMoFoD support</li>
                      <li>• Automated tiling & splitting</li>
                      <li>• Balanced train/val/test sets</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Feature Extraction</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Error Level Analysis (ELA)</li>
                      <li>• DCT coefficient histograms</li>
                      <li>• Wavelet transform statistics</li>
                      <li>• Local Binary Patterns</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Model Architecture</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• ResNet-18 CNN backbone</li>
                      <li>• Late fusion MLP head</li>
                      <li>• End-to-end training</li>
                      <li>• ROC/AUC evaluation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
