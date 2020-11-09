class GameEntity {
    constructor(pos, vel = new Vector()) {
        this.pos = pos;
        this.vel = vel;
    }
    move(canvas) {
        this.pos = this.pos.add(this.vel);
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
class GameImageEntity extends GameEntity {
    constructor(img, pos, vel = new Vector()) {
        super(pos, vel);
        this.img = img;
    }
    draw(ctx) {
        const x = this.pos.x - this.img.width / 2;
        const y = this.pos.y - this.img.height / 2;
        if (this.img.naturalWidth > 0) {
            ctx.drawImage(this.img, x, y);
        }
    }
}
class Asteroid extends GameImageEntity {
    move(canvas) {
        super.move(canvas);
        if (this.pos.x + this.img.width / 2 > canvas.width ||
            this.pos.x - this.img.width / 2 < 0) {
            this.vel = this.vel.mirror_Y();
        }
        if (this.pos.y + this.img.height / 2 > canvas.height ||
            this.pos.y - this.img.height / 2 < 0) {
            this.vel = this.vel.mirror_X();
        }
    }
}
class Button extends GameImageEntity {
    constructor(label, img, pos) {
        super(img, pos);
        this.label = new TextField(new Vector(pos.x, pos.y + 5), label, 20, "black");
    }
    draw(ctx) {
        super.draw(ctx);
        this.label.draw(ctx);
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.label.drawDebugInfo(ctx);
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
    randomRoundedNumber(min, max) {
        return Math.round(this.randomNumber(min, max));
    }
    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
}
class LevelScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.shouldSwitchToTitleScreen = false;
        const life = game.resources.getImage('playerLife1');
        this.lives = [];
        let x = 10;
        const y = life.height - 10;
        for (let cnt = 0; cnt < 3; cnt++) {
            this.lives.push(new GameImageEntity(life, new Vector(x, y)));
            x += life.width + 10;
        }
        this.score = 400;
        this.scoreField = new TextField(new Vector(this.game.canvas.width - 100, 30), `Your score: ${this.score}`, 20);
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
        for (let i = 0; i < this.randomRoundedNumber(5, 20); i++) {
            const randomIndex = this.randomRoundedNumber(0, asteroidFilenames.length - 1);
            this.asteroids.push(new Asteroid(game.resources.getImage(asteroidFilenames[randomIndex]), new Vector(this.randomRoundedNumber(0, game.canvas.width - 120), this.randomRoundedNumber(0, game.canvas.height - 98)), new Vector(this.randomRoundedNumber(0, 10), this.randomRoundedNumber(0, 10))));
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
        this.lives.forEach((life) => {
            life.draw(ctx);
        });
        this.scoreField.draw(ctx);
        this.asteroids.forEach((asteroid) => {
            asteroid.draw(ctx);
        });
        this.ship.draw(ctx);
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.scoreField.drawDebugInfo(ctx);
        this.asteroids.forEach((asteroid) => {
            asteroid.drawDebugInfo(ctx);
        });
        this.ship.drawDebugInfo(ctx);
    }
}
class LoadingScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.loadText = new TextField(this.center, "LOADING...", 140);
        this.initAllGameResources(game);
    }
    initAllGameResources(game) {
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
        this.loadText.draw(ctx);
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.loadText.drawDebugInfo(ctx);
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
        if (!(key in this.assets)) {
            throw new Error(`${key} not in assets`);
        }
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
class Ship extends GameImageEntity {
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
        super.move(canvas);
        const minX = this.img.width / 2;
        const maxX = canvas.width - minX;
        if (this.pos.x < minX) {
            this.pos = new Vector(minX, this.pos.y);
        }
        else if (this.pos.x > maxX) {
            this.pos = new Vector(maxX, this.pos.y);
        }
        const minY = this.img.height / 2;
        const maxY = canvas.height - minY;
        if (this.pos.y < minY) {
            this.pos = new Vector(this.pos.x, minY);
        }
        else if (this.pos.y > maxY) {
            this.pos = new Vector(this.pos.x, maxY);
        }
    }
}
class StartScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.components = [];
        this.shouldStartLevel = false;
        this.components.push(new TextField(new Vector(this.center.x, 150), "Asteroids", 140));
        this.components.push(new TextField(new Vector(this.center.x, this.center.y - 20), "PRESS S TO PLAY", 40));
        this.components.push(new Button("Press s to play", game.resources.getImage('button'), new Vector(this.center.x, this.center.y + 150)));
        this.components.push(new Asteroid(game.resources.getImage('meteor_big1'), new Vector(this.center.x, this.center.y), new Vector()));
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
        this.components.forEach((component) => {
            component.draw(ctx);
        });
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.components.forEach((component) => {
            component.drawDebugInfo(ctx);
        });
    }
}
class TextField extends GameEntity {
    constructor(pos, label, fontSize = 20, color = "white", alignment = "center") {
        super(pos);
        this.label = label;
        this.fontSize = fontSize;
        this.color = color;
        this.alignment = alignment;
    }
    draw(ctx) {
        ctx.font = `${this.fontSize}px Minecraft`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.alignment;
        ctx.fillText(this.label, this.pos.x, this.pos.y);
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        ctx.save();
        ctx.font = `${this.fontSize}px Minecraft`;
        ctx.fillStyle = this.color;
        ctx.textAlign = this.alignment;
        const tm = ctx.measureText(this.label);
        ctx.strokeStyle = '#ffffb3';
        ctx.beginPath();
        ctx.moveTo(this.pos.x - tm.actualBoundingBoxLeft, this.pos.y - tm.actualBoundingBoxAscent);
        ctx.lineTo(this.pos.x + tm.actualBoundingBoxRight, this.pos.y - tm.actualBoundingBoxAscent);
        ctx.lineTo(this.pos.x + tm.actualBoundingBoxRight, this.pos.y + tm.actualBoundingBoxDescent);
        ctx.lineTo(this.pos.x - tm.actualBoundingBoxLeft, this.pos.y + tm.actualBoundingBoxDescent);
        ctx.lineTo(this.pos.x - tm.actualBoundingBoxLeft, this.pos.y - tm.actualBoundingBoxAscent);
        ctx.stroke();
        ctx.restore();
    }
}
class TitleScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.components = [];
        this.shouldSwitchToStartScreen = false;
        this.scores = game.scores;
        this.components.push(new TextField(new Vector(this.center.x, this.center.y - 100), `${this.game.scores.player} score is ${this.scores.score}`, 80));
        this.components.push(new TextField(this.center, "HIGHSCORES", 40));
        let y = this.center.y;
        for (let i = 0; i < this.scores.highscores.length; i++) {
            y += 40;
            const text = `${i + 1}: ${this.scores.highscores[i].playerName} - ${this.scores.highscores[i].score}`;
            this.components.push(new TextField(new Vector(this.center.x, y), text, 20));
        }
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
        this.components.forEach((component) => {
            component.draw(ctx);
        });
    }
    drawDebugInfo(ctx) {
        super.drawDebugInfo(ctx);
        this.components.forEach((component) => {
            component.drawDebugInfo(ctx);
        });
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
    rotate(angle) {
        return Vector.fromSizeAndAngle(this.size, this.angle + angle);
    }
    toString() {
        return `(${this.x.toFixed(0)},${this.y.toFixed(0)})`;
    }
}
//# sourceMappingURL=app.js.map