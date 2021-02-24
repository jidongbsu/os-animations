
var mutexState = {name: 0, value: 0};




const stage = new Konva.Stage({
    container: 'container',   // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight
});

const layer = new Konva.Layer();
const group = new Konva.Group();




const boxWidth = 350;
const boxHeight = stage.height() * 0.33;
const boxX = stage.width() * 0.025;
const boxY = stage.height() * 0.10;
const padding = 50;
const mutexHeight = stage.height() * 0.66;

const mutexLock = new CodeBox({
    parentStage: stage,
    title: "Lock/Unlock",
    lines: mutexLines,
    x: (boxWidth + padding) * 2 + boxX ,
    y: boxY,
    width: boxWidth,
    height: mutexHeight,
    });

const mutexUnlock = new CodeBox({
    parentStage: stage,
    title: "Unlock",
    lines: mutexLines,
    x: boxX,
    y: boxHeight + boxY + padding,
    height: boxHeight,
    width: boxWidth
});

const thread1 = new CodeBox({
    parentStage: stage,
    title: "Thread 1",
    lines: criticalFunctionLines,
    x: boxX,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    stroke: "blue",
    funcs: {"mutex.lock": mutexLock,
        "mutex.unlock": mutexLock}
    });

const thread2 = new CodeBox({
    parentStage: stage,
    title: "Thread 2",
    lines: criticalFunctionLines,
    x: boxX + boxWidth + padding,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    stroke: "red",
    funcs: {"mutex.lock": mutexLock, "mutex.unlock": mutexLock}
});

const varBox = new VariableBox({
    parentStage: stage,
    name: "mutex->flag",
    value: mutexState,
    x: boxX + boxWidth + padding,
    y: boxY + boxHeight + padding,
    width: boxWidth,
    height: (mutexHeight + boxY) - (boxY + boxHeight + padding) ,
    stroke: "black",
});

mutexLock.draw();
//mutexUnlock.draw();
//mutexLockValue.draw();
varBox.draw();

var processor = new Processor();
processor.addThread(thread1);
processor.addThread(thread2);



function runNextCommand(){
    processor.advance();
    varBox.draw();
}


function restartThread(thread){
    processor.removeThread(thread);
    processor.addThread(thread);
}




