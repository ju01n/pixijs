// Graphics, Sprites
import './style.css';
import {
  Application,
  Assets,
  Sprite,
  Graphics,
  Container
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

  // Container를 사용하면 그룹화 시켜 관리할 수 있음
  const container = new Container();
  app.stage.addChild(container);
  container.x = 200;
  container.y = 200;

  // Sprites
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const bunny = new Sprite(texture);
  container.addChild(bunny);

  bunny.x = 100;
  bunny.y = 100;

  const rect = new Graphics();
  rect.rect(0, 0, 50, 50);
  rect.fill();
  container.addChild(rect);


  // 이 컨테이너를 애니메이션화 시키기
  app.ticker.add((delta) => {
    container.rotation += delta.deltaTime * 0.01;
  });

};