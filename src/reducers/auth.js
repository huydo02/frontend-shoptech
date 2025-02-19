import { AUTH_LOGIN, GET_INFO_USER, AUTH_REGISTER, AUTH_LOGOUT } from "../actions/type";

const initialState = {
    userInfo: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                userInfo: action.payload.userInfo,
                // status: action.payload.status,
                // message: action.payload.message
            };
        case GET_INFO_USER:
            return {
                ...state,
                userInfo: action.payload.userInfo,
            };
        case AUTH_REGISTER:
            return {
                ...state,
                userInfo: action.payload.userInfo,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                userInfo: action.payload.userInfo,
            };
        default:
            return state;
    }
};

export default authReducer;

