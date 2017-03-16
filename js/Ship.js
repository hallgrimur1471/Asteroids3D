'use strict';

function Ship(description) {
  this.KEY_UP = description.keyUp;
  this.KEY_DOWN = description.keyDown;
  this.KEY_LEFT = description.keyLeft;
  this.KEY_RIGHT = description.keyRight;
  this.KEY_SHOOT = description.keyShoot;
  this.commands = description.commandObject;
}

Ship.prototype.registerToArena = function(arena) {
  this.arena = arena;
}