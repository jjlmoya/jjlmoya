declare const faceapi: any;

export interface AnalysisMetric {
  label: string;
  value: string;
  id: string;
}

export interface AnalysisAlert {
  type: 'success' | 'warning' | 'error';
  text: string;
}

export class TinderOptimizerEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public image: HTMLImageElement | null = null;
  public faceDetection: any = null;
  public zoom = 1;
  public offset = { x: 0, y: 0 };
  public brightness = 100;
  private isFaceApiLoaded = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  async loadModels() {
    if (this.isFaceApiLoaded) return;
    const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
    ]);
    this.isFaceApiLoaded = true;
  }

  async detect(image: HTMLImageElement) {
    this.image = image;
    const detections = await faceapi.detectSingleFace(
      image, 
      new faceapi.TinyFaceDetectorOptions()
    ).withFaceLandmarks().withFaceExpressions();
    
    this.faceDetection = detections;
    return detections;
  }

  setManualFace(rect: { x: number, y: number, w: number, h: number }) {
    if (!this.image) return;
    
    const iw = this.image.width;
    const ih = this.image.height;
    const r = Math.max(this.canvas.width / iw, this.canvas.height / ih);
    const w = iw * r * this.zoom;
    const h = ih * r * this.zoom;
    const imgX = (this.canvas.width - w) / 2 + this.offset.x;
    const imgY = (this.canvas.height - h) / 2 + this.offset.y;

    const faceX = (rect.x - imgX) / (r * this.zoom);
    const faceY = (rect.y - imgY) / (r * this.zoom);
    const faceW = rect.w / (r * this.zoom);
    const faceH = rect.h / (r * this.zoom);

    this.faceDetection = {
      detection: { box: { x: faceX, y: faceY, width: faceW, height: faceH } },
      landmarks: null,
      expressions: null
    };
  }

  updateState(zoom: number, offset: { x: number, y: number }, brightness: number) {
    this.zoom = zoom;
    this.offset = offset;
    this.brightness = brightness;
  }

  getAnalysis() {
    const alerts: AnalysisAlert[] = [];
    const metrics: Record<string, string> = {
      faceSize: '0%',
      eyeLine: '--',
      coverage: '0%',
      mood: '--',
      quality: '--'
    };

    if (!this.image) return { alerts, metrics };

    const iw = this.image.width;
    const ih = this.image.height;
    const canvasW = this.canvas.width;
    const canvasH = this.canvas.height;
    const r = Math.max(canvasW / iw, canvasH / ih);
    const w = iw * r * this.zoom;
    const h = ih * r * this.zoom;
    const x = (canvasW - w) / 2 + this.offset.x;
    const y = (canvasH - h) / 2 + this.offset.y;

    const isCovering = !(x > 0 || y > 0 || (x + w) < canvasW || (y + h) < canvasH);
    metrics.coverage = isCovering ? '100%' : 'INCORRECTA';
    if (!isCovering) {
      alerts.push({ type: 'error', text: 'ESPACIOS VACÍOS: La imagen no cubre todo el encuadre. Ajusta el zoom o la posición.' });
    }

    if (this.faceDetection) {
      const box = this.faceDetection.detection.box;
      const faceCanvasY = y + (box.y * r * this.zoom);
      const faceCanvasH = box.height * r * this.zoom;
      const faceCanvasX = x + (box.x * r * this.zoom);
      const faceCanvasW = box.width * r * this.zoom;

      const faceHeightRatio = faceCanvasH / canvasH;
      metrics.faceSize = `${(faceHeightRatio * 100).toFixed(1)}%`;

      if (faceHeightRatio < 0.2) {
        alerts.push({ type: 'error', text: 'CASI INVISIBLE: Estás muy lejos. Haz zoom hasta que tu cara ocupe al menos un tercio de la pantalla.' });
      } else if (faceHeightRatio > 0.6) {
        alerts.push({ type: 'warning', text: 'DEMASIADO CERCA: Los primeros planos extremos pueden resultar agresivos.' });
      } else if (faceHeightRatio >= 0.3 && faceHeightRatio <= 0.5) {
        alerts.push({ type: 'success', text: 'TAMAÑO PERFECTO: Tu rostro tiene el ratio ideal para transmitir confianza.' });
      }

      const landmarks = this.faceDetection.landmarks;
      if (landmarks) {
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const avgEyeY_orig = (leftEye[0].y + rightEye[0].y) / 2;
        const eyeLineCanvasY = y + (avgEyeY_orig * r * this.zoom);
        const targetEyeY = 640;
        const eyeDiff = eyeLineCanvasY - targetEyeY;

        if (Math.abs(eyeDiff) < 150) {
          metrics.eyeLine = 'ÓPTIMA';
          alerts.push({ type: 'success', text: 'MIRADA IMPACTANTE: Tus ojos están en la línea de atención máxima.' });
        } else {
          metrics.eyeLine = eyeDiff > 0 ? 'BAJA' : 'ALTA';
          const direction = eyeDiff > 0 ? 'sube' : 'baja';
          alerts.push({ type: 'warning', text: `LÍNEA DE OJOS: Para un encuadre profesional, ${direction} un poco el rostro hasta la línea superior.` });
        }

        const roll = this.estimateRoll(landmarks);
        if (Math.abs(roll) > 15) {
          alerts.push({ type: 'warning', text: 'CABEZA INCLINADA: Una postura demasiado torcida puede transmitir inestabilidad.' });
        }
      }

      const expressions = this.faceDetection.expressions;
      if (expressions) {
        const happy = expressions.happy || 0;
        metrics.mood = happy > 0.7 ? 'POSITIVO' : 'NEUTRAL';
        if (happy > 0.7) {
          alerts.push({ type: 'success', text: 'SONRISA DETECTADA: Las sonrisas aumentan la tasa de match significativamente.' });
        } else if (expressions.angry > 0.4) {
          alerts.push({ type: 'warning', text: 'EXPRESIÓN SEVERA: Intenta usar una foto con un gesto más amable.' });
        }
      }

      const confidence = this.faceDetection.detection.score;
      metrics.quality = confidence > 0.8 ? 'ALTA' : 'MEDIA';
      if (confidence < 0.6) {
        alerts.push({ type: 'warning', text: 'ILUMINACIÓN DEFICIENTE: La IA tiene dificultades para verte. Busca una foto con mejor luz.' });
      }

      if (faceCanvasX < 0 || faceCanvasX + faceCanvasW > canvasW || faceCanvasY < 0 || faceCanvasY + faceCanvasH > canvasH) {
        alerts.push({ type: 'error', text: 'CORTADO: El rostro se sale del encuadre vertical.' });
      }

      if (faceCanvasY < 300) {
        alerts.push({ type: 'error', text: 'OBSTRUIDO: La barra de progreso tapa tu rostro.' });
      } else if (faceCanvasY + faceCanvasH > 1400) {
        alerts.push({ type: 'error', text: 'OBSTRUIDO: El bloque de información tapa tu cara.' });
      }
    }

    if (this.zoom < 1.15) {
      alerts.push({ type: 'warning', text: 'CONSEJO PRO: Si es una selfie, usa el Zoom (1.2x) para evitar distorsiones de lente.' });
    }

    return { alerts, metrics };
  }

  private estimateRoll(landmarks: any) {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const dy = rightEye[0].y - leftEye[0].y;
    const dx = rightEye[0].x - leftEye[0].x;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }

  getOptimalTransform() {
    if (!this.image || !this.faceDetection) return null;
    const box = this.faceDetection.detection.box;
    const iw = this.image.width;
    const ih = this.image.height;
    const r = Math.max(this.canvas.width / iw, this.canvas.height / ih);

    const targetFaceH = this.canvas.height * 0.25;
    const optimalZoom = Math.min(Math.max(targetFaceH / (box.height * r), 1), 3);
    
    const faceCenterY_orig = box.y + box.height / 2;
    const faceCenterX_orig = box.x + box.width / 2;
    
    const w = iw * r * optimalZoom;
    const h = ih * r * optimalZoom;

    const offsetY = 800 - (this.canvas.height - h)/2 - (faceCenterY_orig * r * optimalZoom);
    const offsetX = 540 - (this.canvas.width - w)/2 - (faceCenterX_orig * r * optimalZoom);

    return { zoom: optimalZoom, x: offsetX, y: offsetY };
  }

  draw(showFaceBox: boolean) {
    if (!this.image) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.filter = `brightness(${this.brightness}%)`;
    
    const iw = this.image.width;
    const ih = this.image.height;
    const r = Math.max(this.canvas.width / iw, this.canvas.height / ih);
    const w = iw * r * this.zoom;
    const h = ih * r * this.zoom;
    const x = (this.canvas.width - w) / 2 + this.offset.x;
    const y = (this.canvas.height - h) / 2 + this.offset.y;

    this.ctx.drawImage(this.image, x, y, w, h);

    if (showFaceBox && this.faceDetection) {
      const box = this.faceDetection.detection.box;
      const fx = x + (box.x * r * this.zoom);
      const fy = y + (box.y * r * this.zoom);
      const fw = box.width * r * this.zoom;
      const fh = box.height * r * this.zoom;

      this.ctx.strokeStyle = '#00ff00';
      this.ctx.lineWidth = 6;
      this.ctx.strokeRect(fx, fy, fw, fh);
      this.ctx.fillStyle = '#00ff00';
      this.ctx.font = 'bold 40px Arial';
      this.ctx.fillText('Cara detectada', fx, fy - 10);

      const landmarks = this.faceDetection.landmarks;
      if (landmarks) {
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        landmarks.positions.forEach((p: any) => {
          const px = x + (p.x * r * this.zoom);
          const py = y + (p.y * r * this.zoom);
          this.ctx.beginPath();
          this.ctx.arc(px, py, 2, 0, 2 * Math.PI);
          this.ctx.fill();
        });
      }
    }
  }
}
