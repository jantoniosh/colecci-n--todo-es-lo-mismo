const w = 864;
const dMax = 1240;
const dEll = 40;
let nPasos;
let angIA, angFA;
let angIB, angFB;
let cont, up;
let pasos;
let colores = ["#348BB3", "#5AE6C5", "#E99E95", "#B33446"];
let orden = new Array(4);
let estado;
let osc, reverb;
let myFont;

function preload() {
    font = loadFont('fonts/Heebo-SemiBold.ttf');
}

function setup() {
    let cnv = createCanvas(w, w);
    cnv.mousePressed(canvasPressed);
    nPasos = dMax / dEll;
    cont = 0;
    up = true;
    pasos = 240;
    osc = new p5.Oscillator('sine');
    randomOrden();
}

function draw() {
    background("#FFF");
    noStroke();
    angIA = map(cont, 0, pasos, QUARTER_PI, PI);
    angFA = map(cont, 0, pasos, PI + QUARTER_PI, TWO_PI);
    angIB = map(cont, pasos, 0, QUARTER_PI, PI);
    angFB = map(cont, pasos, 0, PI + QUARTER_PI, TWO_PI);
    let f = map(cont, 0, pasos, 0, 40);
    osc.freq(200 + orden[0] * 50 + f, 0.1);

    for (let i = nPasos / 2; i > 0; i--) {
        let cMax = 2 * i * dEll;
        let cMin = dEll * (2 * i - 1);
        fill(colores[orden[0]]);
        arc(w / 2, w / 2, cMax, cMax, angIA, angFA);
        fill(colores[orden[1]]);
        arc(w / 2, w / 2, cMax, cMax, angIA + PI, angFA + PI);
        fill(colores[orden[2]]);
        arc(w / 2, w / 2, cMin, cMin, angIB, angFB);
        fill(colores[orden[3]]);
        arc(w / 2, w / 2, cMin, cMin, angIB + PI, angFB + PI);
    }
    contador(0, pasos);
    fill(255);
    rect(0, 0, w, 48);
    rect(0, 0, 48, w);
    rect(0, 816, w, 48);
    rect(816, 0, 48, w);
    fill(0);
    textFont(font);
    textSize(30);
    text('no te complejices', 579, 846);
}

function canvasPressed() {
    console.log("Canvas Presiondo");
    osc.start();
}

function contador(min, max) {
    if (up) {
        cont++;
        if (cont > max) {
            cont = max;
            up = false;
        }
    }
    else {
        cont--;
        if (cont < min) {
            cont = min;
            up = true;
            randomOrden();
        }
    }

    // console.log(cont);
}

function randomOrden() {
    for (let i = 0; i < 4; i++) {
        let rep = true;
        let r = 0;
        while (rep) {
            rep = false;
            r = parseInt(random(0, 4));
            for (let j = 0; j < i; j++) {
                if (orden[j] == r) {
                    rep = true;
                }
            }
        }
        orden[i] = r;
    }
    console.log(orden);
}