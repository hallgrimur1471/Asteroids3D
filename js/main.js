'use strict';

/* global GameEngine, Asteroids, Keyboard */

window.onload = function(){
  main();
}

function main() {
  Utils.configureWebGL();
  initUtils();
  
  const keyboard = new Keyboard();
  const game = new Asteroids(keyboard);
  const gameEngine = new GameEngine(game, keyboard);
  gameEngine.startGame();
}