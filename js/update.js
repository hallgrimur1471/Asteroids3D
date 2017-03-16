'use strict';

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
var NOMINAL_UPDATE_INTERVAL = 16.666;
var g_isUpdatePaused = false;

function update(dt) {
  if (shouldSkipUpdate()) return;

  // Warn about very large dt values, they may lead to error
  if (dt > 200) {
    console.log('big dt =', dt, ': CLAMPING TO NOMINAL');
    dt = NOMINAL_UPDATE_INTERVAL;
  }

  // If using variable time, divide the actual delta by the 'nominal' rate,
  // giving us a conveniently scaled 'du' to work with.
  var du = (dt / NOMINAL_UPDATE_INTERVAL);

  updateSimulation(du);
}

function shouldSkipUpdate() {
  if (eatKey(keyMap.PAUSE)) {
    g_isUpdatePaused = !g_isUpdatePaused;
  }
  return g_isUpdatePaused && !eatKey(keyMap.STEP);
}