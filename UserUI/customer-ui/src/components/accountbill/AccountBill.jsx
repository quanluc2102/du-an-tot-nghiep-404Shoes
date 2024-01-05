import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';
import accountservice from './accountservice';
import React, {useState, useEffect} from 'react';

function AccountBill() {
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
                                            <button className="btn btn-success btn-sm bill-detail">Xem chi tiết</button>
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
                <div className="dropdown-container user-dropdown">
                    <button className="yO9lYJ">
                        <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0" className="shopee-svg-icon icon-arrow-left">
                            <g>
                                <path
                                    d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                            </g>
                        </svg>
                        <span>TRỞ LẠI</span>
                    </button>
                </div>
            </div>

        </div>


    );
}

export default AccountBill;
