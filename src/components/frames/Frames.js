import './Frames.css';
import { Sortable } from 'sortablejs';

export default class Frames {
  constructor(mainCanvas) {
    this.previewWrapper = null;
    this.previewList = null;
    this.currentFrameItem = null;
    this.amountFrames = 0;
    this.mainCanvasObj = mainCanvas;
    this.mainCanvas = mainCanvas.canvas;
    this.mainCanvasCtx = mainCanvas.canvasCtx;
    this.mainCanvasWrapper = mainCanvas.mainCanvasWrapper;
    this.imgsArray = [];
    this.dragSrcEl = null;
  }

  createFrame(numberOfFrame) {
    const frame = document.createElement('li');
    frame.className = 'frame-item';
    frame.dataset.tileNumber = numberOfFrame;
    frame.innerHTML = `<div class="lowcont-dark-canvas-background">
    <div class="canvas-background"></div>
    <canvas class="tile-view canvas" width="96" height="96"></canvas></div>
    <button class="tile-overlay icon-frame-duplicate" data-tile-action="clone"></button>
    <button class="tile-overlay icon-frame-recyclebin visible" data-tile-action="delete"></button>
    <div class="tile-overlay icon-frame-dragndrop handle visible"></div>
    <button class="tile-overlay tile-count">${numberOfFrame}</button>`;

    this.currentFrameItem = frame;
    this.amountFrames += 1;

    return frame;
  }

  addFrame() {
    const newFrame = this.createFrame(this.amountFrames + 1);
    this.previewList.appendChild(newFrame);

    this.updateAfterAddFrame(this.amountFrames);

    if (this.amountFrames === 1 || this.amountFrames === 2) {
      this.showOrHideBtns();
    }
  }

  createNewImage() {
    const newImg = new Image();

    const drawCurrnetImgToCurrentFrameWrapper = this.drawCurrnetImgToCurrentFrame.bind(this);
    newImg.addEventListener('load', drawCurrnetImgToCurrentFrameWrapper);

    this.mainCanvasObj.currentMainCanvasImg = newImg;
  }

  updateAfterAddFrame(numberOfAddedFrame) {
    this.mainCanvasCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

    this.createNewImage();

    this.imgsArray.splice(numberOfAddedFrame, 0, this.mainCanvasObj.currentMainCanvasImg);
  }

  removeFrame(removedFrame, removedFrameNumber) {
    this.previewList.removeChild(removedFrame);

    if (removedFrameNumber - 1 === this.imgsArray.indexOf(this.mainCanvasObj.currentMainCanvasImg)) {
      this.updateIfRemoveLastFrame(removedFrameNumber);
    }

    this.imgsArray.splice(removedFrameNumber - 1, 1);

    this.amountFrames -= 1;
    this.updateFramesNumbers(removedFrameNumber - 1);

    if (this.amountFrames === 1) {
      this.showOrHideBtns();
    }
  }

