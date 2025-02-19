import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLaptop } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";

const MenuSibar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            await fetch("https://backend-shoptech.onrender.com/menu")
                .then(res => res.json())
                .then(data => {
                    setData(data);
                })
        }
        fetchApi()

    }, []);
    // console.log(data)

    return (
        <>
            <div className="index-slider--nav">
                <div className="sidebar-menu">
                    <nav className="megamenu-nav">
                        <ul className="megamenu-nav-main">
                            {data ? (
                                data.map(item => (
                                    <li className="megamenu-item" key={item._id}>
                                        <Link href="" className="megamenu-link">

                                            <span className="megamenu-name">
                                                {item.title}
                                            </span>
                                            <span className="megamenu-ic-right">
                                                <span className="material-symbols-outlined">
                                                    <FaChevronRight style={{ fontSize: 11 }} />
                                                </span>
                                            </span>
                                        </Link>
                                        {item?.children ? (
                                            <div className="megamenu-content absolute-center level0 xlab_grid_container" >
                                                <div className="column xlab_column_5_5">
                                                    <div className="sub-megamenu-item">
                                                        <Link className="sub-megamenu-item-name" href="#">Hãng sản
                                                            xuất
                                                        </Link>
                                                        {item.children.map(childs => (
                                                            <Link to={`/products/${childs.slug}`}
                                                                className="sub-megamenu-item-filter" key={childs._id}>
                                                                {childs.title}
                                                            </Link>
                                                        ))}
                                                    </div>

                                                </div>
                                            </div>
                                        ) : (
                                            <span></span>
                                        )}
                                    </li>

                                ))
                            ) : (
                                <h1>oke</h1>
                            )}

                        </ul>
                    </nav>
                </div>
            </div >
        </>
    )
};

export default MenuSibar;
