'use strict';

function Ship(description) {
  this.KEY_UP = description.keyUp;
  this.KEY_DOWN = description.keyDown;
  this.KEY_LEFT = description.keyLeft;
  this.KEY_RIGHT = description.keyRight;
  this.KEY_SHOOT = description.keyShoot;
  this.commands = description.commandObject;
  this.initializeVariables();
}

Ship.prototype.reset_speed = 0.0;
Ship.prototype.reset_x = 0.0;
Ship.prototype.reset_y = 0.0;

Ship.prototype.initializeVariables = function() {
  this.reset();
}

Ship.prototype.reset = function() {
  this.speed = this.reset_speed;
  this.x = this.reset_x;
  this.y = this.reset_y;
  //this._isDeadNow = false;
}

Ship.prototype.registerToArena = function(arena) {
  this.arena = arena;
}

Ship.prototype.moveShip = function(du) {
  console.log('Moving ship', du);
}

Ship.prototype.update = function(du) {
  if (this._isDeadNow) {
    return entityManager.KILL_ME_NOW;
  }

  this.moveShip(du);

  // todo: maybeShoot()
  // ...
  // do I do collission detection here?
}