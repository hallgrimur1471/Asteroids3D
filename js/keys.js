'use strict';

// keyMap maps all keyboard commands to keys
var keyMap = {
  PAUSE: keyCode('P'), // Togglable pause mode
  STEP: keyCode('O'), // Iterate one step in pause mode

  TOGGLE_DEBUG_RENDER: keyCode('T'),

  SHIP_UP: keyCode('S'),
  SHIP_DOWN: keyCode('W'),
  SHIP_LEFT: keyCode('A'),
  SHIP_RIGHT: keyCode('D'),
  SHIP_SHOOT: keyCode(' '),
};

// keys is an array containing keys that have been pressed
var keys = [];

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
}

function handleKeyup(evt) {
  keys[evt.keyCode] = false;
}

function eatKey(keyCode, commandObject) {
  commandObject = commandObject || keys;
  var isDown = commandObject[keyCode];
  commandObject[keyCode] = false;
  return isDown;
}

function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

window.addEventListener('keydown', handleKeydown);
window.addEventListener('keyup', handleKeyup);