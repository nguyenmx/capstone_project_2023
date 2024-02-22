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
      let oppPower;
  }

  setPlayerPower(number){
    playerPower = number;
    console.log("power damage is for player: ", playerPower);
  }
  getPlayerPower(){
    return playerPower;
  }

  setOppPower(number){
    oppPower = number;
    console.log("power damage is for opp: ", oppPower);
  }
  getOppPower(){
    return oppPower;
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
      this.setPlayerPower(12);
    }
    else if (parseInt(steps)> 0 && parseInt(steps) <= 3500){
      this.setPlayerPower(14);
    }
    else if (parseInt(steps)> 3500 && parseInt(steps) <= 5000){
      this.setPlayerPower(16);
    }
    else if (parseInt(steps)> 5000 && parseInt(steps) <= 12000){
      this.setPlayerPower(19);
    }
    else if (parseInt(steps)> 12000 && parseInt(steps) <= 19000){
      this.setPlayerPower(20);
    }
    else if (parseInt(steps) > 19000){
      this.setPlayerPower(22);
    }
    else{
      this.setPlayerPower(12);
    }
  }


  oppPowerDamage(steps){
    console.log("The opp's steps count is: " + steps);
    if (parseInt(steps)== 0 && steps == ""){
      this.setOppPower(10);
    }
    else if (parseInt(steps)> 0 && parseInt(steps) <= 3500){
      this.setOppPower(12);
    }
    else if (parseInt(steps)> 3500 && parseInt(steps) <= 5000){
      this.setOppPower(14);
    }
    else if (parseInt(steps)> 5000 && parseInt(steps) <= 12000){
      this.setOppPower(17);
    }
    else if (parseInt(steps)> 12000 && parseInt(steps) <= 19000){
      this.setOppPower(18);
    }
    else if (parseInt(steps) > 19000){
      this.setOppPower(20);
    }
    else{
      this.setOppPower(10);
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