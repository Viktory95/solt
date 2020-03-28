/**
 * Created by Vi on 28.03.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import NewAlbum from './NewAlbum';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class AlbumLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.name,
            languageNative: this.props.languageNative,
            languageTranslate: this.props.languageTranslate,
            blocks: this.props.blocks,
            showEditAlbumForm: false,
            hideComponent: false
        };
    }

    handleClickAlbumEdit = () => {
        this.setState({
            showEditAlbumForm: true
        });
    }

    handleClickAddToBlock = () => {

    }

    handleClickDeleteFromBlock = () => {

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
            languageNative,
            languageTranslate,
            blocks,
            showEditAlbumForm,
            hideComponent
        } = this.state;

        if (hideComponent === true) {
            return false;
        }

        if (showEditAlbumForm === true) {
            return <div className="BlockLine">
                <NewAlbum key={id}
                          id={id}
                          name={name}
                          languageNative={languageNative}
                          languageTranslate={languageTranslate}/>
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