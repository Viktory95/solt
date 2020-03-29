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
            id: props.id ? props.id : props.id == 0 ? 0 : -1,
            name: props.name ? props.name : '',
            languageNativeId: props.languageNativeId ? props.languageNativeId : '',
            languageTranslateId: props.languageTranslateId ? props.languageTranslateId : '',
            languageNative: props.languageNative ? props.languageNative : '',
            languageTranslate: props.languageTranslate ? props.languageTranslate : '',
            blocks: props.blocks ? props.blocks : '',
            isSaved: false,
            handler: props.handler
        };

        let ipcLanguages = ipcRenderer.sendSync(constants.GET_ALL_LANGUAGES);
        this.languages = new Array();
        for (let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }

        if (props.languageNativeId != null) {
            let currLanguageNative = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == props.languageNativeId) {
                    currLanguageNative = this.languages[tpNum].label;
                    break;
                }
            }
            this.selectedLanguageNative = {
                value: props.languageNativeId,
                label: currLanguageNative
            };
        }

        if (props.languageTranslateId != null) {
            let currLanguageTranslate = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == props.languageTranslateId) {
                    currLanguageTranslate = this.languages[tpNum].label;
                    break;
                }
            }
            this.selectedLanguageTranslate = {
                value: props.languageTranslateId,
                label: currLanguageTranslate
            };
        }
    }

    handleClickCreateOrUpdateAlbum = () => {
        if (this.state.languageNative !== this.state.languageTranslate) {
            if (this.state.id == -1) {
                ipcRenderer.send(constants.ADD_ALBUM, this.state);
            } else {
                ipcRenderer.send(constants.UPDATE_ALBUM, this.state);
            }
        } else {
            //TODO: make error message for users
            console.log('Languages can not be the same');
        }
        this.setState({
            isSaved: true
        });
        this.props.handler(false);
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
            languageNative: evt.label,
            languageNativeId: evt.value
        });
    }

    updateSelectAlbumLanguageTranslate = (evt) => {
        this.setState({
            languageTranslate: evt.label,
            languageTranslateId: evt.value
        });
    }

    render() {
        const {
            id,
            name,
            languageNativeId,
            languageTranslateId,
            languageNative,
            languageTranslate,
            blocks,
            isSaved,
            handler
        } = this.state;

        if (isSaved) return (<div>
            <AlbumLine key={id}
                       id={id}
                       name={name}
                       languageNativeId={languageNativeId}
                       languageTranslateId={languageTranslateId}
                       languageNative={languageNative}
                       languageTranslate={languageTranslate}
                       blocks={blocks}
                       handler={handler}/>
        </div>);

        return (
            <div>
                <tr>
                    <td>
                        <input value={name} onChange={evt => this.updateInputAlbumName(evt)}/>
                    </td>
                    <td>
                        <Select defaultValue={this.selectedLanguageNative} options={this.languages}
                                onChange={evt => this.updateSelectAlbumLanguageNative(evt)}/>
                    </td>
                    <td>
                        <Select defaultValue={this.selectedLanguageTranslate} options={this.languages}
                                onChange={evt => this.updateSelectAlbumLanguageTranslate(evt)}/>
                    </td>
                    <td>
                        <button id="new-album-button"
                                onClick={this.handleClickCreateOrUpdateAlbum}>{localizationStrings.ok}</button>
                        <button id="cancel-button"
                                onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
                    </td>
                </tr>
            </div>
        );
    }
}

export default NewAlbum;