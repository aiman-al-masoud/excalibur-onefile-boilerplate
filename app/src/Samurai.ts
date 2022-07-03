import * as ex from 'excalibur';
import { samuraiRunSpriteSheet, Resources, samuraiIdleSpriteSheet } from './resources';

export class Samurai extends ex.Actor {


    constructor(x: number, y: number) {
        super({
            name: 'Samurai',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("Samurai"),
            collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3)),
            color : ex.Color.Black
        });
    }


    onInitialize(engine: ex.Engine) {
        
        //run 
        const run = ex.Animation.fromSpriteSheet(samuraiRunSpriteSheet, [0, 1, 2,3,4,5,6,7], 150);
        run.scale = new ex.Vector(2, 2);
        this.graphics.add("run", run)

        // idle
        const idle = ex.Animation.fromSpriteSheet(samuraiIdleSpriteSheet, [...new Array(samuraiIdleSpriteSheet.columns).keys()] , 150)
        idle.scale = new ex.Vector(2,2)
        this.graphics.add("idle", idle)





    }

    onPreUpdate(engine: ex.Engine, delta: number) {
        // Reset x velocity
        this.vel.x = 0;

        // Player input
        if(engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -150;
        }

         // Player input
         if(engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 150;
        }

        if (this.vel.x === 0) {
            this.graphics.use("idle")
        }
    }





}



