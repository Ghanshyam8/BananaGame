class GameStats {
    constructor(initialScore = 0, initialAttempts = 5) {
      this.score = initialScore;
      this.attemptsLeft = initialAttempts;
    }
  
    // Getter for score
    getScore() {
      return this.score;
    }
  
    // Setter for score
    setScore(newScore) {
      this.score = newScore;
    }
  
    // Getter for attempts left
    getAttemptsLeft() {
      return this.attemptsLeft;
    }
  
    // Setter for attempts left
    setAttemptsLeft(newAttempts) {
      this.attemptsLeft = newAttempts;
    }
  }
  
  export default GameStats;
  