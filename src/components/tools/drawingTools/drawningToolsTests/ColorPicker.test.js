import ColorPicker from '../ColorPicker';

describe('ColorPicker.getColor', () => {
  it('Should return rgba(0, 0, 0, 0)', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    expect(ColorPicker.getColor(testCanvas, testCanvasCtx, 0, 0)).toBe('rgba(0, 0, 0, 0)');
  });
});
