import React, { Component } from "react";

export const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export function isValid(userData, formErrors) {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        if (val.length > 0) {
            valid = false;
        }
    });

    Object.values(userData).forEach(val => {
        if (val.length === 0) {
            valid = false;
        }
    });
    return valid;
}

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusCode: undefined,
            isLoading: false,
            userData: {
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

    handleSubmit(e) {
        e.preventDefault();

        const state = this.state;
        if (isValid(state.userData, state.formErrors)) {
            console.log(state.userData);
        } else {
            console.error("Invalid form");
        }
    }

    handleChange(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = e.target.value;
        const userData = { ...this.state.userData };
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

        userData[e.target.name] = e.target.value;
        this.setState({ userData, formErrors });
    }

    render() {
        const state = this.state;
        const { userData, formErrors } = state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign In</h1>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={userData.email}
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
                        value={userData.password}
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
            </div>
        );
    }
}

export default SignIn;
