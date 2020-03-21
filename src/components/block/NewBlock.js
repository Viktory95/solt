/**
 * Created by Vi on 22.10.2019.
 */
import React from 'react';
import Select from "react-select";
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class NewBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            timePeriod: '',
            isShow: ''
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

        this.optionsIsShow = [
            {
                value: 1,
                label: 'yes'
            },
            {
                value: 0,
                label: 'no'
            }
        ];

        this.selectedIsShow = {
            value: 0,
            label: ''
        };

        this.selectedTimePeriod = {
            value: 0,
            label: ''
        };

        if (props.isShow != null) {
            this.selectedIsShow = {
                value: props.isShow,
                label: props.isShow == 0 ? 'no' : 'yes'
            };
        }

        if(props.timePeriod != null) {
            let timePeriod = '';
            for(let tpNum = 0; tpNum < this.optionsTimePeriod.length; tpNum++) {
                if(this.optionsTimePeriod[tpNum].value == props.timePeriod){
                    timePeriod = this.optionsTimePeriod[tpNum].label;
                    break;
                }
            }
            this.selectedTimePeriod = {
                value: props.timePeriod,
                label: timePeriod
            };
        }
    }

    handleClickCreateBlock = () => {
        ipcRenderer.send(constants.ADD_BLOCK, this.state);
    }

    handleClickCancel = () => {
        window.location.reload();
    }

    updateInputBlockName = (evt) => {
        this.setState({
            name: evt.target.value,
            id: this.props.id
        });
    }

    updateSelectBlockTimePeriod = (evt) => {
        this.setState({
            timePeriod: evt.value
        });
    }

    updateSelectBlockIsShow = (evt) => {
        this.setState({
            isShow: evt.value
        });
    }

    render() {
        return (
            <div>
                <h4>{localizationStrings.block_name}</h4>
                <input text={this.props.blockName} onChange={evt => this.updateInputBlockName(evt)}/>
                <h4>{localizationStrings.block_time_period}</h4>
                <Select defaultValue={this.selectedTimePeriod} options={this.optionsTimePeriod}
                        onChange={evt => this.updateSelectBlockTimePeriod(evt)}/>
                <h4>{localizationStrings.block_is_visible}</h4>
                <Select defaultValue={this.selectedIsShow} options={this.optionsIsShow}
                        onChange={evt => this.updateSelectBlockIsShow(evt)}/>
                <button id="new-block-button"
                        onClick={this.handleClickCreateBlock}>{localizationStrings.ok}</button>
                <button id="cancel-button" onClick={this.handleClickCancel}>{localizationStrings.cancel}</button>
            </div>
        );
    }
}

export default NewBlock;