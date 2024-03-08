// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader letiable
let theShader;

// the camera variable
let myFont, myText;

let r = 0.0;
let g = 1.0;
let b = 0.0;

let color = [1.0, 1.0, 1.0];

let count = 0;

let synth = new Tone.MembraneSynth().toMaster();;

let pitch = "A4";

function preload() {
  // load the shader
  theShader = loadShader('effect.vert', 'effect.frag');
  myFont = loadFont('data/Montserrat-ExtraBold.ttf');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(1536, 864, WEBGL);
  myText = createGraphics(width, height);
  noStroke();
}

function draw() {
  noCursor();
  shader(theShader);
  myText.fill(255);
  myText.textFont(myFont);
  myText.textStyle(BOLD);
  myText.textAlign(LEFT, CENTER);
  myText.textSize(170);
  myText.text('todo\nes lo\nmismo', width * 0.1, height / 2);

  theShader.setUniform('u_tex0', myText);
  theShader.setUniform('u_color', color);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_mouse', [mouseX, mouseY]);
  theShader.setUniform('u_time', frameCount * 0.01);

  rect(0, 0, width, height);

}
