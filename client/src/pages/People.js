import React, { Component } from "react";
import PeopleCard from "../components/PeopleCard";
import UserCard from "../components/UserCard";

class People extends Component {
    render() {
        return (
            <div>
                <PeopleCard/>
                <UserCard _id="5cdabf932be2017e75efaf15"/> 
            </div>
        );
    }
}

export default People;
