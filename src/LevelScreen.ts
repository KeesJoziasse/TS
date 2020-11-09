// tslint:disable member-ordering

class LevelScreen {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private lives: number;
    private score: number;
    private life: HTMLImageElement;

    private asteroids: Asteroid[];
    private ship: Ship;
    private keyboardListener: KeyboardListener;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, keyboardListener: KeyboardListener) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.lives = 3;
        this.score = 400;
        this.keyboardListener = keyboardListener;

        this.life = new Image();
        this.life.src = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";

        // All the asteroid filenames
        const asteroidFilenames: string[] = [
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
        ];

        // Initialize a random number of random asteroids
        this.asteroids = [];
        for (let i = 0; i < this.randomNumber(5, 20); i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length);

            this.asteroids.push(
                new Asteroid(
                    asteroidFilenames[randomIndex],
                    this.randomNumber(0, this.canvas.width - 120),
                    this.randomNumber(0, this.canvas.height - 98),
                    this.randomNumber(0, 10),
                    this.randomNumber(0, 10),
                ),
            );
        }

        this.ship = new Ship(
            "./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png",
            this.canvas.width / 2,
            this.canvas.height / 2,
            3,
            3,
            this.keyboardListener,
        );
    }

    public draw() {
        // 1. load life images
        this.writeLifeImagesToLevelScreen();

        // 2. draw current score
        this.writeTextToCanvas(
            `Your score: ${this.score}`,
            20,
            this.canvas.width - 100,
            30,
            "right",
        );

        // Move and draw all the game entities
        this.asteroids.forEach((asteroid) => {
            asteroid.move(this.canvas);
            asteroid.draw(this.ctx);
        });

        // Draw the ship
        this.ship.move(this.canvas);
        this.ship.draw(this.ctx);
    }

    /**
     * Uses the loaded life image to remaining lives of the player on the rop
     * left of the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeLifeImagesToLevelScreen() {
        if (this.life.naturalWidth > 0) {
            let x = 10;
            const y = this.life.height - 10;
            // Start a loop for each life in lives
            for (let life = 0; life < this.lives; life++) {
                // Draw the image at the curren x and y coordinates
                this.ctx.drawImage(this.life, x, y);
                // Increase the x-coordinate for the next image to draw
                x += this.life.width + 10;
            }
        }
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
}
