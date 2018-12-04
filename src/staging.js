const config = {
  isTap: false,
  isSec01: false,
  isSec02: false,
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

  /** Are you ready **/
  const button = addText('ARE YOU READY ?', {});
  button.anchor.x = 0.5;
  button.anchor.y = 0.5;
  button.position.x = window.innerWidth * 0.5;
  button.position.y = window.innerHeight * 0.5;

  //ボタンをステージに追加
  app.stage.addChild(button);

  //タッチイベント(マウスイベント)を有効化
  button.interactive = true;

  // TOUCHイベント
  button.on('tap', () => config.isTap = true);
  /** /Are you ready **/

  // アニメーションの開始
  startAnimation();

  // Add the canvas that Pixi automatically created for you to the HTML document
  document.body.querySelector('#canvas-wrapper').appendChild(app.view);
};

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
      scaleUp(circle, key, circles.length,() => config.isSec01 = false));

    // ○秒後にSec01を終える
    const sec = 2000;
    setTimeout(() => {
      config.isSec02 = true
    }, sec);
  }

  if (config.isSec02 === true) {
    setTimeout(() => config.isEnd = true, 2000);
  }

  // Destroy application
  if (config.isEnd === true) {
    app.destroy(true);

    // Banish canvas-wrapper
    document.body.querySelector('#canvas-wrapper').style.display = 'none';
  }
}
