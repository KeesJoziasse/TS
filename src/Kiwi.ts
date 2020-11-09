/// <reference path="Fruit.ts" />

class Kiwi extends Fruit {
  /**
   * Constructor to construct an Apple object
   * @param {number} lifespan - lifespan of the Apple object
   * @param {number} xPos - x coordinates on canvas
   * @param {number} yPos - y coordinates on canvas
   */
  public constructor(
    lifespan: number,
    xPos: number,
    yPos: number,
  ) {
    super("Kiwi", lifespan, 1, xPos, yPos, "./assets/kiwi-sm.png");
  }

  /**
   * Let this Kiwi move itself about the canvas
   * 
   * @param canvas the canvas to move on
   */
  public move(canvas:HTMLCanvasElement) {
    // Empty, because kiwi's do not move
  }


}
