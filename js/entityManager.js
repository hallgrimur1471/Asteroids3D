'use strict';

var entityManager = {

  // 'PRIVATE' DATA
  _arenas: {},

  // 'PRIVATE' METHODS

  // PUBLIC METHODS
  setDefaultArena : function(arena) {
    this._arenas['defaultArena'] = arena;
  }
}