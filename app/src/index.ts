// import {Engine, Color, Physics, Vector} from 'excalibur'
import *  as ex from 'excalibur' 
import Hud from './Hud'
import Level1 from './Level1'
import { loader } from './resources'

const engine = new ex.Engine({
    backgroundColor: ex.Color.fromRGB(0,0, 100, 0.5),
    width : 600,
    height :400,
    antialiasing: false,
    suppressConsoleBootMessage:true,
    suppressPlayButton:true
})

// Gravity
ex.Physics.acc = new ex.Vector(0, 800) // 800 pixels/s^2

// add a Scene 
engine.addScene("level1", new Level1())
engine.goToScene("level1")


engine.add(new Hud(0, 0))


engine.start(loader).then(e=>{
    console.log("game started!")
});


// For test hook
(window as any).engine = engine;






