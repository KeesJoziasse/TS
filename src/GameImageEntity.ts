/// <reference path="GameEntity.ts"/>

/**
 * Base class of all Game Entities that must draw an image
 */
class GameImageEntity extends GameEntity {

    protected img: HTMLImageElement;

    /**
     * Construct a new Asteroid object.
     *
     * @param imgUrl url of the image to load
     * @param pos coordinates of its starting position
     * @param vel the velocity vector
     */
    public constructor(
        img: HTMLImageElement,
        pos: Vector,
        vel: Vector = new Vector(),
    ) {
        super(pos, vel);
        this.img = img;
    }

    /**
     * Let the asteroid draw itself on the correct position on the given
     * CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public draw(ctx: CanvasRenderingContext2D) {
        // We want the center of the image to be the position of this asteroid
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;

        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }

}