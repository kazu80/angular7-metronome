const config = {
  isTap: false,
  isSec01: false,
  isSec02: false,
  isSec03: false,
  isEnd: false
};

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256,
  height: 256,
  backgroundColor: 0xffffff
});


window.onload = function () {
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0xffffff;

  /** 画像の読み込み **/
  addImage('assets/image/stage/logo.svg');

  /** Are you ready **/
  const button = addText('ARE YOU READY ?', {});
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = window.innerWidth * 0.5;
  button.position.y = window.innerHeight * 0.5;

  //タッチイベント(マウスイベント)を有効化
  button.interactive = true;

  // TOUCHイベント
  button.on('tap', () => config.isTap = true);

  //ボタンをステージに追加
  app.stage.addChild(button);
  /** /Are you ready **/

  // アニメーションの開始
  startAnimation();

  // Add the canvas that Pixi automatically created for you to the HTML document
  document.body.querySelector('#canvas-wrapper').appendChild(app.view);
};

/**
 * Add Images
 */
const images = [];

function addImage(path) {
  const image = PIXI.Sprite.fromImage(path);
  images.push(image);

  // 画像の読み込み完了を知るサンプル
  // image.texture.baseTexture.on("loaded", (e) => console.log(image.width));

  return image;
}

/**
 * Add Filter
 */
const filters = [];
function addFilters(item, blur) {
  const filter = new PIXI.filters.BlurFilter();
  filter.blur  = blur;
  item.filters = [filter];

  filters.push(filter);

  return filter;
}

/**
 * Add Texts
 */
const texts = [];
function addText(string, style) {
  const text = new PIXI.Text(string, style);
  texts.push(text);

  return text;
}

/**
 * Add Circle
 */
const circles = [];
function addCircle(alpha) {
  const circle = new PIXI.Graphics();
  circle.beginFill(0xDD0031);
  circle.drawCircle(0, 0, 1);

  circle.alpha = alpha;

  circle.x = window.innerWidth / 2;
  circle.y = window.innerHeight / 2;

  app.stage.addChild(circle);

  circles.push(circle);

  return circle;
}

function fadeOut(item) {
  item.alpha -= 0.08;

  if (item.alpha < 0) {
    removeFromStage(item);
    config.isTap = false;
  }
}

/**
 * stageから特定の消す
 */
function removeFromStage(param) {
  app.stage.removeChild(param);
}

/**
 * Start Ticker
 */
function startAnimation() {
  app.ticker.add(delta => gameLoop(delta));
}

function scaleUp(item, key, length, cb) {
  // 終了
  const multi = key + 1.5;

  if (key + 1 === length) {
    if (item.scale.y > 399 * multi) {
      return cb();
    }
  }

  if (item.scale.y < 400 * multi) {
    item.scale.x += 10 * multi;
    item.scale.y += 10 * multi;
  }
}

/**
 * Loop
 */
function gameLoop(delta) {

  if (config.isTap === true) {
    fadeOut(texts[0]);

    // ボタンが押されたら、sec01を発火
    if (config.isTap === false) {
      addCircle(1);
      addCircle(.5);
      addCircle(.25);
      config.isSec01 = true;
    }
  }

  if (config.isSec01 === true) {
    // 円を大きくする
    circles.forEach((circle, key) =>
      scaleUp(circle, key, circles.length,() => {
        config.isSec01 = false;
      }));

    // 次のステップへ
    if (config.isSec01 === false) {
      // [画像]の準備（設定）
      const image = images[0];

      image.anchor.x = 0.45;
      image.anchor.y = 0.6;
      image.x        = window.innerWidth * 0.5;
      image.y        = window.innerHeight * 0.5;
      image.alpha    = 0;

      // 画像にぼかしを入れる
      addFilters(image, 5);

      // stageに追加
      app.stage.addChild(image);

      // [METRONOME]を準備
      const text = addText('METRONOME', {fill: 'white', fontWeight: 'bold'});
      text.anchor.x   = 0.5;
      text.anchor.y   = 0.5;
      text.position.x = window.innerWidth * 0.5;
      text.position.y = image.y + (image.height * 0.5) + 10;
      text.alpha      = 0;

      addFilters(text, 5);

      //ボタンをステージに追加
      app.stage.addChild(text);

      // ○秒後にsec02へ
      setTimeout(() => config.isSec02 = true, 2000);
    }
  }

  if (config.isSec02 === true) {
    const text   = texts[1];
    const filter = filters[0];

    // 文字出現
    if (text.alpha < 1) {
      text.alpha += 0.05;
    }

    if (filter.blur > 0) {
      filter.blur -= 0.4;
    }

    // ロゴ出現
    const image       = images[0];
    const imageFilter = filters[1];

    // 画像の透過度を上げる
    if (image.alpha < 1) {
      image.alpha += 0.05;
    }

    // 画像のぼかしを下げる
    if (imageFilter.blur > 0) {
      imageFilter.blur -= 0.2;
    }

    if (imageFilter.blur <= 0) {
      config.isSec02 = false;
    }
  }

  // ロゴと文字が出た状態で、○秒間静止
  if (config.isSec02 === false) {

    // ○秒後にsec03へ
    setTimeout(() => config.isSec03 = true, 2000);


    const sec = 4000;
    // setTimeout(() => config.isEnd = true, sec);
  }

  // Destroy application
  if (config.isEnd === true) {
    app.destroy(true);

    // Banish canvas-wrapper
    document.body.querySelector('#canvas-wrapper').style.display = 'none';
  }
}
