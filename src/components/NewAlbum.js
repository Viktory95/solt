/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
import Select from "react-select";
const ipcRenderer = window.electron.ipcRenderer;

const ADD_ALBUM = 'add-album';
const GET_ALL_LANGUAGES = 'get-all-languages';

class NewAlbum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            languageNative: '',
            languageTranslate: ''
        };

        let ipcLanguages = ipcRenderer.sendSync(GET_ALL_LANGUAGES);
        this.languages = new Array();
        for(let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }
    }

    handleClickCreateAlbum = () => {
        if(this.state.languageNative !== this.state.languageTranslate) {
            ipcRenderer.send(ADD_ALBUM, this.state);
        } else {
            //TODO: make error message for users
            console.log('Languages can not be the same');
        }
    }

    updateInputAlbumName = (evt) => {
        this.setState({
            name: evt.target.value
        });
    }

    updateSelectAlbumLanguageNative = (evt) => {
        this.setState({
            languageNative: evt.value
        });
    }

    updateSelectAlbumLanguageTranslate = (evt) => {
        this.setState({
            languageTranslate: evt.value
        });
    }

    render() {
        return (
            <div>
                <h4>album name</h4>
                <input onChange={evt => this.updateInputAlbumName(evt)}/>
                <h4>album language native</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectAlbumLanguageNative(evt)} />
                <h4>album language translate</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectAlbumLanguageTranslate(evt)} />
                <button id="new-album-button" onClick={this.handleClickCreateAlbum}>Add Album</button>
            </div>
        );
    }
}

export default NewAlbum;