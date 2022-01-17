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

// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 2000
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

var sct = new Konva.Text({
    x: 250,
    y: 5,
    id:'syscall',
    text: "System Call Table",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var cellWidth=160;
var cellHeight=50;
var xStart=120;
var yStart=50;

// original system call table
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "System Call\n Number", "#82fff7","hpid");
drawRectWithText(xStart+cellWidth, yStart, cellWidth, cellHeight, "Address", "#82fff7","hstat");
drawRectWithText(xStart+2*cellWidth, yStart, cellWidth, cellHeight, "System Call\n Function", "#82fff7","hregs");

drawRectWithText(xStart, yStart+cellHeight, cellWidth, 2*cellHeight, "0", "#d29eff","p1");
drawRectWithText(xStart+cellWidth, yStart+cellHeight, cellWidth, 2*cellHeight, "0xffffffff9f84e7c0", "#d29eff","p1stat");
drawRectWithText(xStart+2*cellWidth, yStart+cellHeight, cellWidth, 2*cellHeight, "sys_read", "#d29eff","p1reg");

drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "1", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "0xffffffff9f84e8b0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "sys_write", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "2", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+3*cellHeight, cellWidth, cellHeight, "0xffffffff9f84cae0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+3*cellHeight, cellWidth, cellHeight, "sys_open", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight, "3", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+4*cellHeight, cellWidth, cellHeight, "0xffffffff9f84cb40", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+4*cellHeight, cellWidth, cellHeight, "sys_close", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "16", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+5*cellHeight, cellWidth, cellHeight, "0xffffffff9f8634f0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+5*cellHeight, cellWidth, cellHeight, "sys_ioctl", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+6*cellHeight, cellWidth, cellHeight, "57", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+6*cellHeight, cellWidth, cellHeight, "0xffffffff9f69a500", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+6*cellHeight, cellWidth, cellHeight, "sys_fork", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+7*cellHeight, cellWidth, cellHeight, "59", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+7*cellHeight, cellWidth, cellHeight, "0xffffffff9f856ad0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+7*cellHeight, cellWidth, cellHeight, "sys_execve", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight, "60", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+8*cellHeight, cellWidth, cellHeight, "0xffffffff9f6a2070", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+8*cellHeight, cellWidth, cellHeight, "sys_exit", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+9*cellHeight, cellWidth, cellHeight, "62", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+9*cellHeight, cellWidth, cellHeight, "0xffffffff9f6b4140", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+9*cellHeight, cellWidth, cellHeight, "sys_kill", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+10*cellHeight, cellWidth, cellHeight, "78", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+10*cellHeight, cellWidth, cellHeight, "0xffffffff9f863ac0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+10*cellHeight, cellWidth, cellHeight, "sys_getdents", "#d29eff","p2reg");

var cellWidth=160;
var cellHeight=50;
var xStart=1120;
var yStart=50;

var newsct = new Konva.Text({
    x: 1240,
    y: 5,
    id:'newsyscall',
    text: "New System Call Table",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// new system call table
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "System Call\n Number", "#82fff7","hpid");
drawRectWithText(xStart+cellWidth, yStart, cellWidth, cellHeight, "Address", "#82fff7","hstat");
drawRectWithText(xStart+2*cellWidth, yStart, cellWidth, cellHeight, "System Call\n Function", "#82fff7","hregs");

drawRectWithText(xStart, yStart+cellHeight, cellWidth, 2*cellHeight, "0", "#d29eff","p1");
drawRectWithText(xStart+cellWidth, yStart+cellHeight, cellWidth, 2*cellHeight, "0xffffffff9f84e7c0", "#d29eff","p1stat");
drawRectWithText(xStart+2*cellWidth, yStart+cellHeight, cellWidth, 2*cellHeight, "sys_read", "#d29eff","p1reg");

drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "1", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "0xffffffff9f84e8b0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+2*cellHeight, cellWidth, cellHeight, "sys_write", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "2", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+3*cellHeight, cellWidth, cellHeight, "0xffffffff9f84cae0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+3*cellHeight, cellWidth, cellHeight, "sys_open", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight, "3", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+4*cellHeight, cellWidth, cellHeight, "0xffffffff9f84cb40", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+4*cellHeight, cellWidth, cellHeight, "sys_close", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "16", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+5*cellHeight, cellWidth, cellHeight, "0xffffffff9f8634f0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+5*cellHeight, cellWidth, cellHeight, "sys_ioctl", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+6*cellHeight, cellWidth, cellHeight, "57", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+6*cellHeight, cellWidth, cellHeight, "0xffffffff9f69a500", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+6*cellHeight, cellWidth, cellHeight, "sys_fork", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+7*cellHeight, cellWidth, cellHeight, "59", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+7*cellHeight, cellWidth, cellHeight, "0xffffffff9f856ad0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+7*cellHeight, cellWidth, cellHeight, "sys_execve", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight, "60", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+8*cellHeight, cellWidth, cellHeight, "0xffffffff9f6a2070", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+8*cellHeight, cellWidth, cellHeight, "sys_exit", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+9*cellHeight, cellWidth, cellHeight, "62", "#923eff","p2");
drawRectWithText(xStart+cellWidth, yStart+9*cellHeight, cellWidth, cellHeight, "0xffffffff9f6bfff0", "#923eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+9*cellHeight, cellWidth, cellHeight, "tesla_kill", "#923eff","p2reg");

drawRectWithText(xStart, yStart+10*cellHeight, cellWidth, cellHeight, "78", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+10*cellHeight, cellWidth, cellHeight, "0xffffffff9f863ac0", "#d29eff","p2stat");
drawRectWithText(xStart+2*cellWidth, yStart+10*cellHeight, cellWidth, cellHeight, "sys_getdents", "#d29eff","p2reg");

var vm = new Konva.Text({
    x: 800,
    y: 5,
    id:'virtmem',
    text: "Memory",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// draw code
xStart=750;
yStart=450;
cellWidth=200;
drawRectWithText(xStart, yStart-400, cellWidth, cellHeight, "", "#99dd","kernel code");
drawRectWithText(xStart, yStart-350, cellWidth, cellHeight, "tesla_kill() function code", "#99dd","tesla kill code");
drawRectWithText(xStart, yStart-300, cellWidth, cellHeight, "", "#99dd","kernel code");
drawRectWithText(xStart, yStart-250, cellWidth, cellHeight, "sys_kill() function code", "#99dd","sys kill code");
drawRectWithText(xStart, yStart-200, cellWidth, cellHeight, "", "#99dd","kernel code");
// user code
drawRectWithText(xStart, yStart-150, cellWidth, 3*cellHeight, "", "#69dd","user code");
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "mov $0x3e,%eax", "#69dd","kill");
drawRectWithText(xStart, yStart+1*cellHeight, cellWidth, cellHeight, "syscall", "#69dd","p2");
//drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "mov $0x10,%eax", "#99dd","ioctl");
//drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "syscall", "#99dd","p2");
//drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight, "mov $0x3b,%eax", "#99dd","execve");
//drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "syscall", "#99dd","p2");
drawRectWithText(xStart, yStart+100, cellWidth, 4*cellHeight, "", "#69dd","user code");

//instruction pointer
var arrowRight1 = new Konva.Arrow({
    points: [650, 475, 745, 475],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright1",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowRight2 = new Konva.Arrow({
    points: [20, 100, 115, 100],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright2",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

// add the layer to the stage
stage.add(layer);
layer.add(sct);
layer.add(newsct);
layer.add(vm);
layer.add(arrowRight1);
layer.add(arrowRight2);
layer.draw();

var pc=1;

var lt=0;

var arrowarray1 = [650, 475, 745, 475];
var arrowarray2 = [20, 100, 115, 100];

function movearrowDownindex(){
    arrowarray2[1] = 525;
    arrowarray2[3] = 525;
    stage.find('#arrowright2').points(arrowarray2);
}

function movearrowDownorig(){
    arrowarray1[1] = 525;
    arrowarray1[3] = 525;
    stage.find('#arrowright1').points(arrowarray1);
}

function movearrowUporig(){
    arrowarray1[1] = 225;
    arrowarray1[3] = 225;
    stage.find('#arrowright1').points(arrowarray1);
}

function origNext() {
    if(pc == 1){
        movearrowDownorig();
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
		movearrowDownindex();
        layer.draw();
        pc=pc+1;
    }else if(pc == 3){
        movearrowUporig();
        layer.draw();
    	oldflow.stop();
        pc=pc+1;
    }
}

var oldflow = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;

    if (time - lt > 500){
        lt=time;
        origNext();
    }
}, layer);

/* this runs when user clicks the button */
function origflow() {
    pc=1;
    arrowarray1[1] = 475;
    arrowarray1[3] = 475;
    stage.find('#arrowright1').points(arrowarray1);
    arrowarray2[0] = 20; 
    arrowarray2[1] = 100;
    arrowarray2[2] = 115;
	arrowarray2[3] = 100;
	stage.find('#arrowright2').points(arrowarray2);
	layer.draw();
    oldflow.start();
}

function movearrowDownnew(){
    arrowarray1[1] = 525;
    arrowarray1[3] = 525;
    stage.find('#arrowright1').points(arrowarray1);
}

function movearrowUpnew(){
    arrowarray1[1] = 125;
    arrowarray1[3] = 125;
    stage.find('#arrowright1').points(arrowarray1);
}

function newNext() {
	if(pc == 1){
		movearrowDownnew();
		layer.draw();
		pc=pc+1;
    }else if(pc == 2){
		movearrowDownindex();
        layer.draw();
        pc=pc+1;
	}else if(pc == 3){
		movearrowUpnew();
		layer.draw();
		pc=pc+1;
    	newflow.stop();
	}
}

var newflow = new Konva.Animation(function(frame) {
    var time = frame.time,
        timeDiff = frame.timeDiff,
        frameRate = frame.frameRate;

    if (time - lt > 500){
        lt=time;
        newNext();
    }
}, layer);

/* this runs when user clicks the button */
function hijackedflow() {
    pc=1;
	arrowarray1[1] = 475;
	arrowarray1[3] = 475;
	stage.find('#arrowright1').points(arrowarray1);
    arrowarray2[0] = 1020; 
    arrowarray2[1] = 100;
    arrowarray2[2] = 1115;
	arrowarray2[3] = 100;
	stage.find('#arrowright2').points(arrowarray2);
	layer.draw();
    newflow.start();
}

/* vim: set ts=4: */
