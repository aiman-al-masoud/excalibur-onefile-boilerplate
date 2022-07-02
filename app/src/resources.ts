import * as ex from 'excalibur';

// const testFile = require('../res');
// import samuraiFile from "../res/run.png"
const samuraiFile = require("../res/run.png")
const blockFile = require("../res/block.png")


const Resources = {
 samurai : new ex.ImageSource(samuraiFile.default),
 block : new ex.ImageSource(blockFile.default)
}


const blockSprite = Resources.block.toSprite();



const loader = new ex.Loader();

const samuraiSpriteSheet = ex.SpriteSheet.fromImageSource({
    
    image : Resources.samurai, 

    grid: { 
        columns: 8,
        rows: 1, 
        spriteWidth: 32,
        spriteHeight: 32
    }
});


// for (const res in Resources) {
//     loader.addResource((Resources as any)[res]);
// }
loader.addResource(Resources.samurai)

loader.addResource(Resources.block)

export { Resources, loader, samuraiSpriteSheet, blockSprite }