// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 1000
});

var empty=1;
var full=0;
var count=0;

// then create layer
var layer = new Konva.Layer();

var bufferPos=0;

class Process{
    constructor(id){
        this.pid=id;
        this.status="Ready";
        this.ax=0;
        this.bx=0;
        this.pc=1;
        this.i=0;
        this.countCopy=0;
        this.finished=false;
    }
    run(){
        // if(this.status=="Sleep" && mutex==0){
        //     this.status='Running';
        // }
        // if(!this.finished && this.status!="Sleep") {
        //     this.prog();
        // }
        // console.log("IN Run Mutex= "+mutex);
        // console.log("IN Run "+ this.status );

        this.status = "Running";
        if (this.pc == 1) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 2) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 3) {
            this.drawChanges();
            if(this.pid==1 && empty==1) {
              empty--;
            }
            else if((this.pid==2) && full==1){
              full--;
            }
            this.pc++;
        } else if (this.pc == 4) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 5) {
            if(this.pid==1) {
                bufferPos++;
                this.changeBuffer(bufferPos - 1,1);
                count=1;
                stage.find('#condrec').fill('red');
            }
            else if((this.pid==2)){
                bufferPos--;
                this.changeBuffer(bufferPos,0);
                count=0;
                stage.find('#condrec').fill('green');
            }
            if (this.ax < 3) { // ax is the loop count
                if(this.pid==1 && empty==0) {
                  empty++;
                }
                else if((this.pid==2) && full==0){
                  full++;
                }
                this.ax--;
                this.drawChanges();
                this.pc = 2; // for loop
            }
            else {
                this.drawChanges();
                this.end();
                stage.find('#txt:p' + this.pid + 'pc').text(this.pc);
            }
        }
    }

    stop(){
        //console.log("o hoy hoy");
        if(this.finished)
            return;
        this.status="Ready";
        stage.find('#prec'+this.pid).stroke('#f7f52b');
        stage.find('#txt:p'+this.pid+'stat').text(this.status);
        stage.find('#txt:p'+this.pid+'pc').text(this.pc);
        stage.find('#pstat'+this.pid).fill('#ff8f36');
        stage.find('#pstat'+this.pid).text("Status="+this.status);
        layer.draw();
    }

    sleep(){
        if(this.finished)
            return;
        this.status="Sleep";
        stage.find('#prec'+this.pid).stroke('#555');
        stage.find('#txt:p'+this.pid+'stat').text(this.status);
        stage.find('#txt:p'+this.pid+'pc').text(this.pc);
        stage.find('#pstat'+this.pid).fill('#555');
        stage.find('#pstat'+this.pid).text("Status="+this.status);
        layer.draw();
    }

    end(){
        this.status="Ended";
        this.finished=true;
        stage.find('#txt:p'+this.pid+'stat').text(this.status);
        stage.find('#prec'+this.pid).stroke('#555');
        for(let i=1;i<=5;i++){ // 5 lines of code
            stage.find('#prog'+this.pid+i).fontStyle('normal');
        }
        stage.find('#pstat' + this.pid).text("Status=End");
        stage.find('#pstat' + this.pid).fill('red');
        layer.draw();
    }

    makeBold(id){
        for(let i=1;i<=5;i++){ // 5 lines of code
            if(i!=id){
                stage.find('#prog'+this.pid+i).fontStyle('normal');
            }
            else{
                stage.find('#prog'+this.pid+id).fontStyle('bold');
            }
        }
    }

    drawChanges(){
        if(!this.finished){
            this.makeBold(this.pc);
            stage.find('#txt:p' + this.pid + 'reg').text('ax=' + this.ax + '\n' + 'bx=' + this.bx);
            stage.find('#txt:p' + this.pid + 'stat').text(this.status);
            stage.find('#txt:p' + this.pid + 'pc').text(this.pc);
            stage.find('#prec' + this.pid).stroke('#27b422');
            stage.find('#pstat' + this.pid).fill('green');
            stage.find('#pstat' + this.pid).text("Status="+this.status);
            layer.draw();
        }
    }

    error(){
        if(!this.finished){
            this.makeBold(this.pc);
            this.status="ERROR: Empty Buffer"
            stage.find('#txt:p' + this.pid + 'stat').text(this.status);
            stage.find('#txt:p' + this.pid + 'pc').text(this.pc);
            stage.find('#prec' + this.pid).stroke('#dd1514');
            stage.find('#pstat' + this.pid).fill('red');
            stage.find('#pstat' + this.pid).text("Status="+this.status);
            layer.draw();
        }
    }

    changeBuffer(id,action){
        console.log(id);
        if(action==0){
            stage.find('#buffstat').text('Empty');
            stage.find('#brec'+id).fill('#ddd');
        }
        else if(action==1){
            stage.find('#buffstat').text('Full');
            stage.find('#brec'+id).fill('#f86458');
        }
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
        width: 400,
        padding: 20,
        // align: 'center',
    });

}

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

makeBuffer(200,400,1,100,100);

var runningProcess=1;

var sn=0;

