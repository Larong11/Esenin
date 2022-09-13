let box = document.getElementById("arrow");
let root = document.documentElement;
var rotation;
var last = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

addEventListener("click", function() {
  rotation = getRandomInt(400, 960);
  root.style.setProperty('--end-rotate', (rotation + last) + 'deg');
  box.classList.add("anim");
  console.log(rotation);
});

box.addEventListener("animationend", AnimationHandler, false);

function AnimationHandler () {
  box.classList.remove("anim");
  box.style.transform = ("rotate("+(rotation + last)+"deg)");  
  console.log(rotation);
  last = rotation;
}