'use strict';

var entityManager = {

  // 'PRIVATE' DATA
  _arenas: {},

  // PUBLIC DATA

  // A special return value, used by other objects
  // when they are supposed to die
  KILL_ME_NOW: -1,

  // 'PRIVATE' METHODS

  // PUBLIC METHODS
  setDefaultArena : function(arena) {
    this._arenas['defaultArena'] = arena;
  },

  update : function(du) {
    var self = this;
    Object.keys(this._arenas).forEach(function(arenaId) {
      self._arenas[arenaId].update(du);
    });
    // todo : also update UFO AIs?
  },
}