/*
* @summary This is the class used for position vectors, and generally any vector that does not dynamically change.
* @class
*   @param x: This is the coefficient of the x component, or the coefficient of the i unit vector
*   @param y: This is the coefficient of the y component, or the coefficient of the j unit vector
*/
class pVector {
    constructor(x, y, xLoc, yLoc){// xLoc and yLoc are INTEGERS relative to the size of the entire canvas, using xStep and yStep to accomodate
        this.xCoeff = x;
        this.yCoeff = y;
        this.xLoc = xLoc;
        this.yLoc = yLoc;
        this.angle = Math.atan(y/x);
        this.mag = Math.sqrt(x**2 + y**2);
    }
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

/*
* @summary This is the class used for dynamic vectors.
* @class
*   @param x: This is the term of the x component, or the term of the i unit vector
*   @param y: This is the term of the y component, or the term of the j unit vector
*/

class dVector {
    constructor(x, y, xLoc, yLoc){
        this.xFunction = x; //the function that determines the x component of velocity
        this.yFunction = y; //the function that determines the y component of velocity
        this.xLoc = xLoc;
        this.yLoc = yLoc;
    }
    getMagnitude(){//EVENTUALLY INCORPORATE t INTO THIS
        return Math.sqrt(this.xFunction(this.xLoc, this.yLoc)**2 + this.yFunction(this.xLoc, this.yLoc)**2);// currently functions must  only use onne dependendt variable 
    }
    getAngle(){
        return Math.atan(this.yFunction(this.xLoc, this.yLoc)/this.xFunction(this.xLoc, this.yLoc));
    }
    drawVector(length, FInterface){// length is in pixels
        var instanceVector = new pVector(this.xFunction(xLoc), this.yFunction(yLoc), this.xLoc, this.yLoc);
        instanceVector.drawVector(length, FInterface);
    }
}


// for the function Vx = V_0/h_1)*y*mu, draw out each direction vector of velocity at each point
//might have to deal with 1/0 in atan
//think ill have a UNIVERSAL TIME variable 