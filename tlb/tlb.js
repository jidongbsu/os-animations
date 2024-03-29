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
var binPF;
var tlb=[];
var pfnColor="#98DDDD"
var vpnColor="#E0B6FF"

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
var xStart=500;
var yStart=200;
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

// create the virtual memory table
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
var phXStart=1200;
var phYStart=40;


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
function drawPageTableRow(x, y, w, h, vpn, fpn, vb, pb)
{
    drawRectWithText(x,y,w,h,vpn,"#ffffff","pte:vpn"+vpn)
    drawRectWithText(x+w,y,w,h,fpn,"#ffffff","pte:fpn"+vpn)
    drawRectWithText(x+2*w,y,w,h,vb,"#ffffff","pte:vb"+vpn)
    drawRectWithText(x+3*w,y,w,h,pb,"#ffffff","pte:pb"+vpn)
}


ptXstart=600
ptYstart=500
ptCellWidth=100
ptCellheight=50


// make the page table row by row

drawPageTableRow(ptXstart,ptYstart,ptCellWidth,ptCellheight,"VPN","PFN","Valid\n bit","Protection\n bit")
drawPageTableRow(ptXstart,ptYstart+ptCellheight,ptCellWidth,ptCellheight,0,pageTable[0],"True","False")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*2,ptCellWidth,ptCellheight,1,pageTable[1],"False","True")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*3,ptCellWidth,ptCellheight,2,pageTable[2],"True","True")
drawPageTableRow(ptXstart,ptYstart+ptCellheight*4,ptCellWidth,ptCellheight,3,pageTable[3],"True","True")


// the red line indicating the start of the page table
var redLine = new Konva.Line({
    id: 'line',
    points: [ptXstart, ptYstart+ptCellheight, ptXstart+4*ptCellWidth,ptYstart+ptCellheight],
    stroke: 'black',
    strokeWidth: 2,
    lineCap: 'round',
    lineJoin: 'round',
});

layer.add(redLine);


