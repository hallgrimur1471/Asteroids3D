'use strict';

class EntityManager {
  
  // A special return value, used by other objects
  // when they are supposed to die
  static get KILL_ME_NOW(){
    return -1;
  }
  
  constructor() {
    this.arenas = {};
  }

  update(du) {
    let self = this;
    Object.keys(this.arenas).forEach(function(arenaId) {
      self._arenas[arenaId].update(du);
    });
    // todo: also update UFO AIs?
  }

  setDefaultArena(arena) {
    this.arenas['defaultArena'] = arena;
  }
}

//var entityManager = {
//
//  // 'PRIVATE' DATA
//  _arenas: {},
//
//  // PUBLIC DATA
//
//  // A special return value, used by other objects
//  // when they are supposed to die
//  KILL_ME_NOW: -1,
//
//  // 'PRIVATE' METHODS
//
//  // PUBLIC METHODS
//  setDefaultArena : function(arena) {
//    this._arenas['defaultArena'] = arena;
//  },
//
//  update : function(du) {
//    var self = this;
//    Object.keys(this._arenas).forEach(function(arenaId) {
//      self._arenas[arenaId].update(du);
//    });
//    // todo : also update UFO AIs?
//  },
//}