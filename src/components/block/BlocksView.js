import React from 'react';
import constants from '../../constants/constants';
import localizationStrings from '../../localozation/LocalizationStrings';
import BlockLine from './BlockLine';

const ipcRenderer = window.electron.ipcRenderer;
let ipcSettings = ipcRenderer.sendSync(constants.GET_SETTINGS);
localizationStrings.setLanguage(ipcSettings == null || ipcSettings.userLanguage == null ? 'en' : ipcSettings.userLanguage);

class BlocksView extends React.Component {

    constructor(props) {
        super(props);
    }

    createTable = () => {
        let ipcBlocks = ipcRenderer.sendSync(constants.GET_ALL_BLOCKS);

        let table = [];

        ipcBlocks.forEach((ipcBlock) => {
            table.push(<tr id={ipcBlock.id}>{<BlockLine key={ipcBlock.id} id={ipcBlock.id} blockName={ipcBlock.name}
                                       timePeriod={ipcBlock.timePeriod}
                                       isShow={ipcBlock.isShow}/>}</tr>);
        });
        return table;
    }

    render() {
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
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export default BlocksView;