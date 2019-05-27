import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
require("dotenv").config();

const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});

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
            statusCode: "",
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
        this.setState({ isLoading: true });

        await fetch(host + "/users/register", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(data)
        })
            .then(response => {
                this.setState({
                    statusCode: response.status
                });
                return response.json();
            })
            .then(response => {
                if (this.state.statusCode === 201) {
                    this.setState({ isLoading: false });
                    this.props.history.push("/sign-in");
                }
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        const state = this.state;
        if (isValid(state.data, state.formErrors)) {
            console.log(state.data);
            this.registerUser(process.env.REACT_APP_SERVER, this.state.data);
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
        const { classes } = this.props;

        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form
                            className={classes.form}
                            onSubmit={this.handleSubmit}
                        >
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="first_name">
                                    First Name
                                </InputLabel>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    autoComplete="first_name"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={data.first_name}
                                    required
                                />
                            </FormControl>
                            {formErrors.first_name.length > 0 && (
                                <small>{formErrors.first_name}</small>
                            )}
                            {/*<input type="text" placeholder="First Name" name="first_name" value={data.first_name} onChange={this.handleChange} required/>
                    {formErrors.first_name.length > 0 && (<small>{formErrors.first_name}</small>)} */}
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="last_name">
                                    Last Name
                                </InputLabel>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    autoComplete="last_name"
                                    autoFocus
                                    onChange={this.handleChange}
                                    value={data.last_name}
                                    required
                                />
                            </FormControl>
                            {formErrors.last_name.length > 0 && (
                                <small>{formErrors.last_name}</small>
                            )}
                            {/*  <input type="text" placeholder="Last Name" name="last_name" value={data.last_name} onChange={this.handleChange} required
                        />
                        {formErrors.last_name.length > 0 && ( <small>{formErrors.last_name}</small>)} */}
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">
                                    Email Address
                                </InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={data.email}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormControl>
                            {formErrors.email.length > 0 && (
                                <small>{formErrors.email}</small>
                            )}
                            {/* <input type="text" placeholder="Email" name="email" value={data.email} onChange={this.handleChange} required/>
                        {formErrors.email.length > 0 && (<small>{formErrors.email}</small>)} */}
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">
                                    Password
                                </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormControl>
                            {/*  <input type="password" placeholder="Password" name="password" value={data.password} onChange={this.handleChange} required/>
                        {formErrors.password.length > 0 && (<small>{formErrors.password}</small>)} */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onSubmit={this.handleSubmit}
                            >
                                Sign Up
                            </Button>
                            {/*<button type="submit" onSubmit={this.handleSubmit}>Sign Up</button> */}
                        </form>
                        <Typography
                            className={classes.form}
                            component="h1"
                            variant="subheading"
                            align="center"
                        >
                            Already have an account?
                            <Link to="/sign-in">Sign In</Link>
                        </Typography>
                        <Typography
                            component="h1"
                            variant="subheading"
                            align="center"
                        >
                            Return to <Link to="/">Homepage</Link>
                        </Typography>
                    </Paper>
                </main>
            </div>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
