/**
 * Created by Vi on 17.11.2019.
 */
import styles from './Settings.css';
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class Settings extends React.Component {

    constructor(props) {
        super(props);

        let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
        this.state = {
            username: ipcSettings == null || ipcSettings.username == null ? '' : ipcSettings.username,
            userLanguage: ipcSettings == null || ipcSettings.userLanguage == null ? '' : ipcSettings.userLanguage
        };

        let ipcLanguages = ipcRenderer.sendSync(constants.GET_ALL_LANGUAGES);
        this.languages = new Array();
        for (let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }
    }

    handleClickSaveSettings = () => {
        ipcRenderer.send(constants.SET_SETTINGS, this.state);
        window.location.reload();
    }

    handleClickCancel = () => {
        window.location.reload();
    }

    updateSelectLanguage = (evt) => {
        this.setState({
            userLanguage: evt.value
        });
    }

    updateInputUsername = (evt) => {
        this.setState({
            username: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <h4>{localizationStrings.username}</h4>
                <input onChange={evt => this.updateInputUsername(evt)} value={ipcSettings.username}/>
                <h4>{localizationStrings.language}</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectLanguage(evt)}/>
                <button id="save-settings-button" onClick={this.handleClickSaveSettings}>{localizationStrings.save}</button>
                <button id="cancel-button" onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
            </div>
        );
    }
}

export default Settings;