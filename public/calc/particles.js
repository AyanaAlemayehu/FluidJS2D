// WHEN YOU CHANGE START T, YOU STOP THE PARTICLE FROM BEING IN SYNC WITH THE BACKGROUND VECTOR FIELD
// ERROR WHERE PARTICLES DISSAPPEAR IN TIME DEPENDENT VECTOR FIELDS WHEN TIME IS PAUSED
class Particle{
    constructor(x, y, FInterface, deltaT, radius, pauser, startT = 0, trail = false, color = "black"){//START T NEEDA BE IN MILLISECONDS IS ADDED TO WHAT DATE GETTIME GIVES
        this.x = x;
        this.y = y;
        this.startT = new Date().getTime();
        this.tAdded = startT;
        this.deltaT = deltaT;//in milliseconds, literally just for setInterval
        this.radius = radius;
        this.pauser = pauser;
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
        if (!this.trail){
            //this.FInterface.ctxParticle.clearRect(x - this.radius, y - this.radius, x + 2*this.radius, y + 2*this.radius);
            this.FInterface.ctxParticle.beginPath();
            this.FInterface.ctxParticle.clearRect(this.x*this.FInterface.xStep - 1 - this.radius, this.y*this.FInterface.yStep - 1 - this.radius, 3*this.radius, 3*this.radius);//the -1 gets rid of floating point errors
            // this.FInterface.ctxParticle.fill();
            //this.FInterface.ctxParticle.clearRect(0, 0, this.FInterface.canvas.width, this.FInterface.canvas.height);
        }
        if (!this.pauser.pause){
            var x = this.x;
            var y = this.y;
            this.t = new Date().getTime() - this.startT + this.tAdded;//find out the ABSOLUTE time, then add the startT value the user inputted
            this.x += this.FInterface.vEqX(x, y, this.t*.001);//to turn into seconds for equations multiply by .001
            this.y += this.FInterface.vEqY(x, y, this.t*.001);//
            this.drawPart();
        }else if (this.pauser.pause){
            this.tAdded = this.t ? this.t : this.FInterface.t; //this is supposed to fix the error where particles disappear in time dependent vector fields
            this.startT = new Date().getTime();
            this.drawPart();
        }
    }
    runInterval(){
        return window.setInterval(this.increment.bind(this), this.deltaT);
    }

}
export{Particle}