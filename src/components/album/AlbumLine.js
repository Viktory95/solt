/**
 * Created by Vi on 28.03.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import NewAlbum from './NewAlbum';
import AlbumToBlockActions from './AlbumToBlockActions';

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
            isDelete: false
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
            isDelete
        } = this.state;

        if (hideComponent) {
            return false;
        }

        if (showEditAlbumForm) {
            return <div className="BlockLine">
                <NewAlbum key={id}
                          id={id}
                          name={name}
                          languageNativeId={languageNativeId}
                          languageTranslateId={languageTranslateId}
                          languageNative={languageNative}
                          languageTranslate={languageTranslate}
                          blocks={blocks}
                          handler={this.props.handler}/>
            </div>;
        }

        if (isAdd) {
            return <div className="BlockLine">
                <AlbumToBlockActions key={id}
                                     name={name}
                                     languageNativeId={languageNativeId}
                                     languageTranslateId={languageTranslateId}
                                     languageNative={languageNative}
                                     languageTranslate={languageTranslate}
                                     blocks={blocks}
                                     albumId={id}
                                     isAdd={isAdd}
                                     handler={this.props.handler}/>
            </div>;
        }

        if (isDelete) {
            return <div className="BlockLine">
                <AlbumToBlockActions key={id}
                                     name={name}
                                     languageNativeId={languageNativeId}
                                     languageTranslateId={languageTranslateId}
                                     languageNative={languageNative}
                                     languageTranslate={languageTranslate}
                                     blocks={blocks}
                                     albumId={id}
                                     isAdd={isDelete}
                                     handler={this.props.handler}/>
            </div>;
        }

        return (
            <div className="BlockLine">
                <td>{name}</td>
                <td>{languageNative}</td>
                <td>{languageTranslate}</td>
                <td>{blocks}</td>
                <td>
                    <button className="edit-block-button" id="block-edit"
                            onClick={this.handleClickAlbumEdit}>{localizationStrings.edit}</button>
                    <button className="visibility-block-button" id="block-visibility"
                            onClick={this.handleClickAddToBlock}>{localizationStrings.add_to_block}</button>
                    <button className="visibility-block-button" id="block-visibility"
                            onClick={this.handleClickDeleteFromBlock}>{localizationStrings.delete_from_block}</button>
                    <button className="delete-block-button" id="block-delete"
                            onClick={this.handleClickAlbumDelete}>{localizationStrings.delete}</button>
                </td>
            </div>
        );
    }
}

export default AlbumLine;