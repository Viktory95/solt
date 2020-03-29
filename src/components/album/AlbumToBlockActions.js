/**
 * Created by Vi on 16.11.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import AlbumLine from "./AlbumLine";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class AlbumToBlockActions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.name ? props.name : '',
            languageNativeId: props.languageNativeId,
            languageTranslateId: props.languageTranslateId,
            languageNative: props.languageNative,
            languageTranslate: props.languageTranslate,
            blocks: props.blocks,
            albumId: props.albumId ? props.albumId : props.albumId == 0 ? 0 : -1,
            isAdd: props.isAdd,
            isSaved: false,
            handler: props.handler,
            blockId: '',
            blockName: '',
            blockOptions: []
        };

        let ipcBlocks = ipcRenderer.sendSync(constants.GET_ALL_BLOCKS);
        this.state.blockOptions = new Array();
        for (let blockNum = 0; blockNum < ipcBlocks.length; blockNum++) {
            if (this.state.isAdd && !this.state.blocks.includes(ipcBlocks[blockNum].name)) {
                this.state.blockOptions.push({
                    value: ipcBlocks[blockNum].id,
                    label: ipcBlocks[blockNum].name
                });
            } else if (!this.state.isAdd && this.state.blocks.includes(ipcBlocks[blockNum].name)) {
                this.state.blockOptions.push({
                    value: ipcBlocks[blockNum].id,
                    label: ipcBlocks[blockNum].name
                });
            }
        }
    }

    handleClickAddOrDeleteBlock = () => {
        if (this.state.isAdd) ipcRenderer.send(constants.ADD_ALBUM_TO_BLOCK, this.state);
        else ipcRenderer.send(constants.DELETE_ALBUM_FROM_BLOCK, this.state);
        this.setState({
            isSaved: true,
            blocks: this.state.isAdd ? this.state.blocks + this.state.blockName : this.state.blocks.replace(this.state.blockName, '')
        });
        this.props.handler(false);
    }

    handleClickCancel = () => {
        this.setState({
            isSaved: true
        });
    }

    updateSelectBlock = (evt) => {
        this.setState({
            blockId: evt.value,
            blockName: evt.label
        });
    }

    render() {
        const {
            albumId,
            name,
            languageNativeId,
            languageTranslateId,
            languageNative,
            languageTranslate,
            blocks,
            isAdd,
            isSaved,
            handler
        } = this.state;

        if (isSaved) return (<div>
            <AlbumLine key={albumId}
                       id={albumId}
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
                        <h4>{localizationStrings.block}</h4>
                    </td>
                    <td>
                        <Select options={this.blockOptions} onChange={evt => this.updateSelectBlock(evt)}/>
                    </td>
                    <td>
                        <button id="new-album-button"
                                onClick={this.handleClickAddOrDeleteBlock}>{localizationStrings.ok}</button>
                        <button id="cancel-button"
                                onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
                    </td>
                </tr>
            </div>
        );
    }
}

export default AlbumToBlockActions;