export default class PaintSameColor {
  static fillSameColor(canvasCtx, x, y) {
    canvasCtx.rect(0, 0, x, y);
    canvasCtx.fill();
  }
}
