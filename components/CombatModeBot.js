import React, { Component } from 'react';

class CombatModeBot extends Component {
  constructor() {
    super();
      let oppMove = "";
    }

    setOppMove() {
        oppMove == this.generateRandomMove();
    }

    generateRandomMove() {
        const moves = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * moves.length);
        oppMove = moves[randomIndex];
        return oppMove;
    }
}

export default CombatModeBot;