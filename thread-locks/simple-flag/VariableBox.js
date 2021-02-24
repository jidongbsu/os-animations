class VariableBox{
    constructor(props){
        this.parentStage = props.parentStage;
        this.x = this.parentStage.width() * .10;
        this.y = this.parentStage.height() * .05;
        this.width = this.parentStage.width() *0.2;
        this.height = this.parentStage.height() * 0.33;
        this.stroke = "black";
        this.name = "";
        this.backFill = "gray";

        for (var prop in props) {
            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop];
            }
        }

        this.group = new Konva.Group();
        this.layer = new Konva.Layer();
        this.layer.add(this.group);
        this.parentStage.add(this.layer);
    }

    updateValue(){
        this.group.destroyChildren();
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

        this.nameText = new Konva.Text({
            text: this.name,
            fontSize: 39,
            color: this.stroke,
            x: this.x,
            y: this.y + 8,
            width: this.width,
            align: "center",
            name: this.name + "_name",
        });
        this.valueText = new Konva.Text({
            text: this.value.value,
            fontSize: 25,
            color: this.stroke,
            x: this.x,
            y: this.y + 8 + 27,
            height: this.height,
            width: this.width,
            align: "center",
            verticalAlign: "middle",
            name: this.name + "_value",
        });

        this.group.add(this.backBox);
        this.group.add(this.nameText);
        this.group.add(this.valueText);

    }
    getValue(){
        return this.value;
    }

    setValue(value){
        this.value = value;
        return this.value;
    }

    draw(){
        this.updateValue();
        this.layer.draw();
    }
    
}