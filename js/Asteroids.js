'use strict';

/* global EntityManager, Keyboard, Camera, Ship, Arena, Cube */

class Asteroids {
  constructor(keyboard, mouse) {
    if(keyboard === undefined) {
      console.error("keyboard is not defined");
    }
    this.mouse = mouse;
    this.keyboard = keyboard;

    const ship = this.createShip();
    this.ship = ship;
    this.camera = new Camera(mouse);
    this.camera.setEntityToFollow(ship);
    this.camera.setView(Camera.VIEW_STATIONARY);
    
    this.entityManager = new EntityManager();
    this.createInitialArena();
    this.addCameraEventListeners();
  }
  
  createShip() {
    const ship = new Ship({
      keyboard: this.keyboard
    });
    return ship;
  }
  
  createInitialArena() {
    this.arena = new Arena(this.ship);
    this.entityManager.setDefaultArena(this.arena);
  }
  
  addCameraEventListeners() { // Til hvers er þetta fall.
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