// text for page table title
var pageTableText = new Konva.Text({
    x: ptXstart,
    y: ptYstart-30,
    text: "Page Table",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(pageTableText)

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

// text beside the arrow showing the ptbr

var ptbrArrowText = new Konva.Text({
    x: ptXstart-60,
    y: ptYstart+ptCellheight-50,
    text: 'PTBR',
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});

layer.add(ptbrArrowText)

for (let i=1;i<5;i++){
    let VPNArrowText = new Konva.Arrow({
        id: 'arrow:'+(i-1),
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
// *************************************** Make TLB ********************************************************************
// *********************************************************************************************************************


// -----------------------------------------------------------------------------------------------------------------
// |  Function to make a row of TLB at position x,y                                                                |
// |    x,y: rendering coordinates                                                                                 |
// |    w,h: width and height of rectangle                                                                         |
// |    vpn: virtual page number value                                                                             |
// |    fpn: frame page number                                                                                     |
// |    pb: value of the protection bit                                                                            |
// |    rid: row id                                                                                                |
// |    The shape id that can be used to retrieved the shape from the stage                                        |
// |      * To access the vpn cell in the row use "tlb:vpn"+rid for example for rid=1 -> pte:vpn1                  |
// |      * To access the fpn cell in the row use "tlb:fpn"+rid for example for rid=1 -> pte:fpn1                  |
// |      * To access the pb cell in the row use "tlb:pb"+rid for example for rid=1 -> pte:pb1                     |
// |  No return value the shape is added to the layer by the function                                              |
// -----------------------------------------------------------------------------------------------------------------
function drawTLBTableRow(x,y,w,h,vpn,fpn,pb,rid)
{
    drawRectWithText(x,y,w,h,vpn,"#ffffff","tlb:vpn:"+rid)
    drawRectWithText(x+w,y,w,h,fpn,"#ffffff","tlb:fpn:"+rid)
    drawRectWithText(x+2*w,y,w,h,pb,"#ffffff","tlb:pb:"+rid)
}

tlbCellWidth=100
tlbCellheight=50
tlbXstart=700
tlbYstart=200

// make the tlb
drawTLBTableRow(tlbXstart,tlbYstart,tlbCellWidth,tlbCellheight,"VPN","PFN","Protection\n bit",0)
drawTLBTableRow(tlbXstart,tlbYstart+tlbCellheight,tlbCellWidth,tlbCellheight,"","","",1)
drawTLBTableRow(tlbXstart,tlbYstart+tlbCellheight*2,tlbCellWidth,tlbCellheight,"","","",2)
drawTLBTableRow(tlbXstart,tlbYstart+tlbCellheight*3,tlbCellWidth,tlbCellheight,"","","",3)



var tlbText = new Konva.Text({
    x: tlbXstart,
    y: tlbYstart-30,
    text: "Translation Lookaside Buffer",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(tlbText)


// *********************************************************************************************************************
// ******************************** Make Information box ***************************************************************
// *********************************************************************************************************************


var addrBoxX=0;
var addrBoxY=20;
var boxWidth=140;
var boxHeight=50;

// information row headers
drawRectWithText(addrBoxX,addrBoxY,boxWidth,boxHeight,"Virtual Address","#ffffff","b0");
drawRectWithText(addrBoxX+boxWidth,addrBoxY,boxWidth,boxHeight,"VPN","#ffffff","b1");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY,boxWidth,boxHeight,"offset","#ffffff","b2");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY,boxWidth,boxHeight,"VPN_MASK","#ffffff","b3");
drawRectWithText(addrBoxX+4*boxWidth,addrBoxY,boxWidth,boxHeight,"OFFSET_MASK","#ffffff","b6");
drawRectWithText(addrBoxX+5*boxWidth,addrBoxY,boxWidth,boxHeight,"Shift","#ffffff","b4");
drawRectWithText(addrBoxX+6*boxWidth,addrBoxY,boxWidth,boxHeight,"Success","#ffffff","b5");

// information row values
drawRectWithText(addrBoxX,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","boxvaddr");
drawRectWithText(addrBoxX+boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","vpnBox");
drawRectWithText(addrBoxX+2*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","offsetBox");
drawRectWithText(addrBoxX+3*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"110000","#ffffff","vpnMask");
drawRectWithText(addrBoxX+4*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"001111","#ffffff","offsetMask");
drawRectWithText(addrBoxX+5*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"4","#ffffff","shift");
drawRectWithText(addrBoxX+6*boxWidth,addrBoxY+boxHeight,boxWidth,boxHeight,"","#ffffff","success");


// *********************************************************************************************************************
// ******************************** Make Program ***********************************************************************
// *********************************************************************************************************************


var programXStart=0;
var programYStart=150;
var programBoxWidth=450;
var programBoxHeight=430;

// The algorithm program, each line an element in the array to make text generation easier

var consumerProg=[
    " 1.   VPN = (VirtualAddress & VPN_MASK) >> SHIFT" ,
    " 2.   (Success, TlbEntry) = TLB_Lookup(VPN)" ,
    " 3.   if (Success == True) // TLB Hit" ,
    " 4.   \t\t\t\t if (CanAccess(TlbEntry.ProtectBits) == True)",
    " 5.   \t\t\t\t\t\t\t\t Offset = VirtualAddress & OFFSET_MASK" ,
    " 6.   \t\t\t\t\t\t\t\t PhysAddr = (TlbEntry.PFN << SHIFT) | Offset",
    " 7.   \t\t\t\t\t\t\t\t Register = AccessMemory(PhysAddr)" ,
    " 8.   \t\t\t\t else",
    " 9.   \t\t\t\t\t\t\t\tRaiseException(PROTECTION_FAULT)",
    "10.   else // TLB Miss",
    "11.   \t\t\t\t PTEAddr = PTBR + (VPN * sizeof(PTE))",
    "12.   \t\t\t\t PTE = AccessMemory(PTEAddr)",
    "13.   \t\t\t\t if (PTE.Valid == False)",
    "14.   \t\t\t\t\t\t\t\t RaiseException(SEGMENTATION_FAULT)",
    "15.   \t\t\t\t else if (CanAccess(PTE.ProtectBits) == False)",
    "16.   \t\t\t\t\t\t\t\t RaiseException(PROTECTION_FAULT)",
    "17.   \t\t\t\t else",
    "18.   \t\t\t\t\t\t\t\t TLB_Insert(VPN, PTE.PFN, PTE.ProtectBits)",
    "19.   \t\t\t\t\t\t\t\t RetryInstruction()",
    "20.   End"];

// just a gray background for the program block
drawRectWithText(programXStart,programYStart,programBoxWidth,programBoxHeight,"","#e7e5e5","progRecT")

// generate program text shapes to access each line the id is prog:+line number
// for example to access line 18 -> prog:18
for (let i=0;i<consumerProg.length;i++){
    let t=makeText(programXStart,programYStart+(i*20),consumerProg[i],"prog:"+(i+1));
    layer.add(t)
}


// The text to show the program final result it can be the following:
//    * Segmentation Fault (red color)
//    * Protection Fault   (red color)
//    * AccessMemory(dd)   (green color)
var resultText = new Konva.Text({
    x: 870,
    y: 0,
    id: "txt:result",
    text: "",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(resultText)

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
// ******************************** Animation Controls *****************************************************************
// *********************************************************************************************************************

function startAnimation(){
    // reset the program font style to normal. Cleaning any selection (Bold font)
    for (let i = 1; i <= 20; i++) {
        stage.find('#txt:prog:' + i).fontStyle('normal');
    }

    //empty all information boxes
    stage.find('#txt:boxvaddr').text("");
    stage.find('#txt:vpnBox').text("");
    stage.find('#txt:boxvaddr').text("");
    stage.find('#txt:success').text("");
    stage.find('#txt:offsetBox').text("");


    // Put back all the colors for the Page table
    for (let i = 0; i < 8; i++) {
        stage.find('#rec:vp' + virtualPageNumber).fill(vpnColor);
        stage.find('#rec:pf' + physicalPageFrame).fill(pfnColor);
        stage.find('#rec:pte:vpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:fpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:vb' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:pb' + virtualPageNumber).fill("#ffffff");
    }

    // deselect the TLB hit result
    for (let i = 1; i <= 3; i++) {
        stage.find('#rec:tlb:vpn:'+i).fill("#ffffff");
        stage.find('#rec:tlb:fpn:'+i).fill("#ffffff");
        stage.find('#rec:tlb:pb:'+i).fill("#ffffff");
    }



    // rest result to empty
    stage.find('#txt:result').text("").fill("black");

    // get the virtual address from the text box
    val = document.getElementById('textIn').value

    // check if the virtual address is valid
    if(parseInt(val)>=0 && parseInt(val)<=64) {
        // get the address and turn it into binary to extract VPN and FPN
        bin = String(dec2bin(val)).padStart(6, "0")
        // finding VPN
        virtualPageNumber = parseInt(bin[0] + '' + bin[1], 2);
        // finding FPN
        physicalPageFrame = pageTable[virtualPageNumber]
        // extracting the offset
        offsetValue = parseInt(bin[2] + '' + bin[3] + '' + bin[4] + '' + bin[5], 2);

        // fill the virtual address virtual box
        stage.find('#txt:boxvaddr').text(val+"\n"+bin);

        selectedColor = "#e5f1a3";

        // make first line bold
        stage.find('#txt:prog:1').fontStyle('bold');
        animationStep=1;
    }
    else{ // if address is not valid ask user to input another one
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
        // fill vpn value
        stage.find('#txt:vpnBox').text(virtualPageNumber);
        // make next line bold and normalize current program line
        stage.find('#txt:prog:1').fontStyle('normal');
        stage.find('#txt:prog:2').fontStyle('bold');

        stage.find('#rec:vp' + virtualPageNumber).fill(selectedColor);

        layer.draw();
        animationStep++;
    }
    else if (animationStep===2){

        // make next line bold and normalize current program line
        stage.find('#txt:prog:2').fontStyle('normal');
        stage.find('#txt:prog:3').fontStyle('bold');



        // fill success box
        if(tlb.includes(virtualPageNumber)) {
            stage.find('#txt:success').fontStyle('normal').text("True").stroke("green");
            let vpnIDX=tlb.findIndex(x => x ===virtualPageNumber)+1;
            console.log(vpnIDX)
            stage.find('#rec:tlb:vpn:'+vpnIDX).fill(selectedColor);
            stage.find('#rec:tlb:fpn:'+vpnIDX).fill(selectedColor);
            stage.find('#rec:tlb:pb:'+vpnIDX).fill(selectedColor);
        }
        else {
            stage.find('#txt:success').fontStyle('normal').text("False").stroke("red");
        }

        layer.draw();
        animationStep++;
    }
    else if (animationStep===3){
        if(tlb.includes(virtualPageNumber)) {
            stage.find('#txt:prog:3').fontStyle('normal');
            stage.find('#txt:prog:4').fontStyle('bold');
            stage.find('#txt:success').fontStyle('normal').text("True").stroke("green");
        }
        else {
            stage.find('#txt:prog:3').fontStyle('normal');
            stage.find('#txt:prog:11').fontStyle('bold');
        }

        layer.draw();
        animationStep++;
    }
    else if (animationStep===4){

        if(tlb.includes(virtualPageNumber)) {
            stage.find('#txt:prog:4').fontStyle('normal');
            stage.find('#txt:prog:5').fontStyle('bold');
        }
        else {
            stage.find('#txt:prog:11').fontStyle('normal');
            stage.find('#txt:prog:12').fontStyle('bold');
            stage.find('#arrow:'+virtualPageNumber).fill('red');
            stage.find('#arrow:'+virtualPageNumber).stroke('red');
        }

        layer.draw();
        animationStep++;
    }
    else if (animationStep===5){
        console.log("Step 5")

        if(tlb.includes(virtualPageNumber)) {
            stage.find('#txt:prog:5').fontStyle('normal');
            stage.find('#txt:prog:6').fontStyle('bold');
            stage.find('#txt:offsetBox').text(offsetValue);
        }
        else {
            stage.find('#txt:prog:12').fontStyle('normal');
            stage.find('#txt:prog:13').fontStyle('bold');
            stage.find('#arrow:'+virtualPageNumber).fill('black');
            stage.find('#arrow:'+virtualPageNumber).stroke('black');

            // Highlight the selected PTE
            stage.find('#rec:pte:vpn' + virtualPageNumber).fill(selectedColor);
            stage.find('#rec:pte:vb' + virtualPageNumber).fill(selectedColor);
            stage.find('#rec:pte:pb' + virtualPageNumber).fill(selectedColor);
            stage.find('#rec:pte:fpn' + virtualPageNumber).fill(selectedColor);
        }

        layer.draw();
        animationStep++;
    }
    else if (animationStep===6){
        console.log("Step 6")

        if(tlb.includes(virtualPageNumber)) {
            stage.find('#txt:prog:6').fontStyle('normal');
            stage.find('#txt:prog:7').fontStyle('bold');
            //Mark the Physical page frame
            stage.find('#rec:pf' + physicalPageFrame).fill(selectedColor);

        }
        else {
            if(virtualPageNumber===1){
                stage.find('#txt:prog:13').fontStyle('normal');
                stage.find('#txt:prog:14').fontStyle('bold');
            } else {
                stage.find('#txt:prog:13').fontStyle('normal');
                stage.find('#txt:prog:15').fontStyle('bold');
            }
        }


        layer.draw();
        animationStep++;
    }
    else if (animationStep===7){
        if(tlb.includes(virtualPageNumber)) {
            binPF= String(dec2bin(physicalPageFrame)).padStart(3,"0")
            stage.find('#txt:prog:7').fontStyle('normal');
            stage.find('#txt:prog:20').fontStyle('bold');
            // Show the registry result
            stage.find('#txt:result').text("eax=AccessMemory("+ parseInt(binPF[0]+''+binPF[1]+''+binPF[2]+''+bin[2]+''+bin[3]+''+bin[4]+''+bin[5],2)+")").fill("green");
            animationStep=0;
        }
        else {
            if(virtualPageNumber===1){
                stage.find('#txt:result').text("Error: SEGMENTATION FAULT").fill("red");
                stage.find('#txt:prog:14').fontStyle('normal');
                stage.find('#txt:prog:20').fontStyle('bold');
                animationStep=0;

            }else if (virtualPageNumber===0){
                stage.find('#txt:prog:15').fontStyle('normal');
                stage.find('#txt:prog:16').fontStyle('bold');
            }else{
                stage.find('#txt:prog:15').fontStyle('normal');
                stage.find('#txt:prog:18').fontStyle('bold');
            }
            animationStep++;
        }

        layer.draw();
    }
    else if(animationStep===8){
        if(virtualPageNumber === 0){
            stage.find('#txt:prog:16').fontStyle('normal');
            stage.find('#txt:prog:20').fontStyle('bold');
            stage.find('#txt:result').text("Error: PROTECTION FAULT").fill("red");
            animationStep=0;
        }else {
            stage.find('#txt:prog:18').fontStyle('normal');
            stage.find('#txt:prog:19').fontStyle('bold');

            // Put the PTE in the cache
            tlb.push(virtualPageNumber);
            stage.find('#txt:tlb:vpn:'+tlb.length).text(virtualPageNumber);
            stage.find('#txt:tlb:fpn:'+tlb.length).text(physicalPageFrame);
            stage.find('#txt:tlb:pb:'+tlb.length).text('True');
        }
        layer.draw();
        animationStep++;

    }
    else if(animationStep===9){
        stage.find('#txt:prog:19').fontStyle('normal');
        stage.find('#txt:prog:1').fontStyle('bold');
        layer.draw();
        animationStep=1;
    }

}
