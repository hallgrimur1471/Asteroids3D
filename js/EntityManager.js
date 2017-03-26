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
    const arena = this.arenas['defaultArena'];
    const boulders = arena.boulders;
    const bullets = arena.bullets;
    bullets.forEach(bullet => {
      boulders.forEach(boulder => {
        if (this.entitiesColliding(bullet, boulder)) {
          bullet.kill();
          boulder.kill();
        }
      });
    });
  }

  entitiesColliding(e1, e2) {
    const dSquared = Utils.distanceSquared(e1.position, e2.position);
    const combinedRadii = e1.radius + e2.radius;
    return dSquared < combinedRadii * combinedRadii;
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