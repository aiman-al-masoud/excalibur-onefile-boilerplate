import * as ex from 'excalibur';
import { PostCollisionEvent } from 'excalibur';
import { samuraiRunSpriteSheet, Resources, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiFallSpriteSheet } from './resources';

export class Samurai extends ex.Actor {

    public isOnGround = false;

    constructor(x: number, y: number) {
        super({
            name: 'Samurai',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("Samurai"),
            collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3)),
            color: ex.Color.Black
        });
    }


    onInitialize(engine: ex.Engine) {

        // run to right
        const run = ex.Animation.fromSpriteSheet(samuraiRunSpriteSheet, [0, 1, 2, 3, 4, 5, 6, 7], 150);
        run.scale = new ex.Vector(2, 2);
        this.graphics.add("runToRight", run)

        // run to left
        const runToLeft = run.clone()
        runToLeft.flipHorizontal = true
        this.graphics.add("runToLeft", runToLeft)

        // idle
        const idle = ex.Animation.fromSpriteSheet(samuraiIdleSpriteSheet, [...new Array(samuraiIdleSpriteSheet.columns).keys()], 150)
        idle.scale = new ex.Vector(2, 2)
        this.graphics.add("idle", idle)

        // jump 
        const jump = ex.Animation.fromSpriteSheet(samuraiJumpSpriteSheet, [...new Array(samuraiJumpSpriteSheet.columns).keys()], 150)
        jump.scale = new ex.Vector(2,2)
        this.graphics.add("jump", jump)

        // fall 
        const fall = ex.Animation.fromSpriteSheet(samuraiFallSpriteSheet, [...new Array(samuraiFallSpriteSheet.columns).keys()], 150)
        fall.scale = new ex.Vector(2,2)
        this.graphics.add("fall", fall)



        this.on("postcollision", ev=>this.onPostCollision(ev))

    }


    onPostCollision(ev:PostCollisionEvent){
        
        if(ev.side===ex.Side.Bottom){
            this.isOnGround = true
        }


    }


    onPreUpdate(engine: ex.Engine, delta: number) {
        
        // Reset x velocity
        this.vel.x = 0;

        // Player input
        if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -150;
        }

        // Player input
        if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 150;
        }

        if(Math.abs(this.vel.y)>0){
            this.isOnGround = false
        }


        /**
         * change animation based on velocity
         */

        if (this.vel.x === 0) {
            this.graphics.use("idle")
        }

        if (this.vel.x < 0) {
            this.graphics.use("runToLeft")
        }

        if (this.vel.x > 0) {
            this.graphics.use("runToRight")
        }

        if(this.vel.y < 0){
            this.graphics.use("jump")
        }


        if(this.vel.y > 0){
            this.graphics.use("fall")
        }


        console.log("isOnGround", this.isOnGround)

    }





}



