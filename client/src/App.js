import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/sign-in" component={SignIn} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        );
    }
}

export default App;
