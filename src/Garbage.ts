class Garbage extends GameItem {
    private score: number;

    public constructor(xPos: number, yPos: number) {
        super("./assets/img/icecream.png", xPos, yPos);

        this.score = 1;
    }

    /**
     * Get the score for a Garbage
     *
     * @returns {number} The score for a Garbage
     */
    public getScore(): number {
        return this.score;
    }
}
