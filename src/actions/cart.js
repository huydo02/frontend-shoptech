import { ADD_TO_CART, GET_CART_ITEM, UPDATE_CART_ITEM, REMOVE_CART_ITEM, EMPTY_CART } from "./type";
export const addToCart = (data) => async (dispatch) => {
    try {
        const result = await fetch(`https://backend-shoptech.onrender.com/cart/add/${data.productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();

        console.log("Response from API:", result); // Kiểm tra API trả gì về
        dispatch({
            type: ADD_TO_CART,
            payload: {
                cart: result.cart,
                cartItems: result.cartItems,
                message: result.message
            }, // Đảm bảo result.cart tồn tại
        });
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
    }
};


export const getCartItem = () => async (dispatch) => {
    try {
        const result = await fetch("https://backend-shoptech.onrender.com/cart/cartQuantity", {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();
        console.log(result.cart)
        dispatch({
            type: GET_CART_ITEM,
            payload: {
                cart: result.cart,
                cartItems: result.cartItems,
                message: result.message
            },
        });
        return result;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm từ giỏ:", error);
    }
};


export const updateCart = (data) => async (dispatch) => {
    try {
        const result = await fetch(`https://backend-shoptech.onrender.com/cart/update/${data.productId}/${data.quantity}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();

        console.log("Response from API:", result); // Kiểm tra API trả gì về
        dispatch({
            type: UPDATE_CART_ITEM,
            payload: {
                cart: result.cart,
                cartItems: result.cartItems,
                message: result.message
            }, // Đảm bảo result.cart tồn tại
        });
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
    }
};


export const removeCart = (productId) => async (dispatch) => {
    try {
        const result = await fetch(`https://backend-shoptech.onrender.com/cart/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            // body: JSON.stringify(productId),
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();

        console.log("Response from API:", result); // Kiểm tra API trả gì về
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: {
                cart: result.cart,
                cartItems: result.cartItems,
                message: result.message
            }, // Đảm bảo result.cart tồn tại
        });
        return result;
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error);
    }
};
export const emptyCart = () => async (dispatch) => {
    try {

        // Kiểm tra API trả gì về
        dispatch({
            type: EMPTY_CART,
            payload: {
                cart: 0,
            },
        });
        return { status: "success", message: "xóa cart thành công" };;
    } catch (error) {
        console.error("Lỗi xóa cart", error);
        return { status: "error", message: "Đã xảy ra lỗi" }; // Trả lỗi nếu có
    }
};