/**
 * Created by Vi on 21.03.2020.
 */
import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import NewBlock from './NewBlock';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class BlockLine extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            name: this.props.blockName,
            timePeriod: this.props.timePeriod,
            isShow: this.props.isShow,
            showEditBlockForm: false,
            hideComponent: false,
            handlerTraning: props.handlerTraning
        };

        this.optionsTimePeriod = [
            {
                value: 1,
                label: '1 day'
            },
            {
                value: 2,
                label: '2 day'
            },
            {
                value: 3,
                label: '3 day'
            },
            {
                value: 4,
                label: '4 day'
            },
            {
                value: 5,
                label: '5 day'
            },
            {
                value: 6,
                label: '6 day'
            },
            {
                value: 7,
                label: '1 week'
            },
            {
                value: 14,
                label: '2 week'
            },
            {
                value: 21,
                label: '3 week'
            },
            {
                value: 30,
                label: '1 month'
            },
            {
                value: 60,
                label: '2 month'
            },
            {
                value: 90,
                label: '3 month'
            },
            {
                value: 120,
                label: '4 month'
            },
            {
                value: 150,
                label: '5 month'
            },
            {
                value: 180,
                label: '6 month'
            },
            {
                value: 210,
                label: '7 month'
            },
            {
                value: 240,
                label: '8 month'
            },
            {
                value: 270,
                label: '9 month'
            },
            {
                value: 300,
                label: '10 month'
            },
            {
                value: 330,
                label: '11 month'
            },
            {
                value: 365,
                label: '1 year'
            }
        ];

        if (props.timePeriod != null) {
            let timePeriod = '';
            for (let tpNum = 0; tpNum < this.optionsTimePeriod.length; tpNum++) {
                if (this.optionsTimePeriod[tpNum].value == props.timePeriod) {
                    timePeriod = this.optionsTimePeriod[tpNum].label;
                    break;
                }
            }
            this.selectedTimePeriod = {
                value: timePeriod
            };
        }
    }

    handleClickBlockEdit = () => {
        this.setState({
            showEditBlockForm: true
        });
    }

    handleClickBlockVisibility = () => {
        ipcRenderer.send(constants.SWITCH_VISIBILITY, {id: this.state.id});
        this.setState({
            isShow: this.state.isShow == 0 ? 1 : 0
        });
    }

    handleClickBlockDelete = () => {
        ipcRenderer.send(constants.DELETE_BLOCK, {id: this.state.id});
        this.setState({
            hideComponent: true
        });
    }

    handleClickBlockTraining = () => {
        let wordArray = [];
        let ipcBlocksAlbums = ipcRenderer.sendSync(constants.GET_BLOCK_ALBUM_BY_BLOCK_ID, {blockId: this.state.id});
        ipcBlocksAlbums.forEach((ipcBlockAlbum) => {
            let ipcAlbum = ipcRenderer.sendSync(constants.GET_ALBUM_BY_ID, {albumId: ipcBlockAlbum.albumId});
            let ipcWords = ipcRenderer.sendSync(constants.GET_WORDS_BY_ALBUM_ID, {albumId: ipcAlbum.id});
            ipcWords.forEach((ipcWord) => {
                wordArray.push(ipcWord);
            });
        });
        this.props.handlerTraning(true, wordArray);
    }

    render() {
        const {
            id,
            name,
            timePeriod,
            isShow
        } = this.state;

        if (this.state.hideComponent) {
            return false;
        }

        if (this.state.showEditBlockForm) {
            return <NewBlock key={id} id={id} blockName={name}
                             timePeriod={timePeriod}
                             isShow={isShow}
                             handler={this.props.handler}/>;
        }


        return (
            <tr className="BlockLine">
                <td>{name}</td>
                <td>{this.selectedTimePeriod.value}</td>
                <td>{isShow == 0 ? 'no' : 'yes'}</td>
                <td>
                    <button className="edit-block-button" id="block-edit"
                            onClick={this.handleClickBlockEdit}>{localizationStrings.edit}</button>
                    <button className="visibility-block-button" id="block-visibility"
                            onClick={this.handleClickBlockVisibility}>{localizationStrings.visibility}</button>
                    <button className="delete-block-button" id="block-delete"
                            onClick={this.handleClickBlockDelete}>{localizationStrings.delete}</button>
                    <button className="training-block-button" id="block-training"
                            onClick={this.handleClickBlockTraining}>{localizationStrings.training}</button>
                </td>
            </tr>
        );
    }
}

export default BlockLine;