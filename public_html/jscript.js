$(document).ready(function() {
var canvas = document.getElementById('cvs');
var context = canvas.getContext('2d');
var canvas2 = document.getElementById('cvs2');
var context2 = canvas2.getContext('2d');
var video = document.getElementById('video');
var scale = 1 ;
var videoWidth = video.width * scale;
var videoHeight = video.height * scale;
var frameWidth = 300 * scale;
var frameHeight = 200 * scale;
var frameX = videoWidth / 2 - frameWidth / 2;
var frameY = videoHeight / 2 - frameHeight / 2; 
var radius = 50 * scale;

videoObj = {
    video: true
};

function draw(context,video,x,y,width,height) {
    context.drawImage(video,x,y,width,height);
    setTimeout(draw,1000/24,context,video,x,y,width,height);
};

function drawFrame(context,frameX,frameY,frameWidth,frameHeight,radius) {
    context.clearRect(0,0,videoWidth,videoHeight);
    context.beginPath();
    context.moveTo(frameX + radius, frameY);
    context.lineTo(frameX + frameWidth - radius,frameY);
    context.arcTo(frameX + frameWidth, frameY, frameX + frameWidth, frameY + radius, radius);
    context.lineTo(frameX + frameWidth, frameY + frameHeight - radius);
    context.arcTo(frameX + frameWidth, frameY + frameHeight, frameX + frameWidth - radius, frameY + frameHeight,radius);
    context.lineTo(frameX + radius, frameY + frameHeight);
    context.arcTo(frameX, frameY + frameHeight, frameX, frameY + frameHeight - radius, radius);
    context.lineTo(frameX , frameY + radius);
    context.arcTo(frameX,frameY, frameX + radius, frameY ,radius);
    context.closePath();
    context.lineWidth = 3;
    context.strokeStyle = 'lightBlue';
    context.stroke();
}

function standardClippingMask(context,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale) {
    context.restore();
    context.clearRect(0,0,videoWidth,videoHeight);
    context.save();
    context.beginPath();
    context.moveTo(frameX + radius, frameY);
    context.quadraticCurveTo(frameX + 80* scale, frameY + 10* scale, frameX + 80* scale, frameY + 40* scale);
    context.quadraticCurveTo(frameX + 80* scale, frameY + 65* scale, frameX + 100* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + 120* scale, frameY + 110* scale, frameX + 120* scale, frameY + 155* scale);
    context.quadraticCurveTo(frameX + 120* scale, frameY + 170* scale,frameX + 125* scale, frameY + 180* scale);
    context.quadraticCurveTo(frameX + 130* scale, frameY + 190* scale,frameX + 120* scale, frameY + frameHeight);
    context.lineTo(frameX + 170* scale, frameY + frameHeight);
    context.quadraticCurveTo(frameX + 160* scale, frameY + 190* scale, frameX + 165* scale, frameY + 180* scale);
    context.quadraticCurveTo(frameX + 170* scale, frameY + 170* scale, frameX + 170* scale, frameY + 155* scale);
    context.quadraticCurveTo(frameX + 170* scale, frameY + 110* scale, frameX + 200* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + 220* scale, frameY + 65* scale, frameX + 220* scale, frameY + 40* scale);
    context.quadraticCurveTo(frameX + 220* scale, frameY + 10* scale, frameX + frameWidth - radius, frameY);
    context.lineTo(frameX + radius, frameY);
    context.closePath();
    context.lineWidth = 2.5;
    context.strokeStyle = 'red';
    context.stroke();
    context.clip();
}

function genisKanalClippingMask(context,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale){
    context.restore();
    context.clearRect(0,0,videoWidth,videoHeight);
    context.save();
    context.beginPath();
    context.moveTo(frameX, frameY + 60* scale);
    context.quadraticCurveTo(frameX + 20* scale, frameY + 60* scale, frameX + 25* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + 30* scale, frameY + 120* scale, frameX + 45* scale, frameY + 125* scale);
    context.quadraticCurveTo(frameX + 65* scale, frameY + 138* scale, frameX + 70* scale, frameY + 165* scale);
    context.quadraticCurveTo(frameX + 72* scale, frameY + 190* scale, frameX + 90* scale, frameY + frameHeight);
    context.lineTo(frameX + 210* scale, frameY + frameHeight);
    context.quadraticCurveTo(frameX + 228* scale, frameY + 190* scale, frameX + 230* scale, frameY + 165* scale);
    context.quadraticCurveTo(frameX + 235* scale, frameY + 138* scale, frameX + 255* scale, frameY + 125* scale);
    context.quadraticCurveTo(frameX + 270* scale, frameY + 120* scale, frameX + 275* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + 280* scale, frameY + 60* scale, frameX + frameWidth, frameY + 60* scale);
    context.lineTo(frameX + frameWidth, frameY + radius);
    context.arcTo(frameX + frameWidth, frameY, frameX + frameWidth - radius, frameY, radius);
    context.lineTo(frameX + radius, frameY);
    context.arcTo(frameX, frameY, frameX, frameY + radius, radius);
    context.lineTo(frameX, frameY + 60* scale);
    context.closePath();
    context.strokeStyle = 'darkGreen';
    context.lineWidth = 2.5;
    context.stroke();
    context.clip();
}
function freeFormClippingMask(context,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale){
    context.restore();
    context.clearRect(0,0,videoWidth,videoHeight);
    context.save();
    context.beginPath();
    context.moveTo(frameX, frameY + 45* scale);
    context.quadraticCurveTo(frameX, frameY + radius, frameX + 5* scale, frameY + 55* scale);
    context.quadraticCurveTo(frameX + 10* scale, frameY + 60* scale, frameX + 10* scale, frameY + 70* scale);
    context.quadraticCurveTo(frameX + 15* scale, frameY + 80* scale, frameX + 12* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + 10* scale, frameY + 95* scale, frameX + 13* scale, frameY + 100* scale);
    context.quadraticCurveTo(frameX + 15* scale, frameY + 115* scale, frameX + 9* scale, frameY + 120* scale);
    context.quadraticCurveTo(frameX + 7* scale, frameY + 130* scale, frameX + 9* scale, frameY + 130* scale);
    context.quadraticCurveTo(frameX + 8* scale, frameY + 137* scale, frameX + 4* scale, frameY + 140* scale);
    context.quadraticCurveTo(frameX, frameY + 142* scale, frameX, frameY + 150* scale);
    context.arcTo(frameX, frameY + frameHeight, frameX + radius, frameY + frameHeight,radius);
    context.lineTo(frameX + frameWidth -radius, frameY + frameHeight);
    context.arcTo(frameX + frameWidth, frameY + frameHeight, frameX + frameWidth, frameY + frameHeight - radius,radius);
    context.quadraticCurveTo(frameX + frameWidth, frameY + 142* scale, frameX + frameWidth - 4* scale, frameY + 140* scale);
    context.quadraticCurveTo(frameX + frameWidth - 8* scale, frameY + 137* scale, frameX + frameWidth - 9* scale, frameY + 130* scale);
    context.quadraticCurveTo(frameX + frameWidth - 7* scale, frameY + 130* scale, frameX + frameWidth - 9* scale, frameY + 120* scale);
    context.quadraticCurveTo(frameX + frameWidth - 15* scale, frameY + 115* scale, frameX + frameWidth - 13* scale, frameY + 100* scale);
    context.quadraticCurveTo(frameX + frameWidth - 10* scale, frameY + 95* scale, frameX + frameWidth - 12* scale, frameY + 90* scale);
    context.quadraticCurveTo(frameX + frameWidth - 15* scale, frameY + 80* scale, frameX + frameWidth - 10* scale, frameY + 70* scale);
    context.quadraticCurveTo(frameX + frameWidth - 10* scale, frameY + 60* scale, frameX + frameWidth - 5* scale, frameY + 55* scale);
    context.quadraticCurveTo(frameX + frameWidth, frameY + radius, frameX + frameWidth , frameY + 45* scale);
    context.arcTo(frameX + frameWidth, frameY, frameX + frameWidth - radius, frameY, radius);
    context.lineTo(frameX + radius, frameY);
    context.arcTo(frameX , frameY, frameX, frameY + radius, radius);
    context.closePath();
    context.strokeStyle = 'blue';
    context.lineWidth = 2.5;
    context.stroke();
    context.clip();
}

if (navigator.webkitGetUserMedia) {
    navigator.webkitGetUserMedia(videoObj, function(stream) {   
        var localMediaStream = stream;
        video.src = window.URL.createObjectURL(localMediaStream);
        context.save();

        $('#btnStandard').on("click",function() {
            drawFrame(context,frameX,frameY,frameWidth,frameHeight,radius);
            standardClippingMask(context2,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale);
            draw(context2,video,0,0,videoWidth,videoHeight);
        });

        $('#btnGenisKanal').on("click",function() {
            drawFrame(context,frameX,frameY,frameWidth,frameHeight,radius);
            genisKanalClippingMask(context2,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale);
            draw(context2,video,0,0,videoWidth,videoHeight);
        });

        $('#btnFreeForm').on("click",function() {
            drawFrame(context,frameX,frameY,frameWidth,frameHeight,radius);
            freeFormClippingMask(context2,frameX,frameY,frameWidth,frameHeight,radius,videoWidth,videoHeight,scale);
            draw(context2,video,0,0,videoWidth,videoHeight);
        });

}, function(error) {
   console.error("Video capture error: ", error.code);
});
}


});
