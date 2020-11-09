class Ship {

    private xPos: number;
    private yPos: number;
    private xVel: number;
    private yVel: number;
    private img: HTMLImageElement;
    private keyboardListener: KeyboardListener;

    /**
     * Construct a new Asteroid object.
     *
     * @param imgUrl url of the image to load
     * @param xPos X coordinate of its starting position
     * @param yPos y coordinate of its starting position
     * @param xVel x part of the velocity vector
     * @param yVel y part of the velocity vector
     */
    public constructor(
        imgUrl: string,
        xPos: number,
        yPos: number,
        xVel: number,
        yVel: number,
        keyboardListener: KeyboardListener,
    ) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.loadImage(imgUrl);
        this.keyboardListener = keyboardListener;
    }

    /**
     * Let the ship move with its own given speed. It should also handle the offscreen
     * events correctly.
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        // Move right if we're not at the right canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width / 2 < canvas.width
        ) {
            this.xPos += this.xVel;
        }

        // Move left if we're not at the left canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos - this.img.width / 2 > 0
        ) {
            this.xPos -= this.xVel;
        }

        // Move up if we're not at the top canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos - this.img.height / 2 > 0
        ) {
            this.yPos -= this.yVel;
        }

        // Move down if we're not at the bottom canvas border
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height / 2 < canvas.height
        ) {
            this.yPos += this.yVel;
        }
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.xPos - this.img.width / 2;
        const y = this.yPos - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }

    /**
     * Loads an image file into the DOM. The image is stored in the img
     * attribute of this class before it is loaded. This means that this.img
     * always holds an HTMLImageElement, but it might be empty
     *
     * @param {string} source - the name of the image file to load
     */
    private loadImage(source: string) {
        this.img = new Image();
        // Now, set the src to start loading the image
        this.img.src = source;
    }
}
