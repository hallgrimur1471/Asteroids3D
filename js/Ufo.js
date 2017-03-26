'use strict';

class Ufo extends Entity {
  constructor(radius, position, entityToAttack, entityManager) {
    super("Ufo", position, radius);

    this.entityManager = entityManager;

    this.entityToAttack = entityToAttack;

    this.position = position;
    this.speed = 0.004; //0.002
    this.heading;
    this.velocity;
    this.updateHeading();

    this.yaw = 0;
    this.yawSpin = 31; // 187 is relative prime to 360

    this.cube = new TexturedCube(TexturedCube.UFO_TEXTURE);
    this.scale = 0.2;

    this.bulletLimit = 2; // How many bullets can exist in the air?
    this.bulletTimer = 0; // Time until we can shoot
    this.bulletTimerResetValue = 500; // Minimum time between shots
    this.bulletLimitOn = true; // Is the gun jammed?
    this.bulletSpeed = 2;
    this.bulletsInTheAir = 0;
  }

  move() {
    this.position = Utils.stageWrap(add(this.position, this.velocity));
  }

  update(du) {
    if (this._isDeadNow) {
      return EntityManager.KILL_ME_NOW;
    }

    this.bulletTimer -= du;
    if (this.bulletTimer <= 0) {
      this.bulletLimitOn = false;
    }
    this.shoot();

    this.yaw += this.yawSpin % 360;

    this.updateHeading();
    this.move();
  }

  shoot() {
    if(this.bulletLimitOn || this.getBulletsInTheAir() >= this.bulletLimit) {
      // dont add bullet, limit reached
    } else {
      const bullet = new Bullet(
        this.position,
        scale(this.bulletSpeed, this.velocity)
      );
      this.entityManager.getArena().addUfoBullet(bullet);

      this.bulletTimer = this.bulletTimerResetValue;
      this.bulletLimitOn = true;
    }
  }

  getBulletsInTheAir() {
    const arena = this.entityManager.getArena();
    return Math.floor(arena.ufoBullets.length/arena.ufos);
  }

  updateHeading() {
    this.heading = normalize(subtract(this.entityToAttack.position, this.position));
    this.velocity = scale(this.speed, this.heading);
  }

  render() {
    Utils.mvStack.push(mv);
    mv = mult(mv, translate(this.position));
    mv = mult(mv, rotate(this.yaw, [0.0, 1.0, 0.0]));
    mv = mult(mv, scalem(this.scale, 0.1*this.scale, this.scale));
    this.cube.render();
    mv = Utils.mvStack.pop();
  }
}