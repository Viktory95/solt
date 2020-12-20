/**
 * Created by Vi on 28.03.2020.
 */
import styles from './Album.css';
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import NewAlbum from './NewAlbum';
import AlbumToBlockActions from './AlbumToBlockActions';
import WordsView from "../word/WordsView";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class AlbumLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.name,
            languageNativeId: this.props.languageNativeId,
            languageTranslateId: this.props.languageTranslateId,
            languageNative: this.props.languageNative,
            languageTranslate: this.props.languageTranslate,
            blocks: this.props.blocks,
            showEditAlbumForm: false,
            hideComponent: false,
            isAdd: false,
            isDelete: false,
            showWords: false,
            hideWords: true
        };
    }

    handleClickAlbumEdit = () => {
        this.setState({
            showEditAlbumForm: true
        });
    }

    handleClickAddToBlock = () => {
        this.setState({
            isAdd: true
        });
    }

    handleClickDeleteFromBlock = () => {
        this.setState({
            isDelete: true
        });
    }

    handleClickAlbumDelete = () => {
        ipcRenderer.send(constants.DELETE_ALBUM, {id: this.state.id});
        this.setState({
            hideComponent: true
        });
    }

    handleClickShowWords = () => {
        this.setState({
            showWords: true,
            hideWords: false
        });
    }

    handleClickHideWords = () => {
        this.setState({
            showWords: false,
            hideWords: true
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
            showEditAlbumForm,
            hideComponent,
            isAdd,
            isDelete,
            showWords,
            hideWords
        } = this.state;

        let ipcBlocks = ipcRenderer.sendSync(constants.GET_ALL_BLOCKS);

        if (hideComponent) {
            return false;
        }

        if (showEditAlbumForm) {
            return <NewAlbum key={id}
                          id={id}
                          name={name}
                          languageNativeId={languageNativeId}
                          languageTranslateId={languageTranslateId}
                          languageNative={languageNative}
                          languageTranslate={languageTranslate}
                          blocks={blocks}
                          handler={this.props.handler}/>;
        }

        if (isAdd) {
            this.blockOptions = new Array();
            for (let blockNum = 0; blockNum < ipcBlocks.length; blockNum++) {
                if (!this.state.blocks.includes(ipcBlocks[blockNum].name)) {
                    this.blockOptions.push({
                        value: ipcBlocks[blockNum].id,
                        label: ipcBlocks[blockNum].name
                    });
                }
            }
            return <AlbumToBlockActions key={id}
                                     name={name}
                                     languageNativeId={languageNativeId}
                                     languageTranslateId={languageTranslateId}
                                     languageNative={languageNative}
                                     languageTranslate={languageTranslate}
                                     blocks={blocks}
                                     albumId={id}
                                     isAdd={true}
                                     blockOptions={this.blockOptions}
                                     handler={this.props.handler}/>;
        }

        if (isDelete) {
            this.blockOptions = new Array();
            for (let blockNum = 0; blockNum < ipcBlocks.length; blockNum++) {
                if (this.state.blocks.includes(ipcBlocks[blockNum].name)) {
                    this.blockOptions.push({
                        value: ipcBlocks[blockNum].id,
                        label: ipcBlocks[blockNum].name
                    });
                }
            }
            return <AlbumToBlockActions key={id}
                                     name={name}
                                     languageNativeId={languageNativeId}
                                     languageTranslateId={languageTranslateId}
                                     languageNative={languageNative}
                                     languageTranslate={languageTranslate}
                                     blocks={blocks}
                                     albumId={id}
                                     isAdd={false}
                                     blockOptions={this.blockOptions}
                                     handler={this.props.handler}/>;
        }

        return (
                <tr>
                    <td>{name}</td>
                    <td>{languageNative}</td>
                    <td>{languageTranslate}</td>
                    <td>{blocks}</td>
                    <td>
                        <button className="edit-album-button" id="album-edit"
                                onClick={this.handleClickAlbumEdit}>{localizationStrings.edit}</button>
                        <button className="add-to-block-button" id="add-to-block"
                                onClick={this.handleClickAddToBlock}>{localizationStrings.add_to_block}</button>
                        <button className="delete-from-block-button" id="delete-from-block"
                                onClick={this.handleClickDeleteFromBlock}>{localizationStrings.delete_from_block}</button>
                        <button className="delete-album-button" id="album-delete"
                                onClick={this.handleClickAlbumDelete}>{localizationStrings.delete}</button>
                        {hideWords && <button className="show-words-button" id="show-words"
                                onClick={this.handleClickShowWords}>{localizationStrings.show_words}</button>}
                        {showWords && <button className="hide-words-button" id="show-words"
                                onClick={this.handleClickHideWords}>{localizationStrings.hide_words}</button>}
                    </td>
                </tr> //TODO: show words
                // {<tr>}
                //     {{showWords}
                //     {&& <WordsView albumId={id}/>}}
                // {</tr>}
        );
    }
}

export default AlbumLine;