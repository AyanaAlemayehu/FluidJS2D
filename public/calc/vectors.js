/*
* @summary class used for position vectors, and generally any vector that does not dynamically change.
*/
class pVector {
    /*
    *@class
    * @param xCoeff {int}: coefficient of the x component of the velocity field, or the coefficient of the i unit vector
    * @param yCoeff {int}: coefficient of the y component of the velocity field, or the coefficient of the j unit vector
    * @param xLoc {int}: x location of the vector, relative to the cartesian plane (NOT the pixel x location)
    * @param yLoc {int}: y location of the vector, again relative to the cartesian plane
    */
    constructor(xCoeff, yCoeff, xLoc, yLoc){// xLoc and yLoc are INTEGERS relative to the size of the entire canvas, using xStep and yStep to accomodate
        this.xLoc = xLoc;
        this.yLoc = yLoc;
        this.angle = Math.atan(yCoeff/xCoeff);
        this.mag = Math.sqrt(xCoeff**2 + yCoeff**2);
    }
    /*
    *@summary draws a vector using the calculated angle for direction and inputted length for visual length.
    * @param length: length of the vector. Is an integer, but will represent the length of the vetor in pixels. 
    */
    drawVector(length, FInterface){
        FInterface.ctxVector.beginPath();
        FInterface.ctxVector.lineWidth = 1;
        FInterface.ctxVector.moveTo(this.xLoc*FInterface.xStep, this.yLoc*FInterface.yStep );
        var endX = this.xLoc*FInterface.xStep  + length*Math.cos(this.angle);
        var endY = this.yLoc*FInterface.yStep  + length*Math.sin(this.angle);
        FInterface.ctxVector.lineTo(endX, endY);
        FInterface.ctxVector.stroke();
    }
}
export{pVector}