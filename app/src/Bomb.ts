import { Actor, CollisionGroup, CollisionGroupManager, CollisionType, Color, Engine, Graphic, PostCollisionEvent, PreCollisionEvent, Shape, vec, Vector } from "excalibur";
import { samuraiFallSpriteSheet, spriteSheetToAnimation } from "./resources";

export interface BombArgs{

    x:number,
    y:number,
    xVel:number,
    yVel :number

}


export default class Bomb extends Actor{

    impactVel = 0;

    constructor(args:BombArgs){
        
        super({
            name : "Bomb",
            pos : new Vector(args.x,args.y),
            vel : new Vector(args.xVel, args.yVel),
            collisionType : CollisionType.Active,
            collisionGroup : CollisionGroupManager.groupByName("Bomb"),
            color : Color.Black,
            radius : 10,
        })


    }

    onInitialize(engine:Engine){

        this.on("postcollision", e=>this.onPostCollision(e))
        this.on("precollision", e=>this.onPreCollision(e))
    }


    onPreCollision(e:PreCollisionEvent){
        // this.vel.y = -100
        this.impactVel = this.vel.y
    }

    onPostCollision(e:PostCollisionEvent){
        this.vel.y = -0.7*this.impactVel
    }


    

    onPostUpdate(engine:Engine, delta:number ){
        // console.log(this.vel)
        // this.vel = new Vector(10, -100)
    }



}