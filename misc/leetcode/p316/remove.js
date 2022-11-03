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

makeBuffer(200,440,5,100,50); // a buffer whose size is 5.

layer.draw();

var pc=1;

/* this runs when user clicks the "next step" button */
function nextstep() {
    if(pc == 1){
        //layer.add(search);
        //layer.add(arrowSearch);
        layer.draw();
        pc=pc+1;
    }else if(pc == 2){
        //movearrowUpsearch();
        layer.draw();
        pc=pc+1;
    }
}

/* vim: set ts=4: */