  updateIfRemoveLastFrame(removedFrameNumber) {
    this.currentFrameItem = this.previewList.querySelectorAll('.frame-item')[removedFrameNumber - 2];

    if (this.currentFrameItem) {
      this.mainCanvasObj.currentMainCanvasImg = this.imgsArray[removedFrameNumber - 2];
      this.mainCanvasCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      this.mainCanvasCtx.drawImage(this.mainCanvasObj.currentMainCanvasImg, 0, 0, this.mainCanvas.width, this.mainCanvas.height);
    } else {
      this.currentFrameItem = this.previewList.querySelectorAll('.frame-item')[removedFrameNumber - 1];
      this.mainCanvasObj.currentMainCanvasImg = this.imgsArray[removedFrameNumber];
      this.mainCanvasCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
      this.mainCanvasCtx.drawImage(this.mainCanvasObj.currentMainCanvasImg, 0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }
  }

  copyFrame(copiedFrame, numberOfCopiedFrame) {
    const newFrame = this.createFrame(numberOfCopiedFrame + 1);
    copiedFrame.parentNode.insertBefore(newFrame, copiedFrame.nextSibling);

    this.updateFramesNumbers(numberOfCopiedFrame + 1);

    this.updateAfterCopyFrame(numberOfCopiedFrame);

    if (this.amountFrames === 2) {
      this.showOrHideBtns();
    }
  }

  updateAfterCopyFrame(numberOfCopiedFrame) {
    this.updateAfterAddFrame(numberOfCopiedFrame);

    const copyImg = this.imgsArray[numberOfCopiedFrame - 1].src;

    if (this.imgsArray[numberOfCopiedFrame - 1].src) {
      this.mainCanvasObj.currentMainCanvasImg.src = copyImg;
    }

    this.drawCurrnetImgToCurrentFrame();

    this.mainCanvasCtx.drawImage(this.imgsArray[numberOfCopiedFrame - 1], 0, 0, this.mainCanvas.width, this.mainCanvas.height);
  }

  updateFramesNumbers(numberOfCurrentFrame) {
    const listOfFrames = this.previewList.querySelectorAll('.frame-item');
    const listOfFramesNumbers = this.previewList.querySelectorAll('.tile-count');

    for (let i = numberOfCurrentFrame; i < this.amountFrames; i += 1) {
      listOfFrames[i].dataset.tileNumber = i + 1;
      listOfFramesNumbers[i].textContent = i + 1;
    }
  }

  showOrHideBtns() {
    const removeBtn = this.previewList.querySelector('.icon-frame-recyclebin');
    const moveBtn = this.previewList.querySelector('.icon-frame-dragndrop');

    removeBtn.classList.toggle('visible');
    moveBtn.classList.toggle('visible');
  }

  frameActionsByEvent(e) {
    if (e.target.dataset.tileAction === 'add'
    || e.target.parentNode.dataset.tileAction === 'add') {
      this.addFrame();
    }

    if (e.target.dataset.tileAction === 'clone') {
      const numberOfCopyFrame = +e.target.parentNode.dataset.tileNumber;
      this.copyFrame(e.target.parentNode, numberOfCopyFrame);
    }

    if (e.target.dataset.tileAction === 'delete') {
      const removedFrame = e.target.parentNode;
      const removedFrameNumber = +removedFrame.dataset.tileNumber;

      this.removeFrame(removedFrame, removedFrameNumber);
    }
  }

  drawCurrnetImgToCurrentFrame() {
    const currentFrameCanvas = this.currentFrameItem.querySelector('.tile-view');
    const currentFrameCanvasCtx = currentFrameCanvas.getContext('2d');

    currentFrameCanvasCtx.clearRect(0, 0, currentFrameCanvas.width, currentFrameCanvas.height);
    currentFrameCanvasCtx.drawImage(this.mainCanvasObj.currentMainCanvasImg, 0, 0, currentFrameCanvas.width, currentFrameCanvas.height);
  }

  moveImagesInArray(newIndex, oldIndex) {
    const img = this.imgsArray[oldIndex];
    this.imgsArray.splice(oldIndex, 1);
    this.imgsArray.splice(newIndex, 0, img);
  }

  addDragAndDrop() {
    const updateFramesNumbersWrapper = this.updateFramesNumbers.bind(this);
    const moveImagesInArrayWrapper = this.moveImagesInArray.bind(this);

    new Sortable(this.previewList, {
      handle: '.handle',
      animation: 150,

      onUpdate(e) {
        updateFramesNumbersWrapper(0);
        moveImagesInArrayWrapper(e.newIndex, e.oldIndex);
      },
    });
  }

  addListeners() {
    const frameActionsByEventWrapper = this.frameActionsByEvent.bind(this);
    this.previewWrapper.addEventListener('click', frameActionsByEventWrapper);

    this.addDragAndDrop();
  }

  render() {
    this.previewWrapper = document.getElementById('preview-list-wrapper');
    this.previewWrapper.innerHTML = `
    <div class="frames-scroller">
      <ul id="preview-list" class="preview-list"></ul>
      <div id="add-frame-action" class="add-frame-action tooltip-action"  data-tile-action="add">
        <div class="icon-frame-plus"></div>
        <div class="label">Add new frame</div>
        <span class="tooltip add-frame-tooltip">Press N</span>
      </div>
    </div>`;

    this.previewList = document.getElementById('preview-list');

    this.addFrame();

    this.addListeners();
  }
}
