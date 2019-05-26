import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { find } from "lodash"; 
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    }
});


function SettingsCard(props) {
    const { classes } = props;
    const myUser = find(props.users, { email: props.email });
    return (
         <div>
            <main className={classes.main}>
                <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Change personal data
                        </Typography>
                        <form className={classes.form} >
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="email">
                                {myUser.email}
                                </InputLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus/>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="password">
                                {myUser.password}
                                </InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"/>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                
                                {myUser.image}
                               
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}> Submit changes
                            </Button>
                            {/*<button type="submit" onSubmit={this.handleSubmit}>Sign Up</button> */}
                        </form>
                    </Paper>
                </main>
            </div>
    );
}

SettingsCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state["users"],
        email: state["email"],
        password: state["password"],
        image:state["image"]
    };
};

export default connect(mapStateToProps)(withStyles(styles)(SettingsCard));
