import './AnimationPreview.css';

export default class AnimationPreview {
  constructor(frames) {
    this.animatedPreview = null;
    this.animationPlayer = null;
    this.frames = frames;
    this.imgsArray = this.frames.imgsArray;
    this.intervalId = null;
    this.intervalCounter = 0;
    this.fps = 1000;
    this.rangeFps = null;
    this.fullScreenBtn = null;
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      if (this.imgsArray.length >= 1 && this.intervalCounter < this.imgsArray.length) {
        this.animationPlayer.style.backgroundImage = `url(${this.imgsArray[this.intervalCounter].src})`;
        this.intervalCounter += 1;
      }

      if (this.intervalCounter >= this.imgsArray.length) {
        if (this.imgsArray[this.intervalCounter - 1]) {
          this.animationPlayer.style.backgroundImage = `url(${this.imgsArray[this.intervalCounter - 1].src})`;
        }
        this.intervalCounter = 0;
      }
    }, this.fps);
  }

  redrawingOnAnimationPlayer() {
    if (this.intervalCounter === 0) {
      document.getElementById('animation-player').style.backgroundImage = `url(${this.frames.mainCanvasObj.currentMainCanvasImg.src})`;
    }
  }

  changeFps() {
    this.fps = 1000 / this.rangeFps.value;
    const displayFps = document.getElementById('display-fps');

    displayFps.innerText = `${this.rangeFps.value} FPS`;

    if (this.fps === Infinity) {
      displayFps.innerText = `${this.rangeFps.value} FPS`;

      this.intervalCounter = 0;

      clearInterval(this.intervalId);

      this.redrawingOnAnimationPlayer();
      return;
    }
    clearInterval(this.intervalId);
    this.startAnimation();
  }

  launchToFullscreen() {
    const animationPlayerContainer = document.getElementById('canvas-container-wrapper');
    animationPlayerContainer.webkitRequestFullscreen();
  }

  addListeners() {
    const redrawingOnAnimationPlayerWrap = this.redrawingOnAnimationPlayer.bind(this);
    this.frames.mainCanvas.addEventListener('mouseup', redrawingOnAnimationPlayerWrap);
    this.frames.mainCanvas.addEventListener('mouseleave', redrawingOnAnimationPlayerWrap);

    const changeFpsWrap = this.changeFps.bind(this);
    this.rangeFps.addEventListener('input', changeFpsWrap);

    const launchToFullscreenWrap = this.launchToFullscreen.bind(this);
    this.fullScreenBtn.addEventListener('click', launchToFullscreenWrap);
  }

  render() {
    this.animatedPreview = document.getElementById('animated-preview-container');
    this.animatedPreview.innerHTML = `
    <div id="canvas-container-wrapper" class="canvas-container-wrapper">
      <div id="animated-preview-canvas-container" class="animated-preview-canvas-container">
        <div class="canvas-background"></div>
        <div id="animation-player" class="animation-player"></div>
      </div>
      <div class="display-fps-container">
        <button id="full-screen-btn" class="nav-btn full-screen-btn tooltip-action">Full
        <span class="tooltip full-screen-tooltip">Press F</span>
        </button>
        <span id="display-fps" class="display-fps">1 FPS</span>
        <input id="range-fps" class="range-fps" type="range" min="0" step="1" value="1" max="24">
      </div>
    </div>`;

    this.animationPlayer = document.getElementById('animation-player');
    this.rangeFps = document.getElementById('range-fps');
    this.fullScreenBtn = document.getElementById('full-screen-btn');

    this.addListeners();

    this.startAnimation();
  }
}
