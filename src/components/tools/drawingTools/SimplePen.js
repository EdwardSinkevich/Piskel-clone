export default class SimplePen {
  static drawingSimplePen(canvasCtx, currentX, currentY, canvasSizes) {
    canvasCtx.fillRect(currentX, currentY, canvasSizes, canvasSizes);
  }
}
