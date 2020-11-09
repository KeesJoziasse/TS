/// <reference path="GameImageEntity.ts"/>

/**
 * Class representing a Ship Game Entity.
 */
class Ship extends GameImageEntity {


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
        super.move(canvas);

        const minX = this.img.width / 2;
        const maxX = canvas.width - minX;
        // Move right if we're not at the right canvas border
        if ( this.pos.x < minX) {
            this.pos = new Vector(minX, this.pos.y);
        } else if ( this.pos.x > maxX ) {
            this.pos = new Vector(maxX, this.pos.y);
        }

        const minY = this.img.height / 2;
        const maxY = canvas.height - minY;
        // Move left if we're not at the left canvas border
        if ( this.pos.y < minY) {
            this.pos = new Vector(this.pos.x, minY);
        } else if ( this.pos.y > maxY ) {
            this.pos = new Vector(this.pos.x, maxY);
        }
    }

}
