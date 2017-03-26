'use strict';

/* global EntityManager */

class Entity {
  constructor(entityName, position, radius){
    if (position === undefined) {
      console.error(`No position specified for entity ${entityName}`);
    }
    if (radius === undefined) {
      console.error(`No radius specified for entity ${entityName}`);
    }
    this.name = entityName;
    this.alive = true;
    this.position = position;
    this.radius = radius;
    this.reasonOfDeath;
  }

  isAlive() {
    return this.alive;
  }

  isDead() {
    return !this.alive;
  }

  kill() {
    this.alive = false;
    console.log(`Killing ${this.name}`);
  }

  revive() {
    this.alive = true;
    console.log(`Revive-ing ${this.name}`);
  }
  
  render(ctx){
    console.log(this.entityName, "render not implemented.");
  }
  
  update(du){
    console.log(this.entityName, "update not implemented.");
  }
}