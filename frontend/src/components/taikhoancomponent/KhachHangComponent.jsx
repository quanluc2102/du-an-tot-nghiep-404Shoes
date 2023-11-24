import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import axios from "axios";
import "./themKH.css";
class KhachHangComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: [],
            nhanVienQuyen3: [],
            itemsPerPage: 5,
            currentPage: 1,
            filterStatus: 'all',
            searchValue: '',
            provinces: [],
            districts: [],
            cities: [],
            diaChi: [],
            wards: [],
            addresses: [],
            savedAddresses: [],
            isDefaultAddress: false,
            isAddingAddress: false,
            isEditing: false,
            editingData: {},
            newAddress: {
                ten: '',
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                isDefaultAddress: false,
            },

        };
    }

    // componentDidMount(pageNumber) {
    //     const storedAddresses = localStorage.getItem('addresses');
    //     const storedAddressList = localStorage.getItem('newAddressList');
    //     this.fetchCities();
    //     taikhoanservice.getKhachHang(pageNumber)
    //         .then(res => {
    //             this.setState({
    //                 nhanVienQuyen3: res.data,
    //                 pageCount: res.data.totalPages,
    //             });
    //         });
    //     const id = this.props.match.params.id;
    //     if (id) {
    //         taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
    //             this.setState({taiKhoanUpdate: res.data});
    //         })
    //     }
    //     axios.get("https://provinces.open-api.vn/api/?depth=1")
    //         .then((response) => {
    //             this.setState({ provinces: response.data });
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching provinces:', error);
    //         });
    //     if (storedAddressList) {
    //         this.setState({
    //             savedAddresses: JSON.parse(storedAddressList),
    //         });
    //     }
    // }

    componentDidMount() {
        // Lấy giá trị của pageNumber từ trạng thái hoặc sử dụng giá trị cố định
        const pageNumber = this.state.pageNumber || 1;

        // Lấy dữ liệu địa chỉ từ localStorage
        const storedAddresses = localStorage.getItem('addresses');
        const storedAddressList = localStorage.getItem('newAddressList');

        // Fetch dữ liệu từ API
        this.fetchCities();

        // Fetch dữ liệu khách hàng
        taikhoanservice.getKhachHang(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen3: res.data,
                    pageCount: res.data.totalPages,
                });
            });

        // Nếu có id, lấy thông tin tài khoản từ API
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            });
        }

        // Fetch dữ liệu tỉnh thành phố
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then((response) => {
                this.setState({ provinces: response.data });
            })
            .catch((error) => {
                console.error('Error fetching provinces:', error);
            });

        // Nếu có dữ liệu địa chỉ trong localStorage, cập nhật state
        if (storedAddressList) {
            this.setState({
                savedAddresses: JSON.parse(storedAddressList),
            });
        }
    }

    handlePageClick = (selectedPage) => {
        const pageNumber = selectedPage.selected + 1; // ReactPaginate uses zero-based indexing
        this.setState({pageNumber}, () => {
            this.loadKhachHangData(pageNumber);
        });
    };

    loadKhachHangData(pageNumber) {
        taikhoanservice.getKhachHang(pageNumber)
            .then(response => {
                this.setState({
                    nhanVienQuyen3: response.data,
                    pageCount: response.data.totalPages,
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handleNewAddressChange = (event) => {
        const { name, value, type, checked } = event.target;

        this.setState((prevState) => {
            if (type === 'checkbox') {
                const isDefault = checked;

                const updatedAddresses = prevState.savedAddresses.map((address) => ({
                    ...address,
                    isDefaultAddress: address.stt === prevState.editingData.stt ? isDefault : false,
                }));

                return {
                    newAddress: {
                        ...prevState.newAddress,
                        isDefaultAddress: prevState.isEditing ? isDefault : false,
                    },
                    savedAddresses: updatedAddresses,
                    editingData: {
                        ...prevState.editingData,
                        [name]: value,
                        isDefaultAddress: isDefault,
                    },
                };
            } else {
                return {
                    newAddress: {
                        ...prevState.newAddress,
                        [name]: value,
                    },
                };
            }
        }, () => {
            console.log('Trạng thái đã cập nhật:', this.state);
        });
    };



    handleInputChange = (name, value) => {
        this.setState((prevState) => ({
            newAddress: {
                ...prevState.newAddress,
                [name]: value,
            },
            editingData: {
                ...prevState.editingData,
                [name]: value,
            },
        }));
    };


    handleCheckboxChange = (name, checked) => {
        this.setState((prevState) => ({
            newAddress: {
                ...prevState.newAddress,
                [name]: checked,
            },
            editingData: {
                ...prevState.editingData,
                [name]: checked,
            },
        }));
    };


    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.isEditing) {
            this.handleEditSubmit(event); // Pass the event parameter
        } else {
            this.handleAddSubmit();
        }
    };

    handleAddSubmit = () => {
        // Thêm địa chỉ mới vào danh sách đã lưu
        const newAddressList = [
            ...this.state.savedAddresses,
            {
                ...this.state.newAddress,
                stt: this.state.savedAddresses.length + 1, // Tăng số thứ tự khi thêm địa chỉ mới
            },
        ];

        // Cập nhật danh sách địa chỉ trong localStorage
        this.updateLocalStorageAddresses(newAddressList);

        this.setState({
            isAddingAddress: true, // Đóng biểu mẫu thêm địa chỉ mới
            savedAddresses: newAddressList,
            newAddress: {
                ten: '',
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                isDefaultAddress: false,
            },
        });
    };

// Hàm cập nhật localStorage
    updateLocalStorageAddresses = (newAddressList) => {
        localStorage.setItem('newAddressList', JSON.stringify(newAddressList));
    };





    handleEditAddress = (address) => {
        console.log('Editing data:', address);
        this.setState({
            isEditing: true,
            editingData: {
                ...address, // Đảm bảo rằng bạn đang cập nhật tất cả các trường cần thiết
            },
        });
    };



    handleEditSubmit = (event) => {
        event.preventDefault();

        // Tạo một bản sao sâu của editingData
        const editedAddress = { ...this.state.editingData };

        // Cập nhật danh sách địa chỉ
        const updatedAddresses = this.state.savedAddresses.map((address, index) => {
            if (index === editedAddress.stt - 1) {
                return { ...editedAddress };
            } else {
                return { ...address };
            }
        });
        // Lưu trạng thái vào localStorage
        localStorage.setItem('editedData', JSON.stringify(this.state));

        // Update the isDefaultAddress for newAddress as well
        const updatedNewAddress = {
            ...this.state.newAddress,
            isDefaultAddress: this.state.newAddress.isDefaultAddress || false,
        };

        this.setState({
            savedAddresses: updatedAddresses,
            isEditing: false,
            editingData: {},
            newAddress: updatedNewAddress,
        }, () => {
            // Đặt lại giá trị của các trường sau khi chỉnh sửa xong
            this.handleInputChange("ten", ""); // Đặt lại giá trị của trường "Tên"
            this.handleInputChange("sdt", ""); // Đặt lại giá trị của trường "Số điện thoại"
            this.handleInputChange("diaChiCuThe", ""); // Đặt lại giá trị của trường "Địa chỉ cụ thể"
        });
    };


    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };
    handleCloseEditDialog = () => {
        this.setState({
            isEditing: false,
            isAddingAddress: false,
            editingData: {
                ten: '',
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },
            newAddress: {
                ten: '', // Đặt lại giá trị của trường "Tên" khi đóng form chỉnh sửa
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                isDefaultAddress: false,
            },
        });
    };



    handleFilterChange = (event) => {
        const filterStatus = event.target.value;
        this.setState({filterStatus});
    }

    handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        this.setState({
            searchValue,
            currentPage: 1, // Reset currentPage when searching
        });
    };

    add(id) {
        window.location.href = '/addKhachHang';

    }

    detail(id) {
        window.location.href = `/khachhangdetail/${id}`;
    }
    toggleThemDiaChiMoi = () => {
        const { isEditing, editingData } = this.state;
        this.setState({
            isAddingAddress: !isEditing, // Đặt isAddingAddress thành ngược của isEditing
            editingData: isEditing ? editingData : {}, // Nếu đang chỉnh sửa, sử dụng editingData, ngược lại là đặt về trạng thái rỗng
        });
    };



    toggleTaiKhoan = (id, currentTaiKhoan) => {
        const newTrangThai = !currentTaiKhoan; // Simply toggle the status

        taikhoanservice.updateTaiKhoanTrangThai({ trangThai: newTrangThai }, id)
            .then((res) => {
                const taiKhoanCapNhat = res.data;

                this.setState((prevState) => ({
                    nhanVienQuyen3: prevState.nhanVienQuyen3.map(tk =>
                        tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                    ),
                }));
            })
            .catch((error) => {
                console.error('Error updating account status:', error);
            });
        if (this.state.isEditing && this.state.editingData.id === id) {
            const updatedEditingData = {
                ...this.state.editingData,
                isDefaultAddress: newTrangThai,
            };

            this.setState((prevState) => ({
                editingData: updatedEditingData,
                savedAddresses: prevState.savedAddresses.map((address) =>
                    address.id === prevState.editingData.id ? updatedEditingData : address
                ),
            }));
        }
    };

    handleEditCheckboxChange = () => {
        const { isEditing, editingData, newAddress } = this.state;

        const isDefault = !isEditing ? newAddress.isDefaultAddress : !editingData.isDefaultAddress;

        this.setState((prevState) => {
            let sttCounter = 1;
            const updatedAddresses = prevState.savedAddresses.map((address) => ({
                ...address,
                isDefaultAddress: address.stt === prevState.editingData.stt ? isDefault : false,
                stt: isDefault ? sttCounter++ : address.stt,
            }));

            return {
                newAddress: {
                    ...prevState.newAddress,
                    isDefaultAddress: isDefault,
                },
                savedAddresses: updatedAddresses,
            };
        });
    };


    fetchCities() {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                this.setState({ cities: response.data }, () => {
                    // Fetch districts for the first city in the list
                    const firstCity = this.state.cities[0];
                    if (firstCity) {
                        this.fetchDistricts(firstCity);
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }

    fetchDistricts(selectedCity) {
        axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
            .then((response) => {
                console.log('Đã lấy danh sách quận huyện:', response.data.districts);
                this.setState({ districts: response.data.districts }, () => {
                    // Fetch wards for the first district in the list
                    const firstDistrict = this.state.districts[0];
                    if (firstDistrict) {
                        this.fetchWards(firstDistrict);
                    }
                });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách quận huyện:', error);
            });
    }

    fetchWards(selectedDistrict) {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
            .then((response) => {
                const wards = response.data.wards || [];
                this.setState({ wards: wards });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách phường/xã:', error);
            });
    }
    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        console.log('Tỉnh/thành phố được chọn:', selectedCity);

        this.setState((prevState) => ({
            newAddress: {
                ...prevState.newAddress,
                tinhThanhPho: selectedCityName,
            },
            editingData: {
                ...prevState.editingData,
                tinhThanhPho: selectedCityName,
            }
        }));

        if (selectedCity) {
            this.fetchDistricts(selectedCity);
        }
    }



    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        console.log('Quận/huyện được chọn:', selectedDistrict);

        this.setState((prevState) => ({
            newAddress: {
                ...prevState.newAddress,
                quanHuyen: selectedDistrict ? selectedDistrict.name : '',
            },
            editingData: {
                ...prevState.editingData,
                quanHuyen: selectedDistrict ? selectedDistrict.name : '',
            }
        }));

        if (selectedDistrict) {
            this.fetchWards(selectedDistrict);
        }
    }

    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState(prevState => ({
            newAddress: {
                ...prevState.newAddress,
                xaPhuongThiTran: selectedWardName,
            },
            editingData: {
                ...prevState.editingData,
                xaPhuongThiTran: selectedWardName,
            }
        }));
    }
    render() {
        const { nhanVienQuyen3, itemsPerPage, currentPage, filterStatus, searchValue} = this.state;
        const { provinces, districts, wards } = this.state;
        const { isAddingAddress, isEditing, editingData, newAddress } = this.state;
        console.log('isAddingAddress:', this.state.isAddingAddress);

        // Filter employees based on filterStatus
        const filteredEmployees = nhanVienQuyen3.filter((employee) => {
            if (filterStatus === 'all') {
                return true;
            } else if (filterStatus === 'active') {
                return employee.trangThai === true;
            } else {
                return employee.trangThai === false;
            }
        });
        const searchFilteredEmployees = filteredEmployees.filter((employee) => {
            const {maTaiKhoan, email, thongTinNguoiDung} = employee;
            const maTaiKhoanLowerCase = maTaiKhoan ? maTaiKhoan.toLowerCase() : '';
            const emailLowerCase = email ? email.toLowerCase() : '';
            const tenNhanVienLowerCase = thongTinNguoiDung.ten ? thongTinNguoiDung.ten.toLowerCase() : '';
            const sdtLowerCase = thongTinNguoiDung.sdt ? thongTinNguoiDung.sdt.toLowerCase() : '';

            return (
                maTaiKhoanLowerCase.includes(searchValue) ||
                emailLowerCase.includes(searchValue) ||
                sdtLowerCase.includes(searchValue) ||
                tenNhanVienLowerCase.includes(searchValue)
            );
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = searchFilteredEmployees.slice(startIndex, endIndex);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khách hàng</h1>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách khách hàng</h5>


                                            <h5 className="card-title" style={{margin:10}}>Lọc và tìm kiếm</h5>
                                            <label style={{margin:10}}>Tìm kiếm</label>
                                            <br/>
                                            <input className="col-lg-8" type="search" name="search" style={{borderRadius:5,height:38,margin:10}} placeholder="Tìm kiếm theo tên, mã, SDT, hoặc email"  onChange={this.handleSearch}/>
                                            <button className="btn btn-primary " style={{margin:10}} onClick={this.add}> Thêm khách hàng  </button>

                                            <div>
                                                <label style={{margin:10}}>Trạng thái</label>
                                                <label style={{margin:10,color:"blue"}}><input type="radio" value="all" name="filterStatus" id="filterAll" checked={filterStatus === 'all'} onChange={this.handleFilterChange}/> Tất cả</label>
                                                <label style={{margin:10,color:"green"}}><input type="radio" value="active" name="filterStatus" id="filterActive" checked={filterStatus === 'active'} onChange={this.handleFilterChange}/> Hoạt động</label>
                                                <label style={{margin:10,color:"red"}}><input type="radio" value="inactive" name="filterStatus" id="filterInactive" checked={filterStatus === 'inactive'} onChange={this.handleFilterChange}/> Ngừng hoạt động</label>
                                            </div>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Mã KH</th>
                                                    <th>Tên</th>
                                                    <th>Email</th>
                                                    <th>SDT</th>
                                                    <th>Ngày tạo</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currentItems.map(tk => (
                                                    <tr key={tk.id}>
                                                        <td>{tk.maTaiKhoan}</td>
                                                        <td>{tk.thongTinNguoiDung.ten}</td>
                                                        <td>{tk.email}</td>
                                                        <td>{tk.thongTinNguoiDung ? tk.thongTinNguoiDung.sdt : 'N/A'}</td>
                                                        <td>{tk.ngayTao}</td>
                                                        <td>{tk.trangThai === true ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                                        <td>
                                                            <label className="switch">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={tk.trangThai === true}
                                                                    onChange={() => this.toggleTaiKhoan(tk.id, tk.trangThai)}
                                                                />
                                                                <span className="slider round"></span>
                                                            </label>
                                                        </td>
                                                        <td>
                                                            <button onClick={() => this.detail(tk.id)}
                                                                    className='btn btn-primary'>Detail
                                                            </button>
                                                            <button onClick={this.toggleThemDiaChiMoi} className='btn btn-success'>
                                                                Thêm Địa Chỉ Mới
                                                            </button>
                                                        </td>
                                                    </tr>

                                                ))}
                                                </tbody>

                                            </table>
                                            {(isAddingAddress || isEditing) && (
                                                <div className="form-dialog">
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-group form-inline">
                                                            <label htmlFor="ten">Tên:</label>
                                                            <input
                                                                type="text"
                                                                id="ten"
                                                                name="ten"
                                                                value={this.state.isEditing ? this.state.editingData.ten : this.state.newAddress.ten}
                                                                onChange={(e) => this.handleInputChange("ten", e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="sdt">Số điện thoại:</label>
                                                            <input
                                                                type="text"
                                                                id="sdt"
                                                                name="sdt"
                                                                value={this.state.isEditing ? this.state.editingData.sdt : this.state.newAddress.sdt}
                                                                onChange={(e) => this.handleInputChange("sdt", e.target.value)}
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="diaChiCuThe">Địa chỉ cụ thể:</label>
                                                            <input
                                                                type="text"
                                                                id="diaChiCuThe"
                                                                name="diaChiCuThe"
                                                                value={this.state.isEditing ? this.state.editingData.diaChiCuThe : this.state.newAddress.diaChiCuThe}
                                                                onChange={(e) => this.handleInputChange("diaChiCuThe", e.target.value)}
                                                            />
                                                        </div>
                                                        <div className="form-group form-inline">
                                                            <label>Địa chỉ:</label>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <select
                                                                        className="form-control"
                                                                        name="tinhThanhPho"
                                                                        onChange={(event) => this.handleCityChange(event)}
                                                                        value={isEditing ? editingData.tinhThanhPho : (newAddress.tinhThanhPho || '')}
                                                                    >
                                                                        <option value="">Chọn tỉnh thành</option>
                                                                        {this.state.cities.map(city => (
                                                                            <option key={city.code} value={city.name}>
                                                                                {city.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <select
                                                                        className="form-control"
                                                                        name="quanHuyen"
                                                                        onChange={(event) => this.handleDistrictChange(event)}
                                                                        value={isEditing ? editingData.quanHuyen : (newAddress.quanHuyen || '')}
                                                                    >
                                                                        <option value="">Chọn quận huyện</option>
                                                                        {this.state.districts.map(district => (
                                                                            <option key={district.code} value={district.name}>
                                                                                {district.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <select
                                                                        className="form-control"
                                                                        name="xaPhuongThiTran"
                                                                        onChange={(event) => this.handleWardChange(event)}
                                                                        value={isEditing ? editingData.xaPhuongThiTran : (newAddress.xaPhuongThiTran || '')}
                                                                    >
                                                                        <option value="">Chọn phường xã</option>
                                                                        {this.state.wards.map(ward => (
                                                                            <option key={ward.code} value={ward.name}>
                                                                                {ward.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <label htmlFor="isDefaultAddress">
                                                                <input
                                                                    type="checkbox"
                                                                    id="isDefaultAddress"
                                                                    name="isDefaultAddress"
                                                                    checked={this.state.isEditing ? this.state.editingData.isDefaultAddress : this.state.newAddress.isDefaultAddress}
                                                                    onChange={(e) => this.handleInputChange("isDefaultAddress", e.target.checked)}
                                                                />
                                                                Mặc định
                                                            </label>

                                                        </div>


                                                        <button type="submit">
                                                            {isEditing ? 'Lưu Chỉnh Sửa' : 'Lưu Địa Chỉ'}
                                                        </button>
                                                        <button type="button" onClick={this.handleCloseEditDialog}>
                                                            Đóng
                                                        </button>
                                                    </form>


                                                    {/* Danh sách địa chỉ đã lưu */}
                                                    {this.state.savedAddresses.length > 0 && (
                                                        <div>
                                                            <h4>Danh sách địa chỉ đã lưu:</h4>
                                                            <ul>
                                                                {this.state.savedAddresses.map((address, index) => (
                                                                    <li key={index}>
                                                                        {`DC: ${address.stt}, ${address.ten}, ${address.sdt}, ${address.diaChiCuThe}, ${address.xaPhuongThiTran}, ${address.quanHuyen}, ${address.tinhThanhPho}`}
                                                                        {address.isDefaultAddress && (
                                                                            <span style={{ color: 'red' }}> - Mặc định</span>
                                                                        )}
                                                                        <button onClick={() => this.handleEditAddress(address)}>Chỉnh sửa</button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/*</form>*/}
                                                </div>
                                            )}


                                            <ul className="pagination justify-content-center">
                                                {Array.from({length: Math.ceil(nhanVienQuyen3.length / itemsPerPage)}, (_, i) => (
                                                    <li key={i}
                                                        className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => this.handlePageChange(i + 1)}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

}

export default KhachHangComponent;

