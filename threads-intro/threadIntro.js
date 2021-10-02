// Authors: Rezvan Joshaghani   rezvanjoshaghani@u.boisestate.edu
class Process{
    constructor(id){
        this.pid=id;
        this.status="ready";
        this.ax=0;
        this.bx=0;
        this.pc=0;
        this.i=0;
        this.countCopy=0;
        this.finished=false;
    }
    run(){
        if(!this.finished) {
            this.status = "Running";
            this.pc += 1;
            if (this.pc == 1) {
                this.ax = 0;
                this.drawChanges();
            } else if (this.pc == 2) {
                this.drawChanges();
            } else if (this.pc == 3) {
                this.countCopy = count;
                this.bx = count;
                this.drawChanges();
            } else if (this.pc == 4) {
                this.countCopy++;
                this.bx++;
                this.drawChanges();
            } else if (this.pc == 5) {
                count = this.countCopy;
                countText.text("Count= " + count);
                this.drawChanges();
            } else if (this.pc == 6) {
                this.ax++;
                this.drawChanges();
            } else if (this.pc == 7) {
                this.drawChanges();
            } else if (this.pc == 8) {
                if (this.ax < 5) {
                    this.drawChanges();
                    this.pc = 1;
                }
                else {
                    this.drawChanges();
                    this.end();
                    stage.find('#txt:p' + this.pid + 'pc').text(this.pc);


                }
            }
        }
    }

    stop(){
        //console.log("o hoy hoy");
        if(this.finished)
            return;
        this.status="Ready";
        stage.find('#prec'+this.pid).stroke('#555');
        stage.find('#txt:p'+this.pid+'stat').text(this.status);
        stage.find('#txt:p'+this.pid+'pc').text(this.pc);
        stage.find('#pstat'+this.pid).fill('#555');
        stage.find('#pstat'+this.pid).text("Status=Ready");
        layer.draw();
    }

    end(){
        this.status="Ended";
        this.finished=true;
        stage.find('#txt:p'+this.pid+'stat').text(this.status);
        stage.find('#prec'+this.pid).stroke('#555');
        stage.find('#pstat' + this.pid).text("Status=End");
        stage.find('#pstat' + this.pid).fill('red');
        layer.draw();
    }

    makeBold(id){
        for(let i=1;i<=8;i++){
            if(i!=id){
                stage.find('#prog'+this.pid+i).fontStyle('normal');
            }
            else{
                stage.find('#prog'+this.pid+id).fontStyle('bold');
            }
        }
    }

    drawChanges(){
        if(!this.finished){
            this.makeBold(this.pc);
            stage.find('#txt:p' + this.pid + 'reg').text('ax=' + this.ax + '\n' + 'bx=' + this.bx);
            stage.find('#txt:p' + this.pid + 'stat').text(this.status);
            stage.find('#txt:p' + this.pid + 'pc').text(this.pc);
            stage.find('#prec' + this.pid).stroke('#dd1514');
            stage.find('#pstat' + this.pid).fill('green');
            stage.find('#pstat' + this.pid).text("Status=Running");
            layer.draw();
        }
    }
}

function makeText(x,y,str,id) {

    return new Konva.Text({
        x: x,
        y: y,
        text: str,
        id: 'prog'+id,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000000',
        width: 300,
        padding: 20,
        // align: 'center',
    });

}

var runningProcess=1;



function runNextCommand() {
    if (runningProcess==1 && !poc1.finished)
        poc1.run();
    else if(runningProcess==2 && !poc2.finished)
        poc2.run();
    else{
        if(runningProcess==1)
            runningProcess=2;
        else if(runningProcess==2)
            runningProcess=1;
    }
}

function sendInterrupt() {
    //console.log("This means change");

    if (runningProcess==1){
        poc1.stop();
        poc2.drawChanges();
        runningProcess=2;
    }
    else if(runningProcess==2){
        poc2.stop();
        poc1.drawChanges();
        runningProcess=1;
    }

}

// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 1000,
    height: 1000
});

// then create layer
var layer = new Konva.Layer();


function drawRectWithText(x,y,w,h,str,fill,id) {
    let text = new Konva.Text({
        id: "txt:"+id,
        x:  x,
        y: y,
        text: str,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
    });

    let idH = new Konva.Rect({
        id: "rec:"+id,
        x: x,
        y: y,
        stroke: '#555',
        strokeWidth: 2,
        fill: fill,
        width: w,
        height: h,
        cornerRadius: 0,
    });

    layer.add(idH);
    layer.add(text);
}

var cellWidth=100;
var cellHeight=50;
var xStart=20;
var yStart=400;


