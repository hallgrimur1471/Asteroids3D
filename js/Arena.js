'use strict';

function Arena(ship, grid) {
  // todo: should we use a grid?
  //this.grid = grid || this.generateGrid();

  this.ship = ship;
  this.ship.registerToArena(this);
}

Arena.prototype.update = function(du) {
  var result = this.ship.update(du);
  if (result === entityManager.KILL_ME_NOW) {
    // todo: handle death of ship
  }
}