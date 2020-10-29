//entry js file for the demostration (not nicely formatted code right now lol)
import {FInterface} from "../visual/interface.js";
var temp = new FInterface(document.getElementById("CPlane"),.8, 160, 80);
temp.gridGen();
temp.gridPoints();
function xEquation(X,Y){
    var V_0 = 100;
    var h = 20;
    return (V_0/h)*Y;
}
function yEquation(X, Y){ //must have both x and y
    return X;
}
document.getElementById("gridToggleBtn").addEventListener("click", temp.gridToggle.bind(temp));
document.getElementById("vectorToggleBtn").addEventListener("click", temp.vectorToggle.bind(temp));
temp.initVectors(xEquation, yEquation);
temp.drawVectors(10);
//initialize all dVectors, connect them to each array for each point, and draw the vectors
