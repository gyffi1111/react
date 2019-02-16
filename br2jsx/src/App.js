import React, { Component } from 'react';
import './App.css';
import Br2jsx from './components/Br2jsx';

let text="первый<br>второй<br/>третий<br />последний";

class App extends Component {
    render() {
        return (
            <div className="container">
                <Br2jsx text={text} />
            </div>
        );
    }
}

export default App;
