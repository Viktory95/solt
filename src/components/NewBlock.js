/**
 * Created by Vi on 22.10.2019.
 */
import React from 'react';
const Blocks = require('../../public/solt_db_api/blocks');

class NewBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputBlockName: '',
            inputBlockTimePeriod: '',
            inputBlockIsShow: ''
        };
    }

    handleClickCreateBlock = () => {
        if(!Blocks.isExists(this.state.inputBlockName)) {
            Blocks.createBlock(this.state.inputBlockName, this.state.inputBlockTimePeriod, this.state.inputBlockIsShow);
        }
    }

    updateInputBlockName = (evt) => {
        this.setState({
            inputBlockName: evt.target.value
        });
    }

    updateInputBlockTimePeriod = (evt) => {
        this.setState({
            inputBlockTimePeriod: evt.target.value
        });
    }

    updateInputBlockIsShow = (evt) => {
        this.setState({
            inputBlockIsShow: evt.target.value
        });
    }

    render() {
        return (
            <div>
                <input onChange={evt => this.updateInputBlockName(evt)}/>
                <input onChange={evt => this.updateInputBlockTimePeriod(evt)}/>
                <input onChange={evt => this.updateInputBlockIsShow(evt)}/>
                <button id="new-block-button" onClick={this.handleClickCreateBlock}>Add Block</button>
            </div>
        );
    }
}

export default NewBlock;