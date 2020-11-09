// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Shows the last score and the highscores
 */
class TitleScreen extends GameScreen {

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
        const x = this.game.canvas.width / 2;
        let y = this.game.canvas.height / 2;

        // 1. draw your score
        this.writeTextToCanvas(
            ctx,
            `${this.game.scores.player} score is ${this.scores.score}`,
            80,
            new Vector(x, y - 100),
        );

        // 2. draw all highscores
        this.writeTextToCanvas(ctx, "HIGHSCORES", 40, new Vector(x, y));

        for (let i = 0; i < this.scores.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.scores.highscores[i].playerName} - ${
                this.scores.highscores[i].score
                }`;
            this.writeTextToCanvas(ctx, text, 20, new Vector(x, y));
        }
    }

}
