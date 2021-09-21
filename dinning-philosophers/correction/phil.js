// first we need to create a stage
var stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: 2000,
    height: 1000
});

// then create layer
var layer = new Konva.Layer();

const pName = [
    'void',
    'Nietzsche',
    'Sun Tsu',
    'Machiavelli'
];

/**
 * Philosopher runs spaghetti eating algorithms.
 * @author Jesse Riggs
 * @version 1
 */
class Philosopher{
    constructor(id){
        this.pid=id;
        this.status="Ready";
        this.pc=1;
        this.finished=false;
    }
    run(){
        this.prog();
    }

    prog(){
        this.status = "Running";
        if (this.pc == 1) {
            this.drawChanges();
            this.pc++;
        } else if (this.pc == 2) {
            this.drawChanges();
	    this.pc++;
	    if( this.pid == 1 ) return;
            this.pc += 3;
        } else if (this.pc == 3) {
            this.drawChanges();
	    this.pc++;
        } else if (this.pc == 4) {
	    this.drawChanges();
	    this.pc += 5;
	} else if (this.pc == 6) {
	    this.drawChanges();
	    this.pc++;
	} else if (this.pc == 7) {
	    this.drawChanges();
	    this.pc += 2;
	} else if (this.pc == 9) {
	    this.eat();
	    this.drawChanges();
	    // Don't draw. Prep for next draw.
	    this.finishEating();
	    this.pc++;
	} else if (this.pc == 10) {
	    this.drawChanges();
	    this.pc++;
	} else if (this.pc == 11) {
	    this.drawChanges();
	    this.pc++;
	} else if (this.pc == 12) {
	    this.drawChanges();
	}
    }

    stop(){
        if(this.finished)
            return;
        this.status="Ready";
        stage.find('#prec'+this.pid).stroke('#f7f52b');
	stage.find('#phil'+this.pid).stroke('#f7f52b');
        stage.find('#pstat'+this.pid).fill('#ff8f36');
        stage.find('#pstat'+this.pid).text("Status="+this.status);
    }

    sleep(){
        if(this.finished)
            return;
        this.status="Sleep";
        stage.find('#prec'+this.pid).stroke('#555');
	stage.find('#phil'+this.pid).stroke('#555');
        stage.find('#pstat'+this.pid).fill('#555');
        stage.find('#pstat'+this.pid).text("Status="+this.status);
    }

    end(){
        this.status="Ended";
        this.finished=true;
	stage.find('#phil'+this.pid).stroke('#555');
        stage.find('#prec'+this.pid).stroke('#555');
        stage.find('#pstat' + this.pid).text("Status=End");
        stage.find('#pstat' + this.pid).fill('#555');
        layer.draw();
    }

    makeBold(id){
        for(let i=1;i<=12;i++){
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
            stage.find('#prec' + this.pid).stroke('#27b422');
	    stage.find('#phil' + this.pid).stroke('#27b422');
            stage.find('#pstat' + this.pid).fill('green');
            stage.find('#pstat' + this.pid).text("Status="+this.status);
            layer.draw();
        }
    }

    error(){
        if(!this.finished){
            this.makeBold(this.pc);
            this.status="ERROR: ???"
            stage.find('#prec' + this.pid).stroke('#dd1514');
            stage.find('#phil' + this.pid).stroke('#dd1514');
            stage.find('#pstat' + this.pid).fill('red');
            stage.find('#pstat' + this.pid).text("Status="+this.status);
        }
    }

    getLeft(){
        return this.pid;
    }

    getRight(){
    	if( this.pid == 1 ) return 3;
        return ( this.pid - 1 );
    }

    wait( chopstick ){
        var id = '#c' + chopstick + 'label';
        var txt = 'C' + chopstick + ': ' + pName[ this.pid ];
        stage.find( id ).text( txt );
    }

    post( chopstick ){
        var id = '#c' + chopstick + 'label';
        var txt = 'C' + chopstick + ':';
	stage.find( id ).text( txt );
    }

