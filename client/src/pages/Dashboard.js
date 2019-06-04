import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setStoreData, setUser } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import { mainListItems, secondaryListItems } from "../components/ListItems";
import MediaCard from "./MediaCard";
import PeopleCard from "../pages/PeopleCard";
import Settings from "./Settings";
import UserCard from "./UserCard";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: "flex"
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: "100vh",
        overflow: "auto"
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    },
    h5: {
        marginBottom: theme.spacing.unit * 2
    }
});

class Dashboard extends React.Component {
    state = {
        open: true
    };

    componentWillMount() {
        this.props.setUser();
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleLogOut = () => {
        this.props.setStoreData("isLoggedIn", false);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(
                        classes.appBar,
                        this.state.open && classes.appBarShift
                    )}
                >
                    <Toolbar
                        disableGutters={!this.state.open}
                        className={classes.toolbar}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Dashboard
                        </Typography>
                        <Button color="inherit" onClick={this.handleLogOut}>
                            Log Out
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(
                            classes.drawerPaper,
                            !this.state.open && classes.drawerPaperClose
                        )
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <Switch>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Route
                            exact
                            path="/dashboard/home"
                            component={MediaCard}
                        />
                        <Route
                            exact
                            path="/dashboard/people"
                            component={PeopleCard}
                        />
                        <Route
                            path="/dashboard/people/:id"
                            render={renderProps => (
                                <UserCard id={renderProps.match.params.id} />
                            )}
                        />
                        <Route
                            exact
                            path="/dashboard/settings"
                            component={Settings}
                        />
                    </main>
                </Switch>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    setStoreData,
    setUser
};

export default connect(
    null,
    mapDispatchToProps
)(withStyles(styles)(Dashboard));
