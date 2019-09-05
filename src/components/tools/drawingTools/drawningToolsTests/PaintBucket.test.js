import PaintBucket from '../PaintBucket';

describe('PaintBucket.constructor', () => {
  it('Should assign this.canvas to canvas', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    expect(paintBucketTest.canvas).toEqual(testCanvas);
  });
});

describe('PaintBucket.paintAt', () => {
  it('Should return if hex not define', () => {
    const myMock = jest.fn();
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.floodFill = myMock;
    paintBucketTest.paintAt(0, 0, '');
    expect(myMock.mock.invocationCallOrder.length).toBe(0);
  });

  it('Should return if hex equals this.colorLayer.data', () => {
    const myMock = jest.fn();
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.floodFill = myMock;
    paintBucketTest.colorLayer._data = [0, 0, 0, 1];
    paintBucketTest.paintAt(0, 0, '#000000');
    expect(myMock.mock.invocationCallOrder.length).toBe(0);
  });

  it('Should call this.floodFill', () => {
    const myMock = jest.fn();
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.floodFill = myMock;
    paintBucketTest.paintAt(0, 0, '#000000');
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('PaintBucket.floodFill', () => {
  it('Should put this.colorLayer data to this.canvasCtx', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.colorLayer = testCanvasCtx.getImageData(0, 0, testCanvas.width, testCanvas.height);
    paintBucketTest.floodFill(paintBucketTest.colorLayer, 0, 0);
    const paintBucketTestData = paintBucketTest.canvasCtx.getImageData(0, 0, paintBucketTest.canvas.width, paintBucketTest.canvas.height);
    expect(paintBucketTestData).toEqual(paintBucketTestData);
  });
});

describe('PaintBucket.matchOutlineColor(r, g, b, a)', () => {
  it('Should return if color r + g + b < 100 && a === 255', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    expect(paintBucketTest.matchOutlineColor(0, 0, 0, 0)).toBe(false);
  });
});

describe('PaintBucket.matchStartColor', () => {
  it('Should return true if this.colorLayer.data equals starts colors', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.colorLayer._data = [42, 42, 42, 42];
    expect(paintBucketTest.matchStartColor(0, 42, 42, 42, 42)).toBe(true);
  });

  it('Should return false if this.colorLayer.data equals this.fillColor', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.fillColor = [42, 42, 42];
    expect(paintBucketTest.matchStartColor(0, 42, 42, 42)).toBe(false);
  });

  it('Should return false if this.colorLayer.data not equals starts colors', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.fillColor = [22, 22, 22, 22];
    expect(paintBucketTest.matchStartColor(0, 42, 42, 42, 42)).toBe(false);
  });
});

describe('PaintBucket.colorPixel', () => {
  it('Should assign  this.colorLayer.data to fillColorR, fillColorG, fillColorB, fillColorA', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);
    paintBucketTest.colorPixel(0, 42, 42, 42, 42);
    expect(paintBucketTest.colorLayer.data[0]).toEqual(42);
  });
});

describe('PaintBucket.hexToRGB(hex)', () => {
  it('Should return false if hex equals rgba(0, 0, 0, 0)', () => {
    const testCanvas = document.createElement('canvas');
    const testCanvasCtx = testCanvas.getContext('2d');
    const paintBucketTest = new PaintBucket(testCanvas, testCanvasCtx);

    expect(paintBucketTest.hexToRGB('rgba(0, 0, 0, 0)')).toBe(false);
  });
});
