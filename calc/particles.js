/*
* @summary This class is used to generate particles (the dots) that are used to simulate experimenting with the fluid simulation
*/
// WHEN YOU CHANGE startT, YOU STOP THE PARTICLE FROM BEING IN SYNC WITH THE BACKGROUND VECTOR FIELD
class Particle{
    /*
    *@class
    * @param x {int}: x location of the particle, relative to the cartesian plane (NOT the pixel x location)
    * @param y {int}: y location of the particle, again relative to the cartesian plane
    * @param FInterface {FInterface}: FInterface object used to run the fluid simulation
    * @param deltaT {int}: rate at which the interval function drawing the particle runs at
    * @param radius {int}: radius of the particle
    * @param pauser {object}: pausing object used to stop and resume the particles movement
    * @param startT {int}: starting time of the particles movement in the vector field. Defaults to zero
    * @param trail {boolean}: used to decide if particle leaves a trail in the particleOverlay
    * @param color {String}: color of the particle
    */
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

    // @summary draws the particle onto the particleOverlay canvas context
    drawPart(){
        var FInterface = this.FInterface;
        FInterface.ctxParticle.beginPath();
        FInterface.ctxParticle.arc(this.x*FInterface.xStep, this.y*FInterface.yStep, this.radius, 0, 2 * Math.PI, false);
        FInterface.ctxParticle.fillStyle = this.color;
        FInterface.ctxParticle.fill();
    }

    // @summary draws as well as increments the position and time components of the particle accordingly
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

    // @summary runs the increment() function through a window.setInterval function, using deltaT to judge how often it runs.
    //  @return {int}: returns the id of the setInterval call.
    runInterval(){
        return window.setInterval(this.increment.bind(this), this.deltaT);
    }

}
export{Particle}