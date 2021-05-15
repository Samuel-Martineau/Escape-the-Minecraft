var paper1 = document.getElementById("paper1");
var paper2 = document.getElementById("paper2");
var paper3 = document.getElementById("paper3");
var paper = document.getElementById("paper");
var npc1 = document.getElementById("npc1");
var npc2 = document.getElementById("npc2");
var npc3 = document.getElementById("npc3");
var paper1Visible = false;
var paper2Visible = false;
var paper3Visible = false;
var letterList1 = ["e", "p", "a", "h", "b", "a", "l", "t"];
var letterList2 = ["t", "e", "p", "a", "a", "h", "l", "b"];
var letterList3 = ["b", "a", "p", "l", "a", "h", "t", "e"];
var letterChoice = 0;
var letterBox = document.getElementById("letterBox");
var letterSpots = [
  document.getElementById("letterSpot0"),
  document.getElementById("letterSpot1"),
  document.getElementById("letterSpot2"),
  document.getElementById("letterSpot3"),
  document.getElementById("letterSpot4"),
  document.getElementById("letterSpot5"),
  document.getElementById("letterSpot6"),
  document.getElementById("letterSpot7"),
];

function paper1Appear() {
  npc1.style.display = "none";
  paper1.style.display = "block";

  paper1.classList.add("paper1Animation");

  paper1Visible = true;

  if (paper1Visible == true && paper2Visible == true && paper3Visible == true) {
    setTimeout(function () {
      paperAppear();
    }, 4500);
  }
}

function paper2Appear() {
  npc2.style.display = "none";
  paper2.style.display = "block";

  paper2.classList.add("paper2Animation");

  paper2Visible = true;

  if (paper1Visible == true && paper2Visible == true && paper3Visible == true) {
    setTimeout(function () {
      paperAppear();
    }, 4500);
  }
}

function paper3Appear() {
  npc3.style.display = "none";
  paper3.style.display = "block";

  paper3.classList.add("paper3Animation");

  paper3Visible = true;

  if (paper1Visible == true && paper2Visible == true && paper3Visible == true) {
    setTimeout(function () {
      paperAppear();
    }, 4500);
  }
}

function paperAppear() {
  paper.style.display = "block";
  paper.classList.add("paperAnimation1");

  setTimeout(function () {
    paper1.style.display = "none";
    paper2.style.display = "none";
    paper3.style.display = "none";
  }, 2000);
}

function openPaper() {
  paper.classList.remove("fullPaper");
  paper.classList.remove("paperAnimation1");
  paper.classList.add("paperAnimation2");

  letterBox.style.display = "block";

  paper.onclick = "";

  // letterChoice = Math.ceil(Math.random() * 3);
  letterChoice = 1;

  if (letterChoice == 1) {
    letterSpots.forEach((letterSpot, index) => {
      letterSpot.innerText = letterList1[index];
    });
  } else if (letterChoice == 2) {
  } else if (letterChoice == 3) {
  }
}
