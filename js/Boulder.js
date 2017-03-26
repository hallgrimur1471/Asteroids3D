'use strict';

/* global Entity, EntityManager, vec3, rotate, mv, Utils, mult, Cube, translate, add */

class Boulder extends Entity {
  constructor(radius, livesLeft, position) {
    super("Boulder", position, radius);

    this.maxLives = 3;
    this.livesLeft = livesLeft;

    this.position = position;    
    this.velocity = scale(0.5, vec3((Math.random()-0.5)/100, (Math.random()-0.5)/100, (Math.random()-0.5)/100));
    this.velocity = scale(Math.pow(2, this.maxLives-this.livesLeft), this.velocity);
    //this.velocity = vec3(0.0, 0.0, 0.0);

    this.pitch = Math.random() * Math.PI * 2; // up/down
    this.yaw = Math.random() * Math.PI * 2; // left/right
    this.pitchSpin = Math.random() * 2 - 1;
    this.yawSpin = Math.random() * 2 - 1;
    //this.pitchSpin = 0;
    //this.yawSpin = 0;

    
    this.boulderColor = vec4(0.0, 1.0, 1.0, 1.0);
    this.cube = new Cube(this.boulderColor);

    this.scale = 0.2/Math.pow(2, this.maxLives-this.livesLeft);
  }
  
  move(){
    this.position = Utils.stageWrap(add(this.position, this.velocity));
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }

    //console.log("velocity", this.speed);
    this.yaw += this.yawSpin/2 % Math.PI;
    this.pitch += this.pitchSpin/2 % Math.PI;
    this.move();
  }
  
  render(){
    Utils.mvStack.push(mv);
    mv = mult(mv, translate(this.position[0], this.position[1], this.position[2]));
    mv = mult(mv, rotate(this.pitch, [1, 0, 0]));
    mv = mult(mv, rotate(this.yaw, [0, 1, 0]));
    mv = mult(mv, scalem(this.scale, this.scale, this.scale));
    this.cube.draw();
    //this.cube.draw(0, 0, 0, 1);
    mv=Utils.mvStack.pop();
  }
}