function runNextCommand() {
    console.log("sn= "+sn);
    if(sn==0 || sn==1 || sn==2 ){
        c1.run();
        sn++;
    }
    else if(sn==3){
        c1.sleep();
        sn++;
    }
    else if(sn==4){
        p1.run();
        sn++;
    }
    else if(sn==5 || sn==6 || sn==7 || sn==8 || sn==10){
        p1.run();
        sn++;
    }
    else if(sn==9){
        p1.run();
        c1.stop();
        sn++;
    }
    else if(sn==11){
        p1.sleep();
        sn++;
    }
    else if(sn== 12 || sn==13 || sn==15){
        c1.run();
        sn++;
    }
    else if(sn==14){
        c1.run();
        p1.stop();
        sn++;
    }
    else if(sn==16){
        c1.sleep();
        sn++;
    }
    else if(sn==17 || sn==18 || sn==20){
        p1.run();
        sn++;
    }
    else if(sn==19){
        p1.run();
        c1.stop();
        sn++;
    }
    else if(sn==21){
        p1.sleep();
        sn++;
    }
    else if(sn== 22 || sn==23 || sn==25){
        c1.run();
        sn++;
    }
    else if(sn==24){
        c1.run();
        p1.stop();
        sn++;
    }
    else if(sn==26){
        c1.sleep();
        sn++;
    }
    else if(sn==27 || sn==28){
        p1.run();
        sn++;
    }
    else if(sn==29){
        p1.end();
        c1.stop();
        sn++;
    }
    else if(sn== 30 || sn==31){
        c1.run();
        sn++;
    }
    else if(sn==32){
        c1.end();
        sn++;
    }
}


// since this text is inside of a defined area, we can center it using
// align: 'center'
var p1 = new Konva.Text({
    x: 20,
    y: 60,
    text:
        "Producer 1\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});


var p2 = new Konva.Text({
    x: 440,
    y: 60,
    text:
        "Consumer 1\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
    // align: 'center',
});

//var p3 = new Konva.Text({
//    x: 860,
//    y: 60,
//    text:
//        "Consumer 2\n\n \n " ,
//    fontSize: 18,
//    fontFamily: 'Calibri',
//    fill: '#000000',
//    width: 300,
//    padding: 20,
    // align: 'center',
//});


var rect1 = new Konva.Rect({
    x: 20,
    y: 60,
    id:"prec1",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 250,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var rect2 = new Konva.Rect({
    x: 440,
    y: 60,
    id:"prec2",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 250,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var rect3 = new Konva.Rect({
    x: 860,
    y: 60,
    id:"prec3",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 250,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});


var status1 = new Konva.Text({
    x:  30,
    y: 30,
    id:'pstat1',
    text: "status=Ready",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var status2 = new Konva.Text({
    x: 450,
    y: 30,
    id:'pstat2',
    text: "status=Ready",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

//var status3 = new Konva.Text({
//    x: 870,
//    y: 30,
//    id:'pstat3',
//    text: "status=Ready",
//    fontSize: 28,
//    fontFamily: 'Calibri',
//    fill: '#555',
//});


var bufferText = new Konva.Text({
    x: 20,
    y: 440,
    text: "Shared Buffer",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
});

var bufferStatus = new Konva.Text({
    x: 210,
    y: 515,
    id:"buffstat",
    text: "Empty",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#000000',
});


var mutexRec = new Konva.Rect({
    x: 20,
    y: 350,
    id:"murec",
    stroke: '#555',
    strokeWidth: 5,
    fill: 'green',
    width: 100,
    height: 100,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
});

var condRec = new Konva.Rect({
    x: 200,
    y: 350,
    id:"condrec",
    stroke: '#555',
    strokeWidth: 5,
    fill: 'green',
    width: 100,
    height: 100,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
});



//add the shapes to the layer
layer.add(rect1);
layer.add(p1);

layer.add(rect2);
layer.add(p2);

//layer.add(rect3);
//layer.add(p3);

// layer.add(mutexRec);
// layer.add(condRec);


layer.add(status1);
layer.add(status2);
//layer.add(status3);


layer.add(bufferText);
layer.add(bufferStatus);



var producerProg=["1. int i;" ,
    "2. for (i = 0; i < loops; i++) {" ,
    "3. \t\t sem_wait(&empty);" ,
    "4. \t\t put(i);",
    "5. \t\t sem_post(&full);} "];

for (let i=0;i<producerProg.length;i++){
    let t=makeText(20,80+(i*20),producerProg[i],'1'+(i+1));
    layer.add(t)
}


var consumerProg=["1. int i;" ,
    "2. for (i = 0; i < loops; i++) {" ,
    "3. \t\t sem_wait(&full);" ,
    "4. \t\t tmp = get();",
    "5. \t\t sem_post(&empty);} "];

for (let i=0;i<consumerProg.length;i++){
    let t=makeText(440,80+(i*20),consumerProg[i],'2'+(i+1));
    layer.add(t)
}

//for (let i=0;i<consumerProg.length;i++){
//    let t=makeText(860,80+(i*20),consumerProg[i],'3'+(i+1));
//    layer.add(t)
//}

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();

var p1=new Process(1);
var c1=new Process(2);
//var c2=new Process(3);

p1.stop();
c1.stop();
//c2.stop();



