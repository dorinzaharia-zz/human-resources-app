import * as constants from "./constants";

export function setStateData(key, value) {
    return {
        type: constants.SET_STATE_DATA,
        key,
        value
    };
}

export function setUsers(value) {
    return {
        type: constants.SET_USERS,
        value
    };
}
