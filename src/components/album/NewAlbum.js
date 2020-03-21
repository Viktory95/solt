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

class NewAlbum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            languageNative: '',
            languageTranslate: ''
        };

        let ipcLanguages = ipcRenderer.sendSync(constants.GET_ALL_LANGUAGES);
        this.languages = new Array();
        for (let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }
    }

    handleClickCreateAlbum = () => {
        if (this.state.languageNative !== this.state.languageTranslate) {
            ipcRenderer.send(constants.ADD_ALBUM, this.state);
        } else {
            //TODO: make error message for users
            console.log('Languages can not be the same');
        }
    }

    handleClickCancel = () => {
        window.location.reload();
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
                <h4>{localizationStrings.album_name}</h4>
                <input onChange={evt => this.updateInputAlbumName(evt)}/>
                <h4>{localizationStrings.album_language_native}</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectAlbumLanguageNative(evt)}/>
                <h4>{localizationStrings.album_language_translate}</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectAlbumLanguageTranslate(evt)}/>
                <button id="new-album-button"
                        onClick={this.handleClickCreateAlbum}>{localizationStrings.ok}</button>
                <button id="cancel-button" onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
            </div>
        );
    }
}

export default NewAlbum;