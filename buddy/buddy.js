// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 1500,
    height: 1100,
});

// then create layer
var layer = new Konva.Layer();

// add the layer to the stage
stage.add(layer);

// we use these two arrows on the doubly linked list to connect nodes.
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
    	id: "arrowl:"+id,
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
    y: 5,
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

var p = new Konva.Text({
    x: xStart1,
    y: 300,
    id:'p',
    text: "p (let p point to the block header we just found)",
    //text: "p (malloc(1) returns p)",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// the large memory chunk
drawRectWithText(xStart1, yStart1, cellWidth1, cellHeight, "", "#82fff7","hpid");

// draw the first block header, this should be there in the initial state: i.e., it's created in buddy_init().
// drawRectWithText(xStart1, yStart1, 10, cellHeight, "", "#cd5c5c","bh9");

var txtbh9 = new Konva.Text({
        id: "txt:bh9",
        x:  20,
        y: 120,
        text: "",
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
});

var recbh9 = new Konva.Rect({
        id: "rec:bh9",
        x: xStart1,
        y: yStart1,
        stroke: '#555',
        strokeWidth: 2,
        fill: '#cd5c5c',
        width: 10,
        height: cellHeight,
        cornerRadius: 0,
});

layer.add(txtbh9);
layer.add(recbh9);

recbh9.on('mouseover', function(){
	/* when the mouse is over the block header, we want the corresponding block header node on the linked list to be highlighted. */
	stage.find('#rec:node9').fill('#33ffc4');
	if(pc<16){
		txtbh9.text('tag: FREE, kval: 9');
		//this.fill('black');
	}else if(pc<17){
		/* malloc(1) returns. */
		txtbh9.text('tag: RESERVED, kval: 5');
	}else if(pc<22){
		/* the user calls free(). */
		txtbh9.text('tag: FREE, kval: 5');
	}else if(pc<25){
		/* coalesced with level 5 buddy. */
		txtbh9.text('tag: FREE, kval: 6');
	}else if(pc<28){
		/* coalesced with level 6 buddy. */
		txtbh9.text('tag: FREE, kval: 7');
	}else if(pc<=30){
		/* coalesced with level 7 buddy. */
		txtbh9.text('tag: FREE, kval: 8');
	}else if(pc>30){
		/* coalesced with level 8 buddy. */
		txtbh9.text('tag: FREE, kval: 9');
	}
	layer.draw();
});

recbh9.on('mouseout', function(){
	//this.fill('#cd5c5c');
	// show nothing, once the mouse leaves.
	txtbh9.text('');
	// restore to its original color.
	stage.find('#rec:node9').fill('#99dd');
	layer.draw();
});

/* repeat the same logic for block header 8. */
var txtbh8 = new Konva.Text({
        id: "txt:bh8",
        x:  220,
        y: 120,
        text: "",
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
});

var recbh8 = new Konva.Rect({
        id: "rec:bh8",
        x: xStart1+cellWidth1*0.5,
        y: yStart1,
        stroke: '#555',
        strokeWidth: 2,
        fill: '#cd5c5c',
        width: 10,
        height: cellHeight,
        cornerRadius: 0,
});

recbh8.on('mouseover', function(){
	txtbh8.text('tag: FREE, kval: 8');
	/* when the mouse is over the block header, we want the corresponding block header node on the linked list to be highlighted. */
	stage.find('#rec:node8').fill('#33ffc4');
	layer.draw();
});

recbh8.on('mouseout', function(){
	// show nothing, once the mouse leaves.
	txtbh8.text('');
	// restore to its original color.
	stage.find('#rec:node8').fill('#99dd');
	layer.draw();
});

/* repeat the same logic for block header 7. */
var txtbh7 = new Konva.Text({
        id: "txt:bh7",
        x:  120,
        y: 120,
        text: "",
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
});

var recbh7 = new Konva.Rect({
        id: "rec:bh7",
        x: xStart1+cellWidth1*0.25,
        y: yStart1,
        stroke: '#555',
        strokeWidth: 2,
        fill: '#cd5c5c',
        width: 10,
        height: cellHeight,
        cornerRadius: 0,
});

recbh7.on('mouseover', function(){
	txtbh7.text('tag: FREE, kval: 7');
	/* when the mouse is over the block header, we want the corresponding block header node on the linked list to be highlighted. */
	stage.find('#rec:node7').fill('#33ffc4');
	layer.draw();
});

recbh7.on('mouseout', function(){
	// show nothing, once the mouse leaves.
	txtbh7.text('');
	// restore to its original color.
	stage.find('#rec:node7').fill('#99dd');
	layer.draw();
});

/* repeat the same logic for block header 6. */
var txtbh6 = new Konva.Text({
        id: "txt:bh6",
        x:  60,
        y: 120,
        text: "",
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
});

var recbh6 = new Konva.Rect({
        id: "rec:bh6",
        x: xStart1+cellWidth1*0.125,
        y: yStart1,
        stroke: '#555',
        strokeWidth: 2,
        fill: '#cd5c5c',
        width: 10,
        height: cellHeight,
        cornerRadius: 0,
});

recbh6.on('mouseover', function(){
	txtbh6.text('tag: FREE, kval: 6');
	/* when the mouse is over the block header, we want the corresponding block header node on the linked list to be highlighted. */
	stage.find('#rec:node6').fill('#33ffc4');
	layer.draw();
});

recbh6.on('mouseout', function(){
	// show nothing, once the mouse leaves.
	txtbh6.text('');
	// restore to its original color.
	stage.find('#rec:node6').fill('#99dd');
	layer.draw();
});

/* repeat the same logic for block header 5. */
var txtbh5 = new Konva.Text({
        id: "txt:bh5",
        x:  30,
        y: 120,
        text: "",
        fontSize: 24,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 10,
});

var recbh5 = new Konva.Rect({
        id: "rec:bh5",
        x: xStart1+cellWidth1*0.0625,
        y: yStart1,
        stroke: '#555',
        strokeWidth: 2,
        fill: '#cd5c5c',
        width: 10,
        height: cellHeight,
        cornerRadius: 0,
});

recbh5.on('mouseover', function(){
	txtbh5.text('tag: FREE, kval: 5');
	/* when the mouse is over the block header, we want the corresponding block header node on the linked list to be highlighted. */
	stage.find('#rec:node5').fill('#33ffc4');
	layer.draw();
});

recbh5.on('mouseout', function(){
	// show nothing, once the mouse leaves.
	txtbh5.text('');
	// restore to its original color.
	stage.find('#rec:node5').fill('#99dd');
	layer.draw();
});

var cellWidth=160;
var xStart=1120;
var yStart=50;

var cellWidth=160;
var xStart=1120;
var yStart=50;

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
drawRectWithText(1045, yStart-400, cellWidth, cellHeight, "block header (tag=FREE, kval=9)", "#99dd","node9");

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
    points: [10, 30, 10, 50],
    pointerLength: 5,
    pointerWidth: 5,
    id: "arrowbase",
    fill: '#ff00ff',
    stroke: '#ff00ff',
    strokeWidth: 5,
});

