import CursorCoordinates from '../CursorCoordinates';

describe('CursorCoordinates.showCoords(x, y)', () => {
  it('Should set coords x, y to cursor coordinates container innerHTML', () => {
    const cursorCoordinatesContainer = document.createElement('div');
    cursorCoordinatesContainer.id = 'cursor-coordinates';
    document.body.appendChild(cursorCoordinatesContainer);
    CursorCoordinates.showCoords(42, 42);
    expect(cursorCoordinatesContainer.innerHTML).toEqual('x=42, y=42');
  });
});

describe('CursorCoordinates.hideCoords', () => {
  it('Should remove class visible from cursor coordinates container', () => {
    CursorCoordinates.hideCoords();
    const cursorCoordinatesContainerAfter = document.getElementById('cursor-coordinates');
    expect(cursorCoordinatesContainerAfter.classList.contains('visible')).toBe(false);
  });
});

describe('CursorCoordinates.render', () => {
  it('Should render correct', () => {
    const animatedPreview = document.createElement('div');
    animatedPreview.id = 'animated-preview-container';
    document.body.appendChild(animatedPreview);
    const cursorCoordinates = new CursorCoordinates();
    cursorCoordinates.render();
    expect(document.getElementById('animated-preview-container').innerHTML).toMatchSnapshot();
  });
});
