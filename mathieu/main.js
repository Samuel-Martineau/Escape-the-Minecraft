var paper1 = document.getElementById("paper1");
var paper2 = document.getElementById("paper2");
var paper3 = document.getElementById("paper3");
var npc1 = document.getElementById("npc1");
var npc2 = document.getElementById("npc2");
var npc3 = document.getElementById("npc3");
var left1 = 35;
var top1 = 44;
var width1 = 3;
var left2 = 49;
var top2 = 44;
var width2 = 3;
var right3 = 34.2;
var top3 = 44;
var width3 = 3;
var middleCounter1 = 0;
var bottomCounter1 = 0;
var middleCounter2 = 0;
var bottomCounter2 = 0;
var middleCounter3 = 0;
var bottomCounter3 = 0;

function paper1Appear() {
  npc1.style.display = "none";
  paper1.style.display = "block";

  paper1center = setInterval(paper1ToMiddle, 10);

  setTimeout(function () {
    paper1bottom = setInterval(paper1ToBottom, 10);
  }, 2000);
}

function paper2Appear() {
  npc2.style.display = "none";
  paper2.style.display = "block";

  paper2center = setInterval(paper2ToMiddle, 10);

  setTimeout(function () {
    paper2bottom = setInterval(paper2ToBottom, 10);
  }, 2000);
}

function paper3Appear() {
  npc3.style.display = "none";
  paper3.style.display = "block";

  paper3center = setInterval(paper3ToMiddle, 10);

  setTimeout(function () {
    paper3bottom = setInterval(paper3ToBottom, 10);
  }, 2000);
}

function paper1ToMiddle() {
  left1 = left1 + 0.08;
  top1 = top1 - 0.1;
  width1 = width1 + 0.1;
  middleCounter1 = middleCounter1 + 1;

  paper1.style.left = left1 + "%";
  paper1.style.top = top1 + "%";
  paper1.style.width = width1 + "%";

  if (middleCounter1 == 100) {
    clearInterval(paper1center);
  }
}

function paper1ToBottom() {
  left1 = left1 - 0.12;
  top1 = top1 + 0.45;
  width1 = width1 - 0.03;
  bottomCounter1 = bottomCounter1 + 1;

  paper1.style.left = left1 + "%";
  paper1.style.top = top1 + "%";
  paper1.style.width = width1 + "%";

  if (bottomCounter1 == 100) {
    clearInterval(paper1bottom);
  }
}

function paper2ToMiddle() {
  left2 = left2 + 0.08;
  top2 = top2 - 0.1;
  width2 = width2 + 0.1;
  middleCounter2 = middleCounter2 + 1;

  paper2.style.left = left2 + "%";
  paper2.style.top = top2 + "%";
  paper2.style.width = width2 + "%";

  if (middleCounter2 == 100) {
    clearInterval(paper2center);
  }
}

function paper2ToBottom() {
  left2 = left2 - 0.12;
  top2 = top2 + 0.45;
  width2 = width2 - 0.03;
  bottomCounter2 = bottomCounter2 + 1;

  paper2.style.left = left2 + "%";
  paper2.style.top = top2 + "%";
  paper2.style.width = width2 + "%";

  if (bottomCounter2 == 100) {
    clearInterval(paper2bottom);
  }
}

function paper3ToMiddle() {
  right3 = right3 + 0.08;
  top3 = top3 - 0.1;
  width3 = width3 + 0.1;
  middleCounter3 = middleCounter3 + 1;

  paper3.style.right = right3 + "%";
  paper3.style.top = top3 + "%";
  paper3.style.width = width3 + "%";

  if (middleCounter3 == 100) {
    clearInterval(paper3center);
  }
}

function paper3ToBottom() {
  left3 = left3 - 0.12;
  top3 = top3 + 0.45;
  width3 = width3 - 0.03;
  bottomCounter3 = bottomCounter3 + 1;

  paper3.style.left = left3 + "%";
  paper3.style.top = top3 + "%";
  paper3.style.width = width3 + "%";

  if (bottomCounter3 == 100) {
    clearInterval(paper3bottom);
  }
}
