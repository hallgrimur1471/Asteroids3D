'use strict';

/* global EntityManager, Boulder */

class Arena {
  constructor(ship, entityManager, camera) {
    this.entityManager = entityManager;
    this.camera = camera;

    this.ship = ship;
    this.boulders = [];
    this.ufos = []; // unidentified flying objects
    this.addUfo();
    this.chancesOfUfo = 0.0;

    //this.boulders = [
    //  new Boulder(0.25, 3, vec3(0.0, 0.0, 0.0))
    //];

    this.bullets = [];
    this.ufoBullets = [];
    this.stage = new StageCube();
  }

  placeInitialBoulders() {
    const numBoulders = 4;
    do {
      console.log('placingInitial boulders');
      this.boulders = [];
      for (var i = 0; i < numBoulders; i++) {
        this.boulders.push(new Boulder(0.25, 3, this.getRandomPosition()));
      }
    } while (this.entityManager.shipIsColliding())
  }

  addUfo() {
    const radius = 0.25;
    const position = this.getRandomEdgePosition();
    const entityToFollow = this.ship;
    this.ufos.push(new Ufo(radius, position, entityToFollow, this.entityManager));
  }

  addUfoBullet(bullet) {
    this.ufoBullets.push(bullet);
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }
  
  update(du) {
    this.updateHTMLText();

    this.maybeAddUfo();

    this.handleKilledEntities();

    this.getEntities().forEach(entity => entity.update(du));
    //this.getEntities().forEach(entity => {
    //  const result = entity.update(du);
    //  if (result === EntityManager.KILL_ME_NOW) {
    //    // todo: handle death entity
    //  }
    //});

  }

  maybeAddUfo() {
    this.chancesOfUfo += 1.0/(this.ufos.length+1);
    const rnd = 1000 + Math.floor(100000*Math.random());
    //console.log(this.chancesOfUfo, rnd);
    if (this.chancesOfUfo > rnd) {
      console.log('Adding a UFO!');
      this.chancesOfUfo = 0.0;
      this.addUfo();
    }
  }

  handleKilledEntities() {
    this.bullets = this.bullets.filter(bullet => bullet.isAlive());
    this.ufoBullets = this.ufoBullets.filter(bullet => bullet.isAlive());
    this.ufos = this.ufos.filter(ufo => ufo.isAlive());
    this.handleKilledBoulders();
    this.handleKilledShip();
  }

  handleKilledBoulders() {
    const deadBoulders = this.boulders.filter(boulder => boulder.isDead());
    const aliveBoulders = this.boulders.filter(boulder => boulder.isAlive());

    if (deadBoulders.length > 0) {
      //debugger;
    }
    
    let newBoulders = [];
    deadBoulders.forEach(boulder => {
      if (boulder.livesLeft === 2) { // split boulder into 3 boulders
        const rndVec = normalize(vec3(Math.random(), Math.random(), Math.random()));
        newBoulders.push(
          new Boulder(
            boulder.radius/2,
            boulder.livesLeft-1,
            add(boulder.position, scale(boulder.radius, rndVec))
          )
        );
        newBoulders.push(
          new Boulder(
            boulder.radius/2,
            boulder.livesLeft-1,
            add(boulder.position, scale(-boulder.radius, rndVec))
          )
        );
        const rndVec2 = normalize(vec3(Math.random(), Math.random(), Math.random()));
        newBoulders.push(
          new Boulder(
            boulder.radius/2,
            boulder.livesLeft-1,
            add(boulder.position, scale(-boulder.radius, rndVec2))
          )
        );
      }
      if (boulder.livesLeft > 2) { // split boulder into 2 boulders
        const rndVec = normalize(vec3(Math.random(), Math.random(), Math.random()));
        newBoulders.push(
          new Boulder(
            boulder.radius/2,
            boulder.livesLeft-1,
            add(boulder.position, scale(boulder.radius, rndVec))
          )
        );
        newBoulders.push(
          new Boulder(
            boulder.radius/2,
            boulder.livesLeft-1,
            add(boulder.position, scale(-boulder.radius, rndVec))
          )
        );
      }
    });

    this.boulders = [...aliveBoulders, ...newBoulders];
  }

