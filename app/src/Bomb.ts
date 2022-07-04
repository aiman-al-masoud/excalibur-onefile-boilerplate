import { Actor, AnimationStrategy, CollisionGroup, CollisionGroupManager, CollisionType, Color, Engine, Graphic, PostCollisionEvent, PreCollisionEvent, Shape, vec, Vector } from "excalibur";
import { explosionSpriteSheet, samuraiFallSpriteSheet, spriteSheetToAnimation } from "./resources";

export interface BombArgs {

    x: number,
    y: number,
    xVel: number,
    yVel: number

}


export default class Bomb extends Actor {

    impactVel = 0;
    collisionsBeforeExplode = 10;
    collisionsCounter = 0;

    constructor(args: BombArgs) {

        super({
            name: "Bomb",
            pos: new Vector(args.x, args.y),
            vel: new Vector(args.xVel, args.yVel),
            collisionType: CollisionType.Active,
            collisionGroup: CollisionGroupManager.groupByName("Bomb"),
            color: Color.Black,
            radius: 10,
        })


    }

    onInitialize(engine: Engine) {

        const explode = spriteSheetToAnimation(explosionSpriteSheet, 150, AnimationStrategy.End)
        this.graphics.add("explode", explode)

        this.on("postcollision", e => this.onPostCollision(e))
        this.on("precollision", e => this.onPreCollision(e))
    }


    onPreCollision(e: PreCollisionEvent) {
        this.impactVel = this.vel.y
    }

    onPostCollision(e: PostCollisionEvent) {
        this.vel.y = -0.7 * this.impactVel

        this.collisionsCounter++;

        if (this.collisionsCounter >= this.collisionsBeforeExplode) {
            this.graphics.use("explode")
            this.vel = new Vector(0,0)
            // this.kill()
            setTimeout(()=>{
                this.kill()
            }, 
            1000)
        }


    }




    onPostUpdate(engine: Engine, delta: number) {
        // console.log(this.vel)
        // this.vel = new Vector(10, -100)
    }



}