import React, { Component } from 'react';

class Errors extends Component {
    render() {
        return (
            <span className="error">{this.props.message}</span>
        );
    }
}

export default Errors;