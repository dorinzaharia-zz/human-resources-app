import * as constants from "../actions/constants";

const setStateData = (state = {}, action) => {
    return {
        ...state,
        [action.key]: action.value
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case constants.SET_STATE_DATA:
            return setStateData(state, action);
        default:
            return state;
    }
};

export default reducer;
