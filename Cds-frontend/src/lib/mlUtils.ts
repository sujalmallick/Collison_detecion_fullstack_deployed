import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

export interface CollisionDetection {
  timestamp: string;
  type: string;
  confidence: number;
  description: string;
  action: string;
  severity: 'critical' | 'warning' | 'info';
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const processImageForCollisionDetection = async (
  imageElement: HTMLImageElement,
  onProgress?: (progress: number) => void
): Promise<CollisionDetection[]> => {
  try {
    console.log('Starting collision detection analysis...');
    onProgress?.(10);

    // Initialize object detection model
    const detector = await pipeline(
      'object-detection',
      'Xenova/detr-resnet-50',
      { device: 'webgpu' }
    );
    onProgress?.(30);

    // Convert HTMLImageElement to canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Resize image if needed and draw it to canvas
    const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
    console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
    
    onProgress?.(50);

    // Get image data as base64
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    console.log('Image converted for processing');
    
    // Process the image with the object detection model
    console.log('Running object detection...');
    const detections = await detector(imageData);
    onProgress?.(80);
    
    console.log('Object detection results:', detections);
    
    if (!detections || !Array.isArray(detections)) {
      throw new Error('Invalid detection result');
    }

    // Process detections to identify potential collisions
    const collisionDetections = analyzeForCollisions(detections, canvas.width, canvas.height);
    onProgress?.(100);

    return collisionDetections;
  } catch (error) {
    console.error('Error in collision detection:', error);
    throw error;
  }
};

function analyzeForCollisions(detections: any[], imageWidth: number, imageHeight: number): CollisionDetection[] {
  const results: CollisionDetection[] = [];
  
  // Filter for vehicles and relevant objects
  const vehicles = detections.filter(detection => 
    ['car', 'truck', 'bus', 'motorcycle', 'bicycle', 'person'].includes(detection.label.toLowerCase())
  );

  console.log('Detected vehicles/objects:', vehicles);

  vehicles.forEach((detection, index) => {
    const confidence = Math.round(detection.score * 100);
    
    if (confidence < 50) return; // Skip low confidence detections

    // Calculate collision risk based on object size and position
    const box = detection.box;
    const objectArea = (box.xmax - box.xmin) * (box.ymax - box.ymin);
    const relativeSize = objectArea / (imageWidth * imageHeight);
    
    // Determine risk level
    let severity: 'critical' | 'warning' | 'info' = 'info';
    let riskType = 'Low Risk';
    let description = `${detection.label} detected in scene`;
    let action = 'Monitor situation';

    if (relativeSize > 0.3 || confidence > 85) {
      severity = 'critical';
      riskType = 'High Risk';
      description = `Large ${detection.label} detected - potential collision risk`;
      action = 'Emergency braking recommended';
    } else if (relativeSize > 0.15 || confidence > 70) {
      severity = 'warning';
      riskType = 'Medium Risk';
      description = `${detection.label} in proximity - collision possible`;
      action = 'Course correction suggested';
    }

    // Check for multiple objects in close proximity
    const nearbyObjects = vehicles.filter(other => {
      if (other === detection) return false;
      const distance = Math.sqrt(
        Math.pow((other.box.xmin + other.box.xmax) / 2 - (box.xmin + box.xmax) / 2, 2) +
        Math.pow((other.box.ymin + other.box.ymax) / 2 - (box.ymin + box.ymax) / 2, 2)
      );
      return distance < 100; // Threshold for "nearby"
    });

    if (nearbyObjects.length > 0) {
      severity = 'critical';
      riskType = 'High Risk';
      description = `Multiple objects detected in close proximity`;
      action = 'Immediate evasive action required';
    }

    results.push({
      timestamp: `00:00:${String(index * 2 + 5).padStart(2, '0')}`,
      type: riskType,
      confidence,
      description,
      action,
      severity,
      boundingBox: {
        x: box.xmin,
        y: box.ymin,
        width: box.xmax - box.xmin,
        height: box.ymax - box.ymin
      }
    });
  });

  // If no significant detections, add a safe status
  if (results.length === 0) {
    results.push({
      timestamp: '00:00:01',
      type: 'Safe',
      confidence: 95,
      description: 'No collision threats detected',
      action: 'Continue normal operation',
      severity: 'info'
    });
  }

  return results.sort((a, b) => {
    const severityOrder = { critical: 3, warning: 2, info: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
}

export const processVideoForCollisionDetection = async (
  videoFile: File,
  onProgress?: (progress: number) => void
): Promise<CollisionDetection[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    video.onloadedmetadata = async () => {
      try {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // For demo purposes, we'll extract frames at intervals
        const framesToAnalyze = [0.2, 0.4, 0.6, 0.8]; // Analyze at 20%, 40%, 60%, 80% of video
        const allDetections: CollisionDetection[] = [];

        for (let i = 0; i < framesToAnalyze.length; i++) {
          video.currentTime = video.duration * framesToAnalyze[i];
          
          await new Promise(resolve => {
            video.onseeked = resolve;
          });

          // Draw current frame to canvas
          ctx.drawImage(video, 0, 0);
          
          // Convert canvas to image element
          const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const img = new Image();
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageDataUrl;
          });

          // Process this frame
          const frameDetections = await processImageForCollisionDetection(
            img,
            (progress) => onProgress?.((i / framesToAnalyze.length) * 100 + (progress / framesToAnalyze.length))
          );

          // Update timestamps to reflect actual video time
          frameDetections.forEach(detection => {
            const timeInSeconds = Math.floor(video.duration * framesToAnalyze[i]);
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;
            detection.timestamp = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
          });

          allDetections.push(...frameDetections);
        }

        resolve(allDetections);
      } catch (error) {
        reject(error);
      }
    };

    video.onerror = () => reject(new Error('Failed to load video'));
    video.src = URL.createObjectURL(videoFile);
  });
};