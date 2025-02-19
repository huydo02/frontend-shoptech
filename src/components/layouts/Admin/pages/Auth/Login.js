import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import '../../../../../asset/auth.admin.css';
import { AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, getAdminInfo } from '../../../../../actions/admin.auth';
import { useNavigate, useLocation } from 'react-router';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../../loading/loading.json';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); // Lấy đường dẫn hiện tại
    const adminInfo = useSelector((state) => state.admin.adminInfo || {});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Gọi API để lấy thông tin admin khi trang load
    useEffect(() => {
        dispatch(getAdminInfo()).finally(() => setLoading(false)); // Hoàn tất việc kiểm tra thì ngừng loading
    }, [dispatch]);

    // Điều hướng khi đã đăng nhập
    useEffect(() => {
        if (adminInfo.token && location.pathname === '/admin/auth/login') {
            // Chỉ điều hướng về dashboard nếu đang ở trang login
            navigate('/admin/dashboard');
        }
    }, [adminInfo, navigate, location]);

    // Xử lý submit form đăng nhập
    const onFinish = async (values) => {
        dispatch(adminLogin(values)).then((response) => {
            if (response.status === 'success') {
                AlertSuccess(response.message);
                navigate('/admin/dashboard');
            } else {
                setError(response.message);
            }
        });
    };

    // Nếu đang loading, hiển thị animation loading
    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Lottie animationData={loadingAnimation} style={{ width: 150 }} loop />
            </div>
        );
    }

    // Nếu không có token và loading đã hoàn tất, hiển thị form đăng nhập
    return (
        <div className="wrap-content">
            <div className="title">
                <h1>Admin Login</h1>
            </div>
            <div className="login-admin">
                {error && <h1 style={{ color: 'red', padding: "10px 0", textAlign: 'center' }}>{error}</h1>}
                <Form
                    name="basic"
                    labelCol={{
                        span: 5,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: '100%',
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email!',
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{
                            display: 'grid',
                            justifyContent: 'center',
                        }}
                    >
                        <Button style={{ Width: 500 }} type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
