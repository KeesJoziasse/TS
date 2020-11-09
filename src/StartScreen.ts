// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Start screen. Shows the name of the game.
 */
class StartScreen extends GameScreen {

    private asteroid: HTMLImageElement;
    private button: HTMLImageElement;

    private shouldStartLevel: boolean = false;

    /**
     * Construct a new StartScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);

        this.button = game.resources.getImage('button');
        this.asteroid = game.resources.getImage('meteor_big1');
    }

    /**
     * Let this screen listen to the user input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        if (input.isKeyDown(UserInput.KEY_S)) {
            this.shouldStartLevel = true;
        }
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        if (this.shouldStartLevel) {
            game.switchScreen(new LevelScreen(game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     * 
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // 1. add 'Asteroids' text
        this.writeTextToCanvas(ctx, "Asteroids", 140, new Vector(this.center.x, 150));

        // 2. add 'Press to play' text
        this.writeTextToCanvas(
            ctx,
            "PRESS S TO PLAY",
            40,
            new Vector(this.center.x, this.center.y - 20)
        );

        // 3. add Asteroid to screen
        const asteroidX = this.center.x - this.asteroid.width / 2;
        const asteroidY = this.center.y + this.asteroid.height / 2;

        if (this.asteroid.naturalWidth > 0) {
            ctx.drawImage(this.asteroid, asteroidX, asteroidY);
        }

        // 4. add play button
        const buttonX = this.center.x;
        const buttonY = this.center.y + 219; // 219 is a nice spot for the button

        if (this.button.naturalWidth > 0) {
            ctx.drawImage(this.button, buttonX - this.button.width / 2, buttonY);
            this.writeTextToCanvas(ctx, "Press s to play", 20, new Vector(buttonX, buttonY + 26), "center", "black");
        }
    }

}
