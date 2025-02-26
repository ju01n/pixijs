// filter
import './style.css';
import {
  Application,
  Assets,
  Sprite,
  BlurFilter,
  ColorMatrixFilter,
  DisplacementFilter,
  AlphaFilter,
  NoiseFilter
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

  bunny.anchor.set(0.5);
  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  bunny.scale.set(2);

  // Filters
  // const blurFilter = new BlurFilter({
  //   // 강도 설정
  //   strength: 5
  // });
  // bunny.filters = blurFilter;

  const colorMatrixFilter = new ColorMatrixFilter();
   // hue : 색상 조정 메서드
  colorMatrixFilter.hue(Math.random() * 360); // 랜덤한 색상으로 변경

  const filterSpriteTexture = await Assets.load('https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png');
  const filterSprite = new Sprite(filterSpriteTexture);

  const filters = [
    new BlurFilter({strength: 5}),
    colorMatrixFilter,
    new DisplacementFilter(filterSprite), // 이미지 이용해 왜곡시키는 필터
    new AlphaFilter({alpha: 0.5}), // 투명도 조절
    new NoiseFilter({noise: 0.4}), // 노이즈
  ]
  // 사용할 필터 index 설정
  bunny.filters = filters[2]
};