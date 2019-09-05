import Frames from './Frames';

describe('Frames.constructor', () => {
  it('Should assign this.mainCanvasObj to mainCanvas', () => {
    const canvasObj = {
      canvas: document.createElement('canvas'),
    };
    const frames = new Frames(canvasObj);
    expect(frames.mainCanvasObj).toEqual(canvasObj);
  });
});

describe('Frames.createFrame', () => {
  it('Should return frame HTMLElement', () => {
    const canvas = document.createElement('canvas');
    const frames = new Frames(canvas);
    const testFrame = document.createElement('li');
    const numberOfFrame = 42;
    testFrame.className = 'frame-item';
    testFrame.dataset.tileNumber = numberOfFrame;
    testFrame.innerHTML = `<div class="lowcont-dark-canvas-background">
    <div class="canvas-background"></div>
    <canvas class="tile-view canvas" width="96" height="96"></canvas></div>
    <button class="tile-overlay icon-frame-duplicate" data-tile-action="clone"></button>
    <button class="tile-overlay icon-frame-recyclebin visible" data-tile-action="delete"></button>
    <div class="tile-overlay icon-frame-dragndrop handle visible"></div>
    <button class="tile-overlay tile-count">${numberOfFrame}</button>`;

    expect(frames.createFrame(42)).toEqual(testFrame);
  });
});

describe('Frames.addFrame', () => {
  it('Should add frame to previewList', () => {
    const previewList = document.createElement('div');
    const canvas = document.createElement('canvas');
    const frames = new Frames(canvas);
    frames.updateAfterAddFrame = () => {};
    frames.previewList = previewList;
    frames.addFrame();
    expect(previewList.hasChildNodes()).toBe(true);
  });
});

describe('Frames.createNewImage', () => {
  it('Should assign this.mainCanvasObj.currentMainCanvasImg to new Image object', () => {
    const canvas = document.createElement('canvas');
    const frames = new Frames(canvas);
    frames.createNewImage();
    expect(frames.mainCanvasObj.currentMainCanvasImg).toBeInstanceOf(Image);
  });
});

describe('Frames.updateAfterAddFrame', () => {
  it('Should call createNewImage', () => {
    const myMock = jest.fn();
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.createNewImage = myMock;
    frames.updateAfterAddFrame();
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Frames.removeFrame', () => {
  it('Should removeChild from this.previewList', () => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    const previewList = document.createElement('div');
    frames.updateIfRemoveLastFrame = () => {};
    frames.previewList = previewList;
    frames.addFrame();
    frames.removeFrame(previewList.firstChild, 1);
    expect(previewList.hasChildNodes()).toBe(false);
  });

  it('Should call this.updateIfRemoveLastFrame if remove last frame', () => {
    const myMock = jest.fn();
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    const previewList = document.createElement('div');
    // frames.updateIfRemoveLastFrame = () => {};
    frames.previewList = previewList;
    frames.addFrame();
    frames.updateIfRemoveLastFrame = myMock;
    frames.removeFrame(previewList.firstChild, 1);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call this.showOrHideBtns if this.amountFrames becames 1', () => {
    const myMock = jest.fn();
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    const previewList = document.createElement('div');
    frames.updateIfRemoveLastFrame = () => {};
    frames.updateFramesNumbers = () => {};
    frames.previewList = previewList;
    frames.addFrame();
    frames.showOrHideBtns = myMock;
    frames.amountFrames = 2;
    frames.removeFrame(previewList.firstChild, 1);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Frames.updateIfRemoveLastFrame', () => {
  it('Should assign currentMainCanvasImg to imgsArray[removedFrameNumber - 2] if remove last frame', () => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
      currentMainCanvasImg: null,
    };
    const frames = new Frames(canvasObj);
    frames.mainCanvasCtx.drawImage = () => {};
    const previewList = document.createElement('div');
    frames.previewList = previewList;
    frames.imgsArray = [41, 42, 43, 44];
    frames.addFrame();
    frames.addFrame();
    frames.addFrame();
    frames.updateIfRemoveLastFrame(2);
    expect(frames.mainCanvasObj.currentMainCanvasImg).toEqual(41);
  });

  it('Should assign currentMainCanvasImg to imgsArray[removedFrameNumber - 2] if remove frame before last', () => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
      currentMainCanvasImg: null,
    };
    const frames = new Frames(canvasObj);
    frames.mainCanvasCtx.drawImage = () => {};
    const previewList = document.createElement('div');
    frames.previewList = previewList;
    frames.imgsArray[1] = new Image();
    frames.addFrame();
    frames.updateIfRemoveLastFrame(1);
    expect(frames.mainCanvasObj.currentMainCanvasImg).toEqual(new Image());
  });
});

