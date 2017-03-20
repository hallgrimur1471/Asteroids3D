'use strict';
class Keyboard {
  static get PAUSE() { // Togglable pause mode
    return Keyboard.KEY_MAP.PAUSE;
  }
  
  static get STEP() { // Iterate one step in pause mode
    return Keyboard.KEY_MAP.STEP;
  }
  
  static get TOGGLE_DEBUG_RENDER() {
    return Keyboard.KEY_MAP.TOGGLE_DEBUG_RENDER;
  }
  
  static get SHIP_UP() {
    return Keyboard.KEY_MAP.SHIP_UP;
  }
  
  static get SHIP_DOWN() {
    return Keyboard.KEY_MAP.SHIP_DOWN;
  }
  
  static get SHIP_LEFT() {
    return Keyboard.KEY_MAP.SHIP_LEFT;
  }
  
  static get SHIP_RIGHT() {
    return Keyboard.KEY_MAP.SHIP_RIGHT;
  }
  
  static get SHIP_SHOOT() {
    return Keyboard.KEY_MAP.SHIP_SHOOT;
  }
  
  static get CHANGE_CAMERA() {
    return Keyboard.KEY_MAP.CHANGE_CAMERA;
  }
  
  static get SHIP_THRUST() {
    return Keyboard.KEY_MAP.SHIP_THRUST;
  }
  
  static get SHIP_BACK() {
    return Keyboard.KEY_MAP.SHIP_BACK;
  }
  
  static get KEY_MAP(){
    return {
      PAUSE: Keyboard.keyCode('P'), 
      STEP: Keyboard.keyCode('O'),
    
      TOGGLE_DEBUG_RENDER: Keyboard.keyCode('T'),
    
      SHIP_UP: Keyboard.keyCode('S'),
      SHIP_DOWN: Keyboard.keyCode('W'),
      SHIP_LEFT: Keyboard.keyCode('A'),
      SHIP_RIGHT: Keyboard.keyCode('D'),
      SHIP_SHOOT: Keyboard.keyCode(' '),
      SHIP_THRUST: Keyboard.keyCode('X'),
      SHIP_BACK: Keyboard.keyCode('Z'),
      
      CHANGE_CAMERA: Keyboard.keyCode('C'),
    };
  }
  
  constructor(){
    this.currentlyPressedKeys = [];
    this.initListeners();
  }
  
  initListeners(){
    const self = this;
    function handleKeydown(evt) {
      self.currentlyPressedKeys[evt.keyCode] = true;
    }
    
    function handleKeyup(evt) {
      self.currentlyPressedKeys[evt.keyCode] = false;
    }
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
  }
  
  isDown(keyCode) {
    return this.currentlyPressedKeys[keyCode];
  }
  
  eatKey(keyCode){
    const isDown = this.currentlyPressedKeys[keyCode];
    this.currentlyPressedKeys[keyCode] = false;
    return isDown;
  }
  
  static keyCode(keyChar){
    return keyChar.charCodeAt(0);
  }
  
}