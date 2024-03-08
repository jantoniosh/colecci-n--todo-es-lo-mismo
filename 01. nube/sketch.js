// Keep track of our socket connection
let socket;
let color;
let cuColor;
let colorStroke;
let posX;
let sca;

function setup() {
  // // Original 600 x 600
  // const w = window.innerWidth;
  // const h = window.innerHeight;
  // console.log("w: ", w);
  // console.log("h: ", h);
  const w = 864;
  const h = 864;
  createCanvas(w, h);
  posX = (w - h) / 2;
  sca = h / 600;
  color = {
    r: 0,
    g: 0,
    b: 0
  }
  cuColor = {
    r: 0,
    g: 0,
    b: 0
  }
  colorStroke = {
    r: Math.abs(255 - color.r),
    g: Math.abs(255 - color.g),
    b: Math.abs(255 - color.b)
  }
}

function draw() {
  noCursor();
  push();
  translate(posX, 0);
  scale(sca);
  background(cuColor.r, cuColor.g, cuColor.b);
  strokeWeight(9);
  noFill();
  stroke(colorStroke.r, colorStroke.g, colorStroke.b);
  line(106, 400, 480, 400);
  arc(150, 310, 200, 200, PI * 0.65, PI * 1.4);
  arc(252, 210, 260, 200, PI * 0.99, PI * 2);
  arc(440, 300, 200, 220, PI * 1.32, PI * 2.36);
  arc(250, 320, 80, 50, TWO_PI, TWO_PI + PI);
  fill(colorStroke.r, colorStroke.g, colorStroke.b);
  ellipse(180, 240, 12, 12);
  ellipse(320, 240, 12, 12);
  if (cuColor.r != color.r) {
    if (cuColor.r > color.r) {
      cuColor.r = cuColor.r - 1;
    }
    else if (cuColor.r < color.r) {
      cuColor.r = cuColor.r + 1;
    }
  }
  if (cuColor.g != color.g) {
    console.log("Verde Diferente");
    if (cuColor.g > color.g) {
      cuColor.g = cuColor.g - 1;
    }
    else if (cuColor.g < color.g) {
      cuColor.g = cuColor.g + 1;
    }
  }
  if (cuColor.b != color.b) {
    if (cuColor.b > color.b) {
      cuColor.b = cuColor.b - 1;
    }
    else if (cuColor.b < color.b) {
      cuColor.b = cuColor.b + 1;
    }
  }
  asigColor();
  pop();
}

function colorBack(data) {
  color = data;
}

function asigColor() {
  colorStroke = {
    r: Math.abs(255 - cuColor.r),
    g: Math.abs(255 - cuColor.g),
    b: Math.abs(255 - cuColor.b)
  }
}