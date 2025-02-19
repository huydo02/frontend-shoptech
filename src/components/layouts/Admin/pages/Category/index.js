import React, { useEffect, useState } from 'react'
import { Button, Flex, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);
    const role = useSelector((state) => state.admin.roles || {});

    const fetchApi = async () => {
        try {
            const response = await fetch(`http://https://backend-shoptech.onrender.com//admin/list-category`);
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
    // console.log(categories)
    const onExpand = (expanded, record) => {
        if (expanded) {
            // Thêm ID của hàng vào danh sách đang mở
            setExpandedRowKeys((prevKeys) => [...prevKeys, record._id]);
        } else {
            // Loại bỏ ID của hàng khỏi danh sách đang mở
            setExpandedRowKeys((prevKeys) => prevKeys.filter((key) => key !== record._id));
        }
    };
    const handleDelete = async (record) => {
        try {
            const response = await fetch(
                `http://https://backend-shoptech.onrender.com//admin/list-category/delete/${record._id}`,
                {
                    method: 'PATCH'
                }
            );
            const result = await response.json();
            if (result.status === 'success') {
                setCategories((prevData) => prevData.filter((item) => item._id !== record._id));
                AlertSuccess(result.message);
            } else {
                AlertError("Không thể xóa sản phẩm");
            }
        } catch (error) {
            AlertError("Lỗi khi xóa sản phẩm");
        }
    };
    // console.log(categories)
    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Tên Danh mục',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => dayjs(date).format('HH:mm DD-MM-YYYY'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    {role.permissions.includes("products-category-edit") === false ? (
                        <Space size="small">
                            <Tag color="red">Không có quyền</Tag>
                        </Space>
                    ) : (
                        <Space size="small">
                            <Link to={`/admin/categories/edit/${record._id}`}>

                                <Button type="primary" ghost size='small' icon={<EditOutlined />} />
                            </Link>
                            <Popconfirm title="Bạn muốn xóa danh mục này?" onConfirm={() => handleDelete(record)}>
                                <Button danger size='small' icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Space>
                    )}

                </>
            ),
        },
    ];
    // if (role.permissions.includes("products-create") === false) {
    //     return (
    //         <Error />
    //     );
    // }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space" style={{ alignItems: 'center' }}>
                        <h1 className="text-title">Danh mục sản phẩm</h1>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div class="box-order">
                        <Flex style={{ width: '100%', marginBottom: 10 }} justify={'flex-end'} align={'flex-end'}>
                            <Link to={'/admin/categories/create'}>
                                <Button size='middle' type="primary" ghost variant="outlined">
                                    Thêm danh mục mới +
                                </Button>
                            </Link>
                        </Flex>
                        <Table
                            columns={columns}
                            dataSource={categories}
                            pagination={false}
                            scroll={{
                                x: "max-content",
                            }}
                            expandedRowKeys={expandedRowKeys} // Quản lý hàng mở
                            onExpand={onExpand} // Xử lý mở/đóng hàng
                            rowKey="_id"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Categories