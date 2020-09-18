/**
 * Created by Vi on 19.09.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class WordLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            albumId: this.props.albumId,
            wordNative: this.props.wordNative,
            wordTranslate: this.props.wordTranslate,
            image: this.props.image,
            status: this.props.status,
            description: this.props.description,
            lastDate: this.props.lastDate,
            statistic: this.props.statistic
        };
    }

    render() {
        const {
            id,
            albumId,
            wordNative,
            wordTranslate,
            image,
            status,
            description,
            lastDate,
            statistic
        } = this.state;
        return (
            <div className="WordLine">
                <td>{wordNative}</td>
                <td>{wordTranslate}</td>
                <td>{image}</td>
                <td>{status}</td>
                <td>{description}</td>
                <td>{lastDate}</td>
                <td>{statistic}</td>
            </div>
        );
    }
}

export default WordLine;