class CodeBox {
    constructor(props) {

        this.parentStage = props.parentStage;
        this.x = this.parentStage.width() * .10;
        this.y = this.parentStage.height() * .05;
        this.width = this.parentStage.width() *0.2;
        this.height = this.parentStage.height() * 0.33;
        this.stroke = "black";
        this.backFill = "gray";
        this.funcs = {};
        this.currentFunction = null;
        this.statusByCaller = {};
        this.symbol = Symbol("CodeBox");
        this.test = 1;
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop];
            }
        }

        this.group = new Konva.Group();
        this.layer = new Konva.Layer();
        this.totalLines = this.lines.reduce((acc, next) => acc > next.index ? acc : next.index, 0);
        this.layer.add(this.group);
        this.parentStage.add(this.layer);

    }

    addFunction(id, func){
        this.funcs[id] = func;
    }


    updateBack(){
        this.group.find(".backbox").remove();
        this.backBox = new Konva.Rect({
            x: this.x,
            y: this.y,
            height: this.height,
            width: this.width,
            fill: this.backFill,
            opacity: 0.2,
            stroke: this.stroke,
            strokeWidth: 4,
            name: "backbox"
        });
        this.group.add(this.backBox);
    }


    updateLines(){
        this.group.find("Text").remove();
        if(this.title){
            this.group.add(
                new Konva.Text({
                    text: this.title,
                    fontSize: 18,
                    x: this.x + 8,
                    y: this.y - 18}));
        }
        this.lines.forEach((line, pos) => {
            this.group.add(
                new Konva.Text({
                    text: line.text,
                    fontSize: 16,
                    //fontStyle: line.index == this.currentLine ? "bold" : "normal",
                    x: this.x + 8,
                    y: this.y + 8 + (16 * pos),
                    name: "text" + (line.index ? line.index : 0),
                    height: this.group.height()}))
        })};

    highlightLine(currentStatus){
        this.group.find("#" + currentStatus.color).remove();

        let position =  this.lines.findIndex(x => x.index == currentStatus.currentLine);
        /*if(position < -1){
            return;
        }*/
       // position++;
        const highlight = new Konva.Rect({
            height: 16,
            opacity: 0.2,
            width: this.width,
            x: this.x,
            y: this.y + 8 + 16 * position,
            fill: currentStatus.color,
            id: currentStatus.color,
            name: "highlight",
        });
        this.group.add(highlight);
        this.draw();
    }

    removeHighlight(currentStatus){
        this.group.find("#" + currentStatus.color).remove();
    }



    advance(symbol){
        let currentStatus = this.statusByCaller[symbol];
        if(!currentStatus){
            return 0;
        }
        //If were still in a function, pass advance call down;
        if(this.currentFunction){
            if(this.currentFunction.advance(this.symbol) <= 0){
                this.currentFunction = null;
                this.highlightLine(currentStatus);
            }
            return 1;
        }

        if(currentStatus.currentLine > this.totalLines){
            this.reset(symbol);
            return 0;
        }

        //Get Line
        const line =  this.lines.find(x => x.index == currentStatus.currentLine);
        //check if line has a function call
        const functionCall = line?.func;
        if(functionCall){
            const functionName = functionCall.split(".")[1];
            this.currentFunction = this.funcs[functionCall];
            this.currentFunction.start(this.symbol, this.stroke, functionName);
            //this.currentFunction.advance(this.symbol);
            //Advance the line counter
            currentStatus.currentLine++;
            this.draw();
            return 1;

        }

        //check if line has an action
        const action = line?.action;
        if(action){
            const boundfn = action.bind(currentStatus);
            boundfn();

        }

        //check if line should return
        if(line?.return || line?.return == 0){
            this.removeHighlight(currentStatus);
            this.draw();
            return line.return;
        }

        //Advance the line counter
        if(currentStatus.nextLine){
            currentStatus.currentLine = currentStatus.nextLine;
            currentStatus.nextLine = null;
        } else {
            currentStatus.currentLine++;
        }
        this.highlightLine(currentStatus);
        this.draw();

        return 1;
    }
    draw(){
        this.updateBack();
        this.updateLines();
        this.group.find(".highlight").moveToTop();
        this.layer.draw();
    }

    reset(symbol){
        this.statusByCaller[symbol] = null;
        this.backFill = "gray";
        this.draw();
    }
    park(){
        this.backFill = "gray";
        this.draw();
    }

    unpark(){
        this.backFill = "green";
        this.draw();
    }

    start(callersSymbol, color, func = 0){
        let startLine = 0;
        if(func){
            startLine = this.lines.find(x => x.name == func).index ;
        }
        let newStatus = {currentLine: startLine, color: color };
        this.statusByCaller[callersSymbol] = newStatus;
        this.highlightLine(newStatus);
        this.draw();
    }

    updateProperties(props){
        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                console.log("Updating " + prop + ":" + props[prop])
                this[prop] = props[prop];
            }
        }
        this.draw();
    }
}
