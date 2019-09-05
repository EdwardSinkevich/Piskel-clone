export default class Eraser {
  static erasing(canvasCtx, currentX, currentY, canvasSizes) {
    canvasCtx.clearRect(currentX, currentY, canvasSizes, canvasSizes);
  }
}
