import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuSibar from "../Menu/Menu-sidebar";
import { IoGiftOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CarouselHome from "../../Carousel/Carousel";
import formatCurrencyVND from "../../../../helper/format-money";

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            await fetch("https://backend-shoptech.onrender.com/")
                .then(res => res.json())
                .then(data => {
                    setData(data)
                    setLoading(false);
                })
        }
        fetchApi();
    }, []);
    console.log(data)
    return (
        <>
            <section className="section section-slider">
                <div className="container-fluid">
                    <div className="index-slider--wrap">

                        <MenuSibar />

                        <div className="index-slider--banner">
                            <div className="index-slider--row">
                                <div className="index-slider--coll coll-left">
                                    <div className="index-banner--top">
                                        <CarouselHome />
                                    </div>

                                </div>
                                <div className="index-slider--coll coll-right">
                                    <img src="https://img.freepik.com/free-vector/isolated-christmas-decorated-tree-sticker_1308-78868.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section section-subbanners" style={{ marginTop: 10 }}>
                <div className="container-fluid">
                    <div className="row flex-nowrap" style={{ maxHeight: 132 }}>
                        <div className="col-xl-3" >
                            <div className="banner-box fade-box">
                                <Link className="aspect-ratio" href="#" aria-label="Bí kíp săn voucher"
                                    title="Bí kíp săn voucher" style={{ '--height-img': '250', '--width-img': '500' }}>
                                    <picture>
                                        {/* {{-- <source media="(max-width: 991px)"
                                            srcset="https://file.hstatic.net/200000722513/file/artboard_12_copy_12.png"
                                            data-srcset="https://file.hstatic.net/200000722513/file/artboard_12_copy_12.png"
                                            sizes="294px">
                                        <source media="(min-width: 992px)"
                                            srcset="https://file.hstatic.net/200000722513/file/artboard_12_copy_12.png"
                                            data-srcset="https://file.hstatic.net/200000722513/file/artboard_12_copy_12.png"
                                            sizes="294px"> --}} */}
                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                            src="https://c8.alamy.com/comp/2D9DND0/santa-claus-holds-laptop-in-hand-with-25-percent-winter-sale-advertising-2D9DND0.jpg"
                                            data-src="https://file.hstatic.net/200000722513/file/artboard_12_copy_12.png"
                                            alt="Bí kíp săn voucher" sizes="294px" />
                                    </picture>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="banner-box fade-box">
                                <Link className="aspect-ratio" href="#" aria-label="Bí kíp săn voucher"
                                    title="Bí kíp săn voucher" style={{ '--height-img': '250', '--width-img': '500' }}>
                                    <picture>
                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                            src="https://genz.com.vn/wp-content/uploads/2024/07/asus-uu-dai-mua-tuu-truong-02.jpg"
                                            data-src="https://file.hstatic.net/200000722513/file/artboard_12_copy_11.png"
                                            alt="Bí kíp săn voucher" sizes="294px" />
                                    </picture>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="banner-box fade-box">
                                <Link className="aspect-ratio" href="#" aria-label="Bí kíp săn voucher"
                                    title="Bí kíp săn voucher" style={{ '--height-img': '250', '--width-img': '500' }}>
                                    <picture>
                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                            src="https://cdn.tgdd.vn/Files/2022/09/18/1470321/coupon_1280x720-800-resize.jpg"
                                            data-src="https://file.hstatic.net/200000722513/file/artboard_12_copy_11.png"
                                            alt="Bí kíp săn voucher" sizes="294px" />
                                    </picture>
                                </Link>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="banner-box fade-box">
                                <Link className="aspect-ratio" href="#" aria-label="Bí kíp săn voucher"
                                    title="Bí kíp săn voucher" style={{ '--height-img': '250', '--width-img': '500' }}>
                                    <picture>
                                        <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                            src="https://cdn.tgdd.vn/Files/2021/08/03/1372702/phukienmuakem_800x450.jpg"
                                            data-src="https://file.hstatic.net/200000722513/file/artboard_12_copy_11.png"
                                            alt="Bí kíp săn voucher" sizes="294px" />
                                    </picture>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-banners" style={{ height: 1 }}>
                <div className="container-fluid">
                    <div className="row flex-nowrap">

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div className="banner-box fade-box" data-banner-page="Homepage"
                                data-banner-loc="Top Promotion Banner_1">
                                <Link className="aspect-ratio" href="/pages/pc-gvn" aria-label="PC giá tốt" title="PC giá tốt"
                                    style={{ '--height-img': '320', '--width-img': '1000' }}>
                                    {/* <img>
                                            <source media="(max-width: 991px)"
                                                srcset="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                data-srcset="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                sizes="573px" />
                                            <source media="(min-width: 992px)"
                                                srcset="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                data-srcset="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                sizes="573px" />
                                            <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                data-src="https://file.hstatic.net/200000722513/file/1015x325.png"
                                                alt="PC giá tốt" sizes="573px" />
                                        </img> */}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {loading === false ? (
                data?.map((item) => (
                    <section className="section section-collection">
                        <div className="container-fluid">
                            <div className="wrapper-content">
                                <div className="section-heading flex-none" style={{ borderBottom: '1px solid #CFCFCF' }}>
                                    <div className="box-left">
                                        <div className="box-header">
                                            <h2 className="hTitle-slide">
                                                <Link href="">{item.title} bán chạy</Link>
                                            </h2>
                                            <div className="box-subHeader">
                                                {/* <h3 className="shTitle">trả góp</h3> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-right">
                                        <div className="box-cate">
                                            <ul className="cate-list">
                                                {item.childrens.map((child) => (
                                                    <li>
                                                        <Link
                                                            to={`/products/${child.slug}`}
                                                            style={{ textTransform: 'uppercase', borderRight: '1px solid #CFCFCF' }}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                        <div className="box-link">
                                            <Link to={`/products/${item.parents}`} className="button-more">Xem tất cả</Link>
                                        </div>
                                    </div>

                                </div>
                                <div className="section-content-items" style={{ height: 400 }}>

                                    <Swiper
                                        // install Swiper modules
                                        modules={[Autoplay, Navigation, A11y]}
                                        spaceBetween={15}
                                        slidesPerView={5}
                                        navigation
                                        loop={true}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}
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
                                        {item.products?.map(prouct => (
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
                    </section>
                ))

            ) : (
                <h1>đang xử lý...</h1>
            )}




            {/* <section className="section section-collection">
                <div className="container-fluid">
                    <div className="wrapper-content">
                        <div className="section-heading flex-none">
                            <div className="box-left">
                                <div className="box-header">
                                    <h2 className="hTitle-slide">
                                        <Link href="">PC bán chạy</Link>
                                    </h2>
                                    <div className="box-subHeader">
                                        <h3 className="shTitle">trả góp</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="box-right">
                                <div className="box-cate">
                                    <ul className="cate-list">
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                    </ul>
                                </div>
                                <div className="box-link">
                                    <Link href="" className="button-more">Xem tất cả</Link>
                                </div>
                            </div>

                        </div>
                        <div className="section-content-items" style={{ height: 400 }}>

                            <Swiper
                                // install Swiper modules
                                modules={[Autoplay, Navigation, A11y]}
                                spaceBetween={50}
                                slidesPerView={5}
                                navigation
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{ clickable: true }}
                                // scrollbar={{ draggable: true }}
                                // onSwiper={(swiper) => console.log(swiper)}
                                // onSlideChange={() => console.log('slide change')}
                                className="mySwiper"
                                style={{ maxHeight: 400 }}
                                breakpoints={{
                                    // Kích thước màn hình >= 1024px
                                    1024: {
                                        slidesPerView: 5, // Hiển thị 5 sản phẩm
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
                                {loading === false ? (
                                    products.map(item => (

                                        // <SwiperSlide>Slide 1</SwiperSlide>
                                        <SwiperSlide style={{ maxHeight: 400, borderRight: '1px solid #11111' }}>
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
                                                    <Link to={`/products/detail/${item.slug}`} className="aspect-ratio fade-box">
                                                        <picture className="">
                                                            <img
                                                                className="img-default lazyloaded"
                                                                src={item.thumbnail}
                                                                data-src="" alt={item.title}
                                                                style={{ maxHeight: '150px', width: '100%' }}
                                                            />
                                                        </picture>
                                                    </Link>
                                                </div>
                                                <div className="proloop-detail">

                                                    <h3 className="proloop-name">
                                                        <Link to={`/products/detail/${item.slug}`}
                                                            tabIndex="-1">{item.title}</Link>
                                                    </h3>
                                                    <div className="proloop-technical">
                                                        <div className="proloop-technical--line" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                                    </div>
                                                    <div className="proloop-price">
                                                        <div className="proloop-price--compare">
                                                            <del>{item.priceNew}đ</del>
                                                        </div>
                                                        <div className="proloop-price--default">
                                                            <span
                                                                className="proloop-price--highlight"> {formatCurrencyVND(item.price)}</span>
                                                            <span
                                                                className="proloop-label--on-sale">{item.discountPercentage}%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <h1>đang xử lý</h1>
                                )}
                            </Swiper>

                        </div>
                    </div>
                </div>
            </section>
            <section className="section section-collection">
                <div className="container-fluid">
                    <div className="wrapper-content">
                        <div className="section-heading flex-none">
                            <div className="box-left">
                                <div className="box-header">
                                    <h2 className="hTitle">
                                        <Link href="">Bàn phím HOT</Link>
                                    </h2>
                                    <div className="box-subHeader">
                                        <h3 className="shTitle">trả góp</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="box-right">
                                <div className="box-cate">
                                    <ul className="cate-list">
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                        <li><Link href="#" title="PC I3">PC I3</Link></li>
                                    </ul>
                                </div>
                                <div className="box-link">
                                    <Link href="" className="button-more">Xem tất cả</Link>
                                </div>
                            </div>
                        </div>
                        <div className="section-content-items">
                            <Swiper
                                modules={[Autoplay, Navigation, A11y]}
                                spaceBetween={50}
                                slidesPerView={5}
                                navigation
                                loop={true}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{ clickable: true }}
                                className="mySwiper"
                                style={{ maxHeight: 400 }}
                                breakpoints={{
                                    // Kích thước màn hình >= 1024px
                                    1024: {
                                        slidesPerView: 5, // Hiển thị 5 sản phẩm
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
                                {loading === false ? (
                                    keyboards.map(item => (

                                        // <SwiperSlide>Slide 1</SwiperSlide>
                                        <SwiperSlide style={{ maxHeight: 400, borderRight: '1px solid #11111' }}>
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
                                                    <Link to={`/products/detail/${item.slug}`} className="aspect-ratio fade-box">
                                                        <picture className="">
                                                            <img
                                                                className="img-default lazyloaded"
                                                                src={item.thumbnail}
                                                                data-src="" alt={item.title}
                                                                style={{ maxHeight: '150px', width: '100%' }}
                                                            />
                                                        </picture>
                                                    </Link>
                                                </div>
                                                <div className="proloop-detail">

                                                    <h3 className="proloop-name">
                                                        <Link to={`/products/detail/${item.slug}`}
                                                            tabIndex="-1">{item.title}</Link>
                                                    </h3>
                                                    <div className="proloop-technical">
                                                        <div className="proloop-technical--line" dangerouslySetInnerHTML={{ __html: item.description }}></div>
                                                    </div>
                                                    <div className="proloop-price">
                                                        <div className="proloop-price--compare">
                                                            <del>{item.priceNew}đ</del>
                                                        </div>
                                                        <div className="proloop-price--default">
                                                            <span
                                                                className="proloop-price--highlight"> {formatCurrencyVND(item.price)}</span>
                                                            <span
                                                                className="proloop-label--on-sale">{item.discountPercentage}%</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <h1>đang xử lý</h1>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Home;