class Player extends GameItem {
    private xVel: number;
    private yVel: number;
    private keyboardListener: KeyboardListener;

    public constructor(xPos: number, yPos: number) {
        super("./assets/img/character_robot_walk0.png", xPos, yPos);
        this.xVel = 3;
        this.yVel = 3;
        this.keyboardListener = new KeyboardListener();
    }

    /**
     * Moves the player depending on which arrow key is pressed. Player is bound
     * to the canvas and cannot move outside of it
     */
    public move(canvas: HTMLCanvasElement): void {
        // Moving right
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width < canvas.width
        ) {
            this.xPos += this.xVel;
        }

        // Moving left
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos > 0
        ) {
            this.xPos -= this.xVel;
        }

        // Moving up
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos > 0
        ) {
            this.yPos -= this.yVel;
        }

        // Moving down
        if (
            this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height < canvas.height
        ) {
            this.yPos += this.yVel;
        }
    }

    /**
     * Checks whether the player is colliding with an item. Return true if it
     * does, false if it doesn't.
     *
     * @param {GameItem} item - GameItem to check collision with
     */
    public isCollidingWith(item: GameItem) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            if (
                this.xPos < item.getXPos() + item.getImg().width &&
                this.xPos + this.img.width > item.getXPos() &&
                this.yPos < item.getYPos() + item.getImg().height &&
                this.yPos + this.img.height > item.getYPos()
            ) {
                return true;
            }
        }

        return false;
    }
}
