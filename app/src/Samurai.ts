import * as ex from 'excalibur';
import { Collider, Engine, Graphic, PostCollisionEvent } from 'excalibur';
import { AttackTypes } from './AttackTypes';
import Bomb from './Bomb';
import { Floor } from './Floor';
import { samuraiRunSpriteSheet, Resources, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiFallSpriteSheet, samuraiAttack1SpriteSheet, spriteSheetToAnimation } from './resources';

export class Samurai extends ex.Actor {

    public isOnGround = false
    public isJumping = false
    public isAttacking = false
    public attackType: AttackTypes | undefined = undefined
    public isFacingRight = true // sprite image in file has to satisfy this
    readonly idleCollider: ex.PolygonCollider;
    readonly largeCollider: ex.PolygonCollider;


    constructor(x: number, y: number) {
        
        super({
            name: 'Samurai',
            pos: new ex.Vector(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: ex.CollisionGroupManager.groupByName("Samurai"),
        });

        this.idleCollider = ex.Shape.Box(30, 80, ex.Vector.Half, ex.vec(0, 3))
        this.largeCollider = ex.Shape.Box(250, 80)
        this.collider.set(this.idleCollider)

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
        if (this.isAttacking && !(ev.other instanceof Floor)) {
            ev.other.vel.x += (this.isFacingRight ? 1 : -1) * 500
            ev.other.vel.y += 800
        }

    }


    setAttacking(attackType: AttackTypes, engine:Engine) {
        this.attackType = attackType
        this.isAttacking = true

        switch (attackType) {
            case AttackTypes.Sword1:
                this.collider.set(this.largeCollider)
                break
            case AttackTypes.ThrowBomb:
                
                    engine.add(new Bomb({
                        x: this.pos.x + this.width / 2,
                        y: this.pos.y - this.height / 2,
                        xVel: (this.isFacingRight ? 1 : -1) * 400,
                        yVel: -400
                    }))
                      
                break

        }
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

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.isOnGround) {
            this.isJumping = true
            this.vel.y -= 500
        }

        if (engine.input.keyboard.isHeld(ex.Input.Keys.Space)) {
            this.setAttacking(AttackTypes.Sword1, engine)
        }

        // throw bomb
        if (engine.input.keyboard.isHeld(ex.Input.Keys.A)) {
            this.setAttacking(AttackTypes.ThrowBomb, engine)
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

        if (this.isAttacking) {
            switch(this.attackType){
                case AttackTypes.Sword1:
                    newGraphic = this.graphics.use("attack1")
                break
            }
        }

        newGraphic.flipHorizontal = !this.isFacingRight

    }


}



