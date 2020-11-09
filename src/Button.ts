/// <reference path="GameImageEntity.ts"/>

/**
 * Class representing a Button Entity.
 */
class Button extends GameImageEntity {

    protected label: TextField;

    /**
     * Construct a new Asteroid object.
     *
     * @param label text that must be printed on the button
     * @param imgUrl url of the image to load
     * @param pos coordinates of its starting position
     */
    public constructor(
        label: string,
        img: HTMLImageElement,
        pos: Vector,
    ) {
        super(img, pos);
        this.label = new TextField(new Vector(pos.x, pos.y + 5), label, 20, "black");
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        this.label.draw(ctx);
    }

    /**
     * Let this game entity draw debug info about itself on the correct 
     * position on the given CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {
        super.drawDebugInfo(ctx);
        this.label.drawDebugInfo(ctx);
    }

}
