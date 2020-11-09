class Game {
    constructor(canvas) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.movePlayer();
            this.draw();
            if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_SPACE)) {
                this.cleanUpGarbage();
                this.pickUpEgg();
            }
            this.writeTextToCanvas("Score: 0", 36, 120, 50);
            if (this.countUntilNextItem === 0) {
                const choice = this.randomNumber(0, 10);
                if (choice < 5) {
                    this.garbageItems.push({
                        img: this.loadNewImage("./assets/img/icecream.png"),
                        xPos: this.randomNumber(0, this.canvas.width - 32),
                        yPos: this.randomNumber(0, this.canvas.height - 32),
                    });
                }
                else {
                    this.eggs.push({
                        img: this.loadNewImage("./assets/img/egg.png"),
                        xPos: this.randomNumber(0, this.canvas.width - 50),
                        yPos: this.randomNumber(0, this.canvas.height - 64),
                    });
                }
                this.countUntilNextItem = this.randomNumber(120, 240);
            }
            this.countUntilNextItem--;
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.garbageItems = [];
        this.eggs = [];
        for (let i = 0; i < this.randomNumber(3, 10); i++) {
            this.garbageItems.push({
                img: this.loadNewImage("./assets/img/icecream.png"),
                xPos: this.randomNumber(0, this.canvas.width - 32),
                yPos: this.randomNumber(0, this.canvas.height - 32),
            });
        }
        for (let i = 0; i < this.randomNumber(1, 5); i++) {
            this.eggs.push({
                img: this.loadNewImage("./assets/img/egg.png"),
                xPos: this.randomNumber(0, this.canvas.width - 50),
                yPos: this.randomNumber(0, this.canvas.height - 64),
            });
        }
        this.player = {
            img: this.loadNewImage("./assets/img/character_robot_walk0.png"),
            xPos: this.randomNumber(0, this.canvas.width - 76),
            xVel: 3,
            yPos: this.randomNumber(0, this.canvas.height - 92),
            yVel: 3,
        };
        this.countUntilNextItem = 300;
        this.loop();
    }
    draw() {
        this.garbageItems.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });
        this.eggs.forEach((element) => {
            this.ctx.drawImage(element.img, element.xPos, element.yPos);
        });
        this.ctx.drawImage(this.player.img, this.player.xPos, this.player.yPos);
    }
    movePlayer() {
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_RIGHT)
            && this.player.xPos + this.player.img.width < this.canvas.width) {
            this.player.xPos += this.player.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_LEFT)
            && this.player.xPos > 0) {
            this.player.xPos -= this.player.xVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_UP)
            && this.player.yPos > 0) {
            this.player.yPos -= this.player.yVel;
        }
        if (this.keyboardListener.isKeyDown(KeyboardListener.KEY_DOWN)
            && this.player.yPos + this.player.img.height < this.canvas.height) {
            this.player.yPos += this.player.yVel;
        }
    }
    cleanUpGarbage() {
        this.garbageItems = this.garbageItems.filter((element) => {
            if (this.player.xPos < element.xPos + element.img.width &&
                this.player.xPos + this.player.img.width > element.xPos &&
                this.player.yPos < element.yPos + element.img.height &&
                this.player.yPos + this.player.img.height > element.yPos) {
            }
            else {
                return element;
            }
        });
    }
    pickUpEgg() {
        this.eggs = this.eggs.filter((element) => {
            if (this.player.xPos < element.xPos + element.img.width &&
                this.player.xPos + this.player.img.width > element.xPos &&
                this.player.yPos < element.yPos + element.img.height &&
                this.player.yPos + this.player.img.height > element.yPos) {
            }
            else {
                return element;
            }
        });
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px sans-serif`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
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
//# sourceMappingURL=app.js.map