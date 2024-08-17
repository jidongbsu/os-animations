// Authors: Joshua Kloepfer   kloepj2@rpi.edu
//Credit: Rezvan Joshaghani


var stage = new Konva.Stage({
    container: 'container',
    width: 2000,
    height: 1000
});


var layer = new Konva.Layer();


var segmentNumber;
var val; 
var animationStep=0; 


function makeText(x,y,str,id) {

    return new Konva.Text({
        x: x,
        y: y,
        text: str,
        id: 'txt:'+id,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000000',
        width: 600,
        padding: 20,
        // align: 'center',
    });

}


function drawRectWithText(x,y,w,h,str,fill,id) {
    
    let text = new Konva.Text({
        id: "txt:"+id,
        x:  x,
        y: y + h / 2 - 18,
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
function drawRectWithTextLined(x,y,w,h,str,fill,id) {
    
    let text = new Konva.Text({
        id: "txt:"+id,
        x:  0,
        y: 0,
        text: str,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'black',
        align: 'center',
        padding: 2,
    });
    let label = new Konva.Label({
        x: x + 2,
        y: y + h / 2 - 13,
        opacity: 1,
        id: "label:"+id,
    });
    label.add(new Konva.Tag({
        fill: fill,
    }));
    label.add(text);
    
    
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
    for (var i = w / 10; i <= w; i += w / 10) {
        var line = new Konva.Line({
            points: [x + i - w / 10, y + h, x + i, y],
            stroke: '#3a3b3c',
            strokeWidth: 1.5,
            lineCap: 'round',
            lineJoin: 'round',
            dash: [10, 10],
        });
        layer.add(line);
    }
    layer.add(label);
    
    
}



var cellWidth=175;
var cellHeight=50;
var xStart=50;
var yStart=100;
var offsetValue;
var bin;

var vMemory = new Konva.Text({
    x: xStart+10,
    y: yStart-30,
    text: "Virtual Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vMemory)
var vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart-10,
    text: 0 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart, cellWidth, cellHeight * 2, "Program Code", "#ffffff","vs"+0);
vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+2*cellHeight-10,
    text: 2 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithTextLined(xStart, yStart+2*cellHeight, cellWidth, cellHeight * 2, "free", "#d3d3d3","vs"+1);
vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+4*cellHeight-10,
    text: 4 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart+4*cellHeight, cellWidth, cellHeight * 3, "Heap", "#ffffff","vs"+2);
vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+7*cellHeight-10,
    text: 7 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithTextLined(xStart, yStart+7*cellHeight, cellWidth, cellHeight * 7, "free", "#d3d3d3","vs"+3);
vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+14*cellHeight-10,
    text: 14 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart+14*cellHeight, cellWidth, cellHeight * 2, "Stack", "#ffffff","vs"+2);

var arrow = new Konva.Arrow({
    id:"harrow0",
    x: xStart + cellWidth / 2,
    y: yStart + 7 * cellHeight,
    points: [0, 0, 0, 75],
    pointerLength: 5,
    pointerWidth: 5,
    fill: 'green',
    stroke: 'green',
    strokeWidth: 2
})
layer.add(arrow);
var arrow = new Konva.Arrow({
    id:"sarrow0",
    x: xStart + cellWidth / 2   ,
    y: yStart + 14 * cellHeight,
    points: [0, 0, 0, -75],
    pointerLength: 5,
    pointerWidth: 5,
    fill: 'green',
    stroke: 'green',
    strokeWidth: 2
})
layer.add(arrow);



var vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+16*cellHeight-10,
    text: 16 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)

xStart = xStart + 1.5 * cellWidth;
var pMemory = new Konva.Text({
    x: xStart+10,
    y: yStart-30,
    text: "Physical Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(pMemory)

var vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart-10,
    text: 0 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart, cellWidth, cellHeight * 4, "Operating System", "#ffffff","ps"+0);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+4*cellHeight-10,
    text: 16 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithTextLined(xStart, yStart+4*cellHeight, cellWidth, cellHeight * 2.5, "Not in use", "#d3d3d3","   ps"+1);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+6.5*cellHeight-10,
    text: 26 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart+6.5*cellHeight, cellWidth, cellHeight * 0.5, "Stack", "#ffffff","ps"+2);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+7*cellHeight-10,
    text: 28 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithTextLined(xStart, yStart+7*cellHeight, cellWidth, cellHeight * 1, "Not in use", "#d3d3d3","ps"+3);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+8*cellHeight-10,
    text: 32 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight * 0.5, "Code", "#ffffff","ps"+4);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+8.5*cellHeight-10,
    text: 34 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithText(xStart, yStart+8.5*cellHeight, cellWidth, cellHeight * 0.75, "Heap", "#ffffff","ps"+5);

vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+9.25*cellHeight-10,
    text: 37 + "KB"    ,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)
drawRectWithTextLined(xStart, yStart+9.25*cellHeight, cellWidth, cellHeight * 6.75, "Not in use", "#d3d3d3","ps"+6);

var arrow = new Konva.Arrow({
    id:"harrow1",
    x: xStart + cellWidth / 2,
    y: yStart + 6.5 * cellHeight,
    points: [0, 0, 0, -30],
    pointerLength: 5,
    pointerWidth: 5,
    fill: 'green',
    stroke: 'green',
    strokeWidth: 2
})
layer.add(arrow);
var arrow = new Konva.Arrow({
    id:"sarrow1",
    x: xStart + cellWidth / 2   ,
    y: yStart + 9.25 * cellHeight,
    points: [0, 0, 0, 75],
    pointerLength: 5,
    pointerWidth: 5,
    fill: 'green',
    stroke: 'green',
    strokeWidth: 2
})
layer.add(arrow);



var vAddressNum = new Konva.Text({
    x: xStart-50,
    y: yStart+16*cellHeight-10,
    text: 64 + "KB",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)


var vAddressBitCellWidth=50;
var vAddressBitCellHeight=50;
var vAddressBitXStart=600;
var vAddressBitYStart=150;
let offsetColor="#ecc579"
let pfnColor="#98DDDD"
let vsnColor="#E0B6FF"

// virtual address bits
for (let i = 0; i < 14 ; i++) {

    // segment bits
    if (i<2)
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, '', "#c8c5c5","va"+i);
    // offset bits
    else
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, '', "#c8c5c5","va"+i);

}


var physicalAddressWidth = vAddressBitCellWidth * 14 / 3;

drawRectWithText(vAddressBitXStart, vAddressBitYStart + 450 + vAddressBitCellHeight, physicalAddressWidth, vAddressBitCellHeight, " ", "#c8c5c5","pa0");
drawRectWithText(vAddressBitXStart + physicalAddressWidth, vAddressBitYStart + 450 + vAddressBitCellHeight, physicalAddressWidth, vAddressBitCellHeight, " ", "#c8c5c5","pa1");
drawRectWithText(vAddressBitXStart + 2 * physicalAddressWidth, vAddressBitYStart + 450 + vAddressBitCellHeight, physicalAddressWidth, vAddressBitCellHeight, " ", "#c8c5c5","pa2");

var arrow = new Konva.Arrow({
    id:"arrow1",
    x: vAddressBitXStart + 14 * vAddressBitCellWidth / 2,
    y: vAddressBitYStart + vAddressBitCellHeight,
    points: [0, 0, 0, 450],
    pointerLength: 5,
    pointerWidth: 5,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 2
})
layer.add(arrow);




