'use strict';

/* global GameEngine, Asteroids, Keyboard */

window.onload = function(){
  main();
}

function main() {
  Utils.configureWebGL();
  initUtils();
  
  const canvas = document.getElementById("gl-canvas");
  canvas.addEventListener("mousedown", EventHandlers.mouseDownHandler);
	canvas.addEventListener("mouseup", EventHandlers.mouseUpHandler);
	canvas.addEventListener("mousemove", EventHandlers.mouseMoveHandler);
	canvas.addEventListener("mousewheel", EventHandlers.mouseWheelHandler); 
  const keyboard = new Keyboard();
  const game = new Asteroids(keyboard);
  const gameEngine = new GameEngine(game, keyboard);
  gameEngine.startGame();
}