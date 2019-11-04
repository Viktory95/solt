/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
const ipcRenderer = window.electron.ipcRenderer;

const ADD_WORD = 'add-word';

class NewWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumId: '',
            wordNative: '',
            wordTranslate: '',
            image: '',
            description: ''
        };
    }

    handleClickCreateWord = () => {
        ipcRenderer.send(ADD_WORD, this.state);
    }

    updateInputWordAlbumId = (evt) => {
        this.setState({
            albumId: evt.target.value
        });
    }

    updateInputWordWordNative = (evt) => {
        this.setState({
            wordNative: evt.target.value
        });
    }

    updateInputWordWordTranslate = (evt) => {
        this.setState({
            wordTranslate: evt.target.value
        });
    }

    updateInputWordImage = (evt) => {
        this.setState({
            image: evt.target.value
        });
    }

    updateInputDescription = (evt) => {
        this.setState({
            description: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <h4>album name</h4>
                <input onChange={evt => this.updateInputWordAlbumId(evt)}/>
                <h4>word native</h4>
                <input onChange={evt => this.updateInputWordWordNative(evt)}/>
                <h4>word translate</h4>
                <input onChange={evt => this.updateInputWordWordTranslate(evt)}/>
                <h4>image</h4>
                <input onChange={evt => this.updateInputWordImage(evt)}/>
                <h4>description</h4>
                <input onChange={evt => this.updateInputDescription(evt)}/>
                <button id="new-word-button" onClick={this.handleClickCreateWord}>Add Word</button>
            </div>
        );
    }
}

export default NewWord;