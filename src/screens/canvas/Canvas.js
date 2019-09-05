import CanvasHtml from './Canvas.html';
import './Canvas.css';

export default class Canvas {
  constructor() {
    this.canvas = null;
    this.canvasCtx = null;
    this.canvasSize = {
      size: localStorage.getItem('canvasSize') ? JSON.parse(localStorage.getItem('canvasSize')) : 32,
    };
    this.mainCanvasWrapper = null;
    this.currentMainCanvasImg = new Image();
    this.ImgX0 = null;
    this.ImgY0 = null;
    this.ImgX1 = null;
    this.ImgY1 = null;
  }

  redowingMainCanvas() {
    this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvasCtx.drawImage(this.currentMainCanvasImg, this.ImgX0, this.ImgY0, this.ImgX1, this.ImgY1);
  }

  addSelectedClass(sizeBtn) {
    document.querySelector('.size-btn.selected ').classList.remove('selected');
    document.querySelector(`.size-btn-${sizeBtn}`).classList.add('selected');
  }

  resizeCanvas(e) {
    if (e.target.dataset.canvasSize === '32'
    && this.canvasSize.size !== 32) {
      if (this.canvasSize.size === 64) {
        this.canvasSize.size = 32;
        this.ImgX0 = -this.canvasSize.size * 8;
        this.ImgY0 = -this.canvasSize.size * 8;
        this.ImgX1 = this.canvas.width * 2;
        this.ImgY1 = this.canvas.width * 2;
      }

      if (this.canvasSize.size === 128) {
        this.canvasSize.size = 32;
        this.ImgX0 = -this.canvasSize.size * 24;
        this.ImgY0 = -this.canvasSize.size * 24;
        this.ImgX1 = this.canvas.width * 4;
        this.ImgY1 = this.canvas.width * 4;
      }
      this.addSelectedClass(this.canvasSize.size);
      this.redowingMainCanvas();
      this.copyImgFromMainCanvas();
      localStorage.setItem('canvasSize', JSON.stringify(this.canvasSize.size));
    }

    if (e.target.dataset.canvasSize === '64'
    && this.canvasSize.size !== 64) {
      this.addSelectedClass(this.canvasSize.size);

      if (this.canvasSize.size === 32) {
        this.canvasSize.size = 64;
        this.ImgX0 = this.canvasSize.size * 2;
        this.ImgY0 = this.canvasSize.size * 2;
        this.ImgX1 = this.canvas.width / 2;
        this.ImgY1 = this.canvas.width / 2;
      }

      if (this.canvasSize.size === 128) {
        this.canvasSize.size = 64;
        this.ImgX0 = -this.canvasSize.size * 4;
        this.ImgY0 = -this.canvasSize.size * 4;
        this.ImgX1 = this.canvas.width * 2;
        this.ImgY1 = this.canvas.width * 2;
      }
      this.addSelectedClass(this.canvasSize.size);
      this.redowingMainCanvas();
      this.copyImgFromMainCanvas();
      localStorage.setItem('canvasSize', JSON.stringify(this.canvasSize.size));
    }

    if (e.target.dataset.canvasSize === '128'
    && this.canvasSize.size !== 128) {
      this.addSelectedClass(this.canvasSize.size);

      if (this.canvasSize.size === 32) {
        this.canvasSize.size = 128;
        this.ImgX0 = this.canvasSize.size * 1.5;
        this.ImgY0 = this.canvasSize.size * 1.5;
        this.ImgX1 = this.canvas.width / 4;
        this.ImgY1 = this.canvas.width / 4;
      }

      if (this.canvasSize.size === 64) {
        this.canvasSize.size = 128;
        this.ImgX0 = this.canvasSize.size;
        this.ImgY0 = this.canvasSize.size;
        this.ImgX1 = this.canvas.width / 2;
        this.ImgY1 = this.canvas.width / 2;
      }
      this.addSelectedClass(this.canvasSize.size);
      this.redowingMainCanvas();
      this.copyImgFromMainCanvas();
      localStorage.setItem('canvasSize', JSON.stringify(this.canvasSize.size));
    }
  }

  copyImgFromMainCanvas() {
    this.currentMainCanvasImg.src = this.canvas.toDataURL('image/png', 1);
  }

  addListeners() {
    const resizeCanvasWrap = this.resizeCanvas.bind(this);
    this.mainCanvasWrapper.addEventListener('mouseup', resizeCanvasWrap);

    const copyImgFromMainCanvasWrap = this.copyImgFromMainCanvas.bind(this);
    this.canvas.addEventListener('mouseup', copyImgFromMainCanvasWrap);
    this.canvas.addEventListener('mouseleave', copyImgFromMainCanvasWrap);
  }

  render() {
    document.getElementById('content').innerHTML = CanvasHtml;

    this.canvas = document.getElementById('drawing-canvas');
    this.canvasCtx = this.canvas.getContext('2d');
    this.canvasCtx.imageSmoothingEnabled = false;

    this.mainCanvasWrapper = document.getElementById('main-canvas-wrapper');

    this.addSelectedClass(this.canvasSize.size);
    this.addListeners();
  }
}
