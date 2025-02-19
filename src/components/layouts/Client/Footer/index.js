import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="main-footer">
                <div className="main-footer--top">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-2 col-lg">
                                <div className="footer-col footer-link toggle-footer toggle-first">
                                    <div className="footer-title">
                                        <h4>VỀ TECH47</h4>
                                    </div>
                                    <div className="footer-content">
                                        <ul>
                                            <li className="item"><a href="" title="Giới thiệu">Giới thiệu</a></li>
                                            <li className="item"><a href="" title="Tuyển dụng">Tuyển dụng</a></li>
                                        </ul>
                                    </div>


                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-2 col-lg">
                                <div className="footer-col footer-link toggle-footer toggle-first">
                                    <div className="footer-title">
                                        <h4>CHÍNH SÁCH</h4>
                                    </div>
                                    <div className="footer-content">
                                        <ul>
                                            <li className="item"><p title="Giới thiệu">Chính sách bảo hành</p></li>
                                            <li className="item"><a href="" title="Tuyển dụng">Chính sách giao hàng</a></li>
                                            <li className="item"><a href="" title="Tuyển dụng">Chính sách bảo mật</a></li>

                                        </ul>
                                    </div>


                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-2 col-lg">
                                <div className="footer-col footer-link toggle-footer toggle-first">
                                    <div className="footer-title">
                                        <h4>ĐỊA CHỈ</h4>
                                    </div>
                                    <div className="footer-content">
                                        <ul>
                                            <li className="item"><a href="" title="Tuyển dụng">Địa chỉ: 174 Nguyễn Phước Nguyên</a></li>

                                            <li className="item"><a href="" title="Giới thiệu">Thời gian mở cửa: 8h - 21h</a></li>
                                            <li className="item"><a href="" title="Tuyển dụng">Ngày mở cửa: T2-T7</a></li>
                                            {/* <li className="item"><a href="" title="Tuyển dụng">Tuyển dụng</a></li> */}


                                        </ul>
                                    </div>


                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3 col-lg">
                                <div className="footer-col footer-block toggle-footer">
                                    <div className="footer-title">
                                        <h4>TỔNG ĐÀI HỖ TRỢ (8:00 - 21:00)</h4>
                                    </div>
                                    <div className="footer-content">
                                        <div className="list-info">
                                            <p>
                                                <span>Mua hàng:</span>
                                                <a href="tel:0399921431">0399921431 <span> </span> </a>
                                            </p>
                                            <p><span>Bảo hành: </span> <a href="tel:0399921431">0399921431<span> </span> </a><br /></p>
                                            <p><span>Khiếu nại: </span> <a href="tel:0399921431">0399921431 <span> </span> </a><br />
                                                <span>Email: </span> <a href="mailto:dqhuy.20it11@vku.udn.vn">dqhuy.20it11@vku.udn.vn</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3 col-lg">
                                <div className="footer-col footer-block toggle-footer">
                                    <div className="footer-title">
                                        <h4>ĐƠN VỊ VẬN CHUYỂN</h4>
                                    </div>
                                    <div className="footer-content">
                                        <ul className="list-ship">
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/ship_1.png?v=5861"
                                                alt="Hình thức vận chuyển 1" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/ship_2.png?v=5861"
                                                alt="Hình thức vận chuyển 2" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/ship_3.png?v=5861"
                                                alt="Hình thức vận chuyển 3" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/ship_4.png?v=5861"
                                                alt="Hình thức vận chuyển 4" sizes="73px" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="footer-col footer-block toggle-footer">
                                    <div className="footer-title">
                                        <h4>CÁCH THỨC THANH TOÁN</h4>
                                    </div>
                                    <div className="footer-content">
                                        <ul className="list-pay">
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_1.png?v=5861"
                                                alt="Phương thức thanh toán 1" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_2.png?v=5861"
                                                alt="Phương thức thanh toán 2" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_3.png?v=5861"
                                                alt="Phương thức thanh toán 3" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_4.png?v=5861"
                                                alt="Phương thức thanh toán 4" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_5.png?v=5861"
                                                alt="Phương thức thanh toán 5" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_6.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_6.png?v=5861"
                                                alt="Phương thức thanh toán 6" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_7.png?v=5861"
                                                alt="Phương thức thanh toán 7" sizes="73px" /></li>
                                            <li><img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                src="//theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5861"
                                                data-src="//theme.hstatic.net/200000722513/1001090675/14/pay_8.png?v=5861"
                                                alt="Phương thức thanh toán 8" sizes="73px" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer--copyright">
                            <div className="container-fluid">
                                <div className="line">
                                    <div className="d-flex align-items-lg-center flex-lg-nowrap flex-wrap">
                                        <h4 className="footer-title">Kết nối với chúng tôi</h4>
                                        <div className="footer-content d-flex align-items-center justify-content-lg-between">
                                            <div className="social-list">
                                                <Link to={'https://www.facebook.com/profile.php?id=100039298122681'} target="_blank" rel="nofollow">
                                                    <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                        src="https://file.hstatic.net/200000636033/file/facebook_1_0e31d70174824ea184c759534430deec.png"
                                                        data-src="https://file.hstatic.net/200000636033/file/facebook_1_0e31d70174824ea184c759534430deec.png"
                                                        alt="Gearvn" sizes="220px" />
                                                </Link>
                                                <Link to={'https://www.facebook.com/profile.php?id=100039298122681'} target="_blank" rel="nofollow">
                                                    <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                        src="https://file.hstatic.net/200000722513/file/tiktok-logo_fe1e020f470a4d679064cec31bc676e4.png"
                                                        data-src="https://file.hstatic.net/200000722513/file/tiktok-logo_fe1e020f470a4d679064cec31bc676e4.png"
                                                        alt="Gearvn" sizes="220px" />
                                                </Link>
                                                <Link href="https://bit.ly/GearvnVideos" target="_blank" rel="nofollow">
                                                    <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                        src="https://file.hstatic.net/200000636033/file/youtube_1_d8de1f41ca614424aca55aa0c2791684.png"
                                                        data-src="https://file.hstatic.net/200000636033/file/youtube_1_d8de1f41ca614424aca55aa0c2791684.png"
                                                        alt="Gearvn" sizes="220px" />
                                                </Link>
                                                <Link href="https://zalo.me/450955578960321912" target="_blank" rel="nofollow">
                                                    <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                        src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
                                                        data-src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
                                                        alt="Gearvn" sizes="220px" />
                                                </Link>
                                                <Link href="https://www.facebook.com/groups/VietnamGamingConner" target="_blank"
                                                    rel="nofollow">
                                                    <img data-sizes="auto" className="lazyautosizes ls-is-cached lazyloaded"
                                                        src="https://file.hstatic.net/200000636033/file/group_1_54d23abd89b74ead806840aa9458661d.png"
                                                        data-src="https://file.hstatic.net/200000636033/file/group_1_54d23abd89b74ead806840aa9458661d.png"
                                                        alt="Gearvn" sizes="220px" />
                                                </Link>
                                            </div>
                                            <div className="logo-footer">
                                                <Link rel="nofollow" target="_blank"
                                                    href="http://online.gov.vn/Home/WebDetails/74686">
                                                    <img src="//theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=5861"
                                                        data-src="//theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=5861"
                                                        className=" ls-is-cached lazyloaded" alt="Bộ Công Thương" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="sidebar-menu-mb">
                <div className="menu-mobile " id="menu-mobile-control">
                    <div className="sidebar-navigation">
                        <div className="sidebar-navigation--header">
                            <div className="title">Danh mục sản phẩm</div>
                            <button id="close-menu-mobile">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.99586 8L15.5824 2.41347C15.8475 2.14881 15.9967 1.78966 15.997 1.41503C15.9973 1.0404 15.8488 0.680986 15.5841 0.415851C15.3195 0.150716 14.9603 0.00157854 14.5857 0.0012477C14.2111 0.000916852 13.8517 0.14942 13.5865 0.414087L8 6.00061L2.41347 0.414087C2.14834 0.148952 1.78874 0 1.41378 0C1.03882 0 0.679222 0.148952 0.414087 0.414087C0.148952 0.679222 0 1.03882 0 1.41378C0 1.78874 0.148952 2.14834 0.414087 2.41347L6.00061 8L0.414087 13.5865C0.148952 13.8517 0 14.2113 0 14.5862C0 14.9612 0.148952 15.3208 0.414087 15.5859C0.679222 15.851 1.03882 16 1.41378 16C1.78874 16 2.14834 15.851 2.41347 15.5859L8 9.99939L13.5865 15.5859C13.8517 15.851 14.2113 16 14.5862 16C14.9612 16 15.3208 15.851 15.5859 15.5859C15.851 15.3208 16 14.9612 16 14.5862C16 14.2113 15.851 13.8517 15.5859 13.5865L9.99586 8Z"
                                        fill="white"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="sidebar-navigation--body">
                            <ul className="list-menu" id="list-menu-ajax">
                                <li>
                                    <a href="">
                                        <span className="mb-icon">
                                            <svg width="20" height="13" viewBox="0 0 20 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_5068_8551" fill="currentcolor">
                                                    <path
                                                        d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z">
                                                    </path>
                                                </mask>
                                                <path
                                                    d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z"
                                                    fill="currentcolor"></path>
                                                <path d="M1 12L19 12" stroke="currentcolor" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="name-list">LAPTOP</span>
                                        <em>
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 1L5 5L1 1" stroke="#111111" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"></path>
                                            </svg>
                                        </em>
                                    </a>
                                    <ul className="subMenuColor1">

                                    </ul>
                                </li>
                                <li>
                                    <a href="">
                                        <span className="mb-icon">
                                            <svg width="20" height="13" viewBox="0 0 20 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_5068_8551" fill="currentcolor">
                                                    <path
                                                        d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z">
                                                    </path>
                                                </mask>
                                                <path
                                                    d="M4.00002 1C3.44774 1 3.00002 1.44772 3.00002 2V8.5C3.00002 9.05229 3.44774 9.5 4.00002 9.5H16C16.5523 9.5 17 9.05229 17 8.5V2C17 1.44772 16.5523 1 16 1H4.00002ZM3.70002 0H10H16.3C16.7774 0 17.2353 0.184374 17.5728 0.512563C17.9104 0.840752 18.1 1.28587 18.1 1.75V8.75C18.1 9.21413 17.9104 9.65925 17.5728 9.98744C17.2353 10.3156 16.7774 10.5 16.3 10.5H3.70002C3.22263 10.5 2.7648 10.3156 2.42723 9.98744C2.08967 9.65925 1.90002 9.21413 1.90002 8.75V1.75C1.90002 1.28587 2.08967 0.840752 2.42723 0.512563C2.7648 0.184374 3.22263 0 3.70002 0Z"
                                                    fill="currentcolor"></path>
                                                <path d="M1 12L19 12" stroke="currentcolor" strokeLinecap="round"></path>
                                            </svg>
                                        </span>
                                        <span className="name-list">LAPTOP</span>
                                        <em>
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 1L5 5L1 1" stroke="#111111" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"></path>
                                            </svg>
                                        </em>
                                    </a>
                                    <ul className="subMenuColor1" style={{ display: 'none' }}>
                                        <li className="">
                                            <a href="/pages/laptop-van-phong" style={{ paddingLeft: '65px' }}>
                                                Thương hiệu
                                                <em className="">
                                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 1L5 5L1 1" stroke="#111111" strokeWidth="2"
                                                            strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                                </em>
                                            </a>
                                            <ul className="subMenuColor2" style={{ display: 'none' }}>
                                                <li className="selected--last"><a href="#" style={{ paddingLeft: '80px' }}>ASUS</a>
                                                </li>
                                                <li className="selected--last"><a href="#" style={{ paddingLeft: '80px' }}>ACER</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Footer;