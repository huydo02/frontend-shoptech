import { AUTH_LOGIN, GET_INFO_USER, AUTH_REGISTER, AUTH_LOGOUT } from "./type";

export const authLogin = (data) => async (dispatch) => {
    try {
        const result = await fetch(`http://https://backend-shoptech.onrender.com//auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => { return res });

        console.log("Response from API Login:", result); // Kiểm tra API trả gì về
        dispatch({
            type: AUTH_LOGIN,
            payload: {
                userInfo: result.userInfo,
                message: result.message,
                status: result.status,
            },
        });

        // Trả về result để sử dụng ở nơi gọi
        return result;
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        return { status: "error", message: "Đã xảy ra lỗi khi đăng nhập" }; // Trả lỗi nếu có
    }
};
export const authRegister = (data) => async (dispatch) => {
    try {
        const result = await fetch(`http://https://backend-shoptech.onrender.com//auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => { return res });

        console.log("Response from API Login:", result); // Kiểm tra API trả gì về
        dispatch({
            type: AUTH_REGISTER,
            payload: {
                userInfo: result.userInfo,
                message: result.message,
                status: result.status,
            },
        });
        // Trả về result để sử dụng ở nơi gọi
        return result;
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        return { status: "error", message: "Đã xảy ra lỗi khi đăng ký" }; // Trả lỗi nếu có
    }
};

export const authLogout = () => async (dispatch) => {
    try {
        const result = await fetch(`http://https://backend-shoptech.onrender.com//auth/logout`, {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(res => { return res });

        console.log("Response from API Logout:", result); // Kiểm tra API trả gì về
        dispatch({
            type: AUTH_LOGOUT,
            payload: {
                userInfo: [],
                message: result.message,
                status: result.status,
            },
        });
        // Trả về result để sử dụng ở nơi gọi
        return result;
    } catch (error) {
        console.error("Lỗi khi đăng xuất", error);
        return { status: "error", message: "Đã xảy ra lỗi khi đăng xuất" }; // Trả lỗi nếu có
    }
};
export const getUserInfo = () => async (dispatch) => {
    try {
        const result = await fetch(`http://https://backend-shoptech.onrender.com//auth/info`, {
            method: "GET",
            // headers: {
            //     "Content-Type": "application/json",
            // },
            credentials: "include",
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();

        console.log("Response from API Login:", result); // Kiểm tra API trả gì về
        dispatch({
            type: GET_INFO_USER,
            payload: {
                // cart: result.cart,
                userInfo: result.userInfo,
                message: result.message,
                status: result.status
            }, // Đảm bảo result.cart tồn tại
        });
    } catch (error) {
        console.error("người dùng chưa đăng nhập:", error);
    }
};