var arrowP = new Konva.Arrow({
    points: [10, 295, 10, 100],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowp",
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
    id: "arrownext9",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowFirstPrev9 = new Konva.Arrow({
    points: [680, 85, 845, 130, 1045, 85],
    tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowprev9",
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

/* for the search arrow */
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

var arrowarraynext9init = [1345, 65, 1045, 30, 680, 65];
var arrowarrayprev9init = [680, 85, 845, 130, 1045, 85];
var arrowarraynext9 = [1345, 65, 1045, 30, 680, 65];
var arrowarrayprev9 = [680, 85, 845, 130, 1045, 85];

var arrowarraynext8init = [980, 165, 850, 120, 680, 165];
var arrowarrayprev8init = [680, 185, 630, 190, 680, 200];
var arrowarraynext8 = [980, 165, 850, 120, 680, 165];
var arrowarrayprev8 = [680, 185, 630, 190, 680, 200];

var arrowarraynext7init = [980, 265, 850, 220, 680, 265];
var arrowarrayprev7init = [680, 285, 630, 290, 680, 300];
var arrowarraynext7 = [980, 265, 850, 220, 680, 265];
var arrowarrayprev7 = [680, 285, 630, 290, 680, 300];

var arrowarraynext6init = [980, 365, 850, 320, 680, 365];
var arrowarrayprev6init = [680, 385, 630, 390, 680, 400];
var arrowarraynext6 = [980, 365, 850, 320, 680, 365];
var arrowarrayprev6 = [680, 385, 630, 390, 680, 400];

var arrowarraynext5init = [980, 465, 850, 420, 680, 465];
var arrowarrayprev5init = [680, 485, 630, 490, 680, 500];
var arrowarraynext5 = [980, 465, 850, 420, 680, 465];
var arrowarrayprev5 = [680, 485, 630, 490, 680, 500];

var arrowarraybuddy = [10+cellWidth1*0.5, 245, 10+cellWidth1*0.5, 100];
var arrowarrayp = [10, 295, 10, 100];

/* this runs when user clicks the "next step" button */
function nextstep() {
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
		layer.add(arrowP);
		layer.add(p);
        layer.draw();
        pc=pc+1;
    }else if(pc == 7){
		/* once p is already displayed, no need to show the additional sentence. */
    	stage.find('#p').text("p");
		/* draw block header 8. */
		//drawRectWithText(xStart1+cellWidth1*0.5, yStart1, 10, cellHeight, "", "#cd5c5c","bh8");
		layer.add(txtbh8);
		layer.add(recbh8);

		layer.add(arrowBuddy);
		layer.add(buddy);
        layer.draw();
        pc=pc+1;
    }else if(pc == 8){
		/* draw another block header on the linked list. */
    	stage.find('#txt:node9').hide();
    	stage.find('#rec:node9').hide();
		drawRectWithText(1045, yStart-300, cellWidth, cellHeight, "block header (tag=FREE, kval=8)", "#99dd","node8");
		/* modify arrows */
		/* hide the two straight arrows at level 9. */
    	stage.find('#arrownextstraight').hide();
    	stage.find('#arrowprevstraight').hide();
		arrowarraynext9[0] = arrowarraynext9[0] - 365;
		arrowarraynext9[2] = arrowarraynext9[2] - 200;
    	stage.find('#arrownext9').points(arrowarraynext9);
		arrowarrayprev9[2] = arrowarrayprev9[2] - 220; // FIXME: - 220??
		arrowarrayprev9[3] = arrowarrayprev9[3] - 35;
		arrowarrayprev9[4] = arrowarrayprev9[4] - 365;
		arrowarrayprev9[5] = arrowarrayprev9[5] + 15; // FIXME: + 10??
    	stage.find('#arrowprev9').points(arrowarrayprev9);
		/* arrows 8 */
		arrowarraynext8[0] = arrowarraynext8[0] + 365;
		arrowarraynext8[2] = arrowarraynext8[2] + 200;
    	stage.find('#arrownext8').points(arrowarraynext8);
		arrowarrayprev8[2] = arrowarrayprev8[2] + 200;
		arrowarrayprev8[3] = arrowarrayprev8[3] + 30;
		arrowarrayprev8[4] = arrowarrayprev8[4] + 365;
		arrowarrayprev8[5] = arrowarrayprev8[5] - 20;
    	stage.find('#arrowprev8').points(arrowarrayprev8);
		drawTwoArrows(100,"level8");
		/* move down the search/split arrow */
		movearrowDownsplit();
    	stage.find('#search').text("add a new node here");
    	stage.find('#search').x(350);
        layer.draw();
        pc=pc+1;
    }else if(pc == 9){
		/* draw block header 7. */
		//drawRectWithText(xStart1+cellWidth1*0.25, yStart1, 10, cellHeight, "", "#cd5c5c","bh7");
		layer.add(txtbh7);
		layer.add(recbh7);

		arrowarraybuddy[0] = xStart1+cellWidth1*0.25;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.25;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.25);
        layer.draw();
        pc=pc+1;
    }else if(pc == 10){
		drawRectWithText(1045, yStart-200, cellWidth, cellHeight, "block header (tag=FREE, kval=7)", "#99dd","node7");
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
    }else if(pc == 11){
		/* draw block header 6. */
		//drawRectWithText(xStart1+cellWidth1*0.125, yStart1, 10, cellHeight, "", "#cd5c5c","bh6");
		layer.add(txtbh6);
		layer.add(recbh6);

		arrowarraybuddy[0] = xStart1+cellWidth1*0.125;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.125;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.125);
        layer.draw();
        pc=pc+1;
    }else if(pc == 12){
		drawRectWithText(1045, yStart-100, cellWidth, cellHeight, "block header (tag=FREE, kval=6)", "#99dd","node6");
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
    }else if(pc == 13){
		/* draw block header 5. */
		//drawRectWithText(xStart1+cellWidth1*0.0625, yStart1, 10, cellHeight, "", "#cd5c5c","bh5");
		layer.add(txtbh5);
		layer.add(recbh5);

		arrowarraybuddy[0] = xStart1+cellWidth1*0.0625;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.0625;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.0625);
        layer.draw();
        pc=pc+1;
    }else if(pc == 14){
		drawRectWithText(1045, yStart, cellWidth, cellHeight, "block header (tag=FREE, kval=5)", "#99dd","node5");
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
    }else if(pc == 15){
		/* move p 24 bytes forward is the first step in free. */
		arrowarrayp[0] = arrowarrayp[0] + 10;
		arrowarrayp[2] = arrowarrayp[2] + 10;
    	stage.find('#arrowp').points(arrowarrayp);
    	stage.find('#p').text("p (move p 24 bytes forward, and malloc(1) returns p)");
		/* hide buddy, don't need it for now. */
    	stage.find('#arrowbuddy').hide();
    	stage.find('#buddy').hide();
        layer.draw();
        pc=pc+1;
	}
}

