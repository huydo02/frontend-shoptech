import React, { useEffect, useState } from 'react'
import { Button, Flex, Popconfirm, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileSearchOutlined, SyncOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import formatCurrencyVND from '../../../../helper/format-money';
const History = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApi = async () => {
        try {
            const response = await fetch(`http://https://backend-shoptech.onrender.com//checkout/order/history`, {
                credentials: "include",
                method: "GET",
            });
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
                        <Tag icon={<ClockCircleOutlined />} color="default" key={record._id}>
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
                        <Link to={`/cart/order/success/${record._id}`} ><FileSearchOutlined style={{ fontSize: 17 }} /></Link>
                    </Flex>
                </>
            })

        },

    ];
    return (
        <>
            <div class="main-order-history">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 colright">
                            <div class="right-main tab-content-container">
                                <div class="customers-list customers-orders-history current" id="list-order">
                                    <div class="box-heading">
                                        <h1>Lịch sử đặt hàng</h1>
                                    </div>
                                    <div class="box-info-detail">


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

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default History