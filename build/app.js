class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.loadImage(this.asteroid.image, this.drawMovingImageToLevelScreen);
            this.loadImage(this.largeAsteroid.image, this.drawLargeMovingImageToLevelScreen);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        this.asteroid = {
            image: "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            xPos: this.randomNumber(0, this.canvas.width - 10),
            yPos: this.randomNumber(0, this.canvas.height - 10),
            xVel: 3,
            yVel: 3
        };
        this.largeAsteroid = {
            image: "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            xPos: this.randomNumber(0, this.canvas.width - 10),
            yPos: this.randomNumber(0, this.canvas.height - 10),
            xVel: 3,
            yVel: 3
        };
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
    drawMovingImageToLevelScreen(img) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(img, this.asteroid.xPos, this.asteroid.yPos);
        if (this.asteroid.xPos + img.width > this.canvas.width ||
            this.asteroid.xPos < 0) {
            this.asteroid.xVel = -this.asteroid.xVel;
        }
        if (this.asteroid.yPos + img.height > this.canvas.height ||
            this.asteroid.yPos < 0) {
            this.asteroid.yVel = -this.asteroid.yVel;
        }
        this.asteroid.xPos += this.asteroid.xVel;
        this.asteroid.yPos += this.asteroid.yVel;
    }
    drawLargeMovingImageToLevelScreen(img) {
        this.ctx.drawImage(img, this.largeAsteroid.xPos, this.largeAsteroid.yPos);
        if (this.largeAsteroid.xPos + img.width > this.canvas.width ||
            this.largeAsteroid.xPos < 0) {
            this.largeAsteroid.xVel = -this.largeAsteroid.xVel;
        }
        if (this.largeAsteroid.yPos + img.height > this.canvas.height ||
            this.largeAsteroid.yPos < 0) {
            this.largeAsteroid.yVel = -this.largeAsteroid.yVel;
        }
        this.largeAsteroid.xPos += this.largeAsteroid.xVel;
        this.largeAsteroid.yPos += this.largeAsteroid.yVel;
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