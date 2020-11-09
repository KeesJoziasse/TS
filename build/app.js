class Asteroid {
    constructor(imgUrl, xPos, yPos, xVel, yVel) {
        this._xPos = xPos;
        this._yPos = yPos;
        this._xVel = xVel;
        this._yVel = yVel;
        this.loadImage(imgUrl);
    }
    move(canvas) {
        if (this._xPos + this._img.width / 2 > canvas.width ||
            this._xPos - this._img.width / 2 < 0) {
            this._xVel = -this._xVel;
        }
        if (this._yPos + this._img.height / 2 > canvas.height ||
            this._yPos - this._img.height / 2 < 0) {
            this._yVel = -this._yVel;
        }
        this._xPos += this._xVel;
        this._yPos += this._yVel;
    }
    draw(ctx) {
        const x = this._xPos - this._img.width / 2;
        const y = this._yPos - this._img.height / 2;
        ctx.drawImage(this._img, x, y);
    }
    loadImage(source) {
        this._img = new Image();
        this._img.src = source;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.asteroid.move(this.canvas);
            this.largeAsteroid.move(this.canvas);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.asteroid.draw(this.ctx);
            this.largeAsteroid.draw(this.ctx);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        this.asteroid = new Asteroid("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png", this.randomNumber(0, this.canvas.width - 10), this.randomNumber(0, this.canvas.height - 10), 3, 3);
        this.largeAsteroid = new Asteroid("./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png", this.randomNumber(0, this.canvas.width - 10), this.randomNumber(0, this.canvas.height - 10), 3, 3);
        this.highscores = [
            {
                playerName: "Loek",
                score: 40000
            },
            {
                playerName: "Daan",
                score: 34000
            },
            {
                playerName: "Rimmert",
                score: 200
            }
        ];
        this.loop();
    }
    startScreen() {
        this.writeTextToCanvas("Asteroids", 140, this.canvas.width / 2, 150);
        this.writeTextToCanvas("PRESS PLAY TO START", 40, this.canvas.width / 2, this.canvas.height / 2 - 20);
        const asteroidFileName = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
        this.loadImage(asteroidFileName, this.writeStartButtonToStartScreen);
        const startButtonFileName = "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png";
        this.loadImage(startButtonFileName, this.writeAsteroidImageToStartScreen);
    }
    writeAsteroidImageToStartScreen(img) {
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 2 + img.height / 2;
        this.ctx.drawImage(img, x, y);
    }
    writeStartButtonToStartScreen(img) {
        const x = this.canvas.width / 2;
        const y = this.canvas.height / 2 + 219;
        this.ctx.drawImage(img, x - img.width / 2, y);
        this.writeTextToCanvas("Play", 20, x, y + 26, "center", "black");
    }
    levelScreen() {
        const lifeImageFileName = "./assets/images/SpaceShooterRedux/PNG/UI/playerLife1_blue.png";
        this.loadImage(lifeImageFileName, this.writeLifeImagesToLevelScreen);
        this.writeTextToCanvas(`Your score: ${this.score}`, 20, this.canvas.width - 100, 30, "right");
        const asteroids = [
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png"
        ];
        const maxAsteroidsOnScreen = 5;
        for (let i = 0; i < maxAsteroidsOnScreen; i++) {
            const index = this.randomNumber(0, asteroids.length);
            this.loadImage(asteroids[index], this.writeAsteroidImageToRandomLocationOnLevelScreen);
        }
        const playerSpaceShipFileName = "./assets/images/SpaceShooterRedux/PNG/playerShip1_blue.png";
        this.loadImage(playerSpaceShipFileName, this.writePlayerShipToLevelScreen);
    }
    writeLifeImagesToLevelScreen(img) {
        let x = 10;
        const y = img.height - 10;
        for (let life = 0; life < this.lives; life++) {
            this.ctx.drawImage(img, x, y);
            x += img.width + 10;
        }
    }
    writeAsteroidImageToRandomLocationOnLevelScreen(img) {
        const x = this.randomNumber(0, this.canvas.width - img.width);
        const y = this.randomNumber(0, this.canvas.height - img.height);
        this.ctx.drawImage(img, x, y);
    }
    writePlayerShipToLevelScreen(img) {
        const x = this.canvas.width / 2 - img.width / 2;
        const y = this.canvas.height / 2 - img.height / 2;
        this.ctx.drawImage(img, x, y);
    }
    titleScreen() {
        const x = this.canvas.width / 2;
        let y = this.canvas.height / 2;
        this.writeTextToCanvas(`${this.player} score is ${this.score}`, 80, x, y - 100);
        this.writeTextToCanvas("HIGHSCORES", 40, x, y);
        for (let i = 0; i < this.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.highscores[i].playerName} - ${this.highscores[i].score}`;
            this.writeTextToCanvas(text, 20, x, y);
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    loadImage(source, callback) {
        const imageElement = new Image();
        imageElement.addEventListener("load", () => {
            callback.apply(this, [imageElement]);
        });
        imageElement.src = source;
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = function () {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map