import React, {Component} from 'react';
import {Link} from "@reach/router";

class Platforms extends Component {

    handleChange(value) {
        this.setState({
            value: value
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Game marketplace</h1>
                <h4>Platforms</h4>
                <ol>
                    {this.props.platforms.map(platform =>
                        <li key={platform._id}>
                            <Link to={`/platforms/${platform._id}`}>{platform.name}</Link>
                        </li>)}
                </ol>
            </React.Fragment>
        );
    }

}

export default Platforms;
