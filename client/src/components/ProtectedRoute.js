import React from "react";
import { Route, Redirect } from "react-router-dom";
import get from "lodash";
import { connect } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (rest.isLoggedIn) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

const mapStateToProps = state => {
    return {
        isLoggedIn: get(state, "isLoggedIn", "")
    };
};

export default connect(
    mapStateToProps,
    null
)(ProtectedRoute);