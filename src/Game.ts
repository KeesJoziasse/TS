// tslint:disable member-ordering

class Game {
    // Global attributes for canvas
    // Readonly attributes are read-only. They can only be initialized in the constructor
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public readonly resources: ResourceRepository;
    public readonly input: UserInput;
    public readonly scores: Scores;

    private debug: boolean = false;
    private debugDown: boolean = false;

    // Holds the screen that must be displayed each loop
    private currentScreen: GameScreen;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext("2d");

        // Instantiate all other attributes
        this.resources = new ResourceRepository("./assets/images/SpaceShooterRedux");
        this.input = new UserInput();
        this.scores = new Scores();

        // Set the initial screen
        this.currentScreen = new LoadingScreen(this);

        this.loop();
    }

    /**
     * Method game loop. This arrow method is called each animation frame
     * that is available after the end of the previous loop.
     */
    private loop = () => {
        // Increase the frame counter
        this.currentScreen.increaseFrameCounter();
        
        // Let the current screen listen to the user input
        this.currentScreen.listen(this.input);

        // Let the current screen move its objects around the canvas
        this.currentScreen.move(this.canvas);

        // Let the current screen check for collisions
        this.currentScreen.collide();

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Let the current screen draw itself on the rendering context
        this.currentScreen.draw(this.ctx);

        // Handle debug functionality
        this.listenForDebug();
        if (this.debug) {
            this.currentScreen.drawDebugInfo(this.ctx);
        }
 
        // Let the current screen adjust itself
        this.currentScreen.adjust(this);

        // Request the next animation frame
        requestAnimationFrame(this.loop);
    }

    /**
     * Listen if the user wants to toggle debug mode
     */
    private listenForDebug() {
        if (this.input.isKeyDown(UserInput.KEY_D)) {
            if (!this.debugDown) {
                this.debug = !this.debug;
                this.debugDown = true;
            }
        } else {
            this.debugDown = false;
        }
    }

    /**
     * Let the game switch to a new screen.
     * 
     * @param newScreen the screen to switch to
     */
    public switchScreen(newScreen: GameScreen) {
        if (newScreen == null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen != this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}

// This will get an HTML element. I cast this element in de appropriate type using <>
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas") as HTMLCanvasElement);
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
