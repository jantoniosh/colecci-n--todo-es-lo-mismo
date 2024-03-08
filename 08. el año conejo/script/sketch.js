let w = 864;
let audio;
let fft;
let sp;
let br;
let bg;
let bb;

function preload() {
    audio = loadSound('data/rabbit.mp3');
}

function setup() {
    createCanvas(w, w);
    noStroke();
    fft = new p5.FFT(0.8, 32);
}

function draw() {
    sp = fft.analyze();
    console.log(sp);
    br = map(sp[0], 0, 225, 152, 252);
    bg = map(sp[8], 0, 225, 138, 238);
    bb = map(sp[16], 0, 225, 83, 183);
    background(br, bg, bb);
    rabbit(432, 582);
}

function rabbit(x, y) {
    let por = random(0, 100);
    let r = map(sp[4], 0, 100, 45, 236);
    let g = map(sp[12], 0, 100, 197, 1);
    let b = map(sp[20], 0, 100, 244, 90);
    let n = por + 60;
    fill(r, g, b);
    let f = a => ellipse(j = x + a, y - 300, 150, 400);
    ellipse(x, y, 500, 400);
    f(-100);
    f(100);
    fill(br, bg, bb);
    ellipse(j, y, 80);
    ellipse(x - 100, y, 80);
}

function mouseClicked() {
    audio.loop();
}
