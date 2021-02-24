class Processor {
    constructor(){
        this.threads = [];
        this.threadNum = 0;
        this.currentThread = null;
        this.symbol = Symbol("Processor");
    }
    addThread(thread){
        let id = this.threads.length
        this.threads[id] = thread;
        thread.pid = id;
        if(!this.currentThread){
            this.currentThread  = thread;
            thread.unpark();}
        thread.start(this.symbol, "gray");
        thread.draw()
    }
    removeThread(thread){
        this.threads[thread.pid] = null;
    }

    advance(){

        if(this.currentThread?.advance(this.symbol) == 0){
            this.threads[this.threadNum] = null;
            this.switchThread();

        }
    }
    switchThread(){
        //Todo, don't do anything when no threads empty
        console.log("Switching Thread");
        this.currentThread?.park();
        //console.log("len " + threads.length)
        this.threadNum = this.threadNum >= this.threads.length -1 ? 0: this.threadNum + 1;
        this.currentThread = this.threads[this.threadNum];
        this.currentThread?.unpark();
    }
}