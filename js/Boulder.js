'use strict';

/* global Entity, EntityManager, vec3, rotate, mv, Utils, mult, Cube, translate, add */

class Boulder extends Entity {
  constructor(shipConfig){
    super("Boulder");
    
    this.position = new vec3(5*(Math.random()-0.5), 5*(Math.random()-0.5), 5*(Math.random()-0.5));
    this.velocity = vec3((Math.random()-0.5)/20, (Math.random()-0.5)/20, (Math.random()-0.5)/20);
    this.pitch = Math.random() * Math.PI * 2; // up/down
    this.yaw = Math.random() * Math.PI * 2; // left/right
    this.pitchSpin = Math.random() * 2 - 1;
    this.yawSpin = Math.random() * 2 - 1;
    
    this.cube = new Cube();
  }
  
  move(du){
    //console.log('Moving ship', du);
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }
    //console.log("velocity", this.speed);
    this.yaw += this.yawSpin/2 % Math.PI;
    this.pitch += this.pitchSpin/2 % Math.PI;
    this.position = add(this.position, this.velocity);
  }
  
  render(){
    Utils.mvStack.push(mv);
    mv = mult(mv, translate(this.position[0], this.position[1], this.position[2]));
    mv = mult(mv, rotate(this.pitch, [1, 0, 0]));
    mv = mult(mv, rotate(this.yaw, [0, 1, 0]));
    this.cube.draw(0, 0, 0, 1);
    mv=Utils.mvStack.pop();
  }
}