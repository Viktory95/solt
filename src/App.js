import styles from './App.css';
import React from 'react';
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
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: false,
            showAllBlocks: false
        }
    }

    handleClickAlbumToBlockAddition = () => {
        this.setState({
            showAlbumToBlockAdditionForm: true,
            showSettingsForm: false,
            showAllBlocks: false
        });
    }

    handleClickSettingsUpdating = () => {
        this.setState({
            showAlbumToBlockAdditionForm: false,
            showSettingsForm: true,
            showAllBlocks: false
        });
    }

    handleClickBlocksView = () => {
        this.setState({
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
            showAlbumToBlockAdditionForm,
            showSettingsForm,
            showAllBlocks
        } = this.state;
        return (
            <div className="App">
                <button className="menu-button" id="add-album-to-block"
                        onClick={this.handleClickAlbumToBlockAddition}>{localizationStrings.add_album_to_block}
                </button>
                <button className="menu-button" id="update-settings"
                        onClick={this.handleClickSettingsUpdating}>{localizationStrings.settings}</button>
                <button className="menu-button" id="blocks-view"
                        onClick={this.handleClickBlocksView}>{localizationStrings.blocks_view}</button>

                {showAlbumToBlockAdditionForm && <AlbumToBlockAddition />}
                {showSettingsForm && <Settings />}
                {showAllBlocks && <BlocksView />}
                <div>
                    {!showAlbumToBlockAdditionForm
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
