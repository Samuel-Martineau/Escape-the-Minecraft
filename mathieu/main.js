var paper1 = document.getElementById("paper1");
var paper2 = document.getElementById("paper2");
var paper3 = document.getElementById("paper3");
var npc1 = document.getElementById("npc1");
var npc2 = document.getElementById("npc2");
var npc3 = document.getElementById("npc3");

function paper1Appear() {
  npc1.style.display = "none";
  paper1.style.display = "block";
  paper1.style.left = "49%";
  paper1.style.top = "49%";
}

function paper2Appear() {
  npc2.style.display = "none";
  paper2.style.display = "block";
  paper2.style.left = "49%";
  paper2.style.top = "49%";
}

function paper3Appear() {
  npc3.style.display = "none";
  paper3.style.display = "block";
  paper3.style.left = "49%";
  paper3.style.top = "49%";
}
