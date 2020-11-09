class Game {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private gameItems: GameItem[];
    private player: Player;
    private score: number;

    // Amount of frames until the next item
    private countUntilNextItem: number;

    /**
     * Initialize the game
     *
     * @param {HTMLCanvasElement} canvas - The canvas element that the game
     * should be rendered upon
     */
    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.gameItems = [];

        // Create garbage items
        for (let i = 0; i < this.randomNumber(3, 10); i++) {
            this.gameItems.push(
                new Garbage(
                    this.randomNumber(0, this.canvas.width - 32),
                    this.randomNumber(0, this.canvas.height - 32),
                ),
            );
        }

        // Create eggs
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.gameItems.push(
                new Egg(
                    this.randomNumber(0, this.canvas.width - 50),
                    this.randomNumber(0, this.canvas.height - 64),
                ),
            );
        }

        // Create player
        this.player = new Player(
            this.randomNumber(0, this.canvas.width - 76),
            this.randomNumber(0, this.canvas.height - 92),
        );

        // Set score to 0
        this.score = 0;

        // Take about 5 seconds on a decent computer to show next item
        this.countUntilNextItem = 300;

        // Start the game cycle
        this.loop();
    }

    /**
     * Game cycle, basically loop that keeps the game running. It contains all
     * the logic needed to draw the individual frames.
     */
    private loop = () => {
        // Clear the screen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Move the player
        this.player.move(this.canvas);

        // Player cleans up garbage
        this.gameItems = this.gameItems.filter((element) => {
            if (this.player.isCollidingWith(element)) {
                if (element instanceof Egg || element instanceof Garbage) {
                    this.score += element.getScore();
                }

                return false;
            }

            return true;
        });

        // Draw everything
        this.draw();

        // Show score
        // TODO: fix actual score system
        this.writeTextToCanvas(`Score: ${this.score}`, 36, 120, 50);

        // Create new items if necessary
        if (this.countUntilNextItem === 0) {
            this.addNewGameItem();

            // Reset the timer with a count between 2 and 4 seconds on a
            // decent computer
            this.countUntilNextItem = this.randomNumber(120, 240);
        }

        // Lower the count until the next item with 1
        this.countUntilNextItem--;

        // Make sure the game actually loops
        requestAnimationFrame(this.loop);
    }

    /**
     * Draw all the necessary items to the screen
     */
    private draw() {
        this.gameItems.forEach((element) => {
            element.draw(this.ctx);
        });

        this.player.draw(this.ctx);
    }

    /**
     * Adds a random new Garbage or Egg to the game
     */
    private addNewGameItem() {
        const choice = this.randomNumber(0, 10);
        if (choice < 5) {
            this.gameItems.push(
                new Garbage(
                    this.randomNumber(0, this.canvas.width - 32),
                    this.randomNumber(0, this.canvas.height - 32),
                ),
            );
        } else {
            this.gameItems.push(
                new Egg(
                    this.randomNumber(0, this.canvas.width - 50),
                    this.randomNumber(0, this.canvas.height - 64),
                ),
            );
        }
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
    private writeTextToCanvas(
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white",
    ) {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Returns a random number between min and max
     * @param {number} min - lower boundary
     * @param {number} max - upper boundary
     */
    private randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () => new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
