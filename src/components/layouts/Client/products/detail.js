import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { IoGiftOutline } from "react-icons/io5";
// import { CookiesProvider, useCookies } from 'react-cookie'
import { FaRegStar } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { addToCart, getCartItem } from "../../../../actions/cart"
import { AlertError, AlertSuccess } from '../Alert.js/Alert-top-right';
import formatCurrencyVND from '../../../../helper/format-money';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Table } from 'antd';

const DetailProduct = () => {
    const slug = useParams();
    const dispatch = useDispatch();
    // console.log(slug.slugProduct)
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    console.log(list)
    try {
        useEffect(() => {
            const fetchApi = async () => {
                await fetch(`https://backend-shoptech.onrender.com//products/detail/${slug.slugProduct}`, {
                    method: 'GET',
                })
                    .then(res => res.json())
                    .then(data => {
                        setProduct(data.product);
                        setList(data.sameProducts)
                        setLoading(false);
                    })
            }
            fetchApi()

        }, [slug]);
    } catch (error) {
        console.log(error);
    }
    const handleSubmit = (id) => {
        // console.log(Cookies.get('cartId'))
        const data = {
            productId: id,
            quantity: 1,
            cartId: Cookies.get('cartId')
        }
        dispatch(addToCart(data)).then(response => {
            if (response.status === "success") {
                // setProduct((prevProduct) => ({
                //     ...prevProduct,
                //     stock: prevProduct.stock - 1, // Giảm stock đi 1
                // }));
                AlertSuccess(response.message);
            } else if (response.status === 'error') {
                dispatch(getCartItem())
                AlertError(response.message);
            } else {
                AlertError("Lỗi hệ thống. Cập nhật giỏ hàng không thành công!");

            }
        });

    }
    // const state = useSelector((state) => state.cart.cartItems);
    // console.log(state)
    return (
        <>
            {loading === false ? (
                <div className="product-body">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-12" style={{ flex: "0 0 100%", maxWidth: "100%" }}>
                                <div className="product-inner">
                                    <div className="product-main">
                                        <div className="d-flex-flex-wrap">
                                            <div className="col-lg-5 col-md-12 col-12 product-gallery">
                                                {/* {{-- < div className="product-gallery--inner sticky-gallery">

                                        </> --}} */}
                                                {/* <swiper-container className="mySwiper" pagination="true" pagination-type="progressbar"
                                            navigation="true" style="width: 100%; height: 372px">
                                            @php
                                                $imgs = explode('|', $product->imgProduct);
                                            @endphp
                                            @foreach ($imgs as $img)
                                            <swiper-slide> */}
                                                <img src={product?.thumbnail}
                                                    id="img-product-detail" alt="" />
                                                {/* </swiper-slide>
                                            @endforeach

                                        </swiper-container> */}
                                            </div>
                                            <div className="col-lg-7 col-md-12 col-12 product-info">
                                                <div className="info-wrapper">
                                                    <div className="info-top">
                                                        <div className="product-name">
                                                            <h1 id="product-name-detail">
                                                                {product?.title}
                                                            </h1>
                                                        </div>
                                                        <div className="product-rating">
                                                            <div className="hrv-crv-container active">
                                                                <div className="hrv-crv-star-container">
                                                                    <div className="hrv-crv-star-groups" style={{ display: "flex" }}>
                                                                        <span className="material-symbols-outlined">
                                                                            <FaRegStar />
                                                                        </span>
                                                                        <span className="material-symbols-outlined">
                                                                            <FaRegStar />
                                                                        </span>
                                                                        <span className="material-symbols-outlined">
                                                                            <FaRegStar />
                                                                        </span>
                                                                        <span className="material-symbols-outlined">
                                                                            <FaRegStar />
                                                                        </span>
                                                                    </div>
                                                                    <div className="hrv-crv-star-total crv-detail">
                                                                        <p>1 đánh giá</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="info-bottom">
                                                        <div className="product-variants">
                                                            Còn lại: {product?.stock} sản phẩm
                                                        </div>
                                                        <div className="product-price has-countdown notyet"
                                                            data-tag-price="{{ $product->price }}">
                                                            <span className="pro-price a">{formatCurrencyVND(product?.priceNew)}</span>
                                                            <del>{formatCurrencyVND(product?.price)}</del>
                                                            <span
                                                                className="pro-percent">{product?.discountPercentage}%</span>
                                                        </div>

                                                        <div className="product-gift-promo-box gift-promo--app">
                                                            <div className="box-header">
                                                                <span className="material-symbols-outlined">
                                                                    <IoGiftOutline />

                                                                </span>
                                                                <h2>
                                                                    Quà khuyến mãi
                                                                </h2>
                                                            </div>
                                                            <div className="box-content product-appgift">
                                                                <div className="gift-promo--content">
                                                                    <div className="gift-promo--lists">
                                                                        <ul>
                                                                            <li className="higtlight"><a
                                                                                href="/products/man-hinh-asus-tuf-gaming-vg27aql3a-w-27-fast-ips-2k-180hz"
                                                                                className="line-gift">Tặng ngay <strong>1</strong>
                                                                                x <strong>Màn hình ASUS TUF GAMING VG27AQL3A-W
                                                                                    27" Fast IPS 2K 180Hz</strong> trị giá
                                                                                <strong>7.490.000₫</strong></a></li>
                                                                            <li className="higtlight"><a
                                                                                href="/products/o-cung-ssd-wd-blue-sn580-1tb-m-2-nvme-pcie-gen4"
                                                                                className="line-gift">Tặng ngay <strong>1</strong>
                                                                                x <strong>Ổ Cứng SSD WD Blue SN580 1TB M.2 NVMe
                                                                                    PCIe Gen4 (WDS100T3B0E)</strong> trị giá
                                                                                <strong>2.390.000₫</strong></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="product-actions">
                                                            <div className="action-buys">

                                                                {product?.stock > 0 ? (
                                                                    <button type="button" onClick={() => handleSubmit(product?._id)} className="button btn-buynow"
                                                                        name="buy-now" id="buy-now">
                                                                        <span className="maintext">MUA NGAY</span>
                                                                        <span className="subtext">Giao tận nơi hoặc nhận tại cửa
                                                                            hàng</span>
                                                                    </button>
                                                                ) : (
                                                                    <button type="button"
                                                                        className="button btn-buynow"
                                                                        // style={{ backgroundColor: '#f2f2f2', borderColor: '#f2f2f2' }}
                                                                        disabled={true}
                                                                        name="buy-now" id="buy-now">
                                                                        <span className="maintext">Hết hàng</span>
                                                                        <span className="subtext">
                                                                            Rất tiếc vì sự bất tiện này!
                                                                        </span>
                                                                    </button>
                                                                )}


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                <div className="product-inner">
                                    <div className="product-block product-desc">
                                        <div className="product-heading">
                                            <h2>Cấu hình chi tiết</h2>

                                            {/* {product?.description} */}
                                            <div dangerouslySetInnerHTML={{ __html: product?.description }}></div>
                                        </div>



                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                <div className="product-inner">
                                    <div className="product-block product-desc">
                                        <div className="product-heading">
                                            <h2>Thông tin sản phẩm tương tự</h2>
                                        </div>


                                        <div className="section-content-items" style={{ height: 400 }}>

                                            <Swiper
                                                // install Swiper modules
                                                modules={[Navigation, A11y]}
                                                spaceBetween={15}
                                                slidesPerView={5}
                                                navigation={true}
                                                pagination={{ clickable: true }}
                                                className="mySwiper"
                                                style={{ maxHeight: 400 }}
                                                breakpoints={{
                                                    // Kích thước màn hình >= 1024px
                                                    1024: {
                                                        slidesPerView: 6, // Hiển thị 5 sản phẩm
                                                    },
                                                    // Kích thước màn hình >= 820px
                                                    820: {
                                                        slidesPerView: 4,
                                                    },
                                                    620: {
                                                        slidesPerView: 3, // Hiển thị 3 sản phẩm
                                                    },
                                                    // Kích thước màn hình >= 480px
                                                    400: {
                                                        slidesPerView: 2, // Hiển thị 2 sản phẩm
                                                    },
                                                    // Kích thước màn hình < 480px
                                                    0: {
                                                        slidesPerView: 1, // Hiển thị 1 sản phẩm
                                                    },
                                                }}
                                            >
                                                {list?.map(prouct => (
                                                    <SwiperSlide style={{ maxHeight: 400, border: '1px solid #f3f3f3' }}>
                                                        <div className="proloop-block">
                                                            <div className="proloop-img" style={{ height: '190px' }}>
                                                                <div className="proloop-label--top">
                                                                    <div className="proloop-label--top-left">
                                                                        <i className="fa-solid fa-fire"></i>
                                                                        Quà tặng hot
                                                                    </div>
                                                                    <div className="proloop-label--top-right">
                                                                        <span className="material-symbols-outlined">
                                                                            <IoGiftOutline />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <Link to={`/products/detail/${prouct.slug}`} className="aspect-ratio fade-box">
                                                                    <picture className="">
                                                                        <img
                                                                            className="img-default lazyloaded"
                                                                            src={prouct.thumbnail}
                                                                            data-src="" alt={prouct.title}
                                                                            style={{ maxHeight: '150px', width: '100%' }}
                                                                        />
                                                                    </picture>
                                                                </Link>
                                                            </div>
                                                            <div className="proloop-detail">

                                                                <h3 className="proloop-name">
                                                                    <Link to={`/products/detail/${prouct.slug}`}
                                                                        tabIndex="-1">{prouct.title}</Link>
                                                                </h3>
                                                                <div className="proloop-technical">
                                                                    <div className="proloop-technical--line" dangerouslySetInnerHTML={{ __html: prouct.description }}></div>
                                                                </div>
                                                                <div className="proloop-price">
                                                                    <div className="proloop-price--compare">
                                                                        <del>{formatCurrencyVND(prouct.price)}</del>
                                                                    </div>
                                                                    <div className="proloop-price--default">
                                                                        <span
                                                                            className="proloop-price--highlight"> {formatCurrencyVND(prouct.priceNew)}</span>
                                                                        <span
                                                                            className="proloop-label--on-sale">{prouct.discountPercentage}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            ) : (<h1>đang xử lý</h1>)}

        </>
    )
}

export default DetailProduct