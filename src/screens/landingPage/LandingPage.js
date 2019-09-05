import './LandingPage.css';
import example1Gif from './images/example1.gif';
import example2Gif from './images/example2.gif';
import canvasPng from './images/canvas.png';
import exportGifPng from './images/exportGIF.png';
import framesManagmentPng from './images/framesManagment.png';
import previewPng from './images/preview.png';
import toolsPng from './images/tools.png';

export default class LandingPage {
  static render() {
    const mainLandingPage = document.getElementById('content');
    mainLandingPage.innerHTML = `
      <main>
        <div class="intro container">
          <h3 class="titles">This is a clone of Piskel - free online editor for animated sprites & pixel art</h3>
          <p class="intro-description">You can create animations in your browser.</p>
          <a id="create-sprite-btn" class="nav-btn">Create Sprite</a>
          <div class="screenshot-main"></div>
        </div>
        <div class="examples container">
          <h3 class="titles">Examples :)</h3>
          <img class="example-img" src="${example1Gif}">
          <img class="example-img" src="${example2Gif}">
        </div>
        <div class="functionality-overview container">
          <h3 class="titles">Functionality overview</h3>
          <div class="functionality-item">
            <img class="overview-img" src="${canvasPng}">
            <h4 class="functionality-description">For drawing applied HTML5 Canvas</h4>
          </div>
          <div class="functionality-item">
            <img class="overview-img" src="${toolsPng}">
            <h4 class="functionality-description">You can use these tools for drawing</h4>
          </div>
          <div class="functionality-item">
            <img class="overview-img" src="${framesManagmentPng}">
            <h4 class="functionality-description">Use frame managment for add, copy, delete or move frame</h4>
          </div>
          <div class="functionality-item">
            <img class="overview-img" src="${previewPng}">
            <h4 class="functionality-description">You can see what the result will be</h4>
          </div>
          <div class="functionality-item">
            <img class="overview-img" src="${exportGifPng}">
            <h4 class="functionality-description">The final result can be exported as gif to file system</h4>
          </div>
        </div>
      </main>
    <footer>
      <div class="container info">
        <h3 class="info-title">Created by Edward Sinkevich</h3>
        <div class="contacts">
          <a class="nav-btn" href="mailto:edwardsinkevich@gmail.com">Email</a>
          <a class="nav-btn" href="https://github.com/EdwardSinkevich">GitHub</a>
        </div>
      </div>
    </footer>`;
    document.body.appendChild(mainLandingPage);
    const createSpriteBtn = document.getElementById('create-sprite-btn');
    createSpriteBtn.addEventListener('click', () => {
      window.location.hash = '/canvas';
    });
  }
}
