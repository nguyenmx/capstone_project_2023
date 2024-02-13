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
      let playerPower;
  }

  setPlayerPower(number){
    playerPower = number;
    console.log("power damage is: ", playerPower);
  }
  getPlayerPower(){
    return playerPower;
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


  playerPowerDamage(steps){
    console.log("The player's steps count is: " + steps);
    if (parseInt(steps)== 0 && steps == ""){
      this.setPlayerPower(3);
    }
    else if (parseInt(steps)> 0 && parseInt(steps) <= 3500){
      this.setPlayerPower(5);
    }
    else if (parseInt(steps)> 3500 && parseInt(steps) <= 5000){
      this.setPlayerPower(7);
    }
    else if (parseInt(steps)> 5000 && parseInt(steps) <= 12000){
      this.setPlayerPower(9);
    }
    else if (parseInt(steps)> 12000 && parseInt(steps) <= 19000){
      this.setPlayerPower(10);
    }
    else if (parseInt(steps) > 19000){
      this.setPlayerPower(15);
    }
    else{
      this.setPlayerPower(3);
    }
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