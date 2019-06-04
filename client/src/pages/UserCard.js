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
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { CardHeader } from "@material-ui/core";
import { TabContainer } from "../components/TabContainer";

const styles = theme => ({
    media: {
        height: 150,
        width: 250,
        alignItems: "center",
        paddingTop: "25%"
    },
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
});

function UserCard(props) {
    const { classes } = props;

    const myUser = find(props.users, { _id: props.id });

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardHeader />
                <CardMedia
                    className={classes.media}
                    image={"http://localhost:3000/users/images/" + myUser._id}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" />
                    <Typography component="p" />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs>
                            <Tab label="Details" />
                        </Tabs>
                    </AppBar>
                    <TabContainer>
                        <Table className={classes.table}>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>{myUser.first_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Last Name</TableCell>
                                <TableCell>{myUser.last_name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Registration date</TableCell>
                                <TableCell>{myUser.date}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Phone number</TableCell>
                                <TableCell>{myUser.phone_number}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Company</TableCell>
                                <TableCell>{myUser.company}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Department</TableCell>
                                <TableCell>{myUser.department}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>LinkedIn</TableCell>
                                <TableCell>{myUser.linked_in}</TableCell>
                            </TableRow>
                        </Table>
                    </TabContainer>
                </div>
            </CardActions>
        </Card>
    );
}

UserCard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        users: state["users"]
    };
};

export default connect(mapStateToProps)(withStyles(styles)(UserCard));
