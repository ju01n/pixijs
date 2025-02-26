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

  // 스프라이트 생성
  const frames = [];
  for (let i = 0; i < 5; i++) {
    const frame = new Texture({
      source: texture,
      frame: new Rectangle(i * 128, 0, 128, 128)
    })
    frames.push(frame)
  }

  // sounds
  const punchSound = new Audio('/sounds/punch.mp3');

  const zombie = new AnimatedSprite(frames)
  app.stage.addChild(zombie);


  // 애니메이션 세팅
  zombie.animationSpeed = 0.2;
  zombie.loop = false;

  zombie.eventMode = 'static';
  zombie.cursor = 'pointer';
  zombie.on('pointertap', () => {
    zombie.play();
    zombie.gotoAndPlay(0);
    punchSound.currentTime = 0; // 사운드 초기화
    punchSound.play(); // 사운드 추가
  })

  zombie.onComplete = () => {
    zombie.gotoAndStop(0);
  }
};