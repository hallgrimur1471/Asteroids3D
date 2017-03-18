'use strict';
class Keyboard {
  static get PAUSE(){ // Togglable pause mode
    return this.keyMap.PAUSE;
  }
  
  static get STEP(){ // Iterate one step in pause mode
    return this.keyMap.STEP;
  }
  
  static get TOGGLE_DEBUG_RENDER(){
    return this.keyMap.TOGGLE_DEBUG_RENDER;
  }
  
  static get SHIP_UP(){
    return this.keyMap.SHIP_UP;
  }
  
  static get SHIP_DOWN(){
    return this.keyMap.SHIP_DOWN;
  }
  
  static get SHIP_LEFT(){
    return this.keyMap.SHIP_LEFT;
  }
  
  static get SHIP_RIGHT(){
    return this.keyMap.SHIP_RIGHT;
  }
  
  static get SHIP_SHOOT(){
    return this.keyMap.SHIP_SHOOT;
  }
  
  constructor(){
    this.keyMap = {
      PAUSE: this.keyCode('P'), 
      STEP: this.keyCode('O'),
    
      TOGGLE_DEBUG_RENDER: this.keyCode('T'),
    
      SHIP_UP: this.keyCode('S'),
      SHIP_DOWN: this.keyCode('W'),
      SHIP_LEFT: this.keyCode('A'),
      SHIP_RIGHT: this.keyCode('D'),
      SHIP_SHOOT: this.keyCode(' '),
    };
    this.currentlyPressedKeys = [];  
    this.initListeners();
  }
  
  initListeners(){
    function handleKeydown(evt) {
      this.currentlyPressedKeys[evt.keyCode] = true;
    }
    
    function handleKeyup(evt) {
      this.currentlyPressedKeys[evt.keyCode] = false;
    }
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
  }
  
  get keys() {
    return this.currentlyPressedKeys;
  }
  
  eatKey(keyCode, commandObject){
    commandObject = commandObject || this.currentlyPressedKeys;
    var isDown = commandObject[keyCode];
    commandObject[keyCode] = false;
    return isDown;
  }
  
  keyCode(keyChar){
    return keyChar.charCodeAt(0);
  }
  
}