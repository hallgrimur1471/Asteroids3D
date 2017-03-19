'use strict';

/* global Entity, EntityManager, vec2, Cube */

class Ship extends Entity {
  constructor(shipConfig){
    super("Ship");
    this.KEY_UP = shipConfig.keyUp;
    this.KEY_DOWN = shipConfig.keyDown;
    this.KEY_LEFT = shipConfig.keyLeft;
    this.KEY_RIGHT = shipConfig.keyRight;
    this.KEY_SHOOT = shipConfig.keyShoot;
    
    this.reset_speed = 0;
    this.reset_position = new vec2(0.5, 0.5, 0.5);
    this.reset_pitch = 0; // up/down
    this.reset_yaw = 0; // left/right
    
    this.initializeVariables();
    
    this.cube = new Cube();
  }
  
  initializeVariables(){
    this.reset();
  }
  
  move(du){
    //console.log('Moving ship', du);
  }
  
  reset(){
    this.speed = this.reset_speed;
    this.position = this.reset_position;
    this.pitch = this.reset_pitch;
    this.yaw = this.reset_yaw;
    this._isDeadNow = false;
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }
  
    this.move(du);
  
    // todo: maybeShoot()
    // ...
    // do I do collission detection here? 
    //  nope iirc, the entity manager does that.
  }
  
  render(){
    this.cube.draw(0,0,0);
  }
}