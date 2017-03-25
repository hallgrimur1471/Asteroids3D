/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class StageCube {

  // The width and height of the stage cube should be the same.
  static get SIZE() {
    return 10.0;
  }

  constructor(){
    this.vertices = [
      vec3( -StageCube.SIZE/2, -StageCube.SIZE/2,  StageCube.SIZE/2 ),
      vec3( -StageCube.SIZE/2,  StageCube.SIZE/2,  StageCube.SIZE/2 ),
      vec3(  StageCube.SIZE/2,  StageCube.SIZE/2,  StageCube.SIZE/2 ),
      vec3(  StageCube.SIZE/2, -StageCube.SIZE/2,  StageCube.SIZE/2 ),
      vec3( -StageCube.SIZE/2, -StageCube.SIZE/2, -StageCube.SIZE/2 ), 
      vec3( -StageCube.SIZE/2,  StageCube.SIZE/2, -StageCube.SIZE/2 ),
      vec3(  StageCube.SIZE/2,  StageCube.SIZE/2, -StageCube.SIZE/2 ),
      vec3(  StageCube.SIZE/2, -StageCube.SIZE/2, -StageCube.SIZE/2 )
    ];

    const v = this.vertices;
    this.lineVertices = [
      v[0], v[1], v[1], v[2], v[2], v[3], v[3], v[0],
      v[4], v[5], v[5], v[6], v[6], v[7], v[7], v[4],
      v[0], v[4], v[1], v[5], v[2], v[6], v[3], v[7]
    ];
    
    this.lineColor = vec4(0.0, 1.0, 0.0, 1.0);
    this.vBuffer;
    this.init();
  }
  
  init() {
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.lineVertices), gl.STATIC_DRAW );
  }

  render() {
    Utils.drawLines(this.vBuffer, this.lineColor, this.lineVertices.length);
  }
}