  handleKilledShip() {
    if (this.ship.isDead()) {
      console.info('ship is dead');
      this.camera.setView(Camera.VIEW_FOLLOWING);
      this.camera.zoom = 7;
      this.ship.livesLeft -= 1;
      console.log(`SHIP LIVES LEFT: ${this.ship.livesLeft}`);
      if (this.ship.livesLeft > 0) {
        const livesLeftText = document.getElementById("livesLeftText");
        if (this.ship.reasonOfDeath === "boulder") {
          livesLeftText.textContent = `You have hit a boulder! You have ${this.ship.livesLeft} lives left. Press P to resume game`;
        }
        else if (this.ship.reasonOfDeath === "ufo-collision") {
          livesLeftText.textContent = `You have hit a UFO! You have ${this.ship.livesLeft} lives left. Press P to resume game`;
        }
        else if (this.ship.reasonOfDeath === "ufo-bullet") {
          livesLeftText.textContent = `You have been shot by a UFO! You have ${this.ship.livesLeft} lives left. Press P to resume game`;
        }
        document.getElementById("bouldersLeftText").textContent = ``;

        this.ufoBullets.forEach(bullet => bullet.kill());
        this.ufoBullets = this.ufoBullets.filter(bullet => bullet.isAlive());

        this.ship.keyboard.pressPause();
      } else {
        const livesLeftText = document.getElementById("livesLeftText");
        livesLeftText.textContent = `Game Over`;
        const bouldersLeftText = document.getElementById("bouldersLeftText");
        bouldersLeftText.textContent = ``;
        this.ship.keyboard.pressPause();
      }
    }
  }

  reset() {
    this.ship.reset();

    // Move boulders if colission on ship reset
    while (this.entityManager.shipIsColliding()) {
      this.boulders.forEach(boulder => boulder.move());
      this.ufos.forEach(ufo => {
        ufo.position[2] = StageCube.SIZE/2;
        ufo.update();
      });
      this.ufoBullets.forEach(bullet => {
        bullet.kill();
      });
    }

    this.ship.revive();
  }

  updateHTMLText() {
    const livesLeftText = document.getElementById("livesLeftText");
    livesLeftText.textContent = `You have ${this.ship.livesLeft} lives left`;

    const bouldersLeftText = document.getElementById("bouldersLeftText");
    bouldersLeftText.textContent = `There are ${this.boulders.length} boulders left in the area and ${this.ufos.length} UFOs`;
  }
  
  render(){
    this.getEntities().forEach(entity => {
      entity.render();
    });
    
    this.stage.render();
  }

  getEntities() {
    return [this.ship, ...this.bullets, ...this.boulders, ...this.ufos, ...this.ufoBullets];
  }

  getRandomPosition() {
    return vec3(5*(Math.random()-0.5), 5*(Math.random()-0.5), 5*(Math.random()-0.5));
  }

  getRandomEdgePosition() {
    const min = 0;
    const max = 2;
    let rnd = Math.floor(Math.random() * (max-min) + min);

    let N = StageCube.SIZE/2;
    if (Math.random() > 0.5) {
      N = -N;
    }

    let rndVec;
    if (rnd === 0) {
      rndVec = vec3(N, 5*(Math.random()-0.5), 5*(Math.random()-0.5));
    }
    else if (rnd === 1) {
      rndVec = vec3(5*(Math.random()-0.5), N, 5*(Math.random()-0.5));
    }
    else {
      rndVec = vec3(5*(Math.random()-0.5), 5*(Math.random()-0.5), N);
    }

    return rndVec;
  }
}