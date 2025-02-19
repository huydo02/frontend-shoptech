import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { BsMenuButtonWide } from "react-icons/bs";
import Cart from "../Cart/Cart";

import { FaUser } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
// import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authLogout, authRegister, getUserInfo } from "../../../../actions/auth";
import { emptyCart } from "../../../../actions/cart";

// import Swal from 'sweetalert2'
import { AlertError, AlertSuccess } from "../Alert.js/Alert-top-right";
import { BuildOutlined, CloseOutlined, PhoneOutlined } from "@ant-design/icons";
import { getCartItem } from "../../../../actions/cart";
import LogoHeader from "./logo";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import Bill from "./bill";
import { Alert } from "antd";

// or via CommonJS
function Header() {

    const [modalState, setModalState] = useState({
        modal: false,
        modalLogin: false,
        modalRegister: false
    });
    // const Swal = require('sweetalert2');
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo || []); // Tránh lỗi khi `cartItem` là null
    const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
    const [errors, setErrors] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmitLogin = (event) => {
        event.preventDefault();
        const data = {
            email: formData.email,
            password: formData.password,
        };

        dispatch(authLogin(data)).then((response) => {
            if (response.status === "success") {
                setModalState((prevState) => ({ ...prevState, modal: false, modalLogin: false }));
                AlertSuccess(response.message);
                navigate(location.pathname);
                dispatch(getCartItem());
            } else {
                setErrors(response.message);
                // AlertError(response.message); // Hiển thị alert nếu có lỗi
            }
        });
    };
    const handleSubmitRegister = (event) => {
        event.preventDefault();
        const data = {
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
        };

        dispatch(authRegister(data)).then((response) => {
            if (response.status === "success") {
                setModalState((prevState) => ({ ...prevState, modal: false, modalRegister: false }));
                dispatch(getCartItem());
                AlertSuccess(response.message);
                navigate(location.pathname);
            } else {
                AlertError("Lỗi hệ thống. Đăng ký thành công!");
            }
        });
    };
    const handleLogout = () => {
        dispatch(authLogout()).then((response) => {
            if (response.status === "success") {
                AlertSuccess(response.message);
                navigate("/");
            } else {
                AlertError("Lỗi hệ thống. Đăng xuất không thành công!");
            }
        });
        dispatch(emptyCart())
        AlertSuccess("Đăng xuất thành công."); // Hiển thị alert nếu đăng nhập thành công
        navigate('/');
    }
    const ModalLogin = () => {
        setModalState({ modal: true, modalLogin: true, modalRegister: false });
    };

    const ModalRegister = () => {
        setModalState({ modal: true, modalLogin: false, modalRegister: true });
    };

    const closeModal = () => {
        setModalState({ modal: false, modalLogin: false, modalRegister: false });
    };

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    console.log('location.pathname', location.pathname);
    return (
        <>
            <header className="main-header">
                <div className="main-header">
                    <div className="container-fluid">
                        <div className="row-header">
                            <div className="coll-header main-header--left">
                                <LogoHeader />
                                <Menu />
                            </div>
                            <div className="header-action header--right">
                                <SearchBar />
                                <div className="main-header--info">
                                    <div className="header-action_text">
                                        <Link to="/build" className="header-action__link">
                                            <span className="box-icon">
                                                {/* <PhoneOutlined  /> */}
                                                <BuildOutlined style={{ fontSize: 20 }} />
                                            </span>
                                            <span className="box-text">
                                                <span className="txtnw">xây dựng</span>
                                                <span className="txtbl">
                                                    <span className="txt-overflow">
                                                        <span>cấu hình</span>
                                                    </span>
                                                </span>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <Bill />
                                <Cart />
                                <div className="main-header--info">
                                    <div className="header-action_text">
                                        <Link href="" className="header-action__link-account">
                                            <span className="box-icon">
                                                <span className="material-symbols-outlined">
                                                    <FaUser />
                                                </span>
                                            </span>

                                            {userInfo?._id ? (
                                                <span className="box-text">
                                                    <span className="txtnw">{userInfo.fullName}</span>
                                                </span>
                                            ) : (
                                                <span className="box-text">
                                                    <span className="txtnw">Đăng</span>
                                                    <span className="txtbl">
                                                        <span className="txt-overflow">
                                                            <span>nhập</span>
                                                        </span>
                                                    </span>
                                                </span>
                                            )}
                                        </Link>
                                        {userInfo?._id ? (
                                            <div className="header-action_dropdown auth">
                                                <div className="header-dropdown-cover">
                                                    <div className="greeting">
                                                        <div className="thing">
                                                            <div className="thing-img">
                                                                <span className="material-symbols-outlined">
                                                                    <MdOutlineWavingHand />
                                                                </span>
                                                            </div>
                                                            <div className="thing-name">
                                                                Xin chào {userInfo.fullName},
                                                            </div>
                                                        </div>

                                                        <div className="action">

                                                            <button type="button" onClick={() => handleLogout()} id="login-btn">ĐĂNG XUẤT</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="header-action_dropdown auth">
                                                <div className="header-dropdown-cover">
                                                    <div className="greeting">
                                                        <div className="thing">
                                                            <div className="thing-img">
                                                                <span className="material-symbols-outlined">
                                                                    <MdOutlineWavingHand />
                                                                </span>
                                                            </div>
                                                            <div className="thing-name">
                                                                Xin chào, vui lòng đăng nhập
                                                            </div>
                                                        </div>

                                                        <div className="action">
                                                            <button onClick={() => ModalLogin()} type="button" id="login-btn">ĐĂNG NHẬP</button>
                                                            <button onClick={() => ModalRegister()} type="button" id="signup-btn">ĐĂNG KÝ</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                {/* <div className={"modal" + ()}> */}

                <div className={"modal" + (modalState.modal === false ? "d-none" : "")}>
                    <div className="modal-dialog modal-dialog-centered modal-md">
                        <div className={"content-modal-login " + (modalState.modalLogin === false ? "d-none" : "")}>
                            <div className="modal-header">
                                <span className="title-modal">đăng nhập</span>
                                <button onClick={() => { closeModal() }} id="close-modal-login">
                                    <span className="material-symbols-outlined">
                                        <CloseOutlined />
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {errors !== "" && (
                                    <Alert style={{ marginBottom: 15 }} message={errors} type="error" showIcon closable />

                                )}

                                <form onSubmit={handleSubmitLogin} id="login">
                                    <div className="input-group">

                                        <input type="text" className="text-field"
                                            value={formData.email} name="email" id="email"
                                            onChange={handleChange}
                                            required />
                                        <label htmlFor="" className="labelline">Email đăng nhập</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="text-field" id="password"
                                            name="password" value={formData.password} onChange={handleChange} required />
                                        <label htmlFor="" className="labelline">Mật khẩu</label>

                                    </div>

                                    <div className="input-group">
                                        <Link to="/forgot-Password" onClick={() => (setModalState((prevState) => ({ ...prevState, modal: false, modalLogin: false })))} className="forgot-password">Quên mật khẩu?</Link>
                                    </div>
                                    <button type="submit" className="btn-login">Đăng nhập</button>
                                </form>


                            </div>
                            <div className="modal-footer">
                                <span>Bạn chưa có tài khoản?<button style={{ color: '#E30019', marginLeft: 5 }} onClick={() => ModalRegister()} id="show-signup"> Đăng ký ngay.</button></span>
                            </div>
                            {/* {{-- form đăng ký --}} */}

                        </div>
                        <div className={"content-modal-register " + (modalState.modalRegister === false ? "d-none" : "")}>
                            <div className="modal-header">
                                <span className="title-modal">đăng ký</span>
                                <button onClick={() => { closeModal() }} id="close-modal-login">
                                    <span className="material-symbols-outlined">
                                        <CloseOutlined />
                                    </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h1 id="errors-register"></h1>

                                <form onSubmit={handleSubmitRegister} id="register">
                                    <div className="input-group">
                                        <input type="text" className="text-field"
                                            value={formData.fullName} name="fullName" id="name_register" onChange={handleChange} required />
                                        <label htmlFor="" className="labelline">Họ và tên</label>

                                    </div>
                                    <div className="input-group">
                                        <input type="text" className="text-field"
                                            value={formData.email} name="email" id="email_register" onChange={handleChange} required />
                                        <label htmlFor="" className="labelline">Email</label>
                                    </div>
                                    <div className="input-group">
                                        <input type="password" className="text-field"
                                            value={formData.password} id="password_signup" name="password" onChange={handleChange} required />
                                        <label htmlFor="" className="labelline">Mật khẩu</label>

                                    </div>
                                    <button type="submit" className="btn-login">Tạo tài khoản</button>
                                </form>


                            </div>
                            <div className="modal-footer">
                                <span>Bạn đã có tài khoản?<button style={{ color: '#E30019', marginLeft: 5 }} onClick={() => ModalLogin()} id="show-login"> Đăng nhập ngay.</button></span>
                            </div>
                            {/* {{-- form đăng ký --}} */}

                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}

export default Header;