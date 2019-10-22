import React from 'react';
import NewBlock from './components/NewBlock';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

class App extends React.Component{

    constructor(){
        super();

        this.state = {
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false
        }
    }

    handleClickNewBlock = () => {
        this.setState({
            showNewBlockForm: true
        })
    }

    handleClickNewAlbum = () => {
        this.setState({
            showNewAlbumForm: true
        })
    }

    handleClickNewWord = () => {
        this.setState({
            showNewWordForm: true
        })
    }

    render() {
        const { showNewBlockForm, showNewAlbumForm, showNewWordForm } = this.state;
        return (
            <div className="App">
                <button id="add-block" onClick={this.handleClickNewBlock}>Create Block</button>
                <button id="add-album" onClick={this.handleClickNewAlbum}>Create Album</button>
                <button id="add-word" onClick={this.handleClickNewWord}>Create Word</button>

                {showNewBlockForm && <NewBlock />}
            </div>
        );
    }
}

export default App;
