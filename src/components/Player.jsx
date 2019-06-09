import * as React from 'react';
import PropTypes from 'prop-types';

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: props.defaultEdit || false,
            nameValue: props.player.name
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.setState({
                nameValue: this.props.player.name
            })
        }
    }

    startEditing = () => {
        this.setState({ editing: true });
    }

    cancelEditing = () => {
        this.setState({
            editing: false,
            nameValue: this.props.player.name
        });
    }

    onNameChange = (e) => {
        this.setState({ nameValue: e.target.value });
    }

    updatePlayer = () => {
        this.setState({ editing: false });
        this.props.onNameChanged(this.props.player, this.state.nameValue);
    }

    render() {
        const { player } = this.props;
        const { nameValue } = this.state;

        if (this.state.editing) {
            return (
                <form className="d-flex align-items-center justify-content-between list-group-item">
                    <strong>({player.mark})</strong>
                    <div className="ml-3 input-group">
                        <input className="form-control" value={nameValue} onChange={this.onNameChange} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-dark btn-sm" type="submit"
                                onClick={this.updatePlayer}
                                disabled={!nameValue.length}>
                                Save
                            </button>
                            <button className="btn btn-outline-dark btn-sm"
                                onClick={this.cancelEditing}>
                                Cancel
                            </button>
                        </div>
                    </div>

                </form>
            );
        }

        return (
            <div className="d-flex align-items-center justify-content-between list-group-item">
                <strong>({player.mark})</strong>{player.name}
                <button className="btn btn-outline-dark btn-sm" onClick={this.startEditing}>Edit</button>
            </div>
        );
    }
}

Player.propTypes = {
    defaultEdit: PropTypes.bool.isRequired,
    player: PropTypes.object.isRequired,
    onNameChanged: PropTypes.func.isRequired
};