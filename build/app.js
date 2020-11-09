class GameItem {
    constructor(imgSrc, xPos, yPos) {
        this.img = new Image();
        this.img.src = imgSrc;
        this.xPos = xPos;
        this.yPos = yPos;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.xPos, this.yPos);
    }
    getImgHeight() {
        return this.img.height;
    }
    getImgWidth() {
        return this.img.width;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
}
class Egg extends GameItem {
    constructor(xPos, yPos) {
        super("./assets/img/egg.png", xPos, yPos);
        this.score = -5;
    }
    getScore() {
        return this.score;
    }
}
class Game {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.move(this.canvas);
            this.gameItems = this.gameItems.filter((element) => {
                if (this.player.isCleaningUp(element)) {
                    if (element instanceof Egg || element instanceof Garbage) {
                        this.score += element.getScore();
                    }
                    return false;
                }
                return true;
            });
            this.draw();
            this.writeTextToCanvas(`Score: ${this.score}`, 36, 120, 50);
            if (this.countUntilNextItem === 0) {
                this.addNewGameItem();
                this.countUntilNextItem = this.randomNumber(120, 240);
            }
            this.countUntilNextItem--;
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.gameItems = [];
        for (let i = 0; i < this.randomNumber(3, 10); i++) {
            this.gameItems.push(new Garbage(this.randomNumber(0, this.canvas.width - 32), this.randomNumber(0, this.canvas.height - 32)));
        }
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.gameItems.push(new Egg(this.randomNumber(0, this.canvas.width - 50), this.randomNumber(0, this.canvas.height - 64)));
        }
        this.player = new Player(this.randomNumber(0, this.canvas.width - 76), this.randomNumber(0, this.canvas.height - 92));
        this.score = 0;
        this.countUntilNextItem = 300;
        this.loop();
    }
    draw() {
        this.gameItems.forEach((element) => {
            element.draw(this.ctx);
        });
        this.player.draw(this.ctx);
    }
    addNewGameItem() {
        const choice = this.randomNumber(0, 10);
        if (choice < 5) {
            this.gameItems.push(new Garbage(this.randomNumber(0, this.canvas.width - 32), this.randomNumber(0, this.canvas.height - 32)));
        }
        else {
            this.gameItems.push(new Egg(this.randomNumber(0, this.canvas.width - 50), this.randomNumber(0, this.canvas.height - 64)));
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
class Garbage extends GameItem {
    constructor(xPos, yPos) {
        super("./assets/img/icecream.png", xPos, yPos);
        this.score = 1;
    }
    getScore() {
        return this.score;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
class Player extends GameItem {
    constructor(xPos, yPos) {
        super("./assets/img/character_robot_walk0.png", xPos, yPos);
        this.xVel = 3;
        this.yVel = 3;
        this.keyboardListener = new KeyboardListener();
    }
    move(canvas) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.xPos + this.img.width < canvas.width) {
            this.xPos += this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.xPos > 0) {
            this.xPos -= this.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.yPos > 0) {
            this.yPos -= this.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.yPos + this.img.height < canvas.height) {
            this.yPos += this.yVel;
        }
    }
    isCleaningUp(item) {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
            if (this.xPos < item.getXPos() + item.getImgWidth() &&
                this.xPos + this.img.width > item.getXPos() &&
                this.yPos < item.getYPos() + item.getImgHeight() &&
                this.yPos + this.img.height > item.getYPos()) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=app.js.map