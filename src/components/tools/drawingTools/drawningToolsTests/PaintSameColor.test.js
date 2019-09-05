import PaintSameColor from '../PaintSameColor';

describe('PaintSameColor.fillSameColor', () => {
  it('Should fill all to same color', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    testCanvasCtx.fillStyle = 'rgba(0, 0, 0, 1)';
    PaintSameColor.fillSameColor(testCanvasCtx, 100, 100);

    const testCanvasCtxData = testCanvasCtx.getImageData(0, 0, 100, 100).data;
    expect(testCanvasCtxData[0]).toEqual(0);
  });
});
