$(document).ready(function () {
    let estado = 0;

    const fatOsc = new Tone.FatOscillator("F3", "sine").toDestination();

    (function () {
        let run = Pts.quickStart("#pt", "#000");

        let sound = Sound.from(fatOsc, fatOsc.context).analyze(32);

        run((time, ftime) => {
            if (estado % 2 == 0) {
                let rect = Rectangle.fromCenter(space.center, 870);
                form.fillOnly("#13A7E0").rect(rect);
                let tri = Triangle.fromCenter(new Pt(space.size.x / 4, 250), 50);
                form.stroke("#000", 12, "round", "round").fill("#000").polygon(tri);
                form.strokeOnly("#000", 12, "round", "round").line([new Pt(space.size.x / 4, 0), new Pt(space.size.x / 4, 200)]);
                let pA = new Pt(space.center.x + 150, space.center.y + 210);
                let pB = new Pt(space.center.x + 270, space.size.y + 90);
                let pC = new Pt(space.center.x + 30, space.size.y + 90);
                let curveL = new Group(pA, pA, pB, pC, pA, pA);
                form.stroke("#000", 12).fill("#C29B61").polygon(Curve.catmullRom(curveL));
                // Orejas
                let orejaLE = Circle.fromCenter(new Pt(space.center.x, space.center.y - 60), 90);
                let orejaRE = Circle.fromCenter(new Pt(space.center.x + 300, space.center.y - 60), 90);
                let orejaLI = Circle.fromCenter(new Pt(space.center.x, space.center.y - 60), 60);
                let orejaRI = Circle.fromCenter(new Pt(space.center.x + 300, space.center.y - 60), 60);
                form.stroke("#000", 12).fill("#C29B61").circle(orejaLE);
                form.stroke("#000", 12).fill("#C29B61").circle(orejaRE);
                form.stroke("#000", 12).fill("#4B3621").circle(orejaLI);
                form.stroke("#000", 12).fill("#4B3621").circle(orejaRI);
                // Cara
                let cara = Circle.fromCenter(new Pt(space.center.x + 150, space.center.y + 120), 210);
                form.stroke("#000", 12).fill("#C29B61").circle(cara);

                let anuRect = Rectangle.fromCenter(new Pt(180, 600), 300, 210);
                form.stroke("#000", 12).fill("#FFF").rect(anuRect);
                form.stroke("#000", 12).fill("#000");
                if (estado === 0) {
                    form.font(51).alignText("center", "middle").textBox(anuRect, " adiós 29", "center");
                }
                else {
                    form.font(51).alignText("center", "middle").textBox(anuRect, " hola 30", "center");
                }
                // Ojos
                let ojoLE = Circle.fromCenter(new Pt(space.center.x + 60, space.center.y + 60), 60);
                let ojoRE = Circle.fromCenter(new Pt(space.center.x + 240, space.center.y + 60), 60);
                let ojoLI = Circle.fromCenter(new Pt(space.center.x + 60, space.center.y + 60), 15);
                let ojoRI = Circle.fromCenter(new Pt(space.center.x + 240, space.center.y + 60), 15);
                form.stroke("#000", 12).fill("#FFF").circle(ojoLE);
                form.stroke("#000", 12).fill("#FFF").circle(ojoRE);
                form.stroke("#000", 12).fill("#000").circle(ojoLI);
                form.stroke("#000", 12).fill("#000").circle(ojoRI);
                form.strokeOnly("#000", 12, "round", "round").line([new Pt(space.center.x + 150, space.center.y + 165), new Pt(space.center.x + 150, space.center.y + 180)]);
                form.strokeOnly("#000", 12, "round", "round").line([new Pt(space.center.x + 150, space.center.y + 180), new Pt(space.center.x + 135, space.center.y + 195)]);
                form.strokeOnly("#000", 12, "round", "round").line([new Pt(space.center.x + 150, space.center.y + 180), new Pt(space.center.x + 165, space.center.y + 195)]);
                form.strokeOnly("#000", 12, "round", "round").line([new Pt(space.center.x + 105, space.center.y + 240), new Pt(space.center.x + 195, space.center.y + 240)]);
            }
            else {
                let ojoLE = Circle.fromCenter(new Pt(space.center.x + 60, space.center.y + 60), 60);
                let ojoRE = Circle.fromCenter(new Pt(space.center.x + 240, space.center.y + 60), 60);
                let ojoLI = Circle.fromCenter(new Pt(space.center.x + 60, space.center.y + 60), 39);
                let ojoRI = Circle.fromCenter(new Pt(space.center.x + 240, space.center.y + 60), 39);
                form.stroke("#000", 12).fill("#FFF").circle(ojoLE);
                form.stroke("#000", 12).fill("#FFF").circle(ojoRE);
                form.stroke("#000", 12).fill("#000").circle(ojoLI);
                form.stroke("#000", 12).fill("#000").circle(ojoRI);
            }
        });
        space.bindMouse().bindTouch().play();
    })();

    $("#pt").click(function (e) {
        setInterval(() => {
            estado += 1;
            if (estado > 3) {
                estado = 0;
            }
            if (estado %2 === 1) {
                fatOsc.stop();
                fatOsc.frequency.value = "F3";
                fatOsc.start();
            }
            else if (estado === 0){
                fatOsc.stop();
                fatOsc.frequency.value = "F4";
                fatOsc.start();
            }
            else if (estado === 2){
                fatOsc.stop();
                fatOsc.frequency.value = "F6";
                fatOsc.start();
            }
            console.log(estado);
        }, 500);
    });



    function scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
});