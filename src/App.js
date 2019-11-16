import React from 'react';
import NewBlock from './components/NewBlock';
import NewAlbum from './components/NewAlbum';
import NewWord from './components/NewWord';
import AlbumToBlockAddition from './components/AlbumToBlockAddition';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const ipcRenderer = window.electron.ipcRenderer;

class App extends React.Component{

    constructor(){
        super();

        this.state = {
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false
        }
    }

    handleClickNewBlock = () => {
        this.setState({
            showNewBlockForm: true,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false
        });
    }

    handleClickNewAlbum = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: true,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false
        });
    }

    handleClickNewWord = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: true,
            showAlbumToBlockAdditionForm: false
        });
    }

    handleClickAlbumToBlockAddition = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: true
        });
    }

    render() {
        const { showNewBlockForm, showNewAlbumForm, showNewWordForm, showAlbumToBlockAdditionForm } = this.state;
        return (
            <div className="App">
                <button id="add-block" onClick={this.handleClickNewBlock}>Create Block</button>
                <button id="add-album" onClick={this.handleClickNewAlbum}>Create Album</button>
                <button id="add-word" onClick={this.handleClickNewWord}>Create Word</button>
                <button id="add-album-to-block" onClick={this.handleClickAlbumToBlockAddition}>Add Album to Block</button>

                {showNewBlockForm && <NewBlock />}
                {showNewAlbumForm && <NewAlbum />}
                {showNewWordForm && <NewWord />}
                {showAlbumToBlockAdditionForm && <AlbumToBlockAddition />}
            </div>
        );
    }
}

export default App;
