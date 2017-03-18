'use strict';

/* global EntityManager Keyboard Ship Arena*/

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
  
    // Initialize arena
    const arena = new Arena(ship);
    this.arena =  arena;
  
    // Set the newly created arena as the default arena
    this.entityManager.setDefaultArena(this.arena);
  }

  update(du) {
    console.log('updating simulation');
    //processDiagnostics();
    this.entityManager.update(du);
  }

  renderSimulation() {
     //...
     //entityManager.render()...
  }

  processDiagnostics() {
    // here one can react to diagnostics keypresses
    // or toggle the audio
  }
}