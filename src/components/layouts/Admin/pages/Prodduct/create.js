import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
// import SelectTree from "../../Tree-option/index";

import {
    Button,
    Flex,
    Form,
    Input,
    InputNumber,
    Radio,
    TreeSelect,
    Upload,
} from 'antd';
import TextEditor from './Editer';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import { useNavigate } from 'react-router';
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const CreateProduct = () => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const role = useSelector((state) => state.admin.roles || {});
    // console.log('role', role)
    try {
        useEffect(() => {
            const fetchApi = async () => {
                await fetch("https://backend-shoptech.onrender.com/admin/list-product/create")
                    .then(res => res.json())
                    .then(data => {
                        setCategory(data.categories);
                        setLoading(false);
                    })
            }
            fetchApi()

        }, []);
    } catch (error) {
        console.log(error)
    }
    const convertToTreeData = (categories) => {
        return categories.map((category) => ({
            title: category.title,
            value: category._id,
            children: category.children ? convertToTreeData(category.children) : [],
        }));
    };
    const treeData = convertToTreeData(category);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        // Thêm ảnh vào FormData nếu có
        if (file) {
            formData.append("thumbnail", file);
        }
        // Thêm các trường khác vào FormData
        for (let key in values) {
            formData.append(key, values[key]);
        }
        try {
            const res = await fetch("https://backend-shoptech.onrender.com/admin/list-product/create", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.status === 'success') {
                AlertSuccess(data.message);
                navigate('/admin/products')
            } else {
                AlertError('Thêm sản phẩm không thành công.');
            }
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };
    // console.log(role.permissions.includes("products-create"))

    if (role.permissions.includes("products-create") === false) {
        return (
            <Error />
        );
    }
    // console.log(category)
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Thêm sản phẩm</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">

                    <div className="form-input">
                        <Form
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

                                {/* {loading ? (
                                    <h2>Đang tải danh mục...</h2>
                                ) : (
                                    <SelectTree category={category} parent_id={null} />
                                )} */}
                                <Form.Item label="Danh mục"
                                    rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
                                    name="category">
                                    <TreeSelect placeholder="Chọn danh mục" treeData={treeData} />
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
                                <Form.Item label="Giá sản phẩm" name="price" initialValue={0}
                                >
                                    <InputNumber style={{ width: '100%' }} min='0' />
                                </Form.Item>
                                <Form.Item label="% Giảm giá" name="discountPercentage"
                                    initialValue={0}>
                                    <InputNumber style={{ width: '100%' }} min='0' />
                                </Form.Item>
                                <Form.Item label="Số lượng" name="stock"
                                    initialValue={0}>
                                    <InputNumber style={{ width: '100%' }} min='0' />
                                </Form.Item>
                                {/* <Form.Item label="Hình ảnh" name="thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                                    <Upload name='thumbnail' action="https://backend-shoptech.onrender.com/admin/list-product/create" listType="picture-card">
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </button>
                                    </Upload>
                                </Form.Item> */}
                                <Form.Item
                                    label="Hình ảnh"
                                    name="thumbnail"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile} // Lấy giá trị tệp từ sự kiện
                                >
                                    <Upload
                                        name="thumbnail"
                                        listType="picture-card"
                                        beforeUpload={(file) => {
                                            setFile(file); // Lưu file vào state
                                            return false; // Ngăn việc tải ảnh tự động
                                        }}
                                        onRemove={() => setFile(null)} // Xóa file khỏi state khi người dùng xóa
                                    >
                                        <button style={{ border: 0, background: 'none' }} type="button">
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </button>
                                    </Upload>

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
                                <Flex style={{ width: '100%' }} justify={'flex-end'} align={'flex-end'}>
                                    <Button htmlType="submit" type="primary" size="large">
                                        Thêm sản phẩm mới
                                    </Button>
                                </Flex>

                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateProduct