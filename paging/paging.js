// Authors: Rezvan Joshaghani   rezvanjoshaghani@u.boisestate.edu

// main stage that contains the canvas
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 1000
});

// The main layer that will contain all the shapes
// We need to all all the shapes to the layer after creating them so they get drawn
var layer = new Konva.Layer();

// variables to compute the VPN, FPN, offset
var virtualPageNumber;
var physicalPageFrame;
var addressOffset;
var val; // The user memory address input
var animationStep=0; // indicates the status of animation, 0 is the initial state that every thing is resets
var binPF; // The binary value of the page frame

// vp# -> pf#
var pageTable=[3,7,5,2]


// -----------------------------------------------------------------------------------------------------------------
// |  Function to make a text at position x,y                                                                      |
// |    x,y: rendering coordinates                                                                                 |
// |    str: text string                                                                                           |
// |    id: the shape id that can be used to retrieved the shape from the stage                                    |
// |  returns the shape object (make suer to add the result to the layer)                                          |
// -----------------------------------------------------------------------------------------------------------------
function makeText(x,y,str,id) {

    return new Konva.Text({
        x: x,
        y: y,
        text: str,
        id: 'txt:'+id,
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: '#000000',
        width: 500,
        padding: 20,
        // align: 'center',
    });

}

// -----------------------------------------------------------------------------------------------------------------
// |  Function to make a rectangle with black text inside it at position x,y                                       |
// |    x,y: rendering coordinates                                                                                 |
// |    w,h: width and height of rectangle                                                                         |
// |    str: text string                                                                                           |
// |    fill: fill color of the rectangle                                                                          |
// |    id: the shape id that can be used to retrieved the shape from the stage                                    |
// |      * The rectangle final id is in the form rec:id                                                           |
// |      * The text final id is in the form txt:id                                                                |
// |  No return value the shape is added to the layer by the function                                              |
// -----------------------------------------------------------------------------------------------------------------

