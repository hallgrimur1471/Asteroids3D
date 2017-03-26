'use strict';

/* global EntityManager, Boulder */

class Arena {
  constructor(ship, entityManager) {
    this.entityManager = entityManager;

    this.ship = ship;
    this.boulders = [];
    this.ufos = []; // unidentified flying objects

    //this.boulders = [
    //  new Boulder(0.25, 3, vec3(0.0, 0.0, 0.0))
    //];

    this.bullets = [];
    this.stage = new StageCube();
  }

  placeInitialBoulders() {
    const numBoulders = 6;
    do {
      console.log('placingInitial boulders');
      this.boulders = [];
      for (var i = 0; i < numBoulders; i++) {
        this.boulders.push(new Boulder(0.25, 3, this.getRandomPosition()));
      }
    } while (this.entityManager.shipIsColliding())
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }
  
  update(du) {
    this.updateHTMLText();

    this.handleKilledEntities();

    this.getEntities().forEach(entity => entity.update(du));
    //this.getEntities().forEach(entity => {
    //  const result = entity.update(du);
    //  if (result === EntityManager.KILL_ME_NOW) {
    //    // todo: handle death entity
    //  }
    //});

  }

  handleKilledEntities() {
    this.bullets = this.bullets.filter(bullet => bullet.isAlive());
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
      if (this.ship.livesLeft > 1) {
        this.ship.livesLeft -= 1;
        const livesLeftText = document.getElementById("livesLeftText");
        livesLeftText.textContent = `You have hit a boulder, and have ${this.ship.livesLeft} lives left. Press P to resume game`;
        document.getElementById("bouldersLeftText").textContent = ``;
        this.ship.keyboard.pressPause();
        this.ship.reset();

        // Move boulders if colission on ship reset
        while (this.entityManager.shipIsColliding()) {
          this.boulders.forEach(boulder => boulder.move());
        }

        this.ship.revive();
      } else {
        const livesLeftText = document.getElementById("livesLeftText");
        livesLeftText.textContent = `Game Over`;
        const bouldersLeftText = document.getElementById("bouldersLeftText");
        bouldersLeftText.textContent = ``;
        this.ship.keyboard.pressPause();
      }
    }
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
    return [this.ship, ...this.boulders, ...this.bullets];
  }

  getRandomPosition() {
    return vec3(5*(Math.random()-0.5), 5*(Math.random()-0.5), 5*(Math.random()-0.5));
  }
}