describe('Frames.copyFrame', () => {
  it('Should copy frame and insert before copied', () => {
    const previewList = document.createElement('div');
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.updateFramesNumbers = () => {};
    frames.updateAfterCopyFrame = () => {};

    frames.previewList = previewList;
    frames.addFrame();
    frames.copyFrame(previewList.firstChild, 0);
    expect(previewList.childElementCount).toBe(2);
  });
});

describe('Frames.updateAfterCopyFrame', () => {
  it('Should call updateAfterAddFrame', () => {
    const myMock = jest.fn();
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.drawCurrnetImgToCurrentFrame = () => {};
    frames.imgsArray = [new Image(), new Image()];
    frames.updateAfterAddFrame = myMock;
    frames.updateAfterCopyFrame(1);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Frames.updateFramesNumbers', () => {
  it('Should update frames numbers', () => {
    const previewList = document.createElement('div');
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.previewList = previewList;
    frames.addFrame();
    frames.addFrame();
    frames.addFrame();
    frames.addFrame();

    frames.removeFrame(frames.previewList.firstChild, 1);
    frames.updateFramesNumbers();
    const numberLastChild = frames.previewList.lastChild.querySelector('.tile-count').innerHTML;
    expect(numberLastChild).toBe('3');
  });
});

describe('Frames.showOrHideBtns', () => {
  it('Should add className visible to removeBtn', () => {
    const previewList = document.createElement('div');
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.previewList = previewList;
    frames.addFrame();
    frames.showOrHideBtns();
    const removeBtn = frames.previewList.querySelector('.icon-frame-recyclebin');
    expect(removeBtn.classList.contains('visible')).toBe(true);
  });
});

describe('Frames.frameActionsByEvent', () => {
  const canvas = document.createElement('canvas');
  const canvasCtx = canvas.getContext('2d');
  const canvasObj = {
    canvas,
    canvasCtx,
  };
  it('Should call Frame.addFrame', () => {
    const myMock = jest.fn();
    const eventTest = {
      target: {
        dataset: {
          tileAction: 'add',
        },
      },
    };
    const frames = new Frames(canvasObj);
    frames.addFrame = myMock;
    frames.frameActionsByEvent(eventTest);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call Frame.copyFrame', () => {
    const myMock = jest.fn();
    const eventTest = {
      target: {
        dataset: {
          tileAction: 'clone',
        },
        parentNode: {
          dataset: {
            tileAction: 'clone',
          },
        },
      },
    };
    const frames = new Frames(canvasObj);
    frames.copyFrame = myMock;
    frames.frameActionsByEvent(eventTest);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });

  it('Should call Frame.removeFrame', () => {
    const myMock = jest.fn();
    const eventTest = {
      target: {
        dataset: {
          tileAction: 'delete',
        },
        parentNode: {
          dataset: {
            tileAction: 'delete',
          },
        },
      },
    };
    const frames = new Frames(canvasObj);
    frames.removeFrame = myMock;
    frames.frameActionsByEvent(eventTest);
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('Frames.moveImagesInArray', () => {
  it('Should move images in this.imgsArray', () => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.imgsArray = [41, 42, 43, 44];
    frames.moveImagesInArray(2, 1);
    expect(frames.imgsArray[2]).toEqual(42);
  });
});

describe('Frames.render', () => {
  it('Should render correctly', () => {
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    const canvasObj = {
      canvas,
      canvasCtx,
    };
    const frames = new Frames(canvasObj);
    frames.addDragAndDrop = () => {};
    const previewWrapper = document.createElement('div');
    previewWrapper.id = 'preview-list-wrapper';
    document.body.appendChild(previewWrapper);
    frames.render();
    expect(document.getElementById('preview-list-wrapper').innerHTML).toMatchSnapshot();
  });
});
