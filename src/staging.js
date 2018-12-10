const config = {
  isTap: false,
  isSec01: undefined,
  isSec02: undefined,
  isSec03: undefined,
  isSec04: undefined,
  isSec05: undefined,
  isSec06: undefined,
  isSec07: undefined,
  isSec08: undefined,
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
  addImage('assets/image/stage/angular-blank.png');
  addImage('assets/image/stage/logo.svg');

  /** Are you ready **/
  const button = addText('ARE YOU READY ?', {fontFamily : 'brandon-grotesque'});
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = window.innerWidth * 0.5;
  button.position.y = window.innerHeight * 0.5;

  //タッチイベント(マウスイベント)を有効化
  button.interactive = true;

  // TOUCHイベント
  button.on('tap', () => {
    config.isTap = true;

    animationStart();
  });

  //ボタンをステージに追加
  app.stage.addChild(button);
  /** /Are you ready **/

  // アニメーションの登録
  animationRegistration();

  // Add the canvas that Pixi automatically created for you to the HTML document
  document.body.querySelector('#canvas-wrapper').appendChild(app.view);

  // オープニングが終わったら発火する
  window.addEventListener('openingended', (e) => {
    document.getElementById('app').classList.add('active');
  });
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

  //if (item.alpha < 0) {
    // removeFromStage(item);
    // config.isTap = false;
// }

  return item.alpha <= 0 ? true : false;
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
function animationRegistration() {
  app.ticker.add(delta => gameLoop(delta));
}

function animationStart() {
  app.ticker.start();
}

function animationStop() {
  app.ticker.stop();
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

  if (config.isTap === true && config.isSec01 === undefined) {
    const fadeOutText = fadeOut(texts[0]);

    // ボタンが押されたら、sec01を発火
    if (fadeOutText === true) {
      addCircle(1);
      addCircle(.5);
      addCircle(.25);
      config.isSec01 = true;
    }
  }

  // [Are You Ready]をタップしていない状態
  if (config.isTap === false && config.isSec01 === undefined) {
    animationStop();
  }

  // Step01
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
      const text = addText('METRONOME', {fontFamily : 'brandon-grotesque', fill: 'white', fontWeight: 'bold', fontSize: 40});
      text.anchor.x   = 0.5;
      text.anchor.y   = 0.5;
      text.position.x = window.innerWidth * 0.5;
      text.position.y = image.y + (image.height * 0.5) + 10;
      text.alpha      = 0;

      addFilters(text, 5);

      //ボタンをステージに追加
      app.stage.addChild(text);

      // ○秒後にsec02へ
      setTimeout(() => config.isSec02 = true, 1000);
    }
  }

  // Step02
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
  if (config.isSec01 === false && config.isSec02 === false) {

    // ○秒後にsec03へ
    setTimeout(() => config.isSec03 = true, 2000);


    const sec = 4000;
    // setTimeout(() => config.isEnd = true, sec);
  }

  // Step03 - 文字と画像を消す
  if (config.isSec03 === true) {
    const text   = texts[1];
    const filter = filters[0];

    // 文字を消す
    if (text.alpha > 0) {
      text.alpha -= 0.05;
    }

    // 文字をぼかす
    if (filter.blur < 5) {
      filter.blur += 0.4;
    }

    // ロゴ
    const image       = images[0];
    const imageFilter = filters[1];

    // 画像を消す
    if (image.alpha > 0) {
      image.alpha -= 0.05;
    }

    // 画像をぼかす
    if (imageFilter.blur < 5) {
      imageFilter.blur += 0.4;
    }

    // 画像をぼかしきったら、step03の静止状態へ
    if (imageFilter.blur >= 5) {
      config.isSec03 = false;
    }
  }

  // 消えた状態で○秒間静止、その後step04へ
  if (config.isSec02 === false && config.isSec03 === false && config.isSec04 === undefined) {

    // sec04の準備
    const image    = images[1];
    image.anchor.x = 0.5;
    image.anchor.y = 0.5;
    image.x        = window.innerWidth * 0.5;
    image.y        = -470;

    const scale = 3.2;
    image.scale.x = scale;
    image.scale.y = scale;

    // stageに追加
    app.stage.addChild(image);

    // ○秒後にsec04へ
    setTimeout(() => config.isSec04 = true, 1000);
  }

  // sec04
  if (config.isSec04 === true) {
    const image = images[1];

    // 画像を下に移動
    const positionY = window.innerHeight * 0.5;
    if (image.y < positionY) {
      image.y += 40;
    }

    // 画像の下移動が終わったら
    if (image.y >= positionY) {
      // 序盤で使った丸を消す
      circles.forEach((circle, key) => {
        circle.scale.x = 0;
        circle.scale.y = 0;
      });

      setTimeout(() => {
        // 画像を縮小させる
        if (image.scale.y > 1) {
          image.scale.x -= 0.02;
          image.scale.y -= 0.02;
        }

        // 画像が縮小終わったら、step04の静止状態へ
        if (image.scale.y <= 1) {
          config.isSec04 = false;
        }
      }, 1500);
    }
  }

  // 消えた状態で○秒間静止、その後step05へ
  if (config.isSec03 === false && config.isSec04 === false && config.isSec05 === undefined) {
    // [画像]の準備（設定）
    const angular = images[1];
    const image   = images[2];

    image.anchor.x = 0.45;
    image.anchor.y = 0.6;
    image.x        = window.innerWidth * 0.5;
    image.y        = angular.y + 15;
    image.scale.x  = 0.8;
    image.scale.y  = 0.8;
    image.alpha    = 0;

    // 画像にぼかしを入れる
    addFilters(image, 5);

    // stageに追加
    app.stage.addChild(image);

    // sec05へ
    config.isSec05 = true;
  }

  // sec05
  if (config.isSec05 === true) {
    // ロゴ出現（metronomeの白SVG画像）
    const image       = images[2];
    const imageFilter = filters[2];

    // 画像の透過度を上げる
    if (image.alpha < 1) {
      image.alpha += 0.05;
    }

    // 画像のぼかしを下げる
    if (imageFilter.blur > 0) {
      imageFilter.blur -= 0.2;
    }

    // 画像が出現したら
    if (imageFilter.blur <= 0) {
      config.isSec05 = false;
    }
  }

  if (config.isSec05 === false && config.isSec06 === undefined) {
    /** [metronome]を作成 **/
    const metronome = addText('METRONOME', {fontFamily : 'brandon-grotesque', fontWeight: 'bold', fontSize: 40});
    metronome.anchor.x = 0.5;
    metronome.anchor.y = 0.5;
    metronome.position.x = window.innerWidth * 0.5;
    metronome.alpha = 0;

    addFilters(metronome, 5);

    //[metronome]をステージに追加
    app.stage.addChild(metronome);
    /** /[metronome]を作成 **/

    /** [START]を作成 **/
    const start = addText('START', {fontFamily : 'brandon-grotesque', fontSize: 20});
    start.anchor.x = 0.5;
    start.anchor.y = 0.5;
    start.position.x = window.innerWidth * 0.5;
    start.alpha = 0;

    // ボカシ
    addFilters(start, 5);

    //タッチイベント(マウスイベント)を有効化
    start.interactive = true;

    // TOUCHイベント
    start.on('tap', () => {
      config.isSec08 = true;

      window.dispatchEvent(new CustomEvent('openingended'));
      animationStart();
    });

    //[metronome]をステージに追加
    app.stage.addChild(start);

    // stage6へ
    config.isSec06 = true;
  }

  // Stage6
  // ロゴを上に移動
  if (config.isSec06 === true) {
    const angular = images[1];
    const image   = images[2];

    const position = -50;
    const speed    = -3;

    if (angular.y > (window.innerHeight * 0.5) + position) {
      angular.y += speed;
      image.y   += speed;
    }

    if (angular.y <= (window.innerHeight * 0.5) + position) {
      const metronome = texts[2];
      const tap       = texts[3];

      metronome.y = angular.y   + (angular.height * 0.5)   + 40;
      tap.y       = metronome.y + (metronome.height * 0.5) + 140;

      config.isSec06 = false;
      config.isSec07 = true;
    }
  }

  // Stage07
  // [Metronome]と[START]を表示する
  if (config.isSec07 === true) {
    const metronome = texts[2];
    const start     = texts[3];
    const filterM   = filters[3];
    const filterS   = filters[4];

    // 画像の透過度を上げる
    const speedAlpha = 0.05;
    if (metronome.alpha < 1) {
      metronome.alpha += speedAlpha;
      start.alpha     += speedAlpha;
    }

    // 画像のぼかしを下げる
    const speedBlur = -0.2;
    if (filterM.blur > 0) {
      filterM.blur += speedBlur;
      filterS.blur += speedBlur;
    }

    // 画像が出現したら
    if (filterS.blur <= 0) {
      config.isSec07 = false;
      animationStop();
    }
  }

  // Stage08
  // STARTを押された
  if (config.isSec08 === true) {
    circles.forEach((circle, key) =>
      scaleUp(circle, key, circles.length,() => {
        config.isEnd = true;
      })
    );
  }

  // Destroy application
  if (config.isEnd === true) {
    app.destroy(true);

    // Banish canvas-wrapper
    document.body.querySelector('#canvas-wrapper').style.display = 'none';
  }
}
