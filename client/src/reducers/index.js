import * as constants from "../actions/constants";
import { find } from "lodash";

const setStoreData = (state = {}, action) => {
    return {
        ...state,
        [action.key]: action.value
    };
};

const setUsers = (state = {}, action) => {
    return {
        ...state,
        users: action.value
    };
};

const setUser = (state = {}) => {
    const user = find(state.users, { email: state.email });
    return {
        ...state,
        user: user
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case constants.SET_STORE_DATA:
            return setStoreData(state, action);
        case constants.SET_USERS:
            return setUsers(state, action);
        case constants.SET_USER:
            return setUser(state);
        default:
            return state;
    }
};

export default reducer;
