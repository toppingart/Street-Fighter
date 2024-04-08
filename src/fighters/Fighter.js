import { FighterDirection } from "../constants/fighter.js";
import { FighterState } from "../constants/fighter.js";

export class Fighter {

    constructor(name,x,y,direction){

        // specific to each fighter
        this.name = name;
        this.image = new Image(); 

        this.position = {x,y};
        this.direction = direction;
        this.velocity = 0;

        this.frames = new Map();
        this.animationFrame = 0; //current animation frame

        // store a local copy so that we can compare it to the animation frame delay in our frame update
        this.animationTimer = 0;

        // list of animations
        this.animations = {}

        // store our state machine
        // each state will have two properties to handle our transition
        // copy the state functions back to the "states" object properties
        // bind "this" as they have been encapsulated within the "states object", outside of scope of class
        this.states = {
            [FighterState.WALK_FORWARD]: {
                init: this.handleWalkForwardInit.bind(this), // initalize the state when its first transitioned to
                update: this.handleWalkForwardState.bind(this), // update: actually execute the state
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleWalkBackwardInit.bind(this), 
                update: this.handleWalkBackwardState.bind(this),
            }
        }

        // current state (animation)
        this.changeState(FighterState.WALK_BACKWARD);

  
    }

    changeState(newState){
        this.currentState = newState;
        this.animationFrame = 0; // new state animation
        this.states[this.currentState].init();

    }

    handleWalkForwardInit(){
        this.velocity = 150 * this.direction;
    }

    handleWalkForwardState(){
        
    }

    handleWalkBackwardInit(){
        this.velocity = -150 * this.direction;

    }

    handleWalkBackwardState(){
        
    }

    // constrain the fighter's x position to both sides of the screen
    updateStageConstraints(context){
        const WIDTH = 32;

        if (this.position.x > context.canvas.width - WIDTH){
            this.position.x = context.canvas.width - WIDTH;
        }

        if (this.position.x < WIDTH){
            this.position.x = WIDTH;
        }
    }
 
    update(time, context){

        // frame delay value of 60 ms
        if (time.previous > this.animationTimer + 60){

            // game time value has passed our set frame delay,
            // take the current time and store it (prepare for next animation frame)
            this.animationTimer = time.previous;
            this.animationFrame++;
            if (this.animationFrame > 5){
                this.animationFrame = 0;
            }

        }

        this.position.x += this.velocity * time.secondsPassed;
        this.states[this.currentState].update(time, context);
        this.updateStageConstraints(context);
    }

    drawDebug(context){
        context.lineWidth = 1;
        context.beginPath();
        context.strokeStyle = 'white';

        // cross cursor that highlights position of origin point
        // the context performs 1-pixel stroke values, best to add .5 to help remove antialising
        context.moveTo(Math.floor(this.position.x) - 4.5, Math.floor(this.position.y));
        context.lineTo(Math.floor(this.position.x) + 4.5, Math.floor(this.position.y));
        context.moveTo(Math.floor(this.position.x), Math.floor(this.position.y - 4.5));
        context.lineTo(Math.floor(this.position.x), Math.floor(this.position.y + 4.5));
        context.stroke();

        context.fillRect(this.position.x, this.position.y, 10, 10);
        context.fillRect(this.position.x - 27, this.position.y - 81, 20, 20);
        //console.log(` position y: ${this.position.y}`)
        //console.log(` position y - origin: ${this.position.y - 81}`)
        context.stroke();


    }

    draw(context){
        const [[x,y,width, height], [originX, originY]] = this.frames.get(this.animations[this.currentState][this.animationFrame]);
        context.scale(this.direction, 1);
        context.drawImage(
            this.image, 
            x, y, 
            width, height, 
            Math.floor(this.position.x * this.direction) - originX, Math.floor(this.position.y) - originY,
             width, height);

        context.setTransform(1,0,0,1,0,0);  // reset any applied transformations
        this.drawDebug(context);
    }

}