'use strict';

var main = {
  _frameTime_ms : null,
  _frameTimeDelta_ms : null,
  gameState : 'playing', // todo: initalize this to 'menu'
  _doDebugRender : false,
}

// Perform one iteration of the mainloop
main.iter = function(frameTime) {
  this._updateClocks(frameTime);

  // this is where the "real work" is done.
  this._iterCore(this._frameTimeDelta_ms);

  // Diagnostics, such as showing current timer values etc.
  this._debugRender();

  this._requestNextIteration();
}

main._updateClocks = function(frameTime) {

  if (this._frameTime_ms === null) this._frameTime_ms = frameTime;

  this._frameTimeDelta_ms = frameTime - this._frameTime_ms;
  this._frameTime_ms = frameTime;
}

main._iterCore = function(dt) {
  switch (main.gameState) {
    case 'menu':
      //...
      break;
    case 'playing':
      // todo: make the following functions:
      //gatherInputs();
      update(dt);
      //render();
      console.log(this._frameTime_ms);
      console.log(this._frameTimeDelta_ms);
      break;
    case 'winscreen':
      //...
      break;
  }
}

// This needs to be a "global" function, for the "window" APIs to callback to
function mainIterFrame(frameTime) {
  main.iter(frameTime);
}

main._requestNextIteration = function() {
  window.requestAnimationFrame(mainIterFrame)
}

main._debugRender = function() {
  if (eatKey(keyMap.TOGGLE_DEBUG_RENDER)) this._doDebugRender = !this._doDebugRender;

  if (!this._doDebugRender) return;

  // todo: implement debug rendering, maybe render frameTime_ms
}

main.init = function() {
  // todo: do some initialization here
  //entityManager.init();
  createInitialArena();

  this._requestNextIteration();
}