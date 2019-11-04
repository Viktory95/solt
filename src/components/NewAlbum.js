/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
const ipcRenderer = window.electron.ipcRenderer;

const ADD_ALBUM = 'add-album';

class NewAlbum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            languageNative: '',
            languageTranslate: ''
        };
    }

    handleClickCreateAlbum = () => {
        ipcRenderer.send(ADD_ALBUM, this.state);
    }

    updateInputAlbumName = (evt) => {
        this.setState({
            name: evt.target.value
        });
    }

    updateInputAlbumLanguageNative = (evt) => {
        this.setState({
            languageNative: evt.target.value
        });
    }

    updateInputAlbumLanguageTranslate = (evt) => {
        this.setState({
            languageTranslate: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <h4>album name</h4>
                <input onChange={evt => this.updateInputAlbumName(evt)}/>
                <h4>album language native</h4>
                <input onChange={evt => this.updateInputAlbumLanguageNative(evt)}/>
                <h4>album language translate</h4>
                <input onChange={evt => this.updateInputAlbumLanguageTranslate(evt)}/>
                <button id="new-album-button" onClick={this.handleClickCreateAlbum}>Add Album</button>
            </div>
        );
    }
}

export default NewAlbum;