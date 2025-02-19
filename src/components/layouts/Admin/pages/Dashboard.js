import React, { useEffect, useState } from 'react'
import { Line } from '@ant-design/charts';
import { Bar, Column } from '@ant-design/plots';
import { Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons"
const Dashboard = () => {
    const [dataBarChart, setDataBarChart] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`https://backend-shoptech.onrender.com//admin/dashboard`);
                const result = await data.json();
                // Lấy dữ liệu order
                setDataOrder(result.dataOrder)
                setData(result)
                setDataBarChart(result.price)
                setLoading(false);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    }, []);
    // console.log('dataOrder', dataOrder)
    const config = {
        data: dataOrder,
        xField: "day",
        yField: "quantity",
        smooth: true,
        // colorField: 'day',

        point: true,
        slider: {
            start: 0,
            end: 1
        },
        height: 350
        // seriesField: 'quantity'
    }

    const configBar = {
        data: dataBarChart.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
        xField: 'day',
        yField: 'price',
        colorField: 'day',
        height: 350,

        state: {
            unselected: { opacity: 0.5 },
            selected: { lineWidth: 3, stroke: 'red' },
        },
        interaction: {
            elementSelect: true,
        },
        onReady: ({ chart, ...rest }) => {
            chart.on(
                'afterrender',
                () => {
                    const { document } = chart.getContext().canvas;
                    const elements = document.getElementsByClassName('element');
                    elements[0]?.emit('click');
                },
                true,
            );
        },
    };
    console.log('================================', dataBarChart)
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Trang sơ lược</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 static" style={{ maxHeight: 200 }}>
                            <div className="card">
                                <div className="card-content">
                                    <div className="content-card-main">
                                        <Row gutter={16}>
                                            <Col span={20}>
                                                <Statistic
                                                    valueStyle={{ color: '#ff6600' }}
                                                    prefix={<ShoppingCartOutlined />}
                                                    title="Tổng đơn"
                                                    value={data?.totalOrder}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 static">
                            <div className="card">
                                <div className="card-content">
                                    <div className="content-card-main">
                                        <Row gutter={16}>
                                            <Col span={20}>
                                                <Statistic
                                                    valueStyle={{ color: 'rgb(199 0 204)' }}
                                                    prefix={<UserOutlined />}
                                                    title="Tài khoản hoạt động"
                                                    value={data?.totalUsers} />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 static">
                            <div className="card">
                                <div className="card-content">
                                    <div className="content-card-main">
                                        <Row gutter={16}>
                                            <Col span={20}>
                                                <Statistic
                                                    valueStyle={{ color: '#4db8ff' }}
                                                    title="Tổng doanh thu VNĐ"
                                                    value={data?.totalPrice}
                                                // prefix={<UserOutlined />}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ flex: '50%' }}>
                        <div className="col-md-6 chart d-flex-column">
                            <div className="card">
                                <div className="card-header d-flex flex-space">
                                    <h3 className="title-card">
                                        {/* <span className="material-symbols-outlined">
                                            monitoring
                                        </span> */}
                                        Số lượng sản phẩm / Tháng
                                    </h3>
                                </div>
                                <div className="card-content">

                                    <div className="content-card-main-table">

                                        <Line {...config} />
                                        {/* <Column {...config} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 chart d-flex-column">
                            <div className="card">
                                <div className="card-header d-flex flex-space">
                                    <h3 className="title-card">
                                        {/* <span className="material-symbols-outlined">
                                            monitoring
                                        </span> */}
                                        Doanh thu / Tháng
                                    </h3>
                                </div>
                                <div className="card-content">

                                    <div className="content-card-main-table">

                                        <Column {...configBar} />
                                        {/* <Column {...config} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    )
}

export default Dashboard