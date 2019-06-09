import React from 'react';
import TicTacToe from './TicTacToe';
import Player from './Player';

class MainGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            needRestart: false,
            gameRunning: false,
            players: [
                { id: 0, name: '', mark: 'X' },
                { id: 1, name: '', mark: 'O' }
            ],
            secondBoard: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.needRestart !== this.state.needRestart) && this.state.needRestart) {
            this.setState({ needRestart: false });
        }
    }

    twoBoardsChanged = ({ target: { checked } }) => {
        this.setState({
            secondBoard: checked
        });
    }

    changePlayer = ({ id }, name) => {
        const players = this.state.players.map(p => p.id === id ? { ...p, name } : p);
        this.setState({ players: players });
    }

    forceRestart = () => {
        this.setState({ needRestart: true });
    }

    startGame = () => {
        this.setState({ gameRunning: true });
    }

    stopGame = () => {
        this.setState({
            gameRunning: false
        });
    }

    renderRunningGame() {
        return <React.Fragment>
            <div className='row justify-content-center'>
                <div className='my-5 col-md-6 text-left'>
                    <button className="mr-3 btn btn-primary" onClick={this.forceRestart}>Restart</button>
                    <button className="btn btn-danger" onClick={this.stopGame}>Stop current game</button>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-sm-6'>
                    <TicTacToe boardSize={3} players={this.state.players}
                        startingPlayer={0} needRestart={this.state.needRestart} />
                </div>
                {this.state.secondBoard
                    ? <div className='col-sm-6'>
                        <TicTacToe boardSize={3} players={this.state.players}
                            startingPlayer={1} needRestart={this.state.needRestart} />
                    </div>
                    : null}
            </div>
        </React.Fragment>;
    }

    render() {
        const validPlayers = this.state.players.every(p => p.name.length > 0);
        return (
            <div className="container">


                <div className='row'>
                    <div className='offset-sm-3 col-sm-6 text-center'>
                        <ul className="list-group list-group-flush">
                            {
                                this.state.players.map((p, i) =>
                                    <Player key={i}
                                        defaultEdit={p.name.length === 0}
                                        player={p}
                                        onNameChanged={this.changePlayer}
                                    />)
                            }
                        </ul>
                    </div>
                </div>

                {this.state.gameRunning
                    ? this.renderRunningGame()
                    : <div className='row justify-content-center'>
                        {!validPlayers
                            ? <div className="col-sm-6">
                                <p className="alert alert-info text-center">Both players must have name</p>
                            </div>
                            : null}

                        <div className="col-sm-12 text-center">
                            <input id='multiple-boards' type='checkbox' onChange={this.twoBoardsChanged} checked={this.state.secondBoard} />
                            <label htmlFor='multiple-boards'>Two boards</label>
                        </div>

                        <button className="btn btn-success" onClick={this.startGame} disabled={!validPlayers}>
                            Start
                        </button>
                    </div>}



            </div >
        );
    }
}

export default MainGame;