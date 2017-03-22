'use strict';

/* global Utils, gl, mv, lookAt, mult, vec3, perspective, flatten */

class Camera {
  static get VIEW_COCKPIT(){
    return "cockpit_view";
  }
  static get VIEW_FOLLOWING(){
    return "following_view";
  }
  static get VIEW_STATIONARY(){
    return "stationary_view";
  }
  constructor(mouse) {
    this.mouse = mouse;
    
    this.fovy = 50;
    this.aspect = 1;
    this.near = 0.2;
    this.far = 100;
    
    this.zoom = -20;
    this.zoomSensitivity = 1;
    
    this.views = [Camera.VIEW_COCKPIT, Camera.VIEW_FOLLOWING, Camera.VIEW_STATIONARY];
  
    this.setView(Camera.VIEW_STATIONARY);
    
    const self = this;
    this.mouse.addMouseScrollListener(e => {
      if (e.wheelDelta < 0) {
        self.zoom -= self.zoomSensitivity;
      } else {
        self.zoom += self.zoomSensitivity;
      }
      console.log(`Zoom level set to ${this.zoom}`);
    });
    
  }
  
  setView(view){
    console.info(`View set to ${view}`);
    this.currentView = view;
    this.updateMouseListeners();
  }
  
  setEntityToFollow(entity){
    this.entityToFollow = entity;
  };
  
  configure() {
    switch (this.currentView) {
      case Camera.VIEW_COCKPIT:
        this.configureCockpitView();
        break;
      case Camera.VIEW_FOLLOWING:
        this.configureFollowingView();
        break;
      case Camera.VIEW_STATIONARY:
        this.configureStationaryView();
        break;
      default:
        console.error(`View: ${this.currentView} is not a defined view.`);
    }
  }
  configureCockpitView(){
    const entity = this.entityToFollow;
    if(entity === undefined){
      console.error("No entity to follow defined.");
    }
    //fovy, aspect, near, far
  	var proj = perspective( this.fovy, this.aspect, this.near, this.far );
  	gl.uniformMatrix4fv(Utils.proLoc, false, flatten(proj));
  	const eye = entity.position;
  	const at = add(eye, entity.getHeading());
  	const up = entity.up || vec3(0.0, 0.0, 1.0); // vesen
  	
  	mv = mult(mv, rotateZ(this.entityToFollow.yaw));
  	mv = mult(mv, rotateX(this.entityToFollow.pitch));
  	
  	mv = mult( mv, lookAt( eye, at, up ));
  	
  }
  
  configureFollowingView(){
  }
  
  configureStationaryView(){
    //fovy, aspect, near, far
    const eye =  vec3(0.0, 0.0, -1.6);
  	const at = vec3(0.0, 0.0, -1.0);
  	const up = vec3(0.0, 1.0, 0.0);
  	mv = mult( mv, lookAt( eye, at, up ));

    var proj = perspective( this.fovy, this.aspect, this.near, this.far );
    gl.uniformMatrix4fv(Utils.proLoc, false, flatten(proj));

  	//mv = mult( mv, rotate( parseFloat(EventHandlers.spinX), [1, 0, 0] ) );
  	//mv = mult( mv, rotate( parseFloat(EventHandlers.spinY), [0, 1, 0] ) );
  	//mv = mult( mv, translate(-3, -10, -3));
  }
  
  nextView() {
    const numberOfViews = this.views.length;
    const currentViewIndex = this.views.indexOf(this.currentView);
    
    const nextView = this.views[ (currentViewIndex+1)%numberOfViews ];
    this.setView(nextView);
  }
  
  zoom(event) {
    if (event.deltaY < 0) {
      this.zoom += this.zoomSensitivity;
    } else {
      this.zoom -= this.zoomSensitivity;
    }
    console.log(`Zoom level set to ${this.zoom}`);
  }
  
  updateMouseListeners() {
    switch (this.currentView) {
      case Camera.VIEW_COCKPIT:
        this.mouse.removeMouseScrollListener(this.zoom);
        break;
      case Camera.VIEW_FOLLOWING:
        this.mouse.removeMouseScrollListener(this.zoom);
        break;
      case Camera.VIEW_STATIONARY:
        this.mouse.addMouseScrollListener(this.zoom);
        break;
      default:
        console.error("cannot update camera mouse listeners because " +
                      this.currentView, "is not defined.");
    }
  }
}