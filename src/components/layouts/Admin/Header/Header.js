import { Button, Dropdown, Flex } from 'antd';
import React from 'react'
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../../../actions/admin.auth';
import { AlertError, AlertSuccess } from '../../Client/Alert.js/Alert-top-right';
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMenu = () => {
        const openMenusibar = document.getElementsByClassName('content-admin-left');
        const overlay = document.getElementById('over-background');
        if (openMenusibar.length > 0) {
            // Lấy phần tử đầu tiên và thêm class
            openMenusibar[0].classList.add('open-megamenu');
            overlay.classList.add('active')
        }
        overlay.addEventListener('click', () => {
            // Xóa các class khi overlay được nhấn
            openMenusibar[0].classList.remove('open-megamenu');
            overlay.classList.remove('active');
        });
    };
    const handleLogout = () => {
        dispatch(adminLogout()).then((response) => {
            if (response.status === "success") {
                AlertSuccess(response.message);
                navigate("/admin/auth/login");
            } else {
                AlertError("Lỗi hệ thống. Đăng xuất không thành công!");
            }
        });
    }
    const items = [
        {
            key: '1',
            label: (
                <Link to="/admin/info" rel="noopener noreferrer">
                    <UserOutlined style={{ marginRight: 5 }} />Thông tin cá nhân
                </Link>
            ),
        },

        {
            key: '3',
            label: (
                <Flex justify={'center'} align={'center'}>
                    <Button danger onClick={() => handleLogout()}>
                        Đăng xuất
                    </Button>
                </Flex>
            ),
        },
    ];
    return (
        <>
            <header className="admin-main-header">
                <div className="container-fluid" style={{ borderLeft: '1px solid f0f0f0' }}>
                    <div className="top-header d-flex">
                        <div className="top-header-left">
                            <div className="header-action">
                                <div className="header-adm-action" id="open-menu" onClick={() => handleMenu()}>
                                    <a href="#" className="text-header">
                                        <span className="material-symbols-outlined">
                                            <MenuOutlined />
                                        </span>
                                    </a>
                                </div>
                            </div>

                        </div>
                        <div className="top-header-right">
                            {/* <div className="header-action">
                                <div className="header-adm-action">
                                    <a href="#" className="text-header">
                                        <span className="material-symbols-outlined">
                                            forum
                                        </span>
                                        <span className="badge badge-warning">
                                            10
                                        </span>
                                    </a>
                                </div>
                            </div> */}
                            {/* <div className="header-action">
                                <div className="header-adm-action">
                                    <a href="#" className="text-header" id="open-menu-notifications">
                                        <span className="material-symbols-outlined">
                                            <IoIosNotificationsOutline />
                                        </span>
                                        <span className="badge badge-error">
                                            10
                                        </span>
                                    </a>
                                </div>
                            </div> */}
                            {/* <div className="dropdown-notifications">
                                <div className="dropdown-item title-notifi">
                                    10 thông báo
                                </div>
                                <div className="dropdown-item">
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                    <div className="content-notifi">
                                        <a href="#" className="d-flex flex-space ">
                                            <span className="material-symbols-outlined">
                                                new_window
                                            </span>
                                            <h1>1 Đơn hàng mới</h1>
                                            <h2>3 phút trước</h2>
                                        </a>

                                    </div>
                                </div>
                            </div> */}
                            <div className="header-action">
                                <div className="header-adm-action">
                                    <Link to="#" className="text-header">
                                        <span className="material-symbols-outlined">
                                            <span className="material-symbols-outlined">
                                                <Dropdown
                                                    menu={{
                                                        items,
                                                    }}
                                                    placement="bottomRight"
                                                    arrow
                                                >
                                                    <IoSettingsOutline />

                                                </Dropdown>
                                            </span>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header