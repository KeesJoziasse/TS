class Game {
  private kiwis: any[];
  private apples: any[];
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private counter: number; // number of times the loop is run through
  private score: number;

  /**
   * Constructor method to construct an instance of the Game Class
   * @param {HTMLCanvasElement} canvasId - canvas in the DOM
   */
  public constructor(canvasId: HTMLCanvasElement) {
    // Construct all of the canvas
    this.canvas = canvasId;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Set the context of the canvas
    this.ctx = this.canvas.getContext("2d");

    // create an empty kiwi and apple array
    this.kiwis = [];
    this.apples = [];

    // add some kiwis to the kiwi array
    for (let index = 0; index < this.randomNumber(3, 10); index++) {
      this.kiwis.push(this.fruitFactory("./assets/kiwi-sm.png", "kiwi"));
    }

    // add some apples to the apple array
    for (let index = 0; index < this.randomNumber(1, 3); index++) {
      this.apples.push(this.fruitFactory("./assets/apple-sm.png", "apple"));
    }

    // add an mouse event listener
    document.addEventListener("click", this.mouseHandler);

    // set the counter and score to 0
    this.counter = 0;
    this.score = 0;
    // run re loop
    this.loop();
  }

  /**
   * Method for the Game Loop
   */
  private loop = () => {
    // draw al game items
    this.draw();
    // move the apples
    this.move();
    // raise the counter with 1
    this.counter++;

    // for loop to delete an element from the fruit array if it is not alive anymore
    for (let i = 0; i < this.kiwis.length; i++) {
      if (this.counter >= this.kiwis[i].lifespan) {
        this.kiwis.splice(i, 1); // remove an element from the kiwi array
      }
    }
    requestAnimationFrame(this.loop);
  };

  /**
   * Method to create a kiwi or apple object
   * @param {string} source - string for image url
   * @return {any} Kiwi or apple - returns an kiwi or apple object
   *
   * The kiwi or apple object has the following attributes:
   * - name of the fuit object, name is kiwi or apple
   * - lifespan: amount of seconds a fruit object is visible on the screen (based on counter and frame per seconds)
   * - xPos: x position on the canvas
   * - yPos: y position on the canvas
   * - image: an HTMLimageElement of the kiwi or apple
   * - xVel: velocity on the x-axis
   * - yVel: velocity on the y-axis
   */
  private fruitFactory(source: string, name: string): any {
    return {
      name: name,
      lifespan: this.randomNumber(0, 350),
      xPos: this.randomNumber(0, this.canvas.width - 200),
      yPos: this.randomNumber(0, this.canvas.height - 200),
      image: this.loadNewImage(source),
      xVel: 5,
      yVel: 6
    };
  }

  /**
   * Method to handle the mouse event
   * @param {MouseEvent} event - mouse event
   */
  private mouseHandler = (event: MouseEvent) => {
    console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

    // simple click detection for kiwi's
    this.kiwis.forEach(kiwi => {
      if (
        event.clientX >= kiwi.xPos &&
        event.clientX < kiwi.xPos + kiwi.image.width &&
        event.clientY >= kiwi.yPos &&
        event.clientY <= kiwi.yPos + kiwi.image.height
      ) {
        this.score++;
      }
    });

    // simple click detection for apples
    this.apples.forEach(apple => {
      if (
        event.clientX >= apple.xPos &&
        event.clientX < apple.xPos + apple.image.width &&
        event.clientY >= apple.yPos &&
        event.clientY <= apple.yPos + apple.image.height
      ) {
        this.score--;
      }
    });
  };

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

  /**
   * Method to draw fruit (kiwi or apple) to the canvas
   */
  private draw() {
    // when there are elements in the kiwi array
    if (this.kiwis.length != 0) {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //draw some apples
      this.apples.forEach(apple => {
        this.ctx.drawImage(apple.image, apple.xPos, apple.yPos);
      });

      // draw some kiwis
      this.kiwis.forEach(kiwi => {
        this.ctx.drawImage(kiwi.image, kiwi.xPos, kiwi.yPos);
      });

      //write the current score
      this.writeTextToCanvas(`Score is: ${this.score}`, 40, 100, 40);
    } else {
      // if there are no elements in the kiwi array left draw game over.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.writeTextToCanvas(
        "Game over",
        60,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      // draw the end score
      this.writeTextToCanvas(
        `Uw score is: ${this.score}`,
        40,
        this.canvas.width / 2,
        this.canvas.height / 2 + 50
      );
    }
  }
 
  /**
   * Method to move an apple
   */
  public move() {
    //check to see if the apple is within the screen
    this.apples.forEach(apple => {
      console.log(apple);
      if (
        apple.xPos + apple.image.width > this.canvas.width ||
        apple.xPos < 0
      ) {
        apple.xVel = -apple.xVel;
      }
      if (
        apple.yPos + apple.image.height > this.canvas.height ||
        apple.yPos < 0
      ) {
        apple.yVel = -apple.yVel;
      }
      apple.xPos += apple.xVel;
      apple.yPos += apple.yVel;
    });
  }

  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }

  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

// Initialize the game after the DOM is loaded.
let init = () => {
  const KiwiWars = new Game(
    document.getElementById("canvas") as HTMLCanvasElement
  );
};

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
