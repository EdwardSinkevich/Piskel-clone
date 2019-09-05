import Header from './screens/shared/header/Header';
import LandingPage from './screens/landingPage/LandingPage';
import Canvas from './screens/canvas/Canvas';
import Tools from './components/tools/Tools';
import Frames from './components/frames/Frames';
import AnimationPreview from './components/animationPreview/AnimationPreview';
import CursorCoordinates from './components/tools/helpTools/CursorCoordinates';
import KeyboardShotcuts from './components/tools/helpTools/KeyboardShotcuts';
import ExportResults from './components/exportResults/ExportResults';
import Auth from './auth/Auth';

const routes = {
  '/': LandingPage,
  '/canvas': Canvas,
};

const parseRequestURL = () => {
  const url = window.location.hash.slice(1).toLowerCase() || '/';
  const r = url.split('/');
  const [, resource, id, verb] = r;
  const request = {
    resource,
    id,
    verb,
  };
  return request;
};

Header.render();
const auth = new Auth();
auth.startApp();

const router = () => {
  const request = parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL];

  if (!page) {
    LandingPage.render();
    window.location.hash = '/';
    return;
  }

  if (page === Canvas) {
    const canvas = new Canvas();
    canvas.render();

    const tools = new Tools(canvas);
    tools.render();

    const frames = new Frames(canvas);
    frames.render();

    const animationPreview = new AnimationPreview(frames);
    animationPreview.render();

    const exportResults = new ExportResults(animationPreview);
    exportResults.render();

    const cursorCoordinates = new CursorCoordinates();
    cursorCoordinates.render();

    const keyboardShotcuts = new KeyboardShotcuts(canvas, frames, tools, animationPreview);
    keyboardShotcuts.addShotcuts();
  } else {
    page.render();
  }
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);
