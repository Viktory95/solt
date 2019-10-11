import React from 'react';
import Block from './components/Block';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Block blockName="Block1"/>
                <Block blockName="Block2"/>
            </div>
        );
    }
}

export default App;
