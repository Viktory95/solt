/**
 * Created by Vi on 21.03.2020.
 */
import React from 'react';
import ReactDOM from 'react-dom';
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
            hideComponent: false
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
        this.setState({
            isShow: !this.state.isShow
        });
    }

    handleClickBlockDelete = () => {
        ipcRenderer.send(constants.DELETE_BLOCK, this.blockData);
        this.setState({
            hideComponent: true
        });
    }

    render() {
        const {
            id,
            name,
            timePeriod,
            isShow
        } = this.state;

        if (this.state.hideComponent === true) {
            return false;
        }

        if (this.state.showEditBlockForm === true) {
            return <div className="BlockLine">
                <NewBlock key={id} id={id} blockName={name}
                          timePeriod={timePeriod}
                          isShow={isShow}/>
                </div>;
        }

        return (
            <div className="BlockLine">
                <td>{name}</td>
                <td>{timePeriod}</td>
                <td>{isShow}</td>
                <td>
                    <button className="edit-block-button" id="block-edit"
                            onClick={this.handleClickBlockEdit}>{localizationStrings.edit}</button>
                    <button className="visibility-block-button" id="block-visibility"
                            onClick={this.handleClickBlockVisibility}>{localizationStrings.visibility}</button>
                    <button className="delete-block-button" id="block-delete"
                            onClick={this.handleClickBlockDelete}>{localizationStrings.delete}</button>
                </td>
            </div>
        );
    }
}

export default BlockLine;