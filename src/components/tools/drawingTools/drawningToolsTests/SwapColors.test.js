import SwapColors from '../SwapColors';

describe('SwapColors.swapColors', () => {
  it('Should swap primary and secondary palettes background colors', () => {
    const colorsTest = {
      primary: 'red',
      secondary: 'blue',
    }
    const primaryPaletteTest = document.createElement('div');
    const secondaryPaletteTest = document.createElement('div');
    primaryPaletteTest.id = 'primary-color-palette';
    secondaryPaletteTest.id = 'secondary-color-palette';
    document.body.appendChild(primaryPaletteTest);
    document.body.appendChild(secondaryPaletteTest);
    SwapColors.swapColors(colorsTest);
    expect(colorsTest.primary).toEqual('blue');
  });
});
