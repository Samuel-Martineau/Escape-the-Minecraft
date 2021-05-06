var paper1 = document.getElementById("paper1");
var paper2 = document.getElementById("paper2");
var paper3 = document.getElementById("paper3");
var npc1 = document.getElementById("npc1");
var npc2 = document.getElementById("npc2");
var npc3 = document.getElementById("npc3");
var paper1center;
var paper1bottom;
var left1 = 35;
var top1 = 44;
var width1 = 3;
var counter1 = 0;

function paper1Appear() {
  npc1.style.display = "none";
  paper1.style.display = "block";

  paper1center = setInterval(paper1ToMiddle, 10);

  counter1 = 0;

  setTimeout(function () {
    paper1bottom = setInterval(paper1ToBottom, 10);
  }, 2000);
}

function paper2Appear() {
  npc2.style.display = "none";
  paper2.style.display = "block";
  paper2.style.left = "48%";
  paper2.style.top = "47%";
}

function paper3Appear() {
  npc3.style.display = "none";
  paper3.style.display = "block";
  paper3.style.left = "48%";
  paper3.style.top = "47%";
}

function paper1ToMiddle() {
  left1 = left1 + 0.08;
  top1 = top1 - 0.1;
  width1 = width1 + 0.1;
  counter1 = counter1 + 1;

  paper1.style.left = left1 + "%";
  paper1.style.top = top1 + "%";
  paper1.style.width = width1 + "%";

  if (counter1 == 100) {
    clearInterval(paper1center);
  }
}

function paper1ToBottom() {
  left1 = left1 - 0.05;
  top1 = top1 + 0.56;
  width1 = width1 - 0.03;
  counter1 = counter1 + 1;

  paper1.style.left = left1 + "%";
  paper1.style.top = top1 + "%";
  paper1.style.width = width1 + "%";

  if (counter1 == 100) {
    clearInterval();
  }
}
