'use strict';

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