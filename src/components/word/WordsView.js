/**
 * Created by Vi on 19.09.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import WordLine from './WordLine';
import NewWord from "./NewWord";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class WordsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCrateWordFormShow: false
        };
    }

    handler = (isCrateFormShow) => {
        this.setState({
            isCrateWordFormShow: isCrateFormShow
        });
    }

    handleClickWordCreate = () => {
        this.setState({
            isCrateWordFormShow: true
        });
    }

    createTable = () => {
        let table = [];
        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);
        ipcAlbums.forEach((ipcAlbum) => {
            let ipcWords = ipcRenderer.sendSync(constants.GET_WORDS_BY_ALBUM_ID, {albumId: ipcAlbum.id});
            ipcWords.forEach((ipcWord) => {
                table.push(<WordLine key={ipcWord.id}
                                          id={ipcWord.id}
                                          albumId={ipcWord.albumId}
                                          wordNative={ipcWord.wordNative}
                                          wordTranslate={ipcWord.wordTranslate}
                                          image={ipcWord.image}
                                          status={ipcWord.status}
                                          description={ipcWord.description}
                                          lastDate={ipcWord.lastDate}
                                          statistic={ipcWord.statistic}
                                          handler={this.handler}/>);
            });
        });
        return table;
    }

    render() {
        const {
            isCrateWordFormShow
        } = this.state;

        return (
            <div>
                <button className="create-word-button" id="word-edit"
                        onClick={this.handleClickWordCreate}>{localizationStrings.create}</button>
                {
                    <table>
                        <tr>
                            <th>{localizationStrings.word_native}</th>
                            <th>{localizationStrings.word_translate}</th>
                            <th>{localizationStrings.image}</th>
                            <th>{localizationStrings.description}</th>
                            <th>{localizationStrings.album}</th>
                            <th>{localizationStrings.actions}</th>
                        </tr>
                        {isCrateWordFormShow
                        && <NewWord handler={this.handler}/>}
                        {this.createTable()}
                    </table>
                }
            </div>
        );
    }
}

export default WordsView;