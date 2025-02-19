import React, { useEffect, useState } from 'react'
import { Button, Flex, Popconfirm, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileSearchOutlined, SyncOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';
import formatCurrencyVND from '../../../../../helper/format-money';

const Oders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = useSelector((state) => state.admin.roles || {});

    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/admin/orders`);
            const data = await response.json();
            setOrders(data.dataOrders);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // console.log(dataAccounts);
    useEffect(() => {
        fetchApi();
    }, []);
    console.log(orders)
    const handleUpdate = async (id, status) => {
        console.log(status);
        try {
            const response = await fetch(
                `https://backend-shoptech.onrender.com/admin/orders/edit-order/${id}`,
                {
                    method: 'PATCH',
                    body: JSON.stringify({ status: status }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            const result = await response.json();
            if (result.status === 200) {
                setOrders((prevData) =>
                    prevData.map((item) => {
                        if (item._id === id) {
                            // Chuyển đổi trạng thái của đơn hàng
                            return { ...item, status };
                        }
                        return item; // Giữ nguyên các đơn hàng khác
                    })
                );
                AlertSuccess(result.message);
            } else if (result.status === 404) {
                AlertError(result.message);
            }
        } catch (error) {
            AlertError("Lỗi khi xóa tài khoản. vui lòng load lại trang");
        }

    };

    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Tên khách hàng',
            dataIndex: 'fullName',
            key: 'fullName',
            render: ((_, record) => {
                return <>
                    <h1>{record.userInfo.fullName}</h1>
                </>
            })
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Đơn đang chờ',
                    value: 'pending',
                },
                {
                    text: 'Đơn đã duyệt',
                    value: 'success',
                },
                {
                    text: 'Đơn đã hủy',
                    value: 'false',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
            render: (_, record) => {
                return <>
                    {record.status === 'pending' ? (
                        <Tag color='processing' icon={<SyncOutlined spin />} key={record._id}>
                            Đang chờ
                        </Tag>
                    ) : record.status === 'success' ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" key={record._id}>
                            Đã duyệt
                        </Tag>
                    ) : (
                        <Tag icon={<CloseCircleOutlined />} color="error" key={record._id}>
                            Đã hủy
                        </Tag>
                    )}
                </>
            }
        },
        {
            title: 'Tổng giá',
            dataIndex: 'price',
            key: 'price',
            render: ((_, record) => {
                const finalTotal = record.products.reduce((total, product) => {
                    const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
                    return total + (discountedPrice * product.quantity);
                }, 0);
                return <>
                    <h1 style={{ color: '#de1c32' }}>{formatCurrencyVND(finalTotal)}</h1>
                </>
            }),
            sorter: (a, b) => {
                const totalA = a.products.reduce((total, product) => {
                    const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
                    return total + (discountedPrice * product.quantity);
                }, 0);

                const totalB = b.products.reduce((total, product) => {
                    const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
                    return total + (discountedPrice * product.quantity);
                }, 0);

                return totalA - totalB; // Sắp xếp tăng dần, đổi thành `totalB - totalA` để sắp xếp giảm dần
            }

        },
        {
            title: 'Ngày mua',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => dayjs(date).format('HH:mm DD-MM-YYYY'),
        },
        {
            title: 'Chi tiết',
            dataIndex: 'detail',
            key: 'detail',

            render: ((_, record) => {
                return <>
                    <Flex justify={'center'} align={'center'}>
                        <Link to={`/admin/orders/detail/${record._id}`} ><FileSearchOutlined style={{ fontSize: 17 }} /></Link>
                    </Flex>
                </>
            })

        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    {role.permissions.includes("order-edit") === false ? (
                        <Space size="small">
                            <Tag color="red">Không có quyền</Tag>
                        </Space>
                    ) : (
                        <>
                            {record.status === "success" ? (
                                <Tag color='default' key={record._id}>
                                    Duyệt đơn
                                </Tag>
                            ) : (
                                <Popconfirm title="Bạn chắc chắn muốn DUYỆT đơn hàng này?" onConfirm={() => handleUpdate(record._id, record.status = "success")}>
                                    <Tag style={{ cursor: 'pointer' }} color='success' key={record._id}>
                                        Duyệt đơn
                                    </Tag>
                                </Popconfirm >
                            )}


                            {record.status === "false" ? (
                                <Tag color='default' key={record._id}>
                                    Hủy đơn
                                </Tag>
                            ) : (
                                <Popconfirm title="Bạn chắc chắn muốn HỦY đơn hàng này?" onConfirm={() => handleUpdate(record._id, record.status = "false")}>
                                    <Tag style={{ cursor: 'pointer' }} color="error" key={record._id}>
                                        Hủy đơn
                                    </Tag>
                                </Popconfirm >
                            )}

                        </>
                    )}

                </>
            ),
        },
    ];
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space" style={{ alignItems: 'center' }}>
                        <h1 className="text-title">Quản lý đơn hàng</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div class="box-order">

                        <Table
                            columns={columns}
                            dataSource={orders}
                            pagination={false}
                            scroll={{
                                x: "max-content",
                            }}

                            rowKey="_id"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Oders