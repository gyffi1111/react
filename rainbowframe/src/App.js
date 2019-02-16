import React, {Component} from 'react';
import RainbowFrame from './components/RainbowFrame';
import ColorFrame from './components/ColorFrame';
import './App.css';

let colors = ['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

class App extends Component {
  render() {
    return (
        <div className="container">
            <RainbowFrame colors={colors}>
                <ColorFrame />
            </RainbowFrame>
        </div>
    );
  }
}

export default App;