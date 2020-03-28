/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import AlbumLine from "./AlbumLine";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class NewAlbum extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id ? props.id : '',
            name: props.name ? props.name : '',
            languageNative: props.languageNative ? props.languageNative : '',
            languageTranslate: props.languageTranslate ? props.languageTranslate : '',
            blocks: props.blocks ? props.blocks : '',
            isSaved: false
        };

        let ipcLanguages = ipcRenderer.sendSync(constants.GET_ALL_LANGUAGES);
        this.languages = new Array();
        for (let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }

        if (props.languageNative != null) {
            let currLanguageNative = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == props.languageNative) {
                    currLanguageNative = this.languages[tpNum].label;
                    break;
                }
            }
            this.selectedLanguageNative = {
                value: props.languageNative,
                label: currLanguageNative
            };
        }

        if (props.languageTranslate != null) {
            let currLanguageTranslate = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == props.languageTranslate) {
                    currLanguageTranslate = this.languages[tpNum].label;
                    break;
                }
            }
            this.selectedLanguageTranslate = {
                value: props.languageTranslate,
                label: currLanguageTranslate
            };
        }
    }

    handleClickCreateOrUpdateAlbum = () => {
        if (this.state.languageNative !== this.state.languageTranslate) {
            if (this.state.id) {
                ipcRenderer.send(constants.UPDATE_ALBUM, this.state);
            } else {
                ipcRenderer.send(constants.ADD_ALBUM, this.state);
            }
            this.setState({
                isSaved: true
            });
            this.props.handler(false);
        } else {
            //TODO: make error message for users
            console.log('Languages can not be the same');
        }
    }

    handleClickCancel = () => {
        this.setState({
            isSaved: true
        });
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
        const {
            id,
            name,
            languageNative,
            languageTranslate,
            blocks,
            isSaved
        } = this.state;

        if (isSaved) return (<div>
            <AlbumLine key={id}
                       id={id}
                       name={name}
                       languageNative={languageNative}
                       languageTranslate={languageTranslate}/>
        </div>);

        return (
            <div>
                <h4>{localizationStrings.album_name}</h4>
                <input value={name} onChange={evt => this.updateInputAlbumName(evt)}/>
                <h4>{localizationStrings.album_language_native}</h4>
                <Select defaultValue={this.selectedLanguageNative} options={this.languages} onChange={evt => this.updateSelectAlbumLanguageNative(evt)}/>
                <h4>{localizationStrings.album_language_translate}</h4>
                <Select defaultValue={this.selectedLanguageTranslate} options={this.languages} onChange={evt => this.updateSelectAlbumLanguageTranslate(evt)}/>
                <button id="new-album-button"
                        onClick={this.handleClickCreateOrUpdateAlbum}>{localizationStrings.ok}</button>
                <button id="cancel-button" onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
            </div>
        );
    }
}

export default NewAlbum;