'use strict';

/* global Entity, EntityManager */

class Ship extends Entity {
  constructor(shipConfig){
    super("Ship");
    this.KEY_UP = shipConfig.keyUp;
    this.KEY_DOWN = shipConfig.keyDown;
    this.KEY_LEFT = shipConfig.keyLeft;
    this.KEY_RIGHT = shipConfig.keyRight;
    this.KEY_SHOOT = shipConfig.keyShoot;
    
    this.reset_speed = 0.0;
    this.reset_x = 0.0;
    this.reset_y = 0.0;
    
    this.initializeVariables();
  }
  
  initializeVariables(){
    this.reset();
  }
  
  registerToArena(arena){
    this.arena = arena;
  }
  
  moveShip(du){
  console.log('Moving ship', du);
    
  }
  
  reset(){
    this.speed = this.reset_speed;
    this.x = this.reset_x;
    this.y = this.reset_y;
    this._isDeadNow = false;
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }
  
    this.moveShip(du);
  
    // todo: maybeShoot()
    // ...
    // do I do collission detection here? 
    //  nope iirc, the entity manager does that.
  }
}