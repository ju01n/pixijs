// Graphics, Sprites
import './style.css';
import {
  Application,
  Assets,
  Sprite,
  Graphics
} from 'pixi.js';

export default async function main() {
  const app = new Application();

  await app.init({
    background: 'pink',
    resizeTo: window,
    // 고해상도로 표현하기 (캔버스 크기를 더 크게 만들어줌)
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  });

  app.canvas.id = 'app-canvas';
  document.body.appendChild(app.canvas);

  // Sprites
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const bunny = new Sprite(texture);
  // stage : 무대 공간
  app.stage.addChild(bunny);

  // bunny.position.x = 100;
  // bunny.position.y = 200;
  // bunny.x = 100;
  // bunny.y = 200;

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.anchor.set(0.5); // -> 중앙을 기준으로 확대됨
  // bunny.scale.set(5); // -> 왼쪽 위 롤 기준으로 확대됨


  // Graphics
  const border = new Graphics();
  border.rect(
    50, // x
    200, // y
    100, // width
    100 // height
  );
  border.fill('orange');
  app.stage.addChild(border);

  const line = new Graphics();
  line.moveTo(0, 100); // 펜을 손으로 들고 그 위치로 이동했다고 이해
  line.lineTo(app.screen.width, 100); // 선을 그린다
  line.stroke({
    color: '#fff',
    width: 5 // 굵기
  });
  app.stage.addChild(line);


};