drawRectWithText(xStart, yStart, cellWidth, cellHeight, "Process Id", "#82fff7","hpid");
drawRectWithText(xStart+cellWidth, yStart, cellWidth, cellHeight, "Status", "#82fff7","hstat");
drawRectWithText(xStart+2*cellWidth, yStart, cellWidth, cellHeight, "Registers", "#82fff7","hregs");
drawRectWithText(xStart+3*cellWidth, yStart, cellWidth, cellHeight, "Program \nCounter", "#82fff7","hpc");


drawRectWithText(xStart, yStart+cellHeight, cellWidth, cellHeight, "1", "#d29eff","p1");
drawRectWithText(xStart+cellWidth, yStart+cellHeight, cellWidth, cellHeight, "Ready", "#d29eff","p1stat");
drawRectWithText(xStart+2*cellWidth, yStart+cellHeight, cellWidth, cellHeight, "ax=0\nbx=0", "#d29eff","p1reg");
drawRectWithText(xStart+3*cellWidth, yStart+cellHeight, cellWidth, cellHeight, "0", "#d29eff","p1pc");


drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "2", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "Ready", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "ax=0\nbx=0", "#d29eff","p2reg");
drawRectWithText(xStart+3*cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "0", "#d29eff","p2pc");


var pt = new Konva.Text({
    x: xStart + 50,
    y: yStart+3*cellHeight+5,
    text: 'OS process table. Each line is a PCB.',
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pt);

var count=0;

var countText = new Konva.Text({
    x:  820,
    y: 120+30,
    text: 'Count= '+count,
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'black',
});

var memoryText = new Konva.Text({
    x:  820,
    y: 20,
    text: 'Memory',
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: 'black',
});


var memoryAddrText = new Konva.Text({
    x:  723,
    y: 120+35,
    text: '0xAA23',
    fontSize: 23,
    fontFamily: 'Calibri',
    fill: 'black',
});


layer.add(memoryText);
layer.add(memoryAddrText);


// since this text is inside of a defined area, we can center it using
// align: 'center'
var p1 = new Konva.Text({
    x: 20,
    y: 60,
    text:
        "Process 1\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});


var p2 = new Konva.Text({
    x: 240,
    y: 60,
    text:
        "Process 2\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
    // align: 'center',
});

var status1 = new Konva.Text({
    x:  20,
    y: 250+ 65,
    id:'pstat1',
    text: "status=Ready",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var status2 = new Konva.Text({
    x: 250,
    y: 250+ 65,
    id:'pstat2',
    text: "status=Ready",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var rect1 = new Konva.Rect({
    x: 20,
    y: 60,
    id:"prec1",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 200,
    height: 250,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var rect2 = new Konva.Rect({
    x: 240,
    y: 60,
    id:"prec2",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 200,
    height: 250,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});


var memoryW=150;
var memoryH=70;

var memory = new Konva.Rect({
    x: 800,
    y: 60+memoryH,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#46dd39',
    width: memoryW,
    height: memoryH,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 0,
});


var memoryUp = new Konva.Rect({
    x: 800,
    y: 60,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: memoryW,
    height: memoryH,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 0,
});

var memoryDown = new Konva.Rect({
    x: 800,
    y: 60+memoryH*2,
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: memoryW,
    height: memoryH,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 0,
});


var arrowUP = new Konva.Arrow({
    points: [750, 140, 750, 40],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 5,
});


var arrowDown = new Konva.Arrow({
    points: [750, 200, 750, 300],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 5,
});

//add the shapes to the layer
layer.add(rect1);
layer.add(p1);
layer.add(rect2);
layer.add(p2);
layer.add(status1);
layer.add(status2);
layer.add(memory);
layer.add(memoryUp);
layer.add(memoryDown);
layer.add(countText);
// layer.add(arrowUP);
// layer.add(arrowDown);

var prog=["1. mov \t ax \t 0" ,
    "2. loop:" ,
    "3. \t\t LD \t [0xAA23] \t bx" ,
    "4. \t\t ADD \t bx \t 1 ",
    "5. \t\t STR \t bx \t [0xAA23]" ,
    "6. \t\t ADD \t ax \t 1",
    "7. \t\t comp \t ax \t 5" ,
    "8. \t\t jnz \t loop "];

for (let i=0;i<prog.length;i++){
    let t=makeText(20,80+(i*20),prog[i],'1'+(i+1));
    layer.add(t)
}

for (let i=0;i<prog.length;i++){
    let t=makeText(240,80+(i*20),prog[i],'2'+(i+1));
    layer.add(t)
}



// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();

var lt=0;

var poc1=new Process(1);
var poc2=new Process(2);

var animRight = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;

    if (time - lt > 1000){
        lt=time;
        runNextCommand();

    }


}, layer);

var tempC=0;

var animWrong = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;

    if (time - lt > 500){
        lt=time;
        tempC++;
        runNextCommand();
        if(tempC==4){
            sendInterrupt();
        }

    }


}, layer);

function correctAnim() {
    animRight.start();
}

function incorrectAnim(){
    animWrong.start();
}

//animRight.start();