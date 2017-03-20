'use strict';

/* global GameEngine, Asteroids, Keyboard, Utils, initUtils, Mouse */

window.onload = function(){
  main();
}

function main() {
  Utils.configureWebGL();
  initUtils();
  const mouse = new Mouse();
  const keyboard = new Keyboard();
  const game = new Asteroids(keyboard, mouse);
  const gameEngine = new GameEngine(game, keyboard);
  gameEngine.startGame();
}