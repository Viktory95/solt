import styles from './App.css';
import React from 'react';
import NewBlock from './components/block/NewBlock';
import NewAlbum from './components/album/NewAlbum';
import NewWord from './components/word/NewWord';
import AlbumToBlockAddition from './components/album/AlbumToBlockAddition';
import Settings from './components/settings/Settings';
import Block from './components/block/Block';
import BlocksView from './components/block/BlocksView';
import localizationStrings from './localozation/LocalizationStrings';
import constants from './constants/constants';
import 'bootstrap/dist/css/bootstrap.min.css';

const ipcRenderer = window.electron.ipcRenderer;
const columnCount = 5;
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
            showSettingsForm: false,
            showAllBlocks: false
        }
    }

    handleClickNewBlock = () => {
        this.setState({
            showNewBlockForm: true,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false,
            showAllBlocks: false
        });
    }

    handleClickNewAlbum = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: true,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false,
            showAllBlocks: false
        });
    }

    handleClickNewWord = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: true,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false,
            showAllBlocks: false
        });
    }

    handleClickAlbumToBlockAddition = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: true,
            showSettingsForm: false,
            showAllBlocks: false
        });
    }

    handleClickSettingsUpdating = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: true,
            showAllBlocks: false
        });
    }

    handleClickBlocksView = () => {
        this.setState({
            showNewBlockForm: false,
            showNewAlbumForm: false,
            showNewWordForm: false,
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false,
            showAllBlocks: true
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
            showNewBlockForm,
            showNewAlbumForm,
            showNewWordForm,
            showAlbumToBlockAdditionForm,
            showSettingsForm,
            showAllBlocks
        } = this.state;
        return (
            <div className="App">
                <button className="menu-button" id="add-block"
                        onClick={this.handleClickNewBlock}>{localizationStrings.create_block}</button>
                <button className="menu-button" id="add-album"
                        onClick={this.handleClickNewAlbum}>{localizationStrings.create_album}</button>
                <button className="menu-button" id="add-word"
                        onClick={this.handleClickNewWord}>{localizationStrings.create_word}</button>
                <button className="menu-button" id="add-album-to-block"
                        onClick={this.handleClickAlbumToBlockAddition}>{localizationStrings.add_album_to_block}
                </button>
                <button className="menu-button" id="update-settings"
                        onClick={this.handleClickSettingsUpdating}>{localizationStrings.settings}</button>
                <button className="menu-button" id="blocks-view"
                        onClick={this.handleClickBlocksView}>{localizationStrings.blocks_view}</button>

                {showNewBlockForm && <NewBlock />}
                {showNewAlbumForm && <NewAlbum />}
                {showNewWordForm && <NewWord />}
                {showAlbumToBlockAdditionForm && <AlbumToBlockAddition />}
                {showSettingsForm && <Settings />}
                {showAllBlocks && <BlocksView />}
                <div>
                    {!showNewBlockForm
                    && !showNewAlbumForm
                    && !showNewWordForm
                    && !showAlbumToBlockAdditionForm
                    && !showSettingsForm
                    && !showAllBlocks
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
