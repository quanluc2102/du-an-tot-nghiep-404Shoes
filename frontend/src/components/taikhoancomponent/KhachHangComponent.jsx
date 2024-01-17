import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import axios from "axios";
import "./themKH.css";
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import {Modal} from "react-bootstrap";

// import firebase from 'firebase/app';
// import 'firebase/database';
class KhachHangComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: [],
            nhanVienQuyen3: [],
            showModalDetail:false,
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
            listDiaChi:[],
            detail: [],
            thongTinNguoiDung: [],
            isDefaultAddress: false,

            danhSachDiaChi: [],
            selectedUserId: null,
            addressIndex: 1, // Thêm biến đếm
            isAddingAddress: false, // Đặt mặc định là false
            selectedUserAddresses: null,
            newAddressName: '',
            newAddressPhoneNumber: '',
            newAddressDetail: '',
            newAddressCity: '',
            newAddressDistrict: '',
            newAddressWard: '',
            isAddingNewAddress: false,
            addedAddress: null,
            selectedCity: '',
            selectedDistrict: '', // Thêm dòng này
            selectedWard: '', // Thêm dòng này
            isEditing: false,
            editedAddressId: null,
            error:{
                ten:'',
                sdt: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },

        };
        this.detail=this.detail.bind(this);
        this.delete=this.delete.bind(this);
        // this.update=this.update.bind(this);
        // this.thayDoiThongTinNguoiDungOne=this.thayDoiThongTinNguoiDungOne.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
    }
    detail(id) {
        window.location.href = (`/diaChi/${id}`);
    }
    delete(id) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm  này ?");
        if(!confirm){
            return;
        }
        taikhoanservice.deleteDiaChi(id).then((res)=>{
            this.setState({listDiaChi : this.state.listDiaChi.filter(listDiaChi=>listDiaChi.id!==id)});
            alert(res.data);
        })

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
            taikhoanservice.getTaiKhoanById(id)
                .then((res) => {
                    this.setState({
                        taiKhoanUpdate: res.data,
                        isDefaultAddress: res.data.isDefaultAddress,
                    });
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

        // Load data from the database
        if (id) {
            taikhoanservice.getDiaChiById(id)
                .then((res) => {
                    const addressListFromDB = res.data; // Assume that the API returns an array of addresses
                    this.setState({ savedAddresses: addressListFromDB });
                })
                .catch((error) => {
                    console.error('Error fetching addresses from the database:', error);
                });
        }

        // Load data from localStorage

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




    save = async (e) => {
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc chắn muốn sửa địa chỉ này ?");
        if (!confirm) {
            return;
        }

        const id = this.props.match.params.id;

        try {
            const response = await taikhoanservice.updateOneDiaChi(this.state.detail.id);

            if (response.status === 200) {
                setTimeout(() => {
                    window.location.href = `/detail/${id}`;
                }, 2000);
                toast.success("Sửa thành công!");
            } else {
                const errorMessage = response.data.message || "Có lỗi xảy ra khi sửa địa chỉ.";
                toast.error("Lỗi: " + errorMessage);
                console.log(response.data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
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

    thayDoiTenAdd=(event)=>{

        this.setState(
            prevState=>({
                nguoiDungUpdate:{
                    ...prevState.nguoiDungUpdate,
                    ten:event.target.value
                }
            })
        );
        console.log(this.state.detailSPCT)
        if(!event.target.value.trim()){
            let error = {...this.state.error,ten:"Tên không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,ten:""};
            this.setState({error:error});
        }
    };

    // Function to open the edit form
    handleEditAddress = (tk) => {
        // Cập nhật trạng thái với dữ liệu của đối tượng được chọn
        this.setState({
            newAddressName: tk.thongTinNguoiDung?.ten || '',
            newAddressPhoneNumber: tk.thongTinNguoiDung?.sdt || '',
            newAddressDetail: tk.diaChiCuThe || '',
            selectedCity: tk.tinhThanhPho || '',
            selectedDistrict: tk.quanHuyen || '',
            selectedWard: tk.xaPhuongThiTran || '',
            newAddressIsDefault: tk.trangThai === 1 ? '1' : '0',
            isEditing: true,
            editedAddressId: tk.id, // Sửa ở đây
        });
    };




    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };


    handleShowModal = () => {
        this.setState({showModal:true})
    };
    handleCloseModal = () => {
        this.setState({showModal:false})
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

        console.log('Tỉnh/Thành phố được chọn:', selectedCity);

        this.setState({
            selectedCity: selectedCityName, // Cập nhật giá trị selectedCity
            newAddress: {
                ...this.state.newAddress,
                tinhThanhPho: selectedCity ? selectedCity.name : '',
            },
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity);
        }
    }


    handleCloseModalDCDetail = () => {
        this.setState({showModalDetail:false})
    };


    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        console.log('Quận/Huyện được chọn:', selectedDistrict);

        this.setState({
            selectedDistrict: selectedDistrictName,
            newAddress: {
                ...this.state.newAddress,
                quanHuyen: selectedDistrict ? selectedDistrict.name : '',
            }
        });

        if (selectedDistrict) {
            this.fetchWards(selectedDistrict);
        }
    }


    handleWardChange(event) {
        const selectedWardName = event.target.value;

        this.setState((prevState) => ({
            selectedWard: selectedWardName,
            newAddress: {
                ...prevState.newAddress,
                xaPhuongThiTran: selectedWardName,
            },
        }));
    }


    toggleThemDiaChiMoi = async () => {
        // Fetch danhSachDiaChi only when the popup is open
        if (!this.state.isAddingAddress) {
            await this.fetchDanhSachDiaChi();
        }

        this.setState((prevState) => ({
            isAddingAddress: !prevState.isAddingAddress,
        }));
    };

    fetchAddressesByUserId = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/dia_chi/TTDC/${id}`);
            const data = await response.json();

            console.log('Fetched addresses by user ID:', data); // Log the response

            this.setState({ selectedUserAddresses: data });
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };
    handleUserSelect = (id) => {
        this.setState({ selectedUserId: id, isAddingAddress: true });

        // Assuming you have a function like fetchAddressesByUserId to fetch addresses
        this.fetchAddressesByUserId(id);
    };


    incrementAddressIndex = () => {
        this.setState((prevState) => ({
            addressIndex: prevState.addressIndex + 1,
        }));
    };
    handleClosePopup = () => {
        this.setState({
            isAddingAddress: false,
            selectedUserAddresses: null,
            isAddingNewAddress: false, // Close the new address popup as well
            newAddressName: '', // Clear the form values
            newAddressPhoneNumber: '', // Clear the form values
            isEditing: false,
            editedAddressId: null,
        });
    };
    handleAddNewAddress = () => {
        // Đặt trạng thái về giá trị rỗng cho các trường dữ liệu mới
        this.setState({
            newAddressName: '',
            newAddressPhoneNumber: '',
            newAddressDetail: '',
            selectedCity: '',
            selectedDistrict: '',
            selectedWard: '',
            newAddressIsDefault: '0',
            isAddingNewAddress: true,
            isEditing: false,
            editedAddressId: null,
        });
    };





// Ví dụ:
    saveThongTinNguoiDung = async (thongTinNguoiDungData) => {
        try {
            const response = await fetch('http://localhost:8080/thong_tin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(thongTinNguoiDungData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to save thongTinNguoiDung:', errorText);
                throw new Error('Failed to save thongTinNguoiDung');
            }

            const savedThongTinNguoiDung = await response.json();
            return { success: true, data: savedThongTinNguoiDung };
        } catch (error) {
            console.error('Error saving thongTinNguoiDungData:', error);
            return { success: false, error: 'Failed to save thongTinNguoiDung' };
        }
    };


    saveAddressToDatabase = async (newAddressData, thongTinNguoiDungData) => {
        try {
            // Gộp thông tin người dùng vào dữ liệu địa chỉ
            const addressDataWithUserInfo = {
                ...newAddressData,
                thongTinNguoiDung: thongTinNguoiDungData,
            };

            // Nếu địa chỉ mới được đặt làm mặc định, cập nhật trạng thái mặc định của các địa chỉ khác về 0
            if (newAddressData.trangThai === 1) {
                await this.updateDefaultStatusToZero(thongTinNguoiDungData);
            }

            // Thực hiện logic để lưu địa chỉ vào cơ sở dữ liệu
            const response = await fetch('http://localhost:8080/dia_chi/addOrUpdateDC', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addressDataWithUserInfo),
            });

            // ... (phần còn lại của mã code không thay đổi)
        } catch (error) {
            // ... (xử lý lỗi)
        }
    };

// Hàm trợ giúp để cập nhật trạng thái mặc định về 0 cho tất cả các địa chỉ của người dùng
    updateDefaultStatusToZero = async (thongTinNguoiDungId) => {
        // Fetch và logic cập nhật để đặt trạng thái mặc định về 0 cho tất cả các địa chỉ của người dùng
        // Sử dụng một yêu cầu fetch tương tự để cập nhật trạng thái mặc định của các địa chỉ khác
    };


    handleSaveNewAddress = async () => {
        try {
            const {
                newAddressName,
                newAddressPhoneNumber,
                newAddressDetail,
                selectedCity,
                selectedDistrict,
                selectedWard,
                newAddressIsDefault,
                isEditing,
                editedAddressId,
                thongTinNguoiDungId,
            } = this.state;

            // Lưu thông tin người dùng và đợi cho đến khi nó hoàn thành
            const savedThongTinNguoiDung = await this.saveThongTinNguoiDung({
                ten: newAddressName,
                sdt: newAddressPhoneNumber,
                ngay_sinh: '2024-1-9',
            });

            let currentThongTinNguoiDungId = thongTinNguoiDungId;

            // Kiểm tra xem thông tin người dùng ID đã tồn tại hay chưa
            if (!currentThongTinNguoiDungId) {
                // Nếu không tồn tại, sử dụng ID mới từ thông tin người dùng vừa lưu
                currentThongTinNguoiDungId = savedThongTinNguoiDung.id;
            }

            const newAddressData = {
                ten: newAddressName,
                sdt: newAddressPhoneNumber,
                diaChiCuThe: newAddressDetail,
                tinhThanhPho: selectedCity,
                quanHuyen: selectedDistrict,
                xaPhuongThiTran: selectedWard,
                trangThai: newAddressIsDefault,
            };

            // Lưu địa chỉ với thông tin người dùng ID
            const savedAddress = await this.saveAddressToDatabase(newAddressData, currentThongTinNguoiDungId);

            // Cập nhật state với địa chỉ đã lưu
            this.setState((prevState) => ({
                selectedUserAddresses: [...prevState.selectedUserAddresses, savedAddress],
                addedAddress: savedAddress,
                isAddingNewAddress: false,
                thongTinNguoiDungId: currentThongTinNguoiDungId,
            }));

            if (isEditing) {
                // Thực hiện logic cập nhật địa chỉ
                await this.handleSaveEditAddress(editedAddressId);
            } else {
                // Thực hiện logic thêm mới địa chỉ
                await this.handleSaveNewAddressLogic();
            }
        } catch (error) {
            console.error('Lỗi khi lưu địa chỉ:', error);
            // Xử lý lỗi, ví dụ: hiển thị một thông báo lỗi cho người dùng
        }
    };




    cancelEditAddress = () => {
        // Xóa isEditing khỏi trạng thái
        this.setState({ isEditing: false });
    };

    handleSaveEditAddress = async () => {
        try {
            const {
                newAddressName,
                newAddressPhoneNumber,
                newAddressDetail,
                selectedCity,
                selectedDistrict,
                selectedWard,
                newAddressIsDefault,
                editedAddressId
            } = this.state;

            // Nếu địa chỉ đã chỉnh sửa được đặt làm mặc định, cập nhật trạng thái mặc định của các địa chỉ khác về 0
            if (newAddressIsDefault === true) {
                await this.updateDefaultStatusToZero(this.state.thongTinNguoiDungId);
            }

            const response = await fetch(`http://localhost:8080/dia_chi/editDC/${editedAddressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ten: newAddressName,
                    sdt: newAddressPhoneNumber,
                    diaChiCuThe: newAddressDetail,
                    tinhThanhPho: selectedCity,
                    quanHuyen: selectedDistrict,
                    xaPhuongThiTran: selectedWard,
                    trangThai: newAddressIsDefault,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Lỗi khi cập nhật địa chỉ:', errorText);
                throw new Error('Lỗi khi cập nhật địa chỉ');
            }
            this.setState({
                isEditing: false,
                // Các trạng thái khác cần được cập nhật theo yêu cầu của bạn
            });

            console.log('Địa chỉ đã được cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ:', error);
        }
    };





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
                                                    <th>Ảnh</th>
                                                    <th>Tên khách hàng </th>
                                                    <th>Email</th>
                                                    <th>SDT</th>
                                                    <th>TT</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {currentItems.map(tk => (
                                                    <tr key={tk.id}>
                                                        <td>{tk.maTaiKhoan}</td>
                                                        <td>
                                                            {tk.anh && <img src={`/niceadmin/img/${tk.anh}`} width="100px" height="100px" />}
                                                        </td>
                                                        <td>{tk.thongTinNguoiDung?.ten ?? 'N/A'}</td>

                                                        <td>{tk.email}</td>
                                                        <td>{tk.thongTinNguoiDung ? tk.thongTinNguoiDung.sdt : 'N/A'}</td>
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
                                                            <button onClick={() => this.detail(tk.id)} className='btn btn-primary'>Detail</button>
                                                            {/*<button onClick={() => {console.log('Button clicked!'); this.handleUserSelect(tk.id);}} className='btn btn-success'>*/}
                                                            {/*    Thêm Địa Chỉ Mới*/}
                                                            {/*</button>*/}
                                                        </td>
                                                    </tr>
                                                ))}

                                                </tbody>

                                            </table>

                                            <div className="popup-container">
                                                {this.state.isAddingAddress && this.state.selectedUserAddresses && (
                                                    <div className="popup">
                                                        <div className="popup-content">
                                                            <h4>Địa chỉ khách hàng </h4>

                                                            {this.state.selectedUserAddresses.map((tk, index) => (
                                                                <div key={tk.id}>
                                                                    <p>{`Địa chỉ ${index + 1}:`}</p>
                                                                    {tk.thongTinNguoiDung ? (
                                                                        <div>
                                                                            <p>{`Tên: ${tk.thongTinNguoiDung.ten}, Số điện thoại: ${tk.thongTinNguoiDung.sdt}`}</p>
                                                                            <p>{`Địa chỉ: ${tk.diaChiCuThe}, ${tk.xaPhuongThiTran}, ${tk.quanHuyen}, ${tk.tinhThanhPho}`}</p>
                                                                            {tk.trangThai === 1 && <p className="red-text">Mặc định</p>}
                                                                            <button onClick={() => this.handleEditAddress(tk)}>Edit</button>
                                                                        </div>
                                                                    ) : (
                                                                        <p>Thông tin người dùng không tồn tại</p>
                                                                    )}
                                                                </div>
                                                            ))}

                                                            <button onClick={this.handleClosePopup}>Đóng</button>
                                                            <button onClick={this.handleAddNewAddress}>Thêm mới</button>

                                                        </div>
                                                    </div>
                                                )}


                                                {this.state.isEditing && (
                                                    <div className="new-address-popup">
                                                        <div className="new-address-popup-content">
                                                            <h3>Chỉnh sửa địa chỉ</h3>
                                                            <label>Tên: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressName}
                                                                onChange={(e) => this.setState({ newAddressName: e.target.value })}
                                                            />
                                                            <br />
                                                            <label>Số điện thoại: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressPhoneNumber}
                                                                onChange={(e) => this.setState({ newAddressPhoneNumber: e.target.value })}
                                                            />
                                                            <br />
                                                            <label>Địa chỉ cụ thể: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressDetail}
                                                                onChange={(e) => this.setState({ newAddressDetail: e.target.value })}
                                                            />
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <label>Tỉnh/Thành phố: </label>
                                                                    <select
                                                                        value={this.state.selectedCity}
                                                                        onChange={(e) => this.handleCityChange(e)}
                                                                    >
                                                                        {/* Options for Tỉnh/Thành phố */}
                                                                        {this.state.cities.map((city) => (
                                                                            <option key={city.id} value={city.name}>
                                                                                {city.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Quận/Huyện: </label>
                                                                    <select
                                                                        value={this.state.selectedDistrict}
                                                                        onChange={(e) => this.handleDistrictChange(e)}
                                                                    >
                                                                        {/* Options for Quận/Huyện */}
                                                                        {this.state.districts.map((district) => (
                                                                            <option key={district.id} value={district.name}>
                                                                                {district.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Xã/Phường/Thị trấn: </label>
                                                                    <select
                                                                        value={this.state.selectedWard}
                                                                        onChange={(e) => this.handleWardChange(e)}
                                                                    >
                                                                        {/* Options for Xã/Phường/Thị trấn */}
                                                                        {this.state.wards.map((ward) => (
                                                                            <option key={ward.id} value={ward.name}>
                                                                                {ward.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Mặc định: </label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={this.state.newAddressIsDefault === '1'}
                                                                    onChange={(e) => {
                                                                        const isChecked = e.target.checked;
                                                                        this.setState({
                                                                            newAddressIsDefault: isChecked ? '1' : '0'
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                            <button onClick={this.handleSaveEditAddress}>Lưu chỉnh sửa</button>
                                                            <button onClick={this.cancelEditAddress}>Hủy</button>
                                                        </div>
                                                    </div>
                                                )}

                                                {this.state.isAddingNewAddress && (
                                                    <div className="new-address-popup">
                                                        <div className="new-address-popup-content">
                                                            <h3>Thêm địa chỉ mới</h3>
                                                            <label>Tên: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressName}
                                                                onChange={(e) => this.setState({ newAddressName: e.target.value })}
                                                            />
                                                            <br />
                                                            <label>Số điện thoại: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressPhoneNumber}
                                                                onChange={(e) => this.setState({ newAddressPhoneNumber: e.target.value })}
                                                            />
                                                            <br />
                                                            <label>Địa chỉ cụ thể: </label>
                                                            <input
                                                                type="text"
                                                                value={this.state.newAddressDetail}
                                                                onChange={(e) => this.setState({ newAddressDetail: e.target.value })}
                                                            />
                                                            <div className="form-row">
                                                                <div className="form-group">
                                                                    <label>Tỉnh/Thành phố: </label>
                                                                    <select
                                                                        value={this.state.selectedCity}
                                                                        onChange={(e) => this.handleCityChange(e)}
                                                                    >
                                                                        {/* Options for Tỉnh/Thành phố */}
                                                                        {this.state.cities.map((city) => (
                                                                            <option key={city.id} value={city.name}>
                                                                                {city.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                </div>


                                                                <div className="form-group">
                                                                    <label>Quận/Huyện: </label>
                                                                    <select
                                                                        value={this.state.selectedDistrict}
                                                                        onChange={(e) => this.handleDistrictChange(e)}
                                                                    >
                                                                        {/* Options for Quận/Huyện */}
                                                                        {this.state.districts.map((district) => (
                                                                            <option key={district.id} value={district.name}>
                                                                                {district.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label>Xã/Phường/Thị trấn: </label>
                                                                    <select
                                                                        value={this.state.selectedWard}
                                                                        onChange={(e) => this.handleWardChange(e)}
                                                                    >
                                                                        {/* Options for Xã/Phường/Thị trấn */}
                                                                        {this.state.wards.map((ward) => (
                                                                            <option key={ward.id} value={ward.name}>
                                                                                {ward.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>

                                                            </div>
                                                            <div className="form-group">
                                                                <label>Mặc định: </label>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={this.state.newAddressIsDefault === '1'}
                                                                    onChange={(e) => {
                                                                        const isChecked = e.target.checked;
                                                                        this.setState({
                                                                            newAddressIsDefault: isChecked ? '1' : '0'
                                                                        });
                                                                    }}
                                                                />
                                                            </div>
                                                            <button onClick={this.handleSaveNewAddress}>Lưu</button>
                                                            <button onClick={() => this.setState({ isAddingNewAddress: false })}>Hủy</button>
                                                        </div>
                                                    </div>
                                                )}

                                            </div>


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
