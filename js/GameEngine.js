'use strict';

//var fovy = 50
//var aspect = 1
//var near = 0.2
//var far = 100
/* global Keyboard, Utils, Camera, gl, mv */

class GameEngine {
  constructor(game, keyboard) {
    if(game === undefined) {
      console.error("game is not defined");
    }
    if(keyboard === undefined) {
      console.error("keyboard is not defined");
    }

    this.keyboard = keyboard;
    this.game = game;
    
    this.frameTime_ms = null;
    this.frameTimeDelta_ms = null;
    this.gameState = 'playing'; // TODO: initalize this to 'menu'
    this.isPaused = false;
  }
  
  static get NOMINAL_UPDATE_INTERVAL() {
    return 16.666; // 1000ms / 60fps
  }

  startGame() {
    this.requestNextIteration();
  }

  // Perform one iteration of the mainloop and request another one
  iterate(frameTime) {
    this.updateClocks(frameTime);

    // this is where the "real work" is done.
    this.iterationCore(this.frameTimeDelta_ms);

    // Diagnostics, such as showing current timer values etc.
    this.debugRender();

    this.requestNextIteration();
  }

  // update the time and time delta values
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
        // console.log("time: ", this.frameTime_ms, "delta: ", this.frameTimeDelta_ms);
        this.gatherInputs();
        this.update(dt);
        this.render();
        break;
      case 'winscreen':
        //...
        break;
    }
  }

  gatherInputs() {
    // Nothing to do here for now.
    // The Keyboard class has does everything we need for now. 
  }

  update(dt) {
    if (this.shouldSkipUpdate()) {
      return;
    }
    this.processDiagnostics();

    // Warn about very large dt values, they may lead to error
    if (dt > 200) {
      console.log('big dt =', dt, ': CLAMPING TO NOMINAL');
      dt = GameEngine.NOMINAL_UPDATE_INTERVAL;
    }

    // If using variable time, divide the actual delta by the 'nominal' rate,
    // giving us a conveniently scaled 'du' to work with.
    const du = (dt / GameEngine.NOMINAL_UPDATE_INTERVAL);

    this.game.update(du);
  }

  shouldSkipUpdate() {
    if (this.keyboard.eatKey(Keyboard.KEY_MAP.PAUSE)) {
      this.isPaused = !this.isPaused;
      if (!this.isPaused && this.game.arena.ship.livesLeft > 0 && this.game.arena.ship.isDead()) {
        this.game.arena.reset();
        this.game.camera.zoom = -5;
      }
    }
    if (this.game.arena.ship.livesLeft <= 0) {
      return true;
    }
    else if(this.game.arena.boulders.length + this.game.arena.ufos.length === 0) {
      const livesLeftText = document.getElementById("livesLeftText");
      livesLeftText.textContent = `Congratsulations! You have won the game.`;
      const bouldersLeftText = document.getElementById("bouldersLeftText");
      bouldersLeftText.textContent = `https://youtu.be/WNmCm4oyrkY`;
      return true;
    }
    else {
      return this.isPaused && !this.keyboard.eatKey(Keyboard.KEY_MAP.STEP);
    }
  }
  
  processDiagnostics() {
    // here one can react to diagnostics keypresses
    // or toggle the audio
  }
  
  clearScreen(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); 
  }

  render() {
    this.clearScreen();
    
		Utils.mvStack.push(mv);
		
		this.game.render();
		
		mv = Utils.mvStack.pop();
  }

  debugRender() {
    if (this.keyboard.eatKey(Keyboard.KEY_MAP.TOGGLE_DEBUG_RENDER)) {
      this._doDebugRender = !this._doDebugRender;
    }

    if (!this._doDebugRender) return;

    // todo: implement debug rendering, maybe render frameTime_ms
  }

  requestNextIteration() {
    const self = this;
    window.requestAnimationFrame(time => {
      self.iterFrame(time);
    });
  }
  
  iterFrame(frameTime) {
    this.iterate(frameTime);
  }
}