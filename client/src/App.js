import React, {Component} from 'react';
import {Router} from "@reach/router";
import Platform from "./Platform";
import Platforms from "./Platforms";
import Game from "./Game";
import Login from "./Login";
import AddGame from "./AddGame";
import Admin from './Admin';
import {Link} from "@reach/router";


class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);
        this.state = {
            platforms: [],
            token: null,
            username: null,
        };
    }

    componentDidMount() {
        this.fetchData().then(() => console.log("Platforms gotten!"));
    }

    async fetchData() {
        let url = `${this.API_URL}/platforms`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            platforms: json
        })
    }

    getPlatform(id) {
        return this.state.platforms.find(k => k._id === id);
    }

    async addPlatform(name) {
        await fetch(`${this.API_URL}/platforms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify({name: name, games: ['Examples']})
        });
        await this.fetchData();
    }

    async addGame(platformId, game) {
        await fetch(`${this.API_URL}/platforms/${platformId}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify({game: game})
        });
        await this.fetchData();
    }

    async addPlatform(name) {
        await fetch(`${this.API_URL}/platforms/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + this.state.token
            },
            body: JSON.stringify({name: name})
        });
        await this.fetchData();
    }

    async logIn(username, password) {
        fetch(`${this.API_URL}/users/authenticate/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body:  JSON.stringify({
                username: username,
                password: password
            }),
        }).then(res => res.json()).then(resp => {
            this.setState({
                token: resp.token,
                username: resp.username
            })
        });
    }

    logOut(){
        this.setState({
            token: null,
            username: null
        })
    }



    render() {
        return (
            <div className="container">
                <Link to="/login">Login</Link>
                <br />
                <Link to="/admin">Admin</Link>
                <br />

                <Link to="/add">Add Game</Link>


                <Router>
                    <Platform path="/platforms/:id" getPlatform={id => this.getPlatform(id)}
                            addGame={(platformId, game) => this.addGame(platformId, game)} />
                    <Platforms path="/" platforms={this.state.platforms}
                             addPlatform={name => this.addPlatform(name)}/>
                    <Game path="/platforms/:platformId/games/:gameId" getGame={(gameId, platformId) => this.getGame(gameId, platformId)} />
                    <Login path="/login" logOut={() => this.logOut()} logIn={(username, password) => this.logIn(username, password)} username={this.state.username}/>
                    <AddGame path="/add" username={this.state.username} addGame={(platformId, game) => this.addGame(platformId, game)} platforms={this.state.platforms} />
                    <Admin path="/admin" username={this.state.username} addPlatform={(name) => this.addPlatform(name)} />
                </Router>
            </div>
        );
    }
}

export default App;
