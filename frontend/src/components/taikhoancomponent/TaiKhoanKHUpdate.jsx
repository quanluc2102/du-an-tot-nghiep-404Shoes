import React, { Component } from 'react';
import taikhoanservice from '../../services/taikhoanservice/taikhoanservice';
import { toast } from 'react-toastify';
import axios from "axios";
import "./khachHangUpdate.css";
class TaiKhoanKHUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen3: [],
            thongTinNguoiDung: [],
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe: '',
            provinces: [],
            districts: [],
            cities: [],
            diaChi: [],
            wards: [],
            files: null,
            selectedDistrict: '',
            selectedWard: '',

            // addresses: [],
            pageCount: 0,
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                maTaiKhoan: '',
                email: '',
                anh: '',
            },
            nguoiDungUpdate: {
                id: this.props.match.params.id,
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                addresses: [],
            },
            // currentAddress: {},

            currentAddress: {
                ten: '',
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },
            errorUpdate: {
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            },
            addresses: [
                {
                    ten: '',
                    sdt: '',
                    diaChiCuThe: '',
                    tinhThanhPho: '',
                    quanHuyen: '',
                    xaPhuongThiTran: '',
                    isDefault: false,
                }
            ],


        };
        this.update = this.update.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiTinhUpdate = this.thayDoiTinhUpdate.bind(this);
        this.thayDoiHuyenUpdate = this.thayDoiHuyenUpdate.bind(this);
        this.thayDoiXaUpdate = this.thayDoiXaUpdate.bind(this);
        this.thayDoiTenDiaChi = this.thayDoiTenDiaChi.bind(this);
        this.thayDoiSoDienThoaiDiaChi = this.thayDoiSoDienThoaiDiaChi.bind(this);
        this.thayDoiTinhThanhPhoDiaChi = this.thayDoiTinhThanhPhoDiaChi.bind(this);
        this.thayDoiPhuongXaDiaChi = this.thayDoiPhuongXaDiaChi.bind(this);
        this.thayDoiQuanHuyenDiaChi = this.thayDoiQuanHuyenDiaChi.bind(this);
        this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);

    }


    componentDidMount() {
        const id = this.props.match.params.id;
        const storedAddresses = localStorage.getItem('addresses');
        const defaultDistrict = "Default District";
        const defaultWard = "Default Ward";

        // Lấy danh sách tỉnh/thành phố khi component được mount
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then((response) => {
                this.setState({ provinces: response.data });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
            })
            .finally(() => {
                // Nếu có địa chỉ được lưu trữ, cập nhật state
                if (storedAddresses) {
                    this.setState({
                        addresses: JSON.parse(storedAddresses),
                    });
                }

                // Thiết lập giá trị mặc định trong state
                this.setState((prevState) => ({
                    nguoiDungUpdate: {
                        ...prevState.nguoiDungUpdate,
                        quanHuyen: prevState.nguoiDungUpdate.quanHuyen || defaultDistrict,
                        xaPhuongThiTran: prevState.nguoiDungUpdate.xaPhuongThiTran || defaultWard,
                    },
                }));

                // Thực hiện fetch các thành phố khi component được mount
                this.fetchCities();

                // Lấy thông tin tài khoản và thông tin người dùng
                taikhoanservice.getTaiKhoanById(id)
                    .then((response) => {
                        const taiKhoanData = response.data;
                        this.setState({ taiKhoanUpdate: taiKhoanData });

                        taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
                            .then((thongTinResponse) => {
                                const thongTinData = thongTinResponse.data;
                                this.setState({ nguoiDungUpdate: thongTinData });
                            })
                            .catch((error) => {
                                console.error('Lỗi khi lấy thông tin người dùng:', error);
                            });
                    })
                    .catch((error) => {
                        console.error('Lỗi khi lấy tài khoản người dùng:', error);
                    });
            });
    }
    resetForm() {
        const storedAddresses = localStorage.getItem('addresses');
        const defaultDistrict = "Default District";
        const defaultWard = "Default Ward";

        // Nếu có địa chỉ được lưu trữ, cập nhật state
        if (storedAddresses) {
            this.setState({
                addresses: JSON.parse(storedAddresses),
            });
        }

        // Thiết lập giá trị mặc định trong state
        this.setState((prevState) => ({
            nguoiDungUpdate: {
                ...prevState.nguoiDungUpdate,
                quanHuyen: prevState.nguoiDungUpdate.quanHuyen || defaultDistrict,
                xaPhuongThiTran: prevState.nguoiDungUpdate.xaPhuongThiTran || defaultWard,
            },
            selectedDistrict: prevState.nguoiDungUpdate.quanHuyen || defaultDistrict,
            selectedWard: prevState.nguoiDungUpdate.xaPhuongThiTran || defaultWard,
        }));

        // Thực hiện fetch các thành phố khi component được mount
        this.fetchCities();
    }

    update = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn sửa khách hàng?');
        console.log("Update button clicked");
        let listFile = [];
        for (let i = 0; i < (this.state.files || []).length; i++) {
            listFile.push(this.state.files[i].name);
            const {taiKhoanUpdate, nguoiDungUpdate, addresses} = this.state;
            const requestData = {
                taiKhoan: taiKhoanUpdate,
                thongTinNguoiDung: nguoiDungUpdate,
                addresses: addresses,
                files: listFile,
                diaChiCuThe: nguoiDungUpdate.diaChiCuThe,
                tinhThanhPho: this.state.tinhThanhPho,
                quanHuyen: this.state.quanHuyen,
                xaPhuongThiTran: this.state.xaPhuongThiTran,
            };

            console.log('Request Data:', JSON.stringify(requestData));

            taikhoanservice
                .updateKhachHang(requestData, this.state.taiKhoanUpdate.id)
                .then((response) => {
                    const {taiKhoan, thongTinNguoiDung} = response.data;
                    this.setState({
                        taiKhoanUpdate: taiKhoan,
                        nguoiDungUpdate: thongTinNguoiDung,
                    });

                    // Reset currentAddress after the update
                    this.setState({
                        currentAddress: this.emptyAddress(),
                    });

                    setTimeout(() => {
                        window.location.href = `/khachhang`;
                    }, 2000);
                    toast.success('Sửa thành công!');
                })
                .catch((error) => {
                    console.error('Lỗi khi yêu cầu cập nhật:', error);
                    toast.error('Lỗi khi cập nhật');
                });
        }
    };


    thayDoiTinhUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    tinhThanhPho: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, tinhThanhPho: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiHuyenUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    quanHuyen: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, quanHuyen: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiXaUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    xaPhuongThiTran: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, xaPhuongThiTran: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    thayDoiDiaChiUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    diaChiCuThe: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, diaChiCuThe: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    isValidAddress = (address) => {
        // Thêm logic kiểm tra địa chỉ ở đây và hiển thị lỗi nếu cần
        // Trả về true nếu hợp lệ, false nếu không
        console.log('Address validation result:', address);
        return Object.keys(address).length > 0; // Ví dụ: Điều kiện kiểm tra có thể khác
    };


    themDiaChiMoi = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn thêm mới địa chỉ?');
        const { currentAddress, addresses } = this.state;

        if (!this.isValidAddress(currentAddress)) {
            return;
        }

        // Kiểm tra xem currentAddress đã có trong danh sách địa chỉ chưa
        const existingAddressIndex = addresses.findIndex(
            (address) => address.ten === currentAddress.ten && address.sdt === currentAddress.sdt
        );

        if (existingAddressIndex !== -1) {
            // Cập nhật địa chỉ đã tồn tại
            const updatedAddresses = [...addresses];
            updatedAddresses[existingAddressIndex] = { ...currentAddress };
            localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

            this.setState({
                addresses: updatedAddresses,
                currentAddress: this.emptyAddress(),
            });
        } else {
            // Thêm địa chỉ mới
            const newAddress = {
                ten: currentAddress.ten || '',
                sdt: currentAddress.sdt || '',
                diaChiCuThe: currentAddress.diaChiCuThe || '',
                tinhThanhPho: currentAddress.tinhThanhPho || '',
                quanHuyen: currentAddress.quanHuyen || '',
                xaPhuongThiTran: currentAddress.xaPhuongThiTran || '',
            };

            const updatedAddresses = [...addresses, newAddress];
            localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

            this.setState({
                addresses: updatedAddresses,
                currentAddress: this.emptyAddress(),
            });
        }
    };


