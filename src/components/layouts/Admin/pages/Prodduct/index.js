import React, { useEffect, useState } from 'react'
// import React from 'react';
import { Popconfirm, Space, Table, Tag } from 'antd';
import { TableProps, Button } from 'antd';
// import type { TableColumnsType } from 'antd';
import { createStyles } from 'antd-style';
// import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import qs from 'qs';
import formatCurrencyVND from '../../../../../helper/format-money';
import { useSelector } from 'react-redux';
const Products = () => {
    const role = useSelector((state) => state.admin.roles || {});

    const useStyle = createStyles(({ css, token }) => {
        const { antCls } = token;
        return {
            customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
        };
    });
    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: 150,
            render: (text) => {
                // console.log("hình ảnh", text);
                // <img src={text} alt={text} />
                return <img src={text} alt="Thumbnail" style={{ width: 50, height: 50, objectFit: 'cover' }} />;
            }

        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 150,
            render: (text) => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            // value: 'price',
            width: 150,
            render: (text) => <p>{formatCurrencyVND(text)}</p>,

            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Giảm giá %',
            key: 'discountPercentage',
            dataIndex: 'discountPercentage',
            width: 100,

        },
        {
            title: 'Vị trí',
            dataIndex: 'position',
            key: 'position',
            width: 100,
            sorter: (a, b) => a.position - b.position,
        },

        {
            title: 'Số lượng',
            dataIndex: 'stock',
            key: 'stock',
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            filters: [
                {
                    text: 'Hoạt động',
                    value: 'active',
                },
                {
                    text: 'Không hoạt động',
                    value: 'inactive',
                },
            ],
            // width: '20%',
            render: (_, record) => {
                return <>
                    {role.permissions.includes("products-edit") === false ? (
                        <Popconfirm title="Bạn xác nhận đổi trạng thái?" disabled>
                            {record.status === 'inactive' ? (
                                <Tag color='volcano' key={record._id}>
                                    Không hoạt động
                                </Tag>
                            ) : (
                                <Tag color='green' key={record._id}>
                                    Hoạt động
                                </Tag>
                            )}
                        </Popconfirm >
                    ) : (
                        <Popconfirm title="Bạn xác nhận đổi trạng thái?" onConfirm={() => handleUpdate(record)}>
                            {record.status === 'inactive' ? (
                                <Tag color='volcano' key={record._id}>
                                    Không hoạt động
                                </Tag>
                            ) : (
                                <Tag color='green' key={record._id}>
                                    Hoạt động
                                </Tag>
                            )}
                        </Popconfirm >
                    )}
                </>
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (_, record) => (
                <Space size="small">
                    {role.permissions.includes("products-edit") === false ? (
                        <Tag color='red' key={record._id}>
                            Không có quyền
                        </Tag>
                    ) : (
                        <>
                            <Link to={`/admin/products/edit/${record._id}`}>
                                <Button type="primary" ghost size='small' icon={<EditOutlined />} />
                            </Link>
                            <Popconfirm title="Bạn muốn xóa sản phẩm này?" onConfirm={() => handleDelete(record)}>
                                <Button danger size='small' icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </>
                    )}
                </Space>
            ),
        },

    ];

    const { styles } = useStyle();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });
    const getRandomuserParams = (params) => ({
        results: params.pagination?.pageSize,
        page: params.pagination?.current,
        ...params,
    });
    const fetchApi = async () => {
        await fetch(`https://backend-shoptech.onrender.com/admin/list-product?${qs.stringify(getRandomuserParams(tableParams))}`)
            .then(res => res.json())
            .then(data => {
                setData(data.products);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: data.total,
                    },
                });
            })
    }
    // useEffect(() => {
    //     fetchApi();
    // }, [])
    useEffect(() => {
        fetchApi();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams.sortOrder,
        tableParams.sortField,
        JSON.stringify(tableParams.filters),
    ]);
    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    console.log(data)
    const handleDelete = async (record) => {
        try {
            const response = await fetch(
                `https://backend-shoptech.onrender.com/admin/list-product/delete-product/${record._id}`,
                { method: 'DELETE' }
            );
            const result = await response.json();
            if (result.status === 'success') {
                setData((prevData) => prevData.filter((item) => item._id !== record._id));
                AlertSuccess(result.message);
            } else {
                AlertError("Không thể xóa sản phẩm");
            }
        } catch (error) {
            AlertError("Lỗi khi xóa sản phẩm");
        }
    };

    const handleUpdate = async (record) => {
        const newStatus = record.status === 'inactive' ? 'active' : 'inactive';
        try {
            const response = await fetch(
                `https://backend-shoptech.onrender.com/admin/list-product/change-status/${newStatus}/${record._id}`,
                { method: 'PATCH' }
            );
            const result = await response.json();
            if (result.status === 'success') {
                setData((prevData) =>
                    prevData.map((item) =>
                        item._id === record._id ? { ...item, status: newStatus } : item
                    )
                );
                AlertSuccess(result.message);
            } else {
                AlertError("Không thể cập nhật trạng thái sản phẩm");
            }
        } catch (error) {
            AlertError("Lỗi khi cập nhật trạng thái");
        }
    };
    return (
        <>
            <section class="title-main">
                <div class="container-fluid">
                    <div class="row flex-space" style={{ alignItems: 'center' }}>
                        <h1 class="text-title">Quản lý sản phẩm</h1>
                        {/* <ol class="breadcrumb">
                            {{ Breadcrumbs::render('dashboard') }}
                        </ol> */}
                        <Link to={'/admin/products/create'} style={{ float: 'right' }} className='add-product'>
                            <Button size='middle' type="primary" ghost variant="outlined">
                                Thêm sản phẩm mới +
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section class="content">
                <div class="container-fluid">
                    <div class="box-order">
                        {/* <Button color="default" variant="outlined" href='/admin/products/create'>
                            Thêm sản phẩm mới
                        </Button> */}

                        <table id="table_products" class="display">
                            <Table
                                columns={columns}
                                dataSource={data}
                                // style={{ maxWidth: 1050 }}
                                className={styles.customTable}
                                scroll={{
                                    x: "max-content",
                                }}
                                loading={loading}
                                onChange={handleTableChange}
                                pagination={tableParams.pagination}
                            />
                        </table>
                    </div>

                </div >
            </section >
        </>
    )
}

export default Products