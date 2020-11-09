class Asteroid {

    private pos: Vector;
    private vel: Vector;
    private angle: number;
    private angleVel: number;

    private img: HTMLImageElement;

    /**
     * Construct a new Asteroid object.
     *
     * @param imgUrl url of the image to load
     * @param pos starting position
     * @param vel velocity vector
     */
    public constructor(
        imgUrl: string,
        pos: Vector,
        vel: Vector,
        angle: number,
        angleVel: number
    ) {
        this.pos = pos;
        this.vel = vel;
        this.angle = angle;
        this.angleVel = angleVel;
        this.loadImage(imgUrl);
    }

    /**
     * Let the asteroid move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        if (
            this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.y - this.img.width / 2 < 0
        ) {
            this.vel = this.vel.mirror_Y();
        }
        if (
            this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0
        ) {
            this.vel = this.vel.mirror_X();
        }

        // Use the velocity to change the position
        this.pos = this.pos.add(this.vel);
        this.angle += this.angleVel;
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

        // save the context state
        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(this.angle);
        // If the image is not yet loaded, don't draw anything
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
        }

        // restore the previous context state
        ctx.restore();
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
