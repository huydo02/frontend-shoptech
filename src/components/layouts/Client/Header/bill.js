import React from 'react'
import { Link } from 'react-router-dom'
import { OrderedListOutlined } from "@ant-design/icons";

const Bill = () => {
    return (
        <>
            <div className="main-header--info">
                <div className="header-action_text">
                    <Link to={'/order/history'} className="header-action__link" id="order_list"
                        data-tab="list-order">
                        <span className="box-icon">
                            <OrderedListOutlined style={{ fontSize: 20 }} />
                        </span>
                        <span className="box-text">
                            <span className="txtnw">Tra cứu</span>
                            <span className="txtbl">
                                <span className="txt-overflow">
                                    <span>Đơn hàng</span>
                                </span>
                            </span>
                        </span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Bill