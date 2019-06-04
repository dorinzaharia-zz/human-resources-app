import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { get } from "lodash";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
require("dotenv").config();

const styles = theme => ({
    main: {
        width: "auto",
        display: "block",
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 450,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit *
            3}px ${theme.spacing.unit * 3}px`
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 1,
        width: 350
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    input: {
        display: "none"
    }
});

class SettingsCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            phone_number: "",
            linked_in: ""
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { classes } = this.props;
        const props = this.props;
        const myUser = props.user;
        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Manage personal data
                        </Typography>
                        <Typography
                            component="h1"
                            variant="subtitle1"
                            align="center"
                        >
                            Fill in your missing details or change your existing
                            data
                        </Typography>
                        <form
                            className={classes.container}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-name"
                                label={myUser.email}
                                className={classes.textField}
                                value={this.state.email}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                name="email"
                            />
                            <TextField
                                id="outlined-name"
                                label="password"
                                className={classes.textField}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                name="password"
                            />
                            <TextField
                                id="outlined-name"
                                label={myUser.phone_number}
                                className={classes.textField}
                                value={this.state.phone_number}
                                onChange={this.handleChange}
                                name="phone_number"
                                margin="normal"
                                variant="outlined"
                            />
                            <TextField
                                id="outlined-name"
                                label={myUser.linked_in}
                                className={classes.textField}
                                value={this.state.linked_in}
                                onChange={this.handleChange}
                                margin="normal"
                                variant="outlined"
                                name="linked_in"
                            />
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="outlined-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="outlined-button-file">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    className={classes.textField}
                                >
                                    Upload
                                </Button>
                            </label>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.textField}
                                onSubmit={this.handleSubmit}
                            >
                                Submit changes
                            </Button>
                        </form>
                    </Paper>
                </main>
            </div>
        );
    }
}

SettingsCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        user: get(state, "user", {})
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SettingsCard));
