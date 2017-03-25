/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class Cube {
  constructor(){
  	this.image = [];
  	this.vertices = [
  		vec3( -0.5, -0.5,  0.5 ),
      vec3( -0.5,  0.5,  0.5 ),
      vec3(  0.5,  0.5,  0.5 ),
      vec3(  0.5, -0.5,  0.5 ),
      vec3( -0.5, -0.5, -0.5 ), 
      vec3( -0.5,  0.5, -0.5 ),
      vec3(  0.5,  0.5, -0.5 ),
      vec3(  0.5, -0.5, -0.5 )
    ];

    const v = this.vertices;
    this.lineVertices = [
      v[0], v[1], v[1], v[2], v[2], v[3], v[3], v[0],
      v[4], v[5], v[5], v[6], v[6], v[7], v[7], v[4],
      v[0], v[4], v[1], v[5], v[2], v[6], v[3], v[7]
    ];
    this.lineColor = vec4(0.0, 1.0, 0.0, 1.0);
    this.lBuffer;
    
    this.points = [];
    this.vBuffer;
    this.init();
  }
  
  init() {
  	this.quad( 1, 0, 3, 2, this.points);
    this.quad( 2, 3, 7, 6, this.points);
    this.quad( 3, 0, 4, 7, this.points);
    this.quad( 6, 5, 1, 2, this.points);
    this.quad( 4, 5, 6, 7, this.points);
    this.quad( 5, 4, 0, 1, this.points);

    this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );

    this.lBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.lBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.lineVertices), gl.STATIC_DRAW );
  }

  quad(a,b,c,d,myPoints){
    const indices = [ a, b, c, a, c, d ];
    for ( let i = 0; i < indices.length; ++i ) {
      myPoints.push( this.vertices[indices[i]] );
    }
  }

	draw() {
    Utils.mvStack.push(mv);
    mv = mult(mv, scalem(2.0, 2.0, 2.0))
		Utils.draw(this.vBuffer, vec4(0.0, 0.999, 1.0, 1.0), this.points.length);
    Utils.drawLines(this.lBuffer, vec4(1.0, 0.0, 0.0, 1.0), this.lineVertices.length);
    Utils.mvStack.pop(mv);
	}
}