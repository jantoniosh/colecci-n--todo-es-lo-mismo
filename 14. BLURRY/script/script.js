let blurry = 0;
let blurch = 1;
let lapse = 0;
let img;
let audio;
let noise;

function preload() {
    img = loadImage('image/figura.png');
    audio = loadSound('audio/audio.mp3');
}

function setup() {
    let cnv = createCanvas(864, 864);
    cnv.mousePressed(playSound);
    colorMode(HSB, 360, 100, 100, 100);
    noise = new p5.Noise();
}

function draw() {
    blendMode(BLEND);
    background("#2D91AD");
    blendMode(SCREEN);

    fill(0, 0, 0);
    noStroke();

    // blurry = constrain(map(mouseX, 0, width, 1, 900), 1, 900);

    let time = sin(frameCount / 100) + 1;
    blurry = constrain(map(time, 0, 2, 900, 1), 1, 900);

    let audioN = map(blurry, 1, 900, 0, 0.3);
    noise.amp(audioN);

    let audioA = map(blurry, 1, 900, 1, 0);
    audio.setVolume(audioA);

    drawingContext.shadowBlur = blurry;

    drawingContext.shadowColor = color(210, 80, 70);
    // ellipse(300, 260, 300);
    // ellipse(600, 4300, 200);
    // ellipse(750, 580, 320);
    image(img, 0, 0, 864, 864);

    drawingContext.shadowColor = color(20, 100, 100);
    // ellipse(480, 190, 240);
    // ellipse(330, 480, 320);
    // ellipse(580, 580, 240);
    rect(0, 0, 864, 864);

}

function playSound() {
    // if (!audioL.isPlaying() && !audioR.isPlaying()) {
    //     audioL.loop();
    //     audioR.loop();
    // }
    noise.start();
    audio.loop();
}