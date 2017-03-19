'use strict';

/* global EntityManager, Keyboard, Ship, Arena, Cube */

class Asteroids {
  constructor(keyboard) {
    if(keyboard === undefined) {
      console.error("keyboard is not defined");
    }
      
    this.keyboard = keyboard;
    
    this.entityManager = new EntityManager();
    this.createInitialArena();
  }
  
  createInitialArena() {
    const ship = new Ship({
        keyUp: Keyboard.SHIP_UP,
        keyDown: Keyboard.SHIP_DOWN,
        keyLeft: Keyboard.SHIP_LEFT,
        keyRight: Keyboard.SHIP_RIGHT,
        keyShoot: Keyboard.SHIP_SHOOT,
        keyboard: this.keyboard
    });
    
    this.arena = new Arena(ship);
    this.entityManager.setDefaultArena(this.arena);
  }

  update(du) {
    // console.log('Asteroids: update', du);
    this.entityManager.update(du);
  }

  render() {
    this.entityManager.render();
  }
}