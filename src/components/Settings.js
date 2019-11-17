/**
 * Created by Vi on 17.11.2019.
 */
import React from 'react';
import Select from "react-select";
const ipcRenderer = window.electron.ipcRenderer;

const SET_SETTINGS = 'set-settings';
const GET_SETTINGS = 'get-settings';
const GET_ALL_LANGUAGES = 'get-all-languages';

class Settings extends React.Component {

    constructor(props) {
        super(props);

        let ipcSettings = ipcRenderer.sendSync(GET_SETTINGS);
        this.state = {
            username: ipcSettings == null || ipcSettings.username == null ? '' : ipcSettings.username,
            userLanguage: ipcSettings == null || ipcSettings.userLanguage == null ? '' : ipcSettings.userLanguage
        };

        let ipcLanguages = ipcRenderer.sendSync(GET_ALL_LANGUAGES);
        this.languages = new Array();
        for(let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }
    }

    handleClickSaveSettings = () => {
        ipcRenderer.send(SET_SETTINGS, this.state);
    }

    updateSelectLanguage = (evt) => {
        this.setState({
            albumId: evt.value
        });
    }

    updateInputUsername = (evt) => {
        this.setState({
            description: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <h4>username</h4>
                <input onChange={evt => this.updateInputUsername(evt)}/>
                <h4>language</h4>
                <Select options={this.languages} onChange={evt => this.updateSelectLanguage(evt)} />
                <button id="save-settings-button" onClick={this.handleClickSaveSettings}>Save</button>
            </div>
        );
    }
}

export default Settings;