import AnimationPreview from './AnimationPreview';

describe('AnimationPreview.constructor', () => {
  it('Should assign this.frames to frames', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    expect(animationPreview.frames).toEqual(testObj);
  });
});

describe('AnimationPreview.startAnimation', () => {
  it('Should assign this.intervalId', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.startAnimation();
    expect(animationPreview.intervalId).not.toBeNull();
    clearInterval(animationPreview.intervalId);
  });
});

describe('AnimationPreview.redrawingOnAnimationPlayer', () => {
  it('Should assign animation player backgroundImage to this.frames.mainCanvasObj.currentMainCanvasImg.src', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.intervalCounter = 0;

    const animationPlayer = document.createElement('div');
    animationPlayer.id = 'animation-player';
    document.body.appendChild(animationPlayer);

    animationPreview.frames = {
      mainCanvasObj: {
        currentMainCanvasImg: {
          src: 'testUrl',
        },
      },
    };
    animationPreview.redrawingOnAnimationPlayer();
    const animationPlayerAfter = document.getElementById('animation-player');
    const animationPlayerBackgroundImage = getComputedStyle(animationPlayerAfter).getPropertyValue('background-image');
    expect(animationPlayerBackgroundImage).toEqual(`url(${animationPreview.frames.mainCanvasObj.currentMainCanvasImg.src})`);
  });

  it('Should not assign animation player backgroundImage to this.frames.mainCanvasObj.currentMainCanvasImg.src if this.intervalCounter not equals 0', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.intervalCounter = 1;

    const animationPlayer = document.createElement('div');
    animationPlayer.id = 'animation-player';
    document.body.appendChild(animationPlayer);

    animationPreview.frames = {
      mainCanvasObj: {
        currentMainCanvasImg: {
          src: 'testUrlIfNotZero',
        },
      },
    };
    animationPreview.redrawingOnAnimationPlayer();
    const animationPlayerAfter = document.getElementById('animation-player');
    const animationPlayerBackgroundImage = getComputedStyle(animationPlayerAfter).getPropertyValue('background-image');
    expect(animationPlayerBackgroundImage).not.toEqual(`url(${animationPreview.frames.mainCanvasObj.currentMainCanvasImg.src})`);
  });
});

describe('AnimationPreview.changeFps', () => {
  const displayFps = document.createElement('div');
  displayFps.id = 'display-fps';
  document.body.appendChild(displayFps);

  it('Should set fps value in element with id equals display-fps', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.rangeFps = {
      value: 1,
    };

    animationPreview.changeFps();
    expect(displayFps.innerText).toEqual(`${animationPreview.rangeFps.value} FPS`);
  });

  it('Should set fps value in element with id equals display-fps to 0 if this.rangeFps.value === 0', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.rangeFps = {
      value: 0,
    };
    animationPreview.redrawingOnAnimationPlayer = () => {};

    animationPreview.changeFps();
    expect(displayFps.innerText).toEqual(`${animationPreview.rangeFps.value} FPS`);
  });
});

describe('AnimationPreview.launchToFullscreen', () => {
  it('Should call webkitRequestFullscreen', () => {
    const myMock = jest.fn();
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);

    const animationPlayerContainer = document.createElement('div');
    animationPlayerContainer.id = 'canvas-container-wrapper';
    document.body.appendChild(animationPlayerContainer);

    animationPlayerContainer.webkitRequestFullscreen = myMock;
    animationPreview.launchToFullscreen();
    expect(myMock.mock.invocationCallOrder.length).toBe(1);
  });
});

describe('AnimationPreview.render', () => {
  it('Should render correctly', () => {
    const testObj = {};
    const animationPreview = new AnimationPreview(testObj);
    animationPreview.addListeners = () => {};

    const animatedPreview = document.createElement('div');
    animatedPreview.id = 'animated-preview-container';
    document.body.appendChild(animatedPreview);
    animationPreview.render();
    expect(document.getElementById('animated-preview-container').innerHTML).toMatchSnapshot();
  });
});
