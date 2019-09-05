import Canvas from './Canvas';

describe('canvasObj.constructor', () => {
  it('Should assign new image object to this.currentMainCanvasImg', () => {
    const canvasObj = new Canvas();
    expect(canvasObj.currentMainCanvasImg).toEqual(new Image());
  });
});

describe('canvasObj.addSelectedClass(sizeBtn)', () => {
  it('Should add class selected to click button', () => {
    const canvasObj = new Canvas();
    const testBtn = document.createElement('div');
    testBtn.className = 'size-btn-32';
    document.body.appendChild(testBtn);

    const testBtnSelected = document.createElement('div');
    testBtnSelected.classList.add('size-btn', 'selected');
    document.body.appendChild(testBtnSelected);

    canvasObj.addSelectedClass(32);
    const containsSelected = document.querySelector('.size-btn-32').classList.contains('selected');
    expect(containsSelected).toEqual(true);
  });
});

describe('canvasObj.copyImgFromMainCanvas', () => {
  it('Should copy current canvas image to this.currentMainCanvasImg.src', () => {
    const canvasObj = new Canvas();
    const canvas = document.createElement('canvas');
    canvasObj.canvas = canvas;
    const currentCanvasData = canvas.toDataURL('image/png', 1);
    canvasObj.copyImgFromMainCanvas();
    expect(canvasObj.currentMainCanvasImg.src).toEqual(currentCanvasData);
  });
});

describe('canvasObj.resizeCanvas', () => {
  const testObj = {
    width: 42,
    height: 42,
  };
  const canvasObj = new Canvas();
  beforeEach(() => {
    canvasObj.canvas = testObj;
    canvasObj.addSelectedClass = () => {};
    canvasObj.redowingMainCanvas = () => {};
    canvasObj.copyImgFromMainCanvas = () => {};
  });

  it('Should resize canvas to 32', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '32',
        },
      },
    };
    canvasObj.canvasSize.size = 64;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(32);
  });

  it('Should resize canvas to 32', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '32',
        },
      },
    };
    canvasObj.canvasSize.size = 128;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(32);
  });

  it('Should resize canvas to 64', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '64',
        },
      },
    };
    canvasObj.canvasSize.size = 32;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(64);
  });

  it('Should resize canvas to 64', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '64',
        },
      },
    };
    canvasObj.canvasSize.size = 128;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(64);
  });

  it('Should resize canvas to 128', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '128',
        },
      },
    };
    canvasObj.canvasSize.size = 32;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(128);
  });

  it('Should resize canvas to 128', () => {
    const resizeEvent = {
      target: {
        dataset: {
          canvasSize: '128',
        },
      },
    };
    canvasObj.canvasSize.size = 64;
    canvasObj.resizeCanvas(resizeEvent);
    expect(canvasObj.canvasSize.size).toEqual(128);
  });
});

describe('canvasObj.render()', () => {
  it('Should render correctly', () => {
    const canvasObj = new Canvas();
    const content = document.createElement('div');
    content.id = 'content';
    document.body.appendChild(content);
    canvasObj.render();
    expect(document.getElementById('content').innerHTML).toMatchSnapshot();
  });
});
