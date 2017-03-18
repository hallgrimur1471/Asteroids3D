'use strict';

class Asteroids {
  constructor() {
    this.entityManager;
    this.arena;
  }
  
  init() {
    this.entityManager = new EntityManager();
    this.createInitialArena();
  }
  
  createInitialArena() {
    let ship = new Ship({
        keyUp: keyMap.SHIP_UP,
        keyDown: keyMap.SHIP_DOWN,
        keyLeft: keyMap.SHIP_LEFT,
        keyRight: keyMap.SHIP_RIGHT,
        keyShoot: keyMap.SHIP_SHOOT,
        commandObject: keys
    });
  
    // Initialize arena
    this.arena = new Arena(ship);
  
    // Set the newly created arena as the default arena
    this.entityManager.setDefaultArena(arena);
  }

  update(du) {
    console.log('updating simulation');
    processDiagnostics();
    entityManager.update(du);
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