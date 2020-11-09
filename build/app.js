class Asteroid {
    constructor(img, pos, vel) {
        this.img = img;
        this.pos = pos;
        this.vel = vel;
    }
    move(canvas) {
        if (this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.x - this.img.width / 2 < 0) {
            this.vel = this.vel.mirror_Y();
        }
        if (this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0) {
            this.vel = this.vel.mirror_X();
        }
        this.pos = this.pos.add(this.vel);
    }
    draw(ctx) {
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    drawDebugInfo(ctx) {
        ctx.save();
        ctx.strokeStyle = '#ffffb3';
        ctx.beginPath();
        ctx.moveTo(this.pos.x - 50, this.pos.y);
        ctx.lineTo(this.pos.x + 50, this.pos.y);
        ctx.moveTo(this.pos.x, this.pos.y - 50);
        ctx.lineTo(this.pos.x, this.pos.y + 50);
        ctx.stroke();
        ctx.font = 'courier 12px';
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(`pos: ${this.pos}`, this.pos.x + 3, this.pos.y - 3);
        ctx.restore();
    }
}
class Game {
    constructor(canvasId) {
        this.debug = false;
        this.debugDown = false;
        this.loop = () => {
            this.currentScreen.increaseFrameCounter();
            this.currentScreen.listen(this.input);
            this.currentScreen.move(this.canvas);
            this.currentScreen.collide();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.currentScreen.draw(this.ctx);
            this.listenForDebug();
            if (this.debug) {
                this.currentScreen.drawDebugInfo(this.ctx);
            }
            this.currentScreen.adjust(this);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.resources = new ResourceRepository("./assets/images/SpaceShooterRedux");
        this.input = new UserInput();
        this.scores = new Scores();
        this.currentScreen = new LoadingScreen(this);
        this.loop();
    }
    listenForDebug() {
        if (this.input.isKeyDown(UserInput.KEY_D)) {
            if (!this.debugDown) {
                this.debug = !this.debug;
                this.debugDown = true;
            }
        }
        else {
            this.debugDown = false;
        }
    }
    switchScreen(newScreen) {
        if (newScreen == null) {
            throw new Error("newScreen cannot be null");
        }
        if (newScreen != this.currentScreen) {
            this.currentScreen = newScreen;
        }
    }
}
let init = () => {
    const Asteroids = new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
class GameScreen {
    constructor(game) {
        this.frameCount = 0;
        this.game = game;
        this.center = new Vector(game.canvas.width / 2, game.canvas.height / 2);
        this.previous_fps_tick = performance.now();
    }
    listen(input) {
    }
    move(canvas) {
    }
    collide() {
    }
    adjust(game) {
    }
    draw(ctx) {
    }
    drawDebugInfo(ctx) {
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
        ctx.font = `12px Courier`;
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(text, this.game.canvas.width - 100, this.game.canvas.height - 14);
    }
    increaseFrameCounter() {
        this.frameCount++;
    }
    writeTextToCanvas(ctx, text, fontSize = 20, position, alignment = "center", color = "white") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, position.x, position.y);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        this.lives = 3;
        this.score = 400;
        this.life = game.resources.getImage('playerLife1');
        this.ship = new Ship(game.resources.getImage("playerShip1"), new Vector(game.canvas.width / 2, game.canvas.height / 2));
        this.initAsteroids(game);
    }
    initAsteroids(game) {
        const asteroidFilenames = [
            "meteor_big1",
            "meteor_big2",
            "meteor_big3",
            "meteor_big4",
            "meteor_med1",
            "meteor_med3",
            "meteor_small1",
            "meteor_small2",
            "meteor_tiny1",
            "meteor_tiny2",
        ];
        this.asteroids = [];
        for (let i = 0; i < this.randomNumber(5, 20); i++) {
            const randomIndex = this.randomNumber(0, asteroidFilenames.length - 1);
            this.asteroids.push(new Asteroid(game.resources.getImage(asteroidFilenames[randomIndex]), new Vector(this.randomNumber(0, game.canvas.width - 120), this.randomNumber(0, game.canvas.height - 98)), new Vector(this.randomNumber(0, 10), this.randomNumber(0, 10))));
        }
    }
    listen(input) {
        this.ship.listen(input);
        if (input.isKeyDown(UserInput.KEY_ESC)) {
            this.shouldSwitchToTitleScreen = true;
        }
    }
    move(canvas) {
        this.asteroids.forEach((asteroid) => {
            asteroid.move(canvas);
        });
        this.ship.move(canvas);
    }
    collide() {
    }
    adjust(game) {
        if (this.shouldSwitchToTitleScreen) {
            game.switchScreen(new TitleScreen(game));
        }
    }
    draw(ctx) {
        this.writeLifeImagesToLevelScreen(ctx);
        this.writeTextToCanvas(ctx, `Your score: ${this.score}`, 20, new Vector(this.game.canvas.width - 100, 30), "right");
        this.asteroids.forEach((asteroid) => {
            asteroid.draw(ctx);
        });
        this.ship.draw(ctx);
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.asteroids.forEach((asteroid) => {
            asteroid.drawDebugInfo(ctx);
        });
        this.ship.drawDebugInfo(ctx);
    }
    writeLifeImagesToLevelScreen(ctx) {
        if (this.life.naturalWidth > 0) {
            let x = 10;
            const y = this.life.height - 10;
            for (let life = 0; life < this.lives; life++) {
                ctx.drawImage(this.life, x, y);
                x += this.life.width + 10;
            }
        }
    }
}
class LoadingScreen extends GameScreen {
    constructor(game) {
        super(game);
        game.resources.addImage('button', 'PNG/UI/buttonBlue.png');
        game.resources.addImage('meteor_big1', 'PNG/Meteors/meteorBrown_big1.png');
        game.resources.addImage('meteor_big2', 'PNG/Meteors/meteorBrown_big2.png');
        game.resources.addImage('meteor_big3', 'PNG/Meteors/meteorBrown_big3.png');
        game.resources.addImage('meteor_big4', 'PNG/Meteors/meteorBrown_big4.png');
        game.resources.addImage('meteor_med1', 'PNG/Meteors/meteorBrown_med1.png');
        game.resources.addImage('meteor_med3', 'PNG/Meteors/meteorBrown_med3.png');
        game.resources.addImage('meteor_small1', 'PNG/Meteors/meteorBrown_small1.png');
        game.resources.addImage('meteor_small2', 'PNG/Meteors/meteorBrown_small2.png');
        game.resources.addImage('meteor_tiny1', 'PNG/Meteors/meteorBrown_tiny1.png');
        game.resources.addImage('meteor_tiny2', 'PNG/Meteors/meteorBrown_tiny2.png');
        game.resources.addImage('playerLife1', 'PNG/UI/playerLife1_blue.png');
        game.resources.addImage('playerShip1', 'PNG/playerShip1_blue.png');
    }
    adjust(game) {
        if (this.frameCount > 10) {
            game.switchScreen(new StartScreen(this.game));
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "LOADING...", 140, this.center);
    }
}
class ResourceRepository {
    constructor(basePath) {
        this.assets = {};
        this.basePath = basePath;
    }
    addImage(key, url) {
        let imageElement = new Image();
        this.assets[key] = imageElement;
        imageElement.src = this.generateURL(url);
    }
    getImage(key) {
        return this.assets[key];
    }
    generateURL(name) {
        return this.basePath + "/" + name;
    }
}
class Scores {
    constructor() {
        this.player = "Player one";
        this.score = 400;
        this.highscores = [
            {
                playerName: 'Loek',
                score: 40000
            },
            {
                playerName: 'Daan',
                score: 34000
            },
            {
                playerName: 'Rimmert',
                score: 200
            }
        ];
    }
    addScore(player, score) {
        this.highscores.push({
            playerName: player,
            score: score
        });
    }
}
class Ship {
    constructor(img, pos) {
        this.img = img;
        this.pos = pos;
        this.vel = new Vector();
    }
    listen(input) {
        let xVel = 0;
        let yVel = 0;
        if (input.isKeyDown(UserInput.KEY_RIGHT)) {
            xVel = 3;
        }
        else if (input.isKeyDown(UserInput.KEY_LEFT)) {
            xVel = -3;
        }
        if (input.isKeyDown(UserInput.KEY_UP)) {
            yVel = -3;
        }
        else if (input.isKeyDown(UserInput.KEY_DOWN)) {
            yVel = 3;
        }
        this.vel = new Vector(xVel, yVel);
    }
    move(canvas) {
        let newPos = this.pos.add(this.vel);
        const minX = this.img.width / 2;
        const maxX = canvas.width - minX;
        if (newPos.x < minX) {
            newPos = new Vector(minX, newPos.y);
        }
        else if (newPos.x > maxX) {
            newPos = new Vector(maxX, newPos.y);
        }
        const minY = this.img.height / 2;
        const maxY = canvas.height - minY;
        if (newPos.y < minY) {
            newPos = new Vector(newPos.x, minY);
        }
        else if (newPos.y > maxY) {
            newPos = new Vector(newPos.x, maxY);
        }
        this.pos = newPos;
    }
    draw(ctx) {
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
    drawDebugInfo(ctx) {
        ctx.save();
        ctx.strokeStyle = '#ffffb3';
        ctx.beginPath();
        ctx.moveTo(this.pos.x - 50, this.pos.y);
        ctx.lineTo(this.pos.x + 50, this.pos.y);
        ctx.moveTo(this.pos.x, this.pos.y - 50);
        ctx.lineTo(this.pos.x, this.pos.y + 50);
        ctx.stroke();
        ctx.font = 'courier 12px';
        ctx.fillStyle = '#ffffb3';
        ctx.fillText(`pos: ${this.pos}`, this.pos.x + 3, this.pos.y - 3);
        ctx.restore();
    }
}
class StartScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldStartLevel = false;
        this.button = game.resources.getImage('button');
        this.asteroid = game.resources.getImage('meteor_big1');
    }
    listen(input) {
        if (input.isKeyDown(UserInput.KEY_S)) {
            this.shouldStartLevel = true;
        }
    }
    adjust(game) {
        if (this.shouldStartLevel) {
            game.switchScreen(new LevelScreen(game));
        }
    }
    draw(ctx) {
        this.writeTextToCanvas(ctx, "Asteroids", 140, new Vector(this.center.x, 150));
        this.writeTextToCanvas(ctx, "PRESS S TO PLAY", 40, new Vector(this.center.x, this.center.y - 20));
        const asteroidX = this.center.x - this.asteroid.width / 2;
        const asteroidY = this.center.y + this.asteroid.height / 2;
        if (this.asteroid.naturalWidth > 0) {
            ctx.drawImage(this.asteroid, asteroidX, asteroidY);
        }
        const buttonX = this.center.x;
        const buttonY = this.center.y + 219;
        if (this.button.naturalWidth > 0) {
            ctx.drawImage(this.button, buttonX - this.button.width / 2, buttonY);
            this.writeTextToCanvas(ctx, "Press s to play", 20, new Vector(buttonX, buttonY + 26), "center", "black");
        }
    }
}
class TitleScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToStartScreen = false;
        this.scores = game.scores;
    }
    listen(input) {
        if (input.isKeyDown(UserInput.KEY_SPACE)) {
            this.shouldSwitchToStartScreen = true;
        }
    }
    adjust(game) {
        if (this.shouldSwitchToStartScreen ||
            this.frameCount > 10 * 60) {
            game.switchScreen(new StartScreen(game));
        }
    }
    draw(ctx) {
        const x = this.game.canvas.width / 2;
        let y = this.game.canvas.height / 2;
        this.writeTextToCanvas(ctx, `${this.game.scores.player} score is ${this.scores.score}`, 80, new Vector(x, y - 100));
        this.writeTextToCanvas(ctx, "HIGHSCORES", 40, new Vector(x, y));
        for (let i = 0; i < this.scores.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.scores.highscores[i].playerName} - ${this.scores.highscores[i].score}`;
            this.writeTextToCanvas(ctx, text, 20, new Vector(x, y));
        }
    }
}
class UserInput {
    constructor() {
        this.inWindow = true;
        this.position = new Vector();
        this.buttonDown = false;
        this.keyCodeStates = new Array();
        this.mouseDown = (ev) => {
            this.buttonDown = true;
        };
        this.mouseUp = (ev) => {
            this.buttonDown = false;
        };
        this.mouseMove = (ev) => {
            this.position = new Vector(ev.clientX, ev.clientY);
        };
        this.mouseEnter = (ev) => {
            this.inWindow = true;
        };
        this.mouseLeave = (ev) => {
            this.inWindow = true;
        };
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] == true;
    }
}
UserInput.KEY_ESC = 27;
UserInput.KEY_SPACE = 32;
UserInput.KEY_LEFT = 37;
UserInput.KEY_UP = 38;
UserInput.KEY_RIGHT = 39;
UserInput.KEY_DOWN = 40;
UserInput.KEY_D = 68;
UserInput.KEY_S = 83;
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
            this._size = Math.atan(this._y / this._x);
        }
        return this._angle;
    }
    add(input) {
        return new Vector(this._x + input.x, this._y + input.y);
    }
    subtract(input) {
        return new Vector(this._x - input.x, this._y - input.y);
    }
    distance(input) {
        return this.subtract(input).size;
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
    toString() {
        return `(${this.x.toFixed(0)},${this.y.toFixed(0)})`;
    }
}
//# sourceMappingURL=app.js.map