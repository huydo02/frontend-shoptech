import { useParams } from 'react-router'
import React, { useState } from 'react'
import { Alert, Button, Form, Input } from 'antd';
import { AlertSuccess } from '../Alert.js/Alert-top-right';
import { useNavigate } from 'react-router';
const Otp = () => {
    const param = useParams().email;
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const res = await fetch("http://https://backend-shoptech.onrender.com//auth/password/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (data.status === "success") {
                AlertSuccess(data.message)
                navigate(`/forgot-Password/reset-password`);
            } else {
                // AlertError("Lỗi")
                setError(data.message);
            }
        } catch (error) {
            // console.log(error);
            setError(error);

        }
    };
    return (
        <>
            <div className="cart-layout" id="cart-page" style={{ padding: '20px 0', minHeight: '500px', }}>
                <div className="cart-wrapper">
                    <div className="container-fluid">
                        <div className="cart-main">
                            <section className="section-steps">
                                <div className="checkout-steplist status" style={{ fontSize: 18 }}>
                                    <b>Nhập mã OTP</b>
                                </div>
                            </section>
                            <div className="cart-infos" style={{ padding: 10 }}>
                                <Alert message="Vui lòng nhập email chính xác để lấy mã OTP thông qua email" type="info" showIcon closeIcon />
                                {error !== "" ? (
                                    <Alert style={{ marginTop: 10 }} message={error} type="error" showIcon closeIcon />
                                ) : (
                                    null
                                )}
                                <Form
                                    name="basic"
                                    labelCol={{
                                        span: 5,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                    style={{
                                        maxWidth: 600,
                                        padding: '15px 0',
                                    }}

                                    onFinish={onFinish}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        initialValue={param || null}
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                            },
                                        ]}
                                    >
                                        <Input type='email' />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mã OTP"
                                        name="otp"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập mã OTP!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={null}>
                                        <Button type="primary" htmlType="submit">
                                            Xác Nhận
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otp