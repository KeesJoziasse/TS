/// <reference path="GameItem.ts"/>

class Asteroid extends GameItem {

    public static readonly IMAGE_URLS: Array<string> = [
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

    public static readonly BIG_ASTEROIDS: string[] = [
        "PNG.Meteors.meteorBrown_big1",
        "PNG.Meteors.meteorBrown_big2",
        "PNG.Meteors.meteorBrown_big3",
        "PNG.Meteors.meteorBrown_big4",
    ];

    public static readonly MEDIUM_ASTEROIDS: string[] = [
        "PNG.Meteors.meteorBrown_med1",
        "PNG.Meteors.meteorBrown_med3",
    ];

    public static readonly SMALL_ASTEROIDS: string[] = [
        "PNG.Meteors.meteorBrown_small1",
        "PNG.Meteors.meteorBrown_small2",
    ];

    public static readonly TINY_ASTEROIDS: string[] = [
        "PNG.Meteors.meteorBrown_tiny1",
        "PNG.Meteors.meteorBrown_tiny2",
    ];

    public static readonly TYPE_BIG    = 3;
    public static readonly TYPE_MEDIUM = 2;
    public static readonly TYPE_SMALL  = 1;
    public static readonly TYPE_TINY   = 0;

    public static getRandomImageName(type: number) : string {
        return "";
    }

    
}