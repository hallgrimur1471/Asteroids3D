'use strict';

/* global Entity, EntityManager, vec3, Cube, Keyboard */

class Ship extends Entity {
  constructor(shipConfig){
    super("Ship");
    this.KEY_UP = shipConfig.keyUp;
    this.KEY_DOWN = shipConfig.keyDown;
    this.KEY_LEFT = shipConfig.keyLeft;
    this.KEY_RIGHT = shipConfig.keyRight;
    this.KEY_SHOOT = shipConfig.keyShoot;
    this.keyboard = shipConfig.keyboard;
    
    this.reset_speed = 0;
    this.reset_position = new vec3(0.5, 0.5, 0.5);
    this.reset_pitch = 0; // up/down
    this.reset_yaw = 0; // left/right
    
    this.turnRate = 0.5;
    this.thrustAcceleration = 0.001;
    this.deceleration = 1-0.005;
    
    this.initializeVariables();
    
    this.cube = new Cube();
    
    this.at = vec3(0, 0, 0);
  }
  
  initializeVariables(){
    this.reset();
  }
  
  getHeading(){
    const rotMat = mult(rotateX(this.pitch), rotateZ(this.yaw));
    const heading = mult(rotMat, vec4(0, 1, 0, 1));
    return vec3(heading);
  }
  
  getVelocity(){
    const velocity = scale(this.speed, this.getHeading());
    return velocity;
  }
  
  move(du){
    //console.log('Moving ship', du);
    this.position = vec3(add(this.position, this.getVelocity()));
    console.log(this.position);
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
    
    if (this.keyboard.isDown(Keyboard.SHIP_UP)) {
      this.pitch -= this.turnRate;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_DOWN)) {
      this.pitch += this.turnRate;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_RIGHT)) {
      this.yaw -= this.turnRate;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_LEFT)) {
      this.yaw += this.turnRate;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_THRUST)) {
      this.speed += this.thrustAcceleration;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_BACK)) {
      this.speed -= this.thrustAcceleration;
    }
    
    this.speed = Math.abs(this.speed) < 0.001 ? 0 : this.speed * this.deceleration;
    
    console.info(`speed: ${this.speed}`);
  
    this.move(du);
  
    // todo: maybeShoot()
    // ...
    // do I do collission detection here? 
    //  nope iirc, the entity manager does that.
  }
  
  render(){
    Utils.mvStack.push(mv);
    
    mv = mult(mv, rotateY(this.yaw));
    mv = mult(mv, rotateX(this.pitch));
    
    this.cube.draw(this.position[0], this.position[1], this.position[2]);
    
    mv=Utils.mvStack.pop();
  }
}