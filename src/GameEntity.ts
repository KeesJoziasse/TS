/**
 * Base class of all Game Entities.
 */
abstract class GameEntity {

    protected pos: Vector;
    protected vel: Vector;


    /**
     * Construct a new Asteroid object.
     *
     * @param pos coordinates of its starting position
     * @param vel the velocity vector. This parameter is optional. Default is
     * an empty Vector(0,0), which represents no speed
     */
    public constructor(
        pos: Vector,
        vel: Vector = new Vector(),
    ) {
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
    public abstract draw(ctx: CanvasRenderingContext2D): void;

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