// Graphics, Sprites
import './style.css';
import {
  Application,
  Assets,
  Sprite,
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

  bunny.x = 0
  bunny.y = app.screen.height / 2;
  bunny.anchor.set(0.5);
  bunny.scale.set(2);


  let n = 0;

  // ticker을 이용하여 반복 실행 시켜 애니메이션을 만들 수 있음
  app.ticker.add((delta) => {
    // 속도는 기기마다 다름. 보통은 1초마다 60번 실행
    // 그러나 pixijs는 게임에서도 많이 쓰이는데 기기마다 속도가 다르면 안됨!!

    // deltaTime : 함수가 실행되는 간격 -> 이걸 이용하면 기기마다 속도가 다르더라도 1초동안 똑같은 값으로 움직이는 것 보장 가능함
    // console.log(delta.deltaTime);
    bunny.x += 2 * delta.deltaTime; // 속도 보정하기
    bunny.rotation += delta.deltaTime * 0.1;
    if (bunny.x > app.screen.width) {
      bunny.x = 0;
    }

  })



};