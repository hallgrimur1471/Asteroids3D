'use strict';

class Arena {
  constructor(ship, grid) {
    // todo: should we use a grid?
    //this.grid = grid || this.generateGrid();

    this.ship = ship;
    this.ship.registerToArena(this);
  }
  
  update() {
    let result = this.ship.update(du);
    if (result === EntityManager.KILL_ME_NOW) {
      // todo: handle death of ship
    }
  }
}