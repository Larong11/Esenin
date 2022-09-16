var arrow = document.getElementById("arrow");
var root = document.documentElement;
var cnv = document.getElementById("diag");
var ctx = cnv.getContext('2d');
var field = document.getElementById("field")
var width = field.clientWidth;
var height = field.clientHeight;

cnv.width = width;
cnv.height = height;

var teams = [7, 7];
var team = 0;

var rotation;
var last = 0;
var need = 1;
var parts = 13;
var degres = 0;
var rand;
var isQuestion = 0;
var win = 0;

var quests = [
  "Какое дерево  у Дома-музея С.Есенина в с.Константиново стало памятником живой природы?",
  "Собаке какого артиста Есенин посвятил стихотворение, которое начинается так: «Дай, Джим, на счастье лапу мне»?",
  "Один из современников вспоминал о том, как С.Есенин, впервые приехав в Петроград в 1915г., привез А.Блоку стихи, завернутые … Во что?",
  "К кому обращены эти строки Есенина? <br> Мечтая о могучем даре <br> Того, кто русской стал судьбой, <br> Стою я на Тверском бульваре, <br> Стою и говорю с собой.",
  "Осенью 1921 года Есенин познакомился с ней, её называли «царицей жеста», «гениальной босоножкой», в её танце видели революционный смысл. Через полгода они поженились. Вместе они отправились в Европу, затем в США. Кто она?",
  "Кому поэт посвятил цикл стихотворений «Любовь хулигана»? Почему её имя «звенит, словно августовская прохлада»?",
  "Кто сказал о С.Есенине: «Сергей Есенин не столько человек, сколько орган, созданный природой исключительно для поэзии, для выражения неисчерпаемо «печали полей», любви ко всему живому в мире и милосердия, которое – более всего иного – заслужено человеком».",
  "Какую историческую поэму, посвященную крестьянской войне 1773-1775 годов, Есенин написал в 1921году?",
  "Под влиянием какого произведения С.Есенин написал стихотворение «Не жалею, не зову, не плачу…»?",
  "О каком произведении Есенин говорил: «…лучшее из всего, что я написал»?",
  "Кто сказал о стихах Есенина следующие слова: «Свежие, чистые, голосистые»?",
  "В 1916 году С.Есенин посетил в Царском Селе Н.Гумилева и А.Ахматову и прочел известное стихотворение, которое поразило поэтессу своим пророческим характером. Она не ошиблась – жизнь поэта действительно оказалась и скоротечной, и трагичной… Какое это было стихотворение?",
  "В сентябре 1925 года, обращаясь к сестре Шуре, Есенин пишет стихотворение, в котором формулируется мысль о том, что человек на земле лишь случайный гость. Вспомните первую строчку стихотворения.",
  "«Низкий дом с голубыми ставнями, // Не забыть мне тебя никогда…» Кому посвящено это стихотворение?",
  "Как назывался первый сборник стихов Есенина? Сколько стихотворений в него входило?"
]
var ans = [
  [["Берёза", "Клён", "Тополь", "Ясень"], 
            2],
  [["Ф.Шаляпин", "В.Мейерхольд", "В.Качалов", "Г.Пирогов"], 
            2],
  [["Деревенский платок", "Холщовая ткань", "Старая газета", "Собственный шарф"], 
            0],
  [["Н.Гоголь", "В. Маяковский", "М. Горький", "А.Пушкин"], 
            3],
  [["Зинаида Гиппиус", "Софья Толстая", "Зинаида Райх", "Айседора Дункан"], 
            3],
  [["Галина Бениславская", "Августа Миклашевская ", "Анна Снегина ", "Лидия Кашина"], 
            1],
  [["А.Блок", "В.Маяковский", "М.Горький ", "Б.Клюев"], 
            2],
  [["«Песнь о Евпатии Коловрате»", "«Марфа Посадница»", "«Страна негодяев»", "«Пугачев»"], 
            3],
  [["Н.Некрасов «Русские женщины»", "А.Пушкин «Зимний вечер»", "Н.Гоголь «Мертвые души» ", "Ф.Тютчев «Фонтан»"], 
            2],
  [["«Анна Снегина»", "«Пугачёв»", "«Чёрный человек»", "Поэма о 36»"], 
            0],
  [["А.Мариенгоф", "С.Городецкий", "В.Брюсов", "А.Блок"], 
            3],
  [["«Край любимый! Сердцу снятся…» ", "«Я последний поэт деревни»", "«Я иду долиной»", "«До свиданья, друг  мой, до свиданья»"], 
            0],
  [["«Ах, как много на свете кошек»", "«В этом мире я только прохожий»", "«Заметался пожар голубой»", "«Мне грустно на тебя смотреть»"], 
            1],
  [["И.Я. Смирнов (отец Иоанн)", "Ф.А.Титов (дед поэта по матери)", "Н.О.Есенин (дед поэта по отцу)", "И.М.Власов (первый учитель)"], 
            0],
  [["Троицыно утро», 35 стихотворений", "«Рождество», 38 стихотворений", "« Радуница», 33 стихотворения", "«Успение», 32 стихотворения"], 
            2]
]

var done = [];


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

