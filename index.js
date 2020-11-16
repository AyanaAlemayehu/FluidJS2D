module.exports = {
    FInterface: class FInterface{
        /*
        *@class
        * @param canvas {canvas element}: canvas element the fluid simulation will reference in its operation.
        * @param parentPercent {int}: factor the fluid simulation will use to scale with the canvas element's parent element
        * @param colums {int}: The number of columns
        * @param rows {int}: The number of rows
        * @param vEqX {function}: the x velocity equation
        * @param vEqY {function}: the y velocity equation
        * @param pauser {object}: the object used to pause all relevant interval functions (must have a pauser.pause boolean variable)
        */
        constructor(canvas, parentPercent, columns, rows, vEqX, vEqY, pauser){
            canvas.width = canvas.parentElement.offsetWidth*parentPercent;
            canvas.height = canvas.parentElement.offsetHeight*parentPercent;
            this.timeOffset = 0;
            this.pauser = pauser;
            this.canvas = canvas;
            this.height = canvas.height;
            this.width = canvas.width;
            this.xStep = canvas.width/columns;//steps used to convert raw pixels into cartesian coordinates
            this.yStep = canvas.height/rows;  //steps used to convert raw pixels into cartesian coordinates
            this.vEqX = vEqX;
            this.vEqY = vEqY;
            this.ctx = canvas.getContext("2d");
            this.map = [];
            this.maxMagnitude = 0;
            var dateObject = new Date();
            this.startT = dateObject.getTime();
            for (var i = 0; i < rows; i++){
                this.map[i] = [];
                for (var k = 0; k < columns; k++){
                    this.map[i][k] = {x:k,y:i};
                }
            }
        }
        // @summary generates the visual grid
        gridGen(){
            var gridOverlay = document.createElement("canvas");
            this.gridOverlay = gridOverlay;
            gridOverlay.setAttribute("id","gridOverlay");
            gridOverlay.width = this.width;
            gridOverlay.height = this.height;
            gridOverlay.setAttribute("class","grid");
            var ctx = gridOverlay.getContext("2d");
            this.ctxGrid = ctx;
            this.canvas.parentElement.appendChild(gridOverlay);
    
            for (var i = 0; i < this.map.length; i++){
                ctx.beginPath();
                ctx.moveTo(0, i*(this.height/this.map.length));
                ctx.lineTo(this.width, i*(this.height/this.map.length));
                ctx.lineWidth = 1;
                ctx.stroke();
            }
            for (var k = 0; k < this.map[0].length; k++){
                ctx.beginPath();
                ctx.moveTo(k*(this.width/this.map[0].length), 0);
                ctx.lineTo(k*(this.width/this.map[0].length), this.height);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    
        // @summary initializes the vectors and places each in their appropriate position in the 2D map array
        initVectors(){
            var vEqX = this.vEqX;
            var vEqY = this.vEqY;
            var vectorOverlay = document.createElement("canvas");
            this.vectorOverlay = vectorOverlay;
            vectorOverlay.setAttribute("id","vectorOverlay");
            vectorOverlay.width = this.width;
            vectorOverlay.height = this.height;
            vectorOverlay.setAttribute("class","vectorOverlay");
            var ctx = vectorOverlay.getContext("2d");
            this.ctxVector = ctx;
            this.canvas.parentElement.appendChild(vectorOverlay);
            for (var i = 0; i < this.map.length; i++){
                for (var k = 0; k < this.map[0].length; k++){
                    this.map[i][k].vector = new pVector(vEqX(this.map[i][k].x, this.map[i][k].y, 0), vEqY(this.map[i][k].x,this.map[i][k].y, 0), this.map[i][k].x, this.map[i][k].y);
                    // the if conditional below is used to find out the largest magnitude vector to scale all other vectors
                    if (this.maxMagnitude < this.map[i][k].vector.mag)
                        this.maxMagnitude = this.map[i][k].vector.mag;
                }
            }
            
        }
    
        //@summary updates the vector field, takes into account whether or not the simulation is paused.
        updateVectorField(){
            if (!this.pauser.pause){
                var vEqX = this.vEqX;
                var vEqY = this.vEqY;
                var dateObject = new Date();
                this.ctxVector.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.t = (dateObject.getTime() - this.startT)*.001 + this.timeOffset;
                for (var i = 0; i < this.map.length; i++){
                    for (var k = 0; k < this.map[0].length; k++){
                        this.map[i][k].vector = new pVector(vEqX(this.map[i][k].x, this.map[i][k].y, this.t), vEqY(this.map[i][k].x,this.map[i][k].y, this.t), this.map[i][k].x, this.map[i][k].y);
                        if (this.maxMagnitude < this.map[i][k].vector.mag) //finds out what the longest vector is
                            this.maxMagnitude = this.map[i][k].vector.mag;
                    }
                }
                this.drawVectors(10);
            }else if (this.pauser.pause){
                this.timeOffset = this.t;
                this.startT = new Date().getTime();
            }
        }
    
        //@summary runs the updateVectorField function, using window.setInterval to update the vector field every tenth of a second
        // @param window {window object}: the window the fluid simulaton is running in
        runVFInterval(window){
            window.setInterval(this.updateVectorField.bind(this), 100);
        }
    
        //@summary initializes the particle field
        initPartField(){
            var particleOverlay = document.createElement("canvas");
            this.particleOverlay = particleOverlay;
            particleOverlay.setAttribute("id","particleOverlay");
            particleOverlay.width = this.width;
            particleOverlay.height = this.height;
            particleOverlay.setAttribute("class","particleOverlay");
            var ctx = particleOverlay.getContext("2d");
            this.ctxParticle = ctx;
            this.canvas.parentElement.appendChild(particleOverlay);
        }
    
        //@summary draws the vectors contained in the 2D map array.
        // @param length {int}: how long the longest vector should be (in pixels)
        drawVectors(length){//how long you want the longest vector to be in pixels
            for (var i = 0; i < this.map.length; i++){
                for (var k = 0; k < this.map[0].length; k++){
                    this.map[i][k].vector.drawVector(length*(this.map[i][k].vector.mag/this.maxMagnitude), this)//make longest the largest mag vector
                }
            }
        }
    
        //@summary toggles the visual display of the vector field by toggling the css visibility attribute of the vectorOverlay html element
        vectorToggle(){
            if (this.vectorOverlay.getAttribute("style", "visibility") == "visibility:hidden")
                this.vectorOverlay.setAttribute("style","visibility:visible");
            else
                this.vectorOverlay.setAttribute("style","visibility:hidden");
        }
        
        //@summary toggles the visual display of the grid by toggling the css visibility attribute of the gridOverlay html element
        gridToggle(){
            console.log(this);
            if (this.gridOverlay.getAttribute("style", "visibility") == "visibility:hidden")
                this.gridOverlay.setAttribute("style","visibility:visible");
            else
                this.gridOverlay.setAttribute("style","visibility:hidden");
        }
    
        //@summary generates grid points at intersections of the rows and column lines of the grid.
        gridPoints(){
            for (var i = 0; i < this.map.length; i++){
                for (var k = 0; k < this.map[0].length; k++){
                    this.ctxGrid.beginPath();
                    this.ctxGrid.arc(k*(this.width/this.map[0].length), i*(this.height/this.map.length), 1.5, 0, 2*Math.PI);
                    this.ctxGrid.lineWidth = 1;
                    this.ctxGrid.strokeStyle = "rgb(0, 0, 0)";
                    this.ctxGrid.stroke();
                }
            }
        }
    }
}