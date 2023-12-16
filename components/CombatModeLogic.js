import React, { Component } from 'react';
import CombatModeBot from './CombatModeBot';

const CombatBot = new CombatModeBot();
class CombatModeLogic extends Component {
  // Create private variables in the constructor
  constructor() {
    super();
      let playerMove = "";
      let oppMove = "";
      let playerHealth = 100;
      let oppHealth = 100;
  }
  
  setPlayerMove(move) {
    playerMove = move;
    console.log("The players current move is " + playerMove);
  }

  setOppMove() {
    oppMove = CombatBot.generateRandomMove();
    console.log("The opponents current move is " + oppMove);
  }

  getOppMove() {
    return oppMove;
  }

  getPlayerMove() {
    return playerMove;
  }

  playerWon() {
    if (playerMove == "scissors" && oppMove == "paper" 
    || playerMove == "paper" && oppMove == "rock" 
    || playerMove == "rock" && oppMove == "scissors") {
      return true;
    }
    if (playerMove == "scissors" && oppMove == "rock" 
    || playerMove == "paper" && oppMove == "scissors" 
    || playerMove == "rock" && oppMove == "paper") {
    return false;
    }
    if (playerMove == oppMove) {
    return null;
    }
  }
  
  updateOppHealth() {
  
  }

  updateHealth() {
    if (this.playerWon() == true) {
      oppHealth-=25;
    }
    if (this.playerWon() == false) {
      playerHealth-=25;
    }
    if (this.playerWon() == 0) {
      console.log("It was a tie.");
    }
  }

  getFinalWinner() {
    // Implement the logic for determining the final winner here.
    return this.finalResult; // Placeholder, replace with actual logic
  }

  rewardsEarned() {
    // Implement the logic for calculating rewards here.
  }
}

export default CombatModeLogic;