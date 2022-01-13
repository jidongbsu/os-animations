class Process{
    constructor(id){
        this.pid=id;
        this.status="ready";
        this.pc=0;
        this.i=0;
        this.countCopy=0;
        this.finished=false;
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

var cs = new Konva.Text({
    x: 120,
    y: 5,
    id:'code',
    text: "code segment",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var cellWidth=165;
var cellHeight=50;
var xStart=120;
var yStart=40;

drawRectWithText(xStart, yStart, cellWidth, cellHeight, "Gadget", "#82fff7","hpid");
drawRectWithText(xStart+cellWidth, yStart, 0.75*cellWidth, cellHeight, "Address", "#82fff7","hstat");
drawRectWithText(xStart+1.75*cellWidth, yStart, 2*cellWidth, cellHeight, "Note", "#82fff7","hregs");

drawRectWithText(xStart, yStart+cellHeight, cellWidth, 2*cellHeight, "pop ecx; pop eax; ret", "#d29eff","p1");
drawRectWithText(xStart+cellWidth, yStart+cellHeight, 0.75*cellWidth, 2*cellHeight, "0xB7F3BF30", "#d29eff","p1stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+cellHeight, 2*cellWidth, 2*cellHeight, "pop /bin out to ecx\n pop the addr of data seg out to eax", "#d29eff","p1reg");

drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "mov [eax] ecx; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+2*cellHeight, 0.75*cellWidth, cellHeight, "0xB7E8CECF", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+2*cellHeight, 2*cellWidth, cellHeight, "ecx contains '/bin', move ecx to [eax]", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "xor eax eax; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+3*cellHeight, 0.75*cellWidth, cellHeight, "0xB7EDC6BF", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+3*cellHeight, 2*cellWidth, cellHeight, "zero eax out", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight, "pop edx; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+4*cellHeight, 0.75*cellWidth, cellHeight, "0xB7E64A9E", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+4*cellHeight, 2*cellWidth, cellHeight, "pop an address out to edx", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "mov [edx+0x18] eax;\n ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+5*cellHeight, 0.75*cellWidth, cellHeight, "0xB7E8D722", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+5*cellHeight, 2*cellWidth, cellHeight, "move eax to [edx+0x18]", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+6*cellHeight, cellWidth, cellHeight, "pop ebx; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+6*cellHeight, 0.75*cellWidth, cellHeight, "0xB7EDBAF4", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+6*cellHeight, 2*cellWidth, cellHeight, "pop the address of /bin//sh to ebx", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+7*cellHeight, cellWidth, cellHeight, "pop ecx; pop edx; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+7*cellHeight, 0.75*cellWidth, cellHeight, "0xB7E8D6EB", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+7*cellHeight, 2*cellWidth, cellHeight, "pop the address of argp to ecx\n pop the address of envp to edx", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight, "add eax 0xb; ret", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+8*cellHeight, 0.75*cellWidth, cellHeight, "0xB7EE2AA8", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+8*cellHeight, 2*cellWidth, cellHeight, "set eax to system call number 11", "#d29eff","p2reg");

drawRectWithText(xStart, yStart+9*cellHeight, cellWidth, cellHeight, "call gs:[0x10]", "#d29eff","p2");
drawRectWithText(xStart+cellWidth, yStart+9*cellHeight, 0.75*cellWidth, cellHeight, "0xB7F040F5", "#d29eff","p2stat");
drawRectWithText(xStart+1.75*cellWidth, yStart+9*cellHeight, 2*cellWidth, cellHeight, "make a system call", "#d29eff","p2reg");

var ss = new Konva.Text({
    x: 900,
    y: 5,
    id:'stack',
    text: "stack segment",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// draw stack
xStart=900;
cellWidth=140;
cellHeight=30;
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "0xB7F3BF30", "#e5f1a3","s1");
drawRectWithText(xStart, yStart+1*cellHeight, cellWidth, cellHeight, "/bin", "#ddd","s2");
drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "0x08049704", "#ddd","s3");
drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "0xB7E8CECF", "#ddd","s4");
drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight, "0xB7F3BF30", "#ddd","s5");
drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "//sh", "#ddd","s6");
drawRectWithText(xStart, yStart+6*cellHeight, cellWidth, cellHeight, "0x08049708", "#ddd","s7");
drawRectWithText(xStart, yStart+7*cellHeight, cellWidth, cellHeight, "0xB7E8CECF", "#ddd","s8");
drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight, "0xB7EDC6BF", "#ddd","s9");
drawRectWithText(xStart, yStart+9*cellHeight, cellWidth, cellHeight, "0xB7E64A9E", "#ddd","s10");
drawRectWithText(xStart, yStart+10*cellHeight, cellWidth, cellHeight, "0x080496F4", "#ddd","s11");
drawRectWithText(xStart, yStart+11*cellHeight, cellWidth, cellHeight, "0xB7E8D722", "#ddd","s12");
drawRectWithText(xStart, yStart+12*cellHeight, cellWidth, cellHeight, "0xB7EDBAF4", "#ddd","s13");
drawRectWithText(xStart, yStart+13*cellHeight, cellWidth, cellHeight, "0x08049704", "#ddd","s14");
drawRectWithText(xStart, yStart+14*cellHeight, cellWidth, cellHeight, "0xB7E8D6EB", "#ddd","s15");
drawRectWithText(xStart, yStart+15*cellHeight, cellWidth, cellHeight, "0x0804970C", "#ddd","s16");
drawRectWithText(xStart, yStart+16*cellHeight, cellWidth, cellHeight, "0x0804970C", "#ddd","s17");
drawRectWithText(xStart, yStart+17*cellHeight, cellWidth, cellHeight, "0xB7EE2AA8", "#ddd","s18");
drawRectWithText(xStart, yStart+18*cellHeight, cellWidth, cellHeight, "0xB7F040F5", "#ddd","s19");

var ds = new Konva.Text({
    x: 1205,
    y: 5,
    id:'data',
    text: "data segment",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// draw data segment
xStart=1205;
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "", "#46dd39","p2");
drawRectWithText(xStart, yStart+1*cellHeight, cellWidth, cellHeight, "", "#46dd39","p2");
drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "", "#46dd39","p2");
drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "", "#46dd39","p2");

