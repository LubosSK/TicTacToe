import * as React from 'react';
import { BoardTile } from './BoardTile'
import { checkVictory, checkDraw } from '../game-rules'
import PropTypes from 'prop-types';

const gameResults = {
    none: 0,        //running game
    victory: 1,     // game finished with victory
    draw: 2         // whole board filled withou victory
}

export default class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.emptyGameState(props.boardSize, props.startingPlayer);
    }

    componentDidUpdate(prevProps) {
        if (this.props.needRestart && !prevProps.needRestart) {
            this.restartGame();
        }
    }

    emptyGameState(boardSize, startingPlayer) {
        const gameBoard = Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => ({ ownerIndex: -1 })));

        return {
            gameResult: gameResults.none,
            gameBoard: gameBoard,
            currentPlayer: startingPlayer,
            winner: null
        };
    }

    tileClick = (row, col) => {
        const { gameBoard } = this.state;
        const updatedState = gameBoard.map((r, i) =>
            row !== i
                ? r
                : r.map((c, j) => j === col ? { ...c, ownerIndex: this.state.currentPlayer } : c)
        );

        const winnigTiles = checkVictory(updatedState);
        if (winnigTiles.length > 0) {
            winnigTiles.forEach(t => {
                updatedState[t.row][t.column] = {
                    ...updatedState[t.row][t.column],
                    victory: true
                };
            });

            const winner = updatedState[winnigTiles[0].row][winnigTiles[0].column].ownerIndex;
            this.setState({
                gameResult: gameResults.victory,
                gameBoard: updatedState,
                winner: winner
            });

            return;
        }

        if (checkDraw(updatedState)) {
            this.setState({
                gameResult: gameResults.draw,
                gameBoard: updatedState
            });

            return;
        }

        this.setState((s) => ({
            gameBoard: updatedState,
            currentPlayer: s.currentPlayer === 1 ? 0 : 1
        }));
    }

    restartGame = () => {
        this.setState(this.emptyGameState(this.props.boardSize, this.props.startingPlayer));
    }

    renderGameStatus() {
        const { players } = this.props;
        const { winner, gameResult, currentPlayer } = this.state;

        if (gameResult === gameResults.victory) {
            return (
                <p className="text-uppercase text-center">
                    game over
                    <br />
                    WINNER: {players[winner].name} (<strong>{players[currentPlayer].mark}</strong>)              
                </p>
            );
        }

        if (gameResult === gameResults.draw) {
            return (
                <p className="text-uppercase text-center">
                    game over
                    <br />
                    draw
                </p>
            );
        }

        return (
            <p className="text-center">
                Current turn: {players[currentPlayer].name} (<strong>{players[currentPlayer].mark}</strong>)
            </p>
        );
    }

    render() {
        const { players } = this.props;
        const { gameBoard, gameResult } = this.state;

        return (
            <React.Fragment>
                {this.renderGameStatus()}

                <div className='game-board'>
                    {gameBoard
                        .map((r, i) =>
                            <div key={i} className='game-board-row'>
                                {r.map((c, j) =>
                                    <BoardTile key={`${i}_${j}`}
                                        editable={gameResult === gameResults.none}
                                        value={c.ownerIndex > -1 ? players[c.ownerIndex].mark : null}
                                        victory={c.victory}
                                        onClicked={() => this.tileClick(i, j)}
                                    />
                                )}
                            </div>
                        )}
                </div>
            </React.Fragment>
        );
    }
}

TicTacToe.propTypes = {
    boardSize: PropTypes.number.isRequired,
    players: PropTypes.array.isRequired,
    startingPlayer: PropTypes.number.isRequired,
    needRestart: PropTypes.bool
};