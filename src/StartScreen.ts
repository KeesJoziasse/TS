// tslint:disable member-ordering

class StartScreen {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private asteroid: HTMLImageElement;
    private button: HTMLImageElement;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.button = new Image();
        this.button.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";

        this.asteroid = new Image();
        this.asteroid.src = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
    }

    public draw() {
        // 1. add 'Asteroids' text
        this.writeTextToCanvas("Asteroids", 140, this.canvas.width / 2, 150);

        // 2. add 'Press to play' text
        this.writeTextToCanvas(
            "PRESS S TO PLAY",
            40,
            this.canvas.width / 2,
            this.canvas.height / 2 - 20,
        );

        // 3. add Asteroid to screen
        const asteroidX = this.canvas.width / 2 - this.asteroid.width / 2;
        const asteroidY = this.canvas.height / 2 + this.asteroid.height / 2;

        if (this.asteroid.naturalWidth > 0) {
            this.ctx.drawImage(this.asteroid, asteroidX, asteroidY);
        }

        // 4. add play button
        const buttonX = this.canvas.width / 2;
        const buttonY = this.canvas.height / 2 + 219; // 219 is a nice spot for the button

        if (this.button.naturalWidth > 0) {
            this.ctx.drawImage(this.button, buttonX - this.button.width / 2, buttonY);
            this.writeTextToCanvas("Press s to play", 20, buttonX, buttonY + 26, "center", "black");
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