    eat(){
        var cleft = '#c' + this.getLeft();
	stage.find(cleft).stroke('#27b422');
	stage.find(cleft + 'label').fill('#27b422');
	var cright = '#c' + this.getRight();
	stage.find(cright).stroke('#27b422');
	stage.find(cright + 'label').fill('#27b422');
        stage.find('#prec' + this.pid).stroke('#27b422');
        stage.find('#phil' + this.pid + 'text').fill('#27b422');
    }

    finishEating(){
        var cleft = '#c' + this.getLeft();
	stage.find(cleft).stroke('#555');
	stage.find(cleft + 'label').fill('brown');
	var cright = '#c' + this.getRight();
	stage.find(cright).stroke('#555');
	stage.find(cright + 'label').fill('brown');
        stage.find('#prec' + this.pid).stroke('#555');
        stage.find('#phil' + this.pid + 'text').fill('#555');
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
    });

}

var sn=0;

function runNextCommand() {
    console.log("sn= "+sn);

    switch( sn )
    {
        case 0:
            ph1.run();
	    sn++;
	    break;
	case 1:
	    ph1.stop();
	    ph2.run();
	    sn++;
	    break;
	case 2:
	    ph2.stop();
	    ph3.run();
	    sn++;
	    break;
	case 3:
	    ph3.stop();
	    ph1.run();
	    sn++;
	    break;
	case 4:
	    ph1.stop();
	    ph2.run();
	    sn++;
	    break;
	case 5:
	    ph2.stop();
	    ph3.run();
	    sn++;
	    break;
	case 6:
	    ph3.stop();
	    // Nietzsche reaches right.
	    ph1.wait( ph1.getRight() );
	    ph1.run();
	    sn++;
	    break;
	case 7:
	    ph1.stop();
	    // Sun Tsu reaches left.
	    ph2.wait( ph2.getLeft() );
	    ph2.run();
	    sn++;
	    break;
	case 8:
	    ph2.stop();
	    // Machiavelli reaches left but C3 already held by Nietzsche.
	    ph3.run();
	    sn++;
	    break;
	case 9:
	    ph3.sleep();
	    // Nietzsche reaches left.
	    ph1.wait( ph1.getLeft() );
	    ph1.run();
	    sn++;
	    break;
	case 10:
	    ph1.stop();
	    // Sun Tsu reaches right, but Nietzsche already holds C1.
	    ph2.run();
	    sn++;
	    break;
	case 11:
	    ph2.sleep();
	    // Thus ate Zarathustra.
	    ph1.run();
	    sn++;
	    break;
	case 12:
	    // Nietzsche posts chopstick to Machiavelli.
	    ph1.post( ph1.getRight() );
	    ph3.stop();
	    ph1.run();
	    sn++;
	    break;
	case 13:
	    ph1.stop();
	    // Machiavelli obtains C3.
	    ph3.wait( ph3.getLeft() );
	    ph3.run();
	    sn++;
	    break;
	case 14:
	    ph3.sleep();
	    // Nietzsche posts chopstick to Sun Tsu.
	    ph1.post( ph1.getLeft() );
	    ph2.stop();
	    ph1.run();
	    sn++;
	    break;
	case 15:
	    ph1.stop();
	    // Sun Tsu obtains C1
	    ph2.wait( ph2.getRight() );
	    ph2.run();
	    sn++;
	    break;
	case 16:
	    ph2.stop();
	    ph1.run();
	    sn++;
	    break;
	case 17:
	    // Nietzsche all done
	    ph1.end();
	    // To the victory comes to the great general
	    ph2.run();
	    sn++;
	    break;
	case 18:
	    // Sun Tsu posts chopstick
	    ph2.post( ph2.getRight() );
	    ph2.run();
	    sn++;
	    break;
	case 19:
	    // Sun Tsu posts chopstick to Machiavelli
	    ph2.post( ph2.getLeft() );
	    ph3.stop();
	    ph2.run();
	    sn++;
	    break;
	case 20:
	    ph2.stop();
	    ph3.wait( ph3.getRight() );
	    ph3.run();
	    sn++;
	    break;
	case 21:
	    ph3.stop();
	    ph2.run();
	    sn++;
	    break;
	case 22:
	    // The prince finally obtains his crown
	    ph3.post( ph3.getRight() );
	    ph2.end();
	    ph3.run();
	    sn++;
	    break;
	case 23:
	    ph3.post( ph3.getLeft() );
	    ph3.run();
	    sn++;
	    break;
	case 24:
	    ph3.run();
	    sn++;
	    break;
	case 25:
	    ph3.end();
	    sn++;
	    break;
	default :
	    break;
    }
}

