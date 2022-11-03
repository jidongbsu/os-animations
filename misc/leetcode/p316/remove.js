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
    let letter = new Konva.Text({
        x: x,
        y: y,
        text: str,
        id: 'letter_'+id,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000000',
        width: 400,
        padding: 20,
        // align: 'center',
    });
	layer.add(letter);
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
            id:"brec"+i,
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
makeBuffer(100,240,8,50,50); // a buffer whose size is 8.

/* for "cbacdcbc" */
makeText(100,240,"c",0);
makeText(150,240,"b",0);
makeText(200,240,"a",0);
makeText(250,240,"c",0);
makeText(300,240,"d",0);
makeText(350,240,"c",0);
makeText(400,240,"b",0);
makeText(450,240,"c",0);

makeText(100,190,"0",1);
makeText(150,190,"1",1);
makeText(200,190,"2",1);
makeText(250,190,"3",1);
makeText(300,190,"4",1);
makeText(350,190,"5",1);
makeText(400,190,"6",1);
makeText(450,190,"7",1);

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


/* this array stores the last seen indexes. */
makeBuffer(100,540,26,50,50); // a buffer whose size is 26.
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

layer.draw();

var pc=1;

/* indicating the position of the up arrow. */
var pos = 125; // at first it is pointing to the first letter.

/* this runs when user clicks the "next step" button */
function nextstep() {
    if(pc == 1){
		/* update last occurrence of c */
		stage.find('#letter_c').text("0");
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 3){
		/* update last occurrence of b */
		stage.find('#letter_b').text("1");
        layer.draw();
        pc=pc+1;
    }else if(pc == 4){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 5){
		/* update last occurrence of a */
		stage.find('#letter_a').text("2");
        layer.draw();
        pc=pc+1;
    }else if(pc == 6){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 7){
		/* update last occurrence of c */
		stage.find('#letter_c').text("3");
        layer.draw();
        pc=pc+1;
    }else if(pc == 8){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 9){
		/* update last occurrence of d */
		stage.find('#letter_d').text("4");
        layer.draw();
        pc=pc+1;
    }else if(pc == 10){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 11){
		/* update last occurrence of c */
		stage.find('#letter_c').text("5");
        layer.draw();
        pc=pc+1;
    }else if(pc == 12){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 13){
		/* update last occurrence of b */
		stage.find('#letter_b').text("6");
        layer.draw();
        pc=pc+1;
    }else if(pc == 14){
		RightShiftArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 15){
		/* update last occurrence of c */
		stage.find('#letter_c').text("7");
        layer.draw();
        pc=pc+1;
    }else if(pc == 16){
	/* now it's the time to scan the array again */
		ResetArrow();
        layer.draw();
        pc=pc+1;
    }else if(pc == 17){
	/* draw the stack */
		layer.add(stack);
        layer.draw();
        pc=pc+1;
    }else if(pc == 18){
		/* first element in the stack */
		makeText(700,55,"c",'stack0');
        layer.draw();
        pc=pc+1;
    }
}

/* vim: set ts=4: */
