import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setStateData } from "../actions";
import get from "lodash";
import { Redirect } from "react-router-dom";

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export function isValid(data, errors) {
    let valid = true;

    Object.values(data).forEach(val => {
        if (val.length === 0) {
            valid = false;
        }
    });

    Object.values(errors).forEach(val => {
        if (val.length > 0) {
            valid = false;
        }
    });

    return valid;
}

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusCode: "",
            isLoading: false,
            isLoggedIn: false,
            data: {
                email: "",
                password: ""
            },
            formErrors: {
                email: "",
                password: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.setStateData("isLoggedIn", false);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });

        const state = this.state;
        if (isValid(state.data, state.formErrors)) {
            console.log(state.data);
            this.signIn("http://localhost:3001", this.state.data);
        } else {
            console.error("Invalid form");
        }
    }

    async signIn(host, data) {
        await fetch(host + "/users/login", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    isLoggedIn: true,
                    statusCode: response.status
                });
                this.props.setStateData("isLoggedIn", true);
                this.props.history.push("/dashboard");
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });

        // this.setState({ isLoading: false });
        console.log(this.state);
    }

    handleChange(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;
        const data = { ...this.state.data };
        const formErrors = { ...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email = !emailRegex.test(value)
                    ? "Invalid email address"
                    : "";
                break;
            case "password":
                formErrors.password =
                    value.length < 6
                        ? "Password must be at least 6 characters"
                        : "";
                break;
            default:
                break;
        }

        data[e.target.name] = e.target.value;
        this.setState({ data, formErrors });
    }

    render() {
        const state = this.state;
        const { data, formErrors } = state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign In</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={this.handleChange}
                        required
                    />
                    {formErrors.email.length > 0 && (
                        <small>{formErrors.email}</small>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={this.handleChange}
                        required
                    />
                    {formErrors.password.length > 0 && (
                        <small>{formErrors.password}</small>
                    )}
                    <button type="submit" onSubmit={this.handleSubmit}>
                        Sign In
                    </button>
                </form>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/">Homepage</Link>
            </div>
        );
    }
}

const mapDispatchToProps = {
    setStateData
};

const mapStateToProps = state => {
    return {
        isLoggedIn: get(state, "isLoggedIn", "")
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
