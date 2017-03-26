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
    this.bullets = [];
    this.stage = new StageCube();
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }
  
  update(du) {
    this.handleKilledEntities();
    this.getEntities().forEach(entity => {
      const result = entity.update(du);
      if (result === EntityManager.KILL_ME_NOW) {
        // todo: handle death entity
      }
    });
  }

  handleKilledEntities() {
    this.bullets = this.bullets.filter(bullet => bullet.isAlive());
    this.handleKilledBoulders();
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