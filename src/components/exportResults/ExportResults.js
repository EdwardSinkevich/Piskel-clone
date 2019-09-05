import './ExportResults.css';
import gifshot from 'gifshot';
import mergeImages from 'merge-images';
import downloadjs from 'downloadjs';
import upng from 'upng-js';

import bgCanvasImg from './images/background-canvas.png';

export default class ExportResults {
  constructor(animationPreview) {
    this.frames = animationPreview.frames;
    this.imgsArray = animationPreview.imgsArray;
    this.fps = animationPreview.fps;
    this.exportBtnsContainer = null;
  }

  downloadFile(file, name) {
    const downloadGifBtn = document.createElement('a');
    downloadGifBtn.download = name;
    downloadGifBtn.href = file;
    document.body.appendChild(downloadGifBtn);
    downloadGifBtn.click();
    document.body.removeChild(downloadGifBtn);
  }

  createBackgroundImg(imgSrc, size) {
    const newImg = new Image();
    newImg.src = imgSrc;

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const pat = ctx.createPattern(newImg, 'repeat');
    ctx.rect(0, 0, size, size);
    ctx.fillStyle = pat;
    ctx.fill();
    return canvas.toDataURL('image/png');
  }

  mergeImagesCanvas() {
    const bgImg = this.createBackgroundImg(bgCanvasImg, this.frames.mainCanvas.width);
    const images = this.imgsArray.map(img => mergeImages([bgImg, img.src]));

    return Promise.all(images)
      .then((...res) => res[0]);
  }

  createGif(imgArr) {
    return new Promise((res) => {
      gifshot.createGIF({
        images: imgArr,
        frameDuration: this.fps / 100,
      }, (obj) => {
        if (!obj.error) {
          res(obj.image);
        }
      });
    });
  }

  async exportResultAsGif() {
    if (!this.imgsArray[0].src) {
      return;
    }

    const newImagesArray = await this.mergeImagesCanvas();
    const gif = await this.createGif(newImagesArray);

    this.downloadFile(gif, 'result.gif');
  }

  async exportResultAsJson() {
    if (!this.imgsArray[0].src) {
      return;
    }

    const newImagesArray = await this.mergeImagesCanvas();

    const dataStr = `data:text/json;charset=utf-8, ${encodeURIComponent(JSON.stringify(newImagesArray))}`;

    this.downloadFile(dataStr, 'result.json');
  }

  exportResultAsPiskel() {
    const newData = [];

    if (!this.imgsArray[0].src) {
      return;
    }

    this.imgsArray.forEach((item, indx) => {
      newData.push(`image[${indx}]: ${item.src}`);
    });

    downloadjs(newData, 'result.piskel', 'text/plain');
  }

  async exportResultAsApng() {
    if (!this.imgsArray[0].src) {
      return;
    }
    const canvas = document.createElement('canvas');
    const canvasCtx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    const imagesArrayBuffer = [];
    const delayArray = [];

    this.imgsArray.forEach((item) => {
      const img = new Image();
      img.src = bgCanvasImg;
      canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvasCtx.drawImage(item, 0, 0, canvas.width, canvas.height);
      imagesArrayBuffer.push(canvasCtx.getImageData(0, 0, canvas.width, canvas.height).data.buffer);
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
      delayArray.push(1000);
    });

    const apngArrayBuffer = upng.encode(imagesArrayBuffer, 200, 200, 0, delayArray);
    const uint8Img = new Uint8Array(apngArrayBuffer);
    downloadjs(uint8Img, 'result.apng', 'image/png');
  }

  eventAction(e) {
    if (e.target.dataset.action === 'export-gif') {
      this.exportResultAsGif();
      return;
    }

    if (e.target.dataset.action === 'export-json') {
      this.exportResultAsJson();
      return;
    }

    if (e.target.dataset.action === 'export-piskel') {
      this.exportResultAsPiskel();
      return;
    }

    if (e.target.dataset.action === 'export-apng') {
      this.exportResultAsApng();
    }
  }

  addListeners() {
    const eventActionWrap = this.eventAction.bind(this);
    this.exportBtnsContainer.addEventListener('click', eventActionWrap);
  }

  render() {
    const animatedPreview = document.getElementById('animated-preview-container');
    this.exportBtnsContainer = document.createElement('div');
    this.exportBtnsContainer.className = 'export-btns-container';
    this.exportBtnsContainer.innerHTML = `
    <div class="export-btns-container">
      <button class="nav-btn export-btn" data-action="export-gif">Export GIF</button>
      <button class="nav-btn export-btn" data-action="export-json">Export JSON</button>
      <button class="nav-btn export-btn" data-action="export-apng">Export APNG</button>
      <button class="nav-btn export-btn" data-action="export-piskel">Export PISKEL</button>
    </div>`;

    animatedPreview.appendChild(this.exportBtnsContainer);

    this.addListeners();
  }
}
