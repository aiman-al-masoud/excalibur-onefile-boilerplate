import * as ex from 'excalibur';
import { ImageSource } from 'excalibur';

// import files
const blockFile = require("../res/block.png")
const samuraiRunFile = require("../res/samurai/run.png")
const samuraiIdleFile = require("../res/samurai/idle.png")
const samuraiJumpFile = require("../res/samurai/jump.png")
const samuraiAttack1File = require("../res/samurai/attack1.png")
const samuraiFallFile = require("../res/samurai/fall.png")
const samuraiDieFile = require("../res/samurai/die.png")
const samuraiTakeHitFile = require("../res/samurai/take-hit.png")


// put in Resources
const Resources = {
    block: new ex.ImageSource(blockFile.default),
    samuraiRun: new ex.ImageSource(samuraiRunFile.default),
    samuraiIdle: new ex.ImageSource(samuraiIdleFile.default),
    samuraiJump: new ex.ImageSource(samuraiJumpFile.default),
    samuraiAttack1: new ex.ImageSource(samuraiAttack1File.default),
    samuraiFall: new ex.ImageSource(samuraiFallFile.default),
    samuraiDie : new ex.ImageSource(samuraiDieFile.default),
    samuraiTakeHit : new ex.ImageSource(samuraiTakeHitFile.default)
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
const imgToSpriteSheet = (imgSrc : ImageSource, cols:number, rows:number, spriteWidth:number, spriteHeight:number)=>{
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


// create sprites/sprite-sheets from images
const blockSprite = Resources.block.toSprite();
const samuraiRunSpriteSheet = imgToSpriteSheet(Resources.samuraiRun, 8, 1, 200, 200)
const samuraiIdleSpriteSheet = imgToSpriteSheet(Resources.samuraiIdle, 8, 1, 200, 200)
const samuraiJumpSpriteSheet = imgToSpriteSheet(Resources.samuraiJump, 2, 1, 200, 200)
const samuraiFallSpriteSheet = imgToSpriteSheet(Resources.samuraiFall, 2, 1, 200, 200)
const samuraiAttack1SpriteSheet = imgToSpriteSheet(Resources.samuraiAttack1, 6, 1, 200, 200)
const samuraiDieSpriteSheet = imgToSpriteSheet(Resources.samuraiDie, 6, 1, 200, 200)
const samuraiTakeHitSpriteSheet = imgToSpriteSheet(Resources.samuraiTakeHit, 4, 1, 200, 200)



// create loader
const loader = new ex.Loader();

// add all resources to loader
for (const res in Resources) {
    loader.addResource((Resources as any)[res]);
}

export { Resources, loader, samuraiRunSpriteSheet, blockSprite, samuraiIdleSpriteSheet, samuraiJumpSpriteSheet, samuraiAttack1SpriteSheet, samuraiFallSpriteSheet, samuraiDieSpriteSheet, samuraiTakeHitSpriteSheet }


