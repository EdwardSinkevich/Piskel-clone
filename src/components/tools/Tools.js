import ToolsHtml from './Tools.html';
import './Tools.css';

import SimplePen from './drawingTools/SimplePen';
import Eraser from './drawingTools/Eraser';
import ColorSelect from './drawingTools/ColorSelect';
import SwapColors from './drawingTools/SwapColors';
import PaintBucket from './drawingTools/PaintBucket';
import PaintSameColor from './drawingTools/PaintSameColor';
import CursorCoordinates from './helpTools/CursorCoordinates';
import ColorPicker from './drawingTools/ColorPicker';

export default class Tools {
  constructor(mainCanvas) {
    this.canvasObj = mainCanvas;
    this.canvas = mainCanvas.canvas;
    this.canvasCtx = mainCanvas.canvasCtx;
    this.ifMouseDown = false;
    this.tool = {
      currnetTool: localStorage.getItem('currnetTool') ? JSON.parse(localStorage.getItem('currnetTool')) : 'pen',
    };
    this.penSize = {
      size: localStorage.getItem('penSize') ? JSON.parse(localStorage.getItem('penSize')) : 1,
    };
    this.tools = null;
    this.color = {
      primary: localStorage.getItem('colorPiskel') ? JSON.parse(localStorage.getItem('colorPiskel')).primary : 'rgba(0, 0, 0, 1)',
      secondary: localStorage.getItem('colorPiskel') ? JSON.parse(localStorage.getItem('colorPiskel')).secondary : 'rgba(0, 0, 0, 0)',
    };
    this.paintAreaSize = null;
  }

  changeIfMouseDown() {
    this.ifMouseDown = true;
  }

  changeIfMouseUp() {
    this.ifMouseDown = false;
    this.canvasCtx.beginPath();
  }

  changeIfMouseLeave() {
    this.changeIfMouseUp();
    CursorCoordinates.hideCoords();
  }

  setPaintAreaSize() {
    if (this.penSize.size === 1) {
      this.paintAreaSize = Math.round(this.canvas.width / this.canvasObj.canvasSize.size);
    }

    if (this.penSize.size === 2) {
      this.paintAreaSize = Math.round(this.canvas.width / (this.canvasObj.canvasSize.size / 2));
    }

    if (this.penSize.size === 3) {
      this.paintAreaSize = Math.round(this.canvas.width / (this.canvasObj.canvasSize.size / 4));
    }

    if (this.penSize.size === 4) {
      this.paintAreaSize = Math.round(this.canvas.width / (this.canvasObj.canvasSize.size / 8));
    }
  }

  setColors(event) {
    if (event.which === 3) {
      this.canvasCtx.fillStyle = this.color.secondary;
    } else {
      this.canvasCtx.fillStyle = this.color.primary;
    }
  }

  toolAction(e) {
    this.setPaintAreaSize();
    const currentX = Math.floor(e.offsetX / this.paintAreaSize) * this.paintAreaSize;
    const currentY = Math.floor(e.offsetY / this.paintAreaSize) * this.paintAreaSize;
    CursorCoordinates.showCoords(Math.floor(e.offsetX / this.paintAreaSize), Math.floor(e.offsetY / this.paintAreaSize));

    if (this.ifMouseDown) {
      this.setColors(e);
      if (this.tool.currnetTool === 'pen') {
        SimplePen.drawingSimplePen(this.canvasCtx, currentX, currentY, this.paintAreaSize);
      }

      if (this.tool.currnetTool === 'eraser') {
        Eraser.erasing(this.canvasCtx, currentX, currentY, this.paintAreaSize);
      }

      if (this.tool.currnetTool === 'paint-bucket') {
        const paintBucket = new PaintBucket(this.canvas, this.canvasCtx);
        paintBucket.paintAt(e.offsetX, e.offsetY, this.canvasCtx.fillStyle);
      }

      if (this.tool.currnetTool === 'fill-same-color') {
        PaintSameColor.fillSameColor(this.canvasCtx, this.canvas.width, this.canvas.height);
      }

      if (this.tool.currnetTool === 'colorpicker') {
        const prymaryPalette = document.getElementById('primary-color-palette');
        this.color.primary = ColorPicker.getColor(this.canvas, this.canvasCtx, e.offsetX, e.offsetY);
        prymaryPalette.style.background = this.color.primary;
      }
    }
  }

  addSelectedClassToTool(tool) {
    document.querySelector('.tool-icon.selected').classList.remove('selected');
    document.querySelector(`.icon-tool-${tool}`).classList.add('selected');
  }

