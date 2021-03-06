import * as ex from 'excalibur';
import { ImageSource, Vector } from 'excalibur';

// import files
const blockFile = require("../res/block.png")
const samuraiRunFile = require("../res/samurai/run.png")
const samuraiIdleFile = require("../res/samurai/idle.png")
const samuraiJumpFile = require("../res/samurai/jump.png")
const samuraiAttack1File = require("../res/samurai/attack1.png")
const samuraiFallFile = require("../res/samurai/fall.png")
const samuraiDieFile = require("../res/samurai/die.png")
const samuraiTakeHitFile = require("../res/samurai/take-hit.png")
const explosionFile = require("../res/explosion.png")

const samuraiHangFile = require("../res/samurai/hang.png")


// put in Resources
const Resources = {
    block: new ex.ImageSource(blockFile.default),
    samuraiRun: new ex.ImageSource(samuraiRunFile.default),
    samuraiIdle: new ex.ImageSource(samuraiIdleFile.default),
    samuraiJump: new ex.ImageSource(samuraiJumpFile.default),
    samuraiAttack1: new ex.ImageSource(samuraiAttack1File.default),
    samuraiFall: new ex.ImageSource(samuraiFallFile.default),
    samuraiDie: new ex.ImageSource(samuraiDieFile.default),
    samuraiTakeHit: new ex.ImageSource(samuraiTakeHitFile.default),
    explosion : new ex.ImageSource(explosionFile.default),
    samuraiHang : new ex.ImageSource(samuraiHangFile.default)
}


/**
 * 
 * @param imgSrc 
 * @param cols 
 * @param rows 
 * @param spriteWidth 
 * @param spriteHeight 
 * @returns 
 */
const imgToSpriteSheet = (imgSrc: ImageSource, cols: number, rows: number, spriteWidth: number, spriteHeight: number) => {
    return ex.SpriteSheet.fromImageSource({
        image: imgSrc,
        grid: {
            columns: cols,
            rows: rows,
            spriteWidth: spriteWidth,
            spriteHeight: spriteHeight
        }
    });
}

const spriteSheetToAnimation = (spriteSheet: ex.SpriteSheet, durationPerFrameMs: number, strategy?: ex.AnimationStrategy | undefined, scale?:ex.Vector | undefined) => {
    let anim = ex.Animation.fromSpriteSheet(spriteSheet, [... new Array(spriteSheet.columns).keys()]  , durationPerFrameMs, strategy)
    anim.scale = scale??new Vector(2,2)
    return anim
}






// create sprites/sprite-sheets from images
const blockSprite = Resources.block.toSprite();
const samuraiRunSpriteSheet = imgToSpriteSheet(Resources.samuraiRun, 8, 1, 200, 200)
const samuraiIdleSpriteSheet = imgToSpriteSheet(Resources.samuraiIdle, 8, 1, 200, 200)
const samuraiJumpSpriteSheet = imgToSpriteSheet(Resources.samuraiJump, 2, 1, 200, 200)
const samuraiFallSpriteSheet = imgToSpriteSheet(Resources.samuraiFall, 2, 1, 200, 200)
const samuraiAttack1SpriteSheet = imgToSpriteSheet(Resources.samuraiAttack1, 6, 1, 200, 200)
const samuraiDieSpriteSheet = imgToSpriteSheet(Resources.samuraiDie, 6, 1, 200, 200)
const samuraiTakeHitSpriteSheet = imgToSpriteSheet(Resources.samuraiTakeHit, 4, 1, 200, 200)
const explosionSpriteSheet = imgToSpriteSheet(Resources.explosion, 12, 1, 96, 96)
const samuraiHangSpriteSheet = imgToSpriteSheet(Resources.samuraiHang, 2, 1, 62, 55)

// create loader
const loader = new ex.Loader();

// add all resources to loader
for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export { Resources, loader, samuraiRunSpriteSheet, blockSprite, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiAttack1SpriteSheet, samuraiFallSpriteSheet, samuraiDieSpriteSheet, samuraiTakeHitSpriteSheet, spriteSheetToAnimation, explosionSpriteSheet, samuraiHangSpriteSheet }


