import React, { Component } from "react";
import { Link } from "react-router-dom";

class Homepage extends Component {
    render() {
        return (
            <div>
                <h1>Homepage</h1>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>
        );
    }
}

export default Homepage;
