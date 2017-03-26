/* global WebGLUtils, flatten, mat4, initShaders */

let gl; // make gl global.
let mv = mat4();
const Utils = {
	mvStack: [],
	vPosition: undefined, // Address of the vPosition attribute
	vColor: undefined, // Address of the vColor attribute
	vTexCoord: undefined, // Address of the vColor attribute
	uniColor: undefined, // Address of the uniColor uniform
	mvLoc: undefined, // Address of the mvLoc uniform
	proLoc: undefined, // Address of the proLoc uniform
	shaderProgram: undefined, // Address of the shader program
	textureHandle: undefined, // Address of the texture uniform
	usingTexture: undefined, // Address of the usingTexture uniform boolean
	draw: function(vBuffer, color, numPoints) {
		gl.uniform1i( Utils.usingTexture, 0);
		gl.disableVertexAttribArray( Utils.vTexCoord );

		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.vertexAttribPointer( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );

		gl.uniform4fv( Utils.uniColor, color);
		
		gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 0, numPoints );
	},
	drawLines: function(lBuffer, lineColor, numPoints) {
		gl.uniform1i( Utils.usingTexture, 0);
		gl.disableVertexAttribArray( Utils.vTexCoord );

		gl.bindBuffer( gl.ARRAY_BUFFER, lBuffer );
		gl.vertexAttribPointer( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );

		gl.uniform4fv( Utils.uniColor, lineColor );

		gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(mv));
		gl.drawArrays( gl.LINES, 0, numPoints);
	},
	drawWithTexture: function(vBuffer, tBuffer, texture, numPoints) { 
		gl.disableVertexAttribArray( Utils.vColor );
		gl.enableVertexAttribArray( Utils.vTexCoord );
		//gl.enableVertexAttribArray( Utils.vColor );

		gl.uniform1i( Utils.usingTexture, 0);
		
		gl.bindTexture( gl.TEXTURE_2D, texture );
		gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
		gl.vertexAttribPointer( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );
		
		gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
		gl.vertexAttribPointer( Utils.vTexCoord, 2, gl.FLOAT, false, 0, 0 );
		
		gl.uniformMatrix4fv(Utils.mvLoc, false, flatten(mv));
		gl.drawArrays( gl.TRIANGLES, 0, numPoints );
		
		
		//gl.enableVertexAttribArray( Utils.vColor, 4, gl.FLOAT, false, 0, 0 );

	},
	configureWebGL: function() {
		const canvas = document.getElementById( "gl-canvas" );
		
		gl = WebGLUtils.setupWebGL( canvas );
		if ( !gl ) { alert( "WebGL isn't available" ); }

		gl.viewport( 0, 0, canvas.width, canvas.height );
		//gl.clearColor( 256/256, 256/256, 256/256, 1.0 );
		gl.clearColor( 0/256, 0/256, 0/256, 1.0 );
		
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		
		gl.enable(gl.DEPTH_TEST);
		
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
	},
	sind: function(deg) {
		return Math.sin(deg*Math.PI/180);
	},
	cosd: function(deg) {
		return Math.cos(deg*Math.PI/180);
	},
	sum: function(vector) {
		if (vector.length !== 3) {
			console.error(`Utils.power only supports vector of length 3`);
		}
		return vector[0]+vector[1]+vector[2];
	},
	power: function(vector, power) {
		if (vector.length !== 3) {
			console.error(`Utils.power only supports vector of length 3`);
		}
		const xp = Math.pow(vector[0], power);
		const yp = Math.pow(vector[1], power);
		const zp = Math.pow(vector[2], power);
		return vec3(xp, yp, zp);
	},
	distanceSquared: function(vector1, vector2) {
		return Utils.sum(Utils.power(subtract(vector1, vector2), 2));
	},
	maxElement: function(vector) {
		if (vector.length !== 3) {
			console.error(`Utils.abs only supports vector of length 3`);
		}
		return Math.max(vector[0], vector[1], vector[2]);
	},
	abs: function(vector) {
		if (vector.length !== 3) {
			console.error(`Utils.abs only supports vector of length 3`);
		}
		return vec3(Math.abs(vector[0]), Math.abs(vector[1]), Math.abs(vector[2]));
	},
	stageWrap: function(position) {
		let newPosition = position;
		const b = StageCube.SIZE/2; // position should not exceed this value
		for (var i = 0; i < 3; i++) {
			if (Math.abs(position[i])>b) {
				newPosition[i] = -0.9*position[i];
			}
		}
		return newPosition;
	},
}

var initUtils = function() {
	// Load shaders
	Utils.shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( Utils.shaderProgram );
	
	// Configure attributes
	Utils.vPosition = gl.getAttribLocation( Utils.shaderProgram, "vPosition" );
	gl.enableVertexAttribArray( Utils.vPosition, 3, gl.FLOAT, false, 0, 0 );
	Utils.vColor = gl.getAttribLocation( Utils.shaderProgram, "vColor" );
	gl.enableVertexAttribArray( Utils.vColor, 4, gl.Float, false, 0, 0 );
	Utils.vTexCoord = gl.getAttribLocation( Utils.shaderProgram, "vTexCoord" );
	gl.enableVertexAttribArray( Utils.vTexCoord );

	// Configure uniforms
	Utils.proLoc = gl.getUniformLocation( Utils.shaderProgram, "projection" );
	Utils.mvLoc = gl.getUniformLocation( Utils.shaderProgram, "modelview" );
	Utils.uniColor = gl.getUniformLocation( Utils.shaderProgram, "uniColor" );
	Utils.usingTexture = gl.getUniformLocation( Utils.shaderProgram, "usingTexture" );
	Utils.texture = gl.getUniformLocation( Utils.shaderProgram, "texture" );
}