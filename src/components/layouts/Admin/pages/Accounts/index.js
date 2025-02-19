import React, { useEffect, useState } from 'react'
import { Button, Flex, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';


const Accounts = () => {
    const [dataAccounts, setDataAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const role = useSelector((state) => state.admin.roles || {});

    const fetchApi = async () => {
        try {
            const response = await fetch(`http://https://backend-shoptech.onrender.com//admin/accounts`);
            const data = await response.json();
            setDataAccounts(data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);
    console.log(dataAccounts)

    const handleDelete = async (record) => {
        try {
            const response = await fetch(
                `http://https://backend-shoptech.onrender.com//admin/accounts/delete/${record._id}`,
                {
                    method: 'PATCH'
                }
            );
            const result = await response.json();
            if (result.status === 'success') {
                setDataAccounts((prevData) => prevData.filter((item) => item._id !== record._id));
                AlertSuccess(result.message);
            } else {
                AlertError("Không thể tài khoản này");
            }
        } catch (error) {
            AlertError("Lỗi khi xóa tài khoản. vui lòng load lại trang");
        }
    };
    const columns = [
        Table.EXPAND_COLUMN,
        {
            title: 'Tên tài khoản',
            dataIndex: 'fullname',
            key: 'fullname',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',

        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                return <>
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
                </>
            }
        },
        {
            title: 'Quyền',
            dataIndex: 'role',
            key: 'role',
            width: 200,
            // render: (_, record) => <p>{record.role.title}</p>,
            render: (_, record) => (
                <>
                    {record.role.title === "Quản trị viên" ? (
                        <Tag color={'volcano'} key={record.role._id}>
                            {record.role.title}
                        </Tag>
                    ) : (
                        <Tag color={'geekblue'} key={record.role._id}>
                            {record.role.title}
                        </Tag>
                    )
                    }
                </>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date) => dayjs(date).format('HH:mm DD-MM-YYYY'),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <>
                    {role.permissions.includes("accounts-edit") === false ? (
                        <Space size="small">
                            <Tag color="red">Không có quyền</Tag>
                        </Space>
                    ) : (
                        <Space size="small">
                            <Link to={`/admin/accounts/edit/${record._id}`}>

                                <Button type="primary" ghost size='small' icon={<EditOutlined />} />
                            </Link>
                            <Popconfirm title="Bạn muốn tài khoản này?" onConfirm={() => handleDelete(record)}>
                                <Button danger size='small' icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </Space>
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
                        <h1 className="text-title">Danh sách tài khoản Admin</h1>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div class="box-order">
                        <Flex style={{ width: '100%', marginBottom: 10 }} justify={'flex-end'} align={'flex-end'}>
                            <Link to={'/admin/accounts/create'}>
                                <Button size='middle' type="primary" ghost variant="outlined">
                                    Tạo tài khoản mới +
                                </Button>
                            </Link>
                        </Flex>
                        <Table
                            columns={columns}
                            dataSource={dataAccounts}
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

export default Accounts