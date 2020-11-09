class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.draw();
            this.move();
            this.counter++;
            for (let i = 0; i < this.kiwis.length; i++) {
                if (this.counter >= this.kiwis[i].lifespan) {
                    this.kiwis.splice(i, 1);
                }
            }
            requestAnimationFrame(this.loop);
        };
        this.mouseHandler = (event) => {
            console.log(`xPos ${event.clientX}, yPos ${event.clientY}`);
            this.kiwis.forEach(kiwi => {
                if (event.clientX >= kiwi.xPos &&
                    event.clientX < kiwi.xPos + kiwi.image.width &&
                    event.clientY >= kiwi.yPos &&
                    event.clientY <= kiwi.yPos + kiwi.image.height) {
                    this.score++;
                }
            });
            this.apples.forEach(apple => {
                if (event.clientX >= apple.xPos &&
                    event.clientX < apple.xPos + apple.image.width &&
                    event.clientY >= apple.yPos &&
                    event.clientY <= apple.yPos + apple.image.height) {
                    this.score--;
                }
            });
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.kiwis = [];
        this.apples = [];
        for (let index = 0; index < this.randomNumber(3, 10); index++) {
            this.kiwis.push(this.fruitFactory("./assets/kiwi-sm.png", "kiwi"));
        }
        for (let index = 0; index < this.randomNumber(1, 3); index++) {
            this.apples.push(this.fruitFactory("./assets/apple-sm.png", "apple"));
        }
        document.addEventListener("click", this.mouseHandler);
        this.counter = 0;
        this.score = 0;
        this.loop();
    }
    fruitFactory(source, name) {
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
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    draw() {
        if (this.kiwis.length != 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.apples.forEach(apple => {
                this.ctx.drawImage(apple.image, apple.xPos, apple.yPos);
            });
            this.kiwis.forEach(kiwi => {
                this.ctx.drawImage(kiwi.image, kiwi.xPos, kiwi.yPos);
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
        this.apples.forEach(apple => {
            console.log(apple);
            if (apple.xPos + apple.image.width > this.canvas.width ||
                apple.xPos < 0) {
                apple.xVel = -apple.xVel;
            }
            if (apple.yPos + apple.image.height > this.canvas.height ||
                apple.yPos < 0) {
                apple.yVel = -apple.yVel;
            }
            apple.xPos += apple.xVel;
            apple.yPos += apple.yVel;
        });
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