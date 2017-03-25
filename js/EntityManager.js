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
    const arena = this.arenas['defaultArena'];

    this.handleColissions();

    this.forEachArena(arena => arena.update(du));
  }

  handleColissions() {
    //const arena = this.arenas['defaultArena'];
    //const boulders = this.arenas.getBoulders();
    //const bullets = arena.bullets;
  }

  setDefaultArena(arena) {
    this.arenas['defaultArena'] = arena;
  }

  getArena() {
    return this.arenas['defaultArena'];
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