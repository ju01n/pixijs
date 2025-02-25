import './style.css';
import * as PIXI from 'pixi.js';

export default async function main() {

  // Application
  const app = new PIXI.Application();

  await app.init({
    background: '#5c5c5c'
  });

  app.canvas.id = 'app-canvas';

  document.body.appendChild(app.canvas);
};
