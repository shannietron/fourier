let time = 0;
let wavey = [];
let wavex = [];
let waves = [];
let tempWaves = [];
let n = 0;
let radius = 0;
let offset = 200;
let speedSlider;
let harmonicsSlider;
let prevx = 0;
let prevy = 0;
function setup(){
  createCanvas(windowWidth, 600);
  speedSlider = createSlider(0, 10, 1);
  speedSlider.position(20, 450);
  harmonicsSlider = createSlider(1, 100, 10);
  harmonicsSlider.position(20, 480);
  var reset = createButton("reset");
  reset.mousePressed(resetSketch);
  dropdown = createSelect();
  dropdown.option('square','square');
  dropdown.option('sawtooth','sawtooth');
  dropdown.option('triangle','triangle');
  checkbox = createCheckbox('Show components');

}
function resetSketch(){
  wavex = [];
  wavey = [];
}
function draw(){
  background(0);
  stroke(255);
  fill(255);
  textSize(20);
  text("Speed",speedSlider.x+speedSlider.width+5,speedSlider.y +5 );
  text("Number of Harmonics",harmonicsSlider.x+harmonicsSlider.width+5,harmonicsSlider.y+5);
  translate(250,200);

  prevx = 0;
  prevy = 0;
 // let series = "sawtooth";
  switch(dropdown.selected()) {
    case "square":
    for (let i = 1; i <= harmonicsSlider.value(); i+=2) {
      n=i;
      radius = 100*(4/(n*PI));
      drawSineComponents(n,radius);
    }
      break;
    case "sawtooth":
    for (let i = 1; i <= harmonicsSlider.value(); i++) {
      n=i;
      radius = 100*(2/(n*PI));
      if(i%2){
        radius=-radius;
      }
      drawSineComponents(n,radius);
    }
    break;
    case "triangle":
    for (let i = 1; i <= harmonicsSlider.value(); i+=2) {
      n=i;
      radius = 10*(8/((n*PI)^2));
      if(i%2){
        radius=-radius;
      }
      drawSineComponents(n,radius);
    }
  }


  wavey.unshift(prevy);
  wavex.unshift(prevx);

  if (checkbox.checked()) {
    waves.unshift(tempWaves);
    tempWaves=[];
  }



  line(prevx,prevy,radius+offset,prevy);
  translate(radius+offset,0);
  for (let i = 0; i < wavey.length; i++) {
    stroke(0,255,0);
    point(i,wavey[i]);
      if(checkbox.checked() && waves[i]){
        for (var j = 0; j < (waves[i].length); j++) {
          stroke(127,127,0);
          point(i,waves[i][j]);
        }
    }
  }

  translate(-(radius+offset),0);
  beginShape();
  for (let i = 0; i < wavey.length; i++) {
    stroke(255,0,0);
    vertex(wavex[i],wavey[i]);
  }
  endShape();

  if(wavex.length > windowWidth){
    wavex.pop();
    wavey.pop();
    if(checkbox.checked()){
      waves.pop();
    }
  }
  time+=speedSlider.value()/100;
}

function drawSineComponents(n,radius){
  x = radius * cos(n*time);
  y = radius * sin(n* time);
  fill(255);
  ellipse(prevx,prevy,5);
  noFill(255);
  stroke(255);
  ellipse(prevx,prevy,radius * 2);
  stroke(0,255,0);
  line(prevx,prevy,prevx+x,prevy+y);

  prevx = x+prevx;
  prevy = y+prevy;
  if (checkbox.checked()) {
    tempWaves.unshift(y);
  }
}
