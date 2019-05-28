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
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    main: {
        width: "auto",
        display: "block", // Fix IE 11 issue.
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
        marginRight: theme.spacing.unit *3,
        width : 350
      } ,
      container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
});


function SettingsCard(props) {
    const { classes } = props;
    const myUser = find(props.users, { email: props.email });
    const [values, setValues] = React.useState({
      });
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    return (
         <div>
            <main className={classes.main}>
                <CssBaseline />
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Manage personal data
                        </Typography>
                        <Typography component="h1" variant="subtitle1" align = "center">
                            Fill in your missing details or change your existing data
                        </Typography>
                        <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                                id="outlined-name"
                                label="Email"
                                className={classes.textField}
                                value={myUser.email}
                                onChange={handleChange('Email')}
                                margin="normal"
                                variant="outlined"
                                
                        />
                        <TextField
                                id="outlined-name"
                                label="password"
                                className={classes.textField}
                                /* onChange={handleChange('name')} */
                                margin="normal"
                                variant="outlined"
                        />
                                
                        <TextField
                                id="outlined-name"
                                label="Phone number"
                                className={classes.textField}
                                value={myUser.phone_number}
                                /* onChange={handleChange('name')} */
                                margin="normal"
                                variant="outlined"
                        />

                                
                        <TextField
                                id="outlined-name"
                                label="Linked In"
                                className={classes.textField}
                                value={myUser.linked_in}
                                /* onChange={handleChange('name')} */
                                margin="normal"
                                variant="outlined"
                        />                
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
