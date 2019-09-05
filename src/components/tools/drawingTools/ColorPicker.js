export default class ColorPicker {
  static getColor(canvas, canvasCtx, currentX, currentY) {
    const colorLayer = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelPos = (currentY * canvas.width + currentX) * 4;
    const r = colorLayer.data[pixelPos];
    const g = colorLayer.data[pixelPos + 1];
    const b = colorLayer.data[pixelPos + 2];
    const a = colorLayer.data[pixelPos + 3];
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
}
