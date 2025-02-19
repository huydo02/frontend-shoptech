import React from 'react';

import { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AiOutlineProduct } from "react-icons/ai";
import items from './data.menu';
const MenuSidebar = () => {
    const navigate = useNavigate()
    const onClick = ({ key }) => {
        // console.log('click ', e);
        navigate(key)
    };
    return (
        <div className="wrapper-content-left">
            <div className="header-main-menu">
                <div className="user-panel">
                    <div className="img-user">
                        <img src="https://t4.ftcdn.net/jpg/04/75/00/99/360_F_475009987_zwsk4c77x3cTpcI3W1C1LU4pOSyPKaqi.jpg" alt="" />
                    </div>
                    <div className="user-name">
                        <Link to="/admin/dashboard">

                            Admin Huydo
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content-main-menu flex-1">
                <Menu
                    onClick={onClick}
                    style={{ width: '100%', height: '100vh' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
        </div>
    )
}

export default MenuSidebar