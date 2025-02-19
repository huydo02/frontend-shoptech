import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Space, Table, Tag } from 'antd';
import items from '../../Main-Menu/data.menu';
import { AlertError, AlertSuccess } from '../../../Client/Alert.js/Alert-top-right';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import animation from '../../../../loading/animation.json'
import { getAdminInfo } from '../../../../../actions/admin.auth';
import Error from '../../NotPermission/Error';

const Permissions = () => {
    const [dataPermissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataChecked, setDataChecked] = useState([]);
    const dispatch = useDispatch();
    const role = useSelector((state) => state.admin.roles || {});
    const fetchApi = async () => {
        await fetch('http://https://backend-shoptech.onrender.com//admin/roles/getpermissions')
            .then(res => res.json()
                .then(data => {
                    setPermissions(data.dataPermisstions);
                    setLoading(!loading);
                })
            )
    }

    useEffect(() => {
        fetchApi();
    }, [])
    console.log(dataPermissions)
    useEffect(() => {
        if (dataPermissions.length > 0) {
            const initialDataChecked = dataPermissions.map((item) => ({
                id: item._id,
                permissions: item.permissions,
            }));
            setDataChecked(initialDataChecked);
        }
    }, [dataPermissions]);
    const onChange = (id, e) => {
        const permission = e.target.defaultValue; // Giá trị permission từ checkbox
        const isChecked = e.target.checked;

        setDataChecked((prev) => {
            // Tìm phần tử theo id
            const existingIndex = prev.findIndex((item) => item.id === id);

            if (existingIndex !== -1) {
                // Nếu `id` đã tồn tại, cập nhật danh sách `permissions`
                const updatedPermissions = isChecked
                    ? [...prev[existingIndex].permissions, permission] // Thêm permission
                    : prev[existingIndex].permissions.filter((perm) => perm !== permission); // Xóa permission

                // Cập nhật phần tử trong mảng
                const updatedDataChecked = [...prev];
                updatedDataChecked[existingIndex].permissions = updatedPermissions;
                return updatedDataChecked;
            } else if (isChecked) {
                // Nếu `id` chưa tồn tại, thêm phần tử mới
                return [...prev, { id, permissions: [permission] }];
            }
            return prev; // Không thay đổi nếu bỏ chọn nhưng `id` không tồn tại
        });
    };
    useEffect(() => {
        console.log('dataChecked:', dataChecked);
    }, [dataChecked]);
    // console.log('dataChecked ngoài hàm:', dataChecked);
    const handleChangePermissions = async () => {
        // console.log('handleChangePermissions:', dataChecked);
        try {
            const response = await fetch(
                `http://https://backend-shoptech.onrender.com//admin/roles/permissions`,
                {
                    method: 'PATCH',
                    body: JSON.stringify(dataChecked),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const result = await response.json();
            if (result.status === 'success') {
                dispatch(getAdminInfo());
                AlertSuccess(result.message);

            } else {
                AlertError("Không thể sửa quyền");
            }
        } catch (error) {
            AlertError("Lỗi khi xóa sản phẩm");
        }
    }

    if (role.permissions.includes("roles-permissions-view") === false) {
        return (
            <Error />
        );
    }
    return (
        <>
            <section className="title-main">
                <div className="container-fluid">
                    <div className="row flex-space">
                        <h1 className="text-title">Cấp quyền quản trị</h1>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="box-order">
                        <Button color="primary" variant="outlined" style={{ float: 'right', marginBottom: 15 }}
                            size='middle' onClick={() => { handleChangePermissions() }}>Cập nhật quyền
                        </Button>
                        <table className='table-permissions' style={{ maxWidth: '1150px' }}>
                            <thead>
                                <tr>
                                    <th key={1}>Tính năng</th>
                                    {dataPermissions?.map((items) => (
                                        <th key={items._id}>{items.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={'products'}><td style={{ padding: 10, alignItems: 'start', display: "flex" }}><b>Sản phẩm</b></td></tr>
                                <tr key={'products-create'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Thêm sản phẩm</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-create'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-create')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={'products-edit'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Sửa sản phẩm</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-edit'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-edit')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={'products-delete'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xóa sản phẩm</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-delete'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-delete')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}


                                </tr>
                                {/* categories permissions */}
                                <tr key={'products-category'}><td style={{ padding: 10, alignItems: 'start', display: "flex" }}><b>Danh mục</b></td></tr>
                                <tr key={'products-category-create'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Thêm Danh mục</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-category-create'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-category-create')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={'products-category-edit'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Sửa danh mục</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-category-edit'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-category-edit')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={'products-category-delete'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xóa danh mục</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='products-category-delete'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('products-category-delete')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                {/* roles  */}
                                <tr key={'roles'}><td style={{ padding: 10, alignItems: 'start', display: "flex" }}> <b>Quản lý quyền</b> </td> </tr>
                                <tr key={'roles-create'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Thêm quyền</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='roles-create'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('roles-create')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={'roles-edit'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Sửa quyền</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="roles-edit"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("roles-edit")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={"roles-delete"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xóa quyền</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="roles-delete"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("roles-delete")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}
                                </tr>
                                {/* permission */}
                                <tr key={"roles-permissions"}>
                                    <td style={{ padding: 10, alignItems: 'start', display: "flex" }}>
                                        <b>Quản lý cấp quyền</b>
                                    </td>
                                </tr>
                                <tr key={"roles-permissions-view"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xem, chỉnh sửa quyền</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                disabled={true}
                                                defaultValue="roles-permissions-view"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("roles-permissions-view")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr>

                                {/* admin order  */}

                                <tr key={'order'}><td style={{ padding: 10, alignItems: 'start', display: "flex" }}> <b>Quản đơn hàng</b> </td> </tr>
                                {/* <tr key={'order-create'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Thêm </td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue='order-create'
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes('order-create')
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr> */}
                                <tr key={'order-edit'}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Duyệt, hủy đơn</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="order-edit"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("order-edit")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                {/* <tr key={"order-delete"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xóa quyền</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="roles-delete"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("roles-delete")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}
                                </tr> */}


                                {/* admin account  */}
                                <tr key={"accounts-admin"}>
                                    <td style={{ padding: 10, alignItems: 'start', display: "flex" }}>
                                        <b>Quản lý tài khoản admin</b>
                                    </td>
                                </tr>
                                <tr key={"accounts-create"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Thêm tài khoản</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="accounts-create"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("accounts-create")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}></Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={"accounts-edit"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Chỉnh sửa tài khoản</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="accounts-edit"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("accounts-edit")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}

                                </tr>
                                <tr key={"accounts-delete"}>
                                    <td style={{ alignItems: 'start', display: "flex" }}>Xóa Tài khoản</td>
                                    {dataPermissions?.map((items) => (
                                        <td key={items._id}>
                                            <Checkbox
                                                defaultValue="accounts-delete"
                                                checked={dataChecked.some(
                                                    (checkedItem) =>
                                                        checkedItem.id === items._id &&
                                                        checkedItem.permissions.includes("accounts-delete")
                                                )}
                                                onChange={(e) => onChange(items._id, e)}>

                                            </Checkbox>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Permissions