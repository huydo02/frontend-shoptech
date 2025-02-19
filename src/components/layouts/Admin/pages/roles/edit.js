import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import Error from '../../NotPermission/Error';
import { useParams } from 'react-router';
const { TextArea } = Input;
const RoleEdit = () => {
    const id = useParams();
    // console.log('params', id.id);
    const [form] = Form.useForm();
    const role = useSelector((state) => state.admin.roles || {});
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        // Giả sử bạn gọi API để lấy dữ liệu từ DB
        const fetchData = async () => {
            try {
                const data = await fetch(`http://https://backend-shoptech.onrender.com//admin/roles/edit/${id.id}`);
                const result = await data.json();

                // Cập nhật giá trị form với dữ liệu từ DB
                if (result.status === 'success') {
                    // console.log(result.data.title)
                    form.setFieldsValue({
                        title: result.data.title,
                        description: result.data.description,
                    });
                } else {
                    AlertError(result.message);
                }
                setLoading(false);
            } catch (error) {
                console.log(error)
            }

        };

        fetchData();
    }, [form]);
    const onFinish = async (values) => {
        // console.log('Success:', values);
        try {
            const res = await fetch(`http://https://backend-shoptech.onrender.com//admin/roles/edit/${id.id}`, {
                method: "PATCH",
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
    if (role.permissions.includes("roles-edit") === false) {
        return (
            <Error />
        );
    }
    return (
        <>

            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Sửa Quyền</h1>
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
                            form={form}
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
                        // initialValues={{
                        //     title: "Tên quyền lấy từ DB",
                        //     description: "ádasdas"// Đây là giá trị từ DB
                        // }}
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
                                    Cập nhật quyền
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RoleEdit