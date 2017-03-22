'use strict';

/* global GameEngine, Asteroids, Keyboard, Utils, initUtils, Mouse */

window.onload = function(){
  main();
}

function main() {
  Utils.configureWebGL();
  initUtils();
  let stageCube = new StageCube();
  stageCube.render();
}