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

var vm = new Konva.Text({
    x: 330,
    y: 5,
    id:'virtual',
    text: "Virtual Memory",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var cellWidth=220;
var cellHeight=50;
var xStart=320;
var yStart=50;

// Virtual Memory
drawRectWithText(xStart-20, yStart, cellWidth+50, 4*cellHeight, "Kernel Memory", "#82fff7","hpid");

drawRectWithText(xStart, yStart+0.7*cellHeight, cellWidth, 0.6*cellHeight, "Kernel Exception Handlers", "#d29eff","exceptionhandlers");

drawRectWithText(xStart, yStart+1.3*cellHeight, cellWidth, 0.7*cellHeight, "The Page", "#d29eff","thepage");

drawRectWithText(xStart, yStart+2*cellHeight, cellWidth, 2*cellHeight, "The Kernel Module", "#d29eff","kernel module");

drawRectWithText(xStart+20, yStart+2.7*cellHeight, cellWidth-50, 0.7*cellHeight, "VMA", "#d29eff","vma");

drawRectWithText(xStart+20, yStart+3.4*cellHeight, cellWidth-50, 0.6*cellHeight, "Page Fault Handler", "#d29eff","pfh");

drawRectWithText(xStart-20, yStart+4*cellHeight, cellWidth+50, 9*cellHeight, "User Memory", "#bb3355","p2");

drawRectWithText(xStart, yStart+5*cellHeight, cellWidth, cellHeight, "Stack", "#d29eff","p2");

drawRectWithText(xStart, yStart+6*cellHeight, cellWidth, cellHeight, "", "#d29eff","p2");

drawRectWithText(xStart, yStart+7*cellHeight, cellWidth, cellHeight, "Heap", "#d29eff","p2");

drawRectWithText(xStart, yStart+8*cellHeight, cellWidth, cellHeight, "The Alloc Region", "#d29eff","p2");

drawRectWithText(xStart, yStart+9*cellHeight, cellWidth, cellHeight, "", "#d29eff","p2");

drawRectWithText(xStart, yStart+10*cellHeight, cellWidth, cellHeight, "", "#d29eff","p2");

drawRectWithText(xStart, yStart+11*cellHeight, cellWidth, cellHeight, "Libraries", "#d29eff","p2");

drawRectWithText(xStart, yStart+12*cellHeight, cellWidth, cellHeight, "Application Code", "#d29eff","p2");

var cellWidth=160;
var cellHeight=50;
var xStart=1120;
var yStart=50;

var pm = new Konva.Text({
    x: 950,
    y: 5,
    id:'physical',
    text: "Physical Memory",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

// Physical Memory
xStart=950;
yStart=450;
cellWidth=200;
drawRectWithText(xStart, yStart-400, cellWidth, cellHeight, "", "#99dd","kernel code");
drawRectWithText(xStart, yStart-350, cellWidth, cellHeight, "Mapped Page Frame", "#99dd","tesla kill code");
drawRectWithText(xStart, yStart-300, cellWidth, cellHeight, "", "#99dd","kernel code");
drawRectWithText(xStart, yStart-250, cellWidth, cellHeight, "", "#99dd","sys kill code");
drawRectWithText(xStart, yStart-200, cellWidth, cellHeight, "", "#99dd","kernel code");

// Page Tables
var ptable = new Konva.Text({
    x: 950,
    y: 400,
    id:'ptable',
    text: "Page Table",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

drawRectWithText(xStart, yStart, cellWidth, 4*cellHeight, "", "#4682b4","pagetable");

var arrowRight1 = new Konva.Arrow({
    points: [320, 215, 200, 300, 320, 475],
	tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright1",
    fill: 'yellow',
    stroke: 'yellow',
    strokeWidth: 5,
});

var arrowRight2 = new Konva.Arrow({
    points: [320, 675, 200, 600, 320, 475],
	tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright2",
    fill: 'green',
    stroke: 'green',
    strokeWidth: 5,
});

var arrowRight3 = new Konva.Arrow({
    points: [320, 100, 150, 300, 320, 675],
	tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright3",
    fill: 'khaki',
    stroke: 'khaki',
    strokeWidth: 5,
});
var arrowRight4 = new Konva.Arrow({
    points: [320, 675, 200, 300, 320, 235],
	tension: 0.5,
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright4",
    fill: 'pink',
    stroke: 'pink',
    strokeWidth: 5,
});

var arrowRight5 = new Konva.Arrow({
    points: [540, 125, 945, 125],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright5",
    fill: 'orange',
    stroke: 'orange',
    strokeWidth: 5,
});

var arrowRight6 = new Konva.Arrow({
    points: [510, 235, 950, 450],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright6",
    fill: 'purple',
    stroke: 'purple',
    strokeWidth: 5,
});

var arrowRight7 = new Konva.Arrow({
    points: [540, 475, 945, 125],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowright7",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

layer.add(vm);
layer.add(pm);
layer.add(ptable);
layer.draw();

var lt=0;

var malloclabel = new Konva.Label({
        x: 80,
        y: 350,
        opacity: 0.75,
      });

malloclabel.add(
    new Konva.Tag({
    fill: 'yellow',
    })
);

malloclabel.add(
    new Konva.Text({
    text: '1. Allocate Virtual Memory',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var accesslabel = new Konva.Label({
        x: 10,
        y: 550,
        opacity: 0.75,
      });

accesslabel.add(
    new Konva.Tag({
    fill: 'green',
    })
);

accesslabel.add(
    new Konva.Text({
    text: '2. Access the Allocated Virtual Memory',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var segfaultlabel = new Konva.Label({
        x: 10,
        y: 250,
        opacity: 0.75,
      });

segfaultlabel.add(
    new Konva.Tag({
    fill: 'khaki',
    })
);

segfaultlabel.add(
    new Konva.Text({
    text: '3. Kernel Delivers a Seg Fault to App',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var pagefaultlabel = new Konva.Label({
        x: 20,
        y: 450,
        opacity: 0.75,
      });

pagefaultlabel.add(
    new Konva.Tag({
    fill: 'pink',
    })
);

pagefaultlabel.add(
    new Konva.Text({
    text: '4. Send a Page Fault ioctl Command',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var pagelabel = new Konva.Label({
        x: 630,
        y: 80,
        opacity: 0.75,
      });

pagelabel.add(
    new Konva.Tag({
    fill: 'orange',
    })
);

pagelabel.add(
    new Konva.Text({
    text: '5. Allocate a Page from the Kernel',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var pagetablelabel = new Konva.Label({
        x: 700,
        y: 380,
        opacity: 0.75,
      });

pagetablelabel.add(
    new Konva.Tag({
    fill: 'purple',
    })
);

pagetablelabel.add(
    new Konva.Text({
    text: '6. Update Page Table',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

var pagemappinglabel = new Konva.Label({
        x: 600,
        y: 200,
        opacity: 0.75,
      });

pagemappinglabel.add(
    new Konva.Tag({
    fill: 'red',
    })
);

pagemappinglabel.add(
    new Konva.Text({
    text: '7. Virtual to Physical Mapping Established',
    fontFamily: 'Calibri',
    fontSize: 18,
    padding: 5,
    fill: 'black',
    })
);

// add the layer to the stage
stage.add(layer);

var pc=1;

function next() {
    if(pc == 1){
		layer.add(arrowRight1);
		layer.add(malloclabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
		layer.add(arrowRight2);
		layer.add(accesslabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 3){
		layer.add(arrowRight3);
		layer.add(segfaultlabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 4){
		layer.add(arrowRight4);
		layer.add(pagefaultlabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 5){
		layer.add(arrowRight5);
		layer.add(pagelabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 6){
		layer.add(arrowRight6);
		layer.add(pagetablelabel);
        layer.draw();
        pc=pc+1;
    }else if(pc == 7){
		layer.add(arrowRight7);
		layer.add(pagemappinglabel);
        layer.draw();
        pc=pc+1;
    }
}

/* vim: set ts=4: */
