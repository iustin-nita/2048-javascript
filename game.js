let game;
let gameOptions = {
  tileSize: 200,
  tweenSpeed: 50,
  tileSpacing: 20,
  localStorageName: "top2048Score"
};

let row = 0;
let col = 1;

window.onload = () => {
  let gameCongig = {
    type: Phaser.AUTO,
    width: gameOptions.tileSize * 4 + gameOptions.totalSpacing * 5,
    height: (gameOptions.tileSize * 4 + gameOptions.totalSpacing * 5) * 16 / 9,
    backgroundColor: 0xecf0f1,
    scene: [preloadAssets, playGame]
  };

  game = new Phaser.Game(gameCongig);
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};


let preloadAssets = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: () => {
    Phaser.Scene.call(this, {key: 'PreloadAssets'});
  },
  preload: () => {
    this.load.image("spot", "assets/sprites/spot.png");
    this.load.image("gametitle", "assets/sprites/gametitle.png");
    this.load.image("restart", "assets/sprites/restart.png");
    this.load.image("scorepanel", "assets/sprites/scorepanel.png");
    this.load.image("scorelabels", "assets/sprites/scorelabels.png");
    this.load.image("logo", "assets/sprites/logo.png");
    this.load.image("howtoplay", "assets/sprites/howtoplay.png");
    this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
      frameWidth: gameOptions.tileSize,
      frameHeight: gameOptions.tileSize
    });
    this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
    this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
    this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);
  },
  create: () => {
    this.scene.start('PlayGame');
  }
});

let playGame = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: () => {
    Phaser.Scene.call(this, {key: 'PlayGame'});
  },
  create: () => {
    this.fieldArray = [];
    this.fieldGroup = this.add.group();
    this.score = 0;
    this.beatScore = localStorage.getItem(gameOptions.localStorageName) == null;

    // for (let i = 0; i < 4; i++) {
    //   this.fieldArray[i] = [];
    //   for (let j = 0; j < 4; j++) {
    //     var spot = this.add.sprite(this.tileDestination(j, col), this.tileDestination(i, row), "spot")
    //     var tile = this.add.sprite(this.tileDestination(j, col), this.tileDestination(i, row), "tiles");
    //     this.alpha = 0;
    //     this.visible = 0;
    //     this.fieldGroup.add(tile);
    //     this.fieldArray[i][j] = {
    //       tileValue: 0,
    //       tileSprite: tile,
    //       canUpgrade: true
    //     }
    //   }
    // }
  }
})


let resize = () => {
  let canvas = document.querySelector('canvas');
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth/windowHeight;
  let gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = (windowWidth / gameRatio) + 'px';
  } else {
    canvas.style.width = (windowHeight * gameRatio) + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}