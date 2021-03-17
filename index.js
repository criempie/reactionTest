let videoPath = "./tests/";
let videoName = "PsySample";
let fps = 50;
let format = "mp4";

const pathBuilder = (n) => videoPath + videoName + "_" + fps + "_" + n + "." + format;

let videoElements;
let buttons;

let timer;
let clicks = 0;
let maxClicks = 3;

let times = [];
let whenHappend = [];
let whenRecorded = [];

function playVideo() {
    videoElements[0].attr("src", pathBuilder(1));
    $("#video1").trigger("play")
}

$(document).ready(() => {
    videoElements = [
        $("#video1"),
        // $("#video2"),
    ];

    buttons = {
        start: $("#start"),
        set50fps: $("#set50fps"),
        set60fps: $("#set60fps"),
    };
    
    buttons.set50fps.on("click", () => {fps = 50});
    buttons.set60fps.on("click", () => {fps = 60});
    // buttons.start.on("click", playVideo)

    videoElements[0].on("canplay", r => {
        // setTimeout(() => {
        //     starts.push(r.timeStamp)
        // }, 100);
        timer = r.timeStamp;

        // if (clicks < maxClicks) setTimeout(() => {
        //     $(".videoHolder").click();
        // }, 500)
        
    });

    // $(".videoHolder").on("click", r => {
    //     if (clicks < maxClicks) {
    //         times.push(performance.now() - timer);
    //         clicks++;
    //     } else {
    //         console.log(times)
    //     }
        
    // });

    videoElements[0].on("ended", r => {
        // setTimeout(() => {
        //     ends.push(r.timeStamp)
        // }, 100);
        console.log("diff: ", r.timeStamp - timer);

        // if (clicks >= maxClicks) {
        //     $(".videoHolder").attr("style", "display: none")
        // } else {
        //     playVideo()
        // }

        // setTimeout(() => {
        //     i++;
        // }, 100);
        playVideo()
    });
    playVideo();

});