// in this sketch we're going to send the webcam to the shader, and then invert it's colors

// the shader letiable
let theShader;

// the camera variable
let fontBold, fontItalic, myText;

const fatOsc = new Tone.Oscillator("F3", "sine").toMaster();
const vol = new Tone.Volume().toDestination();

let pitch = "A4";

function preload() {
  // load the shader
  theShader = loadShader('effect.vert', 'effect.frag');
  fontBold = loadFont('data/IBMPlexSans-Bold.ttf');
  fontItalic = loadFont('data/IBMPlexSans-Italic.ttf');
}

function setup() {
  createCanvas(866, 866, WEBGL);
  myText = createGraphics(width, height);
  noStroke();
}

function draw() {
  shader(theShader);

  myText.fill(255);
  myText.textAlign(CENTER, CENTER);
  myText.textFont(fontBold);
  myText.textSize(600);
  myText.text('0', width / 2, height / 2 - 150);
  myText.textFont(fontItalic);
  myText.textSize(100);
  myText.text('un', width / 2, height / 4 - 150);
  myText.text('es un chingo', width / 2, height / 2 + 210);
  myText.textSize(40);
  myText.text('(a veces para bien, a veces para mal)', width / 2, height / 2 + 310);
  let fac = sin(frameCount * 0.02);

  vol.volume.value = map(fac, 1, -1, -50, -10)

  theShader.setUniform('u_tex0', myText);
  theShader.setUniform('u_color', color);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_mouse', [mouseX, mouseY]);
  theShader.setUniform('factor', fac);
  theShader.setUniform('u_time', frameCount * 0.01);

  rect(0, 0, width, height);

}

function mouseClicked() {
  fatOsc.connect(vol).start();
}
