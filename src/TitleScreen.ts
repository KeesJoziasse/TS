// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Shows the last score and the highscores
 */
class TitleScreen extends GameScreen {

    private components: GameEntity[] = [];

    private scores: Scores;

    private shouldSwitchToStartScreen = false;

    /**
     * Construct a new TitleScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        this.scores = game.scores;

        this.components.push(new TextField(
            new Vector(this.center.x, this.center.y - 100),
            `${this.game.scores.player} score is ${this.scores.score}`,
            80,
        ));
        this.components.push(new TextField(
            this.center,
            "HIGHSCORES", 
            40
        ));

        let y = this.center.y;
        for (let i = 0; i < this.scores.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.scores.highscores[i].playerName} - ${
                this.scores.highscores[i].score
                }`;
            this.components.push(new TextField(new Vector(this.center.x, y), text, 20));
        }
    }

    /**
     * Let this screen listen to the user input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        if (input.isKeyDown(UserInput.KEY_SPACE)) {
            this.shouldSwitchToStartScreen = true;
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
        // Go to next screen after 10 seconds or user hits space
        if (this.shouldSwitchToStartScreen ||
            this.frameCount > 10*60) {
            game.switchScreen(new StartScreen(game));
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
