import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { 
  Upload, 
  Play, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  FileVideo,
  FileImage,
  Download
} from 'lucide-react';

interface DetectionResult {
  timestamp: string;
  type: string;
  confidence: number;
  description: string;
  action: string;
  severity: 'critical' | 'warning' | 'info';
  imageUrl?: string;
  isNoAccident?: boolean;
}

const DemoSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // ⭐ Fake progress animation
  React.useEffect(() => {
    let interval: any;

    if (isProcessing) {
      interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev < 95) return prev + 1;
          return prev;
        });
      }, 200);
    }

    return () => clearInterval(interval);
  }, [isProcessing]);

  const exportResults = () => {
    const dataStr = JSON.stringify(detectionResults, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'detection_results.json';
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/avi', 'video/mov'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image (JPG, PNG) or video (MP4, AVI, MOV).',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 100MB.',
        variant: 'destructive',
      });
      return;
    }

    setUploadedFile(file);
    setShowResults(false);
    setDetectionResults([]);
  };

  const handleFileUpload = () => fileInputRef.current?.click();

  const processFile = async () => {
    if (!uploadedFile) return;
    setIsProcessing(true);
    setShowResults(false);
    setProcessingProgress(10);

    try {
      const formData = new FormData();
      formData.append('video', uploadedFile);

      const res = await fetch('https://dxv78l9hvo7rg.cloudfront.net/detect', {
        method: 'POST',
        body: formData,
      });

      setProcessingProgress(70);
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('image')) {
        const blob = await res.blob();
        const imageUrl = URL.createObjectURL(blob);

        setDetectionResults([
          {
            timestamp: '00:00:10',
            type: 'Accident Detected',
            confidence: 95,
            description: 'Possible road collision identified.',
            action: 'Emergency alert triggered.',
            severity: 'critical',
            imageUrl,
          },
        ]);

        toast({
          title: 'Accident Detected',
          description: 'An accident frame has been captured and displayed below.',
        });

      } else {
        const data = await res.json();

        toast({
          title: 'No Accident Detected',
          description: data.message || 'No collision found in this video.',
        });

        setDetectionResults([
          {
            timestamp: '—',
            type: 'No Accident Detected',
            confidence: 0,
            description: data.message || 'No collision found in this video.',
            action: 'None required.',
            severity: 'info',
            isNoAccident: true,
          }
        ]);
      }

      setShowResults(true);

    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to analyze file. Please try again later.',
        variant: 'destructive',
      });

    } finally {
      setProcessingProgress(100);
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 500);
    }
  };

  return (
    <section id="demo" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Live</span>{' '}
            <span className="text-gradient-primary">Preview</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload a video or image to see our accident detection system in action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Upload Section */}
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="glass border-primary/20">
              <CardContent className="p-8">
                
                <h3 className="text-2xl font-semibold mb-6 text-foreground">Upload Your Media</h3>

                <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center mb-6 hover:border-primary/50 transition-colors">
                  {uploadedFile ? (
                    <div className="space-y-4">
                      {uploadedFile.type.startsWith('video/') ? (
                        <FileVideo className="w-16 h-16 mx-auto text-primary" />
                      ) : (
                        <FileImage className="w-16 h-16 mx-auto text-primary" />
                      )}

                      <div>
                        <p className="text-foreground font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB - Ready to analyze
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-16 h-16 mx-auto text-muted-foreground" />
                      <p className="text-foreground font-medium mb-2">
                        Drop your files here or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports MP4, AVI, MOV, JPG, PNG (Max: 100MB)
                      </p>
                    </div>
                  )}
                </div>

                <input ref={fileInputRef} type="file" accept="image/*,video/*" onChange={handleFileSelect} className="hidden" />

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button variant="hero" className="flex-1" onClick={handleFileUpload} disabled={isProcessing}>
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadedFile ? 'Replace File' : 'Choose File'}
                  </Button>
                </div>

                {uploadedFile && (
                  <Button variant="neon" size="lg" className="w-full" onClick={processFile} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing... {processingProgress}%
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        {uploadedFile.type.startsWith('video/') ? 'Analyze Video' : 'Analyze Image'}
                      </>
                    )}
                  </Button>
                )}

                {isProcessing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 glass rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-foreground">Processing...</span>
                      <Clock className="w-4 h-4 text-primary" />
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${processingProgress}%` }}>
                      </div>
                    </div>
                  </motion.div>
                )}

              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="h-full">
            <Card className="glass border-primary/20 h-full flex flex-col">
              <CardContent className="p-8">

                <h3 className="text-2xl font-semibold mb-6 text-foreground">Detection Results</h3>

                {!showResults && !isProcessing && (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Upload and analyze a video to see accident detection results.
                    </p>
                  </div>
                )}

                {showResults && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

                    {detectionResults.length > 0 && !detectionResults[0].isNoAccident && (
                      <div className="grid grid-cols-3 gap-4 mb-6">

                        <div className="text-center p-4 glass rounded-lg">
                          <div className="text-2xl font-bold text-red-400">
                            {detectionResults.length}
                          </div>
                          <div className="text-xs text-muted-foreground">Detections</div>
                        </div>

                        <div className="text-center p-4 glass rounded-lg">
                          <div className="text-2xl font-bold text-gradient-primary">
                            {Math.max(...detectionResults.map(r => r.confidence))}%
                          </div>
                          <div className="text-xs text-muted-foreground">Max Confidence</div>
                        </div>

                        <div className="text-center p-4 glass rounded-lg">
                          <div className="text-2xl font-bold text-accent">
                            {detectionResults.filter(r => r.severity === 'critical').length}
                          </div>
                          <div className="text-xs text-muted-foreground">Critical</div>
                        </div>

                      </div>
                    )}

                    {detectionResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border ${
                          result.severity === 'critical'
                            ? 'border-red-500/30 bg-red-500/10'
                            : result.severity === 'warning'
                            ? 'border-yellow-500/30 bg-yellow-500/10'
                            : 'border-blue-500/30 bg-blue-500/10'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {result.severity === 'critical' ? (
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            ) : result.severity === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-yellow-400" />
                            ) : (
                              <CheckCircle className="w-4 h-4 text-blue-400" />
                            )}

                            <span className="font-medium text-foreground text-sm">
                              {result.type}
                            </span>
                          </div>

                          <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                        </div>

                        <p className="text-sm text-foreground mb-1">{result.description}</p>

                        <p className="text-xs text-muted-foreground mb-2">{result.action}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Confidence: {result.confidence}%</span>

                          <div className="w-20 bg-muted rounded-full h-1">

                            <div className={`h-1 rounded-full ${
                              result.severity === 'critical'
                                ? 'bg-red-400'
                                : result.severity === 'warning'
                                ? 'bg-yellow-400'
                                : 'bg-blue-400'
                            }`} style={{ width: `${result.confidence}%` }}>
                            </div>

                          </div>
                        </div>

                        {result.imageUrl && (
                          <img
                            src={result.imageUrl}
                            alt="Detected Accident"
                            className="rounded-lg mt-3 shadow-md border border-primary/20"
                          />
                        )}  

                      </motion.div>
                    ))}

                    {/* Export button */}
                    {detectionResults.length > 0 && !detectionResults[0].isNoAccident && (
                      <Button variant="cyber" className="w-full mt-6" onClick={exportResults}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                    )}

                  </motion.div>
                )}

              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DemoSection;