/* this runs when user clicks the "next step in free()" button */
function nextstepinfree() {
    if(pc == 16){
    	stage.find('#p').text("p (now the user calls free(p))");
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 17){
		/* move p back 24 bytes is the first step in free. */
		arrowarrayp[0] = arrowarrayp[0] - 10;
		arrowarrayp[2] = arrowarrayp[2] - 10;
    	stage.find('#arrowp').points(arrowarrayp);
    	stage.find('#p').text("p (move p back 24 bytes)");
        layer.draw();
        pc=pc+1;
    }else if(pc == 18){
		/* show buddy, find our first buddy in free(). */
    	stage.find('#arrowbuddy').show();
    	stage.find('#buddy').show();
        layer.draw();
        pc=pc+1;
    }else if(pc == 19){
    	stage.find('#search').text("remove buddy from list");
    	stage.find('#search').x(1050);
    	stage.find('#search').y(620);
		arrowarray1[0] = arrowarray1[0] + 600;
		arrowarray1[1] = arrowarray1[1] + 140;
		arrowarray1[2] = arrowarray1[0];
		arrowarray1[3] = arrowarray1[3] + 40;
    	stage.find('#arrowsearch').points(arrowarray1);
    	stage.find('#search').show();
    	stage.find('#arrowsearch').show();
    	stage.find('#p').text("p");
        layer.draw();
        pc=pc+1;
    }else if(pc == 20){
		/* the actual removal of buddy */
    	stage.find('#rec:node5').hide();
    	stage.find('#txt:node5').hide();
    	stage.find('#arrowr:level5').hide();
    	stage.find('#arrowl:level5').hide();
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
		/* restore the two arrows to its initial state. */
		arrowarraynext5[0] = arrowarraynext5init[0];
		arrowarraynext5[2] = arrowarraynext5init[2];
    	stage.find('#arrownext5').points(arrowarraynext5);
		arrowarrayprev5[2] = arrowarrayprev5init[2];
		arrowarrayprev5[3] = arrowarrayprev5init[3];
		arrowarrayprev5[4] = arrowarrayprev5init[4];
		arrowarrayprev5[5] = arrowarrayprev5init[5];
    	stage.find('#arrowprev5').points(arrowarrayprev5);
        layer.draw();
        pc=pc+1;
    }else if(pc == 21){
		/* update buddy, hide the old one, don't need it anymore. */
		arrowarraybuddy[0] = xStart1+cellWidth1*0.125;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.125;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.125);
		/* hide the block header, we don't need it anymore. */
    	stage.find('#rec:bh5').hide();
    	stage.find('#txt:bh5').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 22){
		/* move 100 up, 620 to 520 */
    	stage.find('#search').y(520);
		arrowarray1[1] = arrowarray1[1] - 100;
		arrowarray1[3] = arrowarray1[3] - 100;
    	stage.find('#arrowsearch').points(arrowarray1);
    	stage.find('#search').show();
    	stage.find('#arrowsearch').show();
        layer.draw();
        pc=pc+1;
    }else if(pc == 23){
		/* the actual removal of buddy */
    	stage.find('#rec:node6').hide();
    	stage.find('#txt:node6').hide();
    	stage.find('#arrowr:level6').hide();
    	stage.find('#arrowl:level6').hide();
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
		/* restore the two arrows to its initial state. */
		arrowarraynext6[0] = arrowarraynext6init[0];
		arrowarraynext6[2] = arrowarraynext6init[2];
    	stage.find('#arrownext6').points(arrowarraynext6);
		arrowarrayprev6[2] = arrowarrayprev6init[2];
		arrowarrayprev6[3] = arrowarrayprev6init[3];
		arrowarrayprev6[4] = arrowarrayprev6init[4];
		arrowarrayprev6[5] = arrowarrayprev6init[5];
    	stage.find('#arrowprev6').points(arrowarrayprev6);
        layer.draw();
        pc=pc+1;
    }else if(pc == 24){
		/* update buddy, hide the old one, don't need it anymore. */
		arrowarraybuddy[0] = xStart1+cellWidth1*0.25;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.25;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.25);
		/* hide the block header, we don't need it anymore. */
    	stage.find('#rec:bh6').hide();
    	stage.find('#txt:bh6').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 25){
		/* move 100 up, 520 to 420 */
    	stage.find('#search').y(420);
		arrowarray1[1] = arrowarray1[1] - 100;
		arrowarray1[3] = arrowarray1[3] - 100;
    	stage.find('#arrowsearch').points(arrowarray1);
    	stage.find('#search').show();
    	stage.find('#arrowsearch').show();
        layer.draw();
        pc=pc+1;
    }else if(pc == 26){
		/* the actual removal of buddy */
    	stage.find('#rec:node7').hide();
    	stage.find('#txt:node7').hide();
    	stage.find('#arrowr:level7').hide();
    	stage.find('#arrowl:level7').hide();
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
		/* restore the two arrows to its initial state. */
		arrowarraynext7[0] = arrowarraynext7init[0];
		arrowarraynext7[2] = arrowarraynext7init[2];
    	stage.find('#arrownext7').points(arrowarraynext7);
		arrowarrayprev7[2] = arrowarrayprev7init[2];
		arrowarrayprev7[3] = arrowarrayprev7init[3];
		arrowarrayprev7[4] = arrowarrayprev7init[4];
		arrowarrayprev7[5] = arrowarrayprev7init[5];
    	stage.find('#arrowprev7').points(arrowarrayprev7);
        layer.draw();
        pc=pc+1;
    }else if(pc == 27){
		/* update buddy, hide the old one, don't need it anymore. */
		arrowarraybuddy[0] = xStart1+cellWidth1*0.5;
		arrowarraybuddy[2] = xStart1+cellWidth1*0.5;
    	stage.find('#arrowbuddy').points(arrowarraybuddy);
    	stage.find('#buddy').x(xStart1+cellWidth1*0.5);
		/* hide the block header, we don't need it anymore. */
    	stage.find('#rec:bh7').hide();
    	stage.find('#txt:bh7').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 28){
		/* move 100 up, 420 to 320 */
    	stage.find('#search').y(320);
		arrowarray1[1] = arrowarray1[1] - 100;
		arrowarray1[3] = arrowarray1[3] - 100;
    	stage.find('#arrowsearch').points(arrowarray1);
    	stage.find('#search').show();
    	stage.find('#arrowsearch').show();
        layer.draw();
        pc=pc+1;
    }else if(pc == 29){
		/* the actual removal of buddy */
    	stage.find('#rec:node8').hide();
    	stage.find('#txt:node8').hide();
    	stage.find('#arrowr:level8').hide();
    	stage.find('#arrowl:level8').hide();
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
		/* restore the two arrows to its initial state. */
		arrowarraynext8[0] = arrowarraynext8init[0];
		arrowarraynext8[2] = arrowarraynext8init[2];
    	stage.find('#arrownext8').points(arrowarraynext8);
		arrowarrayprev8[2] = arrowarrayprev8init[2];
		arrowarrayprev8[3] = arrowarrayprev8init[3];
		arrowarrayprev8[4] = arrowarrayprev8init[4];
		arrowarrayprev8[5] = arrowarrayprev8init[5];
    	stage.find('#arrowprev8').points(arrowarrayprev8);
        layer.draw();
        pc=pc+1;
    }else if(pc == 30){
		/* update buddy, hide the old one, don't need it anymore. */
    	stage.find('#arrowbuddy').hide();
    	stage.find('#buddy').hide();
		/* hide the block header, we don't need it anymore. */
    	stage.find('#rec:bh8').hide();
    	stage.find('#txt:bh8').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 31){
		/* move 100 up, 320 to 220 */
    	stage.find('#search').y(220);
    	stage.find('#search').text("    add one node here");
    	stage.find('#search').show();
		arrowarray1[1] = arrowarray1[1] - 100;
		arrowarray1[3] = arrowarray1[3] - 100;
    	stage.find('#arrowsearch').points(arrowarray1);
    	stage.find('#arrowsearch').show();
        layer.draw();
        pc=pc+1;
    }else if(pc == 32){
		/* restore everything at level 9 to its initial state. */
    	stage.find('#txt:node9').show();
    	stage.find('#rec:node9').show();
    	stage.find('#arrownextstraight').show();
    	stage.find('#arrowprevstraight').show();
		arrowarraynext9[0] = arrowarraynext9init[0];
		arrowarraynext9[2] = arrowarraynext9init[2];
    	stage.find('#arrownext9').points(arrowarraynext9);
		arrowarrayprev9[2] = arrowarrayprev9init[2];
		arrowarrayprev9[3] = arrowarrayprev9init[3];
		arrowarrayprev9[4] = arrowarrayprev9init[4];
		arrowarrayprev9[5] = arrowarrayprev9init[5];
    	stage.find('#arrowprev9').points(arrowarrayprev9);
		/* search arrow and its text can be hidden now. */
    	stage.find('#search').hide();
    	stage.find('#arrowsearch').hide();
        layer.draw();
        pc=pc+1;
    }else if(pc == 33){
    	stage.find('#p').text("p is now freed");
        layer.draw();
        pc=pc+1;
    }else if(pc == 34){
    	stage.find('#p').hide();
    	stage.find('#arrowp').hide();
        layer.draw();
		/* go back to the original state. */
        pc=pc+1;
	}
}
/* vim: set ts=4: */

