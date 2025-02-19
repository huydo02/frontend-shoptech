import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import Error from '../../NotPermission/Error';
import { Alert, Button, Checkbox, Form, Input, InputNumber, Radio, TreeSelect } from 'antd';
import { useParams } from 'react-router';
const { TextArea } = Input;

const EditCategory = () => {
    const idCategory = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const role = useSelector((state) => state.admin.roles || {});
    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/admin/list-category/edit/${idCategory.id}`);
            const data = await response.json();
            if (data.status === 'success') {
                console.log(data.categories)
                setCategories(data.categories);
                setLoading(false);
                form.setFieldsValue({
                    title: data.value.title,
                    description: data.value.description,
                    position: data.value.position,
                    status: data.value.status,
                    parent_id: data.value.parent_id,
                });

            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);
    const convertToTreeData = (categories) => {
        return categories.map((category) => ({
            title: category.title,
            value: category._id,
            children: category.children ? convertToTreeData(category.children) : [],
        }));
    };
    const treeData = convertToTreeData(categories);
    const onFinish = async (values) => {
        // console.log('Success:', values);
        try {
            const res = await fetch(`https://backend-shoptech.onrender.com/admin/list-category/edit/${idCategory.id}`, {
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
    if (role.permissions.includes("products-category-edit") === false) {
        return (
            <Error />
        );
    }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Sửa Danh Mục</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="form-input" >
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
                            form={form}
                        >
                            <Form.Item
                                label="Tên danh mục"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên danh mục!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Danh mục cha"
                                name="parent_id"
                            // initialValue={""}
                            >
                                <TreeSelect placeholder="Chọn danh mục" treeData={treeData} />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                            // initialValue={""}
                            >
                                <TextArea rows={4} />
                            </Form.Item>

                            <Form.Item label="Trạng thái" name="status" initialValue="active">
                                <Radio.Group>
                                    <Radio value="active"> Hoạt động </Radio>
                                    <Radio value="inactive"> Không hoạt động </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Vị trí" name="position"
                                initialValue="">
                                <InputNumber style={{ width: '100%' }} min='1' placeholder='Tự động điền' />
                            </Form.Item>
                            <Form.Item label={null}>
                                <Button type="primary" htmlType="submit">
                                    Sửa danh mục
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditCategory