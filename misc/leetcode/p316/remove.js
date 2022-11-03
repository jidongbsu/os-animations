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

var input = new Konva.Text({
    x: 5,
    y: 140,
    id:'input',
    text: "input string",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

layer.add(input);

var lastseen = new Konva.Text({
    x: 5,
    y: 440,
    id:'lastseen',
    text: "last seen",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

layer.add(lastseen);

function makeText(x,y,str,id) {
    let text = new Konva.Text({
        x: x,
        y: y,
        text: str,
        id: 'text_'+id,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000000',
        width: 400,
        padding: 20,
        // align: 'center',
    });
	layer.add(text);
}

/* show the 26 letters. */
makeText(100,490,"a",1);
makeText(150,490,"b",2);
makeText(200,490,"c",3);
makeText(250,490,"d",4);
makeText(300,490,"e",5);
makeText(350,490,"f",6);
makeText(400,490,"g",7);
makeText(450,490,"h",8);
makeText(500,490,"i",9);
makeText(550,490,"j",10);
makeText(600,490,"k",11);
makeText(650,490,"l",12);
makeText(700,490,"m",13);
makeText(750,490,"n",14);
makeText(800,490,"o",15);
makeText(850,490,"p",16);
makeText(900,490,"q",17);
makeText(950,490,"r",18);
makeText(1000,490,"s",19);
makeText(1050,490,"t",20);
makeText(1100,490,"u",21);
makeText(1150,490,"v",22);
makeText(1200,490,"w",23);
makeText(1250,490,"x",24);
makeText(1300,490,"y",25);
makeText(1350,490,"z",26);

function makeBuffer(xstart,ystart,bufferSize,w,h) {
    for(let i=0;i<bufferSize;i++){
        let tr = new Konva.Rect({
            x: xstart+i*w,
            y: ystart,
            id:"buf_"+i,
            stroke: '#343434',
            strokeWidth: 5,
            fill: '#ddd',
            width: w,
            height: h,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
        });
        layer.add(tr);
    }
}

/* this array displays the input string */
makeBuffer(100,240,9,50,50); // a buffer whose size is 9, the array has 8 elements, and we need a space for '\0'.

/* for "cbacdcbc" */
makeText(100,240,"c",0);
makeText(150,240,"b",0);
makeText(200,240,"a",0);
makeText(250,240,"c",0);
makeText(300,240,"d",0);
makeText(350,240,"c",0);
makeText(400,240,"b",0);
makeText(450,240,"c",0);
/* and add the NULL terminator. */
makeText(500,240,"\\0",0); // somehow \0 won't work, we have to escape...

makeText(100,190,"0",1);
makeText(150,190,"1",1);
makeText(200,190,"2",1);
makeText(250,190,"3",1);
makeText(300,190,"4",1);
makeText(350,190,"5",1);
makeText(400,190,"6",1);
makeText(450,190,"7",1);
makeText(500,190,"8",1);

var arrowUp = new Konva.Arrow({
    points: [125, 350, 125, 300],
    pointerLength: 5,
    pointerWidth: 5,
    id: "arrowup",
    fill: '#ff00ff',
    stroke: '#ff00ff',
    strokeWidth: 5,
});

layer.add(arrowUp);

/* initial position of the up arrow */
var arrowarray1 = [125, 350, 125, 300];

function RightShiftArrow(){
    arrowarray1[0] = arrowarray1[0] + 50;
    arrowarray1[2] = arrowarray1[2] + 50;
    stage.find('#arrowup').points(arrowarray1);
}

function ResetArrow(){
    arrowarray1[0] = 125;
    arrowarray1[2] = 125;
    stage.find('#arrowup').points(arrowarray1);
}

function makeLastSeenBuffer(xstart,ystart,bufferSize,w,h) {
    for(let i=0;i<bufferSize;i++){
        let tr = new Konva.Rect({
            x: xstart+i*w,
            y: ystart,
            id:"lastseenbuf_"+i,
            stroke: '#343434',
            strokeWidth: 5,
            fill: '#ddd',
            width: w,
            height: h,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            shadowOpacity: 0.2,
        });
        layer.add(tr);
    }
}

/* this array stores the last seen indexes. */
makeLastSeenBuffer(100,540,26,50,50); // a buffer whose size is 26.

makeText(100,535,"-1",'a');
makeText(150,535,"-1",'b');
makeText(200,535,"-1",'c');
makeText(250,535,"-1",'d');
makeText(300,535,"-1",'e');
makeText(350,535,"-1",'f');
makeText(400,535,"-1",'g');
makeText(450,535,"-1",'h');
makeText(500,535,"-1",'i');
makeText(550,535,"-1",'j');
makeText(600,535,"-1",'k');
makeText(650,535,"-1",'l');
makeText(700,535,"-1",'m');
makeText(750,535,"-1",'n');
makeText(800,535,"-1",'o');
makeText(850,535,"-1",'p');
makeText(900,535,"-1",'q');
makeText(950,535,"-1",'r');
makeText(1000,535,"-1",'s');
makeText(1050,535,"-1",'t');
makeText(1100,535,"-1",'u');
makeText(1150,535,"-1",'v');
makeText(1200,535,"-1",'w');
makeText(1250,535,"-1",'x');
makeText(1300,535,"-1",'y');
makeText(1350,535,"-1",'z');

var stack_label = new Konva.Text({
    x: 720,
    y: 20,
    id:'stack_label',
    text: "stack",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var stack = new Konva.Rect({
    x: 700,
    y: 60,
    id:"stack",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 100,
    height: 400,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var msg_box = new Konva.Rect({
    x: 900,
    y: 100,
    id:"message_box",
    stroke: '#ffa07a',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 200,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var message=["push c into the stack.",
    "",
    "",
    ""];

function updateMessage(msg,i) {
	stage.find('#text_msg'+i).text(msg);
}

function clearMessage() {
	updateMessage("",0);
	updateMessage("",1);
	updateMessage("",2);
	updateMessage("",3);
}

/* initial position of the stack top line */
var linearray = [700, 410, 800, 410];

function makeLine(x1,y1,x2,y2,id) {
    let line = new Konva.Line({
	points: [x1,y1,x2,y2],
        id: 'line_'+id,
	stroke: 'green',
	strokeWidth: 5,
    });
	layer.add(line);
}

function makeRegularLine(x1,y1,x2,y2,id) {
    let line = new Konva.Line({
	points: [x1,y1,x2,y2],
        id: 'line_'+id,
	stroke: '#555',
	strokeWidth: 5,
    });
	layer.add(line);
}

function pop() {
	linearray[1] = linearray[1] + 50;
	linearray[3] = linearray[3] + 50;
	stage.find('#line_top').points(linearray);
}

function push(){
	linearray[1] = linearray[1] - 50;
	linearray[3] = linearray[3] - 50;
	stage.find('#line_top').points(linearray);
}

layer.draw();

var pc=1;

/* indicating the position of the up arrow. */
var pos = 125; // at first it is pointing to the first letter.

/* this runs when user clicks the "next step" button */
function nextstep() {
    if(pc == 1){
		/* update last occurrence of c */
		stage.find('#text_c').text("0");
	/* highlight the box for c */
	stage.find('#lastseenbuf_2').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
		RightShiftArrow();
	stage.find('#lastseenbuf_2').fill("#ddd");
	/* highlight the box for b */
	stage.find('#lastseenbuf_1').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 3){
		/* update last occurrence of b */
		stage.find('#text_b').text("1");
        layer.draw();
        pc=pc+1;
    }else if(pc == 4){
		RightShiftArrow();
	stage.find('#lastseenbuf_1').fill("#ddd");
	/* highlight the box for a */
	stage.find('#lastseenbuf_0').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 5){
		/* update last occurrence of a */
		stage.find('#text_a').text("2");
        layer.draw();
        pc=pc+1;
    }else if(pc == 6){
		RightShiftArrow();
	stage.find('#lastseenbuf_0').fill("#ddd");
	/* highlight the box for c */
	stage.find('#lastseenbuf_2').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 7){
		/* update last occurrence of c */
		stage.find('#text_c').text("3");
        layer.draw();
        pc=pc+1;
    }else if(pc == 8){
		RightShiftArrow();
	stage.find('#lastseenbuf_2').fill("#ddd");
	/* highlight the box for d */
	stage.find('#lastseenbuf_3').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 9){
		/* update last occurrence of d */
		stage.find('#text_d').text("4");
        layer.draw();
        pc=pc+1;
    }else if(pc == 10){
		RightShiftArrow();
	stage.find('#lastseenbuf_3').fill("#ddd");
	/* highlight the box for d */
	stage.find('#lastseenbuf_2').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 11){
		/* update last occurrence of c */
		stage.find('#text_c').text("5");
        layer.draw();
        pc=pc+1;
    }else if(pc == 12){
		RightShiftArrow();
	stage.find('#lastseenbuf_2').fill("#ddd");
	/* highlight the box for d */
	stage.find('#lastseenbuf_1').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 13){
		/* update last occurrence of b */
		stage.find('#text_b').text("6");
        layer.draw();
        pc=pc+1;
    }else if(pc == 14){
		RightShiftArrow();
	stage.find('#lastseenbuf_1').fill("#ddd");
	/* highlight the box for d */
	stage.find('#lastseenbuf_2').fill("#5f9ea0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 15){
		/* update last occurrence of c */
		stage.find('#text_c').text("7");
        layer.draw();
        pc=pc+1;
    }else if(pc == 16){
		RightShiftArrow();
	stage.find('#lastseenbuf_2').fill("#ddd");
        layer.draw();
        pc=pc+1;
    }else if(pc == 17){
	alert("Reaching the end of the string!")
	/* now it's the time to scan the array again */
		ResetArrow();
	/* draw the stack and its label. */
		layer.add(stack);
		layer.add(stack_label);
        layer.draw();
        pc=pc+1;
    }else if(pc == 18){
		/* draw the message box */
		layer.add(msg_box);
		makeText(900,100,message[0],'msg0');
		makeText(900,150,message[1],'msg1');
		makeText(900,200,message[2],'msg2');
		makeText(900,250,message[3],'msg3');
        layer.draw();
        pc=pc+1;
    }else if(pc == 19){
		/* first element in the stack */
		makeText(725,410,"c",'stack0');
		makeLine(700,410,800,410,'top');
        layer.draw();
        pc=pc+1;
    }else if(pc == 20){
	clearMessage();
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 21){
	RightShiftArrow();
	clearMessage();
        layer.draw();
        pc=pc+1;
    }else if(pc == 22){
	updateMessage("is b already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 23){
	clearMessage();
	updateMessage("no, b is not existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 24){
	updateMessage("okay, so is b greater than the top element of the stack?",0);
	updateMessage("if yes, push b into the stack;",1);
	updateMessage("if no, pop the top element out if this isn't its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 25){
	updateMessage("no, b is not greater than the top element, which is c",0);
	updateMessage("and this isn't c's last occurrence.",1);
	updateMessage("so let's pop c out.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 26){
	pop();
        layer.draw();
        pc=pc+1;
    }else if(pc == 27){
	updateMessage("is b greater than the element at the top of the stack?",0);
	updateMessage("yes, because there is nothing in the stack right now.",1);
	updateMessage("so let's push b into the stack.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 28){
	push();
	stage.find('#text_stack0').text('b');
        layer.draw();
        pc=pc+1;
    }else if(pc == 29){
	clearMessage();
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 30){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 31){
	updateMessage("is a already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 32){
	clearMessage();
	updateMessage("no, a is not existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 33){
	updateMessage("okay, so is a greater than the top element of the stack?",0);
	updateMessage("if yes, push a into the stack;",1);
	updateMessage("if no, pop the top element out if this isn't its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 34){
	updateMessage("no, a is not greater than the top element, which is b.",0);
	updateMessage("and this isn't b's last occurrence.",1);
	updateMessage("so let's pop b out.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 35){
	pop();
        layer.draw();
        pc=pc+1;
    }else if(pc == 36){
	updateMessage("is a greater than the element at the top of the stack?",0);
	updateMessage("yes, because there is nothing in the stack right now.",1);
	updateMessage("so let's push a into the stack.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 37){
	push();
	stage.find('#text_stack0').text('a');
        layer.draw();
        pc=pc+1;
    }else if(pc == 38){
	clearMessage();
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 39){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 40){
	updateMessage("is c already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 41){
	clearMessage();
	updateMessage("no, c is not existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 42){
	updateMessage("okay, so is c greater than the top element of the stack?",0);
	updateMessage("if yes, push c into the stack;",1);
	updateMessage("if no, pop the top element out if this isn't its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 43){
	updateMessage("yes, c is greater than the top element of the stack.",0);
	updateMessage("so let's push c into the stack;",1);
	updateMessage("",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 44){
	/* second element in the stack */
	makeText(725,360,"c",'stack1');
	push();
	makeRegularLine(700,410,800,410,'line1');
        layer.draw();
        pc=pc+1;
    }else if(pc == 45){
	clearMessage();
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 46){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 47){
	updateMessage("is d already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 48){
	clearMessage();
	updateMessage("no, d is not existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 49){
	updateMessage("okay, so is d greater than the top element of the stack?",0);
	updateMessage("if yes, push d into the stack;",1);
	updateMessage("if no, pop the top element out if this isn't its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 50){
	updateMessage("yes, d is greater than the top element of the stack.",0);
	updateMessage("so let's push d into the stack;",1);
	updateMessage("",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 51){
	/* third element in the stack */
	makeText(725,310,"d",'stack2');
	push();
	makeRegularLine(700,360,800,360,'line2');
        layer.draw();
        pc=pc+1;
    }else if(pc == 52){
	clearMessage();
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 53){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 54){
	updateMessage("is c already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 55){
	clearMessage();
	updateMessage("yes, c is indeed existing in the stack.",0);
	updateMessage("so, let's move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 56){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 57){
	updateMessage("is b already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 58){
	clearMessage();
	updateMessage("no, b is not existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 59){
	updateMessage("okay, so is b greater than the top element of the stack?",0);
	updateMessage("if yes, push b into the stack;",1);
	updateMessage("if no, pop the top element out if this isn't its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 60){
	updateMessage("no, b is not greater than the top element of the stack,",0);
	updateMessage("but, we can't pop the top element out of stack,",1);
	updateMessage("because this IS its last occurrence.",2);
        layer.draw();
        pc=pc+1;
    }else if(pc == 61){
	clearMessage();
	updateMessage("okay, so let's push b into the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 62){
	/* fourth element in the stack */
	makeText(725,260,"b",'stack3');
	push();
	makeRegularLine(700,310,800,310,'line2');
        layer.draw();
        pc=pc+1;
    }else if(pc == 63){
	updateMessage("now move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 64){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 65){
	updateMessage("is c already existing in the stack?",0);
	updateMessage("if yes, then skip it and move on to the next letter;",1);
        layer.draw();
        pc=pc+1;
    }else if(pc == 66){
	clearMessage();
	updateMessage("yes, c is already existing in the stack.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 67){
	updateMessage("okay, so let's skip c and move on to the next letter in the string.",0);
        layer.draw();
        pc=pc+1;
    }else if(pc == 68){
	RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 69){
	updateMessage("we now reach the end of the string.",0);
	updateMessage("so we are done and our stack stores the output, which is acdb.",1);
        layer.draw();
        pc=pc+1;
    }
}

/* vim: set ts=4: */
