import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Link, Outlet, useNavigate } from "react-router-dom";
import MenuSidebar from "./Main-Menu/Menu-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminInfo } from "../../../actions/admin.auth";
import Lottie from 'lottie-react';
import loadingAnimation from '../../loading/loading.json';
import '../../../asset/admin.css'
// import '../../../asset/js'

const Admin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const adminInfo = useSelector((state) => state.admin.adminInfo || {});

    useEffect(() => {
        dispatch(getAdminInfo()).finally(() => setLoading(false));
    }, [dispatch]);

    useEffect(() => {
        if (!loading && !adminInfo.token) {
            navigate('/admin/auth/login', { replace: true });
        }
    }, [loading, adminInfo, navigate]);


    if (loading || (!loading && !adminInfo.token)) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Lottie animationData={loadingAnimation} style={{ background: '#f6f6f6', width: 150 }} loop />
            </div>
        );
    }

    return (
        <div className="mainBody-theme">
            <div className="site-overlay" id="over-background"></div>
            <div className="mainBody-theme-container">
                <div className="content-admin-left">
                    <MenuSidebar />
                </div>
                <div className="content-admin-right">
                    <Header />
                    <main className="wrapperMain_content">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Admin;
