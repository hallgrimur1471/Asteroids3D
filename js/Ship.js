'use strict';

/* global Entity, EntityManager, vec3, Cube, Keyboard, Utils, TexturedCube, mv, mult, translate, rotate, rotateX, scalem, scale, rotateZ, vec4, add */

class Ship extends Entity {
  constructor(keyboard, entityManager){
    const radius = 3.0;
    const position = vec3(0.0, 0.0, 0.0);
    super("Ship", position, radius);
    
    this.speed;
    this.position;
    this.headingVector;
    this.upVector;
    this.crossVector;
    this.initializeVariables();

    this.entityManager = entityManager;

    this.keyboard = keyboard;

    this.pitchRate = 0.5;
    this.yawRate = 0.5;
    this.rollRate = 0.5;
    this.thrustAcceleration = 0.001;
    this.deceleration = 1-0.005;

    this.color = vec4(0.2, 0.0, 0.0, 1.0);
    this.shipShape = new ShipShape(this.color);
  }
  
  initializeVariables(){
    this.reset();
  }
  
  getVelocity(){
    const velocity = scale(this.speed, this.headingVector);
    return velocity;
  }
  
  move(du){
    //console.log('Moving ship', du);
    const velocity = scale(du, this.getVelocity());
    this.position = Utils.stageWrap(vec3(add(this.position, velocity)));
    //console.log(this.position, this.speed, velocity);
  }
  
  reset(){
    this.speed = 0.000;
    this.position = vec3(0.0, 0.0, 0.0);

    this.headingVector = vec3(0.0, 0.0, 1.0);
    this.upVector = vec3(0.0, 1.0, 0.0);
    this.crossVector = cross(this.headingVector, this.upVector);
    this._isDeadNow = false;
  }
  
  addBullet(){
    if(this.bulletLimitOn && this.bullets.length >= this.bulletLimit) {
      // dont add bullet, limit reached
    } else {
      const bullet = new Bullet(
        add(this.position, scale(0.88, this.headingVector)),
        scale(Math.max(0.05, this.speed+(25.0*this.thrustAcceleration)), this.headingVector)
      );
      this.entityManager.getArena().addBullet(bullet);
    }
  }
  
  changePitch(deg){
    const rotationMatrix = rotate(deg, this.crossVector);
    this.updateVectors(rotationMatrix);
  }
  
  changeYaw(deg){
    const rotationMatrix = rotate(deg, this.upVector);
    this.updateVectors(rotationMatrix);
  }

  changeRoll(deg){
    const rotationMatrix = rotate(deg, this.headingVector);
    this.updateVectors(rotationMatrix);
  }

  updateVectors(rotationMatrix) {
    this.headingVector = vec3(mult(rotationMatrix, vec4(this.headingVector)));
    this.upVector = vec3(mult(rotationMatrix, vec4(this.upVector)));
    this.crossVector = cross(this.headingVector, this.upVector);
  }
  
  update(du){
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_PITCH_DOWN)) {
      this.changePitch(+this.pitchRate);
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
      this.changeRoll(this.rollRate);
    }
    
    if (this.keyboard.isDown(Keyboard.SHIP_ROLL_LEFT)) {
      this.changeRoll(-this.rollRate);
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
    //this.updateBullets(du);
  }
  
  //updateBullets(du){
  //  this.bullets.forEach(bullet => this.updateBullet(du, bullet));
  //}
  
  //updateBullet(du, bullet){
  //  bullet.position = vec3(add(bullet.position, scale(du, bullet.velocity)));
  //}
  
  render(){
    Utils.mvStack.push(mv);
    
    //mv = mult(mv, translate(this.position[0], this.position[1], this.position[2]));
    mv = mult(mv, translate(this.position));

    const rotationMatrix = transpose(
      mat4(
        vec4(this.crossVector, 0),
        vec4(this.upVector, 0),
        vec4(this.headingVector, 0)
      )
    );
    mv = mult(mv, rotationMatrix);

    const shipScale = 0.2;
    mv = mult(mv, scalem(shipScale, shipScale, shipScale));
    
    this.shipShape.draw();
    
    mv=Utils.mvStack.pop();
  }
  
  //renderBullets(){
  //  this.bullets.forEach(bullet => this.renderBullet(bullet));
  //}
  
  //renderBullet(bullet){
  //  Utils.mvStack.push(mv);
  //  mv = mult(mv, translate(bullet.position[0], bullet.position[1], bullet.position[2]));
  //  mv = mult(mv, rotateX(360 * Math.random()));
  //  mv = mult(mv, rotateY(360 * Math.random()));
  //  mv = mult(mv, rotateZ(360 * Math.random()));
  //  const bulletScale = 0.02;
  //  mv = mult(mv, scalem(bulletScale, bulletScale, bulletScale));
  //  this.cube.draw();
  //  //this.texturedCube.render(0, 0, 0, TexturedCube.TEXTURE_LETTER_Z);
  //  //console.log("rendering bullet ", bullet);
  //  mv=Utils.mvStack.pop();
  //}
}