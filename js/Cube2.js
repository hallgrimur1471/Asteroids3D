/* global vec3, vec2, gl, flatten, Utils, mv, mult, scale4, translate */

class Cube2 {
  constructor(){
  	this.image = [];
  	this.vertices = [
  		vec3( -0.5, -0.2,  0.5 ),
      vec3( -0.5,  0.2,  0.5 ),
      vec3(  0.5,  0.2,  0.5 ),
      vec3(  0.5, -0.2,  0.5 ),
      vec3( -0.05, -0.05, -0.5 ), 
      vec3( -0.05,  0.05, -0.5 ),
      vec3(  0.05,  0.05, -0.5 ),
      vec3(  0.05, -0.05, -0.5 )
    ];
    
    this.points = [];
    this.texCoords = [];
    this.vBuffer;
    this.tBuffer;
    this.cubeTexture = [];
    this.init();
  }
  
  init() {
    	this.quad( 1, 0, 3, 2, this.points,this.texCoords );
	    this.quad( 2, 3, 7, 6, this.points,this.texCoords );
	    this.quad( 3, 0, 4, 7, this.points,this.texCoords );
	    this.quad( 6, 5, 1, 2, this.points,this.texCoords );
	    this.quad( 4, 5, 6, 7, this.points,this.texCoords );
	    this.quad( 5, 4, 0, 1, this.points,this.texCoords );
	    
	    this.vBuffer = gl.createBuffer();
  		gl.bindBuffer( gl.ARRAY_BUFFER, this.vBuffer );
  		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );

	    this.tBuffer = gl.createBuffer();
  		gl.bindBuffer( gl.ARRAY_BUFFER, this.tBuffer );
  		gl.bufferData( gl.ARRAY_BUFFER, flatten(this.texCoords), gl.STATIC_DRAW );


  		//this.cubeTexture.push([]);
  		//this.image.push([]);
  
  		this.image[0] = document.getElementById("cubeImage0");
  		this.image[1] = document.getElementById("cubeImage1");
  		//this.image[2] = document.getElementById("cubeImage2");
  		//this.image[3] = document.getElementById("cubeImage3");  
  		//this.image[4] = document.getElementById("cubeImage4");  
  		//this.image[5] = document.getElementById("cubeImage5");  
  		//this.image[6] = document.getElementById("cubeImage6");  
  		//this.image[7] = document.getElementById("cubeImage7");  

    	this.configureTexture(this.image[0], 0);
    	this.configureTexture(this.image[1], 1);
    	//this.configureTexture(this.image[2], 2);
    	//this.configureTexture(this.image[3], 3);
    	//this.configureTexture(this.image[4], 4);
    	//this.configureTexture(this.image[5], 5);
    	//this.configureTexture(this.image[6], 6);
    	//this.configureTexture(this.image[7], 7);

    }

    quad(a,b,c,d,mypoints,mytexcoords){
    	const texCo = [
	        vec2(0, 0),
	        vec2(0, 1),
	        vec2(1, 1),
	        vec2(1, 0)
	    ];

	    const indices = [ a, b, c, a, c, d ];
	    const texind  = [ 1, 0, 3, 1, 3, 2 ];

	    for ( let i = 0; i < indices.length; ++i ) {
	        mypoints.push( this.vertices[indices[i]] );
	        mytexcoords.push( texCo[texind[i]] );
	    }
    }	

    configureTexture( image , number  ) {
	    this.cubeTexture[number] = gl.createTexture();
	    gl.bindTexture( gl.TEXTURE_2D, this.cubeTexture[number] );
	    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image );
	    gl.generateMipmap( gl.TEXTURE_2D );
	    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
	    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
		}

//    draw(x,y,z,number,scale){
//			if (number === undefined) number = 0;
//			if (scale === undefined) scale = 1.0;
//			
//    	Utils.mvStack.push(mv);
//			
//    	//const STAGE_WIDTH = 6;
//    	//const STAGE_HEIGHT = 20;
//    	//const STAGE_DEPTH = 6;
//			//x = x*6/STAGE_WIDTH;
//			//y = y*20/STAGE_HEIGHT;
//			//z = z*6/STAGE_DEPTH;
//    	mv = mult(mv, translate(x,y,z));
//    	// mv = mult(mv, scale4(6/STAGE_WIDTH, 20/STAGE_HEIGHT, 6/STAGE_DEPTH));
//    	mv = mult(mv, scale4(scale, scale, scale));
//    	mv = mult(mv, translate(-0.5,-0.5,-0.5));
//    	//mv = mult(mv, rotate(Math.PI/6, [1, 0, 0]));
//    	//mv = mult(mv, rotate(Math.PI/6, [0, 1, 0]));
//    	Utils.draw(this.vBuffer, this.tBuffer, this.cubeTexture[number] , this.points.length);
//    	mv = Utils.mvStack.pop();
//    }
    
    draw(number) {
    	if (number === undefined) number = 0;
    	Utils.draw(this.vBuffer, this.tBuffer, this.cubeTexture[number] , this.points.length);
    }
}