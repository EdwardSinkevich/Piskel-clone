export default class PaintBucket {
  constructor(canvas, canvasCtx) {
    this.canvas = canvas;
    this.canvasCtx = canvasCtx;
    this.colorLayer = null;
    this.fillColor = [];
    this.colorLayer = this.canvasCtx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  paintAt(startX, startY, hex) {
    this.fillColor = this.hexToRGB(hex);

    const pixelPos = (startY * this.canvas.width + startX) * 4;
    const r = this.colorLayer.data[pixelPos];
    const g = this.colorLayer.data[pixelPos + 1];
    const b = this.colorLayer.data[pixelPos + 2];
    const a = this.colorLayer.data[pixelPos + 3];

    if (!this.fillColor) {
      return;
    }

    if (r === this.fillColor[0] && g === this.fillColor[1] && b === this.fillColor[2]
      && a !== 0) {
      return;
    }

    this.floodFill(startX, startY, r, g, b, a);
  }

  floodFill(startX, startY, startR, startG, startB, startA) {
    const pixelStack = [[startX, startY]];
    let newPos;
    let x;
    let y;
    let pixelPos;
    let reachLeft;
    let reachRight;

    while (pixelStack.length) {
      newPos = pixelStack.pop();
      x = newPos[0];
      y = newPos[1];

      pixelPos = (y * this.canvas.width + x) * 4;

      while (y >= 0 && this.matchStartColor(pixelPos, startR, startG, startB, startA)) {
        y -= 1;
        pixelPos -= this.canvas.width * 4;
      }
      pixelPos += this.canvas.width * 4;
      y += 1;
      reachLeft = false;
      reachRight = false;

      while (y < this.canvas.height && this.matchStartColor(pixelPos, startR, startG, startB, startA)) {
        y += 1;
        this.colorPixel(pixelPos, this.fillColor[0], this.fillColor[1], this.fillColor[2]);

        if (x > 0) {
          if (this.matchStartColor(pixelPos - 4, startR, startG, startB, startA)) {
            if (!reachLeft) {
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < this.canvas.width - 1) {
          if (this.matchStartColor(pixelPos + 4, startR, startG, startB, startA)) {
            if (!reachRight) {
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += this.canvas.width * 4;
      }
    }
    this.canvasCtx.putImageData(this.colorLayer, 0, 0);
  }

  matchOutlineColor(r, g, b, a) {
    return (r + g + b < 100 && a === 255);
  }

  matchStartColor(pixelPos, startR, startG, startB, startA) {
    const r = this.colorLayer.data[pixelPos];
    const g = this.colorLayer.data[pixelPos + 1];
    const b = this.colorLayer.data[pixelPos + 2];
    const a = this.colorLayer.data[pixelPos + 3];

    if (r === startR && g === startG && b === startB && a === startA) {
      return true;
    }

    if (r === this.fillColor[0] && g === this.fillColor[1] && b === this.fillColor[2]) {
      return false;
    }

    if (r !== startR || g !== startG || b !== startB || a !== startA) {
      return false;
    }

    return true;
  }

  colorPixel(pixelPos, fillColorR, fillColorG, fillColorB, fillColorA) {
    this.colorLayer.data[pixelPos] = fillColorR;
    this.colorLayer.data[pixelPos + 1] = fillColorG;
    this.colorLayer.data[pixelPos + 2] = fillColorB;
    this.colorLayer.data[pixelPos + 3] = fillColorA !== undefined ? fillColorA : 255;
  }

  hexToRGB(hex) {
    let c;

    if (hex === 'rgba(0, 0, 0, 0)') {
      return false;
    }

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = `0x${c.join('')}`;
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
    }
    return false;
  }
}
