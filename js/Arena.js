'use strict';

function Arena(ship, grid) {
  // todo: should we use a grid?
  //this.grid = grid || this.generateGrid();

  this.ship = ship;
  this.ship.registerToArena(this);
}