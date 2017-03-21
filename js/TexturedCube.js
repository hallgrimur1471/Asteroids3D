/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class TexturedCube {
  static get TEXTURE_LETTER_B(){
		return "texture-letter-b";
	}
	
	static get TEXTURE_LETTER_L(){
		return "texture-letter-l";
	}
	
  static get TEXTURE_LETTER_R(){
		return "texture-letter-r";
	}
	
  static get TEXTURE_LETTER_T(){
		return "texture-letter-t";
	}
	
  static get TEXTURE_LETTER_Z(){
		return "texture-letter-z";
	}
	
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
    
    this.points = [];
    this.texCoords = [];
    this.vBuffer;
    this.tBuffer;
    this.textureMap = [];
    this.init();
  }
  
  init() {
  	this.addQuadToVertices( 1, 0, 3, 2, this.points, this.texCoords);
    this.addQuadToVertices( 2, 3, 7, 6, this.points, this.texCoords);
    this.addQuadToVertices( 3, 0, 4, 7, this.points, this.texCoords);
    this.addQuadToVertices( 6, 5, 1, 2, this.points, this.texCoords);
    this.addQuadToVertices( 4, 5, 6, 7, this.points, this.texCoords);
    this.addQuadToVertices( 5, 4, 0, 1, this.points, this.texCoords);
    
    this.vBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );

    this.tBuffer = gl.createBuffer();
		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.texCoords), gl.STATIC_DRAW );

		const availableTextures = [
			TexturedCube.TEXTURE_LETTER_B,
			TexturedCube.TEXTURE_LETTER_L,
			TexturedCube.TEXTURE_LETTER_R,
			TexturedCube.TEXTURE_LETTER_T,
			TexturedCube.TEXTURE_LETTER_Z,
		];
		
		availableTextures.forEach(textureName => {
			const image = document.getElementById(textureName);
			this.configureTexture(image, textureName);
		});

  	//this.configureTexture(this.image[0], 0);
  	//this.configureTexture(this.image[1], 1);
  	//this.configureTexture(this.image[2], 2);
  	//this.configureTexture(this.image[3], 3);
  	//this.configureTexture(this.image[4], 4);
  	//this.configureTexture(this.image[5], 5);
  	//this.configureTexture(this.image[6], 6);
  	//this.configureTexture(this.image[7], 7);

  }

  addQuadToVertices(a, b, c, d, points, texcoords){
  	const texCo = [ vec2(0, 0), vec2(0, 1),  vec2(1, 1), vec2(1, 0) ];
  	
    const indices = [ a, b, c, a, c, d ];
    const texind  = [ 1, 0, 3, 1, 3, 2 ];

    for ( let i = 0; i < indices.length; ++i ) {
        points.push( this.vertices[indices[i]] );
        texcoords.push( texCo[texind[i]] );
    }
  }	

  configureTexture( image , textureName ) {
    this.textureMap[textureName] = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, this.textureMap[textureName] );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
	}

  render(x, y, z, textureName, scale){
		if (textureName === undefined) console.error("No texture specified for texture cube.");
		if (scale === undefined) scale = 1.0;
		
  	Utils.mvStack.push(mv);
  	
  	mv = mult(mv, translate(x,y,z));
  	mv = mult(mv, scale4(scale, scale, scale));
  	Utils.drawWithTexture(this.vBuffer, this.tBuffer, this.textureMap[textureName] , this.points.length);
  	
  	mv = Utils.mvStack.pop();
  }
}