// Interaction
import './style.css';
import {
  Application,
  Assets,
  Sprite
} from 'pixi.js';

export default async function main() {
  const app = new Application();

  await app.init({
    background: 'pink',
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
  });

  app.canvas.id = 'app-canvas';
  document.body.appendChild(app.canvas);

  // Sprites
  const texture = await Assets.load('https://pixijs.com/assets/bunny.png');
  const bunny = new Sprite(texture);
  app.stage.addChild(bunny);
  // bunny의 중심점이 기준이 되게
  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  //  click 이벤트를 실행하려면 'eventMode'를 설정해야함
  bunny.eventMode = 'static';
  // bunny에 마우스를 올리면 커서가 pointer로 바뀜
  bunny.cursor = 'pointer';

  let n = 1;

  // poitnertap 이벤트를 사용하면 모바일, 데스크탑에서 모두 사용 가능
  bunny.on('pointertap', () => {
    // click 하면 1씩 증가
    bunny.scale.set(++n);
  })
};