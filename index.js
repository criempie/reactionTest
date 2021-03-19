let videoPath = "./tests/";
let videoName = "PsySample";
let fps = "50";
let format = "mp4";

let timer1;
let vid_no = 0;

let counter = 0;
let maxCount = 5;

let diffs = [];

const pathBuilder = (n) => videoPath + videoName + n + "_" + fps + "." + format;
let vidos = [
	"PsySample_50_1.mp4",
	"PsySample_60_1.mp4"
	]

function setVideo(n) {
	// timer1 = performance.now();
	setTimeout(() => {
		$("#video").attr("src", videoPath + vidos[n] + "?t=" + Date.now());
	}, 100);
}

$(document).ready(() => {
	videoElement = document.getElementById("video");

    $("#start").on("click", () => {
        $("#start").remove();
		document.documentElement.requestFullscreen();
		setVideo(vid_no);
	})

	$("#video").on("loadeddata", () => {
		timer1 = performance.now();
		$("#video").trigger("play");
	})

    $("#video").on("ended", () => {
        let reactionTime = performance.now() - timer1; 
		// console.log(vidos[vid_no] + " " + reactionTime)
		// vid_no = (vid_no + 1 ) % (vidos.length);
		diffs.push(reactionTime);
		counter++;

		if (counter < maxCount) {
			setVideo(vid_no);
		} else {
			document.exitFullscreen();
			$(".videoHolder").remove();
			$(".container").append('<div class="resultContainer"></div>')
			diffs.map(e => {
				$(".resultContainer").append("<span>" + e + "</span>")
			})
			
		}
    })
})

