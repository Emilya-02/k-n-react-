import React from 'react';

import Square from './square.js';
import calculateWinner from './calculateWinner.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      score: Array(2).fill(0),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return <Square 
      value={this.state.squares[i]} 
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      this.state.squares = Array(9).fill(null);
      if (this.state.xIsNext === true) {
        this.state.score[1] = this.state.score[1] + 1;
      }
      else {
        this.state.score[0] = this.state.score[0] + 1;
      };
      status = 'Победитель: ' + winner + ' Следующий игрок ходит первым : X';
      this.state.xIsNext = true;
    } else {
      status = 'Следующий игрок: ' + (this.state.xIsNext ? 'X' : 'O');
    };
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className='game-score'>
          <div className='game-score-1'>{this.state.score[0]}</div>
          <p>:</p>
          <div className='game-score-2'>{this.state.score[1]}</div>
        </div>
      </div>
    );
  }
}

export default Board;
