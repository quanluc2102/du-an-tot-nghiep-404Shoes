import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';
import accountservice from './accountservice';
import React, {useState, useEffect} from 'react';

function Account() {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState('all'); // Default to 'all'
    const [hoaDonData, setHoaDonData] = useState([]);
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    const [hoaDonXacNhan, setHoaDonXacNhan] = useState([]);
    const [hoaDonDongGoi, setHoaDonDongGoi] = useState([]);
    const [hoaDonDangGiao, setHoaDonDangGiao] = useState([]);
    const [hoaDonHoanThanh, setHoaDonHoanThanh] = useState([]);
    const [huy, setHuy] = useState([]);
    const [muaTaiQuay, setMuaTaiQuay] = useState([]);
    const [all, setALl] = useState([]);

    useEffect(() => {
        accountservice.all()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setALl(data);
            })
            .catch(error => console.error('Error:', error));
        // Gọi API khi component được mount
        accountservice.getHoaDonChuaXacNhan()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonData(data);
            })
            .catch(error => console.error('Error:', error));


        accountservice.getHoaDonChuaXacNhan()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonData(data);
            })
            .catch(error => console.error('Error:', error));


        accountservice.hoa_don_xac_nhan()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonXacNhan(data);
            })
            .catch(error => console.error('Error:', error));



        accountservice.hoa_don_dong_goi()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonDongGoi(data);
            })
            .catch(error => console.error('Error:', error));



        accountservice.hoa_don_dang_giao()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonDangGiao(data);
            })
            .catch(error => console.error('Error:', error));



        accountservice.hoa_don_hoan_thanh()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHoaDonHoanThanh(data);
            })
            .catch(error => console.error('Error:', error));


        accountservice.huy()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setHuy(data);
            })
            .catch(error => console.error('Error:', error));


        accountservice.mua_tai_quay()
            .then(data => {
                // Cập nhật state với dữ liệu từ API
                setMuaTaiQuay(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);


    const getUserNameFromLocalStorage = () => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            return savedUser?.thongTinNguoiDung?.ten || '';
        } catch (error) {
            console.error('Error while retrieving user name from local storage:', error);
            return '';
        }
    };

    const getUserAvatarFromLocalStorage = () => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(savedUser.anh)
            return savedUser?.anh || '';
        } catch (error) {
            console.error('Error while retrieving user avatar from local storage:', error);
            return '';
        }
    };

    const renderTabContent = () => {
        // Return content based on the active tab
        switch (activeTab) {
            case 'choXacNhan':
                return (
                    <div className="order-container">
                        {hoaDonData.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}`}</div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'daXacNhan':
                return (
                    <div className="order-container">
                        {hoaDonXacNhan.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chưa xác nhận' : 'Đã xác nhận'}`}</div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'dongGoi':
                return (
                    <div className="order-container">
                        {hoaDonDongGoi.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chưa xác nhận' : 'Đóng gói'}`}</div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'dangGiao':
                return (
                    <div className="order-container">
                        {hoaDonDangGiao.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chưa xác nhận' : 'Đang giao'}`}</div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'hoanThanh':
                return (
                    <div className="order-container">
                        {hoaDonHoanThanh.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chưa xác nhận' : 'Hoàn thành'}`}</div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'huy':
                return (
                    <div className="order-container">
                        {huy.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chờ xác nhận' : 'Đã hủy'}`}
                                        </div>
                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case 'muaTaiQuay':
                return (
                    <div className="order-container">
                        {muaTaiQuay.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Mua tại quầy' : ''}`}
                                        </div>                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            // ... Add cases for other tabs
            default:
                return (
                    <div className="order-container">
                        {all.map((item) => (
                            <div key={item[0]} className="order-group">
                                <div className="product-item">
                                    <div className="product-details">
                                        <div className="product-title">{`Mã hóa đơn: ${item[0]}`}</div>
                                        <div className="product-quantity">{`Trạng thái: ${item[1] === 0 ? 'Chờ xác nhận' : ''}`}
                                            {item[1] === 1 ? 'Đã xác nhận' : ''}
                                            {item[1] === 2 ? 'Đóng gói' : ''}
                                            {item[1] === 3 ? 'Đang giao' : ''}
                                            {item[1] === 4 ? 'Hoàn thành' : ''}
                                            {item[1] === 5 ? 'Hủy' : ''}
                                            {item[1] === 6 ? 'Mua tại quầy' : ''}
                                        </div>                                        <div className="product-date">{`Ngày mua: ${item[2]}`}</div>
                                        <div className="total-price">{`Tổng tiền: ₫${item[3].toLocaleString()}`}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="account-container">
            <div className="user-profile">
                <a className="edit-profile" href="/user/account/profile">
                    <div className="avatar-container">
                        <div className="avatar-placeholder">
                            <svg
                                enableBackground="new 0 0 15 15"
                                viewBox="0 0 15 15"
                                x="0"
                                y="0"
                                className="avatar-svg"
                            >
                                {/* ... (your SVG content) */}
                            </svg>
                        </div>
                        <img
                            className="avatar-img"
                            src={`/img/${getUserAvatarFromLocalStorage()}`}
                            alt="user-avatar"
                        />
                    </div>
                </a>
                <div className="user-info">
                    <div className="username">{getUserNameFromLocalStorage()}</div>
                    <div>
                        <a className="edit-profile-link" href="/user/account/profile">
                            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                                    fill="#9B9B9B"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                            Sửa hồ sơ
                        </a>
                    </div>
                </div>
            </div>
            <div className="dropdown-container">
                <div className="dropdown">
                    {/* Dropdown content */}
                </div>

                {/* ... Các dropdown khác tương tự ... */}

                <section className="purchase-tabs" role="tablist">
                    <h2 className="a11y-hidden"></h2>
                    <a
                        className={`purchase-tab ${activeTab === 'all' ? 'active' : ''}`}
                        title="Tất cả"
                        role="tab"
                        aria-selected={activeTab === 'all'}
                        onClick={() => handleTabClick('all')}
                    >
                        <span>Tất cả</span>
                    </a>
                    <a
                        className={`purchase-tab ${activeTab === 'choXacNhan' ? 'active' : ''}`}
                        title="Chờ xác nhận"
                        role="tab"
                        aria-selected={activeTab === 'choXacNhan'}
                        onClick={() => handleTabClick('choXacNhan')}
                    >
                        <span>Chờ xác nhận</span>
                    </a>
                    <a
                        className={`purchase-tab ${activeTab === 'daXacNhan' ? 'active' : ''}`}
                        title="Xác nhận"
                        role="tab"
                        aria-selected={activeTab === 'daXacNhan'}
                        onClick={() => handleTabClick('daXacNhan')}
                    >
                        <span>Xác nhận</span>
                    </a>

                    <a
                        className={`purchase-tab ${activeTab === 'dongGoi' ? 'active' : ''}`}
                        title="Đóng gói"
                        role="tab"
                        aria-selected={activeTab === 'dongGoi'}
                        onClick={() => handleTabClick('dongGoi')}
                    >
                        <span>Đóng gói</span>
                    </a>

                    <a
                        className={`purchase-tab ${activeTab === 'dangGiao' ? 'active' : ''}`}
                        title="Đang giao"
                        role="tab"
                        aria-selected={activeTab === 'dangGiao'}
                        onClick={() => handleTabClick('dangGiao')}
                    >
                        <span>Đang giao</span>
                    </a>

                    <a
                        className={`purchase-tab ${activeTab === 'hoanThanh' ? 'active' : ''}`}
                        title="Hoàn thành"
                        role="tab"
                        aria-selected={activeTab === 'hoanThanh'}
                        onClick={() => handleTabClick('hoanThanh')}
                    >
                        <span>Hoàn thành</span>
                    </a>

                    <a
                        className={`purchase-tab ${activeTab === 'muaTaiQuay' ? 'active' : ''}`}
                        title="Mua tại quầy"
                        role="tab"
                        aria-selected={activeTab === 'muaTaiQuay'}
                        onClick={() => handleTabClick('muaTaiQuay')}
                    >
                        <span>Mua tại quầy</span>
                    </a>
                    {/* ... (similar for other tabs) */}
                </section>

                {/* Display content based on the active tab */}
                {renderTabContent()}
            </div>
        </div>
    );
}

export default Account;
