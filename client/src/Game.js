import React, {Component} from 'react';
import {Link} from "@reach/router";

class Game extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            game: null
        };
    };

    handleChange(event) {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
    }

     getGame(gameId, platformId) {
        return fetch(`${this.API_URL}/platforms/${platformId}/games/${gameId}`, {
           method: "GET",
           headers: {
               "Content-Type": "application/json; charset=utf-8"
           },
       }).then(res => res.json()).then(resp => resp)

}

    render() {
        if (!this.state.game && !this.state.game_id) {
            this.getGame(this.props.gameId, this.props.platformId).then(game => {
                this.setState({
                    game: game
                })
            });
        }


        console.log(this.state.game)

        let content = <p>Loading</p>;
        if (this.state.game) {
            content =
                <React.Fragment>
                    {/* <h1>{game.name}</h1> */}

                    <h3>{this.state.game.name}</h3>
                    <ul>
                        <li>Condition: {this.state.game.condition}</li>
                        <li>Price: ${this.state.game.price}</li>
                        <li>Posters name: {this.state.game.sellerName}</li>
                        <li>Posters email: {this.state.game.sellerEmail}</li>
                    </ul>

                    {/* <input name="newGame" onChange={(event) => this.handleChange(event)} type="text"/>
                    <button onClick={(event) => this.props.addGame(this.props.id, this.state.name)}
                            type="submit">Add New Game</button> */}

                    <br/>
                    <Link to={`/platforms/${this.props.platformId}`}>Back</Link>
                </React.Fragment>
        }

        // if (game) {
        //         return (
        //            <React.Fragment>
   
        //            <h1>{game.name}</h1>
   
        //             <h2>No games found. Add some.</h2>
        //             <Link to="/">Back</Link>
        //             </React.Fragment>
   
        //         )
        // }

        return content;
    }
}

export default Game;
