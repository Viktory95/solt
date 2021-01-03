import styles from './App.css';
import React from 'react';
import Settings from './components/settings/Settings';
import Block from './components/block/Block';
import BlocksView from './components/block/BlocksView';
import AlbumsView from './components/album/AlbumsView';
import localizationStrings from './localozation/LocalizationStrings';
import constants from './constants/constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import WordsView from "./components/word/WordsView";

const ipcRenderer = window.electron.ipcRenderer;
const columnCount = 5;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            showMainBlocks: true,
            showSettingsForm: false,
            showAllBlocks: false,
            showAllAlbums: false,
            showAllWords: false
        }
    }

    handleClickShowMainBlocks = () => {
        this.setState({
            showMainBlocks: true,
            showSettingsForm: false,
            showAllBlocks: false,
            showAllAlbums: false,
            showAllWords: false
        });
    }

    handleClickSettingsUpdating = () => {
        this.setState({
            showMainBlocks: false,
            showSettingsForm: true,
            showAllBlocks: false,
            showAllAlbums: false,
            showAllWords: false
        });
    }

    handleClickBlocksView = () => {
        this.setState({
            showMainBlocks: false,
            showSettingsForm: false,
            showAllBlocks: true,
            showAllAlbums: false,
            showAllWords: false
        });
    }

    handleClickAlbumsView = () => {
        this.setState({
            showMainBlocks: false,
            showSettingsForm: false,
            showAllBlocks: false,
            showAllAlbums: true,
            showAllWords: false
        });
    }

    handleClickWordsView = () => {
        this.setState({
            showMainBlocks: false,
            showSettingsForm: false,
            showAllBlocks: false,
            showAllAlbums: false,
            showAllWords: true
        });
    }

    createTable = () => {

        let ipcBlocks = ipcRenderer.sendSync(constants.GET_BLOCK_IS_SHOW);

        let table = [];
        let children = [];
        let columnCounter = 0;
        let ipcBlocksCounter = 0;

        ipcBlocks.forEach((ipcBlock) => {
            children.push(<td>{<Block key={ipcBlock.id} blockName={ipcBlock.name} timePeriod={ipcBlock.timePeriod}
                                      isShow={ipcBlock.isShow}/>}</td>);
            columnCounter++;
            ipcBlocksCounter++;

            if (columnCounter > columnCount || ipcBlocksCounter == ipcBlocks.length) {
                columnCounter = 0;
                table.push(<tr>{children}</tr>);
                children = [];
            }
        });
        return table;
    }

    render() {
        const {
            showMainBlocks,
            showSettingsForm,
            showAllBlocks,
            showAllAlbums,
            showAllWords
        } = this.state;
        return (
            <div className="App">
                <button className="menu-button"
                        onClick={this.handleClickShowMainBlocks}>{localizationStrings.home}</button>
                <button className="menu-button" id="update-settings"
                        onClick={this.handleClickSettingsUpdating}>{localizationStrings.settings}</button>
                <button className="menu-button" id="blocks-view"
                        onClick={this.handleClickBlocksView}>{localizationStrings.blocks_view}</button>
                <button className="menu-button" id="albums-view"
                        onClick={this.handleClickAlbumsView}>{localizationStrings.albums_view}</button>
                <button className="menu-button" id="words-view"
                        onClick={this.handleClickWordsView}>{localizationStrings.words_view}</button>

                {showSettingsForm && <Settings />}
                {showAllBlocks && <BlocksView />}
                {showAllAlbums && <AlbumsView />}
                {showAllWords && <WordsView />}
                <div>
                    {showMainBlocks
                    && <table>
                            {this.createTable()}
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default App;
