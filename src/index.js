import { Ken } from "./fighters/Ken.js";
import { Ryu } from "./fighters/Ryu.js";
import { Stage } from "./entities/Stage.js";
import { FpsCounter } from "./entities/FpsCounter.js";
import { STAGE_FLOOR } from "./constants/stage.js";
import { FighterDirection, FighterState } from "./constants/fighter.js";


function populateMoveDropdown(){
    const dropdown = document.getElementById('state-dropdown');
    
    Object.entries(FighterState).forEach(([,value]) => {
        const option = document.createElement('option');
        option.setAttribute('value', value);
        option.innerText = value;
        dropdown.appendChild(option);

    });
}


/*
prevents code from running until
whole HTML page has finished
loading necessary resources (like assets)
*/

window.addEventListener('load', function(){
    populateMoveDropdown();
    const canvasElement = document.querySelector('canvas');

    // get access to its specific drawing functions
    const context = canvasElement.getContext('2d')
    context.imageSmoothingEnabled = false;


    // updated and drawn in our main loop
    const entities = [
    new Stage(),
    new Ken(104, STAGE_FLOOR, FighterDirection.LEFT),
    new Ryu(280,STAGE_FLOOR,FighterDirection.RIGHT),
    new FpsCounter(),
   ]

   let frameTime = {
    previous: 0,
    secondsPassed: 0 // between each frame
   }

   function frame(time){

    // to produce the animation callback loop
    window.requestAnimationFrame(frame);

    frameTime = {
    secondsPassed: (time - frameTime.previous) / 1000,
    previous: time
    }

    for (const entity of entities){
        entity.update(frameTime, context);

    }

    for (const entity of entities){
        entity.draw(context);
    }

   }

   window.requestAnimationFrame(frame);

})