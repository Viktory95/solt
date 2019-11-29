/**
 * Created by Vi on 16.11.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../constants/constants';
import localizationStrings from '../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class AlbumToBlockAddition extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            albumId: '',
            blockId: ''
        };

        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);
        this.albums = new Array();
        for(let albumNum = 0; albumNum < ipcAlbums.length; albumNum++) {
            this.albums.push({
                value: ipcAlbums[albumNum].id, label: ipcAlbums[albumNum].name
            });
        }

        let ipcBlocks = ipcRenderer.sendSync(constants.GET_ALL_BLOCKS);
        this.blocks = new Array();
        for(let blockNum = 0; blockNum < ipcBlocks.length; blockNum++) {
            this.blocks.push({
                value: ipcBlocks[blockNum].id, label: ipcBlocks[blockNum].name
            });
        }
    }

    handleClickAddAlbumToBlock = () => {
            ipcRenderer.send(constants.ADD_ALBUM_TO_BLOCK, this.state);
    }

    updateSelectBlock = (evt) => {
        this.setState({
            blockId: evt.value
        });
    }

    updateSelectAlbum = (evt) => {
        this.setState({
            albumId: evt.value
        });
    }

    render() {
        return (
            <div>
                <h4>{localizationStrings.block}</h4>
                <Select options={this.blocks} onChange={evt => this.updateSelectBlock(evt)} />
                <h4>{localizationStrings.album}</h4>
                <Select options={this.albums} onChange={evt => this.updateSelectAlbum(evt)} />
                <button id="add-album-to-block-button" onClick={this.handleClickAddAlbumToBlock}>{localizationStrings.add_album_to_block}</button>
            </div>
        );
    }
}

export default AlbumToBlockAddition;