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

const styles = theme => ({
    card: {
        //maxWidth: 500,
    },
    media: {
        height: 150,
        width: 150
    }
   /*  mainFeaturedPost: {
        backgroundColor: '#3f50b5',//theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit * 4,
    } */
});

function PeopleCard(props) {
    const { classes } = props;
    const listItems = props.users.map((user) =>
  <li>{user.first_name} {user.last_name} </li>
);
    return (
        <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                 {/*  <Typography component="h1" variant="h3" color="inherit" gutterBottom> */}
                 <Link to="/dashboard">
                 <ul>{listItems}</ul>
                 </Link>
                 {/*  </Typography> */}
                </div>
              </Grid>
            </Grid>
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
