import React, { Component } from "react";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

function isValid(userData, formErrors) {
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

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            statusCode: undefined,
            isLoading: false,
            userData: {
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

    registerUser(host, data) {
        console.log(this.state);

        // fetch(host + "/users/register", {
        //     method: "POST",
        //     headers: new Headers({
        //         "Content-Type": "application/json"
        //     }),
        //     body: JSON.stringify(data)
        // })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    }

    handleSubmit(e) {
        e.preventDefault();
        const state = this.state;
        if (isValid(state.userData, state.formErrors)) {
            console.log(state.userData);
            this.registerUser("http://localhost:3001", this.state.userData);
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
            case "first_name":
                formErrors.first_name =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            case "last_name":
                formErrors.last_name =
                    value.length < 3 ? "Minimum 3 characters required" : "";
                break;
            case "email":
                // formErrors.email = !emailRegex.test(value)
                //     ? "Invalid email address"
                //     : "";
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
                    <h1>Sign Up</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={userData.first_name}
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
                        value={userData.last_name}
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

export default SignUp;
