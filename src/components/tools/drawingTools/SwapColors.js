export default class SwapColors {
  static swapColors(colors) {
    const primaryPalette = document.getElementById('primary-color-palette');
    const secondaryPalette = document.getElementById('secondary-color-palette');

    const tempColor = colors.primary;
    colors.primary = colors.secondary;
    colors.secondary = tempColor;

    primaryPalette.style.backgroundColor = colors.primary;
    secondaryPalette.style.backgroundColor = colors.secondary;
  }
}
