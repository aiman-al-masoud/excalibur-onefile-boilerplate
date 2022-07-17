import { Color, ScreenElement } from "excalibur";



export default class Hud extends ScreenElement {


    constructor(x: number, y: number) {
        super({
            x: x,
            y: y,
            width:50,
            height : 50,
            color:Color.Black,
            name:"HUD"
        });
    }

    onInitialize() {

        

        this.on('pointerup', () => {
            alert("I've been clicked")
        })

        this.on('pointerenter', () => {
            this.graphics.show('hover')
        })

        this.on('pointerleave', () => {
            this.graphics.show('idle')
        })
    }


}



//engine.scenes.level1.entities
