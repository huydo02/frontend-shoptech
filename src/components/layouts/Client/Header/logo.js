import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../../asset/imgs/banner/T.png'
const LogoHeader = () => {
    return (
        <>
            <div className="header-action">
                <div className="main-header--logo">
                    <div className="main-header--logo" itemScope="">

                        <Link to="/" itemProp="url">
                            <picture>
                                <img
                                    style={{ height: 40, width: 70 }}
                                    className="img-responsive logoimg ls-is-cached lazyloaded"
                                    src={logo}
                                    alt="Tech47"
                                />
                            </picture>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default LogoHeader