import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setStateData } from "../actions";
import get from "lodash";
import Paper from '@material-ui/core/Paper';
import { Avatar } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

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
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" align='center'>
                        Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit} width='100%'>
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
                            color="primary"
                            variant="contained"
                            onSubmit={this.handleSubmit}
                            className={classes.submit}>
                            Sign in
                        </Button>
                    </form>

                    <Typography component="h1" variant="subheading" align='center'>Want to create an account?<Link to="/sign-up">Sign Up</Link></Typography>
                    <Typography component="h1" variant="subheading" align='center'>Return to <Link to="/">Homepage</Link></Typography>

                </Paper>
            </main>
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

Sign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Sign));
