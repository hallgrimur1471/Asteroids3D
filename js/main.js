'use strict';

/* global GameEngine, Asteroids */

function main() {
  const game = new Asteroids();
  const gameEngine = new GameEngine(game);
  gameEngine.startGame();
}

// Kick it off
main();