import React, { useEffect, useState } from 'react'
import { Button, Flex, Popconfirm, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileSearchOutlined, SyncOutlined } from '@ant-design/icons'

import { Link, useParams } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';
import formatCurrencyVND from '../../../../../helper/format-money';

const OrderDetail = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = useSelector((state) => state.admin.roles || {});
    const idOrder = useParams();
    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com//admin/orders/detail/${idOrder.id}`);
            const data = await response.json();
            // setOrders(data.dataOrders);
            setOrders([data.dataOrders]);
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
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            render: ((_, record) => {
                return <>
                    <h1>{record.userInfo.address}</h1>
                </>
            })
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: ((_, record) => {
                return <>
                    <h1>{record.userInfo.phone}</h1>
                </>
            })
        },
        {
            title: 'Sản phẩm đã mua',
            dataIndex: 'products',
            key: 'products',
            render: ((_, record) => {
                return <>
                    {record.products.map((product) => (
                        <h1 key={product._id}>{product.title}</h1>
                    ))}
                </>
            })
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',

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
        },
        {
            title: 'Ngày mua',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => dayjs(date).format('HH:mm DD-MM-YYYY'),
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
                        <Flex style={{ width: '100%', marginBottom: 10 }} justify={'flex-end'} align={'flex-end'}>
                            <Link to={'/admin/orders'}>
                                <Button size='middle' type="primary" ghost variant="outlined">
                                    Quay lại
                                </Button>
                            </Link>
                        </Flex>
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

export default OrderDetail