/**
 * Created by Vi on 19.09.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import NewWord from "./NewWord";

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class WordLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            albumId: this.props.albumId,
            wordNative: this.props.wordNative,
            wordTranslate: this.props.wordTranslate,
            image: this.props.image,
            status: this.props.status,
            description: this.props.description,
            lastDate: this.props.lastDate,
            statistic: this.props.statistic,
            showEditWordForm: false,
            isDeleted: false
        };
    }

    handleClickWordEdit = () => {
        this.setState({
            showEditWordForm: true
        });
    }

    handleClickWordDelete = () => {
        ipcRenderer.send(constants.DELETE_WORD, this.state);
        this.setState({
            isDeleted: true
        });
    }

    render() {
        const {
            id,
            albumId,
            wordNative,
            wordTranslate,
            image,
            description,
            showEditWordForm,
            isDeleted
        } = this.state;

        if (isDeleted) {
            return false;
        }

        if (showEditWordForm) {
            return <div className="AlbumLine">
                <NewWord key={id}
                         id={id}
                albumId={albumId}
                wordNative={wordNative}
                wordTranslate={wordTranslate}
                image={image}
                description={description}
                handler={this.props.handler}/>
            </div>;
        }

        return (
            <div className="WordLine">
                <td>{wordNative}</td>
                <td>{wordTranslate}</td>
                <td>{image}</td>
                <td>{description}</td>
                <td>
                    <button className="edit-word-button" id="word-edit"
                            onClick={this.handleClickWordEdit}>{localizationStrings.edit}</button>
                    <button className="delete-word-button" id="word-delete"
                            onClick={this.handleClickWordDelete}>{localizationStrings.delete}</button>
                </td>
            </div>
        );
    }
}

export default WordLine;