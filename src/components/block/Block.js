/**
 * Created by Vi on 11.10.2019.
 */
import React from 'react';
import styles from './Block.css';

class Block extends React.Component {
    render() {
        return (
            <div className="Block">
                <h5>{this.props.blockName}</h5>
                {/*<li>{this.props.timePeriod}</li>*/}
                {/*<li>{this.props.isShow}</li>*/}
            </div>
        );
    }
}

export default Block;