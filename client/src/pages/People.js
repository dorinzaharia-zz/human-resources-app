import React, { Component } from "react";
import PeopleCard from "../components/PeopleCard";
import { Route, Switch } from "react-router-dom";

class People extends Component {
    render() {
        return (
            <div>
                <PeopleCard />
            </div>
        );
    }
}

export default People;
