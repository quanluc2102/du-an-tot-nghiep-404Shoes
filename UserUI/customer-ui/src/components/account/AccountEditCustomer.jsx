import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import './style.css';
import accountservice from './accountservice';
import React, {useState, useEffect} from 'react';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

function Account() {
    const history = useHistory();
    const [activeTab, setActiveTab] = useState('thongTinCoBan'); // Thay đổi giá trị mặc định thành 'thongTinCoBan'
    const [hoaDonData, setHoaDonData] = useState([]);
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    const [listDC, setListDC] = useState([]);
    const [listXa, setListXa] = useState([]);
    const [idDC, setidDC] = useState([]);
    const [listQuanHuyen, setListQuanHuyen] = useState([]);
    const [listThanhPho, setListThanhPho] = useState([]);
    const [hoaDonXacNhan, setHoaDonXacNhan] = useState([]);
    const [hoaDonDongGoi, setHoaDonDongGoi] = useState([]);
    const [hoaDonDangGiao, setHoaDonDangGiao] = useState([]);
    const [hoaDonHoanThanh, setHoaDonHoanThanh] = useState([]);
    const [huy, setHuy] = useState([]);
    const [diaChiKhachHang, setDiaChiKhachHang] = useState([]);
    const [thongTinKhachHang, setThongTinKhachHang] = useState([]);
    const [all, setALl] = useState([]);
    const [diaChiCuThe, setDiaChiCuThe] = useState("");
    const [xaPhuongThiTran, setXaPhuongThiTran] = useState("");
    const [quanHuyen, setQuanHuyen] = useState("");
    const [tinhThanhPho, setTinhThanhPho] = useState("");
    const [sdtNew, setSDTNew] = useState("");
    const [tenNew, setTenNew] = useState("");
    const [diaChiCuTheNew, setDiaChiCuTheNew] = useState("");
    const [xaPhuongThiTranNew, setXaPhuongThiTranNew] = useState("");
    const [quanHuyenNew, setQuanHuyenNew] = useState("");
    const [tinhThanhPhoNew, setTinhThanhPhoNew] = useState("");
    const [code, setCode] = useState("");
    const [tenNguoiDung, settenNguoiDung] = useState("");
    const [sdtND, setSDTND] = useState("");
    const [sdt, setSDT] = useState("");
    const [passwordND, setpasswordND] = useState("");
    const [ngaySinhND, setngaySinhND] = useState("");
    const [ten, setTen] = useState("");
    const [codeTP, setCodeTP] = useState(0);
    const [codeQuan, setCodeQuan] = useState(0);
    const [codeXa, setCodeXa] = useState(0);
    const [ngaySinh, setNgaySinh] = useState("");
    const [ngaySinhNew, setNgaySinhNew] = useState("");
    const [emailNew, setEmailNew] = useState("");
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [id, setId] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [nguoiDungUpdate, setNguoiDungUpdate] = useState({
        ten: '', // Initial ten value
        sdt: '', // Initial sdt value
        ngaySinh: '', // Initial ngaySinh value
        password: '' // Initial password value
        // Add other properties as needed
    });

    const getIdFromLocalStorage = () => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(savedUser.id)
            return savedUser.id || '';
        } catch (error) {
            console.error('Error while retrieving user name from local storage:', error);
            return '';
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = getIdFromLocalStorage();
                console.log("User Account Id Data:", id);

                const response = await fetch(`http://localhost:8080/khach_hang_page/get_khach_hang/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error('Detail request failed:', response.status, response.statusText);
                    return;
                }

                const nguoiDungUpdate = await response.json();
                console.log("Response Data:", nguoiDungUpdate);
                setTenNew(nguoiDungUpdate.thongTinNguoiDung.ten)
                setSDTNew(nguoiDungUpdate.thongTinNguoiDung.sdt)
                setPasswordNew(nguoiDungUpdate.password)
                setNgaySinhNew(nguoiDungUpdate.thongTinNguoiDung.ngaySinh)

            } catch (error) {
                console.error("Detail request error:", error);
            }
        };

        fetchData();
        accountservice.getDiaChiByKhachHang()
            .then(data => {
                setDiaChiKhachHang(data);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const addDiaChi = () => {
        const newDiaChi = {
            ten: tenNew,
            sdt: sdtNew,
            diaChiCuThe: diaChiCuTheNew,
            xaPhuongThiTran: xaPhuongThiTranNew,
            quanHuyen: quanHuyenNew,
            tinhThanhPho: tinhThanhPhoNew,
            thongTinNguoiDungId: savedUser.thongTinNguoiDung.id,
        };

        console.log("Vlne", newDiaChi);
        accountservice.addDiaChi(newDiaChi)
            .then(addedDiaChi => {
                console.log('Added Dia Chi:', addedDiaChi);
                accountservice.getDiaChiByKhachHang()
                    .then(data => {
                        setDiaChiKhachHang(data);
                        alert('Địa chỉ đã được sửa thành công!');
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => {
                console.error('Error adding Dia Chi:', error);
                alert('Đã xảy ra lỗi .');
            });
    };

    const handleEditThongTin = (e) => {
        e.preventDefault();

       // Kiểm tra trường Họ và Tên
        if (!tenNew || /\d/.test(tenNew)) {
            alert('Họ và Tên không được để trống và không chứa số.');
            return;
        }

        // Kiểm tra trường Số điện thoại
        if (!sdtNew || !/^\d{10}$/.test(sdtNew)) {
            alert('Số điện thoại không được để trống và phải có đúng 10 số.');
            return;
        }

        // Kiểm tra trường Password
        if (!passwordNew) {
            alert('Password không được để trống.');
            return;
        }

        // Kiểm tra trường Ngày sinh
        if (!ngaySinhNew) {
            alert('Ngày sinh không được để trống.');
            return;
        }


        const handleLogout = () => {
            // Thực hiện các thao tác đăng xuất, ví dụ: xóa token từ localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('currentUser');

            // Chuyển hướng người dùng về trang đăng nhập
            window.location.href = (`/login`);
        };
        // Nếu các trường đều hợp lệ, tiến hành thêm địa chỉ

            const id = getIdFromLocalStorage();
            const nguoiDungUpdate = {
                    ten : tenNew,
                    sdt : sdtNew,
                    ngaySinh: ngaySinhNew,
                    password : passwordNew,
                thongTinNguoiDungId: savedUser.thongTinNguoiDung.id,
            };

             accountservice.updateThongTin(id,nguoiDungUpdate)
            .then(nguoiDungUpdate => {
                console.log('Added Dia Chi:', nguoiDungUpdate);
                accountservice.getDiaChiByKhachHang()
                    .then(data => {
                        setDiaChiKhachHang(data);
                        alert('Thông tin đã được sửa thành công!');
                        handleLogout();
                        alert('Thông tin đã được cập nhật thành công. Vui lòng đăng nhập lại !');
                    })
                    .catch(error => console.error('Error:', error));
            })
                .catch(error => {
                    console.error('Error adding Dia Chi:', error);
                    alert('Đã xảy ra lỗi .');
                });
        };


        const thayDoiTenUpdate = (event) => {
        setTen(event.target.value)
        setTenNew(event.target.value)
    }
    const thayDoiSdtUpdate = (event) => {
        setSDT(event.target.value)
        setSDTNew(event.target.value)

    }

    const thayDoiNGaySinhUpdate = (event) => {
        setNgaySinh(event.target.value)
        setNgaySinhNew(event.target.value)
    }


    const thayDoiPassUpdate = (event) => {
        setPassword(event.target.value)
        setPasswordNew(event.target.value)
    }

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const viewDiaChiDetail = (id) => {
        // Tìm địa chỉ cụ thể trong danh sách diaChiKhachHang dựa trên id
        const selectedDiaChi = diaChiKhachHang.find(diaChi => diaChi.id === id);
        setSelectedAddressId(id);
        // Kiểm tra xem địa chỉ có tồn tại không
        if (selectedDiaChi) {
            // Điền thông tin địa chỉ vào các trường của form
            setTenNew(selectedDiaChi.ten);
            setSDTNew(selectedDiaChi.sdt);
            setDiaChiCuTheNew(selectedDiaChi.diaChiCuThe);
            setXaPhuongThiTranNew(selectedDiaChi.xaPhuongThiTran);
            setQuanHuyenNew(selectedDiaChi.quanHuyen);
            setTinhThanhPhoNew(selectedDiaChi.tinhThanhPho);

            // Lấy thông tin về thành phố, quận huyện từ selectedDiaChi và cập nhật state hoặc bất kỳ logic nào khác bạn muốn thực hiện
            const selectedTinhThanhPho = selectedDiaChi.tinhThanhPho;
            const selectedQuanHuyen = selectedDiaChi.quanHuyen;
            const selectedXaPhuong = selectedDiaChi.xaPhuongThiTran;

            // Lấy mã thành phố, quận huyện từ danh sách
            const selectedTinhThanhPhoCode = listThanhPho.find(tp => tp.ProvinceName === selectedTinhThanhPho)?.ProvinceID || 0;
            const selectedQuanHuyenCode = listQuanHuyen.find(qh => qh.DistrictName === selectedQuanHuyen)?.DistrictID || 0;
            const selectedXaPhuongCode = listXa.find(xp => xp.WardName === selectedXaPhuong)?.WardName || 0;

            // Cập nhật state hoặc bất kỳ logic nào khác bạn muốn thực hiện
            setCodeTP(selectedTinhThanhPhoCode);
            setCodeQuan(selectedQuanHuyenCode);
            setCodeXa(selectedXaPhuongCode);
        }
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleEditDiaChi = (e) => {
        e.preventDefault();

        // Kiểm tra trường Họ và Tên
        if (!tenNew || /\d/.test(tenNew)) {
            alert('Họ và Tên không được để trống và không chứa số.');
            return;
        }

        // Kiểm tra trường Số điện thoại
        if (!sdtNew || !/^\d{10}$/.test(sdtNew)) {
            alert('Số điện thoại không được để trống và phải có đúng 10 số.');
            return;
        }

        // Kiểm tra trường Thành phố
        if (!codeTP) {
            alert('Vui lòng chọn Thành phố.');
            return;
        }

        // Kiểm tra trường Quận huyện
        if (!codeQuan) {
            alert('Vui lòng chọn Quận huyện.');
            return;
        }

        // Kiểm tra trường Xã phường
        if (!codeXa) {
            alert('Vui lòng chọn Xã phường.');
            return;
        }

        // Kiểm tra trường Địa chỉ cụ thể
        if (!diaChiCuTheNew) {
            alert('Địa chỉ cụ thể không được để trống.');
            return;
        }

        // Nếu các trường đều hợp lệ, tiến hành thêm địa chỉ
        const updatedDiaChi = {
            ten: tenNew,
            sdt: sdtNew,
            diaChiCuThe: diaChiCuTheNew,
            xaPhuongThiTran: xaPhuongThiTranNew,
            quanHuyen: quanHuyenNew,
            tinhThanhPho: tinhThanhPhoNew,
            thongTinNguoiDungId: savedUser.thongTinNguoiDung.id,
        };

        accountservice.updateDiaChi(selectedAddressId,updatedDiaChi)
            .then(updatedDiaChi => {
                console.log('Added Dia Chi:', updatedDiaChi);
                accountservice.getDiaChiByKhachHang()
                    .then(data => {
                        setDiaChiKhachHang(data);
                        alert('Địa chỉ đã được sửa thành công!');
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => {
                console.error('Error adding Dia Chi:', error);
                alert('Đã xảy ra lỗi khi thêm địa chỉ.');
            });
    };


    const handleAddDiaChi = (e) => {
        e.preventDefault();

        // Kiểm tra trường Họ và Tên
        if (!tenNew || /\d/.test(tenNew)) {
            alert('Họ và Tên không được để trống và không chứa số.');
            return;
        }

        // Kiểm tra trường Số điện thoại
        if (!sdtNew || !/^\d{10}$/.test(sdtNew)) {
            alert('Số điện thoại không được để trống và phải có đúng 10 số.');
            return;
        }

        // Kiểm tra trường Thành phố
        if (!codeTP) {
            alert('Vui lòng chọn Thành phố.');
            return;
        }

        // Kiểm tra trường Quận huyện
        if (!codeQuan) {
            alert('Vui lòng chọn Quận huyện.');
            return;
        }

        // Kiểm tra trường Xã phường
        if (!codeXa) {
            alert('Vui lòng chọn Xã phường.');
            return;
        }

        // Kiểm tra trường Địa chỉ cụ thể
        if (!diaChiCuTheNew) {
            alert('Địa chỉ cụ thể không được để trống.');
            return;
        }

        // Nếu các trường đều hợp lệ, tiến hành thêm địa chỉ
        const newDiaChi = {
            ten: tenNew,
            sdt: sdtNew,
            diaChiCuThe: diaChiCuTheNew,
            xaPhuongThiTran: xaPhuongThiTranNew,
            quanHuyen: quanHuyenNew,
            tinhThanhPho: tinhThanhPhoNew,
            thongTinNguoiDungId: savedUser.thongTinNguoiDung.id,
        };

        accountservice.addDiaChi(newDiaChi)
            .then(addedDiaChi => {
                console.log('Added Dia Chi:', addedDiaChi);
                accountservice.getDiaChiByKhachHang()
                    .then(data => {
                        setDiaChiKhachHang(data);
                        alert('Địa chỉ đã được thêm thành công!');
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => {
                console.error('Error adding Dia Chi:', error);
                alert('Đã xảy ra lỗi khi thêm địa chỉ.');
            });
    };

    const handleDeleteDiaChi = (diaChiId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
            accountservice.delete(diaChiId)
                .then(() => {
                    // Xóa địa chỉ thành công, cập nhật danh sách
                    accountservice.getDiaChiByKhachHang()
                        .then(data => {
                            setDiaChiKhachHang(data);
                            alert('Địa chỉ đã được xóa thành công!');
                        })
                        .catch(error => console.error('Error:', error));
                })
                .catch(error => {
                    console.error('Error deleting Dia Chi:', error);
                    alert('Đã xảy ra lỗi khi xóa địa chỉ.');
                });
        }
    };


    const [newDiaChi, setNewDiaChi] = useState({
        ten: '',
        sdt: '',
        diaChiCuThe: '',
        xaPhuongThiTran: '',
        quanHuyen: '',
        tinhThanhPho: '',
        thongTinNguoiDungId: savedUser?.thongTinNguoiDung?.id,
    });


    const handleChange = (e, field) => {
        setNewDiaChi((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const getUserNameFromLocalStorage = () => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            return savedUser?.thongTinNguoiDung?.ten || '';
        } catch (error) {
            console.error('Error while retrieving user name from local storage:', error);
            return '';
        }
    };

    const getEmailFromLocalStorage = () => {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            return savedUser.email || '';
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

    const changeTen = (event) => {
        setTen(event.target.value)
        setTenNew(event.target.value)
    }

    const changeSDT = (event) => {
        setSDT(event.target.value)
        setSDTNew(event.target.value)
    }

    const changeDiaChiCuThe = (event) => {
        setDiaChiCuThe(event.target.value)
        setDiaChiCuTheNew(event.target.value)
    }

    const chonTP = (event) => {
        const tp = parseInt(event.target.value)
        setCodeTP(tp)
        listThanhPho.map(value => {
            if (value.ProvinceID === tp) {
                setTinhThanhPhoNew(value.ProvinceName)
                setTinhThanhPho(value.ProvinceName)
            }
        })
        setCodeQuan(0)
        setCodeXa(0)
        loadTP(tp)
    }

    const chonQH = (event) => {
        const qh = parseInt(event.target.value)
        setCodeQuan(qh)
        listQuanHuyen.map(value => {
            if (value.DistrictID === qh) {
                setQuanHuyenNew(value.DistrictName)
                setQuanHuyen(value.DistrictName)
            }
        })
        setCodeXa(0)
        loadXP(qh)
    }

    const chonXP = (event) => {
        const xp = String(event.target.value)
        setCodeXa(xp)
        listXa.map(value => {
            if (value.WardCode === xp) {
                setXaPhuongThiTranNew(value.WardName)
                setXaPhuongThiTran(value.WardName)
            }
        })
    }

    const loadTP = async () => {
        const responseTp = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const provincesData = responseTp.data.data;
        setListThanhPho(provincesData)
    }

    const loadQH = async (tp) => {
        const responseQH = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${tp}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const districtData = responseQH.data.data;
        setListQuanHuyen(districtData)
    }

    const loadXP = async (qh) => {
        const responseXP = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${qh}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const wardData = responseXP.data.data;
        setListXa(wardData)
    }

    useEffect(() => {
        loadTP();
    }, []);

    useEffect(() => {
        if (codeTP !== 0) {
            loadQH(codeTP);
        }
    }, [codeTP]);

    useEffect(() => {
        if (codeQuan !== 0) {
            loadXP(codeQuan);
        }
    }, [codeQuan]);

    const renderTabContent = () => {
        switch (activeTab) {
            case 'thongTinCoBan':
                return (
                    <div className="order-container">
                        <form>
                            <div className="order-container">
                                {/* Họ và tên */}
                                <div className="form-group">
                                    <label htmlFor="ten">Họ và tên: <span style={{ color: 'red' }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ten"
                                        value={tenNew}
                                        onChange={thayDoiTenUpdate}
                                    />
                                </div>
                                {/* Ngày Sinh */}
                                <div className="form-group">
                                    <label htmlFor="ngaySinh">Ngày Sinh: <span style={{color: 'red'}}>*</span></label>
                                    <input
                                        type="date"
                                        className={`form-control`}
                                        id="ngaySinh"
                                        value={ngaySinhNew}
                                        onChange={thayDoiNGaySinhUpdate}
                                    />
                                </div>
                                {/* SDT */}
                                <div className="form-group">
                                    <label htmlFor="sdt">SDT: <span style={{color: 'red'}}>*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control `}
                                        id="sdt"
                                        value={sdtNew}
                                        onChange={thayDoiSdtUpdate}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        Password: <span style={{color: 'red'}}>*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className={`form-control`}
                                            id="password"
                                            value={passwordNew}
                                            onChange={thayDoiPassUpdate}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                onClick={toggleShowPassword}
                                                style={{marginLeft: '10px', marginTop: '10px'}}
                                            >
                                                {/*<FontAwesomeIcon icon={this.state.showPassword ? faEye : faEyeSlash} />*/}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Update"
                                   style={{marginTop: '10px'}} onClick={handleEditThongTin}
                            />
                        </form>
                    </div>
                );
            case 'diaChiKhachHang':
                return (
                    <div className="order-container">
                        {diaChiKhachHang.length > 0 ? (
                            <table className="address-table">
                                <thead>
                                <tr>
                                    <th>Tên</th>
                                    <th>Địa Chỉ Cụ Thể</th>
                                    <th>Xã Phường Thị Trấn</th>
                                    <th>Quận/Huyện</th>
                                    <th>Tỉnh/Thành Phố</th>
                                    <th>Chi Tiết</th>
                                </tr>
                                </thead>
                                <tbody>
                                {diaChiKhachHang.map((diaChi) => (
                                    <tr key={diaChi.id}>
                                        <td>{diaChi.ten}</td>
                                        <td>{diaChi.diaChiCuThe}</td>
                                        <td>{diaChi.xaPhuongThiTran}</td>
                                        <td>{diaChi.quanHuyen}</td>
                                        <td>{diaChi.tinhThanhPho}</td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => viewDiaChiDetail(diaChi.id)}>Xem Chi Tiết</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteDiaChi(diaChi.id)}>Xóa</button>

                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No addresses available. Add a new address.</p>
                        )}
                        <div className="add-diaChi-container">
                            <h2>{isEditing ? 'Chỉnh Sửa Địa Chỉ' : 'Thêm Địa Chỉ Mới'}</h2>
                            <form onSubmit={isEditing ? handleEditDiaChi : handleAddDiaChi}>
                                <div style={{float: "left", width: "48%", marginLeft: 10, marginTop: 10}}>
                                    Họ và tên <a style={{color: "red"}}>*</a> :
                                    <input className={`form-control`} type="text" onChange={changeTen} value={tenNew}/>
                                </div>
                                <div style={{float: "left", width: "48%", marginLeft: 20, marginTop: 10}}>
                                    Số điện thoại <a style={{color: "red"}}>*</a> :
                                    <input className={`form-control`} type="text" onChange={changeSDT} value={sdtNew}/>
                                </div>
                                <div style={{float: "left", width: "32%", marginLeft: 10, marginTop: 20}}>
                                    Thành phố <a style={{color: "red"}}>*</a> :
                                    <select className={`form-control`} onChange={chonTP} value={codeTP}>
                                        <option value="">Chọn thành phố</option>
                                        {listThanhPho.map(tp => (
                                            <option value={tp.ProvinceID}>{tp.ProvinceName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{float: "left", width: "32%", marginLeft: 10, marginTop: 20}}>
                                    Quận huyện <a style={{color: "red"}}>*</a> :
                                    <select className={`form-control`} onChange={chonQH} value={codeQuan}>
                                        <option value="">Chọn quận huyện</option>
                                        {listQuanHuyen.map(tp => (
                                            <option value={tp.DistrictID}>{tp.DistrictName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{float: "left", width: "32%", marginLeft: 10, marginTop: 20}}>
                                    Xã phường <a style={{color: "red"}}>*</a> :
                                    <select className={`form-control`} onChange={chonXP} value={codeXa}>
                                        <option value="">Chọn xã phường</option>
                                        {listXa.map(tp => (
                                            <option value={tp.WardCode}>{tp.WardName}</option>
                                        ))}
                                    </select>
                                </div>
                                <br/>
                                <br/>
                                <div style={{float: "left", width: "100%", marginLeft: 10, marginTop: 30}}>
                                    Địa chỉ cụ thể <a style={{color: "red"}}>*</a> :
                                    <TextArea className={`form-control`} onChange={changeDiaChiCuThe}
                                              value={diaChiCuTheNew}/>
                                </div>
                                <button className="btn btn-warning" type="submit">{isEditing ? 'Lưu Thay Đổi' : 'Thêm Địa Chỉ'}</button>
                            </form>

                        </div>
                        <button className="btn btn-dark" onClick={handleToggleEdit}>
                            {isEditing ? 'Hủy Bỏ' : 'Chỉnh Sửa'}
                        </button>
                    </div>
                );
            default:
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
                    <div className="username">{getUserNameFromLocalStorage()} ({getEmailFromLocalStorage()})</div>
                    {/*<div className="username">{getEmailFromLocalStorage()}</div>*/}
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

                <section className="purchase-tabs" role="tablist"><a
                    className={`purchase-tab ${activeTab === 'thongTinCoBan' ? 'active' : ''}`}
                    title="Hoàn thành"
                    role="tab"
                    aria-selected={activeTab === 'thongTinCoBan'}
                    onClick={() => handleTabClick('thongTinCoBan')}
                >
                    <span>Thông tin cơ bản</span>
                </a>

                    <a
                        className={`purchase-tab ${activeTab === 'diaChiKhachHang' ? 'active' : ''}`}
                        title="Mua tại quầy"
                        role="tab"
                        aria-selected={activeTab === 'diaChiKhachHang'}
                        onClick={() => handleTabClick('diaChiKhachHang')}
                    >
                        <span>Địa chỉ khách hàng</span>
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
