import React, { Component } from 'react';
import { Link } from "@reach/router";

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    };



    handleChange(value) {
        this.setState({
            value: value
        });
    }

    submit(event) {
        event.preventDefault();

        this.props.addPlatform(this.state.name)
        
    }





    render() {
        console.log(this.state)




        return (
            <React.Fragment>
                <h1>Admin</h1>
                {this.props.username === 'admin' ?
                    <React.Fragment>
                        <h3>Add platform</h3>

                        <form style={{ "display": "inline-grid" }} onSubmit={(event) => this.submit(event)}>
                            <label>
                                Platform name:
                                    <input type="text" onChange={event => this.setState({ name: event.target.value })} value={this.state.name} name="name" />
                            </label>
                            <input type="submit" value="Add platform" />
                        </form>
                    </React.Fragment>

                    :
                    <React.Fragment>
                        {this.props.username}
                        <br />
                        <h4>You need to be logged in with an admin account to use this page <Link to="/login">Click here to log in</Link></h4>


                        <br />
                    </React.Fragment>

                }

                <Link to="/">Back</Link>

            </React.Fragment>
        );
    }

}

export default Name;
