/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class StageCube {

  // The width and height of the stage cube should be the same.
  static get SIZE() {
    return 10.0;
  }

  static get TEXTURE() {
    return "texture-space";
  }

  constructor(){
    this.vBuffer;
    this.vPoints = [];
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

    this.lBuffer;
    const v = this.vertices;
    this.lPoints = [
      v[0], v[1], v[1], v[2], v[2], v[3], v[3], v[0],
      v[4], v[5], v[5], v[6], v[6], v[7], v[7], v[4],
      v[0], v[4], v[1], v[5], v[2], v[6], v[3], v[7]
    ];
    this.lineColor = vec4(0.0, 1.0, 0.0, 1.0);
    
    this.tBuffer;
    this.tPoints = [];
    this.texture;

    this.init();
  }
  
  init() {
    this.addQuadToVPoints(1, 0, 3, 2);
    this.addQuadToVPoints(2, 3, 7, 6);
    this.addQuadToVPoints(3, 0, 4, 7);
    this.addQuadToVPoints(6, 5, 1, 2);
    this.addQuadToVPoints(4, 5, 6, 7);
    this.addQuadToVPoints(5, 4, 0, 1);

    this.vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.vPoints), gl.STATIC_DRAW );

    this.lBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.lBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.lPoints), gl.STATIC_DRAW );

    this.tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.tPoints), gl.STATIC_DRAW );

    this.configureTexture();
  }

  addQuadToVPoints(a, b, c, d) {
    const texCoordinate = [ vec2(0, 0), vec2(0, 1),  vec2(1, 1), vec2(1, 0) ];
    
    const indices = [ a, b, c, a, c, d ];
    const texind  = [ 1, 0, 3, 1, 3, 2 ];

    for ( let i = 0; i < indices.length; ++i ) {
      this.vPoints.push( this.vertices[indices[i]] );
      this.tPoints.push( texCoordinate[texind[i]] );
    }
  }

  configureTexture() {
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const image = document.getElementById(StageCube.TEXTURE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.Texture_2D, null);
  }

  render() {
    Utils.mvStack.push(mv);
    mv = mult(mv, scalem(-1.0, -1.0, -1.0));
    Utils.drawWithTexture(this.vBuffer, this.tBuffer, this.texture, this.vPoints.length);
    mv = Utils.mvStack.pop();
    Utils.drawLines(this.lBuffer, this.lineColor, this.lPoints.length);
  }
}