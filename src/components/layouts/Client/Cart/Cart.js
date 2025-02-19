import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { getCartItem } from "../../../../actions/cart"
const Cart = () => {

    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.totalQuantity || []); // Tránh lỗi khi `cartItem` là null

    useEffect(() => {
        dispatch(getCartItem()); // Gọi hành động lấy dữ liệu
    }, [dispatch]);
    // dispatch(getCartItem());
    // console.log(cartItem)

    return (
        <>
            <div className="main-header--info">
                <div className="header-action_text">
                    <Link to="/cart" className="header-action__link">
                        <span className="box-icon">
                            <span className="material-symbols-outlined">
                                <MdOutlineShoppingCart />
                            </span>
                        </span>
                        <span className="box-text">
                            <span className="txtnw">Giỏ</span>
                            <span className="txtbl">
                                <span className="txt-overflow">
                                    <span>hàng</span>
                                </span>
                            </span>
                        </span>
                    </Link>
                    <span className="quantity-cart" data-quantity="{{ $num_carts }}"
                        id="num_quantity_cart">{cartItem.length === 0 ? 0 : cartItem}</span>
                    <div className="header-action_dropdown-cart-dropdown">
                        <div className="cart-item">
                            <div className="cart-top">
                                Thêm hàng thành công
                            </div>
                            <div className="content-cart">
                                <img src="" alt="" id="box-img-cart"
                                    className="img-cart" />
                                <span className="text-cart" id="box-name-cart">

                                </span>
                            </div>
                            <div className="cart-footer">
                                <Link href="">Xem giỏ hàng</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Cart;