  addSelectedClassToPenSizes(selectedSize) {
    document.querySelector('.size-picker-option.selected').classList.remove('selected');
    document.querySelector(`.pick-size-${selectedSize}`).classList.add('selected');
  }

  selectTool(e) {
    if (e.target.dataset.toolId === 'tool-pen' && this.tool.currnetTool !== 'pen') {
      this.addSelectedClassToTool('pen');
      this.tool.currnetTool = 'pen';
      localStorage.setItem('currnetTool', JSON.stringify(this.tool.currnetTool));
      return;
    }

    if (e.target.dataset.toolId === 'tool-eraser' && this.tool.currnetTool !== 'eraser') {
      this.addSelectedClassToTool('eraser');
      this.tool.currnetTool = 'eraser';
      localStorage.setItem('currnetTool', JSON.stringify(this.tool.currnetTool));
      return;
    }

    if (e.target.dataset.toolId === 'tool-paint-bucket' && this.tool.currnetTool !== 'paint-bucket') {
      this.addSelectedClassToTool('paint-bucket');
      this.tool.currnetTool = 'paint-bucket';
      localStorage.setItem('currnetTool', JSON.stringify(this.tool.currnetTool));
      return;
    }

    if (e.target.dataset.toolId === 'tool-fill-same-color' && this.tool.currnetTool !== 'fill-same-color') {
      this.addSelectedClassToTool('fill-same-color');
      this.tool.currnetTool = 'fill-same-color';
      localStorage.setItem('currnetTool', JSON.stringify(this.tool.currnetTool));
      return;
    }

    if (e.target.dataset.toolId === 'tool-colorpicker' && this.tool.currnetTool !== 'colorpicker') {
      this.addSelectedClassToTool('colorpicker');
      this.tool.currnetTool = 'colorpicker';
      localStorage.setItem('currnetTool', JSON.stringify(this.tool.currnetTool));
      return;
    }

    if (e.target.dataset.size === '1') {
      this.penSize.size = 1;
      this.addSelectedClassToPenSizes(this.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.penSize.size));
      return;
    }

    if (e.target.dataset.size === '2') {
      this.penSize.size = 2;
      this.addSelectedClassToPenSizes(this.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.penSize.size));
      return;
    }

    if (e.target.dataset.size === '3') {
      this.penSize.size = 3;
      this.addSelectedClassToPenSizes(this.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.penSize.size));
      return;
    }

    if (e.target.dataset.size === '4') {
      this.penSize.size = 4;
      this.addSelectedClassToPenSizes(this.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.penSize.size));
      return;
    }

    if (e.target.dataset.toolId === 'primary-color') {
      ColorSelect.pickPrimary(e.target, this.color);
      return;
    }

    if (e.target.dataset.toolId === 'secondary-color') {
      ColorSelect.pickSecondary(e.target, this.color);
      return;
    }

    if (e.target.dataset.toolId === 'swap-color') {
      SwapColors.swapColors(this.color);
    }
  }

  addListeners() {
    const toolActionWrap = this.toolAction.bind(this);
    const changeIfMouseDownWrap = this.changeIfMouseDown.bind(this);
    const changeIfMouseUpWrap = this.changeIfMouseUp.bind(this);
    const changeIfMouseLeaveWrap = this.changeIfMouseLeave.bind(this);

    const selectToolWrap = this.selectTool.bind(this);

    this.canvas.addEventListener('mousemove', toolActionWrap);
    this.canvas.addEventListener('mousedown', changeIfMouseDownWrap);
    this.canvas.addEventListener('mousedown', toolActionWrap);
    this.canvas.addEventListener('mouseup', changeIfMouseUpWrap);
    this.canvas.addEventListener('mouseleave', changeIfMouseLeaveWrap);
    this.canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); });

    this.tools.addEventListener('mousedown', selectToolWrap);
  }

  setPaletteBackgrounds() {
    const primaryColor = document.getElementById('primary-color-palette');
    const secondaryColor = document.getElementById('secondary-color-palette');

    primaryColor.style.backgroundColor = this.color.primary;
    secondaryColor.style.backgroundColor = this.color.secondary;
  }

  render() {
    const mainContainer = document.getElementById('main-container');

    this.tools = document.createElement('div');
    this.tools.className = 'drawing-tools-section-wrap';
    this.tools.innerHTML = ToolsHtml;

    mainContainer.appendChild(this.tools);

    this.addSelectedClassToTool(this.tool.currnetTool);
    this.addSelectedClassToPenSizes(this.penSize.size);
    this.setPaletteBackgrounds();

    this.addListeners();
  }
}