// Thêm hàm để tạo địa chỉ trắng mới
    emptyAddress() {
        return {
            ten: '',
            sdt: '',
            diaChiCuThe: '',
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
        };
    }


    handleChange = (e, field) => {
        const { currentAddress } = this.state;
        const updatedAddress = { ...currentAddress, [field]: e.target.value };
        this.setState({
            currentAddress: updatedAddress,
        });
    };


    setAsDefaultAddress(index) {
        const updatedAddresses = [...this.state.addresses];
        updatedAddresses.forEach((address, i) => {
            if (i === index) {
                address.isDefault = true;
            } else {
                address.isDefault = false;
            }
        });

        this.setState({ addresses: updatedAddresses });
    }



    editAddress(index) {
        const selectedAddress = this.state.addresses[index];
        if (selectedAddress) {
            this.setState({
                editingAddressIndex: index,
                currentAddress: {
                    ten: selectedAddress.ten || '',
                    sdt: selectedAddress.sdt || '',
                    diaChiCuThe: selectedAddress.diaChiCuThe || '',
                    tinhThanhPho: selectedAddress.tinhThanhPho || '',
                    quanHuyen: selectedAddress.quanHuyen || '',
                    xaPhuongThiTran: selectedAddress.xaPhuongThiTran || '',
                },
            });
        }
    }


    cancelEditAddress() {
        this.setState({ editingAddressName: null });
    }

    saveEditedAddress() {
        const { editingAddressName, currentAddress } = this.state;
        const updatedAddresses = [...this.state.addresses];
        const index = updatedAddresses.findIndex(address => address.ten === editingAddressName);
        updatedAddresses[index] = { ...currentAddress };
        localStorage.setItem('addresses', JSON.stringify(updatedAddresses));

        // Đặt lại trạng thái chỉnh sửa
        this.setState({
            addresses: updatedAddresses,
            currentAddress: this.emptyAddress(),
            editingAddressIndex: null,
        });
    }



    thayDoiAnhUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    anh: event.target.value
                }
            })
        );
        this.setState({files: [...event.target.files]})
        let errorUpdate = {...this.state.errorUpdate, anh: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    thayDoiTenDiaChi = (e, addressIndex) => {
        const {addresses} = this.state;
        const newAddresses = [...addresses];
        newAddresses[addressIndex] = {
            ...newAddresses[addressIndex],
            ten: e.target.value,
        };

        this.setState({
            addresses: newAddresses,
        });
    };


    thayDoiSoDienThoaiDiaChi = (e, index) => {
        const {addresses} = this.state;
        const newAddresses = [...addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            sdt: e.target.value,
        };

        console.log('Mảng Địa Chỉ Mới:', newAddresses);

        this.setState({
            addresses: newAddresses,
        });
    };

    thayDoiEmailUpdate = (e) => {
        const {taiKhoanUpdate} = this.state;
        this.setState({
            taiKhoanUpdate: {
                ...taiKhoanUpdate,
                email: e.target.value,
            },
        });
    };

    thayDoiTenUpdate = (e) => {
        const {nguoiDungUpdate} = this.state;
        this.setState({
            nguoiDungUpdate: {
                ...nguoiDungUpdate,
                ten: e.target.value,
            },
        });
    };

    xoaDiaChiMoi = (index) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ?');
        const { addresses } = this.state;
        const newAddresses = [...addresses];
        newAddresses.splice(index, 1);

        // Lưu các địa chỉ đã cập nhật vào localStorage hoặc cơ chế lưu trữ ưa thích của bạn
        localStorage.setItem('addresses', JSON.stringify(newAddresses));

        this.setState({
            addresses: newAddresses,
        });
    };


    handleAvatarChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Tạo đối tượng FileReader để đọc file
            const reader = new FileReader();

            // Xử lý khi FileReader hoàn thành việc đọc
            reader.onloadend = () => {
                // Cập nhật trạng thái với đường dẫn ảnh mới
                this.setState({
                    nguoiDungUpdate: {
                        ...this.state.nguoiDungUpdate,
                        anh: reader.result,
                    },
                });
            };

            // Đọc file dưới dạng URL
            reader.readAsDataURL(file);
        }
    };

    thayDoiTinhThanhPhoDiaChi = (event, index) => {
        const { addresses } = this.state;
        const newAddresses = [...addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            tinhThanhPho: event.target.value,
        };

        this.setState({
            addresses: newAddresses,
        });

        console.log('Thành phố đã chọn:', event.target.value);

        // Thêm nhiều câu lệnh console.log hoặc sử dụng điểm dừng để gỡ lỗi thêm.

        // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
        const selectedProvince = event.target.value;
        if (selectedProvince) {
            const selectedProvinceObject = this.state.cities.find(city => city.name === selectedProvince);
            console.log('Đối tượng Tỉnh/Thành Phố đã chọn:', selectedProvinceObject);
            this.fetchDistricts(selectedProvinceObject, index); // Truyền thêm index
        }
    };


    thayDoiQuanHuyenDiaChi = (event, index) => {
        const {addresses} = this.state;
        const newAddresses = [...addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            quanHuyen: event.target.value,
        };

        this.setState({
            addresses: newAddresses,
        });

        // Lấy danh sách xã/phường dựa trên quận/huyện đã chọn
        const selectedDistrict = this.state.districts.find(district => district.name === event.target.value);
        if (selectedDistrict) {
            this.fetchWards(selectedDistrict, index); // Truyền thêm index
        }
    };


    thayDoiPhuongXaDiaChi = (event, index) => {
        const {addresses} = this.state;
        const newAddresses = [...addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            xaPhuongThiTran: event.target.value,
        };

        this.setState({
            addresses: newAddresses,
        });
    };


    thayDoiDiaChiCuTheDiaChi = (e, index) => {
        const {addresses} = this.state;
        const newAddresses = [...addresses];
        newAddresses[index].diaChiCuThe = e.target.value; // Update 'diaChiCuThe' instead of 'detailedAddress'

        console.log('Mảng Địa Chỉ Mới:', newAddresses);

        this.setState({
            addresses: newAddresses,
        });
    };


    fetchCities() {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                this.setState({cities: response.data});
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }

    fetchDistricts(selectedCity) {
        axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
            .then((response) => {
                this.setState({districts: response.data.districts});
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    }

    fetchWards(selectedDistrict) {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
            .then((response) => {
                const wards = response.data.wards || [];
                this.setState({wards: wards});
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách phường/xã:', error);
            });
    }


    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        this.setState({
            currentAddress: {
                ...this.state.currentAddress,
                tinhThanhPho: selectedCityName,
            },
            districts: [], // Reset districts when city changes
            wards: [], // Reset wards when city changes
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity); // Fetch districts based on the selected city
        }
    }

    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        this.setState((prevState) => ({
            selectedDistrict: selectedDistrictName,
            currentAddress: {
                ...prevState.currentAddress,
                quanHuyen: selectedDistrictName,
            },
        }));

        // Lấy danh sách xã/phường dựa trên quận đã chọn
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);
        if (selectedDistrict) {
            this.fetchWards(selectedDistrict);
        }
    }


    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState((prevState) => ({
            selectedWard: selectedWardName,
            currentAddress: {
                ...prevState.currentAddress,
                xaPhuongThiTran: selectedWardName,
            },
        }));
    }


    render() {
        console.log('Render Addresses:', this.state.addresses);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Tài khoản khách hàng</h1>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.update}>
                                        <div className="update-form">
                                            <div className="left-column">
                                                <div className="form-group">
                                                    <label htmlFor="avatar">Ảnh đại diện:</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={this.handleAvatarChange}
                                                        id="anh"
                                                    />
                                                    {this.state.errorUpdate.anh && <div className="text-danger">{this.state.errorUpdate.anh}</div>}

                                                    {this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.anh && (
                                                        <img
                                                            src={this.state.nguoiDungUpdate.anh}
                                                            alt="anh"
                                                            style={{ maxWidth: '100px', maxHeight: '100px', marginTop: '10px' }}
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    Mã KH:
                                                    <input
                                                        type="text"
                                                        defaultValue={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.maTaiKhoan ? this.state.taiKhoanUpdate.maTaiKhoan : ''}
                                                        readOnly
                                                    />

                                                    {this.state.errorUpdate.maTaiKhoan && <div className="text-danger">{this.state.errorUpdate.maTaiKhoan}</div>}
                                                </div>
                                                <div>
                                                    Họ và tên:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.ten ? this.state.nguoiDungUpdate.ten : ''}
                                                        onChange={this.thayDoiTenUpdate}
                                                    />
                                                    {this.state.errorUpdate.ten && <div className="text-danger">{this.state.errorUpdate.ten}</div>}
                                                </div>
                                                <div>
                                                    Email:
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                        name="email"
                                                        value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.email ? this.state.taiKhoanUpdate.email : ''}
                                                        onChange={this.thayDoiEmailUpdate}
                                                    />
                                                    {this.state.errorUpdate.email && <div className="text-danger">{this.state.errorUpdate.email}</div>}
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="tinhThanhPho">Tỉnh/Thành phố:</label>
                                                    <select
                                                        className="form-control"
                                                        name="tinhThanhPho"
                                                        onChange={(event) => this.handleCityChange(event)}
                                                    >
                                                        <option value={this.state.tinhThanhPho}>Chọn tỉnh thành</option>
                                                        {this.state.cities.map(city => (
                                                            <option key={city.code} value={city.name} selected={city.name === this.state.tinhThanhPho}>
                                                                {city.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="quanHuyen">Quận/Huyện:</label>
                                                    <select
                                                        className="form-control"
                                                        name="quanHuyen"
                                                        onChange={(event) => this.handleDistrictChange(event)}
                                                    >
                                                        <option value={this.state.quanHuyen}>Chọn quận huyện</option>
                                                        {this.state.districts.map(district => (
                                                            <option key={district.code} value={district.name} selected={district.name === this.state.quanHuyen}>
                                                                {district.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="xaPhuongThiTran">Xã/Phường/Thị trấn:</label>
                                                    <select
                                                        className="form-control"
                                                        name="xaPhuongThiTran"
                                                        onChange={(event) => this.handleWardChange(event)}
                                                    >
                                                        <option  value={this.state.xaPhuongThiTran}>Chọn phường xã</option>
                                                        {this.state.wards.map(ward => (
                                                            <option key={ward.code} value={ward.name} selected={ward.name === this.state.xaPhuongThiTran}>
                                                                {ward.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="diaChiCuThe">Địa chỉ cụ thể:</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${this.state.errorUpdate.diaChiCuThe ? 'is-invalid' : ''}`}
                                                        id="diaChiCuThe"
                                                        onChange={this.thayDoiDiaChiUpdate}
                                                        value={this.state.nguoiDungUpdate.diaChiCuThe}
                                                    />
                                                    {this.state.errorUpdate.diaChiCuThe && <div className="invalid-feedback">{this.state.errorUpdate.diaChiCuThe}</div>}
                                                </div>
                                                {/* ... */}

                                            </div>
                                            <div className="right-column">
                                                <h2>Thêm địa chỉ mới</h2>
                                                {this.state.addresses.map((address, index) => (
                                                    <div key={index}>
                                                        <h3>Địa chỉ {index + 1}</h3>
                                                        <div>
                                                            Tên:
                                                            <input
                                                                type="text"
                                                                value={address.ten || ''}
                                                                onChange={(e) => this.thayDoiTenDiaChi(e, index)}
                                                            />
                                                        </div>
                                                        <div>
                                                            Số điện thoại:
                                                            <input
                                                                type="text"
                                                                value={address.sdt || ''}
                                                                onChange={(e) => this.thayDoiSoDienThoaiDiaChi(e, index)}
                                                            />
                                                        </div>
                                                        <div>
                                                            Tỉnh/Thành phố:
                                                            <select
                                                                className="form-control"
                                                                onChange={(e) => this.thayDoiTinhThanhPhoDiaChi(e, index)}
                                                                value={address.tinhThanhPho || ''}
                                                            >
                                                                <option value="">Chọn tỉnh thành phố</option>
                                                                {this.state.provinces.map(province => (
                                                                    <option key={province.code} value={province.name}>
                                                                        {province.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            Quận/Huyện:
                                                            <select
                                                                className="form-control"
                                                                onChange={(e) => this.thayDoiQuanHuyenDiaChi(e, index)}
                                                                value={address.quanHuyen || ''}
                                                            >
                                                                <option value="">Chọn quận huyện</option>
                                                                {this.state.districts.map(district => (
                                                                    <option key={district.code}
                                                                            value={district.name}>{district.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            Xã/Phường/Thị trấn:
                                                            <select
                                                                className="form-control"
                                                                onChange={(e) => this.thayDoiPhuongXaDiaChi(e, index)}
                                                                value={address.xaPhuongThiTran || ''}
                                                            >
                                                                <option value="">Chọn phường xã</option>
                                                                {this.state.wards.map(ward => (
                                                                    <option key={ward.code}
                                                                            value={ward.name}>{ward.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor={`diaChiCuThe-${index}`}>Địa chỉ cụ thể:</label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${this.state.errorUpdate.diaChiCuThe ? 'is-invalid' : ''}`}
                                                                id={`diaChiCuThe-${index}`}
                                                                onChange={(e) => this.thayDoiDiaChiCuTheDiaChi(e, index)}
                                                                value={address.diaChiCuThe || ''}
                                                            />
                                                            {this.state.errorUpdate.diaChiCuThe && <div className="invalid-feedback">{this.state.errorUpdate.diaChiCuThe}</div>}
                                                        </div>
                                                        {index === this.state.editingAddressIndex ? (
                                                            <>

                                                                <button
                                                                    onClick={() => this.cancelEditAddress()}
                                                                    style={{ backgroundColor: 'red', color: 'white' }}
                                                                >
                                                                    Hủy Chỉnh Sửa
                                                                </button>


                                                                <button
                                                                    onClick={() => this.saveEditedAddress(index)}
                                                                    style={{ backgroundColor: 'green', color: 'white' }}
                                                                >
                                                                    Lưu Chỉnh Sửa
                                                                </button>

                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => this.xoaDiaChiMoi(index)}>Xóa Địa Chỉ</button>
                                                                <button
                                                                    onClick={() => this.editAddress(index)}
                                                                    style={{ backgroundColor: 'yellow', color: 'black' }} // Thiết lập màu trực tiếp
                                                                >
                                                                    Chỉnh sửa
                                                                </button>
                                                               
                                                            </>
                                                        )}
                                                    </div>

                                                ))}

                                                {/* Nút để thêm địa chỉ mới */}
                                                <button onClick={(e) => this.themDiaChiMoi(e)}>Thêm Địa Chỉ Mới</button>


                                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px', display: 'block', margin: 'auto' }}>
                                                    Update
                                                </button>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default TaiKhoanKHUpdate;
