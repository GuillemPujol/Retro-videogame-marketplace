import React, {Component} from 'react';
import {Link} from "@reach/router";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: 'admin',
            username: 'admin'

        };
    };

    handleChange(value) {
        this.setState({
            value: value
        });
    }

    submit(event) {
        event.preventDefault();
        this.props.logIn(this.state.username, this.state.password);
    }

    render() {
        return (
            <React.Fragment>
                <h1>Login</h1>
                {this.props.username === null ? 
                                <form onSubmit={(event) => this.submit(event)}>
                                <label>
                                    Username:
                                    <input type="text" onChange={event => this.setState({username: event.target.value})}value={this.state.username} name="username" />
                                </label>
                                <label>
                                    Password:
                                    <input type="password" onChange={event => this.setState({password: event.target.value})}value={this.state.password} name="password" />
                                </label>
                                <input type="submit" value="Log in" />
                            </form>
                            :
                            <React.Fragment>
                            <h4>Logged in as: {this.props.username}</h4>
                            <button onClick={() => this.props.logOut()}>Log out</button>
                            <br />
                            </React.Fragment>

            }

                <Link to="/">Back</Link>

            </React.Fragment>
        );
    }

}

export default Login;
