import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import { useSelector } from 'react-redux';
import Error from '../../NotPermission/Error';
const RolesTable = () => {
    const [dataRoles, setDataRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const role = useSelector((state) => state.admin.roles || {});

    const fetchApi = async () => {
        try {
            const response = await fetch(`http://https://backend-shoptech.onrender.com//admin/roles`);
            const data = await response.json();
            setDataRoles(data.dataRoles);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);
    console.log(dataRoles)

    const handleDelete = async (record) => {
        try {
            const response = await fetch(
                `http://https://backend-shoptech.onrender.com//admin/roles/delete/${record._id}`,
                {
                    method: 'PATCH'
                }
            );
            const result = await response.json();
            if (result.status === 'success') {
                setDataRoles((prevData) => prevData.filter((item) => item._id !== record._id));
                AlertSuccess(result.message);
            } else {
                AlertError("Không thể xóa sản phẩm");
            }
        } catch (error) {
            AlertError("Lỗi khi xóa sản phẩm");
        }
    };
    const columns = [
        {
            title: 'Tên quyền',
            dataIndex: 'title',
            key: 'title',
            // render: (text) => <a>{text}"Quản trị viên"</a>,
            render: (text) => (
                <>
                    {text === "Quản trị viên" ? (
                        <Tag color={'volcano'} key={text}>
                            {text}
                        </Tag>
                    ) : (
                        <Tag color={'geekblue'} key={text}>
                            {text}
                        </Tag>
                    )
                    }
                </>
            ),
        },
        {
            title: 'Chức năng',
            dataIndex: 'description',
            key: 'description',
            width: 300
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">

                    <Link to={`/admin/roles/edit/${record._id}`}>
                        <Button type="primary" ghost size='small' icon={<EditOutlined />} />
                    </Link>
                    <Popconfirm title="Bạn muốn xóa quyền này?" onConfirm={() => handleDelete(record)}>
                        <Button danger size='small' icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    if (role.permissions.includes("roles-create") === false) {
        return (
            <Error />
        );
    }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space" style={{ alignItems: 'center' }}>
                        <h1 className="text-title">Quản lý quyền</h1>
                        <Link to={'/admin/roles/create'} style={{ float: 'right' }} className='add-product'>
                            <Button size='middle' type="primary" ghost variant="outlined">
                                Thêm quyền mới +
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div class="box-order">
                        <Table
                            columns={columns}
                            dataSource={dataRoles}
                            pagination={false}
                            scroll={{
                                x: "max-content",
                            }}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default RolesTable