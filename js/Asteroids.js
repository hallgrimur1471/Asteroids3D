'use strict';

/* global EntityManager, Keyboard, Camera, Ship, Arena, Cube */

class Asteroids {
  constructor(keyboard, mouse) {
    if(keyboard === undefined) {
      console.error("keyboard is not defined");
    }
    
    this.camera = new Camera(mouse);
    
    this.mouse = mouse;
    this.keyboard = keyboard;
    
    this.entityManager = new EntityManager();
    this.createInitialArena();
    this.addCameraEventListeners();
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
  
  addCameraEventListeners() {
    if (this.keyboard.eatKey(Keyboard.KEY_MAP.PAUSE)) {
      this.isPaused = !this.isPaused;
    }
  }

  update(du) {
    if (this.keyboard.eatKey(Keyboard.CHANGE_CAMERA)) {
      this.camera.nextView();
    }
    // console.log('Asteroids: update', du);
    this.entityManager.update(du);
  }

  render() {
    this.camera.configure();
    this.entityManager.render();
  }
}