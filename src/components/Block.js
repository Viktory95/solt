/**
 * Created by Vi on 11.10.2019.
 */
import React from 'react';

class Block extends React.Component {
    render() {
        return (
            <div>
                <li>{this.props.blockName}</li>
                <li>{this.props.timePeriod}</li>
                <li>{this.props.isShow}</li>
            </div>
        );
    }
}

export default Block;