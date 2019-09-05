import SimplePen from '../SimplePen';

describe('SimplePen.drawingSimplePen', () => {
  it('Should draw correct', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    testCanvas.width = 20;
    testCanvas.height = 20;
    testCanvasCtx.fillStyle = 'rgba(0, 0, 0, 1)';
    SimplePen.drawingSimplePen(testCanvasCtx, 10, 10, testCanvas.width);
    const testCanvasCtxData = testCanvasCtx.getImageData(10, 10, testCanvas.width, testCanvas.height).data;
    expect(testCanvasCtxData[0]).toEqual(0);
  });
});
