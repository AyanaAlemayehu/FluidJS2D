// WHEN YOU CHANGE START T, YOU STOP THE PARTICLE FROM BEING IN SYNC WITH THE BACKGROUND VECTOR FIELD
class Particle{
    constructor(x, y, FInterface, deltaT, radius, startT = 0, trail = false, color = "black"){//START T NEEDA BE IN MILLISECONDS IS ADDED TO WHAT DATE GETTIME GIVES
        this.x = x;
        this.y = y;
        this.startT = new Date().getTime();
        this.tAdded = startT;
        this.deltaT = deltaT;//in milliseconds, literally just for setInterval
        this.radius = radius;
        this.trail = trail;
        this.color = color;
        this.FInterface = FInterface;
    }
    drawPart(){
        var FInterface = this.FInterface;
        FInterface.ctxParticle.beginPath();
        FInterface.ctxParticle.arc(this.x*FInterface.xStep, this.y*FInterface.yStep, this.radius, 0, 2 * Math.PI, false);
        FInterface.ctxParticle.fillStyle = this.color;
        FInterface.ctxParticle.fill();
    }
    increment(){
        var x = this.x;
        var y = this.y;
        var t = new Date().getTime() - this.startT + this.tAdded;//find out the ABSOLUTE time, then add the startT value the user inputted
        this.x += this.FInterface.vEqX(x, y, t*.001);//to turn into seconds for equations multiply by .001
        this.y += this.FInterface.vEqY(x, y, t*.001);//
        this.drawPart();
    }
    runInterval(){
        window.setInterval(this.increment.bind(this), this.deltaT);
    }

}
export{Particle}