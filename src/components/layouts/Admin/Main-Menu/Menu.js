import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChartColumn } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
// import './menu-js'
import menus from './data.menu';
const Menu = () => {
    // console.log(menus)
    const [activeMenus, setActiveMenus] = useState(null); // Trạng thái lưu menu mở

    const handleMenuToggle = (key) => {
        setActiveMenus((prev) => (prev === key ? null : key)); // Đóng menu nếu đang mở, ngược lại active menu mới
    };
    return (
        <>
            <div className="wrapper-content-left">
                <div className="header-main-menu">
                    <div className="user-panel">
                        <div className="img-user">
                            <img src="{{ asset('assets/images/admin/huydo.jpg') }}" alt="" />
                        </div>
                        <div className="user-name">
                            <Link href="{{ route('admin.dashboard') }}">
                                {/* {{ Auth::guard('admin')->user()->name }} */}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="content-main-menu flex-1">
                    <nav className="">
                        <h3>MAIN</h3>
                        <ul className="nav-sidebar flex-1" id="show-list-menu">
                            {menus?.map((menu) => (
                                <li
                                    className={`nav-item ${activeMenus === menu.key ? "active" : ""}`} // Thêm class active khi menu đang mở
                                    key={menu.key}
                                >
                                    <Link
                                        to="#"
                                        className="menu-link"
                                        onClick={() => handleMenuToggle(menu.key)}
                                    >
                                        <span className="menu-icon">
                                            <span className="material-symbols-outlined">{menu.icon}</span>
                                        </span>
                                        <span className="menu-name">{menu.name}</span>
                                        {menu.children && (
                                            <span className="megamenu-ic-right">
                                                <FaChevronRight />
                                            </span>
                                        )}
                                    </Link>
                                    {menu.children && activeMenus === menu.key && (
                                        <ul className="nav-treeview">
                                            {menu.children.map((submenu) => (
                                                <li className={`nav-item ${activeMenus === submenu.key ? "active" : ""}`} key={submenu.key}>
                                                    <Link to={submenu.path} className="menu-link">
                                                        <span className="menu-icon">
                                                            <span className="material-symbols-outlined">
                                                                {submenu.icon}
                                                            </span>
                                                        </span>
                                                        <span className="menu-name">{submenu.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}

                            {/* <li className="nav-item">
                                <a href="#" className="menu-link">
                                    <span className="menu-icon">
                                        <span className="material-symbols-outlined">
                                            widgets
                                        </span>
                                    </span>
                                    <span className="menu-name">Categories</span>

                                    <span className="megamenu-ic-right">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </span>
                                </a>
                                <ul className="nav-treeview">
                                    <li className="nav-item">
                                        <a href="{{ route('admin.add-company') }}" className="menu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span>
                                            </span>
                                            <span className="menu-name">Add company</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="{{ route('admin.add-category') }}" className="menu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span>
                                            </span>
                                            <span className="menu-name">Add Category</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="{{ route('admin.add-category') }}" className="menu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    list
                                                </span>
                                            </span>
                                            <span className="menu-name">List Category</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item ">
                                <a href="#" className="menu-link">
                                    <span className="menu-icon">
                                        <span className="material-symbols-outlined">
                                            inventory_2
                                        </span>
                                    </span>
                                    <span className="menu-name">Products</span>
                                    <span className="megamenu-ic-right">
                                        <span className="material-symbols-outlined">
                                            chevron_right
                                        </span>
                                    </span>
                                </a>
                                <ul className="nav-treeview">
                                    <li className="nav-item">
                                        <a href="{{ route('admin.add-product') }}" className="menu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    add
                                                </span>
                                            </span>
                                            <span className="menu-name">Add Product</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="{{ route('admin.list-products') }}" className="menu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">
                                                    list
                                                </span>
                                            </span>
                                            <span className="menu-name">List Products</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item" id="menu-item-1">
                                <a href="#" className="menu-link">
                                    <span className="menu-icon">
                                        <span className="material-symbols-outlined">
                                            error
                                        </span>
                                    </span>
                                    <span className="menu-name">Contact</span>
                                    <span className="megamenu-ic-right">
                                        <span className="material-symbols-outlined">chevron_right</span>
                                    </span>
                                </a>
                                <ul className="nav-treeview">
                                    <li className="nav-item" id="submenu-item-1">
                                        <a href="" className="menu-link submenu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">dashboard</span>
                                            </span>
                                            <span className="menu-name">Submenu 1</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" id="submenu-item-2">
                                        <a href="page2.html" className="menu-link submenu-link">
                                            <span className="menu-icon">
                                                <span className="material-symbols-outlined">dashboard</span>
                                            </span>
                                            <span className="menu-name">Submenu 2</span>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                        </ul>
                    </nav>
                </div>
                <div className="content-main-menu">
                    <nav className="">
                        <h3>SETTING</h3>
                        <ul className="nav-sidebar" id="show-list-menu">
                            <li className="nav-item">
                                <a href="{{ route('admin.setting') }}" className="menu-link">
                                    <span className="menu-icon">
                                        <span className="material-symbols-outlined">
                                            settings
                                        </span>
                                    </span>
                                    <span className="menu-name">setting</span>
                                </a>
                            </li>
                        </ul>

                        <h3>ACCOUNT</h3>
                        <ul className="nav-sidebar" id="show-list-menu">
                            <li className="nav-item">
                                <a href="#" className="menu-link"
                                    onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                    <span className="menu-icon">
                                        <span className="material-symbols-outlined">
                                            logout
                                        </span>
                                    </span>
                                    <span className="menu-name">logout</span>
                                </a>
                                <form id="logout-form" action="{{ route('admin.logout') }}" method="POST"
                                    className="d-none">
                                    @csrf
                                </form>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Menu