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
            isCrateWordFormShow: false,
            albumId: props.albumId
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
        let ipcWords = ipcRenderer.sendSync(constants.GET_WORDS_BY_ALBUM_ID, {albumId: this.state.albumId});
        let table = [];
        ipcWords.forEach((ipcWord) => {
            table.push(<tr>{<WordLine key={ipcWord.id}
                                      id={ipcWord.id}
                                      albumId={ipcWord.albumId}
                                      wordNative={ipcWord.wordNative}
                                      wordTranslate={ipcWord.wordTranslate}
                                      image={ipcWord.image}
                                      status={ipcWord.status}
                                      description={ipcWord.description}
                                      lastDate={ipcWord.lastDate}
                                      statistic={ipcWord.statistic}/>}</tr>);
        });
        return table;
    }

    render() {
        const {
            isCrateWordFormShow,
            albumId
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
                        </tr>
                        {isCrateWordFormShow
                        && <NewWord handler={this.handler}
                                    albumId={albumId}/>}
                        {this.createTable()}
                    </table>
                }
            </div>
        );
    }
}

export default WordsView;