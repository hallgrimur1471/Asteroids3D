/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class StageCube {
  constructor(){
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
    this.vBuffer;
    this.init();
  }
  
  init() {
    this.vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.lineVertices), gl.STATIC_DRAW );
  }

  render() {
    // camera:
    var ctm = lookAt( vec3(0.0-0.2/2.0, 0.0, -3),
                      vec3(0.0, 0.0, -3+2.0),
                      vec3(0.0, 1.0, 0.0) );
    ctm = mult( ctm, mult( rotateX(0), rotateY(0) ) );
    gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(ctm));

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(Utils.proLoc, false, flatten(proj));

    debugger;

    Utils.drawLines(this.vBuffer, this.lineColor, this.lineVertices.length);
  }
}