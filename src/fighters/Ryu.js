import { Fighter } from "./Fighter.js";
import { FighterState } from "../constants/fighter.js";

export class Ryu extends Fighter {
    constructor(x,y, velocity){
        super('Ryu', x, y, velocity);
        this.image = document.querySelector('img[alt="ryu"]');

        // x, y, width, height
        this.frames = new Map([
            ['forwards-1', [[9, 136, 53, 83], [27,81]]],
            ['forwards-2', [[78, 131, 60, 89], [35,86]]],
            ['forwards-3', [[152, 128, 64, 92], [35,89]]],
            ['forwards-4', [[229, 130, 63, 90], [29,89]]],
            ['forwards-5', [[307, 128, 54, 91], [25,89]]],
            ['forwards-6', [[371, 128, 50, 89], [25,86]]],

            // move backwards
            ['backwards-1', [[777, 128, 61, 87], [35,85]]],
            ['backwards-2', [[430, 124, 59, 90], [36,87]]],
            ['backwards-3', [[495, 124, 57, 90], [36,88]]],
            ['backwards-4', [[559, 124, 58, 90], [38,89]]],
            ['backwards-5', [[631, 125, 58, 91], [36,88]]],
            ['backwards-6', [[707, 126, 57, 89], [36,87]]],
        ]);

        this.animations = 
        {[FighterState.WALK_FORWARD]: ['forwards-1','forwards-2','forwards-3','forwards-4','forwards-5','forwards-6'],
        [FighterState.WALK_BACKWARD]: ['backwards-1','backwards-2','backwards-3','backwards-4','backwards-5','backwards-6'],
        }
   
    }
}






