// tslint:disable member-ordering

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    // Some global player attributes
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: object[]; // TODO: do not use 'any': write an interface!

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");

        this.player = "Player one";
        this.score = 400;
        this.lives = 3;

        this.highscores = [
            {
                playerName: "Loek",
                score: 40000,
            },
            {
                playerName: "Daan",
                score: 34000,
            },
            {
                playerName: "Rimmert",
                score: 200,
            },
        ];

        // All screens: uncomment to activate
        this.startScreen();
        // this.levelScreen();
        // this.titleScreen();

    }

    // -------- Splash screen methods ------------------------------------
    /**
     * Method to initialize the splash screen
     */
    public startScreen() {
        // 1. add 'Asteroids' text
        this.writeTextToCanvas("Asteroids", 140, this.canvas.width / 2, 150);

        // 2. add 'Press to play' text
        this.writeTextToCanvas("PRESS PLAY TO START", 40, this.canvas.width / 2, this.canvas.height / 2 - 20);

        // 3. add button with 'start' text
        const asteroidFileName = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        this.loadImage(asteroidFileName, this.writeStartButtonToStartScreen);
        // 4. add Asteroid image
        const startButtonFileName = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
        this.loadImage(startButtonFileName, this.writeAsteroidImageToStartScreen);
    }

    /**
     * Writes the loaded asteroids image pixels to the start screen
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeAsteroidImageToStartScreen(img: HTMLImageElement) {
        // Target position: center of image must be the center of the screen
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 2 + img.height / 2;

        this.ctx.drawImage(img, x, y);
    }

    /**
     * Writes the loaded start button image to the start screen and writes a text on top of it
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeStartButtonToStartScreen(img: HTMLImageElement) {
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2 + 219; // 219 is a nice spot for the button

        this.ctx.drawImage(img, x  - img.width / 2, y);

        this.writeTextToCanvas("Play", 20, x, y + 26, "center", "black");
    }

    // -------- level screen methods -------------------------------------
    /**
     * Method to initialize the level screen
     */
    public levelScreen() {
        // 1. load life images
        const lifeImageFileName = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";
        this.loadImage(lifeImageFileName, this.writeLifeImagesToLevelScreen);

        // 2. draw current score
        this.writeTextToCanvas(`Your score: ${this.score}`, 20, this.canvas.width - 100, 30, "right");

        // 3. draw random asteroids
        const asteroids: string[] = [
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

        const maxAsteroidsOnScreen: number = 5;

        for (let i = 0; i < maxAsteroidsOnScreen; i++) {
            const index = this.randomNumber(0, asteroids.length);
            // we use the random number to select a file name from the array
            this.loadImage(asteroids[index], this.writeAsteroidImageToRandomLocationOnLevelScreen);
        }

        // 4. draw player spaceship
        const playerSpaceShipFileName = "./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png";
        this.loadImage(playerSpaceShipFileName, this.writePlayerShipToLevelScreen);
    }

    /**
     * Uses the loaded life image to remaining lives of the player on the rop
     * left of the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeLifeImagesToLevelScreen(img: HTMLImageElement) {
        let x = 10;
        const y = img.height - 10;
        // Start a loop for each life in lives
        for (let life = 0; life < this.lives; life++) {
            // Draw the image at the curren x and y coordinates
            this.ctx.drawImage(img, x, y);
            // Increase the x-coordinate for the next image to draw
            x += img.width + 10;
        }
    }


    /**
     * Writes a loaded asteroid image at a random location on the screen.
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writeAsteroidImageToRandomLocationOnLevelScreen(img: HTMLImageElement) {
        const x = this.randomNumber(0, this.canvas.width - img.width);
        const y = this.randomNumber(0, this.canvas.height - img.height);
        this.ctx.drawImage(img, x, y);
    }

    /**
     * Writes the loaded Player Ship image to the center of the screen
     *
     * @param {HTMLImageElement} img the loaded image object
     */
    private writePlayerShipToLevelScreen(img: HTMLImageElement) {
        // Target position: center of image must be the center of the screen
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 2 - img.height / 2;
        this.ctx.drawImage(img, x, y);
    }

    // -------- Title screen methods -------------------------------------

    /**
     * Method to initialize the title screen
     */
    public titleScreen() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;

        // 1. draw your score
        this.writeTextToCanvas(`${this.player} score is ${this.score}`, 80, x, y - 100);

        // 2. draw all highscores
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);

        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`;
            this.writeTextToCanvas(text, 20, x, y);
        }
    }

    // -------Generic canvas methods ----------------------------------

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


    /**
     * Loads an image file into the DOM and writes it to the canvas. After the
     * image is loaded and ready to be drawn to the canvas, the specified
     * callback method will be invoked. the method will be called with the
     * loaded imageElement as a parameter.
     *
     * The callback method MUST be a method of this class with a header like:
     *
     *   private yourMethodNameHere(img: HTMLImageElement)
     *
     * In the body of that callback you can draw the image to the canvas
     * context like:
     *
     *   this.ctx.drawImage(img, someX, someY);
     *
     * This is the simplest way to draw images, because the browser must and
     * shall wait until the image is completely loaded into memory.
     *
     * @param {string} source - the name of the image file
     * @param {Function} callback - method that is invoked after the image is loaded
     */
    private loadImage(source: string, callback: Function) {
        const imageElement = new Image();

        // We must wait until the image file is loaded into the element
        // We add an event listener
        // We'll be using an arrow function for this, just because we must.
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });

        // Now, set the src to start loading the image
        imageElement.src = source;
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimal time
     * @param {number} max - maximal time
     */
    public randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = function() {
    const Asteroids = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
