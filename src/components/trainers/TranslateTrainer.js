/**
 * Created by Vi on 04.01.2021.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class TranslateTrainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            albumId: props.words[0].albumId,
            words: props.words,
            wordId: props.words[0].id,
            wordNative: props.words[0].wordNative,
            wordTranslate: props.words[0].wordTranslate,
            choose1: '',
            choose2: '',
            choose3: '',
            choose4: '',
            choose5: '',
            choose6: '',
            isRight: false,
            isWrong: false
        };
    }

    handleClickNext = () => {
        let newWords = [];
        for (let idx = 0; idx < this.state.words.length; idx++) {
            if (this.state.words[idx].id != this.state.wordId) {
                newWords.push(this.state.words[idx]);
            }
        }
        this.setState({
            words: newWords
        });
    }

    handleClickChoice = (evt) => {
        console.log(evt.target.value);
        if (evt.target.value === this.state.wordTranslate) {
            ipcRenderer.send(constants.UPDATE_WORD_STATISTIC, {
                id: this.state.wordId,
                albumId: this.state.albumId,
                isSuccess: true
            });
            this.setState({
                isRight: true
            });
        } else {
            ipcRenderer.send(constants.UPDATE_WORD_STATISTIC, {
                id: this.state.wordId,
                albumId: this.state.albumId,
                isSuccess: false
            });
            this.setState({
                isWrong: true
            });
        }
    }

    createChoices = () => {
        if (this.state.words.length > 0) {
            let allWords = [];
            let wordsCount = 0;
            let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);
            ipcAlbums.forEach((ipcAlbum) => {
                let ipcWords = ipcRenderer.sendSync(constants.GET_WORDS_BY_ALBUM_ID, {albumId: ipcAlbum.id});
                ipcWords.forEach((ipcWord) => {
                    allWords.push(ipcWord);
                    wordsCount++;
                });
            });

            let maxChoicesCount = wordsCount < 4 ? wordsCount : 4;

            let passedIndexes = [];
            let choices = [];
            while (maxChoicesCount >= 0) {
                let idx = Math.floor(Math.random() * Math.floor(wordsCount));
                if (!passedIndexes.includes(idx)) {
                    passedIndexes.push(idx);
                    choices.push(allWords[idx].wordTranslate);
                    maxChoicesCount--;
                }
            }

            let order = Math.floor(Math.random() * Math.floor(6));
            console.log('choices.length');
            console.log(choices.length);
            console.log('order');
            console.log(order);

            let res = this.state.wordTranslate;
            console.log('res');
            console.log(res);

            this.setState({
                choose1: this.state.wordTranslate,
                choose2: this.state.wordTranslate,
                choose3: this.state.wordTranslate,
                choose4: this.state.wordTranslate,
                choose5: this.state.wordTranslate,
                choose6: this.state.wordTranslate
            });

            choices.push(<div>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose1}</button>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose2}</button>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose3}</button>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose4}</button>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose5}</button>
                <button className="choice-button"
                        onClick={this.handleClickChoice}>{this.state.choose6}</button>
            </div>);
            return choices;
        }
    }

    render() {
        const {
            wordNative,
            isRight,
            isWrong
        } = this.state;

        return (
            <div>
                <h1>{wordNative}</h1>
                {this.createChoices()}
                {isRight
                && <button className="right-next-button"
                           onClick={this.handleClickNext}>{localizationStrings.next}</button>}
                {isWrong
                && <button className="wrong-next-button"
                           onClick={this.handleClickNext}>{localizationStrings.next}</button>}
            </div>
        );
    }
}

export default TranslateTrainer;