/**
 * Class that hods all the scores.
 */
class Scores {
    
    // Some global player attributes
    public readonly player: string;
    public readonly score: number;

    public readonly highscores: Array<any>; // TODO: do not use 'any': write an interface!

    public constructor() {
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
        ]
    }

    /**
     * Adds a new score to the highscores table
     * 
     * @param player name of the player
     * @param score the last score of this player
     */
    public addScore(player: string, score: number) {
        // TODO order it nicely, so the highest score is on top
        this.highscores.push({
            playerName: player,
            score: score
        });
    }
    
}