import * as ex from 'excalibur';
import { Collider, Graphic, PostCollisionEvent } from 'excalibur';
import { Floor } from './Floor';
import { samuraiRunSpriteSheet, Resources, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiFallSpriteSheet, samuraiAttack1SpriteSheet, spriteSheetToAnimation } from './resources';

export class Samurai extends ex.Actor {

    public isOnGround = false;
    public isJumping = false;
    public isAttacking1 = false
    public isFacingRight = true; // sprite image in file has to satisfy this

    constructor(x: number, y: number) {
        super({
            name: 'Samurai',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("Samurai"),
            collider: ex.Shape.Box(30, 80, ex.Vector.Half, ex.vec(0, 3))
        });

        
    }


    onInitialize(engine: ex.Engine) {

        const run = spriteSheetToAnimation(samuraiRunSpriteSheet, 150)
        const idle = spriteSheetToAnimation(samuraiIdleSpriteSheet, 150)
        const jump = spriteSheetToAnimation(samuraiJumpSpriteSheet, 150)
        const fall = spriteSheetToAnimation(samuraiFallSpriteSheet, 150)
        const attack1 = spriteSheetToAnimation(samuraiAttack1SpriteSheet, 50)

        this.graphics.add("run", run)
        this.graphics.add("idle", idle)
        this.graphics.add("jump", jump)
        this.graphics.add("fall", fall)
        this.graphics.add("attack1", attack1)

        this.on("postcollision", ev => this.onPostCollision(ev))
    }


    onPostCollision(ev: PostCollisionEvent) {

        if (ev.side === ex.Side.Bottom) {
            this.isOnGround = true
        }


        //TODO: check collision strategy==Fixed instead of instanceof
        // other should move when hit 
        if(this.isAttacking1  && ! (ev.other instanceof Floor) ){
            ev.other.vel.x += ( this.isFacingRight?1:-1 ) * 500
            ev.other.vel.y +=  800
        }

    }

    setAttacking(attackType?:string){
        this.isAttacking1 = true
        this.collider.set(ex.Shape.Box(250, 80))
    }

    stopAttacking(attackType?:string){
        this.isAttacking1 = false
        this.collider.set(ex.Shape.Box(30, 80))
    }


    onPreUpdate(engine: ex.Engine, delta: number) {

        // Reset x velocity
        this.vel.x = 0;
        // this.isAttacking1 = false;
        this.stopAttacking()


        /**
         * Player input and set flags
         */

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
            this.vel.x = -150;
            this.isFacingRight = false
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
            this.vel.x = 150;
            this.isFacingRight = true
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.isOnGround) {
            this.isJumping = true
            this.vel.y -= 500
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
            // this.isAttacking1 = true
            this.setAttacking()
        }


        /**
         * Set flags
         */
        if (Math.abs(this.vel.y) > 0) {
            this.isOnGround = false
        }

        /**
         * change animation 
         */
        let newGraphic = this.graphics.use("idle");

        if (this.vel.x === 0) {
            newGraphic = this.graphics.use("idle")
        }

        if (Math.abs(this.vel.x) > 0) {
            newGraphic = this.graphics.use("run")
        }

        if (this.vel.y < 0) {
            newGraphic = this.graphics.use("jump")
        }

        if (this.vel.y > 0) {
            newGraphic = this.graphics.use("fall")
            this.isJumping = false
        }

        if (this.isAttacking1) {
            newGraphic = this.graphics.use("attack1")
        }

        newGraphic.flipHorizontal = !this.isFacingRight

    }


}



