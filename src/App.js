import React from 'react';
import NewBlock from './components/NewBlock';
import NewAlbum from './components/NewAlbum';
import NewWord from './components/NewWord';
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
            showNewBlockForm: true,
            showNewAlbumForm: false,
            showNewWordForm: false
        })
    }

    handleClickNewAlbum = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: true,
            showNewWordForm: false
        })
    }

    handleClickNewWord = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
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
                {showNewAlbumForm && <NewAlbum />}
                {showNewWordForm && <NewWord />}
            </div>
        );
    }
}

export default App;
