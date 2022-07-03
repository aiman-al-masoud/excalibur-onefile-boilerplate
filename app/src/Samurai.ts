import * as ex from 'excalibur';
import { Graphic, PostCollisionEvent } from 'excalibur';
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
            collider: ex.Shape.Box(32, 50, ex.Vector.Half, ex.vec(0, 3)),
            color: ex.Color.Black
        });
    }


    onInitialize(engine: ex.Engine) {

        // run to right
        const run = ex.Animation.fromSpriteSheet(samuraiRunSpriteSheet, [...new Array(samuraiRunSpriteSheet.columns).keys()]  , 150);
        run.scale = new ex.Vector(2, 2);
        this.graphics.add("runToRight", run)

        //new 
        // const runToRigth = spriteSheetToAnimation(samuraiRunSpriteSheet, 150)
        // const runToLeft = runToRigth.clone()
        // runToLeft.flipHorizontal = true

        // run to left
        const runToLeft = run.clone()
        runToLeft.flipHorizontal = true
        this.graphics.add("runToLeft", runToLeft)

        // idle
        const idle = ex.Animation.fromSpriteSheet(samuraiIdleSpriteSheet, [...new Array(samuraiIdleSpriteSheet.columns).keys()], 150)
        idle.scale = new ex.Vector(2, 2)
        this.graphics.add("idle", idle)

        //new
        // const idleToRight = spriteSheetToAnimation(samuraiIdleSpriteSheet, 150)
        // const idleToLeft = idleToRight.clone()
        // idleToLeft.flipHorizontal = true


        // jump 
        const jump = ex.Animation.fromSpriteSheet(samuraiJumpSpriteSheet, [...new Array(samuraiJumpSpriteSheet.columns).keys()], 150)
        jump.scale = new ex.Vector(2, 2)
        this.graphics.add("jump", jump)

        // fall 
        const fall = ex.Animation.fromSpriteSheet(samuraiFallSpriteSheet, [...new Array(samuraiFallSpriteSheet.columns).keys()], 150)
        fall.scale = new ex.Vector(2, 2)
        this.graphics.add("fall", fall)

        // attack 1
        const attack1 = ex.Animation.fromSpriteSheet(samuraiAttack1SpriteSheet, [...new Array(samuraiAttack1SpriteSheet.columns).keys()], 50)
        attack1.scale = new ex.Vector(2, 2)
        this.graphics.add("attack1", attack1)



        this.on("postcollision", ev => this.onPostCollision(ev))

    }


    onPostCollision(ev: PostCollisionEvent) {

        if (ev.side === ex.Side.Bottom) {
            this.isOnGround = true
        }


    }


    onPreUpdate(engine: ex.Engine, delta: number) {

        // Reset x velocity
        this.vel.x = 0;
        this.isAttacking1 = false;

        /**
         * Player input and set flags
         */
        {
            if (engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
                this.vel.x = -150;
                this.isFacingRight = false
            }

            if (engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
                this.vel.x = 150;
                this.isFacingRight = true
            }

            if(engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.isOnGround ){
                this.isJumping = true
                this.vel.y -=500
            }

            if(engine.input.keyboard.isHeld(ex.Input.Keys.Space)){
                this.isAttacking1 = true
            }

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
            newGraphic = this.graphics.use("runToRight")
        }

        // if (this.vel.x < 0) {
        //     newGraphic = this.graphics.use("runToLeft")
        // }

        if (this.vel.y < 0) {
            newGraphic = this.graphics.use("jump")
        }

        if (this.vel.y > 0) {
            newGraphic = this.graphics.use("fall")
            this.isJumping = false
        }

        if(this.isAttacking1){
            newGraphic = this.graphics.use("attack1")
        }

        newGraphic.flipHorizontal = !this.isFacingRight

    }





}



