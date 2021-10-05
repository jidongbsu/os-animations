// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 1000
});

var empty=5;
var full=0;
var count1=0;
var count2=0;
var count3=0;
var getoutofPut=0;
var switchtorun=0;

// then create layer
var layer = new Konva.Layer();

var fillptr=0;
var useptr=0;

class Thread{
    constructor(id){
        this.pid=id;
        this.status="Ready";
        this.pc=1;
        this.i=0;
        this.runlineinPut=0;
        this.finished=false;
    }
    run(){
        this.status = "Running";
        if (this.pc == 1) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 2) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 3) {
            this.drawChanges();
            if(this.pid==1) {
              empty--;
              if(empty < 0) {
                p1.sleep();
                runningThread=3; // when producer 1 sleeps, it indicates all buffers are filled
              }
            }
            if(this.pid==2) {
              empty--;
              if(empty < 0) {
                p2.sleep();
                runningThread=3; // when producer 2 sleeps, it indicates all buffers are filled
              }
            }
            if(this.pid==3) {
              full--;
              if(full < 0) {
                c1.sleep();
                runningThread=1;
              }
            }
            this.pc++;
        } else if (this.pc == 4) {
            if(this.pid==1) { // producer 1
                if(this.runlineinPut==0){
                    stage.find('#prog'+'4'+1).fontStyle('bold'); // highlight line 1 of the put function.
                    stage.find('#prog'+'4'+2).fontStyle('normal'); // in case line 2 is already highlighted, set it back to normal.
                    this.runlineinPut=1;
                    this.drawChanges();
                }else if(this.runlineinPut==1){
                    stage.find('#prog'+'4'+2).fontStyle('bold'); // highlight line 2 of the put function.
                    stage.find('#prog'+'4'+1).fontStyle('normal'); // line 1 goes to normal.
                    bufText[fillptr].text(count1); // when we highlight line 2, it indicates line 1 is finished, and we put the item in the buffer.
                    this.changeBuffer(fillptr,1); // and change buffer color.
                    this.runlineinPut=2;
                    this.drawChanges();
                 }else{   
                    stage.find('#prog'+'4'+2).fontStyle('normal');
                    fillptr=(fillptr+1)%5;
                    stage.find('#arrowup').x(fillptr*100);
                    this.runlineinPut=0; // reset runlineinPut to 0; prepare for next time when we enter into put().
            //        getoutofPut=1;
                    this.drawChanges();
                    this.pc++;
                }
            }
            else if((this.pid==2)){ // producer 2
                if(this.runlineinPut==0){
                    stage.find('#prog'+'4'+1).fontStyle('bold'); // highlight line 1 of the put function.
                    stage.find('#prog'+'4'+2).fontStyle('normal'); // in case line 2 is already highlighted, set it back to normal.
                    this.runlineinPut=1;
                    this.drawChanges();
                }else if(this.runlineinPut==1){
                    stage.find('#prog'+'4'+2).fontStyle('bold'); // highlight line 2 of the put function.
                    stage.find('#prog'+'4'+1).fontStyle('normal'); // line 1 goes to normal.
                    bufText[fillptr].text(count2); // when we highlight line 2, it indicates line 1 is finished, and we put the item in the buffer.
                    this.changeBuffer(fillptr,1); // and change buffer color.
                    this.runlineinPut=2;
                    this.drawChanges();
                }else{
                    stage.find('#prog'+'4'+2).fontStyle('normal');
                    fillptr=(fillptr+1)%5;
                    stage.find('#arrowup').x(fillptr*100);
                    this.runlineinPut=0; // reset runlineinPut to 0; prepare for next time when we enter into put().
              //      getoutofPut=1;
                    this.drawChanges();
                    this.pc++;
                }
            }else if((this.pid==3)){ // consumer 1 
                this.drawChanges();
                this.pc++;
            }
        } else if (this.pc == 5) {
            if ((this.pid==1) && count1 < 10) { // count1 is the loop count
                count1++;
                full++;
                this.drawChanges();
                c1.stop();
                this.pc = 2; // for loop
            }
            else if((this.pid==2) && count2 < 10){ // count2 is the loop count
                count2++;
                full++;
                this.drawChanges();
                c1.stop();
                this.pc = 2; // for loop
            }
            else if((this.pid==3) && count3 < 10){
                bufText[useptr].text(""); // we are about to run line 5, and at this moment we finish line 4 first.
                this.changeBuffer(useptr,0);
                useptr=(useptr+1)%5;
                stage.find('#arrowdown').x(useptr*100);
                count3++;
                empty++;
                this.drawChanges();
                p1.stop(); // stop means ready...
                p2.stop(); // wake up one of them, if we want to be more accurate
                this.pc = 2; // for loop
            }
            else {
                this.drawChanges();
                this.end();
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
        this.status="Sleeping";
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
            if(switchtorun==1){
                this.status = "Running";
                switchtorun=0;
            }
            this.makeBold(this.pc);
        //    stage.find('#txt:p' + this.pid + 'stat').text(this.status);
        //    stage.find('#txt:p' + this.pid + 'pc').text(this.pc);
        //    stage.find('#prec' + this.pid).stroke('#27b422');
            stage.find('#pstat' + this.pid).fill('green'); // change status color to green
            stage.find('#pstat' + this.pid).text("Status="+this.status); // change status to running/ready/sleep/end
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
//            stage.find('#buffstat').text('Empty');
            stage.find('#brec'+id).fill('#ddd');
        }
        else if(action==1){
//            stage.find('#buffstat').text('Full');
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

makeBuffer(200,440,5,100,50); // a buffer whose size is 5.

var runningThread=1;

var sn=0;

function runNextCommand() {
//    console.log("sn= "+sn);
    if (runningThread==1 && !p1.finished){
//    if(sn==0 || sn==1 || sn==2 ){
        p1.run();
    }
    else if(runningThread==2 && !p2.finished){
        p2.run();
    }
    else if(runningThread==3 && !c1.finished){
        c1.run();
    }
}

function switchThreads() {
 //console.log("This means change");

    if (runningThread==1){
            p1.stop(); // stop producer 1
            runningThread=2; // switch to producer 2
//            switchtorun=1;
            p2.drawChanges();
    }
    else if(runningThread==2){
            p2.stop(); // stop producer 2
            runningThread=3;  // switch to consumer 1
//            switchtorun=1;
            c1.drawChanges();
    }
    else if(runningThread==3){
            c1.stop(); // stop consumer 1
            runningThread=1; // switch to producer 1
//            switchtorun=1;
            p1.drawChanges();
    }
}

// since this text is inside of a defined area, we can center it using
// align: 'center'
var text1 = new Konva.Text({
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


var text2 = new Konva.Text({
    x: 440,
    y: 60,
    text:
        "Producer 2\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
    // align: 'center',
});

var text3 = new Konva.Text({
    x: 860,
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


var rect1 = new Konva.Rect({
    x: 20,
    y: 60,
    id:"prec1",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 150,
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
    height: 150,
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
    height: 150,
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

var status3 = new Konva.Text({
    x: 870,
    y: 30,
    id:'pstat3',
    text: "status=Ready",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#555',
});

var bufText = [
new Konva.Text({
    x: 245,
    y: 450,
    text: "",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
}),
new Konva.Text({
    x: 345,
    y: 450,
    text: "",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
}),
new Konva.Text({
    x: 445,
    y: 450,
    text: "",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
}),
new Konva.Text({
    x: 545,
    y: 450,
    text: "",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
}),
new Konva.Text({
    x: 645,
    y: 450,
    text: "",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
}),
];

var bufferText = new Konva.Text({
    x: 20,
    y: 450,
    text: "Shared Buffer",
    fontSize: 30,
    fontFamily: 'Calibri',
    fill: '#000000',
});

var bufferStatus = new Konva.Text({
    x: 210,
    y: 545,
    id:"buffstat",
    text: "Empty",
    fontSize: 28,
    fontFamily: 'Calibri',
    fill: '#000000',
});

var putRec = new Konva.Rect({
    x: 440,
    y: 260,
    id:"putrec",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 125,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var getRec = new Konva.Rect({
    x: 860,
    y: 260,
    id:"getrec",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 125,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
    cornerRadius: 10,
});

var put1 = new Konva.Text({
    x: 440,
    y: 260,
    text:
        "void put(int value) {\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});

var put2 = new Konva.Text({
    x: 440,
    y: 320,
    text:
        "}\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});

var get1 = new Konva.Text({
    x: 860,
    y: 260,
    text:
        "int get() {\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});

var get2 = new Konva.Text({
    x: 860,
    y: 340,
    text:
        "}\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
   // align: 'center',
});

var arrowUp = new Konva.Arrow({
    points: [250, 550, 250, 500],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowup",
    fill: 'blue',
    stroke: 'blue',
    strokeWidth: 5,
});

var arrowDown = new Konva.Arrow({
    points: [250, 380, 250, 430],
    pointerLength: 10,
    pointerWidth: 10,
    id: "arrowdown",
    fill: 'red',
    stroke: 'red',
    strokeWidth: 5,
});

//add the shapes to the layer
layer.add(rect1);
layer.add(text1);

layer.add(rect2);
layer.add(text2);

layer.add(rect3);
layer.add(text3);

layer.add(putRec);
layer.add(put1);
layer.add(put2);

layer.add(getRec);
layer.add(get1);
layer.add(get2);
// layer.add(mutexRec);
// layer.add(condRec);

layer.add(arrowUp);
layer.add(arrowDown);

layer.add(status1);
layer.add(status2);
layer.add(status3);

layer.add(bufferText);
//layer.add(bufferStatus); // now that we have 5 buffers, we don't need to show the empty/full anymore.
layer.add(bufText[0]);
layer.add(bufText[1]);
layer.add(bufText[2]);
layer.add(bufText[3]);
layer.add(bufText[4]);

var producerProg=["1. int i;" ,
    "2. for (i = 0; i < loops; i++) {" ,
    "3. \t\t sem_wait(&empty);" ,
    "4. \t\t put(i);",
    "5. \t\t sem_post(&full);} "];

for (let i=0;i<producerProg.length;i++){
    let t=makeText(20,80+(i*20),producerProg[i],'1'+(i+1)); // producer 1 code, #prog1
    layer.add(t);
}

for (let i=0;i<producerProg.length;i++){
    let t=makeText(440,80+(i*20),producerProg[i],'2'+(i+1)); // producer 2 code, #prog2
    layer.add(t);
}

var consumerProg=["1. int i;" ,
    "2. for (i = 0; i < loops; i++) {" ,
    "3. \t\t sem_wait(&full);" ,
    "4. \t\t tmp = get();",
    "5. \t\t sem_post(&empty);} "];

for (let i=0;i<consumerProg.length;i++){
    let t=makeText(860,80+(i*20),consumerProg[i],'3'+(i+1)); // consumer code, #prog3
    layer.add(t);
}

var putProg=["1. buffer[fill] = value;" ,
    "2. fill = (fill + 1) % MAX; "];

for (let i=0;i<putProg.length;i++){
    let t=makeText(440,280+(i*20),putProg[i],'4'+(i+1)); // put function code is #prog4
    layer.add(t);
}

var getProg=["1. int tmp = buffer[use];" ,
    "2. use = (use + 1) % MAX;" ,
    "3. return tmp; "];

for (let i=0;i<getProg.length;i++){
    let t=makeText(860,280+(i*20),getProg[i],'5'+(i+1)); // get function code is #prog5
    layer.add(t);
}

// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();

var p1=new Thread(1);
var p2=new Thread(2);
var c1=new Thread(3);

p1.stop();
p2.stop();
c1.stop();



