// tslint:disable member-ordering
/// <reference path="GameScreen.ts"/>

/**
 * Screen where the user can play the game
 */
class LevelScreen extends GameScreen {

    private score: number;

    private lives: GameImageEntity[];
    private asteroids: Asteroid[];
    private ship: Ship;

    private scoreField: TextField;

    private shouldSwitchToTitleScreen = false;

    /**
     * Construct a new GameScreen object.
     * 
     * @param game the game this screen belongs to
     */
    public constructor(game: Game) {
        super(game);
        const life = game.resources.getImage('playerLife1');
        this.lives = [];
        let x = 10;
        const y = life.height - 10;
        // Start a loop for each life in lives
        for (let cnt = 0; cnt < 3; cnt++) {
            // Draw the image at the curren x and y coordinates
            //ctx.drawImage(this.life, x, y);
            this.lives.push(new GameImageEntity( 
                life,
                new Vector(x, y)))
            // Increase the x-coordinate for the next image to draw
            x += life.width + 10;
        }

        this.score = 400;

        this.scoreField = new TextField(
            new Vector(this.game.canvas.width - 100, 30),
            `Your score: ${this.score}`, 
            20
        );


        // Initialize the ship
        this.ship = new Ship(
            game.resources.getImage("playerShip1"),
            new Vector(game.canvas.width / 2, game.canvas.height / 2)
        );

        this.initAsteroids(game);
    }

    /**
     * Helper method that initializes the asteroids in the game
     * 
     * @param game the game this screen belongs to
     */
    private initAsteroids(game: Game) {
        // All the asteroid filenames
        const asteroidFilenames: string[] = [
            "meteor_big1",
            "meteor_big2",
            "meteor_big3",
            "meteor_big4",
            "meteor_med1",
            "meteor_med3",
            "meteor_small1",
            "meteor_small2",
            "meteor_tiny1",
            "meteor_tiny2",
        ];
        // Initialize a random number of random asteroids
        this.asteroids = [];
        for (let i = 0; i < this.randomRoundedNumber(5, 20); i++) {
            const randomIndex = this.randomRoundedNumber(0, asteroidFilenames.length - 1);
            this.asteroids.push(new Asteroid(
                game.resources.getImage(asteroidFilenames[randomIndex]), 
                new Vector(this.randomRoundedNumber(0, game.canvas.width - 120), 
                this.randomRoundedNumber(0, game.canvas.height - 98)), 
                new Vector(this.randomRoundedNumber(0, 10), this.randomRoundedNumber(0, 10)) 
            ));
        }
    }

    /**
     * Let this screen listen to the user input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        this.ship.listen(input);
        if (input.isKeyDown(UserInput.KEY_ESC)) {
            this.shouldSwitchToTitleScreen = true;
        }
    }

    /**
     * Let this screen move its objects around the canvas.
     * 
     * @param canvas the canvas to move around
     */
    public move(canvas: HTMLCanvasElement) {
        // Move all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.move(canvas);
        });

        this.ship.move(canvas);
    }

    /**
     * Let this screen detect and handle collisions of its objects
     */
    public collide() {
        // TODO detect and handle collisions here
    }

    /**
     * Let this screen adjust its state and/or let the game switch to a new 
     * screen to show.
     * 
     * @param game the game object, conveniently added as a parameter so you 
     *      can easily call the switchScreen() method if needed.
     */
    public adjust(game: Game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
    }

    /**
     * Let this screen draw itself and its gameobjects on the given rendering
     * context.
     * 
     * @param ctx the rendering context to draw on
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // 1. load life images
        this.lives.forEach((life) => {
            life.draw(ctx);
        })

        this.scoreField.draw(ctx);

        // Draw all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.draw(ctx);
        });

        // Draw the ship
        this.ship.draw(ctx);
    }

    /**
     * Let this screen draw debug info about itself and its gameobjects on the 
     * given rendering context.
     * 
     * @param ctx the rendering context to draw on
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {
        super.drawDebugInfo(ctx);
        this.scoreField.drawDebugInfo(ctx);
        
        // Draw all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.drawDebugInfo(ctx);
        });

        // Draw the ship
        this.ship.drawDebugInfo(ctx);
    }

}
