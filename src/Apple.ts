/// <reference path="Fruit.ts" />

class Apple extends Fruit {
  private _xVel: number;
  private _yVel: number;
  
  /**
   * Constructor to construct an Apple object
   * @param {number} lifespan - lifespan of the Apple object
   * @param {number} xPos - x coordinates on canvas
   * @param {number} yPos - y coordinates on canvas
   * @param {number} xVel - velocity on the x-axis
   * @param {number} yVel - verlocity on the y-axis
   */
  public constructor(
    lifespan: number,
    xPos: number,
    yPos: number,
    xVel: number,
    yVel: number
  ) {
    super("Apple", lifespan, -1, xPos, yPos, "./assets/apple-sm.png");
    this._xVel = xVel;
    this._yVel = yVel;
  }

  // getters and setters
  public get xVel(): number {
    return this._xVel;
  }

  public get yVel(): number {
    return this._yVel;
  }

  /**
   * Let this Apple move itself about the canvas
   * 
   * @param canvas the canvas to move on
   */
  public move(canvas:HTMLCanvasElement) {
    //check to see if this apple is within the screen
    if (this.xPos + this.image.width > canvas.width || this.xPos < 0) {
      this._xVel = -this._xVel;
    }
    if (this.yPos + this.image.height > canvas.height || this.yPos < 0) {
      this._yVel = -this._yVel;
    }
    // moving this apple
    this._xPos += this._xVel;
    this._yPos += this._yVel;
  }
}
