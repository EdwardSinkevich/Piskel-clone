import ColorSelect from '../ColorSelect';

describe('ColorSelect.updatePrimaryColor(palette, colorInput, color)', () => {
  it('Should assign palette.style.backgroundColor to colorInput.value', () => {
    const testPalette = {
      style: {
        backgroundColor: null,
      },
    };
    const testcolorInput = {
      value: 'red',
    };
    const testColor = {
      primary: null,
    };
    ColorSelect.updatePrimaryColor(testPalette, testcolorInput, testColor);
    expect(testPalette.style.backgroundColor).toEqual('red');
  });

  it('Should assign color.primary to colorInput.value', () => {
    const testPalette = {
      style: {
        backgroundColor: null,
      },
    };
    const testcolorInput = {
      value: 'red',
    };
    const testColor = {
      primary: null,
    };
    ColorSelect.updatePrimaryColor(testPalette, testcolorInput, testColor);
    expect(testColor.primary).toEqual('red');
  });
});

describe('ColorSelect.updateSecondaryColor(palette, colorInput, color)', () => {
  it('Should assign palette.style.backgroundColor to colorInput.value', () => {
    const testPalette = {
      style: {
        backgroundColor: null,
      },
    };
    const testcolorInput = {
      value: 'red',
    };
    const testColor = {
      primary: null,
    };
    ColorSelect.updateSecondaryColor(testPalette, testcolorInput, testColor);
    expect(testPalette.style.backgroundColor).toEqual('red');
  });

  it('Should assign color.secondary to colorInput.value', () => {
    const testPalette = {
      style: {
        backgroundColor: null,
      },
    };
    const testcolorInput = {
      value: 'red',
    };
    const testColor = {
      secondary: null,
    };
    ColorSelect.updateSecondaryColor(testPalette, testcolorInput, testColor);
    expect(testColor.secondary).toEqual('red');
  });
});
