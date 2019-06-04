import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { setStoreData } from "./actions";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

class App extends Component {
    componentWillMount() {
        this.props.setStoreData("isLoggedIn", false);
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/sign-in" component={SignIn} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
            </Switch>
            // <div>
            //     <Dashboard />
            // </div>
        );
    }
}
const mapDispatchToProps = {
    setStoreData
};

export default connect(
    null,
    mapDispatchToProps
)(App);
