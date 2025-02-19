

// export default cartReduce;
import { ADD_TO_CART, GET_CART_ITEM, REMOVE_CART_ITEM, UPDATE_CART_ITEM, EMPTY_CART } from "../actions/type";

const initialState = {
    cartItems: [],
    totalQuantity: 0, // Chỉ lưu tổng số lượng
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalQuantity: action.payload.cart, // Lưu giá trị "cart" từ API
            };
        case GET_CART_ITEM: // Cả hai hành động đều cập nhật tổng số lượng
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalQuantity: action.payload.cart, // Lưu giá trị "cart" từ API
            };
        case UPDATE_CART_ITEM:
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalQuantity: action.payload.cart, // Lưu giá trị "cart" từ API
            };
        case REMOVE_CART_ITEM: // Cả hai hành động đều cập nhật tổng số lượng
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalQuantity: action.payload.cart, // Lưu giá trị "cart" từ API
            };
        case EMPTY_CART: // Cả hai hành động đều cập nhật tổng số lượng
            return {
                ...state,
                cartItems: action.payload.cartItems,
                totalQuantity: action.payload.cart, // Lưu giá trị "cart" từ API
            };
        default:
            return state;
    }
};

export default cartReducer;

