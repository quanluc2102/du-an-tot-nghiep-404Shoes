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


    componentDidMount() {
        const { pageNumber, isEditing } = this.state;

        // Fetch data from the API
        this.fetchCities();

        // Fetch customer data
        taikhoanservice.getKhachHang(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen3: res.data,
                    pageCount: res.data.totalPages,
                });
            });

        // If there is an ID, fetch account information from the API
        const id = this.props.match.params.id;
        if (id && isEditing) {
            taikhoanservice.getTaiKhoanById(id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
                // Cập nhật trạng thái mặc định từ editingData
                this.setState({ isDefaultAddress: res.data.isDefaultAddress });
            });
        }

        // Fetch province data
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then((response) => {
                this.setState({ provinces: response.data }, () => {
                    // Fetch districts for the first city in the list
                    const firstCity = this.state.provinces[0];
                    if (firstCity) {
                        this.fetchDistricts(firstCity);
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching provinces:', error);
            });

        // Load data from localStorage
        const storedAddressList = localStorage.getItem('newAddressList');
        const storedIsDefaultAddress = localStorage.getItem('isDefaultAddress');

        if (storedAddressList) {
            const savedAddressesFromStorage = JSON.parse(storedAddressList);
            this.setState({
                savedAddresses: savedAddressesFromStorage,
                isDefaultAddress: storedIsDefaultAddress === 'true', // Parse the boolean value from the stored string
            });

            if (isEditing) {
                // Update the default status from editingData
                const id = this.props.match.params.id;
                const editingData = savedAddressesFromStorage.find((address) => address.id === id);
                if (editingData) {
                    this.setState({ isDefaultAddress: editingData.isDefaultAddress });
                }
            }
        }
        // ... Rest of your code
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
                        isDefaultAddress: isDefault,
                        [name]: value,
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
        this.setState((prevState) => {
            const { isEditing, editingData, newAddress, savedAddresses } = prevState;

            // Update isDefaultAddress for newAddress and editingData
            const updatedNewAddress = {
                ...newAddress,
                [name]: value,
                isDefaultAddress: name === "isDefaultAddress" ? value : newAddress.isDefaultAddress,
            };

            const updatedEditingData = {
                ...editingData,
                [name]: value,
                isDefaultAddress: name === "isDefaultAddress" ? value : editingData.isDefaultAddress,
            };

            // Update isDefaultAddress for all savedAddresses if the new value is true
            const updatedSavedAddresses = savedAddresses.map((address) => ({
                ...address,
                isDefaultAddress: name === "isDefaultAddress" && value ? false : address.isDefaultAddress,
            }));

            return {
                newAddress: updatedNewAddress,
                editingData: updatedEditingData,
                savedAddresses: updatedSavedAddresses,
            };
        });
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
        const { savedAddresses, newAddress } = this.state;

        // Kiểm tra xem newAddress có trùng với savedAddresses không
        const isDuplicate = savedAddresses.some(address => (
            address.ten === newAddress.ten &&
            address.sdt === newAddress.sdt &&
            address.diaChiCuThe === newAddress.diaChiCuThe
            // Thêm các điều kiện kiểm tra khác nếu cần
        ));

        if (isDuplicate) {
            console.error('Duplicate address found:', newAddress);
            // Xử lý lỗi ở đây nếu cần
            return;
        }

        // Tiếp tục với quá trình thêm địa chỉ mới
        const newAddressList = [
            ...savedAddresses,
            {
                ...newAddress,
                stt: savedAddresses.length + 1,
            },
        ];

        // Cập nhật danh sách địa chỉ trong localStorage
        this.updateLocalStorageAddresses(newAddressList);

        // Cập nhật trạng thái nguoiDungUpdate dựa trên thông tin địa chỉ mới
        this.updateNguoiDungUpdate(newAddress);

        this.setState({
            isAddingAddress: true,
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

        // Update isDefaultAddress cho newAddress nếu không có địa chỉ khác được đặt làm mặc định
        const isAnyDefaultAddress = updatedAddresses.some((address) => address.isDefaultAddress);

        const updatedNewAddress = {
            ...editedAddress,
            isDefaultAddress: !isAnyDefaultAddress ? editedAddress.isDefaultAddress : false, // Đặt lại thành false
        };

        // Cập nhật trạng thái nguoiDungUpdate dựa trên thông tin địa chỉ được chỉnh sửa
        this.updateNguoiDungUpdate(editedAddress);

        // Lưu trạng thái vào localStorage
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        localStorage.setItem('isEditing', false);
        localStorage.setItem('editingData', JSON.stringify({}));
        localStorage.setItem('newAddress', JSON.stringify(updatedNewAddress));

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


    togglePopup = () => {
        var popup = document.getElementById('popup');
        popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
    };

// Hàm cập nhật localStorage
    // Function to update localStorage with new address list
    updateLocalStorageAddresses = (newAddressList) => {
        localStorage.setItem('newAddressList', JSON.stringify(newAddressList));
    };


    updateNguoiDungUpdate = (newAddress) => {
        this.setState((prevState) => ({
            nguoiDungUpdate: {
                ...prevState.nguoiDungUpdate,
                tinhThanhPho: newAddress.tinhThanhPho || '', // Thêm xử lý null hoặc undefined
                quanHuyen: newAddress.quanHuyen || '',
                xaPhuongThiTran: newAddress.xaPhuongThiTran || '',
                diaChiCuThe: newAddress.diaChiCuThe || '',
                sdt: newAddress.sdt || '',
                ten: newAddress.ten || '',
            },
        }));
    };



    // Function to open the edit form
    handleEditAddress = (address) => {
        const isDefaultAddress = address.isDefaultAddress || false;

        // Extract quanHuyen and xaPhuongThiTran from the address being edited
        const { quanHuyen, xaPhuongThiTran } = address;

        this.setState({
            isEditing: true,
            editingData: address,
            newAddress: {
                ...this.state.newAddress,
                quanHuyen: quanHuyen || '', // Set quanHuyen to the value from the address, or an empty string if it's undefined/null
                xaPhuongThiTran: xaPhuongThiTran || '', // Set xaPhuongThiTran to the value from the address, or an empty string if it's undefined/null
            },
            isDefaultAddress: isDefaultAddress,
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
        const { isEditing, editingData, newAddress } = this.state;

        // Nếu đang ở chế độ chỉnh sửa, cập nhật trạng thái nguoiDungUpdate dựa trên thông tin địa chỉ mới
        if (isEditing) {
            this.updateNguoiDungUpdate(newAddress);
        }

        this.setState((prevState) => ({
            isAddingAddress: !isEditing, // Đặt isAddingAddress thành ngược của isEditing
            // Nếu đang thêm mới, sử dụng editingData, ngược lại là đặt về trạng thái rỗng
            editingData: !isEditing ? {} : editingData,
            // Nếu đang thêm mới, đặt newAddress về trạng thái mặc định, ngược lại giữ nguyên giá trị hiện tại
            newAddress: !isEditing ? {} : newAddress,
        }), () => {
            // Hiển thị hoặc ẩn popup sau khi cập nhật state
            this.togglePopup();
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
    handleDeleteAddress = (index) => {
        const updatedAddresses = [...this.state.savedAddresses];
        const deletedAddress = updatedAddresses.splice(index, 1)[0];

        // Cập nhật trạng thái nguoiDungUpdate nếu địa chỉ bị xóa là địa chỉ mặc định
        if (deletedAddress.isDefaultAddress) {
            this.updateNguoiDungUpdate({
                ten: '',
                sdt: '',
                diaChiCuThe: '',
            });
        }

        // Cập nhật danh sách địa chỉ trong localStorage
        this.updateLocalStorageAddresses(updatedAddresses);

        this.setState({
            savedAddresses: updatedAddresses,
        });
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
    handleDefaultAddressChange = () => {
        const { isEditing, editingData, newAddress, savedAddresses } = this.state;

        // Toggle the isDefaultAddress for the currently edited address
        const updatedEditingData = isEditing
            ? { ...editingData, isDefaultAddress: !editingData.isDefaultAddress }
            : { ...newAddress, isDefaultAddress: !this.state.isDefaultAddress };

        // Toggle the isDefaultAddress for all other addresses in savedAddresses
        const updatedSavedAddresses = savedAddresses.map((address, index) => {
            if (isEditing && address.stt === editingData.stt) {
                return updatedEditingData;
            } else {
                return { ...address, isDefaultAddress: false };
            }
        });

        // If the form is in adding mode, add the newAddress to savedAddresses and update the state
        if (!isEditing) {
            updatedEditingData.stt = savedAddresses.length + 1; // Update stt for the new address
            updatedSavedAddresses.push(updatedEditingData);
        }

        // Update stt values for all addresses
        const finalUpdatedSavedAddresses = updatedSavedAddresses.map((address, index) => ({
            ...address,
            stt: index + 1,
        }));

        // Update the state
        this.setState(
            {
                isDefaultAddress: updatedEditingData.isDefaultAddress, // Set the isDefaultAddress directly from the updatedEditingData
                editingData: updatedEditingData,
                savedAddresses: finalUpdatedSavedAddresses,
            },
            () => {
                // Save to localStorage after updating state
                localStorage.setItem('savedAddresses', JSON.stringify(finalUpdatedSavedAddresses));
                localStorage.setItem('isDefaultAddress', JSON.stringify(updatedEditingData.isDefaultAddress));
            }
        );

        // Close the form
        // this.handleCloseEditDialog();
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
    handleCityChange = (event) => {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        const updatedNewAddress = {
            ...this.state.newAddress,
            tinhThanhPho: selectedCityName,
        };

        const updatedEditingData = {
            ...this.state.editingData,
            tinhThanhPho: selectedCityName,
        };

        this.setState({
            newAddress: updatedNewAddress,
            editingData: updatedEditingData,
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity);
        }
    };


    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        console.log('Quận/huyện được chọn:', selectedDistrict);

        this.setState((prevState) => ({
            newAddress: {
                ...prevState.newAddress,
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

                                            <div id="popup" className="popup">
                                                <div className="popup-content">
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
                                                                                value={isEditing ? editingData.quanHuyen : newAddress.quanHuyen}
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


                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                                                    <label
                                                                        style={{
                                                                            position: 'relative',
                                                                            display: 'inline-block',
                                                                            width: '60px',
                                                                            height: '34px',
                                                                        }}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            style={{
                                                                                position: 'absolute',
                                                                                opacity: 0,
                                                                                height: 0,
                                                                                width: 0,
                                                                            }}
                                                                            checked={this.state.isDefaultAddress}
                                                                            onChange={this.handleDefaultAddressChange}
                                                                        />

                                                                        <span
                                                                            style={{
                                                                                position: 'absolute',
                                                                                cursor: 'pointer',
                                                                                top: 0,
                                                                                left: 0,
                                                                                right: 0,
                                                                                bottom: 0,
                                                                                backgroundColor: this.state.isDefaultAddress
                                                                                    ? '#4CAF50' // Màu xanh khi được chọn
                                                                                    : '#ccc', // Màu xám khi không được chọn
                                                                                borderRadius: '34px',
                                                                                transition: '0.4s',
                                                                            }}
                                                                        />
                                                                        <span
                                                                            style={{
                                                                                position: 'absolute',
                                                                                height: '26px',
                                                                                width: '26px',
                                                                                left: this.state.isDefaultAddress ? '34px' : '2px',
                                                                                bottom: '4px',
                                                                                backgroundColor: '#fff',
                                                                                borderRadius: '50%',
                                                                                transition: '0.4s',
                                                                            }}
                                                                        />
                                                                    </label>
                                                                    <span style={{ marginLeft: '5px' }}>Mặc định</span>
                                                                </div>

                                                                <button type="submit">
                                                                    {isEditing ? 'Lưu Chỉnh Sửa' : 'Lưu Địa Chỉ'}
                                                                </button>
                                                                <button type="button" onClick={this.togglePopup}>
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
                                                                                <button onClick={() => this.handleDeleteAddress(index)}>Xóa</button>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/*</form>*/}
                                                        </div>
                                                    )}

                                                </div>
                                            </div>
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
