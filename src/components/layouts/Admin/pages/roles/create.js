import React from 'react'
import { useSelector } from 'react-redux';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import Lottie from 'lottie-react';
import animation from '../../../../loading/animation.json'
import Error from '../../NotPermission/Error';
const { TextArea } = Input;

const RoleCreate = () => {
    const role = useSelector((state) => state.admin.roles || {});
    const onFinish = async (values) => {
        // console.log('Success:', values);
        try {
            const res = await fetch("https://backend-shoptech.onrender.com//admin/roles/create", {
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
                AlertError("Lỗi")
            }
        } catch (error) {
            console.log(error);
        }
    };
    if (role.permissions.includes("roles-create") === false) {
        return (
            <Error />
        );
    }

    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Thêm Quyền</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="form-input" >
                        <Alert
                            message="Lưu ý khi nhập."
                            description="Vui lòng nhập Tên Quyền và Mô Tả phù hợp với chức năng mà bạn sẽ lựa chọn"
                            type="info"
                            showIcon
                            closable
                        />
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
                                label="Tên quyền"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên quyền!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả quyền"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả quyền!',
                                    },
                                ]}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Thêm quyền
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RoleCreate