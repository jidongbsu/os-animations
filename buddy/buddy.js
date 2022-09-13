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

function drawTwoArrows(offset,id) {
	let arrowright = new Konva.Arrow({
    	points: [980, 65+offset, 1045, 65+offset],
    	pointerLength: 10,
    	pointerWidth: 10,
    	id: "arrowr:"+id,
    	fill: 'blue',
    	stroke: 'blue',
    	strokeWidth: 5,
	});

	let arrowleft = new Konva.Arrow({
    	points: [1045, 85+offset, 980, 85+offset],
    	pointerLength: 10,
    	pointerWidth: 10,
    	id: "arrowl"+id,
    	fill: 'red',
    	stroke: 'red',
    	strokeWidth: 5,
	});
    layer.add(arrowright);
    layer.add(arrowleft);
}

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

var size = new Konva.Text({
    x: 180,
    y: 5,
    id:'orig',
    text: "512 Bytes",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var cellWidth1=400;
var cellHeight=50;
var xStart1=10;
var yStart1=50;

var base = new Konva.Text({
    x: xStart1,
    y: 200,
    id:'base',
    text: "base",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var buddy = new Konva.Text({
    x: xStart1 + cellWidth1*0.5,
    y: 250,
    id:'buddy',
    text: "buddy",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// the large memory chunk
drawRectWithText(xStart1, yStart1, cellWidth1, cellHeight, "", "#82fff7","hpid");
// draw the first block header
drawRectWithText(xStart1, yStart1, 10, cellHeight, "", "#cd5c5c","blockheader");


var cellWidth=160;
var xStart=1120;
var yStart=50;

var headers = new Konva.Text({
    x: 750,
    y: 5,
    id:'virtmem',
    text: "Dummy Headers",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// draw code
xStart=680;
yStart=450;
cellWidth=300;
drawRectWithText(xStart, yStart-400, cellWidth, cellHeight, "avail[9] (tag=UNUSED, kval=9)", "#99dd","list 9");
drawRectWithText(1045, yStart-400, cellWidth, cellHeight, "block header (tag=FREE, kval=9)", "#99dd","node");

drawRectWithText(xStart, yStart-300, cellWidth, cellHeight, "avail[8] (tag=UNUSED, kval=8)", "#99dd","list 8");
drawRectWithText(xStart, yStart-200, cellWidth, cellHeight, "avail[7] (tag=UNUSED, kval=7)", "#99dd","list 7");
drawRectWithText(xStart, yStart-100, cellWidth, cellHeight, "avail[6] (tag=UNUSED, kval=6)", "#99dd","list 6");
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "avail[5] (tag=UNUSED, kval=5)", "#99dd","list 5");
drawRectWithText(xStart, yStart+100, cellWidth, cellHeight, "avail[4] (tag=UNUSED, kval=4)", "#69dd","list 4");
drawRectWithText(xStart, yStart+200, cellWidth, cellHeight, "avail[3] (tag=UNUSED, kval=3)", "#69dd","list 3");
drawRectWithText(xStart, yStart+300, cellWidth, cellHeight, "avail[2] (tag=UNUSED, kval=2)", "#69dd","list 2");
drawRectWithText(xStart, yStart+400, cellWidth, cellHeight, "avail[1] (tag=UNUSED, kval=1)", "#69dd","list 1");
drawRectWithText(xStart, yStart+500, cellWidth, cellHeight, "avail[0] (tag=UNUSED, kval=0)", "#69dd","list 0");

var arrowBase = new Konva.Arrow({
    points: [10, 195, 10, 100],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowbase",
    fill: 'orange',
    stroke: 'orange',
    strokeWidth: 5,
});

var arrowBuddy = new Konva.Arrow({
    points: [10+cellWidth1*0.5, 245, 10+cellWidth1*0.5, 100],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowbuddy",
    fill: 'orange',
    stroke: 'orange',
    strokeWidth: 5,
});

var arrowNext9 = new Konva.Arrow({
    points: [980, 65, 1045, 65],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownextstraight",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev9 = new Konva.Arrow({
    points: [1045, 85, 980, 85],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprevstraight",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowLastNext9 = new Konva.Arrow({
    points: [1345, 65, 1045, 30, 680, 65],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowbignext",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowFirstPrev9 = new Konva.Arrow({
    points: [680, 85, 845, 130, 1045, 85],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowbigprev",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext8 = new Konva.Arrow({
    points: [980, 165, 850, 120, 680, 165],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext8",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev8 = new Konva.Arrow({
    points: [680, 185, 630, 190, 680, 200],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev8",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext7 = new Konva.Arrow({
    points: [980, 265, 850, 220, 680, 265],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext7",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev7 = new Konva.Arrow({
    points: [680, 285, 630, 290, 680, 300],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev7",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext6 = new Konva.Arrow({
    points: [980, 365, 850, 320, 680, 365],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext6",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev6 = new Konva.Arrow({
    points: [680, 385, 630, 390, 680, 400],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev6",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext5 = new Konva.Arrow({
    points: [980, 465, 850, 420, 680, 465],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext5",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev5 = new Konva.Arrow({
    points: [680, 485, 630, 490, 680, 500],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev5",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext4 = new Konva.Arrow({
    points: [980, 565, 850, 520, 680, 565],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext4",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev4 = new Konva.Arrow({
    points: [680, 585, 630, 590, 680, 600],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev4",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext3 = new Konva.Arrow({
    points: [980, 665, 850, 620, 680, 665],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext3",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev3 = new Konva.Arrow({
    points: [680, 685, 630, 690, 680, 700],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev3",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext2 = new Konva.Arrow({
    points: [980, 765, 850, 720, 680, 765],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext2",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev2 = new Konva.Arrow({
    points: [680, 785, 630, 790, 680, 800],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev2",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext1 = new Konva.Arrow({
    points: [980, 865, 850, 820, 680, 865],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext1",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev1 = new Konva.Arrow({
    points: [680, 885, 630, 890, 680, 900],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev1",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowNext0 = new Konva.Arrow({
    points: [980, 965, 850, 920, 680, 965],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrownext0",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowPrev0 = new Konva.Arrow({
    points: [680, 985, 630, 990, 680, 1000],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev0",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowSearch = new Konva.Arrow({
    points: [580, 475, 665, 475],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowsearch",
    fill: '#e9967a',
    stroke: '#e9967a',
    strokeWidth: 5,
});

// add the layer to the stage
stage.add(layer);
layer.add(base);
layer.add(size);
layer.add(headers);
layer.add(arrowBase);
layer.add(arrowLastNext9);
layer.add(arrowFirstPrev9);
layer.add(arrowNext9);
layer.add(arrowPrev9);
layer.add(arrowNext8);
layer.add(arrowPrev8);
layer.add(arrowNext7);
layer.add(arrowPrev7);
layer.add(arrowNext6);
layer.add(arrowPrev6);
layer.add(arrowNext5);
layer.add(arrowPrev5);
layer.add(arrowNext4);
layer.add(arrowPrev4);
layer.add(arrowNext3);
layer.add(arrowPrev3);
layer.add(arrowNext2);
layer.add(arrowPrev2);
layer.add(arrowNext1);
layer.add(arrowPrev1);
layer.add(arrowNext0);
layer.add(arrowPrev0);
layer.draw();

var pc=1;

var arrowarray1 = [580, 475, 665, 475];
var newx = 450;
var newy = 455;

var search = new Konva.Text({
    x: 450,
    y: 455,
    id: "search",
    text: "search here",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

function movearrowUpsearch(){
    arrowarray1[1] = arrowarray1[1] - 100;
    arrowarray1[3] = arrowarray1[3] - 100;
	newy = newy - 100;
    stage.find('#arrowsearch').points(arrowarray1);
    stage.find('#search').y(newy);
}

function movearrowDownsplit(){
    arrowarray1[1] = arrowarray1[1] + 100;
    arrowarray1[3] = arrowarray1[3] + 100;
	newy = newy + 100;
    stage.find('#arrowsearch').points(arrowarray1);
    stage.find('#search').y(newy);
}

var nodetxty = yStart - 400;
var noderecy = yStart - 400;
var arrowarraynextstraight = [980, 65, 1045, 65];
var arrowarrayprevstraight = [1045, 85, 980, 85];
var arrowarraybignext = [1345, 65, 1045, 30, 680, 65];
var arrowarraybigprev = [680, 85, 845, 130, 1045, 85];

var arrowarraynext8 = [980, 165, 850, 120, 680, 165];
var arrowarrayprev8 = [680, 185, 630, 190, 680, 200];

var arrowarraynext7 = [980, 265, 850, 220, 680, 265];
var arrowarrayprev7 = [680, 285, 630, 290, 680, 300];

var arrowarraynext6 = [980, 365, 850, 320, 680, 365];
var arrowarrayprev6 = [680, 385, 630, 390, 680, 400];

var arrowarraynext5 = [980, 465, 850, 420, 680, 465];
var arrowarrayprev5 = [680, 485, 630, 490, 680, 500];

var arrowarraybuddy = [10+cellWidth1*0.5, 245, 10+cellWidth1*0.5, 100];

/* this runs when user clicks the button */
function origflow() {
    if(pc == 1){
		layer.add(search);
		layer.add(arrowSearch);
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
		movearrowUpsearch();
        layer.draw();
        pc=pc+1;
    }else if(pc == 3){
		movearrowUpsearch();
        layer.draw();
        pc=pc+1;
    }else if(pc == 4){
		movearrowUpsearch();
        layer.draw();
        pc=pc+1;
    }else if(pc == 5){
		movearrowUpsearch();
        layer.draw();
        pc=pc+1;
    }else if(pc == 6){
		/* draw another block header. */
		drawRectWithText(xStart1+cellWidth1*0.5, yStart1, 10, cellHeight, "", "#cd5c5c","blockheader");
		layer.add(arrowBuddy);
		layer.add(buddy);
        layer.draw();
        pc=pc+1;
    }else if(pc == 7){
		/* draw another block header. */
		nodetxty = nodetxty + 100;
		noderecy = noderecy + 100;
    	stage.find('#txt:node').y(nodetxty);
    	stage.find('#txt:node').text("block header (tag=FREE, kval=8)");
    	stage.find('#rec:node').y(noderecy);
		/* modify arrows */
		arrowarraynextstraight[1] = arrowarraynextstraight[1] + 100;
		arrowarraynextstraight[3] = arrowarraynextstraight[3] + 100;
    	stage.find('#arrownextstraight').points(arrowarraynextstraight);
		arrowarrayprevstraight[1] = arrowarrayprevstraight[1] + 100;
		arrowarrayprevstraight[3] = arrowarrayprevstraight[3] + 100;
    	stage.find('#arrowprevstraight').points(arrowarrayprevstraight);
		arrowarraybignext[1] = arrowarraybignext[1] + 100;
		arrowarraybignext[3] = arrowarraybignext[3] + 100;
		arrowarraybignext[5] = arrowarraybignext[5] + 100;
    	stage.find('#arrowbignext').points(arrowarraybignext);
		arrowarraybigprev[1] = arrowarraybigprev[1] + 100;
		arrowarraybigprev[3] = arrowarraybigprev[3] + 100;
		arrowarraybigprev[5] = arrowarraybigprev[5] + 100;
    	stage.find('#arrowbigprev').points(arrowarraybigprev);
		arrowarraynext8[1] = arrowarraynext8[1] - 100;
		arrowarraynext8[3] = arrowarraynext8[3] - 100;
		arrowarraynext8[5] = arrowarraynext8[5] - 100;
    	stage.find('#arrownext8').points(arrowarraynext8);
		arrowarrayprev8[1] = arrowarrayprev8[1] - 100;
		arrowarrayprev8[3] = arrowarrayprev8[3] - 100;
		arrowarrayprev8[5] = arrowarrayprev8[5] - 100;
    	stage.find('#arrowprev8').points(arrowarrayprev8);
		/* move down the search/split arrow */
		movearrowDownsplit();
    	stage.find('#search').text("add a new node here");
    	stage.find('#search').x(350);
        layer.draw();
        pc=pc+1;
    }else if(pc == 8){
		/* draw another block header. */
		drawRectWithText(xStart1+cellWidth1*0.25, yStart1, 10, cellHeight, "", "#cd5c5c","blockheader");
		arrowarraybuddy[0] = xStart1+cellWidth1*0.25;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.25;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.25);
        layer.draw();
        pc=pc+1;
    }else if(pc == 9){
		drawRectWithText(1045, yStart-200, cellWidth, cellHeight, "block header (tag=FREE, kval=7)", "#99dd","node");
		arrowarraynext7[0] = arrowarraynext7[0] + 365;
		arrowarraynext7[2] = arrowarraynext7[2] + 200;
    	stage.find('#arrownext7').points(arrowarraynext7);
		arrowarrayprev7[2] = arrowarrayprev7[2] + 200;
		arrowarrayprev7[3] = arrowarrayprev7[3] + 30;
		arrowarrayprev7[4] = arrowarrayprev7[4] + 365;
		arrowarrayprev7[5] = arrowarrayprev7[5] - 20;
    	stage.find('#arrowprev7').points(arrowarrayprev7);
		drawTwoArrows(200,"level7");
		/* move down the search/split arrow */
		movearrowDownsplit();
        layer.draw();
        pc=pc+1;
    }else if(pc == 10){
		/* draw another block header. */
		drawRectWithText(xStart1+cellWidth1*0.125, yStart1, 10, cellHeight, "", "#cd5c5c","blockheader");
		arrowarraybuddy[0] = xStart1+cellWidth1*0.125;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.125;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.125);
        layer.draw();
        pc=pc+1;
    }else if(pc == 11){
		drawRectWithText(1045, yStart-100, cellWidth, cellHeight, "block header (tag=FREE, kval=6)", "#99dd","node");
		arrowarraynext6[0] = arrowarraynext6[0] + 365;
		arrowarraynext6[2] = arrowarraynext6[2] + 200;
    	stage.find('#arrownext6').points(arrowarraynext6);
		arrowarrayprev6[2] = arrowarrayprev6[2] + 200;
		arrowarrayprev6[3] = arrowarrayprev6[3] + 30;
		arrowarrayprev6[4] = arrowarrayprev6[4] + 365;
		arrowarrayprev6[5] = arrowarrayprev6[5] - 20;
    	stage.find('#arrowprev6').points(arrowarrayprev6);
		drawTwoArrows(300,"level6");
		/* move down the search/split arrow */
		movearrowDownsplit();
        layer.draw();
        pc=pc+1;
    }else if(pc == 12){
		/* draw another block header. */
		drawRectWithText(xStart1+cellWidth1*0.0625, yStart1, 10, cellHeight, "", "#cd5c5c","blockheader");
		arrowarraybuddy[0] = xStart1+cellWidth1*0.0625;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.0625;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.0625);
        layer.draw();
        pc=pc+1;
    }else if(pc == 13){
		drawRectWithText(1045, yStart, cellWidth, cellHeight, "block header (tag=FREE, kval=5)", "#99dd","node");
		arrowarraynext5[0] = arrowarraynext5[0] + 365;
		arrowarraynext5[2] = arrowarraynext5[2] + 200;
    	stage.find('#arrownext5').points(arrowarraynext5);
		arrowarrayprev5[2] = arrowarrayprev5[2] + 200;
		arrowarrayprev5[3] = arrowarrayprev5[3] + 30;
		arrowarrayprev5[4] = arrowarrayprev5[4] + 365;
		arrowarrayprev5[5] = arrowarrayprev5[5] - 20;
    	stage.find('#arrowprev5').points(arrowarrayprev5);
		drawTwoArrows(400,"level5");
		/* move down the search/split arrow */
		movearrowDownsplit();
        layer.draw();
        pc=pc+1;
	}
}

/* vim: set ts=4: */
