class Game {
  // refactor: kiwi en Apple array to fruit array
  // private kiwis: Kiwi[];
  // private apples: Apple[];

  // introducing Fruit array
  private fruit: Fruit[];

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
    // this.kiwis = [];
    // this.apples = [];
    this.fruit = [];

    // add some kiwis (using the Kiwi class) to the fruit array
    for (let index = 0; index < this.randomNumber(3, 10); index++) {
      this.fruit.push(
        new Kiwi(
          this.randomNumber(0, 350),
          this.randomNumber(0, this.canvas.width - 200),
          this.randomNumber(0, this.canvas.height - 200)
        )
      );
    }

    // add some apples (using the apple class) to the fruit array
    for (let index = 0; index < this.randomNumber(1, 3); index++) {
      this.fruit.push(
        new Apple(
          this.randomNumber(0, 350),
          this.randomNumber(0, this.canvas.width - 200),
          this.randomNumber(0, this.canvas.height - 200),
          4,
          5
        )
      );
    }

    // add an mouse event listener
    document.addEventListener("click", this.mouseHandler);

    // set the counter and score to 0
    this.counter = 0;
    this.score = 0;

    // run loop
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
    for (let i = 0; i < this.fruit.length; i++) {
      if (this.fruit[i].isDead(this.counter)) {
        this.fruit.splice(i, 1); // remove an element from the kiwi array
      }
    }
    requestAnimationFrame(this.loop);
  };

  //This method is refactored in r32 - r58
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
  // private fruitFactory(source: string, name: string): any {
  //   return {
  //     name: name,
  //     lifespan: this.randomNumber(0, 350),
  //     xPos: this.randomNumber(0, this.canvas.width - 200),
  //     yPos: this.randomNumber(0, this.canvas.height - 200),
  //     image: this.loadNewImage(source),
  //     xVel: 5,
  //     yVel: 6
  //   };
  // }

  /**
   * Method to handle the mouse event
   * @param {MouseEvent} event - mouse event
   */
  private mouseHandler = (event: MouseEvent) => {
    console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);

    // simple click detection for kiwi's
    this.fruit.forEach(fruit => {
      if (
        event.clientX >= fruit.xPos &&
        event.clientX < fruit.xPos + fruit.image.width &&
        event.clientY >= fruit.yPos &&
        event.clientY <= fruit.yPos + fruit.image.height
      ) {
        this.score += fruit.score;
      }
    });

    // refactored into one click detection r128 - r140
    // simple click detection for apples
    // this.apples.forEach(apple => {
    //   if (
    //     event.clientX >= apple.xPos &&
    //     event.clientX < apple.xPos + apple.image.width &&
    //     event.clientY >= apple.yPos &&
    //     event.clientY <= apple.yPos + apple.image.height
    //   ) {
    //     this.score--;
    //   }
    // });
  };

  // Method replaced into Fruit superclass
  // /**
  //  * Method to load an image
  //  * @param {HTMLImageElement} source
  //  * @return HTMLImageElement - returns an image
  //  */
  // private loadNewImage(source: string): HTMLImageElement {
  //   const img = new Image();
  //   img.src = source;
  //   return img;
  // }

  /**
   * Method to draw fruit (kiwi or apple) to the canvas
   */
  private draw() {
    // refactor: filter through the fruit array and count the Kiwi objects, if not nil..
    if (this.fruit.filter(fruit => fruit.name == "Kiwi").length != 0) {
      // clear the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // individual apple and kiwi drawing refactored in fuit drawing r189 - r192
      //draw some apples
      // this.apples.forEach(apple => {
      //   this.ctx.drawImage(apple.image, apple.xPos, apple.yPos);
      // });

      // draw some kiwis
      // this.kiwis.forEach(kiwi => {
      //   this.ctx.drawImage(kiwi.image, kiwi.xPos, kiwi.yPos);
      // });

      // draw some fruit
      // this.fruit.forEach(fruit => {
      //   this.ctx.drawImage(fruit.image, fruit.xPos, fruit.yPos);
      // });
      this.fruit.forEach(fruit => {
        fruit.draw(this.ctx);
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
   * Metod is refactored. Move methode is replaced into Apple object
   */
  public move() {

    // refacor: give each fruit the oppurtunity to move itself
    this.fruit.forEach(fruit => fruit.move(this.canvas));
    
    // refactor: other option without higher order functions
    // this.fruit.forEach(fruit => {
    //   // only an apple has the ability to move
    //   if (fruit.name == "Apple") {
    //     fruit.move(this.canvas); //polymorphism
    //   }
    // });
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
