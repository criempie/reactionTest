let videoPath = "./tests/";
let videoName = "PsySample";
let fps = "50";
let format = "mp4";
let videoCount = 2;

let timer;
let reactionTime;
let reactionTimeList = [];

const pathBuilder = (n) => videoPath + videoName + n + "_" + fps + "." + format;

function setVideo(n) {
    $("#video").attr("src", pathBuilder(n));
    $("#video").trigger("play");
    timer = performance.now();
}

$(document).ready(() => {
    // $(document).on("click", () => {
    //     reactionTime = performance.now() - timer;
    //     console.log(reactionTime)
    //     if (reactionTime <= 20) {
    //         console.log("Слишком рано: ", reactionTime);
    //     } else if (reactionTime >= 1020) {
    //         console.log("Слишком поздно: ", reactionTime);
    //     }
    // })
    
    $("#start").on("click", () => setTimeout(() => {
        setVideo(1);
        $("#start").remove(); 
    }, 500))

    $("#video").on("ended", () => {
        reactionTime = performance.now() - timer; 
        console.log(reactionTime)
        setVideo(2);
        // if (reactionTime < 1000) {
        //     reactionTimeList.push(reactionTime);
        //     setVideo(2);
        // } else {
        //     setVideo(2);
        // }
    })
})

