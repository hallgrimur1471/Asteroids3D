'use strict';

class Simulation {
  constructor() {

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