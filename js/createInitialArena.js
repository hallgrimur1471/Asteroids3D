'use strict';

function createInitialArena() {
  var ship = new Ship({
      keyUp: keyCode('S'),
      keyDown: keyCode('W'),
      keyLeft: keyCode('A'),
      keyRight: keyCode('D'),
      keyShoot: keyCode(' '),
      commandObject: keys
  });

  // Initialize arena
  var arena = new Arena(ship);

  // Set the newly created arena as the default arena
  entityManager.setDefaultArena(arena);
}