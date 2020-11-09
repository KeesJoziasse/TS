// tslint:disable member-ordering

class TitleScreen {

    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    private readonly highscores: any[]; // TODO: do not use 'any': write an interface!
    private readonly player: string;
    private readonly score: number;

    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.player = "Player one";
        this.score = 400;

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
    }

    public draw() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;

        // 1. draw your score
        this.writeTextToCanvas(
            `${this.player} score is ${this.score}`,
            80,
            x,
            y - 100,
        );

        // 2. draw all highscores
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);

        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${
                this.highscores[i].score
                }`;
            this.writeTextToCanvas(text, 20, x, y);
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
