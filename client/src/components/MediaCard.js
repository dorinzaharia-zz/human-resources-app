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

const styles = {
    card: {
        //maxWidth: 500,
    },
    media: {
        height: 150,
        width: 150
    }
};

function MediaCard(props) {
    const { classes } = props;
    const myUser = find(props.users, { email: props.email });
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    //fetch the user image
                    //image = {};
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Welcome User! {myUser.first_name}
                    </Typography>
                    <Typography component="p">{myUser.last_name}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Tabs />
                {/* <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button> */}
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state["users"],
        email: state["email"]
    };
};

export default connect(mapStateToProps)(withStyles(styles)(MediaCard));
