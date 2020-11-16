/*
* This code is the entry point that links my libraries functionality with the built in demonstration. Because of
* it not serving as an actual component of the library, everything here represents one way to use my library and
* can be changed depending on how the user wishes to use my library.
*/
import {FInterface} from "../visual/interface.js";
import {Particle} from "../calc/particles.js";

//Important variables.
var col = 80;
var row = 40;
var scaleFromParent = .8; //value that decides how large the visualization should be with respect to its parent element. .8 means 80%
var maxVectorLength = 15;
var instances = [];
var numInstances = 0;

//These objects are passed into every interval function to control them once they have already been called.
var isPaused = {pause: false}; 
var isTrail = {trail: false};

//The x equation that dictates the x component of each vector. Notice the parameters (X, Y, T) and their order.
//Every equation must follow the sequence of x component, y component and time as their parameter list.
function xEquation(X, Y, T){
    var V_0 = 1;
    var h = col;
    return Math.sinh(T)*Math.tan(T)*.01;
}

//The y equation of each vector. Again, notice the parameters and their order.
function yEquation(X, Y, T){
    return Math.sin(T)*.1; 
}

//This is the instance of FInterface, one of the library components, used to run my simulation. Every one of the parameters
//can be changed appropriatley depending on the wishes of the user. 
var temp = new FInterface(document.getElementById("CPlane"),scaleFromParent, col, row, xEquation, yEquation, isPaused);
temp.gridGen();
temp.gridPoints();

//The lines of code below serve to connect html elements and JS events with appropriate functionality to create the UI for my demonstration.
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
  document.addEventListener('mousedown', function (event) { //TAKEN FROM HERE https://stackoverflow.com/questions/880512/prevent-text-selection-after-double-click
    if (event.detail > 1) {
      event.preventDefault();
      // of course, you still do not know what you prevent here...
      // You could also check event.ctrlKey/event.shiftKey/event.altKey
      // to not prevent something useful.
    }
  }, false);

//The lines of code below create the final bits of functionality needed to run the UI components of the simulation.
temp.initVectors(xEquation, yEquation);
temp.drawVectors(maxVectorLength);
temp.initPartField();

//Allows users to left click on the vector field to spawn particles.
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