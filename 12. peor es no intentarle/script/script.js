let n, s, mar, sc, font, audio, fft, carrier, modulator;
const colores = ["#FF6663", "#F4EEB1", "#9EE09E", "#9EC1CF"];
const txt = ["peor", "es", "no", "intentarle"];

function preload() {
    font = loadFont('fonts/Heebo-SemiBold.ttf');
    audio = loadSound('audio/orchestral-strings-warm-a.wav');
}

function setup() {
    let cnv = createCanvas(864, 864);
    cnv.mousePressed(playAudio);
    n = 4;
    s = width / n;
    mar = 16;
    sc = s - 2 * mar;
    console.log(sc);
    a = 0.0;
    inc = TWO_PI / sc * 2;
    fft = new p5.FFT(0.8, 128);
    carrier = new p5.Oscillator();
    carrier.freq(340);
    carrier.amp(0);

    modulator = new p5.Oscillator('triangle');
    modulator.disconnect(); // desconecta la moduladora de la salida maestra
    modulator.freq(5);
    modulator.amp(1);

    carrier.amp(modulator.scale(-1, 1, 1, -1));
}

function draw() {
    background(0);
    noStroke();
    let secX = constrain(parseInt(mouseX / s), 0, 3);
    let secY = constrain(parseInt(mouseY / s), 0, 3);

    let modFreq = map(secY, 0, 3, 21, 3);
    modulator.freq(modFreq);

    let modAmp = map(secX, 0, 3, 0.3, 0.9);
    modulator.amp(modAmp, 0.01);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let x = i * s + mar;
            let y = j * s + mar;
            if (i != secX || j != secY) {
                (i + j) % 2 == 0 ? drawSineA(x, y) : drawSineB(x, y);
            }
            else {
                let txtX = x + sc / 2;
                let txtY = y + sc / 2;
                fill(colores[i]);
                textFont(font);
                noStroke();
                textSize(42);
                textAlign(CENTER, CENTER);
                text(txt[i], txtX, txtY);
            }
        }
    }
}

function drawSineA(x, y) {
    strokeWeight(9);
    let a = 0;
    let waveform = fft.waveform();
    console.log(waveform.length);
    for (let j = 0; j < 4; j++) {
        noFill();
        stroke(colores[j]);
        beginShape();
        for (let i = 0; i < 128; i++) {
            // point(x + i, y + 46 * (j + 0.5) + sin(a) * 20.0);
            // a = a + inc;
            let vX = map(i, 0, 128, x, x + sc);
            let vY = map(waveform[i], -1, 1, y + 46 * (j + 0.5) - 20, y + 46 * (j + 0.5) + 20);
            vertex(vX, vY);
            // point(vX,vY);
        }
        endShape();
    }
}

function drawSineB(y, x) {
    stroke("#000");
    strokeWeight(9);
    let a = 0;
    let waveform = fft.waveform();
    for (let j = 0; j < 4; j++) {
        stroke(colores[j]);
        beginShape();
        for (let i = 0; i < 128; i++) {
            // point(y + 46 * (j + 0.5) + sin(a) * 20.0, x + i);
            // a = a + inc;
            let vX = map(waveform[i], -1, 1, y + 46 * (j + 0.5) - 20, y + 46 * (j + 0.5) + 20);
            let vY = map(i, 0, 128, x, x + sc);
            vertex(vX, vY);
        }
        endShape();
    }
}

function playAudio() {
    carrier.start();
    modulator.start();
}
