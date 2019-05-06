import React, { Component } from "react";
import { Link } from "react-router-dom";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

function isValid(data, errors) {
    let valid = true;
    Object.values(data).forEach(val => {
        if (val.length === 0) {
            valid = false;
        }

        Object.values(errors).forEach(val => {
            if (val.length > 0) {
                valid = false;
            }
        });
    });
    return valid;
}

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusCode: undefined,
            isLoading: false,
            data: {
                email: "",
                password: "",
                first_name: "",
                last_name: ""
            },
            formErrors: {
                email: "",
                password: "",
                first_name: "",
                last_name: ""
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async registerUser(host, data) {
        await fetch(host + "/users/register", {
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
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        this.setState({ isLoading: false });
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        const state = this.state;
        if (isValid(state.data, state.formErrors)) {
            console.log(state.data);
            this.registerUser("http://localhost:3001", this.state.data);
        } else {
            console.error("Invalid form");
        }
    }

    handleChange(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;
        const data = { ...this.state.data };
        const formErrors = { ...this.state.formErrors };

        switch (name) {
            case "first_name":
                formErrors.first_name =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            case "last_name":
                formErrors.last_name =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
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
                    <h1>Sign Up</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={data.first_name}
                        onChange={this.handleChange}
                        required
                    />
                    {formErrors.first_name.length > 0 && (
                        <small>{formErrors.first_name}</small>
                    )}
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={data.last_name}
                        onChange={this.handleChange}
                        required
                    />
                    {formErrors.last_name.length > 0 && (
                        <small>{formErrors.last_name}</small>
                    )}
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
                        Sign Up
                    </button>
                </form>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/">Homepage</Link>
            </div>
        );
    }
}

export default SignUp;
