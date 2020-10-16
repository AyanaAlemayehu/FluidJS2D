class Interface{
    constructor(canvas, parentPercent, columns, rows){
        canvas.width = canvas.parentElement.offsetWidth*parentPercent;
        canvas.height = canvas.parentElement.offsetHeight*parentPercent;
        this.canvas = canvas;
        this.height = canvas.height;
        this.width = canvas.width;
        this.ctx = canvas.getContext("2d");
        this.map = [];
        for (var i = 0; i < rows; i++){
            this.map[i] = [];
            for (var k = 0; k < columns; k++){
                this.map[i][k] = {x:k,y:i};
            }
        }
    }
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
            ctx.strokeStyle = "rgb(" + (255/this.map.length)*i + ",0,0)";
            ctx.moveTo(0, i*(this.height/this.map.length));
            ctx.lineTo(this.width, i*(this.height/this.map.length));
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        for (var k = 0; k < this.map[0].length; k++){
            ctx.beginPath();
            ctx.strokeStyle = "rgb(0," + (255/this.map.length)*k + ",0)";
            ctx.moveTo(k*(this.width/this.map[0].length), 0);
            ctx.lineTo(k*(this.width/this.map[0].length), this.height);
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    }
    gridToggle(){
        if (this.gridOverlay.getAttribute("style", "visibility") == "visibility:hidden")
            this.gridOverlay.setAttribute("style","visibility:visible");
        else
            this.gridOverlay.setAttribute("style","visibility:hidden");
    }
    gridPoints(){
        for (var i = 0; i < this.map.length; i++){
            for (var k = 0; k < this.map[0].length; k++){
                this.ctxGrid.beginPath();
                this.ctxGrid.arc(k*(this.width/this.map[0].length), i*(this.height/this.map.length), 2, 0, 2*Math.PI);
                this.ctxGrid.lineWidth = 1;
                this.ctxGrid.strokeStyle = "rgb(0, 0, 0)";
                this.ctxGrid.stroke();
                // var coord = document.createElement("span"); i quit do this l8tr
                // coord.innerHTML = "(" + k + "," + i + ")";
                // coord.setAttribute("style", "position:absolute;left:" + k + "px");
                // this.gridOverlay.appendChild(coord);
            }
        }
    }
}

var temp = new Interface(document.getElementById("CPlane"),.8, 20, 20);
temp.gridGen();
temp.gridPoints();
