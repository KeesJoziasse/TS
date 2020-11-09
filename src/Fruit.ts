class Fruit {
  protected readonly _name: string;
  protected readonly _lifespan: number;
  protected _xPos: number;
  protected _yPos: number;
  protected _image: HTMLImageElement;
  protected _score: number;

  /**
   * Constructor to construct an Apple object
   * @param {string} name - the name of the fruit (either "Kiwi" or "Apple" for now)
   * @param {number} lifespan - lifespan of the Fruit object
   * @param {number} score - the score for this fruit when the player hits it
   * @param {number} xPos - x coordinates on canvas
   * @param {number} yPos - y coordinates on canvas
   * @param {string} imageSource - image source url
   */
  public constructor(
    name: string,
    lifespan: number,
    score: number,
    xPos: number,
    yPos: number,
    imageSource: string
  ) {
    this._name = name;
    this._lifespan = lifespan;
    this._score = score;
    this._xPos = xPos;
    this._yPos = yPos;
    this._image = this.loadNewImage(imageSource);
  }

  //getters and setters

  public get name(): string {
    return this._name;
  }

  public get lifespan(): number {
    return this._lifespan;
  }

  public get score(): number {
    return this._score;
  }

  public get xPos(): number {
    return this._xPos;
  }

  public get yPos(): number {
    return this._yPos;
  }

  public get image(): HTMLImageElement {
    return this._image;
  }

  /**
   * Let this Fruit move itself about the canvas
   * 
   * @param canvas the canvas to move on
   */
  public move(canvas:HTMLCanvasElement) {
    console.log('moving some fruit');
  }

  /**
   * Let theis Fruit draw itself using the given RenderingContext
   * 
   * @param ctx the renderingcontext to draw on
   */
  public draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this._image, this._xPos, this._yPos);
  }
  
  /**
   * Returns true is this Fruit is dead. This is when the game time (counter) 
   * value exceeeds the lifespan of this Fruit object.
   * 
   * @param counter the current game time
   */
  public isDead(counter: number): boolean {
    if (counter >= this._lifespan) {
      return true;
    } 
    return false;
  }

  /**
   * Method to load an image
   * @param {HTMLImageElement} source
   * @return HTMLImageElement - returns an image
   */
  private loadNewImage(source: string): HTMLImageElement {
    const img = new Image();
    img.src = source;
    return img;
  }

}
