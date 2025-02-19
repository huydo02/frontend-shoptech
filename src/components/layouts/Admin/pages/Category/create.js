import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import Error from '../../NotPermission/Error';
import { Button, Form, Input, InputNumber, Radio, TreeSelect } from 'antd';
const { TextArea } = Input;

const CategoryCreate = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const role = useSelector((state) => state.admin.roles || {});
    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/admin/list-category`);
            const data = await response.json();
            setCategories(data.categories);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, [categories]);
    const convertToTreeData = (categories) => {
        return categories.map((category) => ({
            title: category.title,
            value: category._id,
            children: category.children ? convertToTreeData(category.children) : [],
        }));
    };
    const treeData = convertToTreeData(categories);
    const onFinish = async (values) => {
        console.log('Success:', values);
        try {
            const res = await fetch("https://backend-shoptech.onrender.com/admin/list-category/create", {
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
    if (role.permissions.includes("products-category-create") === false) {
        return (
            <Error />
        );
    }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Thêm Danh Mục</h1>
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
                                    Thêm danh mục
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CategoryCreate