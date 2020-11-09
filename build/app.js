class GameItem {
    constructor(image, position, speed, angle, angularSpeed, offscreenBehaviour = GameItem.OFFSCREEN_BEHAVIOUR_OVERFLOW) {
        this._image = image;
        this._position = position;
        this._speed = speed;
        this._angle = angle;
        this._angularSpeed = angularSpeed;
        this._offscreenBehaviour = offscreenBehaviour;
    }
    get collisionRadius() {
        return this._image.height / 2;
    }
    get position() {
        return this._position;
    }
    move(frameCount, maxX, maxY) {
        let newX = this._position.x + this._speed.x;
        let newY = this._position.y - this._speed.y;
        this._position = new Vector(newX, newY);
        switch (this._offscreenBehaviour) {
            case GameItem.OFFSCREEN_BEHAVIOUR_OVERFLOW:
                this.adjustOverflow(maxX, maxY);
                break;
            case GameItem.OFFSCREEN_BEHAVIOUR_BOUNCE:
                break;
            case GameItem.OFFSCREEN_BEHAVIOUR_DIE:
                this.adjustDie(maxX, maxY);
                break;
        }
        this._angle += this._angularSpeed;
    }
    adjustOverflow(maxX, maxY) {
        if (this._position.x > maxX) {
            this._position = new Vector(-this._image.width, this._position.y);
        }
        else if (this._position.x < -this._image.width) {
            this._position = new Vector(maxX, this._position.y);
        }
        if (this._position.y > maxY + this._image.height / 2) {
            this._position = new Vector(this._position.x, -this._image.height / 2);
        }
        else if (this._position.y < -this._image.height / 2) {
            this._position = new Vector(this._position.x, maxY);
        }
    }
    adjustDie(maxX, maxY) {
        if (this._position.x + this._image.width > maxX || this._position.x < 0 ||
            this._position.y + this._image.height / 2 > maxY ||
            this._position.y - this._image.height / 2 < 0) {
            this.die();
        }
    }
    die() {
        this._state = GameItem.STATE_DEAD;
    }
    isDead() {
        return this._state == GameItem.STATE_DEAD;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this._position.x, this._position.y);
        ctx.rotate(this._angle);
        ctx.drawImage(this._image, -this._image.width / 2, -this._image.height / 2);
        ctx.restore();
        if (Game.DEBUG) {
            ctx.save();
            ctx.strokeStyle = '#ffffb3';
            ctx.beginPath();
            this.drawCenterInfo(ctx);
            this.drawCollisionBounds(ctx);
            ctx.stroke();
            ctx.restore();
        }
    }
    drawCenterInfo(ctx) {
        ctx.moveTo(this._position.x - 50, this._position.y);
        ctx.lineTo(this._position.x + 50, this._position.y);
        ctx.moveTo(this._position.x, this._position.y - 50);
        ctx.lineTo(this._position.x, this._position.y + 50);
    }
    drawCollisionBounds(ctx) {
        ctx.moveTo(this._position.x, this._position.y);
        ctx.arc(this._position.x, this._position.y, this._image.width / 2, 0, 2 * Math.PI, false);
    }
}
GameItem.OFFSCREEN_BEHAVIOUR_OVERFLOW = 0;
GameItem.OFFSCREEN_BEHAVIOUR_BOUNCE = 2;
GameItem.OFFSCREEN_BEHAVIOUR_DIE = 3;
GameItem.STATE_ALIVE = 0;
GameItem.STATE_DEAD = 1;
class Asteroid extends GameItem {
    static getRandomImageName(type) {
        return "";
    }
}
Asteroid.IMAGE_URLS = [
    "PNG/Meteors/meteorBrown_big1.png",
    "PNG/Meteors/meteorBrown_big2.png",
    "PNG/Meteors/meteorBrown_big3.png",
    "PNG/Meteors/meteorBrown_big4.png",
    "PNG/Meteors/meteorBrown_med1.png",
    "PNG/Meteors/meteorBrown_med3.png",
    "PNG/Meteors/meteorBrown_small1.png",
    "PNG/Meteors/meteorBrown_small2.png",
    "PNG/Meteors/meteorBrown_tiny1.png",
    "PNG/Meteors/meteorBrown_tiny2.png",
];
Asteroid.BIG_ASTEROIDS = [
    "PNG.Meteors.meteorBrown_big1",
    "PNG.Meteors.meteorBrown_big2",
    "PNG.Meteors.meteorBrown_big3",
    "PNG.Meteors.meteorBrown_big4",
];
Asteroid.MEDIUM_ASTEROIDS = [
    "PNG.Meteors.meteorBrown_med1",
    "PNG.Meteors.meteorBrown_med3",
];
Asteroid.SMALL_ASTEROIDS = [
    "PNG.Meteors.meteorBrown_small1",
    "PNG.Meteors.meteorBrown_small2",
];
Asteroid.TINY_ASTEROIDS = [
    "PNG.Meteors.meteorBrown_tiny1",
    "PNG.Meteors.meteorBrown_tiny2",
];
Asteroid.TYPE_BIG = 3;
Asteroid.TYPE_MEDIUM = 2;
Asteroid.TYPE_SMALL = 1;
Asteroid.TYPE_TINY = 0;
class Game {
    constructor(canvasId) {
        this.angle = 0;
        this.images = [
            "PNG/UI/buttonBlue.png",
            "PNG/UI/playerLife1_blue.png",
            "PNG/playerShip1_blue.png",
            "PNG/Lasers/laserRed07.png",
            "PNG/Meteors/meteorBrown_big1.png",
            "PNG/Meteors/meteorBrown_big2.png",
            "PNG/Meteors/meteorBrown_big3.png",
            "PNG/Meteors/meteorBrown_big4.png",
            "PNG/Meteors/meteorBrown_med1.png",
            "PNG/Meteors/meteorBrown_med3.png",
            "PNG/Meteors/meteorBrown_small1.png",
            "PNG/Meteors/meteorBrown_small2.png",
            "PNG/Meteors/meteorBrown_tiny1.png",
            "PNG/Meteors/meteorBrown_tiny2.png",
        ];
        this.asteroid_names = [
            "PNG.Meteors.meteorBrown_big1",
            "PNG.Meteors.meteorBrown_big2",
            "PNG.Meteors.meteorBrown_big3",
            "PNG.Meteors.meteorBrown_big4",
            "PNG.Meteors.meteorBrown_med1",
            "PNG.Meteors.meteorBrown_med3",
            "PNG.Meteors.meteorBrown_small1",
            "PNG.Meteors.meteorBrown_small2",
            "PNG.Meteors.meteorBrown_tiny1",
            "PNG.Meteors.meteorBrown_tiny2",
        ];
        this.asteroids = [];
        this.currentScreen = Game.LOAD_SCREEN;
        this.frameCounter = 0;
        this.keyListener = new KeyListener();
        this.animate = () => {
            this.frameCounter++;
            this.loop();
            requestAnimationFrame(this.animate);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.player = "Player one";
        this.score = 400;
        this.lives = 3;
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
        this.repo = new ImageRepository("./assets/images/SpaceShooterRedux", this.images);
        this.startAnimation();
    }
    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        switch (this.currentScreen) {
            case Game.LOAD_SCREEN:
                this.loadscreen();
                break;
            case Game.START_SCREEN:
                this.startScreen();
                break;
            case Game.LEVEL_SCREEN:
                this.levelScreen();
                break;
            case Game.TITLE_SCREEN:
                this.titleScreen();
                break;
        }
    }
    loadscreen() {
        this.writeTextToCanvas("Loading...", 80, this.canvas.width / 2, this.canvas.height / 2);
        if (!this.repo.isLoading() && this.frameCounter > 60 * 0.1) {
            this.currentScreen = Game.START_SCREEN;
        }
    }
    startScreen() {
        let centerX = this.canvas.width / 2;
        let centerY = this.canvas.height / 2;
        this.writeTextToCanvas("Asteroids", 140, centerX, 150);
        this.writeTextToCanvas("PRESS PLAY OR HIT 'S' TO START", 40, centerX, centerY - 135);
        this.drawImage("PNG.UI.buttonBlue", centerX, centerY + 220);
        this.writeTextToCanvas("Play", 20, centerX, centerY + 229, 'center', 'black');
        const angle = this.frameCounter * Math.PI / 180;
        this.drawImage("PNG.Meteors.meteorBrown_big1", centerX, centerY + 60, angle);
        if (this.keyListener.isKeyDown(KeyListener.KEY_S)) {
            this.currentScreen = Game.LEVEL_SCREEN;
            this.initLevel();
        }
    }
    initLevel() {
        const maxAsteroidsOnScreen = 10;
        for (let i = 0; i < maxAsteroidsOnScreen; i++) {
            const index = this.randomNumber(0, this.asteroid_names.length - 1);
            const image = this.repo.getImage(this.asteroid_names[index]);
            const position = new Vector(this.randomNumber(0, this.canvas.width - image.width / 2), this.randomNumber(0, this.canvas.height - image.height / 2));
            const speed = new Vector(0.02 * this.randomNumber(-100, 100), 0.02 * this.randomNumber(-100, 100));
            const angle = this.randomNumber(0, Math.PI);
            const angularSpeed = 0.0005 * this.randomNumber(-100, 100);
            this.asteroids[i] = new Asteroid(image, position, speed, angle, angularSpeed);
        }
        const image = this.repo.getImage("PNG.playerShip1_blue");
        const speed = new Vector();
        const position = new Vector(this.canvas.width / 2, this.canvas.height / 2);
        this.ship = new Ship(image, position, speed, 0, 0);
    }
    levelScreen() {
        if (this.keyListener.isKeyDown(KeyListener.KEY_LEFT)) {
            this.ship.decreaseAngularSpeed();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_RIGHT)) {
            this.ship.increaseAngularSpeed();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_UP)) {
            this.ship.thrust();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_DOWN)) {
            this.ship.retroBoost();
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.ship.shoot(this.repo.getImage("PNG.Lasers.laserRed07"));
        }
        else {
            this.ship.stopShooting();
        }
        const lifeImageName = "PNG.UI.playerLife1_blue";
        let x = 30;
        let y = 30;
        for (let life = 0; life < this.lives; life++) {
            this.drawImage(lifeImageName, x, y);
            x += 50;
        }
        this.writeTextToCanvas(`Your score: ${this.score}`, 20, this.canvas.width - 100, 30, 'right');
        for (let i = 0; i < this.asteroids.length; i++) {
            this.asteroids[i].move(this.frameCounter, this.canvas.width, this.canvas.height);
            this.asteroids[i].draw(this.ctx);
        }
        this.ship.move(this.frameCounter, this.canvas.width, this.canvas.height);
        this.ship.draw(this.ctx);
        let shots = this.ship.shots;
        for (let i = 0; i < shots.length; i++) {
            for (let j = 0; j < this.asteroids.length; j++) {
                if (shots[i].hits(this.asteroids[j])) {
                    shots[i].die();
                    this.asteroids[j].die();
                }
            }
        }
        for (let i = 0; i < shots.length; i++) {
            if (shots[i].isDead()) {
                shots.splice(i, 1);
            }
        }
        for (let j = 0; j < this.asteroids.length; j++) {
            if (this.asteroids[j].isDead()) {
                this.asteroids.splice(j, 1);
            }
        }
        if (this.keyListener.isKeyDown(KeyListener.KEY_ESC)) {
            this.currentScreen = Game.TITLE_SCREEN;
        }
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
        if (this.keyListener.isKeyDown(KeyListener.KEY_SPACE)) {
            this.currentScreen = Game.START_SCREEN;
        }
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    drawImage(name, x, y, angle = 0) {
        let img = this.repo.getImage(name);
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(angle);
        this.ctx.drawImage(img, -img.width / 2, -img.height / 2);
        this.ctx.restore();
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    startAnimation() {
        console.log('start animation');
        requestAnimationFrame(this.animate);
    }
}
Game.DEBUG = true;
Game.LOAD_SCREEN = 0;
Game.START_SCREEN = 1;
Game.LEVEL_SCREEN = 2;
Game.TITLE_SCREEN = 3;
let init = function () {
    const Asteroids = new Game(document.getElementById('canvas'));
};
window.addEventListener('load', init);
class ImageRepository {
    constructor(basePath, asset_names) {
        this.assets = {};
        this.loadingAssets = new Array();
        this.basePath = basePath;
        asset_names.forEach((name) => {
            this.startLoadingImage(name);
        });
    }
    isLoading() {
        return this.loadingAssets.length > 0;
    }
    getImage(key) {
        return this.assets[key];
    }
    startLoadingImage(name) {
        let imageElement = new Image();
        imageElement.addEventListener("load", (event) => {
            const key = this.generateKeyFromSrc(imageElement.src);
            this.assets[key] = imageElement;
            this.loadingAssets.splice(this.loadingAssets.indexOf(key), 1);
        });
        const src = this.generateURL(name);
        this.loadingAssets.push(this.generateKeyFromSrc(src));
        imageElement.src = src;
    }
    generateKeyFromSrc(src) {
        const start = this.basePath.substring(1);
        const index = src.indexOf(start) + start.length + 1;
        const key = src.substr(index, src.length - index - 4).split("/").join(".");
        return key;
    }
    generateURL(name) {
        return this.basePath + "/" + name;
    }
}
class KeyListener {
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
        return this.keyCodeStates[keyCode] == true;
    }
}
KeyListener.KEY_ESC = 27;
KeyListener.KEY_SPACE = 32;
KeyListener.KEY_LEFT = 37;
KeyListener.KEY_UP = 38;
KeyListener.KEY_RIGHT = 39;
KeyListener.KEY_DOWN = 40;
KeyListener.KEY_S = 83;
class MouseListener {
    constructor() {
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
        this.position = new Vector();
        this.inWindow = true;
        window.addEventListener("mousedown", this.mouseDown);
        window.addEventListener("mouseup", this.mouseUp);
        window.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseenter", this.mouseEnter);
        document.addEventListener("mouseleave", this.mouseLeave);
    }
}
class Ship extends GameItem {
    constructor() {
        super(...arguments);
        this._shooting = false;
        this._shots = [];
    }
    get shots() {
        return this._shots;
    }
    increaseAngularSpeed() {
        this._angularSpeed += Ship.ANGULAR_SPEED_INCREMENT;
        if (this._angularSpeed > Ship.ANGULAR_SPEED_MAX) {
            this._angularSpeed = Ship.ANGULAR_SPEED_MAX;
        }
    }
    decreaseAngularSpeed() {
        this._angularSpeed -= Ship.ANGULAR_SPEED_INCREMENT;
        if (this._angularSpeed < -Ship.ANGULAR_SPEED_MAX) {
            this._angularSpeed = -Ship.ANGULAR_SPEED_MAX;
        }
    }
    thrust() {
        const thrustVector = Vector.fromSizeAndAngle(0.1, this._angle);
        this._speed = this._speed.add(thrustVector);
    }
    retroBoost() {
        const thrustVector = Vector.fromSizeAndAngle(0.05, this._angle).scale(-1);
        this._speed = this._speed.add(thrustVector);
    }
    shoot(image) {
        if (!this._shooting && this.shots.length < 5) {
            this._shooting = true;
            const speed = Vector.fromSizeAndAngle(5, this._angle);
            const position = this._position.add(Vector.fromSizeAndAngle(-50, -this._angle));
            const shot = new Shot(image, position, speed, this._angle, 0, GameItem.OFFSCREEN_BEHAVIOUR_DIE);
            this._shots.push(shot);
        }
    }
    stopShooting() {
        this._shooting = false;
    }
    move(frameCount, maxX, maxY) {
        super.move(frameCount, maxX, maxY);
        for (let i = 0; i < this._shots.length; i++) {
            this._shots[i].move(frameCount, maxX, maxY);
            if (this._shots[i].isDead()) {
                this._shots.splice(i, 1);
            }
        }
    }
    draw(ctx) {
        for (let i = 0; i < this.shots.length; i++) {
            this._shots[i].draw(ctx);
        }
        super.draw(ctx);
    }
}
Ship.ANGULAR_SPEED_INCREMENT = 0.0004;
Ship.ANGULAR_SPEED_MAX = 0.02;
class Shot extends GameItem {
    drawCollisionBounds(ctx) {
        const y = -this._image.height / 2;
        const sp = this.shotPoint;
        ctx.moveTo(sp.x, sp.y);
        ctx.arc(sp.x, sp.y, 4, 0, 2 * Math.PI, false);
    }
    get shotPoint() {
        const diff = Vector.fromSizeAndAngle(-this._image.height / 2, this._angle).mirror_Y();
        return this._position.add(diff);
    }
    hits(item) {
        const distance = Math.abs(item.position.subtract(this._position).size);
        return distance < item.collisionRadius;
    }
}
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
}
//# sourceMappingURL=app.js.map