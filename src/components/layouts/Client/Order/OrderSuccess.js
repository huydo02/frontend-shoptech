import React, { useEffect, useState } from 'react'
import AnimationSuccess from "../../../loading/success.json";
import { Alert, Descriptions, Tag } from 'antd';
import Lottie from 'lottie-react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, FileSearchOutlined, SyncOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import formatCurrencyVND from '../../../../helper/format-money';

const OrderSuccess = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const id = useParams();
    console.log(id);
    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/checkout/success/${id.orderId}`, {
                credentials: "include",
                method: "GET",
            });
            const data = await response.json();
            setOrders(data.order);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    // console.log(dataAccounts);
    useEffect(() => {
        fetchApi();
    }, []);
    console.log(orders, orders)
    const items = [
        {
            key: 'fullName',
            label: 'Tên khách hàng',
            children: <h1>{orders?.userInfo?.fullName}</h1>,
        },
        {
            key: 'phone',
            label: 'Điện thoại',
            children: <h1>{orders?.userInfo?.phone}</h1>,
        },
        {
            key: 'address',
            label: 'Địa chỉ',
            children: <h1>{orders?.userInfo?.address}</h1>,
        },
        {
            key: 'status',
            label: 'Tình trạng đơn hàng',

            children:
                <>
                    {orders?.status === 'pending' ? (
                        <Tag icon={<ClockCircleOutlined />} color="default" key={orders?._id}>
                            Đang chờ
                        </Tag>
                    ) : orders?.status === 'success' ? (
                        <Tag icon={<CheckCircleOutlined />} color="success" key={orders?._id}>
                            Đã duyệt
                        </Tag>
                    ) : (
                        <Tag icon={<CloseCircleOutlined />} color="error" key={orders?._id}>
                            Đã hủy
                        </Tag>
                    )}
                </>,
        },
        {
            key: 'payment',
            label: 'Phương thức thanh toán',
            children: <h1>Thanh toán khi nhận hàng</h1>,
        },
        {
            key: 'day',
            label: 'Ngày mua',
            children: <h1>{dayjs(orders?.updatedAt).format('HH:mm DD-MM-YYYY')}</h1>,
        },
        {
            key: 'products',
            label: 'Sản phẩm đã mua',
            children:
                <>
                    {(orders?.products || []).map((product) => (

                        <h1 >{product?.productInfo.title}</h1>
                        // <img style={{ width: 30, height: 30 }} src={product.productInfo.thumbnail} alt="" />

                    ))}

                </>,
        },
        {
            key: 'quantity',
            label: 'số lượng',
            children:
                <>
                    {(orders?.products || []).map((product) => (

                        <h1 >x{product?.quantity}</h1>
                        // <img style={{ width: 30, height: 30 }} src={product.productInfo.thumbnail} alt="" />

                    ))}

                </>,
        },
        {
            key: 'price',
            label: 'Giá sau giảm',
            children:
                <>
                    {(orders?.products || []).map((product) => (

                        <h1>{formatCurrencyVND(parseInt(product?.priceNew))}</h1>
                        // <img style={{ width: 30, height: 30 }} src={product.productInfo.thumbnail} alt="" />

                    ))}

                </>,
        },
        {
            key: 'price',
            label: 'Tổng giá',
            children:
                <>
                    {(orders?.products || []).map((product) => (

                        <h1>{formatCurrencyVND((product?.totalPrice))}</h1>
                        // <img style={{ width: 30, height: 30 }} src={product.productInfo.thumbnail} alt="" />

                    ))}

                </>,
        },
        {
            key: 'total',
            label: 'Tổng đơn hàng',
            children:
                <>
                    <h1 style={{ color: '#E30019', fontSize: 20 }}>{formatCurrencyVND(orders?.orderTotalPrice)}</h1>

                </>,
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

                                    <div class="box-info-detail">
                                        <Alert
                                            message="Mua hàng thành công"
                                            description="Cảm ơn bạn đã tin tưởng và lựa chọn mua sản phẩm bên Tech47"
                                            type="success"
                                            style={{ marginTop: 20 }}
                                            showIcon

                                        />
                                        <br />
                                        <Descriptions
                                            layout="vertical"
                                            bordered
                                            title="Thông tin đơn hàng"
                                            items={items}
                                            column={{
                                                xs: 1,
                                                sm: 2,
                                                md: 3,
                                                lg: 3,
                                                xl: 4,
                                                xxl: 4,
                                            }} />


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

export default OrderSuccess