'use strict';

class Bullet {
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
    this.bulletColor = vec4(1.0, 1.0, 0.0, 1.0);
    this.cube = new Cube(this.bulletColor);
  }

  update(du) {
    this.position = vec3(add(this.position, scale(du, this.velocity)));
  }

  render() {
    Utils.mvStack.push(mv);
    mv = mult(mv, translate(this.position));
    mv = mult(mv, rotateX(360 * Math.random()));
    mv = mult(mv, rotateY(360 * Math.random()));
    mv = mult(mv, rotateZ(360 * Math.random()));
    const bulletScale = 0.02;
    mv = mult(mv, scalem(bulletScale, bulletScale, bulletScale));
    this.cube.draw();
    //this.texturedCube.render(0, 0, 0, TexturedCube.TEXTURE_LETTER_Z);
    //console.log("rendering bullet ", bullet);
    mv=Utils.mvStack.pop();
  }
}