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
  let gameConfig = {
    type: Phaser.AUTO,
    width: gameOptions.tileSize * 4 + gameOptions.totalSpacing * 5,
    height: (gameOptions.tileSize * 4 + gameOptions.totalSpacing * 5) * 16 / 9,
    backgroundColor: 0xecf0f1,
    scene: [preloadAssets, playGame]
  };

  game = new Phaser.Game(gameConfig);
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
  initialize: function() {
    Phaser.Scene.call(this, {key: 'PlayGame'});
  },
  create: () => {
    this.fieldArray = [];
    this.fieldGroup = this.add.group();
    this.score = 0;
    this.bestScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);

    for (let i = 0; i < 4; i++) {
      this.fieldArray[i] = [];
      for (let j = 0; j < 4; j++) {
        var spot = this.add.sprite(this.tileDestination(j, col), this.tileDestination(i, row), "spot")
        var tile = this.add.sprite(this.tileDestination(j, col), this.tileDestination(i, row), "tiles");
        this.alpha = 0;
        this.visible = 0;
        this.fieldGroup.add(tile);
        this.fieldArray[i][j] = {
          tileValue: 0,
          tileSprite: tile,
          canUpgrade: true
        }
      }
    }

    let restartButton = this.add.sprite(this.tileDestination(3, col), this.tileDestination(0, row) - 200, 'restart');
    restartButton.setInteractive();
    restartButton.on('pointerDown', () => {
      this.scene.start('PlayGame');
    }, this);

    this.add.sprite(this.tileDestination(1, col), this.tileDestination(0, row) - 200, 'scorepanel');
    this.add.sprite(this.tileDestination(1, col), this.tileDestination(0, row) - 270, 'scorelabels');
    this.add.sprite(10, 5, 'gametitle').setOrigin(0, 0);

    let howTo = this.add.sprite(game.config.width, 5, 'howtoplay');
    howTo.setOrigin(1, 0);

    let logo = this.add.sprite(game.config.width / 2, game.config.height, 'logo');
    logo.setOrigin(0.5,1);
    logo.setInteractive();
    logo.on('pointerDown', () => {
      window.location.href = '/';
    });

    this.scoreText = this.add.bitmapText(this.tileDestination(0, col) - 80, this.tileDestination(0, row) - 255, 'font', '0' );
    this.bestScoreText = this.add.bitmapText(this.tileDestination(2, col) - 190, this.tileDestination(0, row) - 255, 'font', this.bestScore.toString());

    // call function we set up later
    this.input.keyboard.on('keydown', this.handleKey, this);

    this.canMove = false;

    // add 2 tiles when game starts
    this.addTile();
    this.addTile();

    this.input.on('pointerup', this.swipeE, this);

    this.moveSound = this.sound.add('move');
    this.growSound = this.sound.add('grow');

  },

  swipeE: (e) => {
    console.log('swipe');
  },

  addTile: () => {
    console.log("add a tile");
  },

  handleKey: (e) => {
    console.log("PRESSED");
  },

  handleMove: (e) => {
    console.log("Move");
  },
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