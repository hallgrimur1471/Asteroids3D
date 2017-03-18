'use strict';

/* global GameEngine, Asteroids, Keyboard */

function main() {
  const keyboard = new Keyboard();
  const game = new Asteroids(keyboard);
  const gameEngine = new GameEngine(game, keyboard);
  gameEngine.startGame();
}

// Kick it off
main();