import * as ms from '@magenta/sketch';
import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';
function sketch(p5) {
  const BASE_URL = 'https://storage.googleapis.com/quickdraw-models/sketchRNN/models/';
  const availableModels = ['bird', 'ant','ambulance','angel','alarm_clock','antyoga','backpack','barn','basket','bear','bee','beeflower','bicycle','book','brain','bridge','bulldozer','bus','butterfly','cactus','calendar','castle','cat','catbus','catpig','chair','couch','crab','crabchair','crabrabbitfacepig','cruise_ship','diving_board','dog','dogbunny','dolphin','duck','elephant','elephantpig','everything','eye','face','fan','fire_hydrant','firetruck','flamingo','flower','floweryoga','frog','frogsofa','garden','hand','hedgeberry','hedgehog','helicopter','kangaroo','key','lantern','lighthouse','lion','lionsheep','lobster','map','mermaid','monapassport','monkey','mosquito','octopus','owl','paintbrush','palm_tree','parrot','passport','peas','penguin','pig','pigsheep','pineapple','pool','postcard','power_outlet','rabbit','rabbitturtle','radio','radioface','rain','rhinoceros','rifle','roller_coaster','sandwich','scorpion','sea_turtle','sheep','skull','snail','snowflake','speedboat','spider','squirrel','steak','stove','strawberry','swan','swing_set','the_mona_lisa','tiger','toothbrush','toothpaste','tractor','trombone','truck','whale','windmill','yoga','yogabicycle'];
  let model;
  
  // Model
  let modelState; 
  const temperature = 0.1; // Very low so that we draw very well.
  let modelLoaded = false;
  let modelIsActive = false;
  
  // Model pen state.
  let dx, dy; 
  let x, y; 
  let startX, startY;  // Keep track of the first point of the last raw line.
  let pen = [0,0,0]; // Model pen state, [pen_down, pen_up, pen_end].
  let previousPen = [1, 0, 0]; // Previous model pen state.
  const PEN = {DOWN: 0, UP: 1, END: 2};
  const epsilon = 2.0; // to ignore data from user's pen staying in one spot.
  
  // Human drawing.
  let currentRawLine = [];
  let userPen = 0; // above = 0 or below = 1 the paper.
  let previousUserPen = 0;
  let currentColor = 'black';
  
  // Keep track of everyone's last attempts to that we can reverse them.
  let lastHumanStroke;  // encode the human's drawing as a sequence of [dx, dy, penState] strokes
  let lastHumanDrawing; // the actual sequence of lines that the human drew, so we can replay them.
  let lastModelDrawing = []; // the actual sequence of lines that the model drew, so that we can erase them.
  
  // Don't record mouse events when the splash is open.
  let splashIsOpen = true;
  let strokes = [];
  
  /*
   * Main p5 code
   */
  p5.setup = () => {
    // Initialize the canvas.
    const containerSize = document.getElementById('sketch').getBoundingClientRect();
    const screenWidth = Math.floor(containerSize.width);
    const screenHeight = Math.floor(containerSize.height);
    const canvasId = document.getElementById('defaultCanvas0');
    p5.createCanvas(screenWidth, screenHeight);
    p5.frameRate(60);
    restart();
    initModel(0);
    btnRetry.addEventListener('click', retryMagic);
    btnClear.addEventListener('click', restart);
    selectModels.addEventListener('change', () => initModel(selectModels.selectedIndex));
    /*
    btnSave.addEventListener('click', () => {
      p5.toDataUrl('magic-sketchpad', 'jpg');
    });
    */
    splashIsOpen = false;
  };
  
  function restart() {
    p5.background(255, 255, 255, 255);
    p5.strokeWeight(3.0);

    // Start drawing in the middle-ish of the screen
    startX = x = p5.width / 2.0;
    startY = y = p5.height / 3.0;

    // Reset the user drawing state.
    userPen = 1;
    previousUserPen = 0;
    currentRawLine = [];
    strokes = [];

    // Reset the model drawing state.
    modelIsActive = false;
    previousPen = [0, 1, 0];
  };
  /*
  * Human is drawing.
  */
  p5.mousePressed = function () {
    if (!splashIsOpen && p5.isInBounds()) {
      x = startX = p5.mouseX;
      y = startY = p5.mouseY;
      userPen = 1; // down!

      modelIsActive = false;
      currentRawLine = [];
      lastHumanDrawing = [];
      previousUserPen = userPen;
      p5.stroke(currentColor);
    }
  }

  p5.mouseReleased = function () {
    if (!splashIsOpen && p5.isInBounds()) {
      userPen = 0;  // Up!
      const currentRawLineSimplified = model.simplifyLine(currentRawLine);

      // If it's an accident...ignore it.
      if (currentRawLineSimplified.length > 1) {
        // Encode this line as a stroke, and feed it to the model.
        lastHumanStroke = model.lineToStroke(currentRawLineSimplified, [startX, startY]);
        encodeStrokes(lastHumanStroke);
      }
      currentRawLine = [];
      previousUserPen = userPen;
    }
  }

  p5.mouseDragged = function () {
    if (!splashIsOpen && !modelIsActive && p5.isInBounds()) {
      const dx0 = p5.mouseX - x; 
      const dy0 = p5.mouseY - y;
      if (dx0*dx0+dy0*dy0 > epsilon*epsilon) { // Only if pen is not in same area.
        dx = dx0;
        dy = dy0;
        userPen = 1;
        if (previousUserPen == 1) {
          p5.line(x, y, x+dx, y+dy); // draw line connecting prev point to current point.
          lastHumanDrawing.push([x, y, x+dx, y+dy]);
        }
        x += dx;
        y += dy;
        currentRawLine.push([x, y]);
      }
      previousUserPen = userPen;
    }
    return false;
  }

 /*
  * Model is drawing.
  */
  p5.draw = function() {
    if (!modelLoaded || !modelIsActive) {
      return;
    }
    
    // New state.
    pen = previousPen;
    modelState = model.update([dx, dy, ...pen], modelState);
    const pdf = model.getPDF(modelState, temperature);
    [dx, dy, ...pen] = model.sample(pdf);

    // If we finished the previous drawing, start a new one.
    if (pen[PEN.END] === 1) {
      console.log('finished this one');
      modelIsActive = false;
    } else {
      // Only draw on the paper if the pen is still touching the paper.
      if (previousPen[PEN.DOWN] === 1) {
        p5.line(x, y, x+dx, y+dy);
        lastModelDrawing.push([x, y, x+dx, y+dy]);
      }
      // Update.
      x += dx;
      y += dy;
      previousPen = pen;
    }
  };

  p5.isInBounds = function () {
    return p5.mouseX >= 0 && p5.mouseY >= 0 && p5.mouseX < p5.width && p5.mouseY < p5.height;
  }
  
  /*
  * Helpers.
  */
  function retryMagic() {
    p5.stroke('white');
    p5.strokeWeight(6);
    
    // Undo the previous line the model drew.
    for (let i = 0; i < lastModelDrawing.length; i++) {
      p5.line(...lastModelDrawing[i]);
    }
    
    // Undo the previous human drawn.
    for (let i = 0; i < lastHumanDrawing.length; i++) {
      p5.line(...lastHumanDrawing[i]);
    }
    
    p5.strokeWeight(3.0);
    p5.stroke(currentColor);
    
    // Redraw the human drawing.
    for (let i = 0; i < lastHumanDrawing.length; i++) {
      p5.line(...lastHumanDrawing[i]);
    }
    
    // Start again.
    encodeStrokes(lastHumanStroke);
  }
  

  function initModel(index) {
    restart();
    modelLoaded = false;
    
    if (model) {
      model.dispose();
    }
    
    model = new ms.SketchRNN(`${BASE_URL}${availableModels[index]}.gen.json`);
    model.initialize().then(() => {
      modelLoaded = true;
      model.setPixelFactor(5.0);  // Bigger -> large outputs
    });
  };

  function encodeStrokes(sequence) {
    if (sequence.length <= 5) {
      return;
    }
    p5.stroke('black');
    // Encode the strokes in the model.
    let newState = model.zeroState();
    newState = model.update(model.zeroInput(), newState);
    newState = model.updateStrokes(sequence, newState, sequence.length-1);

    // Reset the actual model we're using to this one that has the encoded strokes.
    modelState = model.copyState(newState);
    
    const lastHumanLine = lastHumanDrawing[lastHumanDrawing.length-1];
    x = lastHumanLine[0];
    y = lastHumanLine[1];

    // Update the pen state.
    const s = sequence[sequence.length-1];
    dx = s[0];
    dy = s[1];
    previousPen = [s[2], s[3], s[4]];

    lastModelDrawing = [];
    modelIsActive = true;
  }
};

export default function test(){
  return (
    <>
  <ReactP5Wrapper sketch = {sketch}/>
  </>
  )
}