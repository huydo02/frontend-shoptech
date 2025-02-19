import React from 'react'
import { Carousel } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import imgsale2 from '../../../../src/asset/imgs/banner/sale2.jpg'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const CarouselHome = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                style={{ maxHeight: 400 }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='img-carousel'
                        src="https://file.hstatic.net/200000722513/file/thang_11_laptop_asus_rog800x400.jpg" alt="" />

                </SwiperSlide>
                <SwiperSlide>
                    <img className='img-carousel'
                        src="https://img5.thuthuatphanmem.vn/uploads/2021/12/02/hinh-anh-sale-dip-giang-sinh-dep_083653703.jpg" alt="" />

                </SwiperSlide>

                <SwiperSlide>
                    <img className='img-carousel' src="https://w.ladicdn.com/s2200x1200/5bf3dc7edc60303c34e4991f/artboard-1-20241129075010-6im7a.png" alt="" />

                </SwiperSlide>

                <SwiperSlide>
                    <img className='img-carousel' src="https://file.hstatic.net/200000722513/file/thang_12_laptop_msi_yep_24_gearvn_800x400_fe7bf7fd53c94a8f82c331cf534c35d3.png" alt="" />

                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default CarouselHome