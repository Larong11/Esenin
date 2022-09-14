let box = document.getElementById("arrow");
let root = document.documentElement;
var rotation;
var last = 0;
var need = 1;
var past = 0;
var parts = 13;
var degres = 0;
var myCanvas = document.getElementById("diag");
myCanvas.width = 650;
myCanvas.height = 650;

var ctx = myCanvas.getContext("2d");

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function drawLine(ctx, startX, startY, endX, endY){
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#852431";
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("field").addEventListener("click", function() {
  if(need == 1){
    rotation = getRandomInt(720, 1800);
    root.style.setProperty('--end-rotate', (rotation + last) + 'deg');
    box.classList.add("anim");
    console.log(rotation);
    need = 0;
  }
});

box.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler () {
  box.classList.remove("anim");
  box.style.transform = ("rotate("+(rotation + last)+"deg)");  
  console.log(rotation);
  last += rotation;
  need = 1;
  parts--;
  draw()
} 
function draw(){
  past = 0;
  degres = 0;
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  for (var i= document.images.length; i-->0;)
    document.images[i].parentNode.removeChild(document.images[i]);
  for(var i = 360 / parts; i <= 361; i+=360/parts){
    var deg = toRadians(i);
    var img = new Image();
    img.style.transform = ("rotate("+(i + past) / 2+"deg)")
    var leftt = 260 * Math.sin((deg + degres) / 2);
    var topp = 260 * Math.cos((deg + degres) / 2);
    img.style.left = 290 + leftt;
    img.style.top = 305 - topp;

    img.id=toDegrees((deg + degres)/2);
    img.src = "https://raw.githack.com/Larong11/Esenin/main/file.png";
    document.getElementById("images").appendChild(img);
    drawLine(ctx, 325 + (325 * Math.sin(deg)),  325 - (325 * Math.cos(deg)),  325,  325);
    degres = toRadians(i);
    past = i;
  }
}

draw();