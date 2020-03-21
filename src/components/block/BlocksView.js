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
        table.push(<tr><th>{localizationStrings.block_name}</th><th>{localizationStrings.actions}</th></tr>)

        ipcBlocks.forEach((ipcBlock) => {
            table.push(<tr>{<BlockLine key={ipcBlock.id} id={ipcBlock.id} blockName={ipcBlock.name} timePeriod={ipcBlock.timePeriod}
                                      isShow={ipcBlock.isShow}/>}</tr>);
        });
        return table;
    }

    render() {
        return (
            <div>
                {
                    <table>
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