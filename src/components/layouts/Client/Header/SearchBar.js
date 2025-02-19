import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import formatCurrencyVND from '../../../../helper/format-money';

const SearchBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [characters, setCharacters] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const liveSearchRef = useRef(null);
    // console.log("live search", query);
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://backend-shoptech.onrender.com/search/live?live=${query}`);
            const data = await response.json();
            setCharacters(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };
    //fetch all product of db
    useEffect(() => {
        if (query.length > 0) {
            setIsVisible(true); // Hiển thị live-search khi có query
            fetchData();
        } else {
            setIsVisible(false); // Ẩn live-search khi không có query
        }
    }, [query]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Kiểm tra nếu nhấn ngoài vùng liveSearchRef
            if (
                liveSearchRef.current &&
                !liveSearchRef.current.contains(event.target)
            ) {
                setIsVisible(false); // Ẩn div live-search
            }
        };

        // Thêm event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Xóa event listener khi component bị hủy
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setQuery(''); // Reset query khi URL thay đổi
    }, [location]);

    console.log(characters)
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target[0].value;
        if (search.trim()) {
            // Chuyển hướng đến trang kết quả tìm kiếm với từ khóa
            navigate(`/products/search?query=${encodeURIComponent(search)}`);
        }

    }
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };
    const handleInputChange = debounce((value) => setQuery(value), 300);
    return (
        <>
            <div className="main-header--search">
                <div className="search-box">
                    <form onSubmit={handleSearch} className="search-input">
                        <div className="wpo-search-inner">
                            <input
                                type="text"
                                placeholder="Bạn cần tìm gì?"
                                name="search"
                                style={{ width: '100%', borderRadius: '4px' }}
                                // onChange={event => setQuery(event.target.value)}
                                onChange={event => handleInputChange(event.target.value)}
                            />
                            <button type="submit" className="btn-search">
                                <SearchOutlined />
                            </button>
                        </div>
                    </form>

                </div>

                <div
                    ref={liveSearchRef}
                    className={`search-live ${isVisible ? 'active' : 'd-none'}`}
                >
                    {loading ? (
                        <p>Đang tải...</p>
                    ) : characters && characters.length > 0 ? (
                        characters.map((item) => (
                            <div className="list-products__search-live" key={item._id}>
                                <div className="title__search-live">
                                    <Link
                                        to={`/products/detail/${item.slug}`}
                                        onClick={() => setQuery('')}
                                    // style={{ }}
                                    >
                                        {item.title}
                                    </Link>
                                    <h1 style={{ color: 'red', marginTop: 4 }}>{formatCurrencyVND(item.priceNew)}</h1>
                                </div>
                                <div className="img__search-live">
                                    <img
                                        style={{ width: 35, height: 35 }}
                                        src={item.thumbnail}
                                        alt={item.title}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có sản phẩm nào.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchBar