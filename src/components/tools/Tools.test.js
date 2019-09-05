import Tools from './Tools';
import SimplePen from './drawingTools/SimplePen';
import Eraser from './drawingTools/Eraser';
import PaintSameColor from './drawingTools/PaintSameColor';
import ColorPicker from './drawingTools/ColorPicker';
import CursorCoordinates from './helpTools/CursorCoordinates';
import ColorSelect from './drawingTools/ColorSelect';
import SwapColors from './drawingTools/SwapColors';

describe('Tools.constructor', () => {
  it('Should assign object to this.canvasObj', () => {
    const testObj = {};
    const tools = new Tools(testObj);
    expect(tools.canvasObj).toEqual(testObj);
  });
});

describe('Tools.changeIfMouseDown', () => {
  it('Should assign this.ifMouseDown to true', () => {
    const testObj = {};
    const tools = new Tools(testObj);
    tools.changeIfMouseDown();
    expect(tools.ifMouseDown).toEqual(true);
  });
});

describe('Tools.changeIfMouseUp', () => {
  it('Should assign this.ifMouseDown to false', () => {
    const testObj = {};
    const tools = new Tools(testObj);
    tools.canvasCtx = testObj;
    tools.canvasCtx.beginPath = () => {};
    tools.changeIfMouseUp();
    expect(tools.ifMouseDown).toEqual(false);
  });
});

describe('Tools.changeIfMouseLeave', () => {
  it('Should assign this.ifMouseDown to false', () => {
    const testObj = {
      beginPath: () => {},
    };
    const tools = new Tools(testObj);
    tools.canvasCtx = testObj;
    CursorCoordinates.hideCoords = () => {};
    tools.changeIfMouseLeave();
    expect(tools.ifMouseDown).toEqual(false);
  });
});

describe('Tools.setPaintAreaSize', () => {
  it('Should assign this.setPaintAreaSize to 16', () => {
    const testObj = {
      width: 512,
      canvasSize: {
        size: 32,
      },
    };
    const tools = new Tools(testObj);
    tools.canvas = testObj;
    tools.penSize.size = 1;
    tools.setPaintAreaSize();
    expect(tools.paintAreaSize).toEqual(16);
  });
});

describe('Tools.setPaintAreaSize', () => {
  it('Should assign this.setPaintAreaSize to 32', () => {
    const testObj = {
      width: 512,
      canvasSize: {
        size: 32,
      },
    };
    const tools = new Tools(testObj);
    tools.canvas = testObj;
    tools.penSize.size = 2;
    tools.setPaintAreaSize();
    expect(tools.paintAreaSize).toEqual(32);
  });
});

describe('Tools.setPaintAreaSize', () => {
  it('Should assign this.setPaintAreaSize to 64', () => {
    const testObj = {
      width: 512,
      canvasSize: {
        size: 32,
      },
    };
    const tools = new Tools(testObj);
    tools.canvas = testObj;
    tools.penSize.size = 3;
    tools.setPaintAreaSize();
    expect(tools.paintAreaSize).toEqual(64);
  });
});

describe('Tools.setPaintAreaSize', () => {
  it('Should assign this.setPaintAreaSize to 128', () => {
    const testObj = {
      width: 512,
      canvasSize: {
        size: 32,
      },
    };
    const tools = new Tools(testObj);
    tools.canvas = testObj;
    tools.penSize.size = 4;
    tools.setPaintAreaSize();
    expect(tools.paintAreaSize).toEqual(128);
  });
});

describe('Tools.setColors', () => {
  it('Should assign this.canvasCtx.fillStyle to primary', () => {
    const testObj = {
      fillStyle: null,
      primary: 'red',
      secondary: 'blue',
      which: 1,
    };
    const tools = new Tools(testObj);
    tools.canvasCtx = testObj;
    tools.color = testObj;
    tools.setColors(testObj);
    expect(tools.canvasCtx.fillStyle).toEqual(testObj.primary);
  });
});

describe('Tools.setColors', () => {
  it('Should assign this.canvasCtx.fillStyle to secondary', () => {
    const testObj = {
      fillStyle: null,
      primary: 'red',
      secondary: 'blue',
      which: 3,
    };
    const tools = new Tools(testObj);
    tools.canvasCtx = testObj;
    tools.color = testObj;
    tools.setColors(testObj);
    expect(tools.canvasCtx.fillStyle).toEqual(testObj.secondary);
  });
});

