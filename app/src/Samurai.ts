import * as ex from 'excalibur';
import { Collider, CollisionType, Engine, Graphic, PostCollisionEvent } from 'excalibur';
import { Animations } from './Animations';
import Bomb from './Bomb';
import { Floor } from './Floor';
import { samuraiRunSpriteSheet, Resources, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiFallSpriteSheet, samuraiAttack1SpriteSheet, spriteSheetToAnimation, samuraiHangSpriteSheet } from './resources';

export class Samurai extends ex.Actor {

    public isOnGround = false
    public isJumping = false
    public isAttacking = false
    public attackType: Animations | undefined = undefined
    public isFacingRight = true // sprite image in file has to satisfy this
    readonly idleCollider: ex.PolygonCollider;
    readonly largeCollider: ex.PolygonCollider;

    public isHanging = false


    constructor(x: number, y: number) {
        
        super({
            name: 'Samurai',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("Samurai"),
        });

        this.idleCollider = ex.Shape.Box(30, 80, ex.Vector.Half, ex.vec(0, 3))
        this.largeCollider = ex.Shape.Box(250, 80)
        this.collider.set(this.idleCollider);

        

  

    }


    onInitialize(engine: ex.Engine) {

        const run = spriteSheetToAnimation(samuraiRunSpriteSheet, 150)
        const idle = spriteSheetToAnimation(samuraiIdleSpriteSheet, 150)
        const jump = spriteSheetToAnimation(samuraiJumpSpriteSheet, 150)
        const fall = spriteSheetToAnimation(samuraiFallSpriteSheet, 150)
        const attack1 = spriteSheetToAnimation(samuraiAttack1SpriteSheet, 50)
        const hanging = spriteSheetToAnimation(samuraiHangSpriteSheet, 300);

        this.graphics.add(Animations.Run, run)
        this.graphics.add(Animations.Idle, idle)
        this.graphics.add(Animations.Jump, jump)
        this.graphics.add(Animations.Fall, fall)
        this.graphics.add(Animations.Hanging, hanging)
        this.graphics.add("attack1", attack1)

        this.on("postcollision", ev => this.onPostCollision(ev))
    }


    onPostCollision(ev: PostCollisionEvent) {


        if(this.isHanging = (  (ev.side == ex.Side.Left || ev.side == ex.Side.Right)   &&  ev.other instanceof Floor  ) ){
            this.vel.y = 0
            this.vel.x = 0
        }
        
      

        // other should move when hit, unless they are fixed
        if (this.isAttacking && ( ev.other.body.collisionType != CollisionType.Fixed ) ) {
            ev.other.vel.x += (this.isFacingRight ? 1 : -1) * 500
            ev.other.vel.y += 800
        }

        if (ev.side === ex.Side.Bottom) {
            this.isOnGround = true
        }        
     



    }


    setAttacking(attackType: Animations, engine:Engine) {
        this.attackType = attackType
        this.isAttacking = true

        switch (attackType) {
            case Animations.Sword1:
                this.collider.set(this.largeCollider)
                break
            case Animations.ThrowBomb:
                 this.throwBomb(engine)
                break

        }
    }



    throwBomb(engine:Engine){

        // this.isAttacking = true
        engine.add(new Bomb({
            x: this.pos.x + this.width / 2,
            y: this.pos.y - this.height / 2,
            xVel: (this.isFacingRight ? 1 : -1) * 400,
            yVel: -400
        }))
    }



    stopAttacking() {
        this.isAttacking = false
        this.collider.set(this.idleCollider)
    }


    onPreUpdate(engine: ex.Engine, delta: number) {

        // Reset x velocity
        this.vel.x = 0;
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

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Up) && (this.isOnGround || this.isHanging)  ) {
            this.isJumping = true
            this.isHanging = false
            this.isOnGround = false
            this.vel.y -= 500
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
            this.setAttacking(Animations.Sword1, engine)
        }

        // throw bomb
        if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
            this.setAttacking(Animations.ThrowBomb, engine)
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
        let newGraphic = this.graphics.use(Animations.Idle)

        if (this.vel.x === 0) {
            newGraphic = this.graphics.use(Animations.Idle)
        }

        if (Math.abs(this.vel.x) > 0) {
            newGraphic = this.graphics.use(Animations.Run)
        }

        if (this.vel.y < 0) {
            newGraphic = this.graphics.use(Animations.Jump)
        }

        if (this.vel.y > 0) {
            newGraphic = this.graphics.use(Animations.Fall)
            this.isJumping = false
        }

        if(this.isHanging){
            newGraphic = this.graphics.use(Animations.Hanging)
        }

        if (this.isAttacking) {
            switch(this.attackType){
                case Animations.Sword1:
                    newGraphic = this.graphics.use("attack1")
                break
            }
        }

        newGraphic.flipHorizontal = !this.isFacingRight

    }


}



