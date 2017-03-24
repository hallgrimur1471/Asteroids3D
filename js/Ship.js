'use strict';

/* global Entity, EntityManager, vec3, Cube, Keyboard, Utils, TexturedCube, mv, mult, translate, rotate, rotateX, scalem, scale, rotateZ, vec4, add */

class Ship extends Entity {
  constructor(shipConfig){
    super("Ship");
    this.keyboard = shipConfig.keyboard;

    this.speed;
    this.position;
    this.headingVector;
    this.upVector;
    this.crossVector;
    
    this.pitchRate = 1.2;
    this.yawRate = 1.2;
    this.rollRate = 1.2;
    this.thrustAcceleration = 0.001;
    this.deceleration = 1-0.005;

    this.initializeVariables();

    this.color = vec4(0.2, 0.0, 0.0, 1.0);
    this.shipShape = new ShipShape(this.color);

    this.bullets = [];
  }
  
  initializeVariables(){
    this.reset();
  }
  
  //getHeading(){
  //  const rotMat = mult(rotateX(this.pitch), rotateZ(this.yaw));
  //  const heading = mult(rotMat, vec4(0, 0, 1, 1));
  //  return vec3(heading);
  //}
  
  getVelocity(){
    const velocity = scale(this.speed, this.headingVector);
    return velocity;
  }
  
  move(du){
    //console.log('Moving ship', du);
    const velocity = scale(du, this.getVelocity());
    this.position = vec3(add(this.position, velocity));
    //console.log(this.position, this.speed, velocity);
  }
  
  reset(){
    this.speed = 0;
    this.position = vec3(0.0, 0.0, 0.0);

    this.headingVector = vec3(0.0, 0.0, 1.0);
    this.upVector = vec3(0.0, 1.0, 0.0);
    this.crossVector = cross(this.upVector, this.headingVector);
    this._isDeadNow = false;
  }
  
  addBullet(){
    if(this.bulletLimitOn && this.bullets.length >= this.bulletLimit) {
      // dont add bullet, limit reached
    } else {
      this.bullets.push({
        position: this.position,
        velocity: scale(Math.max(0.05, this.speed), this.getHeading())
      }); 
    }
  }
  
  changePitch(deg){
    const rotMat = rotate(deg, this.crossVector);
    this.updateVectors(rotMat);
    console.log("Pitch", this.headingVector, this.upVector);
  }
  
  changeYaw(deg){
    const rotMat = rotate(deg, this.upVector);
    this.updateVectors(rotMat);
    console.log("Yaw", this.headingVector);
  }

  changeRoll(deg){
    const rotMat = rotate(deg, this.headingVector);
    this.updateVectors(rotMat);
    console.log("roll", this.headingVector);
  }

