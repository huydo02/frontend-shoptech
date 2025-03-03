import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import formatCurrencyVND from '../../../../helper/format-money';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
const ProductsList = () => {
    const slug = useParams();
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterKey, setFilterKey] = useState('');

    // console.log(slug);
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
    const fetchApi = async (filter = '') => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://backend-shoptech.onrender.com/products/${slug.slug}?filter=${filter}`, // Thêm filter
                { method: 'GET' }
            );
            const data = await response.json();
            setDataProducts(data.newProduct);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
    }, [slug]);
    const handleMenuClick = (e) => {
        const selectedKey = e.key;
        console.log(e)
        setFilterKey(selectedKey);
        message.success(`Đã chọn bộ lọc: ${selectedKey}`);
        fetchApi(selectedKey); // Gọi lại API với bộ lọc mới
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    console.log(dataProducts)
    return (
        <>
            <div class="collection-wrap">
                <div class="container-fluid" style={{ padding: '20px 0' }}>

                    <div class="collection-inner">
                        {/* <div class="collection-body">
                            <div ></div>
                        </div> */}
                        <div class="collection-body">
                            <div className='sort-collection'>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            Lọc sản phẩm theo:
                                            <DownOutlined />
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                            <div class="collection-product">
                                <div class="listProduct-row ajax-filter">
                                    {loading ? (
                                        <h1>đang tải</h1>
                                    ) : (
                                        dataProducts.length > 0 ? (
                                            dataProducts?.map(product => (
                                                <div class="col-xl-3 proloop">
                                                    <div class="proloop-block hasGiftPE">
                                                        <div class="proloop-img">
                                                            <div class="proloop-label proloop-label--top">

                                                            </div>
                                                            <Link to={`/products/detail/${product.slug}`}
                                                                class="aspect-ratio fade-box">

                                                                <picture>
                                                                    <source srcset="{{ asset('assets/images/imgProduct/' . $img) }}"
                                                                        data-srcset="{{ asset('assets/images/imgProduct/' . $img) }}"
                                                                        media="(max-width: 767px)" />
                                                                    <img src={product.thumbnail}
                                                                        alt={product.title} class="img-default lazyloaded" />
                                                                </picture>
                                                            </Link>
                                                        </div>

                                                        <div class="proloop-detail">
                                                            <h3 class="proloop-name">
                                                                <Link to={`/products/detail/${product.slug}`} tabindex="-1">
                                                                    {product.title}
                                                                </Link>
                                                            </h3>
                                                            <div class="proloop-technical">
                                                                <div class="proloop-technical--line" dangerouslySetInnerHTML={{ __html: product.description }}></div>

                                                            </div>
                                                            <div class="proloop-price">
                                                                <div class="proloop-price--compare">
                                                                    <del>{formatCurrencyVND(product.price)}</del>
                                                                </div>
                                                                <div class="proloop-price--default">
                                                                    <span
                                                                        class="proloop-price--highlight">{formatCurrencyVND(product.priceNew)}</span>
                                                                    <span
                                                                        class="proloop-label--on-sale">{product.discountPercentage}%</span>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ display: 'flex', }}>
                                                <h1 style={{ alignItems: 'center' }}>Không có sản phẩm nào</h1>

                                            </div>
                                        )

                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductsList