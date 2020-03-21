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
            showEditBlockForm: false
        };

        this.blockData = {
            id: this.props.id
        };
    }

    handleClickBlockEdit = () => {
        this.setState({
            showEditBlockForm: true
        });
    }

    handleClickBlockVisibility = () => {
        ipcRenderer.send(constants.SWITCH_VISIBILITY, this.blockData);
    }

    handleClickBlockDelete = () => {
        ipcRenderer.send(constants.DELETE_BLOCK, this.blockData);
    }

    render() {
        const {
            showEditBlockForm
        } = this.state;
        return (
            <div className="BlockLine">
                <td>{this.props.blockName}</td>
                <td>
                    <button className="edit-block-button" id="block-edit"
                            onClick={this.handleClickBlockEdit}>{localizationStrings.edit}</button>
                    <button className="visibility-block-button" id="block-visibility"
                            onClick={this.handleClickBlockVisibility}>{localizationStrings.visibility}</button>
                    <button className="delete-block-button" id="block-delete"
                            onClick={this.handleClickBlockDelete}>{localizationStrings.delete}</button>
                </td>

                {showEditBlockForm &&
                <NewBlock key={this.props.id} id={this.props.id} blockName={this.props.blockName} timePeriod={this.props.timePeriod}
                          isShow={this.props.isShow}/>}
            </div>
        );
    }
}

export default BlockLine;