// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Loading screen. Makes sure that all relevant resources are loaded until
 * we proceed to the start screen.
 */
class LoadingScreen extends GameScreen {

    /**
     * Construct a new LoadingScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        game.resources.addImage('button', 'PNG/UI/buttonBlue.png');

        game.resources.addImage('meteor_big1', 'PNG/Meteors/meteorBrown_big1.png');
        game.resources.addImage('meteor_big2', 'PNG/Meteors/meteorBrown_big2.png');
        game.resources.addImage('meteor_big3', 'PNG/Meteors/meteorBrown_big3.png');
        game.resources.addImage('meteor_big4', 'PNG/Meteors/meteorBrown_big4.png');
        game.resources.addImage('meteor_med1', 'PNG/Meteors/meteorBrown_med1.png');
        game.resources.addImage('meteor_med3', 'PNG/Meteors/meteorBrown_med3.png');
        game.resources.addImage('meteor_small1', 'PNG/Meteors/meteorBrown_small1.png');
        game.resources.addImage('meteor_small2', 'PNG/Meteors/meteorBrown_small2.png');
        game.resources.addImage('meteor_tiny1', 'PNG/Meteors/meteorBrown_tiny1.png');
        game.resources.addImage('meteor_tiny2', 'PNG/Meteors/meteorBrown_tiny2.png');
        
        game.resources.addImage('playerLife1', 'PNG/UI/playerLife1_blue.png');
        game.resources.addImage('playerShip1', 'PNG/playerShip1_blue.png');
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        // TODO develop functionality to wait untill all resources are loaded
        if (this.frameCount > 10) {
            game.switchScreen(new StartScreen(this.game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     * 
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // TODO add nice animation that shows loading progress
        this.writeTextToCanvas(ctx, "LOADING...", 140, this.center);
    }

}