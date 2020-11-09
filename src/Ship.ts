/// <reference path="GameItem.ts"/>

class Ship extends GameItem {

    public static readonly ANGULAR_SPEED_INCREMENT = 0.0004;
    public static readonly ANGULAR_SPEED_MAX       = 0.02;

    private _shooting: boolean = false;

    private _shots : Shot[] = [];

    public get shots() : Shot[] {
        return this._shots;
    }

    public increaseAngularSpeed() {
        this._angularSpeed += Ship.ANGULAR_SPEED_INCREMENT;
        if (this._angularSpeed > Ship.ANGULAR_SPEED_MAX) {
            this._angularSpeed = Ship.ANGULAR_SPEED_MAX;
        }
    }

    public decreaseAngularSpeed() {
        this._angularSpeed -= Ship.ANGULAR_SPEED_INCREMENT;
        if (this._angularSpeed < -Ship.ANGULAR_SPEED_MAX) {
            this._angularSpeed = -Ship.ANGULAR_SPEED_MAX;
        }
    }

    public thrust() {
        //construct a vector based on the current angle
        const thrustVector = Vector.fromSizeAndAngle(0.1, this._angle);
        //add the vector to the current speed
        this._speed = this._speed.add(thrustVector);
    }

    public retroBoost() {
        //construct a vector based on the current angle
        const thrustVector = Vector.fromSizeAndAngle(0.05, this._angle).scale(-1);
        //add the vector to the current speed
        this._speed = this._speed.add(thrustVector);
    }

    public shoot(image: HTMLImageElement) {
        if (!this._shooting && this.shots.length<5) {
            this._shooting = true;
            //construct a vector based on the current angle
            const speed = Vector.fromSizeAndAngle(5, this._angle);
            const position = this._position.add(Vector.fromSizeAndAngle(-50, -this._angle));
            const shot = new Shot(image, position, speed, this._angle, 0, GameItem.OFFSCREEN_BEHAVIOUR_DIE);
            this._shots.push(shot);
        }
    }

    public stopShooting() {
        this._shooting = false;
    }

    public move(frameCount:number, maxX:number, maxY: number) {
        super.move(frameCount, maxX, maxY);
        // 4. move and adjust the shots
        for (let i = 0; i < this._shots.length; i++) {
            this._shots[i].move(frameCount, maxX, maxY);
            if (this._shots[i].isDead()) {
                this._shots.splice(i,1);
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        // 4. draw the remaining shots
        for (let i = 0; i < this.shots.length; i++) {
            this._shots[i].draw(ctx);
        }
        super.draw(ctx);
    }
    
    
}