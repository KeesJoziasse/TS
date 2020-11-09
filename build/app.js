class Asteroid {
    constructor(imgUrl, pos, vel, angle, angleVel) {
        this.pos = pos;
        this.vel = vel;
        this.angle = angle;
        this.angleVel = angleVel;
        this.loadImage(imgUrl);
    }
    move(canvas) {
        if (this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.y - this.img.width / 2 < 0) {
            this.vel = this.vel.mirror_Y();
        }
        if (this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0) {
            this.vel = this.vel.mirror_X();
        }
        this.pos = this.pos.add(this.vel);
        this.angle += this.angleVel;
    }
    draw(ctx) {
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.angle);
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
        }
        ctx.restore();
    }
    loadImage(source) {
        this.img = new Image();
        this.img.src = source;
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.asteroids.forEach((asteroid) => {
                asteroid.move(this.canvas);
                asteroid.draw(this.ctx);
            });
            this.measureFPS();
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
        const asteroidFilenames = [
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_big4.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_med3.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_small2.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny1.png",
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
        ];
        this.asteroids = [];
        const asteroid_count = 500;
        for (let i = 0; i < asteroid_count; i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length);
            this.asteroids.push(new Asteroid(asteroidFilenames[randomIndex], new Vector(this.randomNumber(0, this.canvas.width - 120), this.randomNumber(0, this.canvas.height - 98)), new Vector(this.randomNumber(0, 10), this.randomNumber(0, 10)), this.randomNumber(0, 2 * Math.PI), this.randomNumber(-3, 3) / 10.0));
        }
        this.highscores = [
            {
                playerName: "Loek",
                score: 40000,
            },
            {
                playerName: "Daan",
                score: 34000,
            },
            {
                playerName: "Rimmert",
                score: 200,
            },
        ];
        this.previous_fps_tick = performance.now();
        this.current_fps = 0;
        this.fps_count = 0;
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
            "./assets/images/SpaceShooterRedux/PNG/Meteors/meteorBrown_tiny2.png",
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
    measureFPS() {
        const time_diff = performance.now() - this.previous_fps_tick;
        if (time_diff >= 1000) {
            this.current_fps = this.fps_count;
            this.fps_count = 0;
            this.previous_fps_tick = performance.now();
        }
        else {
            this.fps_count++;
        }
        const text = `${this.current_fps} FPS`;
        this.ctx.font = `12px Courier`;
        this.ctx.fillStyle = '#ffffb3';
        this.ctx.fillText(text, this.canvas.width - 100, this.canvas.height - 14);
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
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class Vector {
    constructor(x = 0, y = 0) {
        this._size = null;
        this._angle = null;
        this._x = x;
        this._y = y;
    }
    static fromSizeAndAngle(size, angle) {
        let x = size * Math.sin(angle);
        let y = size * Math.cos(angle);
        return new Vector(x, y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get size() {
        if (!this._size) {
            this._size = Math.sqrt(Math.pow(this._x, 2) +
                Math.pow(this._y, 2));
        }
        return this._size;
    }
    get angle() {
        if (!this._angle) {
            this._angle = Math.atan(this._y / this._x);
        }
        return this._angle;
    }
    add(input) {
        return new Vector(this._x + input.x, this._y + input.y);
    }
    subtract(input) {
        return new Vector(this._x - input.x, this._y - input.y);
    }
    scale(scalar) {
        return new Vector(this._x * scalar, this._y * scalar);
    }
    normalize() {
        return Vector.fromSizeAndAngle(1, this.angle);
    }
    mirror_X() {
        return new Vector(this._x, this._y * -1);
    }
    mirror_Y() {
        return new Vector(this._x * -1, this._y);
    }
    distance(input) {
        return this.subtract(input).size;
    }
}
//# sourceMappingURL=app.js.map