import { useState, useCallback } from 'react';

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  duration?: number;
}

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

const initialSteps: AnalysisStep[] = [
  {
    id: 'preprocessing',
    label: 'Image Preprocessing',
    description: 'Resizing, normalization, and format standardization',
    status: 'pending'
  },
  {
    id: 'ela',
    label: 'Error Level Analysis',
    description: 'Detecting compression artifacts and inconsistencies',
    status: 'pending'
  },
  {
    id: 'dct',
    label: 'DCT Coefficient Analysis',
    description: 'Analyzing frequency domain characteristics',
    status: 'pending'
  },
  {
    id: 'dwt',
    label: 'Wavelet Transform',
    description: 'Multi-scale texture and edge analysis',
    status: 'pending'
  },
  {
    id: 'lbp',
    label: 'Local Binary Patterns',
    description: 'Texture consistency analysis',
    status: 'pending'
  },
  {
    id: 'cnn',
    label: 'CNN Feature Extraction',
    description: 'Deep learning feature extraction using ResNet-18',
    status: 'pending'
  },
  {
    id: 'fusion',
    label: 'Feature Fusion',
    description: 'Combining CNN and digital processing features',
    status: 'pending'
  },
  {
    id: 'classification',
    label: 'Final Classification',
    description: 'Generating final forgery probability and confidence',
    status: 'pending'
  }
];

export function useDetectionAnalysis() {
  const [steps, setSteps] = useState<AnalysisStep[]>(initialSteps);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const simulateAnalysis = useCallback(async (file: File): Promise<DetectionResult> => {
    const startTime = Date.now();
    
    // Simulate processing steps
    for (let i = 0; i < steps.length; i++) {
      const stepDuration = Math.random() * 1000 + 500; // 500-1500ms
      
      // Mark current step as running
      setSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx === i ? 'running' : idx < i ? 'completed' : 'pending'
      })));
      
      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      
      // Mark step as completed with duration
      setSteps(prev => prev.map((step, idx) => ({
        ...step,
        status: idx <= i ? 'completed' : 'pending',
        duration: idx === i ? Math.round(stepDuration) : step.duration
      })));
    }

    // Generate realistic but random results
    const forgeryScore = Math.random() * 100;
    const confidence = Math.max(70, Math.random() * 30 + 70);
    
    const classification: 'pristine' | 'forged' | 'suspicious' = 
      forgeryScore < 25 ? 'pristine' :
      forgeryScore > 75 ? 'forged' : 'suspicious';

    const cnnScore = forgeryScore + (Math.random() - 0.5) * 20;
    const fusionScore = forgeryScore + (Math.random() - 0.5) * 15;

    const keyFeatures = [
      'Edge inconsistencies',
      'Compression artifacts',
      'Noise patterns',
      'Color channel analysis',
      'Texture variations'
    ].sort(() => Math.random() - 0.5).slice(0, 3);

    return {
      overallScore: Math.max(0, Math.min(100, forgeryScore)),
      classification,
      confidence,
      analysisDetails: {
        cnnFeatures: {
          score: Math.max(0, Math.min(100, cnnScore)),
          confidence,
          keyFeatures
        },
        dpFeatures: {
          ela: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 30)),
            description: 'Low compression artifacts detected'
          },
          dct: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 25)),
            description: 'Frequency domain analysis shows normal patterns'
          },
          dwt: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 20)),
            description: 'Wavelet coefficients within expected range'
          },
          lbp: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 35)),
            description: 'Texture patterns consistent across regions'
          },
          edges: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 25)),
            description: 'Edge density analysis completed'
          },
          color: {
            score: Math.max(0, Math.min(100, forgeryScore + (Math.random() - 0.5) * 30)),
            description: 'Color consistency analysis passed'
          }
        },
        fusionScore: Math.max(0, Math.min(100, fusionScore))
      },
      processingTime: Date.now() - startTime,
      imageMetadata: {
        size: `${Math.round(file.size / 1024)}KB`,
        format: file.type.split('/')[1].toUpperCase(),
        compression: Math.random() > 0.5 ? 'JPEG (Quality: 85)' : 'Lossless'
      }
    };
  }, [steps.length]);

  const analyzeImage = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    setSteps(initialSteps);

    try {
      const analysisResult = await simulateAnalysis(file);
      setResult(analysisResult);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [simulateAnalysis]);

  const reset = useCallback(() => {
    setSteps(initialSteps);
    setResult(null);
    setIsAnalyzing(false);
  }, []);

  return {
    steps,
    result,
    isAnalyzing,
    analyzeImage,
    reset
  };
}