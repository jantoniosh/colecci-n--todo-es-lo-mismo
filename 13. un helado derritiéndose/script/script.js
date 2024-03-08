let contador;
let fondo, lineas;
let yL, yR;
let audioL, audioR;
let font;

function preload() {
    font = loadFont('fonts/Heebo-SemiBold.ttf');
    audioL = loadSound('audio/heladoL.mp3');
    audioR = loadSound('audio/heladoL.mp3');
}

function setup() {
    let cnv = createCanvas(864, 864);
    cnv.mousePressed(playAudio);
    contador = 0;
    fondo = "#9E4F64";
    linea = "#A4EBAD";
    yL = 280;
    yR = 420;
}

function draw() {

    background(fondo);
    textFont(font);
    textSize(51);
    textAlign(LEFT, CENTER);
    text("un\nhelado\nderritiéndose", 60, 120);
    noFill();
    stroke(linea);
    strokeWeight(9);

    push();
    translate(400, -100);
    rotate(-1.75 * PI);
    line(332, 390, 532, 390);

    beginShape();
    curveVertex(332, 390);
    curveVertex(332, 390);
    curveVertex(412, 800);
    curveVertex(452, 800);
    curveVertex(532, 390);
    curveVertex(532, 390);
    endShape();

    let d = 200;
    let n = 4;
    let del = d / 4;

    for (let i = 1; i < 4; i++) {
        line(532 - del * i, 390, 432, 842);
    }

    arc(332, 300, 200, 180, 0.5 * PI, 1.12 * PI);
    arc(332, 225, 200, 200, 0.88 * PI, 1.52 * PI);
    arc(432, 162, 200, 200, 1.12 * PI, 1.88 * PI);
    arc(532, 225, 200, 200, 1.48 * PI, 2.12 * PI);
    arc(532, 300, 200, 180, 1.88 * PI, 2.5 * PI);

    arc(432, 330, 120, 45, 1.05 * PI, 1.95 * PI);
    pop();

    // let posLagL = map(contador, 0, 120, 280, 864);
    // let posLagR = map(contador, 0, 120, 420, 864);
    // contador++;
    yL++;
    yR++;

    if (yL > 864) {
        yL = 280;
        audioL.stop();
        audioL.play();
    }

    if (yR > 864) {
        yR = 420;
        audioR.stop();
        audioR.play(); 
    }

    let mL = abs(yL - 572);
    let sL = map(mL, 292, 0, 0, 1);

    let mR = abs(yR - 642);
    let sR = map(mR, 222, 0, 0, 1);

    audioL.setVolume(sL, 0.1);
    audioR.setVolume(sR, 0.1);

    drawLagrima(480, yL);
    drawLagrima(610, yR);

    push();
    translate(400, -100);
    rotate(-1.75 * PI);
    noStroke();
    ellipse(332, 225, 60, 45);
    ellipse(532, 225, 60, 45);
    stroke(linea);
    strokeWeight(9);
    arc(332, 225, 60, 45, 0, PI);
    arc(532, 225, 60, 45, 0, PI);



    for (let i = 1; i < 9; i++) {
        let m = 4.52;
        let b = -1100;
        let y = 390 + 50 * i;
        x = (y - b) / m;
        line(x, y, 432, y);
        let sep = 432 - x;
        line(432 + sep, y, 432, y);
    }
    pop();

}

function drawLagrima(x, y) {
    fill(fondo);
    // noStroke();
    beginShape();
    vertex(x, y);
    quadraticVertex(x + 13, y + 36, x, y + 36);
    quadraticVertex(x - 13, y + 36, x, y);
    endShape(CLOSE);
}

function playAudio() {
    if (!audioL.isPlaying() && !audioR.isPlaying()) {
        audioL.loop();
        audioR.loop();
    }
}