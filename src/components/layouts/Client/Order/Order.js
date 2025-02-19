import React, { useEffect, useState } from 'react'
import formatCurrencyVND from '../../../../helper/format-money'
import { Alert, Button, Flex, Radio, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Input } from 'antd';
import cash from '../../../../asset/imgs/payment/cash.png'
import coin from '../../../../asset/imgs/payment/binance-coin_16580578.png'
import cart from '../../../../asset/imgs/payment/cart.png'
import { AlertError, AlertSuccess } from '../Alert.js/Alert-top-right';
import { emptyCart } from '../../../../actions/cart';

const Order = () => {
    const [dataOrder, setDataOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApi = async () => {
            await fetch("http://https://backend-shoptech.onrender.com//checkout", {
                method: "GET",
                credentials: "include",
            })
                .then(res => res.json())
                .then(data => {
                    // setDataOrder(data)
                    setDataOrder([data.dataCart]);

                    setLoading(false);
                })
        }
        fetchApi();
    }, []);
    // console.log(dataOrder[0].products);
    const onFinish = async (values) => {
        // console.log('Success:', values);
        console.log(dataOrder)
        try {
            const res = await fetch("http://https://backend-shoptech.onrender.com//checkout/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (data.status === "success") {
                // console.log('data.orderId', data.orderId);
                dispatch(emptyCart())
                AlertSuccess(data.message)
                navigate(`/cart/order/success/${data.orderId}`)
            } else {
                // AlertError("Lỗi")
                AlertError(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: ((_, record) => {
                return <>
                    {record.products.map((item) => (
                        <h1>{item.productInfo.title}</h1>
                    ))}
                </>
            })
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: ((_, record) => {
                return <>
                    {record.products.map((item) => (

                        <img
                            style={{ width: 30, height: 30 }}
                            src={item.productInfo.thumbnail}
                            alt={item.productInfo.title} />
                    ))}
                </>
            })
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: ((_, record) => {
                return <>
                    {record.products.map((item) => (
                        <h1>{formatCurrencyVND(parseInt(item.productInfo.priceNew))}</h1>
                    ))}
                </>
            })
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: ((_, record) => {
                return <>
                    {record.products.map((item) => (
                        <h1>x{item.quantity}</h1>
                    ))}
                </>
            })
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: ((_, record) => {
                return <>
                    {record.products.map((item) => (
                        <h1>{formatCurrencyVND(item.totalPrice)}</h1>
                    ))}
                </>
            })
        },
        {
            title: 'Tổng đơn',
            dataIndex: 'total',
            key: 'total',
            render: ((_, record) => {
                const finalTotal = record.products.reduce((total, product) => {
                    return total + product.totalPrice;
                }, 0);
                return <>
                    <h1 style={{ color: '#de1c32', fontSize: 20 }}><b>{formatCurrencyVND(finalTotal)}</b></h1>
                </>
            })
        },

    ];
    console.log(dataOrder)
    return (
        <div class="collection-wrap">
            <div class="container-fluid" style={{ padding: '20px 0' }}>

                <div class="collection-inner">
                    <div class="collection-product">
                        <div className='table-order-detail'>
                            <div class="box-order">
                                <Flex style={{ width: '100%', marginBottom: 10 }} justify={'flex-end'} align={'flex-end'}>
                                    <Link to={'/cart'}>
                                        <Button size='middle' type="primary" ghost variant="outlined">
                                            Quay lại
                                        </Button>
                                    </Link>
                                </Flex>

                                <Table
                                    columns={columns}
                                    dataSource={dataOrder}
                                    pagination={false}
                                    scroll={{
                                        x: "max-content",
                                    }}

                                    rowKey="_id"
                                />
                                <hr />
                                {dataOrder[0]?.products?.length > 0 ? (
                                    <div className='box-order-use-info'
                                        style={{ paddingTop: 40 }}
                                    >
                                        {/* <h1 style={{ fontSize: 20 }}>Điền thông tin cá nhân</h1> */}
                                        <Alert message="Điền thông tin chính xác" type="info" showIcon />
                                        <div className='form-user-info'>
                                            <Form
                                                name="basic"
                                                labelCol={{
                                                    span: 8,
                                                }}
                                                wrapperCol={{
                                                    span: 16,
                                                }}
                                                style={{
                                                    // maxWidth: 500,
                                                    width: '100%',
                                                    // flex: '50%'
                                                }}
                                                initialValues={{
                                                    remember: true,
                                                }}
                                                onFinish={onFinish}
                                                // onFinishFailed={onFinishFailed}
                                                autoComplete="off"
                                            >
                                                <Form.Item
                                                    label="Họ và tên"
                                                    name="fullName"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập họ và tên',
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Địa chỉ"
                                                    name="address"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập địa chỉ',
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Email"
                                                    name="email"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập Email',
                                                        },
                                                    ]}
                                                >
                                                    <Input type='email' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Số điện thoại"
                                                    name="phone"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập số điện thoại',
                                                        },
                                                    ]}
                                                >
                                                    <Input type='number' />
                                                </Form.Item>

                                                <Form.Item label={null}>
                                                    {/* <Flex justify={'center'} align={'center'}> */}

                                                    <Button type="primary" htmlType="submit">
                                                        Xác nhận mua hàng
                                                    </Button>
                                                    {/* </Flex> */}
                                                </Form.Item>
                                            </Form>

                                            <div
                                                className='payment-order-box'
                                                style={{ display: 'flex', flexDirection: 'column', paddingLeft: 20 }}
                                            >
                                                <div className='payment-order__header'>
                                                    <h1>Phương thức thanh toán:</h1>

                                                </div>
                                                {/* <h1><i> Rất tiết tính năng này hiện đang bảo trì!</i></h1> */}
                                                <Alert message="Rất tiết tính năng này hiện đang bảo trì" type="warning" showIcon closable />
                                                <div className='payment-order__content'>

                                                    <div className='item__method' >

                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=5861"
                                                            alt="Phương thức thanh toán 1" sizes="73px" />
                                                    </div>
                                                    <div className='item__method'>
                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5861"
                                                            alt="Phương thức thanh toán 2" sizes="73px" />
                                                    </div>
                                                    <div className='item__method'>
                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=5861"
                                                            alt="Phương thức thanh toán 4" sizes="73px" />
                                                    </div>
                                                    <div className='item__method'>
                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=5861"
                                                            alt="Phương thức thanh toán 3" sizes="73px" />
                                                    </div>
                                                    <div className='item__method'>

                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5861"
                                                            alt="Phương thức thanh toán 8" sizes="73px" />
                                                    </div>
                                                    <div className='item__method'>

                                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                            src="//theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5861"
                                                            data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5861"
                                                            alt="Phương thức thanh toán 7" sizes="73px" />
                                                    </div>
                                                </div>
                                                <div className='payment-order__footer'>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}


                            </div>


                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Order