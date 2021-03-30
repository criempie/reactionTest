let videoPath = "./tests/";
let videoName = "a_PsySample.mp4";

let timer;

let counter = 1;
let maxCount = 6;

let diffs = [];


function setVideo() {
	// timer = performance.now();
	setTimeout(() => {
		// $("#video").attr("src", videoPath + vidos[n] + "?t=" + Date.now());
		$("#video").attr("src", videoPath + counter + videoName);
	}, 300 + Math.floor(Math.random() * 350));
}

$(document).ready(() => {
	videoElement = document.getElementById("video");

    $("#start").on("click", () => {
        $("#start").remove();
		document.documentElement.requestFullscreen();
		$("#ready").attr("style", "display: block");
		$(document).keydown(event => {
			if (event.keyCode === 32) {
				setVideo();
				$("#ready").attr("style", "display: none");
				$(document).keydown(() => {return})
			}
		})

		setTimeout(() => {
			$(document).on("click", () => {
				setVideo();
				$("#ready").attr("style", "display: none");
				$(document).on("click", () => {return})
			})
		}, 0);
	})

	$("#video").on("loadeddata", () => {
		timer = performance.now();
		$("#video").trigger("play");
	})

    $("#video").on("ended", () => {
        let reactionTime = performance.now() - timer; 
		diffs.push(reactionTime);
		counter++;

		if (counter <= maxCount) {
			setVideo();
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

