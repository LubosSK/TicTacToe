import * as React from 'react';
import PropTypes from 'prop-types';

export class BoardTile extends React.Component {
    timeOut;
    constructor(props) {
        super(props);
        this.state = {
            error: false
        };
    }
    componentWillUnmount() {
        clearInterval(this.timeOut);
    }

    onClicked = () => {
        const { value, onClicked, editable } = this.props;

        if (!editable) {
            return;
        }

        if (!value) {
            onClicked();
        }
        else {
            this.setState({ error: true });
            this.timeOut = setTimeout(() => this.setState({ error: false }), 2000);
        }
    };
    render() {
        const { value, victory } = this.props;
        let tileState = 'game-tile';
        if (victory) {
            tileState = 'game-tile bg-success';
        }
        else if (this.state.error) {
            tileState = 'game-tile bg-danger';
        }

        return (
            <div
                className={tileState}
                onClick={this.onClicked}>
                {value}
            </div>);
    }
}

BoardTile.propTypes = {
    onClicked: PropTypes.func.isRequired,
    victory: PropTypes.bool.isRequired,
    value:  PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired
};