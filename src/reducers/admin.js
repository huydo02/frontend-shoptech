import { GET_INFO_ADMIN, ADMIN_LOGOUT, ADMIN_LOGIN } from "../actions/type";

const initialState = {
    adminInfo: [],
    roles: []
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN:
            return {
                ...state,
                adminInfo: action.payload.adminInfo,
                roles: action.payload.roles,

            };
        case GET_INFO_ADMIN:
            return {
                ...state,
                adminInfo: action.payload.adminInfo,
                roles: action.payload.roles,
            };
        case ADMIN_LOGOUT:
            return {
                ...state,
                adminInfo: [],
                roles: []
            };
        default:
            return state;
    }
};

export default adminReducer;

