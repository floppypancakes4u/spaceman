alert('index called');

//const { SnapshotInterpolation } = Snap;
//const SI = new SnapshotInterpolation(30); // 30 FPS

var playerShip = null;
var allShips = {};
var loaded = false;
let game = null;
let backgroundLayer1 = [];
let backgroundLayer2 = [];
let backgroundLayer3 = [];
let controls = null;
let Projectiles = [];
let ProjectileID = [];
let lastFired = 0;
let bullets = null;

const SOLAR_BODIES_DEPTH = 1;
const STRUCTURE_DEPTH = 2;
const SHIP_DEPTH = 3;

const CATEGORY_PLAYER = 0x0001; // Player Ships, etc
const CATEGORY_EFFECT = 0x0010; // Projectiles, Missiles, Effects, etc
const CATEGORY_DEBRIS = 0x0100; // Unsynced Debris

const ratio = Math.max(
  window.innerWidth / window.innerHeight,
  window.innerHeight / window.innerWidth
);
const DEFAULT_HEIGHT = 720; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

class MainScene extends Phaser.Scene {
  constructor() {
    super();

    this.ships = new Map();
    //this.cursors
  }

  preload() {
    this.load.image('ship', '/assets/x2kship.png');
    //this.load.image('warpgate', 'assets/warpgate.png');
    // this.load.image('dust1', 'assets/smoke1.png');
    // this.load.image('dust2', 'assets/smoke2.png');
    // this.load.image('dust3', 'assets/smoke3.png');
    // this.load.image('dust4', 'assets/smoke4.png');
    // this.load.image('engine', 'assets/blue.png');
    // this.load.image('bluestar', 'assets/blue.png');
    // this.load.atlas(
    //   'space',
    //   'assets/space/space.png',
    //   'assets/space/space.json'
    // );
    // this.load.image('sun', 'assets/sun.png');
    // this.load.atlas('flares', 'assets/flares.png', 'assets/flares.json');
    // this.load.image('portal01', 'assets/portal01.png');
    // this.load.image('meteor_big', 'assets/meteor_big.png');
    // this.load.image('blue_bullet', 'assets/blue_bullet.png');
  }

  create() {
    controls = this.input.keyboard.addKeys('W,S,A,D,SPACE');
    this.spawnLocalShip();
    alert('created called');
  }

  update(time, delta) {
    playerShip.tick();

    // Movement
    const movement = {
      left: controls.A.isDown,
      right: controls.D.isDown,
      up: controls.W.isDown,
      down: controls.S.isDown,
    };

    if (controls.A.isDown) {
      // Turn Left
      playerShip.body.angle -= 0.01;
    } else if (controls.D.isDown) {
      // Turn Right
      //this.ship.thrustRight(0.1);
      playerShip.body.angle += 0.01;
    }

    let thrusting = false;
    if (controls.W.isDown) {
      // Thrust Forward
      playerShip.thrust(0.1);
      thrusting = true;
      playerShip.showThrust(thrusting);
    } else if (controls.A.isDown) {
      // Slow Down
      playerShip.thrustBack(0.005);
      playerShip.showThrust(thrusting);
    }

    updateUI();
    moveBackground(playerShip.x, playerShip.y);
    //console.log(playerShip.x, playerShip.y)
  }

  spawnLocalShip() {
    //let _player = createShip(this, this.socket.id, true);
    // //this.camera.follow(_player);
    // this.cameras.main.startFollow(_player);
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        x: 0,
        y: 0,
      },
    },
  },
  scene: [MainScene],
  dom: {
    createContainer: true,
  },
  parent: 'game',
};

window.addEventListener('load', () => {
  game = new Phaser.Game(config);
});

function createShip(game, id = 'NO TEXT SPECIFIED', isLocal = false) {
  let ship = game.matter.add.image(400, 300, 'ship').setDepth(SHIP_DEPTH);
  //ship.thrusting = false;

  // if (isLocal) {
  //   ship.setFrictionAir(0.05);
  //   ship.setMass(30);
  // }

  // if (playerShip == null) {
  //   playerShip = ship;
  // }

  //let text = game.add.text(0, 0, id, { font: '"Press Start 2P"' });

  // // Collision Handling
  // ship.setCollisionCategory(CATEGORY_PLAYER);
  // ship.setCollidesWith(CATEGORY_EFFECT);
  // ship.setCollidesWith(CATEGORY_DEBRIS);

  //Engine Particles
  // ship.engineParticles = game.add
  //   .particles('flares')
  //   .setDepth(SHIP_DEPTH)
  //   .createEmitter({
  //     frame: 'blue',
  //     lifespan: 500,
  //     //speed: { min: 200, max: 400 },
  //     angle: 0,
  //     scale: { start: 0.4, end: 0 },
  //     quantity: 0,
  //     blendMode: 'ADD',
  //   });
  // ship.engineParticles.startFollow(ship, -15);

  // ship.showThrust = (show) => {
  //   ship.engineParticles.setAngle(ship.angle);

  //   if (show) {
  //     ship.engineParticles.setQuantity(2);
  //     ship.engineParticles.setSpeed({
  //       min: (playerShip.body.speed / 2) * 25,
  //       max: playerShip.body.speed * 1.5 * 25,
  //     });
  //   } else {
  //     ship.engineParticles.setQuantity(0);
  //     ship.engineParticles.setSpeed(0);
  //   }
  // };

  // ship.isThrusting = () => {
  //   return ship.thrusting;
  // };

  // ship.setThrusting = (isThrusting) => {
  //   ship.thrusting = isThrusting;
  // };

  // ship.tick = () => {
  //   ship.showThrust(ship.isThrusting());
  // };

  // allShips[id] = { ship, text };
  alert('LOCAL SPAWNED');

  return ship;
}
