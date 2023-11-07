import React from 'react';
export class CombatModeLogic {
    // constructor() {
    //   this.currentTurn = false;
    //   this.roundCount = 0;
    //   this.finalResult = false;
    //   this.potentialMoves = ["rock", "paper", "scissors"];
    //   this.playerMove = "";
    // }

    playerMove = "";
  
    setMove(move) {
        this.playerMove = move;
    }

    handlePaperPress = () => {
      this.setMove("paper");
      console.log("set to paper.");
    };
  
    handleRockClick = () => {
      this.setMove("rock");
      console.log("set to rock.");
    };
  
    handleScissorClick = () => {
      this.setMove("scissor");
      console.log("set to scissors.");
    };
  
    updateOppHealth() {
      //Update the opponents health after they've received a hit from the player.
    }
  
    updatePlayerHealth() {
      //Update the players health after they've received a hit from the player.
    }
  
    getW() {
    
      return true; 
    }
  
    getL() {
    
      return false;
    }
  
    getFinalWinner() {
      // Implement the logic for determining the final winner here.
      return this.finalResult; // Placeholder, replace with actual logic
    }
  
    rewardsEarned() {
      // Implement the logic for calculating rewards here.
    }
  }