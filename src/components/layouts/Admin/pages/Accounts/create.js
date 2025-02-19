import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import Error from '../../NotPermission/Error';
import { Alert, Button, Form, Input, InputNumber, Radio, Select, TreeSelect } from 'antd';
// import items from '../../Main-Menu/data.menu';
const AccountsCreate = () => {
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const role = useSelector((state) => state.admin.roles || {});
    const fetchApi = async () => {
        await fetch('http://https://backend-shoptech.onrender.com//admin/roles/getpermissions')
            .then(res => res.json()
                .then(data => {
                    setPermissions(data.dataPermisstions);
                    setLoading(!loading);
                })
            )
    }
    useEffect(() => {
        fetchApi();
    }, [])
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const res = await fetch("http://https://backend-shoptech.onrender.com//admin/accounts/create", {
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
            } else {
                // AlertError("Lỗi")
                setError(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (role.permissions.includes("accounts-create") === false) {
        return (
            <Error />
        );
    }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Thêm Tài khoản Mới</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="form-input" >
                        {error !== '' ? (
                            <Alert message={error} type="error" showIcon />
                        ) : (
                            null
                        )}

                        <Form
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            style={{
                                maxWidth: '100%',
                                marginTop: 10
                            }}
                            onFinish={onFinish}
                            layout="horizontal"
                        >
                            <Form.Item
                                label="Tên tài khoản"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên tài khoản',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập email',
                                    },
                                ]}
                            >
                                <Input type='email' />
                            </Form.Item>

                            <Form.Item
                                label="Chọn quyền"
                                name="role_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng quyền',
                                    },
                                ]}
                            >
                                <Select>
                                    {permissions?.map((item) => (
                                        <Select.Option value={item._id}>{item.title}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Điện thoại"
                                name="phone"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu"
                                name="password"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item label="Trạng thái" name="status" initialValue="active">
                                <Radio.Group>
                                    <Radio value="active"> Hoạt động </Radio>
                                    <Radio value="inactive"> Không hoạt động </Radio>
                                </Radio.Group>
                            </Form.Item>


                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Thêm tài khoản
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccountsCreate