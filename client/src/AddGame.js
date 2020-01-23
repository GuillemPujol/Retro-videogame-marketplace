import React, {Component} from 'react';
import {Link} from "@reach/router";

class AddGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: null,
            name: '',
            condition: null,
            platform: null,
            email: '',
            price: ''
        };
    };



    handleChange(value) {
        this.setState({
            value: value
        });
    }

    submit(event) {
        event.preventDefault();
        const game = {
            name: this.state.name,
            condition: this.state.condition,
            price: this.state.price,
            sellerName: this.props.username,
            sellerEmail: this.state.email
        }
        const platform = this.props.platforms.find(p => this.state.platform === p.name)._id
        this.props.addGame(platform, game);
    }



    

    render() {
        console.log(this.state)

        const knownGames = [
        'Resident Evil 2',
        'Pokemon',
        'Metal Gear Solid',
        'Final Fantasy VII',
        'Tomb Rider',
        'Silent Hill',
        'Digimon World',
        'Tekken 3',
        'Mafia I',
        'Mafia II',
        'Mafia III',
        ]

        const conditions = [
            'Brand new',
            'Like new',
            'Very good',
            'Good',
            'Acceptable'
        ]


        return (
            <React.Fragment>
                <h1>Add game</h1>
                {this.props.username ? 
                                <form style={{"display": "inline-grid"}} onSubmit={(event) => this.submit(event)}>
                                <label>
                                    Platform:
                                    <select onChange={(e) => this.setState({platform: e.target.value})} value={this.state.platform}>
                                        {this.props.platforms.map(p => <option>{p.name}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Game:
                                    <select onChange={(e) => this.setState({name: e.target.value})} value={this.state.name}>
                                        {knownGames.map(g => <option>{g}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Condition:
                                    <select onChange={(e) => this.setState({condition: e.target.value})} value={this.state.condition}>
                                        {conditions.map(g => <option>{g}</option>)}
                                    </select>
                                </label>
                                <label>
                                    Your email:
                                    <input type="text" onChange={event => this.setState({email: event.target.value})} value={this.state.email} name="email" />
                                </label>
                                <label>
                                    Game price:
                                    <input type="text" onChange={event => this.setState({price: event.target.value})} value={this.state.price} name="price" />
                                </label>
                                <input type="submit" value="Add game" />
                            </form>
                            :
                            <React.Fragment>
                                {this.props.username}
                                <br />
                            <h4>You need to be logged in to add a game. <Link to="/login">Click here to log in</Link></h4>
                            

                            <br />
                            </React.Fragment>

            }

                <Link to="/">Back</Link>

            </React.Fragment>
        );
    }

}

export default AddGame;
