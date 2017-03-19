'use strict';

/* global Utils, gl, mv */

class Camera {
  constructor(mouse) {
    this.mouse = mouse;
    
    this.fovy = 50;
    this.aspect = 1;
    this.near = 0.2;
    this.far = 100;
    
    this.zoom = 30;
    this.zoomSensitivity = 5;
    
    this.views = ["cockpit", "following", "stationary"];
    this.currentView = this.views[2];
    this.updateMouseListeners();
  }
  
  configure() {
    switch (this.currentView) {
      case this.views[0]:
        //...
        break;
      case this.views[1]:
        //...
        break;
      case this.views[2]:
        //fovy, aspect, near, far
      	var proj = perspective( this.fovy, this.aspect, this.near, this.far );
      	gl.uniformMatrix4fv(Utils.proLoc, false, flatten(proj));
      	const eye = vec3(1.0, 0.0, this.zoom); // h'er er 30 fasti sem m;tti vera breyta t.d. this.zDist henni m'a svo breya t./.a. skrolla.
      	const at = vec3(0.0, 0.0, 0.0);
      	const up = vec3(0.0, 1.0, 0.0);
      	mv = mult( mv, lookAt( eye, at, up ));
      	//mv = mult( mv, rotate( parseFloat(EventHandlers.spinX), [1, 0, 0] ) );
      	//mv = mult( mv, rotate( parseFloat(EventHandlers.spinY), [0, 1, 0] ) );
      	//mv = mult( mv, translate(-3, -10, -3));
        break;
      default:
        console.error(this.currentView, "is not a defined view");
    }
  }
  
  nextView() {
    const numberOfViews = this.views.length;
    const currentViewIndex = this.views.indexOf(this.currentView);
    
    const nextView = this.views[ (currentViewIndex+1)%numberOfViews ];
    this.currentView = nextView;
    
    this.updateMouseListeners();
  }
  
  zoom(event) {
    console.log('zooming camera');
    if (event.deltaY < 0) {
      this.zoom += this.zoomSensitivity;
    } else {
      this.zoom -= this.zoomSensitivity;
    }
  }
  
  updateMouseListeners() {
    switch (this.currentView) {
      case this.views[0]:
        this.mouse.removeMouseScrollListener(this.zoom);
        break;
      case this.views[1]:
        this.mouse.removeMouseScrollListener(this.zoom);
        break;
      case this.views[2]:
        this.mouse.addMouseScrollListener(this.zoom);
        break;
      default:
        console.error("cannot update camera mouse listeners because " +
                      this.currentView, "is not defined.");
    }
  }
}