function makeQuestion(i){
  var questionback = document.createElement('div');
  questionback.classList.add("questionback");
  questionback.id = "questionn";

  var question = document.createElement('div');
  question.classList.add("question")

  var quest = document.createElement('text');
  quest.innerHTML = quests[i];

  var but1 = document.createElement('text');
  but1.classList.add("button");
  but1.classList.add("b1");
  but1.id = "b1"
  but1.nodeType = "button";
  but1.innerText = ans[i][0][0];

  var but2 = document.createElement('text');
  but2.classList.add("button");
  but2.classList.add("b2");
  but2.id = "b2"
  but2.nodeType = "button";
  but2.innerText = ans[i][0][1];

  var but3 = document.createElement('text');
  but3.classList.add("button");
  but3.classList.add("b3");
  but3.id = "b3"
  but3.nodeType = "button";
  but3.innerText = ans[i][0][2];

  var but4 = document.createElement('text');
  but4.classList.add("button");
  but4.classList.add("b4");
  but4.id = "b4"
  but4.nodeType = "button";
  but4.innerHTML = ans[i][0][3];

  question.appendChild(quest);
  question.appendChild(but1);
  question.appendChild(but2);
  question.appendChild(but3);
  question.appendChild(but4);
  questionback.appendChild(question);
  document.getElementById("body").appendChild(questionback);
  console.log(ans[i])
  done.push(i);
  console.log(i);
  console.log(questionback);
  document.getElementById("b1").addEventListener("click", function(){console.log("b1"); checkAnswer(0);});
  document.getElementById("b2").addEventListener("click", function(){console.log("b2"); checkAnswer(1);});
  document.getElementById("b3").addEventListener("click", function(){console.log("b3"); checkAnswer(2);});
  document.getElementById("b4").addEventListener("click", function(){console.log("b4"); checkAnswer(3);});
}

function checkAnswer(clicked_but){
  document.getElementById("b"+(ans[rand][1] + 1)).classList.add("right");
  let what_team = document.getElementById("team"+(team + 1)+"_score");
  console.log(what_team);
  console.log((team + 1)+"-"+teams[team]);
  if (ans[rand][0][clicked_but] != ans[rand][0][ans[rand][1]]){ 
    document.getElementById("b"+(clicked_but + 1)).classList.add("wrong");
    document.getElementById("team"+((!team) + 1)+"_score").removeChild(document.getElementById(((!team) + 1)+"-"+teams[!team + 1 - 1]));
    teams[!team + 1 - 1]--;
    wrong_audio.play();
  }
  else {
    document.getElementById("team"+(team + 1)+"_score").removeChild(document.getElementById((team + 1)+"-"+teams[team]));
    cor_audio.play();
    teams[team]--;
  }
  isQuestion = 0;
  team = !team + 1 - 1;
  setTimeout(() => {document.getElementById("body").removeChild(document.getElementById("questionn"))}, 3500)
}


function intervalTrigger() {
  return setInterval(game(), 1000/15)
}
function winer(){
  if(teams.indexOf(0) == 1 || teams.indexOf(0) == 0){
    let body = document.getElementById("body");
    let win_window = document.createElement("win");
    win_window.innerHTML = "Команда  " + (teams.indexOf(0) + 1) + "<br> выиграла"
    body.appendChild(win_window);
    window.clearInterval(idInter);
    win_audio.play();
    return;
  }
}

var idInter = intervalTrigger();
var win_audio = new Audio('win.mp3');

var cor_audio = new Audio("correct.mp3");

var wrong_audio = new Audio("wrong.mp3");

var rotate_audio = new Audio("rotate.mp3");

function game(){
  winer();
  document.getElementById("field").addEventListener("click", function() {
    winer();
    if(need == 1){
      rotation = getRandomInt(720, 1800);
      root.style.setProperty('--end-rotate', (rotation + last) + 'deg');
      arrow.classList.add("anim");
      console.log(rotation);
      need = 0;
      rotate_audio.play();
    }
  });
  
  arrow.addEventListener("animationend", AnimationHandler, false);
  
  function AnimationHandler () {
    winer();
    arrow.classList.remove("anim");
    arrow.style.transform = ("rotate("+(rotation + last)+"deg)");  
    console.log(rotation);
    last += rotation;
    need = 1;
    parts--;
    rand = getRandomInt(0, 14);
    draw();
    while (done.indexOf(rand) != -1){
      rand = getRandomInt(0, 14);
    }
    if(isQuestion == 0) makeQuestion(rand);
    isQuestion = 1;
  } 
  
  draw();
  
}

function draw(){
  winer();
  let past = 0;
  degres = 0;
  ctx.clearRect(0, 0, cnv.width, cnv.height);
  for (var i= document.images.length; i-->0;)
    document.images[i].parentNode.removeChild(document.images[i]);
  for(var i = 360 / parts; i <= 361; i+=360/parts){
    var deg = toRadians(i);
    var img = new Image();
    img.style.transform = ("rotate("+(i + past) / 2+"deg)")
    var leftt = width / 2.5 * Math.sin((deg + degres) / 2); //260
    var topp = width / 2.5 * Math.cos((deg + degres) / 2); //260
    img.style.left = width / 2.3556 + leftt; //290
    img.style.top = width / 2.17 - topp; //305

    img.id=toDegrees((deg + degres)/2);
    img.src = "https://raw.githack.com/Larong11/Esenin/main/file.png";
    document.getElementById("images").appendChild(img);
    drawLine(ctx, width/2 + (width/2 * Math.sin(deg)),  width/2 - (width/2 * Math.cos(deg)),  width/2,  width/2);
    degres = toRadians(i);
    past = i;
    console.log(width, height);
  }
}

draw();