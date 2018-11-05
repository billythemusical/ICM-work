//had to change manip to start the circles at a larger place 
//because the music comes in slow

//listen to bandpass at 3k and make the dots move independently
//try to LERP the amplitude to move less

//make a reset button
//and a "Make another donut!!  button"
//donut class, object


let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;

// magic value that makes the circles the right size
let manip;
//song to play
let timtimsong;
// make a new amplitude module
let amplitude;
let currentAmplitude;
let previousAmplitude;
//get the level of that module
let level;
//map the level of that module
let levelMap = 0;

let bkgdSliderVal = 0.01;

//use buttons to make set favorite spots
// for instance b = 0.19746478873239437;


function preload() {
  //load my background music
  timtimsong = loadSound("timtim.mp3");
  
	// //load eyePic
	// eyePic = loadImage("assets/eye.jpg");

 }



function setup() {
  // play my background music
  timtimsong.loop();
  // get the amplitude of the song
  amplitude = new p5.Amplitude();
  
  // frameRate(10);

  createCanvas(windowWidth, windowHeight);

  imageMode(CENTER);

  //way better than radians!!
  angleMode(DEGREES);

  //tyring HSB out
  colorMode(HSB);

  domObjects();

  // change this number to move the circles farther apart
  manip = 400 / 72;
  //for instance...
  // manip = 2;

  textSize(24);
  textAlign(LEFT);
  smooth();

}

function draw() {
  b = bValSlider.value();
  manip = manipSlider.value();

  // clears the screen if 'c' is pressed
  // keyTyped();

  // slider for FRAMERATE
  let f = frameRateSlider.value();
  frameRate(f);
  // print(f);


  bkgdColor();
  donut(0, 0, 0);
  instructions();
  
}

function donut(strokeH, strokeS, strokeB) {
  
  push();

  //moving the color value
  col += moveC;
  fill(col * 2, 75, 100);

  //if color gets greater than or equal to 100 OR color gets less than 0, 
  //change the value at which we move color to negative.  
  //this allows an oscillation.  You can use print(col); to test your values

  if (col >= 100 || col < 0) {
    moveC = moveC * -1;
  }
  ang += 5;

  //sets up the drawing to oscillate up and down around the center
  // let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
  let transX = windowWidth / 2 + sin(ang * 2);
  let transY = windowHeight / 2 + cos(ang / 3) * 20;
  translate(transX, (transY - 40));


  //increments the rotation so it moves - remember x = x++ down below
  // let rotateMap = map(level, 0, 1, 2, 4);
  // rotate(x / ((b * sqrt(3) / rotateMap)));
  rotate(x / ((b * sqrt(3) / levelMap)));
  // print(x / (b * sqrt(3)) / levelMap);

  // comment this out to stop the rotation
  x += 5;

  //this FOR loop draws set of ellipses in the shape of a circle. 
  //And 360 / 13 determines is how many I will get, 
  //final numbers found by trial and error
  for (i = 0; i < 360; i += 13) {
    //these ellipse values were found by trial and error.  the fact that cos and sin 
    //work opposite in the x / y planes is what makes the circles be drawn 
    //around the center
    // I used mouseX / mouseY to manipulate the shape of the ellipse
    //try different numbers for manip
    // let manip = PI;

    let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
    let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
    let ellipseSize = windowWidth / 20;
    level = amplitude.getLevel();
    // levelMap = (map(level, 0, 1, 2, 20)) * frameCount % 2; - fun one this
    levelMap = map(level, 0, 1, 2, 10)
    let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
    stroke(strokeH, strokeS, strokeB);
    strokeWeight(SWSliderVal);
    ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
    
    // print("slider value ", b);
    // print("amplitude ", levelMap);
  }

  pop();

}

function instructions() {
  fill(255, 127);
  // text("frame rate value", frameRateSlider.width + 20, frameRateSlider.height);
  // text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}


function bkgdColor() {
  push();
  colorMode(RGB);
  background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
  pop();
}

// cclears the screen if 'c' is pressed
function keyTyped() {
  if (key === 'c') {
    redraw();
  }
}


// function resetSliders() {
//   strokeWeightSliderVal = 0.0;
//   manipSliderVal = manip;
//   frameRateSliderVal = 24;
//   bValSlider = 0.01
// }

function domObjects() {
 //DOM Objects
  // resetButton = createButton('reset');
  // resetButton.position(windowWidth / 20, 12 * windowHeight / 20);
  // resetButton.mousePressed(resetSliders);
  // rotateSlider = createSlider(1, 3, 1, 0.01);
  // rotateSlider.position(windowWidth / 20, 3 * windowHeight / 5);
  bValSlider = createSlider(0.01, 0.2, 0.01, 0.0001);
  bValSlider.position(windowWidth / 20, 3 * windowHeight / 5);
  let manipRep = (400 / 72);
  manipSlider = createSlider(2, 20, 8, 0.001);
  manipSlider.position(windowWidth / 20, 13 * windowHeight / 20);
  manip = manipSlider.value();
  frameRateSlider = createSlider(12, 60, 30, 1);
  frameRateSlider.position(windowWidth / 20, 14 * windowHeight / 20);
  strokeWeightSlider = createSlider(0.01, 0.1, 0.03, 0.01);
  strokeWeightSlider.position(windowWidth/20, 15*windowHeight/20);
  
}


//FUNCTIONS TO MAKE

// a button to toggle ellipseModes
// function ellipseModes () {
// ellipseMode(CORNERS);
// ellipseMode(CENTER);
// }

//have button for freak out mode

// change this number to move the circles farther apart
// for instance...
// manip = 2;

//make slider for FRAMERATE
// frameRate(sin(f)*20);
