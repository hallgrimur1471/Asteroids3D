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
  
  addMouseScrollListener(fun) { // Þetta er kálið. Ég er að fara af stað í Bæinn, skoða þetta í kv0ld
    // Núna er hægt í GameEngine að gera mouse.addMouseScrollListener(event=>{
    //   zDist += 1; 
    //})
    this.canvas.addEventListener("mousewheel", fun);
  }
  
  removeMouseScrollListener(fun) {
    this.canvas.removeEventListener("mousewheel", fun);
  }
  
//  addEventListeners() {
//    
//    const self = this;
//    this.canvas.addEventListener("mousedown", event => self.mouseDownHandler(event)); 
//    // gengur þetta? Afhverju er self parameter?. Annað, hver á að skilgreina event handlerana?
//    // t.d. ef við viljum láta skrollið zooma inn og út. Þá myndum við setja það upp í gameengine. Vegna þess að þar er
//    // myndavélin sett upp. Hvernig komum við þeirri virkni inn í mouse, Ætti ekki mouse að hafa public fall
//    // addMouseEventHandler(handler) ? sem game engine getur síðan notað.
//    // ættum eiginlega að henda þessu falli í ruslið.
//    
//    // jú það meikar sens
//  	this.canvas.addEventListener("mouseup", event => self.mouseUpHandler(event));
//  	this.canvas.addEventListener("mousemove", event => self.mouseMoveHandler(event));
//  	// ?etta virkar held 'eg'
//  	this.canvas.addEventListener("mousewheel", event => {
//      console.log('mouse wheel');
//      if (event.deltaY < 0) {
//        self.scrollPosition *= 1.0 + self.scrollSensitivity;
//      } else {
//        self.scrollPosition *= 1.0 - self.scrollSensitivity;
//      }
//      console.log('scaling view: ', self.scrollPosition);
//      mv = mult(mv, scalem(self.scrollPosition, self.scrollPosition, self.scrollPosition));
//
//  	});
//  	//canvas.addEventListener("mousewheel", event => self.mouseWheelHandler(event)); thetta virkar
//  }
  
//  mouseDownHandler(event) {
//    console.log('mouse down');
//    event.preventDefault();
//    // this.rotating = true;
//    // this.origX = event.offsetX;
//    // this.origY = event.offsetY;
//  }
//  
//  mouseUpHandler() {
//    console.log('mouse up');
//    // this.rotating = false;
//  }
//  
//  mouseMoveHandler(event) {
//    console.log('mouse move');
//    // if (this.rotating) {
//    //   this.spinY = (this.spinY + (event.offsetY - this.origY))%360;
//    //   this.spinX = (this.spinX + (event.offsetX - this.origX))%360;
//    //   this.origX = event.offsetX;
//    //   this.origY = event.offsetY;
//    // }
//  }
//  
//  mouseWheelHandler(event) {
//    console.log('mouse wheel');
//    if (event.deltaY < 0) {
//      this.scrollPosition *= 1.0 + this.scrollSensitivity; // það er vegna þess að þetta this er ekki Mouse instance.
//    } else {
//      this.scrollPosition *= 1.0 - this.scrollSensitivity;
//    }
//    console.log('scaling view: ', this.scrollPosition);
//    mv = mult(mv, scalem(this.scrollPosition, this.scrollPosition, this.scrollPosition)); // þetta er ekki góð leið t.þ.a. gera þetta heh eða kannski er þetta alltílagi.
//  }
}