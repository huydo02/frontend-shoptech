import adminReducer from "./admin";
import authReducer from "./auth";
import CartReducer from "./cart";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    cart: CartReducer,
    auth: authReducer,
    admin: adminReducer
});

export default allReducers;
