import {Engine, Scene} from 'excalibur'
import * as ex from 'excalibur'
import { Samurai } from './Samurai';
import { Floor } from './Floor';
import Bomb from './Bomb';

export default class Level1 extends Scene{

    constructor(){
        super()
    }

    onInitialize(engine: Engine): void {

        // create collision groups
        ex.CollisionGroupManager.create("Samurai");
        ex.CollisionGroupManager.create("Bomb");
        

        // create actors
        let a = new Samurai(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100)

        // add actors to the scene
        engine.add(a)

        const floor = new Floor(0, 300, 15, 1);
        engine.add(floor)


        engine.add(new Bomb(engine.halfDrawWidth + 100, engine.halfDrawHeight - 100))

      
        this.camera.clearAllStrategies();
        this.camera.strategy.elasticToActor(a, 0.05, 0.1);

    }


}