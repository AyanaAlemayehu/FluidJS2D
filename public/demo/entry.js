//entry js file for the demostration (not nicely formatted code right now lol)
//THIS IS THE BIGGEST PLACE WHERE I WOULD HAVE HARDCODED STUFF
import {FInterface} from "../visual/interface.js";
import {Particle} from "../calc/particles.js";
var col = 80;
var row = 40;
var scaleFromParent = .8;
var maxVectorLength = 15;
var isPaused = {pause: false}; //EVERY INTERVAL FUNCTION WILL TAKE THIS AS INPUT SO I CAN CONTROL IT. IT IS A OBJECT SO I PASS A REFERNCE TO FUNCTIONS NOT A VALUE
var isTrail = {trail: false};
var instances = [];
var numInstances = 0;
function xEquation(X, Y, T){
    var V_0 = 1;
    var h = col;
    return (V_0/h)*Y*T*.01;
}
function yEquation(X, Y, T){ //must have both x and y
    return 0.01*T; 
}
var temp = new FInterface(document.getElementById("CPlane"),scaleFromParent, col, row, xEquation, yEquation, isPaused);
temp.gridGen();
temp.gridPoints();
document.getElementById("gridToggleBtn").addEventListener("click", temp.gridToggle.bind(temp));
document.getElementById("vectorToggleBtn").addEventListener("click", temp.vectorToggle.bind(temp));
document.getElementById("play").addEventListener("click", function(e) {//TOOK THIS CODE FROM ONLINE EVEN THO IT WAS SIMPLE: https://stackoverflow.com/questions/21277900/how-can-i-pause-setinterval-functions
    e.preventDefault();
    isPaused.pause = false;
  });
document.getElementById("pause").addEventListener("click", function(e) {
    e.preventDefault();
    isPaused.pause = true;
  });
document.getElementById("trail").addEventListener("click", function(e) {
    e.preventDefault();
    isTrail.trail = !isTrail.trail;
    this.style.backgroundColor = (this.style.backgroundColor == "green") ? "rgb(180, 180, 180)" : "green";
  });
document.getElementById("clear").addEventListener("click", function(e) {
    e.preventDefault();
    instances.forEach(function(i){
      window.clearInterval(i[0]);
      i[1].ctxParticle.clearRect(0, 0, i[1].canvas.width, i[1].canvas.height);

    });
  });
window.setInterval(function() {
    if(!isPaused.pause) {
      window.document.getElementById("timeOutput").innerHTML = "Seconds: " + parseInt(temp.t);
    }
  }, 100);

  //THIS PROBABLY WILL CAUSE A BUG
  document.addEventListener('mousedown', function (event) { //TAKEN FROM HERE https://stackoverflow.com/questions/880512/prevent-text-selection-after-double-click
    if (event.detail > 1) {
      event.preventDefault();
      // of course, you still do not know what you prevent here...
      // You could also check event.ctrlKey/event.shiftKey/event.altKey
      // to not prevent something useful.
    }
  }, false);

temp.initVectors(xEquation, yEquation);
temp.drawVectors(maxVectorLength);
temp.initPartField();
document.getElementById("particleOverlay").addEventListener("click", function(e){
  var xMarg = window.getComputedStyle(this).marginLeft.substring(0,window.getComputedStyle(this).marginLeft.length - 2);
  var yMarg = window.getComputedStyle(this).marginTop.substring(0,window.getComputedStyle(this).marginTop.length - 2);
  var xCoord = parseInt(Math.round((e.clientX - xMarg)/temp.xStep));
  var yCoord = parseInt(Math.round((e.clientY - yMarg)/temp.yStep));
  var particle = new Particle(xCoord, row - yCoord, temp, 40, 2, isPaused, temp.t*1000, isTrail.trail, document.getElementById("Color").value ? document.getElementById("Color").value : "black");
  instances[numInstances] = [particle.runInterval(), temp];
  numInstances++;
});
temp.runVFInterval(window);
