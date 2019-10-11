/**
 * Created by Vi on 11.10.2019.
 */
import React from 'react';

class Block extends React.Component {
    render() {
        return (
            <li>{this.props.blockName}</li>
        );
    }
}

export default Block;