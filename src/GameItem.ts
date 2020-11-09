class GameItem {

    public static readonly OFFSCREEN_BEHAVIOUR_OVERFLOW = 0;
    public static readonly OFFSCREEN_BEHAVIOUR_BOUNCE = 2;
    public static readonly OFFSCREEN_BEHAVIOUR_DIE = 3;

    public static readonly STATE_ALIVE = 0;
    public static readonly STATE_DEAD = 1;

    protected _state: number;
    protected _image: HTMLImageElement;
    protected _position: Vector;
    protected _speed: Vector;
    protected _angularSpeed: number;
    protected _angle: number;
    protected _offscreenBehaviour: number;

    public constructor(image:HTMLImageElement, position: Vector, speed: Vector, 
        angle: number, angularSpeed: number, 
        offscreenBehaviour = GameItem.OFFSCREEN_BEHAVIOUR_OVERFLOW) {
        this._image = image;
        this._position = position;
        this._speed = speed;
        this._angle = angle;
        this._angularSpeed = angularSpeed;
        this._offscreenBehaviour = offscreenBehaviour;
    }

    public get collisionRadius() {
        return this._image.height / 2;
    }

    public get position() {
        return this._position;
    }

    public move(frameCount:number, maxX:number, maxY: number) {
        let newX = this._position.x + this._speed.x;
        let newY = this._position.y - this._speed.y;
        this._position = new Vector(newX, newY);
        switch (this._offscreenBehaviour) {
            case GameItem.OFFSCREEN_BEHAVIOUR_OVERFLOW :
                this.adjustOverflow(maxX, maxY);
                break;
            case GameItem.OFFSCREEN_BEHAVIOUR_BOUNCE :
                break;
            case GameItem.OFFSCREEN_BEHAVIOUR_DIE :
                this.adjustDie(maxX, maxY);
                break;
        }
        this._angle += this._angularSpeed;
    }

    private adjustOverflow(maxX:number, maxY: number) {
        if (this._position.x > maxX) {
            this._position = new Vector(-this._image.width, this._position.y); 
        } else if (this._position.x < -this._image.width) {
            this._position = new Vector(maxX, this._position.y);
        }

        if (this._position.y > maxY + this._image.height / 2 ) {
            this._position = new Vector(this._position.x, -this._image.height / 2);
        } else if (this._position.y < -this._image.height / 2) {
            this._position = new Vector(this._position.x, maxY);
        }
    }

    private adjustDie(maxX:number, maxY: number) {
        if (this._position.x + this._image.width > maxX || this._position.x < 0 ||
            this._position.y + this._image.height / 2 > maxY ||
            this._position.y - this._image.height / 2 < 0) {
                this.die();
            }
    }

    public die() {
        this._state = GameItem.STATE_DEAD;
    }

    /**
     * isDead
     */
    public isDead() {
        return this._state == GameItem.STATE_DEAD;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this._position.x,this._position.y);
        ctx.rotate(this._angle);
        ctx.drawImage(this._image, -this._image.width / 2, -this._image.height / 2);
        ctx.restore();
        if (Game.DEBUG) {
            ctx.save();
            ctx.strokeStyle = '#ffffb3';
            ctx.beginPath();
            this.drawCenterInfo(ctx);
            this.drawCollisionBounds(ctx);
            ctx.stroke();
            ctx.restore();
        }
    }

    protected drawCenterInfo(ctx: CanvasRenderingContext2D) {
        // Draw center hairline
        ctx.moveTo(this._position.x-50,this._position.y);
        ctx.lineTo(this._position.x+50,this._position.y);
        ctx.moveTo(this._position.x,this._position.y-50);
        ctx.lineTo(this._position.x,this._position.y+50);
    }

    protected drawCollisionBounds(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this._position.x,this._position.y);
        ctx.arc(this._position.x,this._position.y, this._image.width / 2, 0, 2 * Math.PI, false);
    }
}