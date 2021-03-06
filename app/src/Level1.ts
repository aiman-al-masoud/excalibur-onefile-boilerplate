import {Engine, Scene} from 'excalibur'
import * as ex from 'excalibur'
import { Samurai } from './Samurai';
import { Floor } from './Floor';

export default class Level1 extends Scene{

    constructor(){
        super()
    }

    onInitialize(engine: Engine): void {

        // create collision groups
        ex.CollisionGroupManager.create("Samurai");
        ex.CollisionGroupManager.create("Bomb");
        ex.CollisionGroupManager.create("Floor");

        

        // create actors
        let a = new Samurai(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100)

        // add actors to the scene
        engine.add(a)

        const floor = new Floor(0, 300, 20, 1);
        engine.add(floor)        
        engine.add(new Floor(100, 500, 20, 1))
        engine.add(new Floor(200, 700, 20, 1))

     
        
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(a, 0.05, 0.1);

    }


}