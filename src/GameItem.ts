abstract class GameItem {
    protected img: HTMLImageElement;
    protected xPos: number;
    protected yPos: number;

    public constructor(imgSrc: string, xPos: number, yPos: number) {
        this.img = new Image();
        this.img.src = imgSrc;

        this.xPos = xPos;
        this.yPos = yPos;
    }

    /**
     * Draws the GameItem to a given CanvasRenderingContext
     *
     * @param {CanvasRenderingContext2D} ctx - Context to render on
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }

    /**
     * Get the image
     *
     * @returns {HTMLImageElement} The height of the image
     */
    public getImg(): HTMLImageElement {
        return this.img;
    }

    /**
     * Get the xPos
     *
     * @returns {number} The x-position of the item
     */
    public getXPos(): number {
        return this.xPos;
    }

    /**
     * Get the yPos
     *
     * @returns {number} The x-position of the item
     */
    public getYPos(): number {
        return this.yPos;
    }
}
