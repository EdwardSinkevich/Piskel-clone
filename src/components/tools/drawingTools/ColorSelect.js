export default class ColorSelect {
  static updatePrimaryColor(palette, colorInput, color) {
    palette.style.backgroundColor = colorInput.value;
    color.primary = colorInput.value;
    localStorage.setItem('colorPiskel', JSON.stringify(color));
  }

  static updateSecondaryColor(palette, colorInput, color) {
    palette.style.backgroundColor = colorInput.value;
    color.secondary = colorInput.value;
    localStorage.setItem('colorPiskel', JSON.stringify(color));
  }

  static pickPrimary(palette, color) {
    const primaryColorInput = document.getElementById('color-picker');
    const updateColorWrap = ColorSelect.updatePrimaryColor.bind(this, palette, primaryColorInput, color);

    primaryColorInput.removeEventListener('input', updateColorWrap);
    primaryColorInput.addEventListener('input', updateColorWrap);
    primaryColorInput.click();
  }

  static pickSecondary(palette, color) {
    const secondaryColorInput = document.getElementById('secondary-color-picker');
    const updateColorWrap = ColorSelect.updateSecondaryColor.bind(this, palette, secondaryColorInput, color);

    secondaryColorInput.removeEventListener('input', updateColorWrap);
    secondaryColorInput.addEventListener('input', updateColorWrap);
    secondaryColorInput.click();
  }
}
