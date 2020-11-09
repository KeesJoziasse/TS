/// <reference path="GameEntity.ts"/>

/**
 * Class representing a Button Entity.
 */
class TextField extends GameEntity {

    protected label: string;
    protected fontSize: number;
    protected color: string;
    protected alignment: CanvasTextAlign;

    /**
     * Construct a new Asteroid object.
     *
     * @param label text that must be printed on the button
     * @param imgUrl url of the image to load
     * @param pos coordinates of its starting position
     */
    public constructor(
        pos: Vector,
        label: string,
        fontSize: number = 20,
        color: string = "white", 
        alignment: CanvasTextAlign = "center"
    ) {
        super(pos);
        this.label = label;
        this.fontSize = fontSize;
        this.color = color;
        this.alignment = alignment;
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.fontSize}px Minecraft`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.alignment;
        ctx.fillText(this.label, this.pos.x, this.pos.y);
    }


    /**
     * Let this game entity draw debug info about itself on the correct 
     * position on the given CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {
        super.drawDebugInfo(ctx);
        ctx.save();
        // measure the text metrics
        ctx.font = `${this.fontSize}px Minecraft`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.alignment;
        const tm = ctx.measureText(this.label);
        ctx.strokeStyle = '#ffffb3';
        ctx.beginPath();
        // Draw center crosshair
        ctx.moveTo(this.pos.x-tm.actualBoundingBoxLeft,this.pos.y-tm.actualBoundingBoxAscent);
        ctx.lineTo(this.pos.x+tm.actualBoundingBoxRight,this.pos.y-tm.actualBoundingBoxAscent);
        ctx.lineTo(this.pos.x+tm.actualBoundingBoxRight,this.pos.y+tm.actualBoundingBoxDescent);
        ctx.lineTo(this.pos.x-tm.actualBoundingBoxLeft,this.pos.y+tm.actualBoundingBoxDescent);
        ctx.lineTo(this.pos.x-tm.actualBoundingBoxLeft,this.pos.y-tm.actualBoundingBoxAscent);
        ctx.stroke();
        ctx.restore();        
    }

}
