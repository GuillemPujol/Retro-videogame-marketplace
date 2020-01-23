import React, {Component} from 'react';
import {Link} from "@reach/router";
import Game from './Game';

class Platform extends Component {

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

    render() {
        const platform = this.props.getPlatform(this.props.id);
        console.log(this.props.id);

        let content = <p>Loading</p>;
        if (platform) {
            content =
                <React.Fragment>
                    <h1>{platform.name}</h1>

                    <h3>Games</h3>
                    <ul>
                        {platform.games.map(h => <li><Link to={`/platforms/${this.props.id}/games/${h._id}`} key={h}>{h.name}</Link></li>)}
                    </ul>

                    <input name="newGame" onChange={(event) => this.handleChange(event)} type="text"/>

                    <br/>
                    <Link to="/">Back</Link>
                </React.Fragment>
        }

        if (platform) {
        if (platform.games.length == 0) {
                return (
                   <React.Fragment>
   
                   <h1>{platform.name}</h1>
   
                    <h2>No games found. Add some.</h2>
                    <Link to="/">Back</Link>
                    </React.Fragment>
   
                )
            }
        }

        return content;
    }
}

export default Platform;