function drawRectWithText(x,y,w,h,str,fill,id) {
    // create the text shape
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

    // create the rectangle
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

// *********************************************************************************************************************
// ***************************** Make Virtual Memory *******************************************************************
// *********************************************************************************************************************

// Memory cell width and height
var cellWidth=100;
var cellHeight=50;
// Memory x and y coordinate
var xStart=40;
var yStart=100;
var offsetValue; // Input Memory offset value
var bin; // binary representation of the input memory value

// virtual memory text
var vMemory = new Konva.Text({
    x: xStart+10,
    y: yStart-30,
    text: "Virtual Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vMemory)

// create the virtual memory pages
for (let i = 0; i < 4 ; i++) {
    // the text on the left side of the virtual memory from 0 to 48
    var vAddressNum = new Konva.Text({
        x: xStart-30,
        y: yStart+i*cellHeight-10,
        text: i*16,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
    });
    layer.add(vAddressNum)
    // The virtual memory cell
    drawRectWithText(xStart, yStart+i*cellHeight, cellWidth, cellHeight, "page"+String(i), "#e0b6ff","vp"+i);
}

// Make the last address number (64) on the left side of the table
var vAddressNum = new Konva.Text({
    x: xStart-30,
    y: yStart+4*cellHeight-10,
    text: 4*16,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)


// *********************************************************************************************************************
// ***************************** Make Physical Memory ******************************************************************
// *********************************************************************************************************************

// Physical Memory cell width and height
var phCellWidth=200;
var phCellHeight=50;
// Physical Memory x,y
var phXStart=50;
var phYStart=400;


// physical memory text
var phMemory = new Konva.Text({
    x: phXStart+10,
    y: phYStart-30,
    text: "Physical Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(phMemory)


// the content of the physical memory for each cell each array index maps to a physical memory cell and its color
// unused cells are light gray
// cells that map to a virtual page are light blue
// cell reserved for os is dark gray
const rectContent=[
    {"text":"Reserved for OS",
    "color":"#5F5F5F"},
    {"text":"(unused)",
        "color":"#b7b5b5"},
    {"text":"page 3 of Address Space",
        "color":"#98DDDD"},
    {"text":"page 0 of Address Space",
        "color":"#98DDDD"},
    {"text":"(unused)",
        "color":"#B7B5B5"},
    {"text":"page 2 of Address Space",
        "color":"#98DDDD"},
    {"text":"(unused)",
        "color":"#B7B5B5"},
    {"text":"page 1 of Address Space",
        "color":"#98DDDD"}
];

// Make the physical memory table
for (let i = 0; i < 8 ; i++) {
    // left side numbers 0 to 112
    var phAddressNum = new Konva.Text({
        x: phXStart-40,
        y: phYStart+i*phCellHeight-10,
        text: i*16,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
    });
    layer.add(phAddressNum)
    // physical memory cell
    drawRectWithText(phXStart, phYStart+i*phCellHeight, phCellWidth, phCellHeight, rectContent[i].text, rectContent[i].color,"pf"+i);
    var phFrameNum = new Konva.Text({
        x: phXStart+phCellWidth+5,
        y: phYStart+i*phCellHeight+phCellHeight/2-10,
        text: "page frame "+i,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
    });
    layer.add(phFrameNum)
}

// last number (128) on the left side of the physical memory table
var phAddressNum = new Konva.Text({
    x: phXStart-40,
    y: phYStart+8*phCellHeight-10,
    text: 8*16,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(phAddressNum)


// *********************************************************************************************************************
// ******************************** Make address bits ******************************************************************
// *********************************************************************************************************************


var vAddressBitCellWidth=50;
var vAddressBitCellHeight=50;
var vAddressBitXStart=700;
var vAddressBitYStart=100;
let offsetColor="#ecc579"
let pfnColor="#98DDDD"
let vpnColor="#E0B6FF"

// virtual address bits
for (let i = 0; i < 6 ; i++) {

    // vpn bits
    if (i<2)
        drawRectWithText(vAddressBitXStart+vAddressBitCellWidth+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, '', "#c8c5c5","va"+i);
    // offset bits
    else
        drawRectWithText(vAddressBitXStart+vAddressBitCellWidth+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, '', "#c8c5c5","va"+i);

}

// physical address bits
for (let i = 0; i < 7 ; i++) {
    // fpn bits
    if (i<3)
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart+500, vAddressBitCellWidth, vAddressBitCellHeight, "", "#c8c5c5","pa"+i);
    // offset bits
    else
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart+500, vAddressBitCellWidth, vAddressBitCellHeight, "", "#C8C5C5","pa"+i);


// vertical arrows from virtual address bits to physical address mapping
    let arrowY= vAddressBitYStart+vAddressBitCellHeight
    let arrowLen= 450;
    if (i==0){
        arrowY= vAddressBitYStart+vAddressBitCellHeight+200
        arrowLen=250
    }

    var arrow = new Konva.Arrow({
        id:"arrow:"+i,
        x: vAddressBitXStart+i*vAddressBitCellWidth + vAddressBitCellWidth/2 ,
        y: arrowY,
        points: [0, 0, 0, arrowLen],
        pointerLength: 5,
        pointerWidth: 5,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });

    // add the shape to the layer
    layer.add(arrow);
}

// translation rectangle between virtual and physical address
drawRectWithText(vAddressBitXStart, vAddressBitYStart+200, 160, 100, "Address Translation", "#b8eea7","adTranslate");


var vpnText = new Konva.Text({
    id: "txt:vpn",
    x: vAddressBitXStart+vAddressBitCellWidth,
    y: vAddressBitYStart-30,
    text: "VPN",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(vpnText)


var vOffsetText = new Konva.Text({
    id: "txt:voffset",
    x: vAddressBitXStart+vAddressBitCellWidth+2*vAddressBitCellWidth,
    y: vAddressBitYStart-30,
    text: "virtual offset",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(vOffsetText)


var phADDRText = new Konva.Text({
    id: "txt:phAddr",
    x: vAddressBitXStart,
    y: vAddressBitYStart+600,
    text: "Physical Address",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(phADDRText)


var pfnText = new Konva.Text({
    id: "txt:pfn",
    x: vAddressBitXStart,
    y: vAddressBitYStart+560,
    text: "PFN",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pfnText)

var pfOffsetText = new Konva.Text({
    id: "txt:poffset",
    x: vAddressBitXStart+3*vAddressBitCellWidth,
    y: vAddressBitYStart+560,
    text: "physical offset",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(pfOffsetText)

// -----------------------------------------------------------------------------------------------------------------
// |  Function to convert decimal to binary                                                                        |
// |    dec: input decimal number                                                                                  |
// |  return the binary value                                                                                      |
// -----------------------------------------------------------------------------------------------------------------
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}


layer.batchDraw()

stage.add(layer)
// *********************************************************************************************************************
// ******************************** Make Page Table ********************************************************************
// *********************************************************************************************************************

// -----------------------------------------------------------------------------------------------------------------
// |  Function to make a row of a page table at position x,y                                                       |
// |    x,y: rendering coordinates                                                                                 |
// |    w,h: width and height of rectangle                                                                         |
// |    vpn: virtual page number value                                                                             |
// |    fpn: frame page number                                                                                     |
// |    vb: value of the verification bit                                                                          |
// |    pb: value of the protection bit                                                                            |
// |    The shape id that can be used to retrieved the shape from the stage                                        |
// |      * To access the vpn cell in the row use "pte:vpn"+virtual page number for example for vpn=1 -> pte:vpn1  |
// |      * To access the fpn cell in the row use "pte:fpn"+virtual page number for example for vpn=1 -> pte:fpn1  |
// |      * To access the vb cell in the row use "pte:vb"+ virtual page number for example for vpn=1 -> pte:vb1    |
// |      * To access the pb cell in the row use "pte:pb"+virtual page number for example for vpn=1 -> pte:pb1     |
// |  No return value the shape is added to the layer by the function                                              |
// -----------------------------------------------------------------------------------------------------------------

function drawPageTableRow(x,y,w,h,vpn,fpn,vb,pb)
{
    drawRectWithText(x,y,w,h,vpn,"#ffffff","pte:vpn"+vpn)
    drawRectWithText(x+w,y,w,h,fpn,"#ffffff","pte:fpn"+vpn)
    drawRectWithText(x+2*w,y,w,h,vb,"#ffffff","pte:vb"+vpn)
    drawRectWithText(x+3*w,y,w,h,pb,"#ffffff","pte:pb"+vpn)
}

ptCellWidth=100
ptCellheight=50
ptXstart=250
ptYstart=100


// make the page table row by row

drawPageTableRow(ptXstart,ptYstart,ptCellWidth,ptCellheight,"VPN","PFN","Valid\n bit","Protection\n bit")
drawPageTableRow(ptXstart,ptYstart+ptCellheight,ptCellWidth,ptCellheight,0,pageTable[0],"False","False")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*2,ptCellWidth,ptCellheight,1,pageTable[1],"False","True")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*3,ptCellWidth,ptCellheight,2,pageTable[2],"True","False")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*4,ptCellWidth,ptCellheight,3,pageTable[3],"True","True")


var pageTableText = new Konva.Text({
    x: xStart+300,
    y: yStart-30,
    text: "Page Table",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(pageTableText)

// *********************************************************************************************************************
// ******************************** Make Information box ***************************************************************
// *********************************************************************************************************************

var addrBoxX=1100;
var addrBoxY=50;
var boxWidth=150;
var boxHeight=50;

// information row headers

drawRectWithText(addrBoxX,addrBoxY,boxWidth,boxHeight,"Virtual Address","#ffffff","b1");
drawRectWithText(addrBoxX+boxWidth,addrBoxY,boxWidth,boxHeight,"VPN_MASK","#ffffff","b2");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY,boxWidth,boxHeight,"OFFSET_MASK","#ffffff","b5");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY,boxWidth,boxHeight,"Shift","#ffffff","b3");
// information row values

drawRectWithText(addrBoxX,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","boxvaddr");
drawRectWithText(addrBoxX+boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"110000","#ffffff","vpnMask");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"001111","#ffffff","offsetMask");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"4","#ffffff","shift");


// *********************************************************************************************************************
// ******************************** Make Program ***********************************************************************
// *********************************************************************************************************************

// The algorithm program, each line an element in the array to make text generation easier

var consumerProg=[
    " 1.   // Extract the VPN from the virtual address" ,
    " 2.   VPN = (VirtualAddress & VPN_MASK) >> SHIFT" ,
    " 3.   " ,
    " 4.   // Form the address of the page-table entry (PTE)",
    " 5.   PTEAddr = PTBR + (VPN * sizeof(PTE))" ,
    " 6.   ",
    " 7.   // Fetch the PTE" ,
    " 8.   PTE = AccessMemory(PTEAddr)",
    " 9.   ",
    "10.   // Check if process can access the page",
    "11.   if (PTE.Valid == False)",
    "12.   \t\t RaiseException(SEGMENTATION_FAULT)",
    "13.   else if (CanAccess(PTE.ProtectBits) == False)",
    "14.   \t\t RaiseException(PROTECTION_FAULT)",
    "15.   else",
    "16.   \t\t // Access is OK: form physical address and fetch it",
    "17.   \t\t offset = VirtualAddress & OFFSET_MASK",
    "18.   \t\t PhysAddr = (PTE.PFN << SHIFT) | offset",
    "19.   \t\t Register = AccessMemory(PhysAddr)",
    "20.   End"];

// generate program text shapes to access each line the id is prog:+line number
// for example to access line 18 -> prog:18
for (let i=0;i<consumerProg.length;i++){
    let t=makeText(1100,150+(i*20),consumerProg[i],"prog:"+(i+1));
    layer.add(t)
}


// Make comment lines in the program gray
stage.find('#txt:prog:1').fill("gray");
stage.find('#txt:prog:4').fill("gray");
stage.find('#txt:prog:7').fill("gray");
stage.find('#txt:prog:10').fill("gray");
stage.find('#txt:prog:16').fill("gray");


// The text to show the program final result it can be the following:
//    * Segmentation Fault (red color)
//    * Protection Fault   (red color)
//    * AccessMemory(dd)   (green color)

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


// The arrow showing the ptbr

var ptbrArrow = new Konva.Arrow({
    id: 'ptbrArrow',
    points: [ptXstart-40,  ptYstart+ptCellheight-30, ptXstart,  ptYstart+ptCellheight],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 2,
});

layer.add(ptbrArrow)

// text for page table title
var ptbrArrowText = new Konva.Text({
    x: ptXstart-60,
    y: ptYstart+ptCellheight-50,
    text: 'PTBR',
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(ptbrArrowText)

// arrows by the page table to show the page table address

for (let i=1;i<5;i++){
    let VPNArrowText = new Konva.Arrow({
        id: 'vpn:arrow:'+(i-1),
        points: [ptXstart-40,  ptYstart+ptCellheight/2+ptCellheight*i, ptXstart,  ptYstart+ptCellheight/2+ptCellheight*i],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });
    layer.add(VPNArrowText)
}


// *********************************************************************************************************************
// ******************************** Animation Controls *****************************************************************
// *********************************************************************************************************************

function startAnimation(){

    stage.find('#arrow:3').stroke('black');
    stage.find('#arrow:4').stroke('black');
    stage.find('#arrow:5').stroke('black');
    stage.find('#arrow:6').stroke('black');

    stage.find('#arrow:'+virtualPageNumber).fill('black');
    stage.find('#arrow:'+virtualPageNumber).stroke('black');

    stage.find('#txt:phAddr').text("Physical Address").fill("black");

    stage.find('#txt:pfn').text("PFN");
    stage.find('#txt:poffset').text("physical offset");
    stage.find('#txt:vpn').text("VPN");
    stage.find('#txt:voffset').text("virtual offset");

    stage.find('#txt:pa0').text('');
    stage.find('#txt:pa1').text('');
    stage.find('#txt:pa2').text('');
    stage.find('#txt:pa3').text('');
    stage.find('#txt:pa4').text('');
    stage.find('#txt:pa5').text('');
    stage.find('#txt:pa6').text('');
    stage.find('#txt:pa7').text('');

    stage.find('#rec:pa0').fill("#c8c5c5");
    stage.find('#rec:pa1').fill("#c8c5c5");
    stage.find('#rec:pa2').fill("#c8c5c5");
    stage.find('#rec:pa3').fill("#c8c5c5");
    stage.find('#rec:pa4').fill("#c8c5c5");
    stage.find('#rec:pa5').fill("#c8c5c5");
    stage.find('#rec:pa6').fill("#c8c5c5");
    stage.find('#rec:pa7').fill("#c8c5c5");


    stage.find('#txt:va0').text('');
    stage.find('#txt:va1').text('');
    stage.find('#txt:va2').text('');
    stage.find('#txt:va3').text('');
    stage.find('#txt:va4').text('');
    stage.find('#txt:va5').text('');
    stage.find('#txt:va6').text('');
    stage.find('#txt:va7').text('');

    stage.find('#rec:va0').fill("#c8c5c5");
    stage.find('#rec:va1').fill("#c8c5c5");
    stage.find('#rec:va2').fill("#c8c5c5");
    stage.find('#rec:va3').fill("#c8c5c5");
    stage.find('#rec:va4').fill("#c8c5c5");
    stage.find('#rec:va5').fill("#c8c5c5");
    stage.find('#rec:va6').fill("#c8c5c5");
    stage.find('#rec:va7').fill("#c8c5c5");

     stage.find('#txt:prog:20').fontStyle('normal');


    for (let i = 0; i < 8; i++) {
        stage.find('#rec:vp' + virtualPageNumber).fill(vpnColor);
        stage.find('#rec:pf' + physicalPageFrame).fill(pfnColor);
        stage.find('#rec:pte:vpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:fpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:vb' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:pb' + virtualPageNumber).fill("#ffffff");
    }


    // reset the program font style to normal
    for (let i = 1; i <= 19; i++) {
        stage.find('#txt:prog:' + i).fontStyle('normal');
    }

    stage.find('#txt:result').text("").fill("black");

    val = document.getElementById('textIn').value

    if(parseInt(val)>=0 && parseInt(val)<=64) {

        bin = String(dec2bin(val)).padStart(6, "0")
        virtualPageNumber = parseInt(bin[0] + '' + bin[1], 2);
        physicalPageFrame = pageTable[virtualPageNumber]
        offsetValue = parseInt(bin[2] + '' + bin[3] + '' + bin[4] + '' + bin[5], 2);

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
        stage.find('#txt:prog:5').fontStyle('bold');

        stage.find('#rec:va0').fill(vpnColor);
        stage.find('#rec:va1').fill(vpnColor);
        stage.find('#rec:va2').fill(offsetColor);
        stage.find('#rec:va3').fill(offsetColor);
        stage.find('#rec:va4').fill(offsetColor);
        stage.find('#rec:va5').fill(offsetColor);
        stage.find('#rec:va6').fill(offsetColor);
        stage.find('#rec:va7').fill(offsetColor);

        stage.find('#rec:vp' + virtualPageNumber).fill(selectedColor);

        for (let i = 0; i < 6; i++) {
            stage.find('#txt:va' + i).text(bin[i]);
            // if (i > 1) {
            //     stage.find('#txt:pa' + (i + 1)).text(bin[i]);
            // }
        }
        stage.find('#txt:vpn').text("VPN = "+virtualPageNumber);
        stage.find('#txt:voffset').text("virtual offset = " + offsetValue);

        animationStep++;
        layer.draw()
    }
    else if (animationStep===2){
        stage.find('#txt:prog:5').fontStyle('normal');
        stage.find('#txt:prog:8').fontStyle('bold');
        stage.find('#vpn:arrow:'+virtualPageNumber).fill('red');
        stage.find('#vpn:arrow:'+virtualPageNumber).stroke('red');
        animationStep++;
        layer.draw()
    }
    else if (animationStep===3){
        stage.find('#txt:prog:8').fontStyle('normal');
        stage.find('#txt:prog:11').fontStyle('bold');
        stage.find('#rec:pte:vpn' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:vb' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:pb' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:fpn' + virtualPageNumber).fill(selectedColor);
        animationStep++;
        layer.draw()

    }
    else if (animationStep===4){
        stage.find('#vpn:arrow:'+virtualPageNumber).fill('black');
        stage.find('#vpn:arrow:'+virtualPageNumber).stroke('black');
        binPF= String(dec2bin(physicalPageFrame)).padStart(3,"0")

        if(virtualPageNumber===0 || virtualPageNumber===1){
            stage.find('#txt:prog:11').fontStyle('normal');
            stage.find('#txt:prog:12').fontStyle('bold');
            animationStep++;

        }
        else if(virtualPageNumber===2 || virtualPageNumber===3){
            stage.find('#txt:prog:11').fontStyle('normal');
            stage.find('#txt:prog:13').fontStyle('bold');
            animationStep++;
        }

        layer.draw();
    }
    else if (animationStep===5){
        if(virtualPageNumber===0 || virtualPageNumber===1){
            stage.find('#txt:result').text("Error: SEGMENTATION FAULT").fill("red");
            stage.find('#txt:prog:12').fontStyle('normal');
            stage.find('#txt:prog:20').fontStyle('bold');
            animationStep=0;

        }
        else if(virtualPageNumber===2){
            stage.find('#txt:prog:13').fontStyle('normal');
            stage.find('#txt:prog:14').fontStyle('bold');
            animationStep++;
        }
        else if(virtualPageNumber===3){
            stage.find('#txt:prog:13').fontStyle('normal');
            stage.find('#txt:prog:15').fontStyle('bold');
            animationStep++;
        }
        layer.draw();
    }
    else if (animationStep===6){
        if(virtualPageNumber===2){
            stage.find('#txt:prog:14').fontStyle('normal');
            stage.find('#txt:prog:20').fontStyle('bold');
            stage.find('#txt:result').text("Error: PROTECTION FAULT").fill("red");
            animationStep=0;
        }
        else if(virtualPageNumber===3){
            stage.find('#txt:prog:15').fontStyle('normal');
            stage.find('#txt:prog:17').fontStyle('bold');
            animationStep++;
        }
        layer.draw();
    }
    else if (animationStep===7){

        stage.find('#txt:pfn').text("PFN = "+physicalPageFrame);
        stage.find('#txt:poffset').text("physical offset = " + offsetValue);

        stage.find('#txt:prog:17').fontStyle('normal');
        stage.find('#txt:prog:18').fontStyle('bold');


        stage.find('#txt:pa0').text(binPF[0]);
        stage.find('#txt:pa1').text(binPF[1]);
        stage.find('#txt:pa2').text(binPF[2]);
        stage.find('#txt:pa3').text(bin[2]);
        stage.find('#txt:pa4').text(bin[3]);
        stage.find('#txt:pa5').text(bin[4]);
        stage.find('#txt:pa6').text(bin[5]);
        stage.find('#txt:pa7').text(bin[6]);

        stage.find('#rec:pa0').fill(pfnColor);
        stage.find('#rec:pa1').fill(pfnColor);
        stage.find('#rec:pa2').fill(pfnColor);
        stage.find('#rec:pa3').fill(offsetColor);
        stage.find('#rec:pa4').fill(offsetColor);
        stage.find('#rec:pa5').fill(offsetColor);
        stage.find('#rec:pa6').fill(offsetColor);
        stage.find('#rec:pa7').fill(offsetColor);

        stage.find('#arrow:3').stroke('red');
        stage.find('#arrow:4').stroke('red');
        stage.find('#arrow:5').stroke('red');
        stage.find('#arrow:6').stroke('red');

        animationStep++;


        layer.draw();
    }
    else if(animationStep===8){

        stage.find('#txt:prog:18').fontStyle('normal');
        stage.find('#txt:prog:19').fontStyle('bold');
        stage.find('#txt:phAddr').text("Physical Address=  "+ parseInt(binPF[0]+''+binPF[1]+''+binPF[2]+''+bin[2]+''+bin[3]+''+bin[4]+''+bin[5],2)).fill("green");
        animationStep++;
        layer.draw();

    }
    else if(animationStep===9){

        stage.find('#txt:prog:19').fontStyle('normal');
        stage.find('#txt:prog:20').fontStyle('bold');
        stage.find('#rec:pf' + physicalPageFrame).fill(selectedColor);
        stage.find('#txt:result').text("eax=AccessMemory("+ parseInt(binPF[0]+''+binPF[1]+''+binPF[2]+''+bin[2]+''+bin[3]+''+bin[4]+''+bin[5],2)+")").fill("green");

        animationStep=0;
        layer.draw();

    }

}