describe('Tools.toolAction(e)', () => {
  const testObj = {
    offsetX: 42,
    offsetY: 42,
    currnetTool: null,
  };

  const tools = new Tools(testObj);

  beforeEach(() => {
    tools.setPaintAreaSize = () => {};
    tools.paintAreaSize = 42;
    tools.ifMouseDown = true;
    tools.setColors = () => {};
    tools.tool = testObj;
  });

  it('Should call CursorCoordinates.showCoords', () => {
    const myMock = jest.fn();
    CursorCoordinates.showCoords = myMock;
    tools.toolAction(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call SimplePen.drawingSimplePen', () => {
    const myMock = jest.fn();
    tools.tool.currnetTool = 'pen';
    SimplePen.drawingSimplePen = myMock;
    tools.toolAction(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call Eraser.erasing', () => {
    const myMock = jest.fn();
    tools.tool.currnetTool = 'eraser';
    Eraser.erasing = myMock;
    tools.toolAction(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call PaintSameColor.fillSameColor', () => {
    const myMock = jest.fn();
    tools.canvas = {
      width: 42,
    };
    tools.canvas = {
      height: 42,
    };
    tools.tool.currnetTool = 'fill-same-color';
    PaintSameColor.fillSameColor = myMock;
    tools.toolAction(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call PaintSameColor.fillSameColor', () => {
    const myMock = jest.fn();
    const prymaryPalette = document.createElement('div');
    prymaryPalette.id = 'primary-color-palette';
    document.body.appendChild(prymaryPalette);

    tools.tool.currnetTool = 'colorpicker';
    ColorPicker.getColor = myMock;
    tools.toolAction(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Tools.selectTool', () => {
  const testObj = {
    target: {
      dataset: {
        toolId: null,
        size: null,
      },
    },
  };
  const tools = new Tools(testObj);
  tools.tool = {
    currnetTool: null,
  };

  beforeEach(() => {
    tools.addSelectedClassToTool = () => {};
    tools.addSelectedClassToPenSizes = () => {};
  });

  afterEach(() => {
    testObj.target.dataset.toolId = null;
    testObj.target.dataset.size = null;
  });

  it('Should assign current tool to pen', () => {
    testObj.target.dataset.toolId = 'tool-pen';
    tools.selectTool(testObj);
    expect(tools.tool.currnetTool).toEqual('pen');
  });

  it('Should assign current tool to eraser', () => {
    testObj.target.dataset.toolId = 'tool-eraser';
    tools.selectTool(testObj);
    expect(tools.tool.currnetTool).toEqual('eraser');
  });

  it('Should assign current tool to paint bucket', () => {
    testObj.target.dataset.toolId = 'tool-paint-bucket';
    tools.selectTool(testObj);
    expect(tools.tool.currnetTool).toEqual('paint-bucket');
  });

  it('Should assign current tool to fill same color', () => {
    testObj.target.dataset.toolId = 'tool-fill-same-color';
    tools.selectTool(testObj);
    expect(tools.tool.currnetTool).toEqual('fill-same-color');
  });

  it('Should assign current tool to colorpicker', () => {
    testObj.target.dataset.toolId = 'tool-colorpicker';
    tools.selectTool(testObj);
    expect(tools.tool.currnetTool).toEqual('colorpicker');
  });

  it('Should assign this.penSize.size to 1', () => {
    testObj.target.dataset.size = '1';
    tools.selectTool(testObj);
    expect(tools.penSize.size).toEqual(1);
  });

  it('Should assign this.penSize.size to 2', () => {
    testObj.target.dataset.size = '2';
    tools.selectTool(testObj);
    expect(tools.penSize.size).toEqual(2);
  });

  it('Should assign this.penSize.size to 3', () => {
    testObj.target.dataset.size = '3';
    tools.selectTool(testObj);
    expect(tools.penSize.size).toEqual(3);
  });

  it('Should assign this.penSize.size to 4', () => {
    testObj.target.dataset.size = '4';
    tools.selectTool(testObj);
    expect(tools.penSize.size).toEqual(4);
  });

  it('Should call ColorSelect.pickPrimary', () => {
    const myMock = jest.fn();
    testObj.target.dataset.toolId = 'primary-color';
    ColorSelect.pickPrimary = myMock;
    tools.selectTool(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call ColorSelect.pickSecondary', () => {
    const myMock = jest.fn();
    testObj.target.dataset.toolId = 'secondary-color';
    ColorSelect.pickSecondary = myMock;
    tools.selectTool(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call SwapColors.swapColors', () => {
    const myMock = jest.fn();
    testObj.target.dataset.toolId = 'swap-color';
    SwapColors.swapColors = myMock;
    tools.selectTool(testObj);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Tools.setPaletteBackgrounds', () => {
  it('Should assign primary сolor backgroundImage to this.color.primary', () => {
    const testObj = {};
    const tools = new Tools(testObj);

    const primaryColorPalette = document.createElement('div');
    primaryColorPalette.id = 'primary-color-palette';
    document.body.appendChild(primaryColorPalette);

    const secondaryColorPalette = document.createElement('div');
    secondaryColorPalette.id = 'secondary-color-palette';
    document.body.appendChild(secondaryColorPalette);

    tools.color = {
      primary: 'red',
    };
    tools.setPaletteBackgrounds();
    const primaryColorPaletteAfter = document.getElementById('primary-color-palette');
    const primaryColorPaletteAfterBackgroundColor = getComputedStyle(primaryColorPaletteAfter).getPropertyValue('background-color');
    expect(primaryColorPaletteAfterBackgroundColor).toEqual(tools.color.primary);
  });
});

describe('Tools.render', () => {
  it('Should assign this.tools to HTMLDivElement with class drawing-tools-section-wrap', () => {
    const testObj = {};
    const tools = new Tools(testObj);
    const mainContainer = document.createElement('div');
    mainContainer.id = 'main-container';
    document.body.appendChild(mainContainer);

    tools.addSelectedClassToTool = () => {};
    tools.addSelectedClassToPenSizes = () => {};
    tools.setPaletteBackgrounds = () => {};
    tools.addListeners = () => {};

    tools.render();
    expect(tools.tools.classList.contains('drawing-tools-section-wrap')).toEqual(true);
  });
});
