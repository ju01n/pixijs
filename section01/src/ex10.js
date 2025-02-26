// Sprite Animation
import './style.css';
import {
  AnimatedSprite,
  Application,
  Assets,
  TilingSprite,
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

  // 배경 이미지
  const bgTexture = await Assets.load('/images/background.png');
  const bgSprite = new TilingSprite({
    texture: bgTexture,
    width: app.screen.width, // tile이 표시되는 화면의 너비
    height: app.screen.height
  });
  app.stage.addChild(bgSprite);
  bgSprite.tileScale.set(0.1);

  // 배경의 height를 창사이즈에 맞게
  function adjustTileScale() {
    const scale = window.innerHeight / bgTexture.height;
    bgSprite.tileScale.set(scale);
    bgSprite.width = window.innerWidth;
    bgSprite.height = window.innerHeight;

    // zombie의 위치도 비율과 위치를 조정해야함
    zombie.y = app.screen.height * 0.75 - zombie.height;
  }

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


  window.addEventListener('resize', adjustTileScale);
  adjustTileScale();

  // 배경화면 가로 이동
  app.ticker.add(delta => {
    bgSprite.tilePosition.x -= 2 * delta.deltaTime;
  })
};