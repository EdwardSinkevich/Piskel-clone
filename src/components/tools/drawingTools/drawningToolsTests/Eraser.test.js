import Eraser from '../Eraser';

describe('Eraser.erasing', () => {
  it('Should erase canvas', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    Eraser.erasing(testCanvasCtx, 1, 1, 20);
    const testCanvasCtxData = testCanvasCtx.getImageData(0, 0, testCanvas.width, testCanvas.height).data;
    expect(testCanvasCtxData[1]).toEqual(0);
  });
});