  updateVectors(rotMat) {
    this.headingVector = vec3(mult(rotMat, vec4(this.headingVector)));
    this.upVector = vec3(mult(rotMat, vec4(this.upVector)));
    //this.crossVector = cross(this.headingVector, this.upVector);
    this.crossVector = cross(this.upVector, this.headingVector);
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_PITCH_DOWN)) {
      this.changePitch(this.pitchRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_PITCH_UP)) {
      this.changePitch(-this.pitchRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_YAW_RIGHT)) {
      this.changeYaw(-this.yawRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_YAW_LEFT)) {
      this.changeYaw(this.yawRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_ROLL_RIGHT)) {
      this.changeRoll(-this.rollRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_ROLL_LEFT)) {
      this.changeRoll(this.rollRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_THRUST)) {
      this.speed += this.thrustAcceleration;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_BACK)) {
      this.speed -= this.thrustAcceleration;
    }
    
    if (this.keyboard.eatKey(Keyboard.SHIP_SHOOT)) {
      this.addBullet();
    }
    
    
    this.speed = Math.abs(this.speed) < 0.001 ? 0 : this.speed * this.deceleration;
    
    //console.info(`pitch: ${this.pitch}, yaw: ${this.yaw}`);
    //console.info(`speed: ${this.speed}`);
  
    this.move(du);
  
    // todo: maybeShoot()
    // ...
    // do I do collission detection here? 
    //  nope iirc, the entity manager does that.
    this.updateBullets(du);
  }
  
  updateBullets(du){
    this.bullets.forEach(bullet => this.updateBullet(du, bullet));
  }
  
  updateBullet(du, bullet){
    bullet.position = vec3(add(bullet.position, scale(du, bullet.velocity)));
  }
  
  calculateUpVector(){
    const up = [0, Utils.cosd(this.pitch), -Utils.sind(this.pitch)]; // This does not make sense, why is x always 0?
    return up;
  }
  
  render(){
    Utils.mvStack.push(mv);
    //const shipYAxis = [0, Utils.cosd(this.pitch), -Utils.sind(this.pitch)];
    
    //mv = mult(mv, translate(this.position[0], this.position[1], this.position[2]));
    //mv = mult(mv, rotate(-this.yaw, shipYAxis));
    //mv = mult(mv, rotate(this.pitch));

    const rotMat = transpose(mat4(vec4(this.crossVector, 0),
                                  vec4(this.upVector, 0),
                                  vec4(this.headingVector, 0)));
    mv = mult(mv, rotMat);
    const shipScale = 0.05;
    mv = mult(mv, scalem(shipScale, shipScale, shipScale));
    
    this.shipShape.draw();
    
    mv=Utils.mvStack.pop();
  }
  
  renderBullets(){
    this.bullets.forEach(bullet => this.renderBullet(bullet));
  }
  
  renderBullet(bullet){
    Utils.mvStack.push(mv);
    mv = mult(mv, translate(bullet.position[0], bullet.position[1], bullet.position[2]));
    mv = mult(mv, rotateX(360 * Math.random()));
    mv = mult(mv, rotateY(360 * Math.random()));
    mv = mult(mv, rotateZ(360 * Math.random()));
    mv = mult(mv, scalem(0.1, 0.1, 0.1));
    this.texturedCube.render(0, 0, 0, TexturedCube.TEXTURE_LETTER_Z);
    //console.log("rendering bullet ", bullet);
    mv=Utils.mvStack.pop();
  }
}

//    if(window.ARNAR){
//      Utils.mvStack.push(mv);
//      //const upVector = this.calculateUpVector();
//      
//      mv = mult(mv, translate(this.position[0], this.position[1], this.position[2]));
//      //mv = mult(mv, rotate(-this.yaw, upVector));
//      //console.info(shipYAxis);
//      //mv = mult(mv, rotationMatrixFromTwoVectors(this.upVector, this.headingVector));
//      
//      mv = mult(mv, scalem(1/3, 1/3, 1/3));
//      mv = mult(mv, translate(-1.0, -1.0, -1.0));
//      if(!this.cubeSpecs){
//        this.texturedCube = new TexturedCube();
//        this.cubeSpecs = [
//          { x: 1, y: 0, z: 0, textureName: TexturedCube.TEXTURE_LETTER_B },
//          { x: 0, y: 1, z: 0, textureName: TexturedCube.TEXTURE_LETTER_R },
//          { x: 1, y: 1, z: 0, textureName: TexturedCube.TEXTURE_LETTER_Z },
//          { x: 2, y: 1, z: 0, textureName: TexturedCube.TEXTURE_LETTER_L },
//          { x: 1, y: 2, z: 0, textureName: TexturedCube.TEXTURE_LETTER_T },
//          { x: 1, y: 1, z: 1, textureName: TexturedCube.TEXTURE_LETTER_Z },
//          { x: 1, y: 1, z: 2, textureName: TexturedCube.TEXTURE_LETTER_Z },
//        ]
//      }
//      this.cubeSpecs.forEach(cubeSpec => {
//        this.texturedCube.render(cubeSpec.x, cubeSpec.y, cubeSpec.z, cubeSpec.textureName);
//      });
//      
//      //this.texturedCube.render(0, 0, 0, TexturedCube.TEXTURE_LETTER_Z);
//      mv = Utils.mvStack.pop();
//      
//      this.renderBullets();
//      
//      this.vector.render(0, 0, window.posx || 5, Vector.TEXTURE_LETTER_L);
//    } else {