/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

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

        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);
        this.albums = new Array();
        for(let albumNum = 0; albumNum < ipcAlbums.length; albumNum++) {
            this.albums.push({
                value: ipcAlbums[albumNum].id, label: ipcAlbums[albumNum].name
            });

        }
    }

    handleClickCreateWord = () => {
        ipcRenderer.send(constants.ADD_WORD, this.state);
    }

    handleClickCancel = () => {
        window.location.reload();
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
                <h4>{localizationStrings.album_name}</h4>
                <Select options={this.albums} onChange={evt => this.updateSelectWordAlbumId(evt)} />
                <h4>{localizationStrings.word_native}</h4>
                <input onChange={evt => this.updateInputWordWordNative(evt)}/>
                <h4>{localizationStrings.word_translate}</h4>
                <input onChange={evt => this.updateInputWordWordTranslate(evt)}/>
                <h4>{localizationStrings.image}</h4>
                <input onChange={evt => this.updateInputWordImage(evt)}/>
                <h4>{localizationStrings.description}</h4>
                <input onChange={evt => this.updateInputDescription(evt)}/>
                <button id="new-word-button" onClick={this.handleClickCreateWord}>{localizationStrings.ok}</button>
                <button id="cancel-button" onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
            </div>
        );
    }
}

export default NewWord;