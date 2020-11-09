class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    private readonly canvas: any; // find the right type
    private readonly ctx: any; // find the right type

    // Some global player attributes
    private readonly player: string;
    private readonly score: number;
    private readonly lives: number;
    private readonly highscores: Array<any>; // TODO: do not use 'any': write an interface!

    public constructor(canvas: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        this.player = "Player one";
        this.score = 400;
        this.lives = 3;

        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ]

        // All screens: uncomment to activate
        this.startScreen();
        // this.levelScreen();
        // this.titleScreen();

    }

    //-------- Splash screen methods ------------------------------------
    /**
     * Method to initialize the splash screen
     */
    public startScreen() {
        //1. add 'Asteroids' text
        //2. add 'Press to play' text
        //3. add button with 'start' text
        //4. add Asteroid image
    }

    //-------- level screen methods -------------------------------------
    /**
     * Method to initialize the level screen
     */
    public levelScreen() {
        //1. load life images
        //2. draw current score
        //3. draw random asteroids
        //4. draw player spaceship
    }

    //-------- Title screen methods -------------------------------------

    /**
    * Method to initialize the title screen
    */
    public titleScreen() {
        //1. draw your score
        //2. draw all highscores
    }

    //-------Generic canvas methods ----------------------------------

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
        let imageElement = new Image();

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

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const Asteroids = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', init);
