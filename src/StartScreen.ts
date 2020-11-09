// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Start screen. Shows the name of the game.
 */
class StartScreen extends GameScreen {

    private components: GameEntity[] = [];

    private shouldStartLevel: boolean = false;

    /**
     * Construct a new StartScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);

        this.components.push(new TextField(
            new Vector(this.center.x, 150),
            "Asteroids",
            140
        ));
        this.components.push(new TextField(
            new Vector(this.center.x, this.center.y - 20),
            "PRESS S TO PLAY",
            40,
        ));
        this.components.push(new Button(
            "Press s to play",
            game.resources.getImage('button'),
            new Vector(this.center.x, this.center.y + 150),
        ));
        this.components.push(new Asteroid(
            game.resources.getImage('meteor_big1'),
            new Vector(this.center.x, this.center.y),
            new Vector(),
        ));
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
        this.components.forEach((component) => {
            component.draw(ctx);
        });
    }

    /**
     * Let this screen draw debug info about itself and its gameobjects on the 
     * given rendering context.
     * 
     * @param ctx the rendering context to draw on
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {
        super.drawDebugInfo(ctx);
        this.components.forEach((component) => {
            component.drawDebugInfo(ctx);
        });
    }

}
