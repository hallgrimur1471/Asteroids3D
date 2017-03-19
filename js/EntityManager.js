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
    this.forEachArena(arena => arena.update(du));
  }

  setDefaultArena(arena) {
    this.arenas['defaultArena'] = arena;
  }
  
  render(ctx) {
    this.forEachArena(arena => arena.render(ctx));
  }
  
  forEachArena(cb){
    let self = this;
    Object.keys(this.arenas).forEach(function(arenaId) {
      const arena = self.arenas[arenaId];
      cb(arena);
    });
  }
}