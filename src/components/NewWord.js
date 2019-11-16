/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
import Select from "react-select";
const ipcRenderer = window.electron.ipcRenderer;

const ADD_WORD = 'add-word';
const GET_ALL_ALBUMS = 'get-all-albums';

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

        let ipcAlbums = ipcRenderer.sendSync(GET_ALL_ALBUMS);
        this.albums = new Array();
        for(let albumNum = 0; albumNum < ipcAlbums.length; albumNum++) {
            this.albums.push({
                value: ipcAlbums[albumNum].id, label: ipcAlbums[albumNum].name
            });

        }
    }

    handleClickCreateWord = () => {
        ipcRenderer.send(ADD_WORD, this.state);
    }

    updateSelectWordAlbumId = (evt) => {
        this.setState({
            albumId: evt.value
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
                <Select options={this.albums} onChange={evt => this.updateSelectWordAlbumId(evt)} />
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