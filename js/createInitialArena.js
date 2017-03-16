'use strict';

function createInitialArena() {
  var ship = new Ship({
      keyUp: keyMap.SHIP_UP,
      keyDown: keyMap.SHIP_DOWN,
      keyLeft: keyMap.SHIP_LEFT,
      keyRight: keyMap.SHIP_RIGHT,
      keyShoot: keyMap.SHIP_SHOOT,
      commandObject: keys
  });

  // Initialize arena
  var arena = new Arena(ship);

  // Set the newly created arena as the default arena
  entityManager.setDefaultArena(arena);
}