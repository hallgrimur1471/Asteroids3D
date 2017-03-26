'use strict';

/* global EntityManager, Boulder */

class Arena {
  constructor(ship) {
    this.ship = ship;
    this.boulders = [
      new Boulder(0.25, 3, this.getRandomPosition()),
      new Boulder(0.25, 3, this.getRandomPosition()),
      new Boulder(0.25, 3, this.getRandomPosition()),
      new Boulder(0.25, 3, this.getRandomPosition()),
      new Boulder(0.25, 3, this.getRandomPosition()),
      new Boulder(0.25, 3, this.getRandomPosition()),
    ];
    this.ufos = []; // unidentified flying objects
    //this.boulders = [
    //  new Boulder(0.25, 3, vec3(0.0, 0.0, 0.0))
    //];
    this.bullets = [];
    this.stage = new StageCube();
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
      if (boulder.livesLeft > 1) {
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
    //if (this.ship.isDead()) {
    //  console.info('ship is dead');
    //  if (this.ship.livesLeft > 1) {
    //    this.ship.livesLeft -= 1;
    //    const livesLeftText = document.getElementById("livesLeftText");
    //    livesLeftText.textContent = `You have hit a boulder, and have ${this.ship.livesLeft} lives left. Press P to resume game`;
    //    this.ship.keyboard.pressPause();
    //    this.ship.reset();
    //    this.ship.revive();
    //  } else {
    //    const livesLeftText = document.getElementById("livesLeftText");
    //    livesLeftText.textContent = `Game Over`;
    //    const bouldersLeftText = document.getElementById("bouldersLeftText");
    //    bouldersLeftText.textContent = ``;
    //    this.ship.keyboard.pressPause();
    //  }
    //}
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