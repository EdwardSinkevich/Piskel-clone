export default class CursorCoordinates {
  static showCoords(x, y) {
    const cursorCoordinatesContainer = document.getElementById('cursor-coordinates');
    cursorCoordinatesContainer.classList.add('visible');
    cursorCoordinatesContainer.innerHTML = `x=${x}, y=${y}`;
  }

  static hideCoords() {
    const cursorCoordinatesContainer = document.getElementById('cursor-coordinates');
    cursorCoordinatesContainer.classList.remove('visible');
  }

  render() {
    const animatedPreview = document.getElementById('animated-preview-container');
    const cursorCoordinatesContainer = document.createElement('div');
    cursorCoordinatesContainer.className = 'cursor-coordinates';
    cursorCoordinatesContainer.id = 'cursor-coordinates';

    animatedPreview.appendChild(cursorCoordinatesContainer);
  }
}
