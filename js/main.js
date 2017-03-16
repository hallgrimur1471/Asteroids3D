'use strict';

class GameEngine {
  constructor() {
    this.NOMINAL_UPDATE_INTERVAL = 16.666;
    this.frameTime_ms = null;
    this.frameTimeDelta_ms = null;
    this.gameState = 'playing'; // todo: initalize this to 'menu'
    this.isPaused = false;
  }

  init() {
    // todo: do some initialization here
    //entityManager.init();
    createInitialArena();

    this.requestNextIteration();
  }

  // Perform one iteration of the mainloop
  iterate(frameTime) {
    this.updateClocks(frameTime);

    // this is where the "real work" is done.
    this.iterationCore(this.frameTimeDelta_ms);

    // Diagnostics, such as showing current timer values etc.
    this.debugRender();

    this.requestNextIteration();
  }

  updateClocks(frameTime) {
    if (this.frameTime_ms === null) this.frameTime_ms = frameTime;

    this.frameTimeDelta_ms = frameTime - this.frameTime_ms;
    this.frameTime_ms = frameTime;
  }

  iterationCore(dt) {
    switch (this.gameState) {
      case 'menu':
        //...
        break;
      case 'playing':
        this.gatherInputs();
        this.update(dt);
        this.render();

        console.log(this.frameTime_ms);
        console.log(this.frameTimeDelta_ms);
        break;
      case 'winscreen':
        //...
        break;
    }
  }

  requestNextIteration() {
    window.requestAnimationFrame(iterFrame);
  }

  gatherInputs() {
    // Nothing to do here for now.
    // The event handlers do everything we need for now. 
  }

  update(dt) {
    if (shouldSkipUpdate()) return;

    // Warn about very large dt values, they may lead to error
    if (dt > 200) {
      console.log('big dt =', dt, ': CLAMPING TO NOMINAL');
      dt = NOMINAL_UPDATE_INTERVAL;
    }

    // If using variable time, divide the actual delta by the 'nominal' rate,
    // giving us a conveniently scaled 'du' to work with.
    var du = (dt / NOMINAL_UPDATE_INTERVAL);

    console.log('update simulation');
    //updateSimulation(du);
  }

  shouldSkipUpdate() {
    if (eatKey(keyMap.PAUSE)) {
      this.isPaused = !this.isPaused;
    }
    return this.isPaused && !eatKey(keyMap.STEP);
  }

  render() {

  }

  debugRender() {
    if (eatKey(keyMap.TOGGLE_DEBUG_RENDER)) {
      this._doDebugRender = !this._doDebugRender;
    }

    if (!this._doDebugRender) return;

    // todo: implement debug rendering, maybe render frameTime_ms
  }
}

// gameEngine and iterFrame need to be 'global', for the "window" APIs to callback to
let gameEngine;
function iterFrame(frameTime) {
  gameEngine.iterate(frameTime);
}

function main() {
  gameEngine = new GameEngine();
  gameEngine.init();
}

// Kick it off
main();