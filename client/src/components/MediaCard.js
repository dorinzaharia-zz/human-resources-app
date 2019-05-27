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
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    card: {
        //maxWidth: 500,
    },
    media: {
        height: 150,
        width: 150
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    }
});

function MediaCard(props) {
    const { classes } = props;
    
    const myUser = find(props.users, { email: props.email });
    return (
        <div>
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                //fetch the user image
                //image = "image.png"
                />
                
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Welcome {myUser.last_name} {myUser.first_name}
                    </Typography>
                    <Typography component="p"></Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs >
                        <Tab label="Details" />
                    </Tabs>
                </AppBar>
                <TabContainer>   
                {myUser.email} <br/>
                 {myUser.date}
                </TabContainer>
            </div>
            </CardActions>
            
        </Card>
               

        </div>
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
