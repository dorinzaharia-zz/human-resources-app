import * as constants from "./constants";

export function setStoreData(key, value) {
    return {
        type: constants.SET_STORE_DATA,
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

export function setUser() {
    return {
        type: constants.SET_USER
    };
}
