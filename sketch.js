let time = 0;
let wavey = [];
let wavex = [];
let n = 0;
let radius = 0;
let offset = 200;
let speedSlider;
let harmonicsSlider;

function setup(){
  createCanvas(windowWidth, windowHeight);
  speedSlider = createSlider(0, 10, 1);
  speedSlider.position(20, 450);
  harmonicsSlider = createSlider(1, 100, 10);
  harmonicsSlider.position(20, 480);
}

function draw(){
  background(0);
  stroke(255);
  fill(255);
  textSize(20);
  text("Speed",speedSlider.x+speedSlider.width+5,speedSlider.y +5 );
  text("Number of Harmonics",harmonicsSlider.x+harmonicsSlider.width+5,harmonicsSlider.y+5);


  translate(250,200);


  let prevx = 0;
  let prevy = 0;

for (let i = 1; i <= harmonicsSlider.value(); i+=2) {
	  n=i;
	  radius = 100*(4/(n*PI));
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

}
  wavey.unshift(prevy);
  wavex.unshift(prevx);


  line(prevx,prevy,radius+offset,prevy);
  translate(radius+offset,0);
  for (let i = 0; i < wavey.length; i++) {
  	stroke(0,255,0);
  	point(i,wavey[i]);
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
  }
  time+=speedSlider.value()/100;
}
