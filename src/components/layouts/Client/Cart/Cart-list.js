import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import { getCartItem } from '../../../../actions/cart';
import formatCurrencyVND from '../../../../helper/format-money';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItem, removeCart, updateCart } from '../../../../actions/cart';
import { AlertError, AlertSuccess } from '../Alert.js/Alert-top-right';
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Flex, Tooltip } from 'antd';
const CartList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.cartItems || []); // Tránh lỗi khi `cartItem` là null
    useEffect(() => {
        dispatch(getCartItem()); // Gọi hành động lấy dữ liệu
    }, [cartItem]);

    const handlePlus = (id) => {
        const updatedProduct = cartItem.find((item) => item.product_id === id);

        if (updatedProduct) {
            const data = {
                productId: updatedProduct.product_id,
                quantity: updatedProduct.quantity + 1,
            };
            dispatch(updateCart(data)).then(response => {
                if (response.status === "success") {
                    AlertSuccess(response.message);
                    // navigate("/");
                } else {
                    AlertError("Lỗi hệ thống. Cập nhật giỏ hàng không thành công!");
                }
            });
        } else {
            console.error(`Không tìm thấy sản phẩm`);
        }
    };


    const handleMinus = (id) => {
        const updatedProduct = cartItem.find((item) => item.product_id === id);
        // console.log("check", updatedProduct);
        if (updatedProduct && updatedProduct.quantity > 1) {
            const data = {
                productId: updatedProduct.product_id,
                quantity: updatedProduct.quantity - 1,
            };
            dispatch(updateCart(data)).then(response => {
                if (response.status === "success") {
                    AlertSuccess(response.message);
                    // navigate("/");
                } else {
                    AlertError("Lỗi hệ thống. Cập nhật giỏ hàng không thành công!");
                }
            });
        } else {
            console.error(`Không tìm thấy sản phẩm`);
        }
    };
    const handleRemove = (id) => {
        // e.preventDefault();
        const updatedProduct = cartItem.find((item) => item.product_id === id);
        if (updatedProduct) {
            console.log(updatedProduct.product_id);
            dispatch(removeCart(updatedProduct.product_id));
            // dispatch(getCartItem());
        } else {
            console.error(`Product with id ${id} not found`);
        }
        console.log('remove', id)
        // Gọi hành động lấy dữ liệu

    }

    const handleBuy = (e) => {
        // console.log(cartItem)

        navigate('/cart/order')
    }

    return (
        <>
            <div className="cart-layout" id="cart-page" style={{ padding: '20px 0', minHeight: '500px', }}>
                <div className="cart-wrapper">
                    <div className="container-fluid">
                        <div className="cart-main">
                            <section className="section-steps">
                                <div className="checkout-steplist status" style={{ fontSize: 18 }}>
                                    <b>Giỏ hàng của bạn</b>
                                </div>
                            </section>

                            <div className="cart-infos">
                                {cartItem.length === 0 ? (
                                    < section className="section-order">
                                        <div className="cart-order">
                                            <div className="layout-cart text-center">
                                                <div className="expanded-message">
                                                    Chưa có sản phẩm nào
                                                </div>
                                                <p className="link-continue">
                                                    <Link to='/' className="button">
                                                        Tiếp tục mua hàng</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    <>
                                        <section className="section-order">
                                            <div className="cart-order" >
                                                <div className="list-pageform-cart">
                                                    <form action="/cart" method="post" id="cartformpage">
                                                        <div className="table-cart">
                                                            <div className="cart-group single">
                                                                {cartItem.map(item => (
                                                                    <div className="item line-item line-item-container" key={item._id}>


                                                                        <div className="left">
                                                                            <div className="item-img">
                                                                                <Link to={`/products/detail/${item.productInfo?.slug}`}>
                                                                                    <img src={item.productInfo?.thumbnail}
                                                                                        alt={item.productInfo?.thumbnail} id="product-img" />
                                                                                </Link>

                                                                            </div>
                                                                            <div className="item-remove">
                                                                                <div className="remove">
                                                                                    {/* <button type='button'
                                                                                        className="cart-delete"
                                                                                        }
                                                                                    >

                                                                                    </button> */}
                                                                                    <Flex justify={'center'} align={'center'}>
                                                                                        <Tooltip title="Xóa khỏi giỏ hàng">
                                                                                            <Button
                                                                                                type='text'
                                                                                                icon={<FaRegTrashAlt />}
                                                                                                onClick={() => handleRemove(item.product_id)}
                                                                                            />
                                                                                        </Tooltip>
                                                                                    </Flex>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="right">
                                                                            <div className="item-info">
                                                                                <Link
                                                                                    to={`/products/detail/${item.productInfo?.slug}`}>
                                                                                    <h3 className="name-product">
                                                                                        {item.productInfo?.title}
                                                                                    </h3>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="item-meta">
                                                                                <div className="item-price">
                                                                                    <span className="price"
                                                                                        id="price-product">{formatCurrencyVND(item.productInfo?.priceNew * item.quantity)}

                                                                                    </span>
                                                                                    <p className="discount">
                                                                                        {formatCurrencyVND(item.productInfo?.priceNew)}
                                                                                    </p>
                                                                                </div>

                                                                                <div className="item-quan" container-quantity>
                                                                                    <div className="qty quantity-partent qty-click">
                                                                                        {item.quantity <= 1 ? (
                                                                                            <button type="button"
                                                                                                className="qtyminus qty-btn disabled"
                                                                                                style={{ cursor: 'no-drop' }}>
                                                                                                <svg width="16" height="16"
                                                                                                    viewBox="0 0 16 16" fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M13.3332 8H7.99984H2.6665"
                                                                                                        stroke="#111111" strokeWidth="2"
                                                                                                        strokeLinecap="round">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </button>) : (
                                                                                            <button type="button"
                                                                                                className="qtyminus qty-btn disabled"
                                                                                                onClick={() => handleMinus(item.product_id)}>
                                                                                                <svg width="16" height="16"
                                                                                                    viewBox="0 0 16 16" fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path d="M13.3332 8H7.99984H2.6665"
                                                                                                        stroke="#111111" strokeWidth="2"
                                                                                                        strokeLinecap="round">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </button>
                                                                                        )}


                                                                                        <input readOnly=""
                                                                                            // data-quantity="{{ $cart->qty }}"
                                                                                            type="text" size="4"
                                                                                            name="updates[]" min="1"
                                                                                            // data-price="{{ $cart->product->discount }}"
                                                                                            value={item.quantity}
                                                                                            className="tc line-item-qty item-quantity txt_qty" />
                                                                                        {item.quantity >= item.productInfo?.stock ? (
                                                                                            <button type="button" className="qtyplus qty-btn"
                                                                                                style={{ cursor: 'no-drop' }}>
                                                                                                <svg width="16" height="16"
                                                                                                    viewBox="0 0 16 16" fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path
                                                                                                        d="M8.00033 13.3334V8.00008M8.00033 8.00008V2.66675M8.00033 8.00008H13.3337M8.00033 8.00008H2.66699"
                                                                                                        stroke="#111111" strokeWidth="2"
                                                                                                        strokeLinecap="round">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </button>
                                                                                        ) : (
                                                                                            <button type="button" className="qtyplus qty-btn"
                                                                                                onClick={() => handlePlus(item.product_id)}>
                                                                                                <svg width="16" height="16"
                                                                                                    viewBox="0 0 16 16" fill="none"
                                                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                                                    <path
                                                                                                        d="M8.00033 13.3334V8.00008M8.00033 8.00008V2.66675M8.00033 8.00008H13.3337M8.00033 8.00008H2.66699"
                                                                                                        stroke="#111111" strokeWidth="2"
                                                                                                        strokeLinecap="round">
                                                                                                    </path>
                                                                                                </svg>
                                                                                            </button>
                                                                                        )}

                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                    </form>

                                                </div>
                                            </div>
                                        </section>
                                        <hr />
                                        <section className="section-info-total">
                                            <div className="summary-total"><span className="title">Tổng tiền:</span>
                                                <span className="totalprice" id="totalprice-show">
                                                    {formatCurrencyVND(cartItem?.reduce(
                                                        (sum, item) => sum + item.productInfo?.priceNew * item.quantity,
                                                        0
                                                    ))}
                                                </span>
                                            </div>

                                            <div className="summary-action">
                                                <button type='button' onClick={handleBuy} className="btn-checkout button js-btn-checkout" id="buy-product"
                                                    data-box="cart-info-order-box">ĐẶT HÀNG
                                                    NGAY
                                                </button>
                                            </div>
                                        </section>
                                    </>
                                )}



                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}

export default CartList