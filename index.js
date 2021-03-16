let videoPath = "./tests/";
let videoName = "PsySample";
let fps = "60";
let format = "mp4";
let videoCount = 2;

let timer;
let reactionTime;
let reactionTimeList = [];

let i = 1;
let totalClicks = 0;

const pathBuilder = (n) => videoPath + videoName + "_" + fps + "_" + n + "." + format;

function updateVideo(n) {
    if (n === "stop") return;
    if (n % 2 !== 0) {
        $("#video1").attr("style", "opacity: 1");
        $("#video2").attr("style", "opacity: 0");
        // if (n < videoCount) $("#video2").attr("src", pathBuilder(n+1))
        
        $("#video1").trigger("play");
        timer = performance.now();
    } else {
        $("#video2").attr("style", "opacity: 1");
        $("#video1").attr("style", "opacity: 0");
        // if (n < videoCount) $("#video1").attr("src", pathBuilder(n+1))
        $("#video2").trigger("play");
    }

    timer = performance.now();
}

$(document).ready(() => {
    $(".container").on("click", () => {
        reactionTime = performance.now() - timer;
        if (reactionTime <= 20) {
            console.log("Слишком рано: ", reactionTime);
        } else if (reactionTime >= 1020) {
            console.log("Слишком поздно: ", reactionTime);
        }
        totalClicks++;
        reactionTimeList.push(reactionTime);
    })
    
    $("#video1").on("canplay", res => {
        let perf = performance.now();
        let tim = timer;
        console.log(res.timeStamp, perf, tim)
        console.log("1-2: ", res.timeStamp - perf)
        console.log("2-3: ", perf - tim)
    })

    $("#start").on("click", () => setTimeout(() => {
        $("#video1").attr("src", pathBuilder(1));
        $("#video2").attr("src", pathBuilder(2));
        updateVideo(1);
        $("#start").remove(); 
    }, 100))

    $("#set50fps").on("click", () => {
        fps = "50";
        $("#video1").attr("src", pathBuilder(1));
        $("#video2").attr("src", pathBuilder(2));
        updateVideo(1);
    })
    $("#set60fps").on("click", () => {
        fps = "60";
        $("#video1").attr("src", pathBuilder(1));
        $("#video2").attr("src", pathBuilder(2));
        updateVideo(1);
    })

    $("#video1").on("ended", () => {
        reactionTime = performance.now() - timer; 
        i++;
        // console.log(reactionTime)
        if (i > videoCount) {
            i = 1;
        }
        
        if (totalClicks < 5) updateVideo(i)
        else console.log(reactionTimeList)
        // updateVideo(i <= videoCount ? i : "stop")
    })
    $("#video2").on("ended", () => {
        reactionTime = performance.now() - timer; 
        i++;
        // console.log(reactionTime)
        if (i > videoCount) {
            i = 1;
        }
        updateVideo(i)
        // updateVideo(i <= videoCount ? i : "stop")
    })
})

