import ColorSelect from '../drawingTools/ColorSelect';
import SwapColors from '../drawingTools/SwapColors';

export default class KeyboardShotcuts {
  constructor(canvas, frames, tools, preview) {
    this.canvas = canvas;
    this.frames = frames;
    this.tools = tools;
    this.preview = preview;
    this.resizeEvent = {
      target: {
        dataset: {
          canvasSize: null,
        },
      },
    };
    this.keyCodes = {
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
  }

  selectActionByKey(e) {
    const key = e.which || e.keyCode;

    if (key === this.keyCodes.keyP && this.tools.tool.currnetTool !== 'pen') {
      this.tools.tool.currnetTool = 'pen';
      this.tools.addSelectedClassToTool(this.tools.tool.currnetTool);
      localStorage.setItem('currnetTool', JSON.stringify(this.tools.tool.currnetTool));
      return;
    }

    if (key === this.keyCodes.keyE && this.tools.tool.currnetTool !== 'eraser') {
      this.tools.tool.currnetTool = 'eraser';
      this.tools.addSelectedClassToTool(this.tools.tool.currnetTool);
      localStorage.setItem('currnetTool', JSON.stringify(this.tools.tool.currnetTool));
      return;
    }

    if (key === this.keyCodes.keyB && this.tools.tool.currnetTool !== 'paint-bucket') {
      this.tools.tool.currnetTool = 'paint-bucket';
      this.tools.addSelectedClassToTool(this.tools.tool.currnetTool);
      localStorage.setItem('currnetTool', JSON.stringify(this.tools.tool.currnetTool));
      return;
    }

    if (key === this.keyCodes.keyA && this.tools.tool.currnetTool !== 'fill-same-color') {
      this.tools.tool.currnetTool = 'fill-same-color';
      this.tools.addSelectedClassToTool(this.tools.tool.currnetTool);
      localStorage.setItem('currnetTool', JSON.stringify(this.tools.tool.currnetTool));
      return;
    }

    if (key === this.keyCodes.keyQ && this.tools.tool.currnetTool !== 'colorpicker') {
      this.tools.tool.currnetTool = 'colorpicker';
      this.tools.addSelectedClassToTool(this.tools.tool.currnetTool);
      localStorage.setItem('currnetTool', JSON.stringify(this.tools.tool.currnetTool));
      return;
    }

    if (key === this.keyCodes.key1) {
      this.tools.penSize.size = 1;
      this.tools.addSelectedClassToPenSizes(this.tools.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.tools.penSize.size));
      return;
    }

    if (key === this.keyCodes.key2) {
      this.tools.penSize.size = 2;
      this.tools.addSelectedClassToPenSizes(this.tools.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.tools.penSize.size));
      return;
    }

    if (key === this.keyCodes.key3) {
      this.tools.penSize.size = 3;
      this.tools.addSelectedClassToPenSizes(this.tools.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.tools.penSize.size));
      return;
    }

    if (key === this.keyCodes.key4) {
      this.tools.penSize.size = 4;
      this.tools.addSelectedClassToPenSizes(this.tools.penSize.size);
      localStorage.setItem('penSize', JSON.stringify(this.tools.penSize.size));
      return;
    }

    if (key === this.keyCodes.keyZ) {
      const primaryPalette = document.getElementById('primary-color-palette');
      ColorSelect.pickPrimary(primaryPalette, this.tools.color);
      localStorage.setItem('colorPiskel', JSON.stringify(this.tools.color));
      return;
    }

    if (key === this.keyCodes.keyX) {
      const secondaryPalette = document.getElementById('secondary-color-palette');
      ColorSelect.pickSecondary(secondaryPalette, this.tools.color);
      localStorage.setItem('colorPiskel', JSON.stringify(this.tools.color));
      return;
    }

    if (key === this.keyCodes.keyC) {
      SwapColors.swapColors(this.tools.color);
      localStorage.setItem('colorPiskel', JSON.stringify(this.tools.color));
      return;
    }

    if (key === this.keyCodes.keyN) {
      this.frames.addFrame();
      return;
    }

    if (key === this.keyCodes.keyT) {
      this.resizeEvent.target.dataset.canvasSize = '32';
      this.canvas.resizeCanvas(this.resizeEvent);
      return;
    }

    if (key === this.keyCodes.keyY) {
      this.resizeEvent.target.dataset.canvasSize = '64';
      this.canvas.resizeCanvas(this.resizeEvent);
      return;
    }

    if (key === this.keyCodes.keyU) {
      this.resizeEvent.target.dataset.canvasSize = '128';
      this.canvas.resizeCanvas(this.resizeEvent);
      return;
    }

    if (key === this.keyCodes.keyF) {
      this.preview.launchToFullscreen();
    }
  }

  addShotcuts() {
    const selectActionByKeyWrap = this.selectActionByKey.bind(this);
    document.addEventListener('keydown', selectActionByKeyWrap);
  }
}
