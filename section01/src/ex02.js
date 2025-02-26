import './style.css';
import { Application } from 'pixi.js';

export default async function main() {
  const app = new Application();

  await app.init({
    background: 'pink',
    resizeTo: window,
    // width: 500,
    // height: 300
  });

  app.canvas.id = 'app-canvas';

  document.body.appendChild(app.canvas);
};
