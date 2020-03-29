import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import BlockLine from './BlockLine';
import NewBlock from './NewBlock';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class BlocksView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isCrateFormShow: false
        };
    }

    handler = (isCrateFormShow) => {
        this.setState({
            isCrateFormShow: isCrateFormShow
        });
    }

    handleClickBlockCreate = () => {
        this.setState({
            isCrateFormShow: true
        });
    }

    createTable = () => {
        let ipcBlocks = ipcRenderer.sendSync(constants.GET_ALL_BLOCKS);

        let table = [];

        ipcBlocks.forEach((ipcBlock) => {
            table.push(<tr>{<BlockLine key={ipcBlock.id}
                                       id={ipcBlock.id}
                                       blockName={ipcBlock.name}
                                       timePeriod={ipcBlock.timePeriod}
                                       isShow={ipcBlock.isShow}
                                       handler={this.handler}/>}</tr>);
        });
        return table;
    }

    render() {
        const {
            isCrateFormShow
        } = this.state;

        return (
            <div>
                <button className="create-block-button" id="block-edit"
                        onClick={this.handleClickBlockCreate}>{localizationStrings.create}</button>
                {
                    <table>
                        <tr>
                            <th>{localizationStrings.block_name}</th>
                            <th>{localizationStrings.block_time_period}</th>
                            <th>{localizationStrings.block_is_visible}</th>
                            <th>{localizationStrings.actions}</th>
                        </tr>
                        {this.createTable()}
                        {isCrateFormShow
                        && <NewBlock handler={this.handler}/>}
                    </table>
                }
            </div>
        );
    }
}

export default BlocksView;