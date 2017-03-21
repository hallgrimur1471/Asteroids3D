/* global WebGLUtils, flatten, mat4, initShaders */

let gl; // make gl global.
let mv = mat4();
const Utils = {
	mvStack: [],
	vPosition: undefined, // Address of the vPosition attribute
	vColor: undefined, // Address of the vColor attribute
	vTexCoord: undefined, // Address of the vColor attribute
	mvLoc: undefined, // Address of the mvLoc uniform
	proLoc: undefined, // Address of the proLoc uniform
	shaderProgram: undefined, // Address of the shader program
	textureHandle: undefined, // Address of the texture uniform
	usingTexture: undefined, // Address of the usingTexture uniform boolean
	draw: function(vBuffer, cBuffer, numPoints){
		gl.disableVertexAttribArray( Utils.vTexCoord );
		
		gl.uniform1i(Utils.usingTexture, 0);
		
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.vertexAttribPointer( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
		gl.vertexAttribPointer( Utils.vColor, 4, gl.FLOAT, false, 0, 0 );
		
		gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 0, numPoints );
		
		gl.enableVertexAttribArray( Utils.vTexCoord );
	},
	
	drawWithTexture: function(vBuffer, tBuffer, texture, numPoints){
			gl.disableVertexAttribArray( Utils.vColor );

			gl.uniform1i( Utils.usingTexture, 0);
			
			gl.bindTexture( gl.TEXTURE_2D, texture );
			gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
			gl.vertexAttribPointer( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );
			
			gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
			gl.vertexAttribPointer( Utils.vTexCoord, 2, gl.FLOAT, false, 0, 0 );
			
			gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(mv));
			gl.drawArrays( gl.TRIANGLES, 0, numPoints );
			
			
			gl.enableVertexAttribArray( Utils.vColor, 4, gl.FLOAT, false, 0, 0 );

	},
	configureWebGL: function(){
		const canvas = document.getElementById( "gl-canvas" );
		
		gl = WebGLUtils.setupWebGL( canvas );
		if ( !gl ) { alert( "WebGL isn't available" ); }

		gl.viewport( 0, 0, canvas.width, canvas.height );
		gl.clearColor( 0/256, 0/256, 0/256, 1.0 );
		
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		
		gl.enable(gl.DEPTH_TEST);
		
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
	},
	sind: function(deg){
		return Math.sin(deg*Math.PI/180);
	},
	cosd: function(deg){
		return Math.cos(deg*Math.PI/180);
	}
}

var initUtils = function(){
	// Load shaders
	Utils.shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( Utils.shaderProgram );
	
	// Configure attributes and uniforms
	Utils.vPosition = gl.getAttribLocation( Utils.shaderProgram, "vPosition" );
	gl.enableVertexAttribArray( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );
	
	Utils.vColor = gl.getAttribLocation( Utils.shaderProgram, "vColor" );
	gl.enableVertexAttribArray( Utils.vColor, 4, gl.FLOAT, false, 0, 0 );
	
	Utils.vTexCoord = gl.getAttribLocation( Utils.shaderProgram, "vTexCoord" );
	gl.enableVertexAttribArray( Utils.vTexCoord );
	
	Utils.usingTexture = gl.getUniformLocation( Utils.shaderProgram, "usingTexture" );
	Utils.proLoc = gl.getUniformLocation( Utils.shaderProgram, "projection" );
	Utils.mvLoc = gl.getUniformLocation( Utils.shaderProgram, "modelview" );
	
	Utils.textureHandle = gl.getUniformLocation(Utils.shaderProgram, 'texture');
	gl.uniform1i(Utils.textureHandle, 0);
	
}