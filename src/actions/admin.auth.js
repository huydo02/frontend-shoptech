import { AUTH_LOGIN, GET_INFO_ADMIN, AUTH_LOGOUT } from "./type";
import Cookies from "js-cookie";

export const adminLogin = (data) => async (dispatch) => {
    try {
        const result = await fetch(`https://backend-shoptech.onrender.com//admin/auth/login`, {
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
                adminInfo: result.info,
                roles: result.roles,
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

export const adminLogout = () => async (dispatch) => {
    try {
        Cookies.remove("token");

        // Kiểm tra API trả gì về
        dispatch({
            type: AUTH_LOGOUT,
            payload: {
                adminInfo: [],
                roles: [],
                message: "Đã đăng xuất thành công",
                status: "success",
            },
        });
        // Trả về result để sử dụng ở nơi gọi
        return { status: "success", message: "Đã đăng xuất thành công" };;
    } catch (error) {
        console.error("Lỗi khi đăng xuất", error);
        return { status: "error", message: "Đã xảy ra lỗi khi đăng xuất" }; // Trả lỗi nếu có
    }
};
export const getAdminInfo = () => async (dispatch) => {
    try {
        const result = await fetch(`https://backend-shoptech.onrender.com//admin/auth/info`, {
            method: "GET",
            credentials: "include",
        })
            .then(res => res.json())
            .then(res => { return res });
        // const result = await response.json();

        console.log("Response from API Login:", result); // Kiểm tra API trả gì về
        dispatch({
            type: GET_INFO_ADMIN,
            payload: {
                // cart: result.cart,
                adminInfo: result.info,
                roles: result.roles,
                message: result.message,
                status: result.status
            }, // Đảm bảo result.cart tồn tại
        });
    } catch (error) {
        console.error("người dùng chưa đăng nhập:", error);
    }
};