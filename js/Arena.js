'use strict';

/* global EntityManager, Boulder */

class Arena {
  constructor(ship) {
    this.ship = ship;
    this.boulders = [
      new Boulder(),
      new Boulder(),
      new Boulder(),
      new Boulder(),
      new Boulder(),
      new Boulder(),
    ];
    this.bullets = [];
    this.stage = new StageCube();
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
  }
  
  update(du) {
    this.getEntities().forEach(entity => {
      const result = entity.update(du);
      if (result === EntityManager.KILL_ME_NOW) {
        // todo: handle death entity
      }
    });
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
}