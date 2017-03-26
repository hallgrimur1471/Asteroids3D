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

    this.killDistantBullets();
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

    const ship = arena.ship;
    boulders.forEach(boulder => {
      if (this.entitiesColliding(ship, boulder)) {
        ship.kill();
      }
    });
  }

  entitiesColliding(e1, e2) {
    //move colliding sphere a little bit forward if it's a ship
    //let e1Position = e1.position;
    //if (e1.name === "Ship") {
    //  console.log('SHIP!');
    //  e1Position = add(e1.position, scale(0.25, e1.headingVector));
    //}

    const dSquared = Utils.distanceSquared(e1.position, e2.position);
    const combinedRadii = e1.radius + e2.radius;
    return dSquared < combinedRadii * combinedRadii;
  }

  killDistantBullets() {
    const arena = this.arenas['defaultArena'];
    const bullets = arena.bullets;
    bullets.forEach(bullet => {
      if (Utils.maxElement(Utils.abs(bullet.position)) > StageCube.SIZE) {
        console.info('killing distant bullet');
        bullet.kill();
      }
    });
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