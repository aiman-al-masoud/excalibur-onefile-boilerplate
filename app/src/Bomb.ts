import { Actor, CollisionGroup, CollisionGroupManager, CollisionType, Color, Engine, Graphic, Shape, vec, Vector } from "excalibur";
import { samuraiFallSpriteSheet, spriteSheetToAnimation } from "./resources";

export default class Bomb extends Actor{


    constructor(x:number, y:number){
        
        super({
            name : "Bomb",
            pos : new Vector(x,y),
            collisionType : CollisionType.Active,
            collisionGroup : CollisionGroupManager.groupByName("Bomb"),
            color : Color.Black,
            radius : 10,
            
        })

    }

    onInitialize(engine:Engine){
        // const fall = spriteSheetToAnimation(samuraiFallSpriteSheet, 150)
        // this.graphics.add("g", fall)
        // this.graphics.use("g")

    }

    onPostUpdate(engine:Engine, delta:number ){

    }




    




}