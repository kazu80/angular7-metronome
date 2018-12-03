const config = {
  isTap: false,
  isSec01: false,
  isEnd: false
};

//Create a Pixi Application
let app = new PIXI.Application({
  width: 256,
  height: 256,
  backgroundColor: 0xffffff
});

const button = new PIXI.Text('ARE YOU READY ?');

window.onload = function () {
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.renderer.backgroundColor = 0xffffff;

  /**
   * Button
   * @type {I18nInstructions.Text | ResponseContentType.Text | I18nUpdateOpCode.Text}
   */
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

  // アニメーションの開始
  startAnimation();

  // Add the canvas that Pixi automatically created for you to the HTML document
  document.body.querySelector('#canvas-wrapper').appendChild(app.view);
};


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

function scaleUp(item, multi) {
  item.scale.x += 10 * multi;
  item.scale.y += 10 * multi;

  if (item.scale.y > 400 * multi) {
    config.isSec01 = false;
  }
}

/**
 * Loop
 */
function gameLoop(delta) {

  if (config.isTap === true) {
    fadeOut(button);

    // ボタンが押されたら、sec01を発火
    if (config.isTap === false) {
      addCircle(1);
      addCircle(.5);
      addCircle(.25);
      config.isSec01 = true;
    }
  }

  if (config.isSec01 === true) {
    circles.forEach((circle, key) => scaleUp(circle, key + 1.5));

    // 3秒後に終わる
    setTimeout(() => config.isEnd = true, 3000);
  }

  // Destroy application
  if (config.isEnd === true) {
    app.destroy(true);
  }
}
