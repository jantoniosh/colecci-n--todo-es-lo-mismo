$(document).ready(function () {
    let playing = false;

    const player = new Tone.Player("audio/audio.mp3").toDestination();

    (function () {
        let run = Pts.quickStart("#pt", "#000");

        let sound = Sound.from(player, player.context).analyze(32);

        run((time, ftime) => {
            let ptCenter = new Pt(space.center.x, space.center.y - 30);
            let cirPrinc = Circle.fromCenter(ptCenter, 45);
            form.stroke("#FFF", 9).fill("#FFF").circle(cirPrinc);
            form.strokeOnly("#FFF", 9, "round", "round").line([ptCenter, new Pt(space.center.x - 210, space.size.y)]);
            form.strokeOnly("#FFF", 9, "round", "round").line([ptCenter, new Pt(space.center.x + 210, space.size.y)]);
            for (let i = 1; i <= 6; i++) {
                let yA = 402 + (i * 72);
                let yB = 402 + ((i + 1) * 72);
                let xA = ((yA - 432) / 2.2) + 432;
                let xB = ((yB - 432) / -2.2) + 432;
                form.strokeOnly("#FFF", 9, "round", "round").line([new Pt(xA, yA), new Pt(xB, yB)]);
            }
            for (let i = 1; i <= 6; i++) {
                let yB = 402 + (i * 72);
                let yA = 402 + ((i + 1) * 72);
                let xA = ((yA - 432) / 2.2) + 432;
                let xB = ((yB - 432) / -2.2) + 432;
                form.strokeOnly("#FFF", 9, "round", "round").line([new Pt(xA, yA), new Pt(xB, yB)]);
            }
            let freqs = sound.freqDomain();
            for (let i = 1; i < 12; i++) {
                let sizeArc = scale(freqs[i * 2], 0, 127, 60 + (i * 30), 60 + ((i + 1) * 30))
                form.strokeOnly("#FFF", 9).arc(ptCenter, sizeArc, Math.PI * 0.7, Math.PI * 2.3);
            }
            // console.log(freqs);
        });
        space.bindMouse().bindTouch().play();
    })();

    $("#pt").click(function (e) {
        playing = !playing;
        if (playing) {
            player.start();
        }
        else {
            player.stop();
        }
    });

    function scale(number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
});