var dsaddr1 = new Konva.Text({
    x: 1100,
    y: 45,
    text: '0x08049704',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var dsaddr1value = new Konva.Text({
    x: 1250,
    y: 45,
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var dsaddr2 = new Konva.Text({
    x:  1100,
    y: 45+30,
    text: '0x08049708',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var dsaddr2value = new Konva.Text({
    x: 1250,
    y: 45+30,
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var dsaddr3 = new Konva.Text({
    x:  1100,
    y: 45+60,
    text: '0x0804970C',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var dsaddr3value = new Konva.Text({
    x: 1230,
    y: 45+60,
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var regs = new Konva.Text({
    x: 1205,
    y: 200,
    id:'regs',
    text: "registers",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// draw registers
xStart=1205;
yStart=240;
drawRectWithText(xStart, yStart, cellWidth, cellHeight, "", "#99dd","p2");
drawRectWithText(xStart, yStart+1*cellHeight, cellWidth, cellHeight, "", "#99dd","p2");
drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, cellHeight, "", "#99dd","p2");
drawRectWithText(xStart, yStart+3*cellHeight, cellWidth, cellHeight, "", "#99dd","p2");

var eax = new Konva.Text({
    x:  1155,
    y: 240,
    text: 'eax',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var eaxvalue = new Konva.Text({
    x:  1230,
    y: 240+5,
    id: 'eaxv',
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var ebx = new Konva.Text({
    x:  1155,
    y: 240+30,
    text: 'ebx',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var ebxvalue = new Konva.Text({
    x:  1230,
    y: 240+35,
    id: 'ebxv',
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var ecx = new Konva.Text({
    x:  1155,
    y: 240+60,
    text: 'ecx',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var ecxvalue = new Konva.Text({
    x:  1230,
    y: 240+65,
    id: 'ecxv',
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var edx = new Konva.Text({
    x:  1155,
    y: 240+90,
    text: 'edx',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

var edxvalue = new Konva.Text({
    x:  1230,
    y: 240+95,
    id: 'edxv',
    text: '',
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: 'black',
});

//for (let i=1;i<20;i++){
//    let StackArrowText = new Konva.Arrow({
//        id: 'stack:arrow:'+(i-1),
//        points: [680,  60+(i-1)*30, 780,  60+(i-1)*30],
//        pointerLength: 10,
//        pointerWidth: 10,
//        fill: 'FFFF',
//        stroke: 'FFFF',
//        strokeWidth: 2,
//    });
//    layer.add(StackArrowText)
//}

//instruction pointer
var arrowRight1 = new Konva.Arrow({
    points: [20, 110, 100, 110],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright1",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowarray1 = [20, 110, 100, 110];

function movearrow1Up(){
    arrowarray1[1] = arrowarray1[1]-50;
    arrowarray1[3] = arrowarray1[3]-50;
    stage.find('#arrowright1').points(arrowarray1);
}

function movearrow1Down(){
    arrowarray1[1] = arrowarray1[1]+50;
    arrowarray1[3] = arrowarray1[3]+50;
    stage.find('#arrowright1').points(arrowarray1);
}

//stack pointer
var arrowRight2 = new Konva.Arrow({
    points: [780, 60, 880, 60],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright2",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

var arrowarray2 = [780, 60, 880, 60];

function movearrow2Down(){
    arrowarray2[1] = arrowarray2[1]+30;
    arrowarray2[3] = arrowarray2[3]+30;
    stage.find('#arrowright2').points(arrowarray2);
}

// add the layer to the stage
stage.add(layer);

layer.add(eax);
layer.add(ebx);
layer.add(ecx);
layer.add(edx);

layer.add(eaxvalue);
layer.add(ebxvalue);
layer.add(ecxvalue);
layer.add(edxvalue);

layer.add(cs);
layer.add(ss);
layer.add(ds);

layer.add(dsaddr1);
layer.add(dsaddr2);
layer.add(dsaddr3);

layer.add(dsaddr1value);
layer.add(dsaddr2value);
layer.add(dsaddr3value);

layer.add(regs);
layer.add(arrowRight2);
layer.draw();

var poc1=new Process(1);

var pc=1;
var sp=1;
var selectedColor = "#e5f1a3";
var origColor = "#35f2dd";

function Next() {
    if(pc == 1){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        layer.add(arrowRight1);
        movearrow2Down();
        layer.draw();
    }else if(pc == 2){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        ecxvalue.text("  /bin");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 3){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        eaxvalue.text("0x08049704");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 4){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 5){
        pc=pc+1;
        dsaddr1value.text("/bin");
        layer.draw();
    }else if(pc == 6){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Up();
        movearrow2Down();
        layer.draw();
    }else if(pc == 7){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        ecxvalue.text("  //sh");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 8){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        eaxvalue.text("0x08049708");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 9){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 10){
        pc=pc+1;
        dsaddr2value.text("//sh");
        layer.draw();
    }else if(pc == 11){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 12){
        pc=pc+1;
        eaxvalue.text("0x00000000");
        layer.draw();
    }else if(pc == 13){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 14){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        edxvalue.text("0x080496F4");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 15){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 16){
        pc=pc+1;
        dsaddr3value.text("0x00000000");
        layer.draw();
    }else if(pc == 17){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 18){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        ebxvalue.text("0x08049704");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 19){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 20){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        ecxvalue.text("0x0804970C");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow2Down();
        layer.draw();
    }else if(pc == 21){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        edxvalue.text("0x0804970C");
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }else if(pc == 22){
        pc=pc+1;
        eaxvalue.text("0x0000000B");
        layer.draw();
    }else if(pc == 23){
        stage.find('#rec:s'+sp).fill(origColor);
        sp=sp+1;
        pc=pc+1;
        stage.find('#rec:s'+sp).fill(selectedColor);
        movearrow1Down();
        movearrow2Down();
        layer.draw();
    }
}

