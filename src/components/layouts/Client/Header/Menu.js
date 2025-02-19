import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MenuOutlined } from "@ant-design/icons";
import { FaChevronRight } from 'react-icons/fa';

const Menu = () => {
    const [data, setData] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const fetchApi = async () => {
            await fetch("http://https://backend-shoptech.onrender.com//menu")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                })
        }
        fetchApi()

    }, []);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        // Lắng nghe sự kiện click trên document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup khi component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="header-action" ref={menuRef}>
                <div className="main-header--info">
                    <div className="header-action_text">
                        <Link href="" className="header-action__menu" id="site-menu-handle" onClick={() => setOpenMenu(!openMenu)}>
                            <span className="box-icon">
                                <span className="material-symbols-outlined">
                                    <MenuOutlined />
                                </span>
                            </span>
                            <span className="box-text">
                                <span className="txtnw">Danh mục</span>
                            </span>
                        </Link>
                    </div>
                    {/* menu */}

                    <div className={`header-action_boxfull menu-desktop ${openMenu ? '' : 'd-none'} `} id="menu-desktop-ajax">
                        <div className="sidebar-menu" id="sidebar-menu-ajax">
                            <nav className="megamenu-nav">
                                <ul className="megamenu-nav-main">
                                    {data ? (
                                        data.map(item => (
                                            <li className="megamenu-item" key={item._id}>
                                                <Link href="" className="megamenu-link">

                                                    <span className="megamenu-name">
                                                        {item.title}
                                                    </span>
                                                    <span className="megamenu-ic-right">
                                                        <span className="material-symbols-outlined">
                                                            <FaChevronRight style={{ fontSize: 11 }} />
                                                        </span>
                                                    </span>
                                                </Link>
                                                {item?.children ? (
                                                    <div className="megamenu-content absolute-center level0 xlab_grid_container" >
                                                        <div className="column xlab_column_5_5">
                                                            <div className="sub-megamenu-item">
                                                                <Link className="sub-megamenu-item-name" href="#">Hãng sản
                                                                    xuất
                                                                </Link>
                                                                {item.children.map(childs => (
                                                                    <Link to={`/products/${childs.slug}`}
                                                                        className="sub-megamenu-item-filter" key={childs._id}>
                                                                        {childs.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </li>

                                        ))
                                    ) : (
                                        <h1>oke</h1>
                                    )}

                                </ul>
                            </nav>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Menu