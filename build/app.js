class Fruit {
    constructor(name, lifespan, score, xPos, yPos, imageSource) {
        this._name = name;
        this._lifespan = lifespan;
        this._score = score;
        this._xPos = xPos;
        this._yPos = yPos;
        this._image = this.loadNewImage(imageSource);
    }
    get name() {
        return this._name;
    }
    get lifespan() {
        return this._lifespan;
    }
    get score() {
        return this._score;
    }
    get xPos() {
        return this._xPos;
    }
    get yPos() {
        return this._yPos;
    }
    get image() {
        return this._image;
    }
    move(canvas) {
        console.log('moving some fruit');
    }
    draw(ctx) {
        ctx.drawImage(this._image, this._xPos, this._yPos);
    }
    isDead(counter) {
        if (counter >= this._lifespan) {
            return true;
        }
        return false;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Apple extends Fruit {
    constructor(lifespan, xPos, yPos, xVel, yVel) {
        super("Apple", lifespan, -1, xPos, yPos, "./assets/apple-sm.png");
        this._xVel = xVel;
        this._yVel = yVel;
    }
    get xVel() {
        return this._xVel;
    }
    get yVel() {
        return this._yVel;
    }
    move(canvas) {
        if (this.xPos + this.image.width > canvas.width || this.xPos < 0) {
            this._xVel = -this._xVel;
        }
        if (this.yPos + this.image.height > canvas.height || this.yPos < 0) {
            this._yVel = -this._yVel;
        }
        this._xPos += this._xVel;
        this._yPos += this._yVel;
    }
}
class Kiwi extends Fruit {
    constructor(lifespan, xPos, yPos) {
        super("Kiwi", lifespan, 1, xPos, yPos, "./assets/kiwi-sm.png");
    }
    move(canvas) {
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.draw();
            this.move();
            this.counter++;
            for (let i = 0; i < this.fruit.length; i++) {
                if (this.fruit[i].isDead(this.counter)) {
                    this.fruit.splice(i, 1);
                }
            }
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            this.fruit.forEach(fruit => {
                if (event.clientX >= fruit.xPos &&
                    event.clientX < fruit.xPos + fruit.image.width &&
                    event.clientY >= fruit.yPos &&
                    event.clientY <= fruit.yPos + fruit.image.height) {
                    this.score += fruit.score;
                }
            });
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.fruit = [];
        for (let index = 0; index < this.randomNumber(3, 10); index++) {
            this.fruit.push(new Kiwi(this.randomNumber(0, 350), this.randomNumber(0, this.canvas.width - 200), this.randomNumber(0, this.canvas.height - 200)));
        }
        for (let index = 0; index < this.randomNumber(1, 3); index++) {
            this.fruit.push(new Apple(this.randomNumber(0, 350), this.randomNumber(0, this.canvas.width - 200), this.randomNumber(0, this.canvas.height - 200), 4, 5));
        }
        document.addEventListener("click", this.mouseHandler);
        this.counter = 0;
        this.score = 0;
        this.loop();
    }
    draw() {
        if (this.fruit.filter(fruit => fruit.name == "Kiwi").length != 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.fruit.forEach(fruit => {
                fruit.draw(this.ctx);
            });
            this.writeTextToCanvas(`Score is: ${this.score}`, 40, 100, 40);
        }
        else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.writeTextToCanvas("Game over", 60, this.canvas.width / 2, this.canvas.height / 2);
            this.writeTextToCanvas(`Uw score is: ${this.score}`, 40, this.canvas.width / 2, this.canvas.height / 2 + 50);
        }
    }
    move() {
        this.fruit.forEach(fruit => fruit.move(this.canvas));
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => {
    const KiwiWars = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map