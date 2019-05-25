import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { find } from "lodash";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tabs from "./SimpleTabs";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    card: {
        width: 400,
    },
    table: {
        width: 300,
    }
});

function PeopleCard(props) {
    const { classes } = props;
    return (
        <Paper className={classes.card}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map((user) => (
                        <TableRow >
                            {/*Edit the route here for the individual user*/ }
                            <TableCell><Link to="/dashboard">{user.first_name}</Link> </TableCell>
                            <TableCell><Link to="/dashboard">{user.last_name}</Link></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

PeopleCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state["users"],
        email: state["email"]
    };
};

export default connect(mapStateToProps)(withStyles(styles)(PeopleCard));
