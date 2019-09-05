import KeyboardShotcuts from '../KeyboardShotcuts';
import ColorSelect from '../../drawingTools/ColorSelect';
import SwapColors from '../../drawingTools/SwapColors';

describe('KeyboardShotcuts.constructor', () => {
  it('Should assign this.canvas to canvas', () => {
    const canvas = document.createElement('canvas');
    const keyboardShotcuts = new KeyboardShotcuts(canvas);
    expect(keyboardShotcuts.canvas).toEqual(canvas);
  });
});

describe('KeyboardShotcuts.selectActionByKey', () => {
  const keyboardShotcuts = new KeyboardShotcuts();
  const keyCodes = {
    keyP: 80,
    keyA: 65,
    keyB: 66,
    keyE: 69,
    key1: 49,
    key2: 50,
    key3: 51,
    key4: 52,
    keyX: 88,
    keyZ: 90,
    keyC: 67,
    keyN: 78,
    keyT: 84,
    keyY: 89,
    keyU: 85,
    keyF: 70,
    keyQ: 81,
  };

  beforeEach(() => {
    keyboardShotcuts.tools = {
      tool: {
        currnetTool: null,
      },
      penSize: {
        size: null,
      },
      addSelectedClassToTool: () => {},
      addSelectedClassToPenSizes: () => {},
    };

    keyboardShotcuts.frames = {
      addFrame: () => {},
    };

    keyboardShotcuts.canvas = {
      resizeCanvas: () => {},
    };

    keyboardShotcuts.preview = {
      launchToFullscreen: () => {},
    };
  });

  afterEach(() => {
    keyboardShotcuts.tools = {
      tool: {
        currnetTool: null,
      },
      penSize: {
        size: null,
      },
    };
  });

  it('Should assign this.tools.tool.currnetTool to pen', () => {
    const key = {
      keyCode: keyCodes.keyP,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.tool.currnetTool).toEqual('pen');
  });

  it('Should assign this.tools.tool.currnetTool to paint-bucket', () => {
    const key = {
      keyCode: keyCodes.keyB,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.tool.currnetTool).toEqual('paint-bucket');
  });

  it('Should assign this.tools.tool.currnetTool to fill-same-color', () => {
    const key = {
      keyCode: keyCodes.keyA,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.tool.currnetTool).toEqual('fill-same-color');
  });

  it('Should assign this.tools.tool.currnetTool to colorpicker', () => {
    const key = {
      keyCode: keyCodes.keyQ,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.tool.currnetTool).toEqual('colorpicker');
  });

  it('Should assign this.tools.penSize.size to 1', () => {
    const key = {
      keyCode: keyCodes.key1,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.penSize.size).toEqual(1);
  });

  it('Should assign this.tools.penSize.size to 2', () => {
    const key = {
      keyCode: keyCodes.key2,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.penSize.size).toEqual(2);
  });

  it('Should assign this.tools.penSize.size to 3', () => {
    const key = {
      keyCode: keyCodes.key3,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.penSize.size).toEqual(3);
  });

  it('Should assign this.tools.penSize.size to 4', () => {
    const key = {
      keyCode: keyCodes.key4,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(keyboardShotcuts.tools.penSize.size).toEqual(4);
  });

  it('Should call ColorSelect.pickPrimary', () => {
    const myMock = jest.fn();
    ColorSelect.pickPrimary = myMock;
    const key = {
      keyCode: keyCodes.keyZ,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call ColorSelect.pickSecondary', () => {
    const myMock = jest.fn();
    ColorSelect.pickSecondary = myMock;
    const key = {
      keyCode: keyCodes.keyX,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call SwapColors.swapColors', () => {
    const myMock = jest.fn();
    SwapColors.swapColors = myMock;
    const key = {
      keyCode: keyCodes.keyC,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.frames.addFrame', () => {
    const myMock = jest.fn();
    keyboardShotcuts.frames.addFrame = myMock;
    const key = {
      keyCode: keyCodes.keyN,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.canvas.resizeCanvas', () => {
    const myMock = jest.fn();
    keyboardShotcuts.canvas.resizeCanvas = myMock;
    const key = {
      keyCode: keyCodes.keyT,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.canvas.resizeCanvas', () => {
    const myMock = jest.fn();
    keyboardShotcuts.canvas.resizeCanvas = myMock;
    const key = {
      keyCode: keyCodes.keyY,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.canvas.resizeCanvas', () => {
    const myMock = jest.fn();
    keyboardShotcuts.canvas.resizeCanvas = myMock;
    const key = {
      keyCode: keyCodes.keyU,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.preview.launchToFullscreen', () => {
    const myMock = jest.fn();
    keyboardShotcuts.preview.launchToFullscreen = myMock;
    const key = {
      keyCode: keyCodes.keyF,
    };
    keyboardShotcuts.selectActionByKey(key);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});
