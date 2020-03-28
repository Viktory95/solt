/**
 * Created by Vi on 28.03.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import AlbumLine from './AlbumLine';
import NewAlbum from './NewAlbum';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class AlbumsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCrateFormShow: false
        };
    }

    handler = (isCrateFormShow) => {
        this.setState({
            isCrateFormShow: isCrateFormShow
        });
    }

    handleClickAlbumCreate = () => {
        this.setState({
            isCrateFormShow: true
        });
    }

    createTable = () => {
        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);

        let table = [];

        ipcAlbums.forEach((ipcAlbum) => {
            let ipcBlockAlbums = ipcRenderer.sendSync(constants.GET_BLOCK_ALBUM_BY_ALBUM_ID, {albumId: ipcAlbum.id});
            let blocks = '';

            ipcBlockAlbums.forEach((ipcBlockAlbum) => {
                let ipcBlock = ipcRenderer.sendSync(constants.GET_BLOCK_BY_ID, {id: ipcBlockAlbum.blockId});
                blocks += ipcBlock.name + "\n";
            });

            table.push(<tr>{<AlbumLine key={ipcAlbum.id}
                                       id={ipcAlbum.id}
                                       name={ipcAlbum.name}
                                       languageNative={ipcAlbum.languageNative}
                                       languageTranslate={ipcAlbum.languageTranslate}
                                       blocks={blocks}/>}</tr>);
        });
        return table;
    }

    render() {
        const {
            isCrateFormShow
        } = this.state;

        return (
            <div>
                <button className="create-block-button" id="block-edit"
                        onClick={this.handleClickAlbumCreate}>{localizationStrings.create}</button>
                {
                    <table>
                        <tr>
                            <th>{localizationStrings.album_name}</th>
                            <th>{localizationStrings.album_language_native}</th>
                            <th>{localizationStrings.album_language_translate}</th>
                            <th>{localizationStrings.block_name}</th>
                            <th>{localizationStrings.actions}</th>
                        </tr>
                        {this.createTable()}
                        {isCrateFormShow
                        && <NewAlbum handler={this.handler}/>}
                    </table>
                }
            </div>
        );
    }
}

export default AlbumsView;