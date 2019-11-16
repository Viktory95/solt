/**
 * Created by Vi on 22.10.2019.
 */
import React from 'react';
import Select from "react-select";
const ipcRenderer = window.electron.ipcRenderer;

const ADD_BLOCK = 'add-block';

class NewBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
    }

    handleClickCreateBlock = () => {
        ipcRenderer.send(ADD_BLOCK, this.state);
    }

    updateInputBlockName = (evt) => {
        this.setState({
            name: evt.target.value
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
                <h4>block name</h4>
                <input onChange={evt => this.updateInputBlockName(evt)}/>
                <h4>block time period</h4>
                <Select options={this.optionsTimePeriod} onChange={evt => this.updateSelectBlockTimePeriod(evt)} />
                <h4>block is visible</h4>
                <Select options={this.optionsIsShow} onChange={evt => this.updateSelectBlockIsShow(evt)} />
                <button id="new-block-button" onClick={this.handleClickCreateBlock}>Add Block</button>
            </div>
        );
    }
}

export default NewBlock;