// object enum
const GameViewport = {
    WIDTH: 384,
    HEIGHT: 224,
    //SCALE: 4
}

/*
prevents code from running until
whole HTML page has finished
loading necessary resources (like assets)
*/

window.onload = function(){
   const canvasElement = document.querySelector('canvas');

   // get access to its specific drawing functions
   const context = canvasElement.getContext('2d')

   // cutting room floor
   canvasElement.width = GameViewport.WIDTH;
   canvasElement.height = GameViewport.HEIGHT;

   const [ken,background] = document.querySelectorAll('img');
   

   // store Ken's position
   const position = {
    x:GameViewport.WIDTH / 2 - ken.width / 2,
    y:110
   }

   // canvasElement.style.width = `${GameViewport.WIDTH*GameViewport.SCALE}px`;
   // canvasElement.style.height =`${GameViewport.HEIGHT*GameViewport.SCALE}px`;

   // ken's velocity
   let velocity = 1;

   function frame(){
    position.x += velocity;

    if (position.x > GameViewport.WIDTH - ken.width || position.x < 0){
        velocity = -velocity;
    }

    //context.clearRect(0,0, GameViewport.WIDTH, GameViewport.HEIGHT);
    context.drawImage(background,0,0);

    // context.strokeStyle = 'yellow';
    // context.moveTo(0,0);
    // context.lineTo(GameViewport.WIDTH, GameViewport.HEIGHT);
    // context.moveTo(GameViewport.WIDTH,0);
    // context.lineTo(0, GameViewport.HEIGHT);
    // context.stroke()
 
    context.drawImage(ken,position.x, position.y);

    // to produce the animation callback loop
    window.requestAnimationFrame(frame);
   }

   window.requestAnimationFrame(frame);

   //console.log(context)
}