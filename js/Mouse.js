'use strict';
class Mouse {
  constructor() {
    this.canvas = document.getElementById("gl-canvas");
    
    this.rotating = false; // Are we currently rotating the view?
    this.spinY = 0.0;
    this.spinX = 0.0;
    this.origX;
    this.origY;
    this.scrollPosition = 1.0;
    this.scrollSensitivity = 0.1;
    
    //this.addEventListeners();
  }
  
  addMouseScrollListener(handler) {
    return this.canvas.addEventListener("mousewheel", handler);
  }
  
  removeMouseScrollListener(handler) {
    this.canvas.removeEventListener("mousewheel", handler);
  }
  
  addMouseMoveListener(handler) {
    return this.canvas.addEventListener("mousemove", handler);
  }
  
  addMouseDownListener(handler) {
    return this.canvas.addEventListener("mousedown", handler);
  }
  
  addMouseUpListener(handler) {
    return this.canvas.addEventListener("mouseup", handler);
  }
}