class Game {
    // Necessary canvas attributes
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    // KeyboardListener so the player can move
    private keyboardListener: KeyboardListener;

    // Garbage items (the player needs to pick these up)
    private garbageItems: any[]; // TODO switch to correct type

    // Eggs (the player needs to leave these be)
    private eggs: any[]; // TODO switch to correct type

    // Player
    private player: any; //TODO switch to correct type

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

        this.keyboardListener = new KeyboardListener();

        this.garbageItems = [];
        this.eggs = [];

        // Create garbage items
        for (let i = 0; i < this.randomNumber(3, 10); i++) {
            this.garbageItems.push({
                img: this.loadNewImage("./assets/img/icecream.png"),
                xPos: this.randomNumber(0, this.canvas.width - 32),
                yPos: this.randomNumber(0, this.canvas.height - 32),
            });
        }

        // Create eggs
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.eggs.push({
                img: this.loadNewImage("./assets/img/egg.png"),
                xPos: this.randomNumber(0, this.canvas.width - 50),
                yPos: this.randomNumber(0, this.canvas.height - 64),
            });
        }

        // Create player
        this.player = {
            img: this.loadNewImage("./assets/img/character_robot_walk0.png"),
            xPos: this.randomNumber(0, this.canvas.width - 76),
            xVel: 3,
            yPos: this.randomNumber(0, this.canvas.height - 92),
            yVel: 3,
        };

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
        this.movePlayer();

        // Draw everything
        this.draw();

        // Player cleans up garbage
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            this.cleanUpGarbage();
            this.pickUpEgg();
        }

        // Show score
        // TODO: fix actual score system
        this.writeTextToCanvas("Score: 0", 36, 120, 50);

        // Create new items if necessary
        if (this.countUntilNextItem === 0) {
            const choice = this.randomNumber(0, 10);

            if (choice < 5) {
                this.garbageItems.push({
                    img: this.loadNewImage("./assets/img/icecream.png"),
                    xPos: this.randomNumber(0, this.canvas.width - 32),
                    yPos: this.randomNumber(0, this.canvas.height - 32),
                });
            } else {
                this.eggs.push({
                    img: this.loadNewImage("./assets/img/egg.png"),
                    xPos: this.randomNumber(0, this.canvas.width - 50),
                    yPos: this.randomNumber(0, this.canvas.height - 64),
                });
            }

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
        this.garbageItems.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });

        this.eggs.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });

        this.ctx.drawImage(this.player.img, this.player.xPos, this.player.yPos);
    }

    /**
     * Moves the player depending on which arrow key is pressed. Player is bound
     * to the canvas and cannot move outside of it
     */
    private movePlayer() {
        // Moving right
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.player.xPos + this.player.img.width < this.canvas.width
        ) {
            this.player.xPos += this.player.xVel;
        }

        // Moving left
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.player.xPos > 0
        ) {
            this.player.xPos -= this.player.xVel;
        }

        // Moving up
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.player.yPos > 0
        ) {
            this.player.yPos -= this.player.yVel;
        }

        // Moving down
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.player.yPos + this.player.img.height < this.canvas.height
        ) {
            this.player.yPos += this.player.yVel;
        }
    }

    /**
     * Removes garbage items from the game based on box collision detection.
     *
     * NOTE: We use a filter command in this method. A filter is basically a
     * for-loop that returns a new array. It does so by comparing every element
     * of the array with a given check. In this case, that is the collision
     * detection algorithm in the if-statement.
     *
     * If we have a collision, that means the players is standing on top of a
     * garbage item and therefore, it needs to be removed from the array.
     * The filter command does this for us, but it's a bit paradoxical since
     * we don't do anything in the if-statement. We only return elements in the
     * else-statement.
     *
     * By not returning an item we have collision with to the new array, and
     * returning items we don't have a collision with, we effectively remove
     * elements from the array. Try to do this as a mental exercise with only
     * two elements in the array. You have collision with the first, but not
     * with the second element. What does the if-statement do for the
     * individual elements?
     *
     * Read for more info: https://alligator.io/js/filter-array-method/
     */
    private cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => {
            if (
                    this.player.xPos < element.xPos + element.img.width &&
                    this.player.xPos + this.player.img.width > element.xPos &&
                    this.player.yPos < element.yPos + element.img.height &&
                    this.player.yPos + this.player.img.height > element.yPos
            ) {
                // Do nothing.
            } else {
                return element;
            }
        });
    }

    /**
     * Removes eggs from the game based on box collision detection.
     *
     * NOTE: We use a filter command in this method. A filter is basically a
     * for-loop that returns a new array. It does so by comparing every element
     * of the array with a given check. In this case, that is the collision
     * detection algorithm in the if-statement.
     *
     * If we have a collision, that means the players is standing on top of an
     * egg and therefore, it needs to be removed from the array.
     * The filter command does this for us, but it's a bit paradoxical since
     * we don't do anything in the if-statement. We only return elements in the
     * else-statement.
     *
     * By not returning an egg we have collision with to the new array, and
     * returning eggs we don't have a collision with, we effectively remove
     * elements from the array. Try to do this as a mental exercise with only
     * two elements in the array. You have collision with the first, but not
     * with the second element. What does the if-statement do for the
     * individual elements?
     *
     * Read for more info: https://alligator.io/js/filter-array-method/
     */
    private pickUpEgg() {
        this.eggs = this.eggs.filter((element) => {
            if (
                this.player.xPos < element.xPos + element.img.width &&
                this.player.xPos + this.player.img.width > element.xPos &&
                this.player.yPos < element.yPos + element.img.height &&
                this.player.yPos + this.player.img.height > element.yPos
            ) {
                // Do nothing.
            } else {
                return element;
            }
        });
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
     * Method to load an image
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
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
