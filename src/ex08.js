// Sprite Animation
import './style.css';
import {
  AnimatedSprite,
  Application,
  Assets,
  Rectangle,
  Texture
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

  const texture = await Assets.load('/images/Attack.png');

  // const frames = [
  //   // 5 frame
  //   new Texture({
  //     source: texture,
  //     frame: new Rectangle(0, 0, 128, 128) // 좌표, 크기
  //   }),
  //   new Texture({
  //     source: texture,
  //     frame: new Rectangle(128, 0, 128, 128)
  //   }),
  //   new Texture({
  //     source: texture,
  //     frame: new Rectangle(256, 0, 128, 128)
  //   }),
  //   new Texture({
  //     source: texture,
  //     frame: new Rectangle(384, 0, 128, 128)
  //   }),
  //   new Texture({
  //     source: texture,
  //     frame: new Rectangle(512, 0, 128, 128)
  //   }),
  // ]

  // frame을 반복문으로 더 간단하게 생성해보기
  const frames = [];
  for (let i = 0; i < 5; i++) {
    const frame = new Texture({
      source: texture,
      frame: new Rectangle(i * 128, 0, 128, 128)
    })
    frames.push(frame)
  }



  const zombie = new AnimatedSprite(frames)
  app.stage.addChild(zombie);


  // 애니메이션 세팅
  zombie.animationSpeed = 0.2;
  zombie.loop = false;
  // zombie.play();

  // 를릭하면 애니메이션 실행되게 하기
  zombie.eventMode = 'static';
  zombie.cursor = 'pointer';
  zombie.on('pointertap', () => {
    zombie.play();
    zombie.gotoAndPlay(0); // 첫번째 프레임부터 시작하게
  })

  // onComplete : 애니메이션이 완료되었을 때 실행되는 콜백함수
  zombie.onComplete = () => {
    zombie.gotoAndStop(0); // 첫번째 프레임으로 돌아가서 멈춤
  }
};