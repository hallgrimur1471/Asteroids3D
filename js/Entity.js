'use strict';

/* global EntityManager */

class Entity {
  constructor(entityName){
    this.entityName = entityName;
  }
  
  render(ctx){
    console.log(this.entityName, "render not implemented.");
  }
  
  update(du){
    console.log(this.entityName, "update not implemented.");
  }
}