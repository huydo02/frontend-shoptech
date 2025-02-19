import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SelectTree from "../../Tree-option/index";

import {
    Button,
    Form,
    Input,
    InputNumber,
    Radio,
    Upload,
    TreeSelect,
    Flex,
} from 'antd';
import TextEditor from './Editer';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';
import { useNavigate, useParams } from 'react-router';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const UpdateProduct = () => {
    const id_product = useParams();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const role = useSelector((state) => state.admin.roles || {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`https://backend-shoptech.onrender.com/admin/list-product/edit/${id_product.id}`);
                const result = await data.json();

                if (result.status === 'success') {
                    const url = result.product.thumbnail;

                    if (url !== "") {
                        setThumbnailUrl({
                            uid: '-1',
                            name: 'thumbnail.jpg',
                            status: 'done',
                            url: url,
                        });
                    }

                    const fileList = [
                        {
                            uid: '-1',
                            name: 'thumbnail.jpg',
                            status: 'done',
                            url: url,
                        },
                    ];

                    setCategory(result.categories);
                    setLoading(false);

                    form.setFieldsValue({
                        title: result.product.title,
                        description: result.product.description,
                        discountPercentage: result.product.discountPercentage,
                        position: result.product.position,
                        price: result.product.price,
                        stock: result.product.stock,
                        thumbnail: fileList,
                        status: result.product.status,
                        category: result.product.category,
                    });
                } else {
                    AlertError(result.message);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [form]);

    const convertToTreeData = (categories) => {
        return categories.map((category) => ({
            title: category.title,
            value: category._id,
            children: category.children ? convertToTreeData(category.children) : [],
        }));
    };

    const treeData = convertToTreeData(category);

    const handleSubmit = async (values) => {
        console.log('values', values)
        const formData = new FormData();

        if (file != null) {
            // console.log('chạy vào đây')
            formData.append("thumbnail", file); // Gửi file gốc
        } else {
            // Gửi URL của ảnh cũ nếu không có file mới
            formData.append("thumbnail", thumbnailUrl.url);
            console.log(thumbnailUrl.url)

        }
        for (let key in values) {
            formData.append(key, values[key]);
        }
        try {
            const res = await fetch(`https://backend-shoptech.onrender.com/admin/list-product/edit/${id_product.id}`, {
                method: "PATCH",
                body: formData,
            });
            const data = await res.json();
            if (data.status === 'success') {
                AlertSuccess(data.message)
                navigate('/admin/products')

            }
            else {
                AlertError("Không thể chỉnh sửa sản phẩm");
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (role.permissions.includes("products-create") === false) {
        return <Error />;
    }

    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Sửa sản phẩm</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="form-input">
                        <Form
                            form={form}
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: '100%' }}
                            onFinish={handleSubmit}
                        >
                            <div className="form-left">
                                <Form.Item label="Tên sản phẩm" name="title" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item label="Danh mục" name="category">
                                    <TreeSelect treeData={treeData} />
                                </Form.Item>

                                <Form.Item label="Sản phẩm nổi bật" name="featured" initialValue="0">
                                    <Radio.Group>
                                        <Radio value="1"> Nổi bật </Radio>
                                        <Radio value="0"> Không </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="Nội dung"
                                    name="description"
                                    rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                                >
                                    <TextEditor />
                                </Form.Item>

                                <Form.Item label="Giá sản phẩm" name="price" initialValue={0}>
                                    <InputNumber style={{ width: '100%' }} min="0" />
                                </Form.Item>

                                <Form.Item label="% Giảm giá" name="discountPercentage" initialValue={0}>
                                    <InputNumber style={{ width: '100%' }} min="0" />
                                </Form.Item>

                                <Form.Item label="Số lượng" name="stock" initialValue={0}>
                                    <InputNumber style={{ width: '100%' }} min="0" />
                                </Form.Item>

                                <Form.Item
                                    label="Hình ảnh"
                                    name="thumbnail"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                >
                                    <Upload
                                        name="thumbnail"
                                        listType="picture-card"
                                        beforeUpload={(file) => {
                                            setFile(file); // Lưu file vào state
                                            return false; // Ngăn việc tải ảnh tự động
                                        }}
                                        onRemove={() => setFile(null)}
                                        defaultFileList={form.getFieldValue('thumbnail')}
                                    >
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                        </button>
                                    </Upload>
                                </Form.Item>

                                <Form.Item label="Trạng thái" name="status" initialValue="active">
                                    <Radio.Group>
                                        <Radio value="active"> Hoạt động </Radio>
                                        <Radio value="inactive"> Không hoạt động </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item label="Vị trí" name="position" initialValue="">
                                    <InputNumber style={{ width: '100%' }} min="1" placeholder="Tự động điền" />
                                </Form.Item>
                                <Flex style={{ width: '100%' }} justify={'flex-end'} align={'flex-end'}>
                                    <Button htmlType="submit" type="primary" size="large">
                                        Sửa sản phẩm
                                    </Button>
                                </Flex>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UpdateProduct;