var p1 = new Konva.Text({
    x: 20,
    y: 60,
    text: pName[ 1 ] + "\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
});


var p2 = new Konva.Text({
    x: 440,
    y: 60,
    text: pName[ 2 ] + "\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
});

var p3 = new Konva.Text({
    x: 860,
    y: 60,
    text: pName[ 3 ] + "\n\n \n " ,
    fontSize: 18,
    fontFamily: 'Calibri',
    fill: '#000000',
    width: 300,
    padding: 20,
});


var rect1 = new Konva.Rect({
    x: 20,
    y: 60,
    id:"prec1",
    stroke: '#555',
    strokeWidth: 5,
    fill: '#ddd',
    width: 400,
    height: 280,
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
    height: 280,
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
    height: 280,
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

// spaghetti
marinara = new Konva.Circle({
    radius: 30,
    fill: '#f72b2b',
    x: 600,
    y: 550,
});

noodles = new Konva.Circle({
    radius: 60,
    fill: '#f7f52b',
    x: 600,
    y: 550,
    stroke: '#555',
    strokeWidth: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
});

meatball1 = new Konva.Circle({
    radius: 15,
    fill: 'brown',
    x: 570,
    y: 550,
});

meatball2 = new Konva.Circle({
    radius: 15,
    fill: 'brown',
    x: 630,
    y: 550,
});

meatball3 = new Konva.Circle({
    radius: 15,
    fill: 'brown',
    x: 600,
    y: 580,
});

meatball4 = new Konva.Circle({
    radius: 15,
    fill: 'brown',
    x: 600,
    y: 520,
});

// chopsticks
chopstick1 = new Konva.Line({
    id: 'c1',
    x: 600,
    y: 550,
    points: [0, 0, 0, 60],
    stroke: '#555',
    strokeWidth: 5,
    offset: {
        x: 0,
	y: -45,
    },
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
}).rotate(120);
chopstick1Label = new Konva.Text({
    x: 535,
    y: 536,
    id:'c1label',
    text: "C1:",
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'normal',
    fill: 'brown',
}).rotate(210);

chopstick2 = new Konva.Line({
    id: 'c2',
    x: 600,
    y: 550,
    points: [0, 0, 0, 60],
    stroke: '#555',
    strokeWidth: 5,
    offset: {
        x: 0,
	y: -45,
    },
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
}).rotate(-120);
chopstick2Label = new Konva.Text({
    x: 645,
    y: 500,
    id:'c2label',
    text: "C2:",
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'normal',
    fill: 'brown',
}).rotate(-30);

chopstick3 = new Konva.Line({
    id: 'c3',
    x: 600,
    y: 550,
    points: [0, 0, 0, 60],
    stroke: '#555',
    strokeWidth: 5,
    offset: {
        x: 0,
	y: -45,
    },
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
}).rotate(0);
chopstick3Label = new Konva.Text({
    x: 620,
    y: 615,
    id:'c3label',
    text: "C3:",
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'normal',
    fill: 'brown',
}).rotate(90);


// philosophers
philosopher1 = new Konva.Circle({
    id: 'phil1',
    radius: 45,
    fill: 'white',
    x: 600,
    y: 550,
    offset: {
        x: 0,
	y: 120,
    },
    stroke: '#555',
    strokeWidth: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
}).rotate(-120);
philosopher1Text = new Konva.Text({
    id: 'phil1text',
    x: 600,
    y: 550,
    offset: {
        x: 35,
	y: 185,
    },
    text: pName[ 1 ],
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'bold',
    fill: '#555',
}).rotate(-120);

philosopher2 = new Konva.Circle({
    id: 'phil2',
    radius: 45,
    fill: 'white',
    x: 600,
    y: 550,
    offset: {
        x: 0,
	y: 120,
    },
    stroke: '#555',
    strokeWidth: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
});
philosopher2Text = new Konva.Text({
    id: 'phil2text',
    x: 600,
    y: 550,
    offset: {
        x: 30,
	y: 185,
    },
    text: pName[ 2 ],
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'bold',
    fill: '#555',
});

philosopher3 = new Konva.Circle({
    id: 'phil3',
    radius: 45,
    fill: 'white',
    x: 600,
    y: 550,
    offset: {
        x: 0,
	y: 120,
    },
    stroke: '#555',
    strokeWidth: 5,
    shadowColor: 'black',
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 10,
    shadowOpacity: 0.2,
}).rotate(120);
philosopher3Text = new Konva.Text({
    id: 'phil3text',
    x: 600,
    y: 550,
    offset: {
        x: 40,
	y: 185,
    },
    text: pName[ 3 ],
    fontSize: 18,
    fontFamily: 'Calibri',
    fontStyle: 'bold',
    fill: '#555',
}).rotate(120);

//add the shapes to the layer
layer.add(rect1);
layer.add(p1);

layer.add(rect2);
layer.add(p2);

layer.add(rect3);
layer.add(p3);

layer.add(status1);
layer.add(status2);
layer.add(status3);

// spaghetti
layer.add(noodles);
layer.add(marinara);
layer.add(meatball1);
layer.add(meatball2);
layer.add(meatball3);
layer.add(meatball4);

// chopsticks
layer.add(chopstick1);
layer.add(chopstick1Label);
layer.add(chopstick2);
layer.add(chopstick2Label);
layer.add(chopstick3);
layer.add(chopstick3Label);

// old farts
layer.add(philosopher1);
layer.add(philosopher1Text);
layer.add(philosopher2);
layer.add(philosopher2Text);
layer.add(philosopher3);
layer.add(philosopher3Text);

var philProg=[
    " 1. void after_thinking( philosopher *p ) {" ,
    " 2. \t\t if( p->isNietzsche ){",
    " 3. \t\t\t\t sem_wait( chopstick( right( p ) ) );",
    " 4. \t\t\t\t sem_wait( chopstick( left( p ) ) );",
    " 5. \t\t } else { ",
    " 6. \t\t\t\t sem_wait( chopstick( left( p ) ) );" ,
    " 7. \t\t\t\t sem_wait( chopstick( right( p ) ) );",
    " 8. \t\t }" ,
    " 9. \t\t eat( p );",
    "10. \t sem_post( chopstick( right( p ) ) );" ,
    "11. \t sem_post( chopstick( left( p ) ) );" ,
    "12. } "
];

for (let i=0;i<philProg.length;i++){
    let t=makeText(20,80+(i*20),philProg[i],'1'+(i+1));
    layer.add(t)
}


for (let i=0;i<philProg.length;i++){
    let t=makeText(440,80+(i*20),philProg[i],'2'+(i+1));
    layer.add(t)
}

for (let i=0;i<philProg.length;i++){
    let t=makeText(860,80+(i*20),philProg[i],'3'+(i+1));
    layer.add(t)
}

// add the layer to the stage
stage.add(layer);

var ph1=new Philosopher(1);
var ph2=new Philosopher(2);
var ph3=new Philosopher(3);

ph1.stop();
ph2.stop();
ph3.stop();

// Draw image
layer.draw();
