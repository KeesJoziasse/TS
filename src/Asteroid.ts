/// <reference path="GameEntity.ts"/>

/**
 * Class representing an Asteroid Game Entity.
 */
class Asteroid extends GameEntity {

    /**
     * Let the asteroid move itself with its own given speed. It should also handle the offscreen
     * events correctly
     *
     * @param canvas the canvas
     */
    public move (canvas: HTMLCanvasElement) {
        super.move(canvas);

        if (
            this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.x - this.img.width / 2 < 0
        ) {
            this.vel = this.vel.mirror_Y();
        }
        if (
            this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0
        ) {
            this.vel = this.vel.mirror_X();
        }
    }

}
