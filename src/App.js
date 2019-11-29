import React from 'react';
import NewBlock from './components/NewBlock';
import NewAlbum from './components/NewAlbum';
import NewWord from './components/NewWord';
import AlbumToBlockAddition from './components/AlbumToBlockAddition';
import Settings from './components/Settings';
import localizationStrings from './localozation/LocalizationStrings';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import constants from './constants/constants';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false
        }
    }

    handleClickNewBlock = () => {
        this.setState({
            showNewBlockForm: true,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false
        });
    }

    handleClickNewAlbum = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: true,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false
        });
    }

    handleClickNewWord = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: true,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false
        });
    }

    handleClickAlbumToBlockAddition = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: true,
            showSettingsForm: false
        });
    }

    handleClickSettingsUpdating = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: true
        });
    }

    render() {
        const {
            showNewBlockForm,
            showNewAlbumForm,
            showNewWordForm,
            showAlbumToBlockAdditionForm,
            showSettingsForm
        } = this.state;
        return (
            <div className="App">
                <button id="add-block" onClick={this.handleClickNewBlock}>{localizationStrings.create_block}</button>
                <button id="add-album" onClick={this.handleClickNewAlbum}>{localizationStrings.create_album}</button>
                <button id="add-word" onClick={this.handleClickNewWord}>{localizationStrings.create_word}</button>
                <button id="add-album-to-block"
                        onClick={this.handleClickAlbumToBlockAddition}>{localizationStrings.add_album_to_block}
                </button>
                <button id="update-settings"
                        onClick={this.handleClickSettingsUpdating}>{localizationStrings.settings}</button>

                {showNewBlockForm && <NewBlock />}
                {showNewAlbumForm && <NewAlbum />}
                {showNewWordForm && <NewWord />}
                {showAlbumToBlockAdditionForm && <AlbumToBlockAddition />}
                {showSettingsForm && <Settings />}
            </div>
        );
    }
}

export default App;
