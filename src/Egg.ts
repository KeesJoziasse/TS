/// <reference path="GameItem.ts" />

class Egg extends GameItem {
    private score: number;

    public constructor(xPos: number, yPos: number) {
        super("./assets/img/egg.png", xPos, yPos);

        this.score = -5;
    }

    /**
     * Get the score for an Egg
     *
     * @returns {number} The score for an Egg
     */
    public getScore(): number {
        return this.score;
    }
}
