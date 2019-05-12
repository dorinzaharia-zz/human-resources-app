import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setStateData } from "../actions";
import get from "lodash";
import { Redirect } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Avatar } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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

class Sign extends Component {
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
            <div
            style={{
                justifyContent: "center",
                marginTop: 100,
                marginLeft: 400,
                marginRight: 400,
              }}>
                <Paper alignItems='center'>
                   {/*  <Avatar >
                        <LockOutlinedIcon />
                    </Avatar>  */}
                    <Typography component="h1" variant="h5" align = 'center'>
                        Sign in
                    </Typography>
                    <form onSubmit={this.handleSubmit}  width = '100%'>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus value={data.email}
                                onChange={this.handleChange}
                                required />
                        </FormControl>
                        {formErrors.email.length > 0 && (
                            <small>{formErrors.email}</small>
                        )}
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" value={data.password}
                                onChange={this.handleChange}
                                required />
                        </FormControl>
                        {formErrors.password.length > 0 && (
                            <small>{formErrors.password}</small>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onSubmit={this.handleSubmit}>
                            Sign in
                        </Button>
                    </form>

                    <Typography component="h1" variant="subheading" align = 'center'>Want to create an account?<Link to="/sign-up">Sign Up</Link></Typography>
                    <Typography component="h1" variant="subheading" align = 'center'>Return to <Link to="/">Homepage</Link></Typography>
                    
                </Paper>
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
)(Sign);
