/**
 * Created by Vi on 04.11.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import WordLine from "./WordLine";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class NewWord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id ? props.id : props.id == 0 ? 0 : -1,
            albumId: props.albumId ? props.albumId : props.albumId == 0 ? 0 : -1,
            wordNative: props.wordNative ? props.wordNative : '',
            wordTranslate: props.wordTranslate ? props.wordTranslate : '',
            image: props.image ? props.image : '',
            status: props.status ? props.status : '',
            description: props.description ? props.description : '',
            lastDate: props.lastDate ? props.lastDate : '',
            statistic: props.statistic ? props.statistic : '',
            isSaved: false,
            handler: props.handler
        };

        let ipcAlbums = ipcRenderer.sendSync(constants.GET_ALL_ALBUMS);
        this.albums = new Array();
        for (let albumNum = 0; albumNum < ipcAlbums.length; albumNum++) {
            this.albums.push({
                value: ipcAlbums[albumNum].id, label: ipcAlbums[albumNum].name
            });
        }

        if (props.albumId != null) {
            let currAlbum = '';
            for (let albumNum = 0; albumNum < this.albums.length; albumNum++) {
                if (this.albums[albumNum].value == props.albumId) {
                    currAlbum = this.albums[albumNum].label;
                    break;
                }
            }
            this.selectedAlbum = {
                value: props.albumId,
                label: currAlbum
            };
        }
    }

    handleClickCreateWord = () => {
        if (this.state.id == -1) {
            ipcRenderer.send(constants.ADD_WORD, this.state);
        } else {
            ipcRenderer.send(constants.UPDATE_WORD, this.state);
        }
        this.setState({
            isSaved: true
        });
        this.props.handler(false);
    }

    handleClickCancel = () => {
        this.setState({
            isSaved: true
        });
        this.props.handler(false);
    }

    updateInputWordWordNative = (evt) => {
        this.setState({
            wordNative: evt.target.value
        });
    }

    updateInputWordWordTranslate = (evt) => {
        this.setState({
            wordTranslate: evt.target.value
        });
    }

    updateInputWordImage = (evt) => {
        this.setState({
            image: evt.target.value
        });
    }

    updateInputDescription = (evt) => {
        this.setState({
            description: evt.target.value
        });
    }

    updateSelectAlbum = (evt) => {
        this.setState({
            album: evt.label,
            albumId: evt.value
        });
    }

    render() {
        const {
            id,
            albumId,
            wordNative,
            wordTranslate,
            image,
            status,
            description,
            lastDate,
            statistic,
            isSaved,
            handler
        } = this.state;

        if (isSaved) return (<WordLine key={id}
                      id={id}
                      albumId={albumId}
                      wordNative={wordNative}
                      wordTranslate={wordTranslate}
                      image={image}
                      status={status}
                      description={description}
                      lastDate={lastDate}
                      statistic={statistic}
                      handler={handler}/>);

        return (
            <tr>
                <td>
                    <input className="empty-input" value={wordNative} onChange={evt => this.updateInputWordWordNative(evt)}/>
                </td>
                <td>
                    <input className="empty-input" value={wordTranslate} onChange={evt => this.updateInputWordWordTranslate(evt)}/>
                </td>
                <td>
                    <input className="empty-input" value={image} onChange={evt => this.updateInputWordImage(evt)}/>
                </td>
                <td>
                    <input className="empty-input" value={description} onChange={evt => this.updateInputDescription(evt)}/>
                </td>
                <td>
                    <Select defaultValue={this.selectedAlbum} options={this.albums}
                            onChange={evt => this.updateSelectAlbum(evt)}/>
                </td>
                <td>
                    <button id="new-word-button"
                            onClick={this.handleClickCreateWord}>{localizationStrings.ok}</button>
                    <button id="cancel-button"
                            onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
                </td>
            </tr>
        );
    }
}

export default NewWord;