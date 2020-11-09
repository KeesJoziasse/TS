class GameEntity {

    protected pos: Vector;
    protected vel: Vector;
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
        console.log(img);
        
        this.img = img;
        this.pos = pos;
        this.vel = vel;
    }

    /**
     * Let the ship move with its own given speed. It should also handle the offscreen
     * events correctly.
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        // Use the velocity to change the position
        this.pos = this.pos.add(this.vel);
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

    /**
     * Let this game entity draw debug info about itself on the correct 
     * position on the given CanvasRenderingContext2D.
     *
     * @param ctx The CanvasRenderingContext2D to draw to
     */
    public drawDebugInfo(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = '#ffffb3';
        ctx.beginPath();
        // Draw center crosshair
        ctx.moveTo(this.pos.x-50,this.pos.y);
        ctx.lineTo(this.pos.x+50,this.pos.y);
        ctx.moveTo(this.pos.x,this.pos.y-50);
        ctx.lineTo(this.pos.x,this.pos.y+50);
        ctx.stroke();
        // Draw position info
        ctx.font = 'courier 12px';
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(`pos: ${this.pos}`, this.pos.x + 3, this.pos.y - 3);
        
        ctx.restore();
    }
}