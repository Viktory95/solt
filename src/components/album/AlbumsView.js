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

        let ipcLanguages = ipcRenderer.sendSync(constants.GET_ALL_LANGUAGES);
        this.languages = new Array();
        for (let languageNum = 0; languageNum < ipcLanguages.length; languageNum++) {
            this.languages.push({
                value: ipcLanguages[languageNum].id, label: ipcLanguages[languageNum].name
            });

        }

        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);

        let table = [];

        ipcAlbums.forEach((ipcAlbum) => {
            let ipcBlockAlbums = ipcRenderer.sendSync(constants.GET_BLOCK_ALBUM_BY_ALBUM_ID, {albumId: ipcAlbum.id});
            let blocks = '';

            ipcBlockAlbums.forEach((ipcBlockAlbum) => {
                let ipcBlock = ipcRenderer.sendSync(constants.GET_BLOCK_BY_ID, {id: ipcBlockAlbum.blockId});
                if (ipcBlock != null) blocks += ipcBlock.name + "\n";
            });

            let currLanguageNative = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == ipcAlbum.languageNative) {
                    currLanguageNative = this.languages[tpNum].label;
                    break;
                }
            }

            let currLanguageTranslate = '';
            for (let tpNum = 0; tpNum < this.languages.length; tpNum++) {
                if (this.languages[tpNum].value == ipcAlbum.languageTranslate) {
                    currLanguageTranslate = this.languages[tpNum].label;
                    break;
                }
            }

            table.push(<AlbumLine key={ipcAlbum.id}
                                       id={ipcAlbum.id}
                                       name={ipcAlbum.name}
                                       languageNativeId={ipcAlbum.languageNative}
                                       languageTranslateId={ipcAlbum.languageTranslate}
                                       languageNative={currLanguageNative}
                                       languageTranslate={currLanguageTranslate}
                                       blocks={blocks}
                                       handler={this.handler}/>);
        });
        return table;
    }

    render() {
        const {
            isCrateFormShow
        } = this.state;

        return (
            <div>
                <button className="create-album-button" id="album-edit"
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
                        {isCrateFormShow
                        && <NewAlbum handler={this.handler}/>}
                        {this.createTable()}
                    </table>
                }
            </div>
        );
    }
}

export default AlbumsView;