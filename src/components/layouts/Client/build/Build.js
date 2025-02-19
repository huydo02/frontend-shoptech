import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Dropdown, Flex, message, Modal, Skeleton, Space } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import formatCurrencyVND from '../../../../helper/format-money';
import { AlertError, AlertSuccess } from '../Alert.js/Alert-top-right';
import { getCartItem } from '../../../../actions/cart';
import { useDispatch } from 'react-redux';
const Build = () => {
    const [categories, setCategories] = useState([]);
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    const [databuild, setDatabuild] = useState([]);

    const [currentChild, setCurrentChild] = useState('');
    const [selectedSlugs, setSelectedSlugs] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const dispatch = useDispatch();
    const fetchApi = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/build/categories`, {
                credentials: "include",
                method: "GET",
            });
            const data = await response.json();
            setCategories(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/build`, {
                credentials: "include",
                method: "GET",
            });
            const data = await response.json();
            console.log(data.productsBuilt);
            setDatabuild(data.productsBuilt);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchSort = async (child, filter = '') => {
        const response = await fetch(`https://backend-shoptech.onrender.com/build/categories/${child}?filter=${filter}`, {
            credentials: "include",
            method: "GET",
        });
        return response.json();
    }
    const showModal = async (child) => {
        setOpen(true);
        setCurrentChild(child)
        try {
            const data = await fetchSort(child);
            setChildren(data);
            setAllProducts(data.newProduct);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log('databuild', databuild)
    const handleSetdataBuild = async (dataproduct) => {
        // console.log('idproduct', dataproduct)
        if (dataproduct) {
            const databody = {
                productId: dataproduct._id,
                quantity: 1,
            };
            const response = await fetch(`https://backend-shoptech.onrender.com/build/add/`, {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(databody),
            });
            await response.json();
            setDatabuild((prev) => {
                // Bảo vệ thêm một lần nữa nếu prev không phải là mảng
                return Array.isArray(prev) ? [...prev, dataproduct] : [dataproduct];
            });

            // console.log(databuild);
            setOpen(false)
        }
    }
    const handleRemove = async (dataproduct) => {
        console.log('idproduct', dataproduct)
        // console.log(databuild)

        const databody = {
            productId: dataproduct._id,

        };
        const response = await fetch(`https://backend-shoptech.onrender.com/build/remove/`, {
            credentials: "include",
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(databody),
        });
        await response.json();
        setDatabuild((prev) => prev.filter((key) => key._id !== dataproduct._id));

    }
    const items = [
        {
            label: 'Nổi bật',
            key: 'position-desc',
        },
        {
            label: 'Giá tăng dần',
            key: 'price-asc',
        },
        {
            label: 'Giá giảm dần',
            key: 'price-desc',
        },
    ];
    const handleMenuClick = async (e) => {
        const selectedKey = e.key;
        console.log(e, currentChild)
        message.success(`Đã chọn bộ lọc: ${selectedKey}`);
        const data = await fetchSort(currentChild, selectedKey);
        setChildren(data);
    };
    const onChangeSlugCategory = async (e) => {
        const slug = e.target.defaultValue;
        const isChecked = e.target.checked;

        // console.log(slug, isChecked)
        setSelectedSlugs((prevSlugs) => {
            const updatedSlugs = isChecked
                ? [...prevSlugs, slug] // Thêm slug nếu checkbox được chọn
                : prevSlugs.filter((s) => s !== slug); // Loại bỏ slug nếu checkbox bị bỏ chọn

            setChildren((prevChildren) => ({
                ...prevChildren, // Giữ nguyên các thuộc tính khác
                newProduct: updatedSlugs.length > 0
                    ? allProducts.filter((child) => updatedSlugs.includes(child.category)) // Dùng allProducts để đảm bảo tính chính xác
                    : allProducts,

            }));
            return updatedSlugs; // Cập nhật danh sách slug
        });

    }
    const hanldeAddToCart = async () => {
        if (databuild.length > 0) {
            try {
                const response = await fetch(`https://backend-shoptech.onrender.com/build/add-to-cart`, {
                    credentials: "include",
                    method: "GET",
                });
                const data = await response.json();
                if (data.status === 200) {
                    AlertSuccess(data.message)
                    setDatabuild([])
                    dispatch(getCartItem())
                } else {
                    AlertError("lỗi")
                }
                // console.log(data.productsBuilt);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            AlertError("Chưa có sản phẩm nào")

        }

    }
    const handleRemoveBuild = async () => {
        if (databuild.length > 0) {
            try {
                const response = await fetch(`https://backend-shoptech.onrender.com/build/remove-build`, {
                    credentials: "include",
                    method: "DELETE",
                });
                const data = await response.json();
                if (data.status === 200) {
                    AlertSuccess(data.message)
                    setDatabuild([])
                    // dispatch(getCartItem())
                } else {
                    AlertError("lỗi")
                }
                // console.log(data.productsBuilt);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            AlertError("Chưa có sản phẩm nào")

        }
    }
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    useEffect(() => {
        fetchApi();
    }, []);
    useEffect(() => {
        fetchData();
    }, []);
    // useEffect(() => {
    //     console.log('databuilddatabuilddatabuilddatabuild', databuild.length === 0)
    // }, []);

    return (
        <>
            <div className="main-order-history">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-9 colright">
                            <div className="right-main tab-content-container">
                                <div className="customers-list customers-orders-history current" id="list-order">
                                    <div className="box-heading">
                                        <h1>Xây dựng cấu hình</h1>
                                    </div>
                                    <div className="box-info-detail">
                                        {loading === false ? (
                                            <>
                                                <Flex justify={'space-between'} align='center' style={{ padding: '10px 0' }}>
                                                    <div>
                                                        <Button
                                                            color="primary"
                                                            icon={<PlusOutlined />}
                                                            variant="solid"
                                                            style={{ marginRight: 10 }}
                                                            onClick={hanldeAddToCart}
                                                        >
                                                            Thêm vào giỏ hàng
                                                        </Button>
                                                        <Button color="danger" variant="solid" icon={<FaRegTrashCan />} onClick={handleRemoveBuild}>
                                                            Xóa tất cả
                                                        </Button>
                                                    </div>

                                                    <div
                                                        style={{
                                                            color: 'rgb(234, 28, 4)',
                                                            fontSize: 20,
                                                            flex: '0 0 1',
                                                            justifyContent: 'flex-end'
                                                        }}
                                                    >
                                                        <b>
                                                            Chi phí dự tính:

                                                            {databuild !== undefined ? (
                                                                formatCurrencyVND(databuild?.reduce(
                                                                    (sum, item) => sum + parseInt(item.priceNew),
                                                                    0
                                                                ))
                                                            ) : (
                                                                0
                                                            )}
                                                        </b>
                                                    </div>

                                                </Flex>
                                                <table className='table-build-pc' style={{ maxWidth: '1150px' }}>
                                                    <thead>
                                                        <tr>
                                                            <th key={1}>Danh mục</th>
                                                            <th key={2}>Sản phẩm</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {categories?.map(category => {
                                                            const selectedProduct = databuild?.find(
                                                                // (item) => item.category === category.childrens.find((id) => id._id)
                                                                (item) => category.childrens.some((child) => child._id === item.category)
                                                            );
                                                            // console.log('selectedProduct', selectedProduct)
                                                            return (
                                                                <tr key={category.parents}>
                                                                    <td style={{ textTransform: 'uppercase', padding: '0 10px', color: '#464646' }}> <b>{category.title}</b> </td>

                                                                    <td>
                                                                        {selectedProduct ? (
                                                                            <div className='show-product__selected' key={selectedProduct._id}
                                                                                style={{ marginBottom: 5, width: '100%' }}>
                                                                                <div className='show-product__selected__img' >
                                                                                    <img src={selectedProduct.thumbnail} alt="" style={{ width: '100%', height: '100%' }} />
                                                                                </div>
                                                                                <div className='show-product__selected__title' >

                                                                                    <Link to={`/products/detail/${selectedProduct.slug}`} >
                                                                                        {selectedProduct.title}
                                                                                    </Link>
                                                                                    {/* <h1 style={{ overflowWrap: 'break-word' }}></h1> */}
                                                                                    <h1>kho hàng còn: {selectedProduct.stock}</h1>
                                                                                    <h1 style={{ color: '#ea1c04', fontWeight: 600, fontSize: 15, marginTop: 5 }}>{formatCurrencyVND(parseInt(selectedProduct.priceNew))}</h1>
                                                                                </div>
                                                                                <Flex justify={'center'} align={'center'}>

                                                                                    <div className='show-product__selected__footer'>
                                                                                        <Button color="danger" variant="outlined" onClick={() => handleRemove(selectedProduct)} icon={<FaRegTrashCan />}>
                                                                                            Xóa
                                                                                        </Button>

                                                                                    </div>
                                                                                </Flex>

                                                                            </div>
                                                                        ) : (
                                                                            <Button color="primary" variant="outlined" icon={<PlusOutlined />} onClick={() => showModal(category.parents)}>
                                                                                Thêm {category.title}
                                                                            </Button>
                                                                        )}

                                                                    </td>

                                                                </tr>
                                                            )

                                                        })}
                                                    </tbody>
                                                    <Modal
                                                        title="CHỌN LINH KIỆN"
                                                        centered
                                                        open={open}
                                                        onOk={() => setOpen(false)}
                                                        onCancel={() => setOpen(false)}
                                                        width={1000}
                                                        styles={{

                                                            mask: { backgroundColor: 'rgba(17, 17, 17, 0.2)' }, // Tùy chỉnh mask

                                                        }}
                                                        footer={null}

                                                    >
                                                        <div className='modal-content-build_pc'>
                                                            <div className='modal-content-build_pc__main' >
                                                                <div className='modal-content-left'>
                                                                    <div style={{
                                                                        padding: 10,
                                                                        textAlign: 'center',
                                                                        width: '100%',
                                                                        border: '1px solid rgb(213, 211, 211)',
                                                                        textTransform: 'uppercase',
                                                                        color: 'rgb(82, 81, 81)'
                                                                    }}>
                                                                        <b>Lọc sản phẩm theo</b>

                                                                    </div>
                                                                    {children.listSubCategory?.map((category) => (
                                                                        <Checkbox
                                                                            defaultValue={category._id}
                                                                            onChange={(e) => onChangeSlugCategory(e)}
                                                                            key={category._id}
                                                                        >
                                                                            {category.title}
                                                                        </Checkbox>
                                                                    ))}

                                                                </div>
                                                                <div className='modal-content-right'>
                                                                    <div className='modal-content-right__header'
                                                                        style={{
                                                                            padding: '10px 0',
                                                                            borderBottom: '1px solid #f2f2f2',
                                                                            // backgroundColor: '#f2f2f2'
                                                                        }}>
                                                                        <Flex justify={'flex-end'} style={{}}>

                                                                            <Dropdown menu={menuProps} >
                                                                                <Button danger style={{ borderRadius: 0 }}>
                                                                                    <Space>
                                                                                        Sắp xếp:
                                                                                        <DownOutlined />
                                                                                    </Space>
                                                                                </Button>
                                                                            </Dropdown>
                                                                        </Flex>
                                                                    </div>

                                                                    <div className='modal-content-right__content'>
                                                                        {children.newProduct?.length > 0 ? (
                                                                            children.newProduct?.map((child) => (
                                                                                <div className='content__products' key={child._id}>
                                                                                    <div className='content__products__img' style={{ width: 150, border: '1px solid #f2f2f2' }}>
                                                                                        <img src={child.thumbnail} alt="" style={{ width: 150, height: 150 }} />
                                                                                    </div>

                                                                                    <div className='content__products__title' style={{ marginLeft: 10 }}>
                                                                                        <Link
                                                                                            to={`/products/detail/${child.slug}`}
                                                                                            style={{
                                                                                                overflowWrap: 'break-word',
                                                                                                textTransform: 'uppercase',
                                                                                                fontSize: 16,
                                                                                                color: 'black',
                                                                                                fontWeight: 600
                                                                                            }}
                                                                                        >
                                                                                            {child.title}
                                                                                        </Link>

                                                                                        <h1>kho hàng còn: {child.stock}</h1>

                                                                                        <h1 style={{ color: '#ea1c04', fontWeight: 600, fontSize: 15, marginTop: 5 }}>{formatCurrencyVND(parseInt(child.priceNew))}</h1>
                                                                                    </div>
                                                                                    {/* <div className='content__products__button_add'> */}
                                                                                    <Button color="primary" variant="solid" icon={<PlusOutlined />} onClick={() => handleSetdataBuild(child)}>
                                                                                        Thêm
                                                                                    </Button>
                                                                                    {/* </div> */}

                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <Skeleton active />
                                                                        )}


                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </table>
                                            </>
                                        ) : (
                                            <h1>Đang xử lý...</h1>
                                        )}
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

export default Build