var vsnText = new Konva.Text({
    id: "txt:vsn",
    x: vAddressBitXStart,
    y: vAddressBitYStart-30,
    text: "Segment",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(vsnText)


var vOffsetText = new Konva.Text({
    id: "txt:voffset",
    x: vAddressBitXStart+vAddressBitCellWidth+2*vAddressBitCellWidth,
    y: vAddressBitYStart-30,
    text: "offset",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(vOffsetText)


var phADDRText = new Konva.Text({
    id: "txt:phAddr",
    x: vAddressBitXStart + vAddressBitCellWidth * 14 + 20,
    y: vAddressBitYStart + 515,
    text: "Physical Address",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(phADDRText)

var vADDRText = new Konva.Text({
    id: "txt:vADDR",
    x: vAddressBitXStart + vAddressBitCellWidth * 14 + 20,  
    y: vAddressBitYStart + 15,
    text: "Virtual Address",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(vADDRText)


var pfnText = new Konva.Text({
    id: "txt:bs",
    x: vAddressBitXStart,
    y: vAddressBitYStart+560,
    text: "Base Segment",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pfnText)

var pfOffsetText = new Konva.Text({
    id: "txt:poffset",
    x: vAddressBitXStart+5*vAddressBitCellWidth,
    y: vAddressBitYStart+560,
    text: "offset",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pfOffsetText)

var pfTotalText = new Konva.Text({
    id: "txt:ptotal",
    x: vAddressBitXStart+10*vAddressBitCellWidth,
    y: vAddressBitYStart+560,
    text: "Total",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pfTotalText)

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}


layer.batchDraw()

stage.add(layer)


function drawSegmentTableRow(x,y,w,h,vsn,fpn,vb, gp)
{
    drawRectWithText(x,y,w,h,vsn,"#ffffff","pte:vsn"+vsn)
    drawRectWithText(x+w,y,w,h,fpn,"#ffffff","pte:fpn"+vsn)
    drawRectWithText(x+2*w,y,w,h,vb,"#ffffff","pte:vb"+vsn)
    drawRectWithText(x+3*w,y,w,h,gp,"#ffffff","pte:gp"+vsn)
}

ptCellWidth=140
ptCellheight=50
ptXstart=vAddressBitXStart + vAddressBitCellWidth * 7 - ptCellWidth * 2
ptYstart= vAddressBitYStart + 600



drawSegmentTableRow(ptXstart,ptYstart,ptCellWidth,ptCellheight,"Segment","Base","Size", "Grows\nPositive")
drawSegmentTableRow(ptXstart,ptYstart+ptCellheight,ptCellWidth,ptCellheight,"Code(seg0)",32 * 1024,2, "True")
drawSegmentTableRow(ptXstart,ptYstart+ptCellheight*2,ptCellWidth,ptCellheight,"Heap(seg1)",34 * 1024,3, "True")
drawSegmentTableRow(ptXstart,ptYstart+ptCellheight*3,ptCellWidth,ptCellheight,"Stack(seg3)",28 * 1024,2, "False")






var boxWidth=150;
var addrBoxX=vAddressBitXStart + vAddressBitCellWidth * 14 / 2 - boxWidth * 2;
var addrBoxY=5;
var boxHeight=50;
var codeX = 1400;



drawRectWithText(addrBoxX,addrBoxY,boxWidth,boxHeight,"Virtual Address","#ffffff","b1");
drawRectWithText(addrBoxX+boxWidth,addrBoxY,boxWidth,boxHeight,"SEG_MASK","#ffffff","b2");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY,boxWidth,boxHeight,"OFFSET_MASK","#ffffff","b5");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY,boxWidth,boxHeight,"SEG_SHIFT","#ffffff","b3");


drawRectWithText(addrBoxX,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","boxvaddr");
drawRectWithText(addrBoxX+boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"110000","#ffffff","vsnMask");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"001111","#ffffff","offsetMask");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"12","#ffffff","shift");


var consumerProg=[
    " 1.   //get top 2 bits of 14-bit virtual address" ,
    " 2.   Segment = (Virtual Address & SEG_MASK) >> SEG_SHIFT" ,
    " 3.   //now get offset",
    " 4.   Offset = VirtualAddress & OFFSET_MASK",
    " 5.   if (!GrowsPositive[Segment]) {",
    " 6.   \t\t//Highest virtual address with 12 bits is 4KB",
    " 7.   \t\tOffset = Offset - 4KB",
    " 8.   }",
    " 9.   if (abs(Offset) >= Bounds[Segment]) {",
    "10.   \t\tRaiseException(PROTECTION_FAULT)",
    "11.   }",
    "12.   else {",
    "13.   \t\tPhysAddr = Base[Segment] + Offset",
    "14.   \t\tRegister = AccessMemory(PhysAddr)",
    "15.   }",
    "16.   End"];


for (let i=0;i<consumerProg.length;i++){
    let t=makeText(codeX,225+(i*20),consumerProg[i],"prog:"+(i+1));
    layer.add(t)
}



stage.find('#txt:prog:1').fill("gray");
stage.find('#txt:prog:3').fill("gray");
stage.find('#txt:prog:8').fill("gray");
stage.find('#txt:prog:11').fill("gray");

var resultText = new Konva.Text({
    x: 10,
    y: 20,
    id: "txt:result",
    text: "",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(resultText)


var bounds = [2048, 3072, 0, 2048];
var base = [32 * 1024, 34 * 1024, 0, 28 * 1024];

function startAnimation(){

    stage.find("#txt:bs").text("Base Segment")
    stage.find('#txt:poffset').text("offset");
    stage.find('#txt:vsn').text("Segment");
    stage.find('#txt:voffset').text("offset");

    stage.find('#txt:pa0').text('');
    stage.find('#txt:pa1').text('');
    stage.find('#txt:pa2').text('');


    stage.find('#txt:va0').text('');
    stage.find('#txt:va1').text('');
    stage.find('#txt:va2').text('');
    stage.find('#txt:va3').text('');
    stage.find('#txt:va4').text('');
    stage.find('#txt:va5').text('');
    stage.find('#txt:va6').text('');
    stage.find('#txt:va7').text('');
    stage.find('#txt:va8').text('');
    stage.find('#txt:va9').text('');
    stage.find('#txt:va10').text('');
    stage.find('#txt:va11').text('');
    stage.find('#txt:va12').text('');
    stage.find('#txt:va13').text('');

    stage.find('#rec:va0').fill("#c8c5c5");
    stage.find('#rec:va1').fill("#c8c5c5");
    stage.find('#rec:va2').fill("#c8c5c5");
    stage.find('#rec:va3').fill("#c8c5c5");
    stage.find('#rec:va4').fill("#c8c5c5");
    stage.find('#rec:va5').fill("#c8c5c5");
    stage.find('#rec:va6').fill("#c8c5c5");
    stage.find('#rec:va7').fill("#c8c5c5");
    stage.find('#rec:va8').fill("#c8c5c5");
    stage.find('#rec:va9').fill("#c8c5c5");
    stage.find('#rec:va10').fill("#c8c5c5");
    stage.find('#rec:va11').fill("#c8c5c5");
    stage.find('#rec:va12').fill("#c8c5c5");
    stage.find('#rec:va13').fill("#c8c5c5");
    stage.find("#rec:pte:vsnCode(seg0)").fill("white");
    stage.find("#rec:pte:fpnCode(seg0)").fill("white");
    stage.find("#rec:pte:vbCode(seg0)").fill("white");
    stage.find("#rec:pte:gpCode(seg0)").fill("white");
    stage.find("#rec:pte:vsnHeap(seg1)").fill("white");
    stage.find("#rec:pte:fpnHeap(seg1)").fill("white");
    stage.find("#rec:pte:vbHeap(seg1)").fill("white");
    stage.find("#rec:pte:gpHeap(seg1)").fill("white");
    stage.find("#rec:pte:vsnStack(seg3)").fill("white");
    stage.find("#rec:pte:fpnStack(seg3)").fill("white");
    stage.find("#rec:pte:vbStack(seg3)").fill("white");
    stage.find("#rec:pte:gpStack(seg3)").fill("white");
    stage.find('#rec:pa0').fill('#c8c5c5');
    stage.find('#rec:pa1').fill('#c8c5c5');
    stage.find('#rec:pa2').fill('#c8c5c5');
    for (let i = 1; i <= 16; i++) {
        stage.find('#txt:prog:' + i).fontStyle('normal');
    }

    stage.find('#txt:result').text("").fill("black");

    val = document.getElementById('textIn').value
    if(parseInt(val)>=0 && parseInt(val)<Math.pow(2, 14)) {

        bin = String(dec2bin(val)).padStart(14, "0")
        segmentNumber = parseInt('' + bin[0] + '' + bin[1], 2);
        offsetValue = 0;
        for (let i = 13; i > 1; --i) {
            offsetValue += Math.pow(2, 13 - i) * parseInt(bin[i], 2);
        }
        
        stage.find('#txt:boxvaddr').text(val+"\n"+bin);

        selectedColor = "#e5f1a3";



        stage.find('#txt:prog:2').fontStyle('bold');
        animationStep=1;
    }
    else{
        alert("The Virtual Address entered is not valid!")
        stage.find('#txt:boxvaddr').text("");
        animationStep=0;
    }
    layer.draw()

}

function translateAddress() {
    if(animationStep===0){
        startAnimation();
    }
    else if (animationStep===1){
        stage.find('#txt:prog:2').fontStyle('normal');
        stage.find('#txt:prog:4').fontStyle('bold');

        stage.find('#rec:va0').fill(vsnColor);
        stage.find('#rec:va1').fill(vsnColor);
        stage.find('#rec:va2').fill(offsetColor);
        stage.find('#rec:va3').fill(offsetColor);
        stage.find('#rec:va4').fill(offsetColor);
        stage.find('#rec:va5').fill(offsetColor);
        stage.find('#rec:va6').fill(offsetColor);
        stage.find('#rec:va7').fill(offsetColor);
        stage.find('#rec:va8').fill(offsetColor);
        stage.find('#rec:va9').fill(offsetColor);
        stage.find('#rec:va10').fill(offsetColor);
        stage.find('#rec:va11').fill(offsetColor);
        stage.find('#rec:va12').fill(offsetColor);
        stage.find('#rec:va13').fill(offsetColor);

        for (let i = 0; i < 14; i++) {
            stage.find('#txt:va' + i).text(bin[i]);
        }
        stage.find('#txt:vsn').text("Segment = "+segmentNumber);

        animationStep++;
        layer.draw()
    }
    else if (animationStep===2){
        stage.find('#txt:prog:4').fontStyle('normal');
        stage.find('#txt:prog:5').fontStyle('bold');
        stage.find('#rec:pa0').fill('lightgreen');
            if (segmentNumber == 0) {
                stage.find('#txt:pa0').text("32 KB");
                stage.find("#rec:pte:vsnCode(seg0)").fill("lightblue");
                stage.find("#rec:pte:fpnCode(seg0)").fill("lightblue");
                stage.find("#rec:pte:vbCode(seg0)").fill("lightblue");
                stage.find("#rec:pte:gpCode(seg0)").fill("lightblue");
                stage.find("#rec:pte:pbCode(seg0)").fill("lightblue");
            }
            else if (segmentNumber == 1) {
                stage.find('#txt:pa0').text("34 KB");
                stage.find("#rec:pte:vsnHeap(seg1)").fill("lightblue");
                stage.find("#rec:pte:fpnHeap(seg1)").fill("lightblue");
                stage.find("#rec:pte:vbHeap(seg1)").fill("lightblue");
                stage.find("#rec:pte:gpHeap(seg1)").fill("lightblue");
                stage.find("#rec:pte:pbHeap(seg1)").fill("lightblue");
            }
            else if (segmentNumber == 3) {
                stage.find('#txt:pa0').text("28 KB");
                stage.find("#rec:pte:vsnStack(seg3)").fill("lightblue");
                stage.find("#rec:pte:fpnStack(seg3)").fill("lightblue");
                stage.find("#rec:pte:vbStack(seg3)").fill("lightblue");
                stage.find("#rec:pte:gpStack(seg3)").fill("lightblue");
                stage.find("#rec:pte:pbStack(seg3)").fill("lightblue");
            }
        animationStep++;
        layer.draw()
    }
    else if (animationStep===3){
        stage.find('#txt:prog:5').fontStyle('normal');
        if (segmentNumber == 3) {
            stage.find('#txt:prog:7').fontStyle('bold');
        }
        else {
            stage.find('#txt:prog:9').fontStyle('bold');
        }
        animationStep++;
        layer.draw();

    }
    else if (animationStep===4){
        if (segmentNumber == 3) {
            offsetValue = offsetValue - Math.pow(2, 12);
            stage.find('#txt:prog:7').fontStyle('normal');
            stage.find('#txt:prog:9').fontStyle('bold');
        }
        else {
            stage.find('#txt:prog:9').fontStyle('normal');
            if (Math.abs(offsetValue) >= bounds[segmentNumber]) {
                stage.find('#txt:prog:10').fontStyle('bold');
            }
            else {
                stage.find('#txt:prog:13').fontStyle('bold');
            }
        }
        stage.find('#rec:pa1').fill('lightgreen');
        stage.find('#txt:pa1').text(offsetValue);
        animationStep++;
        layer.draw();
    }
    else if (animationStep===5){
        if (segmentNumber == 3) {
            stage.find('#txt:prog:9').fontStyle('normal');
            if (Math.abs(offsetValue) >= bounds[segmentNumber]) {
                stage.find('#txt:prog:10').fontStyle('bold');
            }
            else {
                stage.find('#txt:prog:13').fontStyle('bold');
            }
            animationStep++;
        }
        else {
            if (Math.abs(offsetValue) >= bounds[segmentNumber]) {
                stage.find('#txt:prog:10').fontStyle('Normal');
                stage.find('#txt:prog:16').fontStyle('bold');
                stage.find('#txt:result').text("ERROR: PROTECTION_FAULT").fill("red");
                animationStep = 0;
            }
            else {
                stage.find('#rec:pa2').fill('lightgreen');
                stage.find('#txt:pa2').text(base[segmentNumber] + offsetValue);
                stage.find('#txt:prog:13').fontStyle('Normal');
                stage.find('#txt:prog:14').fontStyle('bold');
                animationStep++;
            }
        }
        layer.draw();
    }
    else if (animationStep===6){
        if (segmentNumber == 3) {
            if (Math.abs(offsetValue) >= bounds[segmentNumber]) {
                stage.find('#txt:prog:10').fontStyle('normal');
                stage.find('#txt:prog:16').fontStyle('bold');
                stage.find('#txt:result').text("ERROR: PROTECTION_FAULT").fill("red");
                animationStep = 0;
            }
            else {
                stage.find('#rec:pa2').fill('lightgreen');
                stage.find('#txt:pa2').text(base[segmentNumber] + offsetValue);
                stage.find('#txt:prog:13').fontStyle('normal');
                stage.find('#txt:prog:14').fontStyle('bold');
            }
            animationStep++;
        }
        else {
            stage.find('#txt:prog:14').fontStyle('normal');
            stage.find('#txt:prog:16').fontStyle('bold');
            animationStep = 0;
        }
        layer.draw();
    }
    else if (animationStep===7){
        stage.find('#txt:prog:14').fontStyle('normal');
        stage.find('#txt:prog:16').fontStyle('bold');
        animationStep = 0;
        layer.draw();
    }

}