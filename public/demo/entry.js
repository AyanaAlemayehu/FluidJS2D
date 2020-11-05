//entry js file for the demostration (not nicely formatted code right now lol)
//THIS IS THE BIGGEST PLACE WHERE I WOULD HAVE HARDCODED STUFF
import {FInterface} from "../visual/interface.js";
import {Particle} from "../calc/particles.js";
var col = 80;
var row = 40;
var scaleFromParent = .8;
var maxVectorLength = 15;
var isPaused = {pause: false}; //EVERY INTERVAL FUNCTION WILL TAKE THIS AS INPUT SO I CAN CONTROL IT. IT IS A OBJECT SO I PASS A REFERNCE TO FUNCTIONS NOT A VALUE

function xEquation(X, Y, T){
    var V_0 = 1;
    var h = col;
    return (V_0/h)*Y*Math.cos(T);
}
function yEquation(X, Y, T){ //must have both x and y
    return X*.01*Math.sin(T);
}
var temp = new FInterface(document.getElementById("CPlane"),scaleFromParent, col, row, xEquation, yEquation, isPaused);
temp.gridGen();
temp.gridPoints();
document.getElementById("gridToggleBtn").addEventListener("click", temp.gridToggle.bind(temp));
document.getElementById("vectorToggleBtn").addEventListener("click", temp.vectorToggle.bind(temp));
document.getElementById("play").addEventListener("click", function(e) {
    e.preventDefault();
    isPaused.pause = false;
  });
document.getElementById("pause").addEventListener("click", function(e) {
    e.preventDefault();
    isPaused.pause = true;
  });
window.setInterval(function() {
    if(!isPaused.pause) {
      window.document.getElementById("timeOutput").innerHTML = "Seconds: " + parseInt(temp.t);
    }
  }, 100);

temp.initVectors(xEquation, yEquation);
temp.drawVectors(maxVectorLength);
temp.initPartField();
temp.runVFInterval(window);
var test = new Particle(50, 10, temp, 40, 2, isPaused);
var test2 = new Particle(50, 10, temp, 40, 2, isPaused, 1000, false, "red");
test.runInterval();
test2.runInterval();
//initialize all dVectors, connect them to each array for each point, and draw the vectors
