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
    this.stageCube = new StageCube();
  }
  
  update(du) {
    [this.ship, ...this.boulders].forEach(entity => {
      let result = entity.update(du);
      if (result === EntityManager.KILL_ME_NOW) {
        // todo: handle death entity
      }
    });
  }
  
  render(){
    this.stageCube.render();
    this.ship.render();
    //this.boulders.forEach(boulder => boulder.render());
  }
}