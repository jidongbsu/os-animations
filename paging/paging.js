// Authors: Rezvan Joshaghani   rezvanjoshaghani@u.boisestate.edu

var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 1000
});

var layer = new Konva.Layer();

var virtualPageNumber;
var physicalPageFrame;
var addressOffset;

// vp# -> pf#
var pageTable=[3,7,5,2]

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

// *************************************************************************
// ***************************** Make Virtual Memory ***********************
// *************************************************************************
var cellWidth=100;
var cellHeight=50;
var xStart=40;
var yStart=100;


var vMemory = new Konva.Text({
    x: xStart+10,
    y: yStart-30,
    text: "Virtual Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vMemory)

for (let i = 0; i < 4 ; i++) {
    var vAddressNum = new Konva.Text({
        x: xStart-30,
        y: yStart+i*cellHeight-10,
        text: i*16,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
    });
    layer.add(vAddressNum)
    drawRectWithText(xStart, yStart+i*cellHeight, cellWidth, cellHeight, "page"+String(i), "#e0b6ff","vp"+i);
}

var vAddressNum = new Konva.Text({
    x: xStart-30,
    y: yStart+4*cellHeight-10,
    text: 4*16,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(vAddressNum)


// *************************************************************************
// ***************************** Make Physical Memory **********************
// *************************************************************************

var phCellWidth=200;
var phCellHeight=50;
var phXStart=50;
var phYStart=400;

var phMemory = new Konva.Text({
    x: phXStart+10,
    y: phYStart-30,
    text: "Physical Memory",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(phMemory)


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


for (let i = 0; i < 8 ; i++) {

    var phAddressNum = new Konva.Text({
        x: phXStart-40,
        y: phYStart+i*phCellHeight-10,
        text: i*16,
        fontSize: 20,
        fontFamily: 'Calibri',
        fill: 'black',
    });
    layer.add(phAddressNum)
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

var phAddressNum = new Konva.Text({
    x: phXStart-40,
    y: phYStart+8*phCellHeight-10,
    text: 8*16,
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(phAddressNum)


// *************************************************************************
// ******************************** Make address bits **********************
// *************************************************************************


var vAddressBitCellWidth=50;
var vAddressBitCellHeight=50;
var vAddressBitXStart=700;
var vAddressBitYStart=100;
let offsetColor="#ecc579"
let pfnColor="#98DDDD"
let vpnColor="#E0B6FF"


for (let i = 0; i < 6 ; i++) {

    if (i<2)
        drawRectWithText(vAddressBitXStart+vAddressBitCellWidth+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, 0, vpnColor,"va"+i);
    else
        drawRectWithText(vAddressBitXStart+vAddressBitCellWidth+i*vAddressBitCellWidth, vAddressBitYStart, vAddressBitCellWidth, vAddressBitCellHeight, 0, offsetColor,"va"+i);

}


for (let i = 0; i < 7 ; i++) {

    if (i<3)
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart+500, vAddressBitCellWidth, vAddressBitCellHeight, 0, pfnColor,"pa"+i);
    else
        drawRectWithText(vAddressBitXStart+i*vAddressBitCellWidth, vAddressBitYStart+500, vAddressBitCellWidth, vAddressBitCellHeight, 0, offsetColor,"pa"+i);



    let arrowY= vAddressBitYStart+vAddressBitCellHeight
    let arrowLen= 450;
    if (i==0){
        arrowY= vAddressBitYStart+vAddressBitCellHeight+200
        arrowLen=250
    }

    var arrow = new Konva.Arrow({
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


function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}


layer.batchDraw()

stage.add(layer)



function drawPageTable(x,y,w,h,vpn,fpn,vb,pb)
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

drawPageTable(ptXstart,ptYstart,ptCellWidth,ptCellheight,"VPN","PFN","Valid\n bit","Protection\n bit")
drawPageTable(ptXstart,ptYstart+ptCellheight,ptCellWidth,ptCellheight,0,pageTable[0],"False","False")
drawPageTable(ptXstart,ptYstart+ptCellheight*2,ptCellWidth,ptCellheight,1,pageTable[1],"False","True")
drawPageTable(ptXstart,ptYstart+ptCellheight*3,ptCellWidth,ptCellheight,2,pageTable[2],"True","False")
drawPageTable(ptXstart,ptYstart+ptCellheight*4,ptCellWidth,ptCellheight,3,pageTable[3],"True","True")

var pageTableText = new Konva.Text({
    x: xStart+300,
    y: yStart-30,
    text: "Page Table",
    fontSize: 20,
    fontFamily: 'Calibri',
    fill: 'black',
});
layer.add(pageTableText)


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
    "18.   \t\t PhysAddr = (PTE.PFN << PFN_SHIFT) | offset",
    "19.   \t\t Register = AccessMemory(PhysAddr)",];

for (let i=0;i<consumerProg.length;i++){
    let t=makeText(1100,80+(i*20),consumerProg[i],"prog:"+(i+1));
    layer.add(t)
}

stage.find('#txt:prog:1').fill("gray");
stage.find('#txt:prog:4').fill("gray");
stage.find('#txt:prog:7').fill("gray");
stage.find('#txt:prog:10').fill("gray");
stage.find('#txt:prog:16').fill("gray");




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

function translateAddress() {

    for (let i=0;i<8;i++){
        stage.find('#rec:vp' + virtualPageNumber).fill(vpnColor);
        stage.find('#rec:pf' + physicalPageFrame).fill(pfnColor);
        stage.find('#rec:pte:vpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:fpn' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:vb' + virtualPageNumber).fill("#ffffff");
        stage.find('#rec:pte:pb' + virtualPageNumber).fill("#ffffff");
    }

    for (let i=1;i<=19;i++){
        stage.find('#txt:prog:'+i).fontStyle('normal');
    }

    stage.find('#txt:result').text("").fill("black");

    let val=document.getElementById('textIn').value
    if(parseInt(val)>=0 && parseInt(val)<=64){
        let bin=String(dec2bin(val)).padStart(6,"0")
        virtualPageNumber = parseInt(bin[0]+''+bin[1],2);
        physicalPageFrame = pageTable[virtualPageNumber]
        let offsetValue = parseInt(bin[2]+''+bin[3]+''+bin[4]+''+bin[5],2);

        selectedColor="#e5f1a3";

        stage.find('#rec:vp' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pf' + physicalPageFrame).fill(selectedColor);
        stage.find('#rec:pte:vpn' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:fpn' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:vb' + virtualPageNumber).fill(selectedColor);
        stage.find('#rec:pte:pb' + virtualPageNumber).fill(selectedColor);



        for (let i = 0; i < 6 ; i++) {
            stage.find('#txt:va' + i).text(bin[i]);
            if(i>1){
                stage.find('#txt:pa' + (i+1)).text(bin[i]);
            }
        }

        let binPF= String(dec2bin(physicalPageFrame)).padStart(3,"0")
        stage.find('#txt:pa0').text(binPF[0]);
        stage.find('#txt:pa1').text(binPF[1]);
        stage.find('#txt:pa2').text(binPF[2]);

        stage.find('#txt:vpn').text("VPN = "+virtualPageNumber);
        stage.find('#txt:pfn').text("PFN = "+physicalPageFrame);
        stage.find('#txt:voffset').text("virtual offset = " + offsetValue);
        stage.find('#txt:poffset').text("physical offset = " + offsetValue);

        if(virtualPageNumber==0 || virtualPageNumber==1){
            stage.find('#txt:result').text("Error: SEGMENTATION FAULT").fill("red");
            stage.find('#txt:prog:11').fontStyle('bold');
            stage.find('#txt:prog:12').fontStyle('bold');
        }
        else if(virtualPageNumber==2){
            stage.find('#txt:result').text("Error: PROTECTION FAULT").fill("red");
            stage.find('#txt:prog:13').fontStyle('bold');
            stage.find('#txt:prog:14').fontStyle('bold');

        }
        else if(virtualPageNumber==3){
            stage.find('#txt:result').text("eax=AccessMemory("+ parseInt(binPF[0]+''+binPF[1]+''+binPF[2]+''+bin[2]+''+bin[3]+''+bin[4]+''+bin[5],2)+")").fill("green");
            stage.find('#txt:prog:15').fontStyle('bold');
            stage.find('#txt:prog:16').fontStyle('bold');
            stage.find('#txt:prog:17').fontStyle('bold');
            stage.find('#txt:prog:18').fontStyle('bold');
            stage.find('#txt:prog:19').fontStyle('bold');
        }
    }
    else{
        alert("The Virtual Address entered is not valid!")
    }
    layer.draw()


}