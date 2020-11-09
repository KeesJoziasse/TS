/**
 * Class representing a Ship Game Entity.
 */
class Ship {

    private pos: Vector;
    private vel: Vector;
    private img: HTMLImageElement;

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
    ) {
        this.img = img;
        this.pos = pos;
        this.vel = new Vector();
    }


    /**
     * Let this ship listen to the suer input. 
     * 
     * @param input user input to listen to
     */
    public listen(input: UserInput) {
        // Default velocity should be 0 when user has no keys down
        let xVel = 0;
        let yVel = 0;

        // Determine velocity by user input
        if ( input.isKeyDown(UserInput.KEY_RIGHT) ) {
            xVel = 3;
        } else if ( input.isKeyDown(UserInput.KEY_LEFT) ) {
            xVel = -3;
        }

        if ( input.isKeyDown(UserInput.KEY_UP) ) {
            yVel = -3;
        } else if ( input.isKeyDown(UserInput.KEY_DOWN) ) {
            yVel = 3;
        }

        // Set the new velocity vector
        this.vel = new Vector(xVel, yVel);
    }

    /**
     * Let the ship move with its own given speed. It should also handle the offscreen
     * events correctly.
     *
     * @param canvas the canvas
     */
    public move(canvas: HTMLCanvasElement) {
        // Compute new position with the current velocity
        let newPos = this.pos.add(this.vel);

        const minX = this.img.width / 2;
        const maxX = canvas.width - minX;
        // Move right if we're not at the right canvas border
        if ( newPos.x < minX) {
            newPos = new Vector(minX, newPos.y);
        } else if ( newPos.x > maxX ) {
            newPos = new Vector(maxX, newPos.y);
        }

        const minY = this.img.height / 2;
        const maxY = canvas.height - minY;
        // Move left if we're not at the left canvas border
        if ( newPos.y < minY) {
            newPos = new Vector(newPos.x, minY);
        } else if ( newPos.y > maxY ) {
            newPos = new Vector(newPos.x, maxY);
        }
        this.pos = newPos;
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
        ctx.font = 'courier 12px';
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(`pos: ${this.pos}`, this.pos.x + 3, this.pos.y - 3);
        ctx.restore();
    }

}
