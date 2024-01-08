import React, {Component} from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import {toast} from "react-toastify";
import axios from "axios";
import "./nhanvien.css";
import $ from 'jquery';

class TaiKhoanNVUpdate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen1: [],
            thongTinNguoiDung: [],
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe: '',
            cities: [],
            districts: [],
            wards: [],
            pageCount: 0,
            diaChi: [],
            files: null,
            showPassword: false,
            listThongTin:[],
            taiKhoanUpdate: {
                email: '',
                password: '',
                anh: ''
            },
            nguoiDungUpdate: {
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                ten: '',
                sdt: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                diaChiCuThe: '',
            },
            errorUpdate: {
                diaChi: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                email: '',
                password: null,
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },
        }
        this.update = this.update.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);
        this.thayDoiSdtUpdate = this.thayDoiSdtUpdate.bind(this);
        this.thayDoiGioiTinhUpdate = this.thayDoiGioiTinhUpdate.bind(this);
        this.thayDoiNGaySinhUpdate = this.thayDoiNGaySinhUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiTinhUpdate = this.thayDoiTinhUpdate.bind(this);
        this.thayDoiHuyenUpdate = this.thayDoiHuyenUpdate.bind(this);
        this.thayDoiXaUpdate = this.thayDoiXaUpdate.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                const taiKhoanDataArray = response.data;
                if (Array.isArray(taiKhoanDataArray) && taiKhoanDataArray.length > 0) {
                    const taiKhoanData = taiKhoanDataArray[0];
                    console.log("User Account Data:", taiKhoanData);

                    // Extract values from the array
                    const [
                        anh,
                        cccd,
                        ten,
                        ngaySinh,
                        gioiTinh,
                        tinhThanhPho,
                        quanHuyen,
                        xaPhuongThiTran,
                        diaChiCuThe,
                        sdt,
                        email,
                        password,
                    ] = taiKhoanData;

                    // Update quanHuyen and xaPhuongThiTran in the array
                    const updatedTaiKhoanData = [...taiKhoanData];
                    updatedTaiKhoanData[6] = quanHuyen;
                    updatedTaiKhoanData[7] = xaPhuongThiTran;

                    // Update state with extracted values
                    this.setState({
                        taiKhoanUpdate: {
                            anh,
                            email,
                            password,
                        },
                        nguoiDungUpdate: {
                            cccd,
                            ten,
                            ngaySinh,
                            gioiTinh,
                            tinhThanhPho,
                            quanHuyen,
                            xaPhuongThiTran,
                            diaChiCuThe,
                            sdt,
                        },
                        // ... other state updates
                    });

                    // Continue with the rest of your code...
                } else {
                    console.error("Invalid user account data format");
                }
            })
            .catch((error) => {
                console.error("Error fetching user account information:", error);
            });

        this.fetchCities();
        // this.fetchDistricts();
        // this.fetchWards();
    }



    update = (e) => {
        e.preventDefault();

        let listFile = [];

        if (!this.state.files || this.state.files.length === 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, files: "Chọn ít nhất 1 ảnh!" } });
            return;
        } else {
            // Reset error message if files are selected
            this.setState({ errorUpdate: { ...this.state.errorUpdate, files: "" } });
        }
        for (let i = 0; i < this.state.files.length; i++) {
            listFile.push(this.state.files[i].name);
        }

        const {taiKhoanUpdate, nguoiDungUpdate} = this.state;
        const requestData = {
            taiKhoan: {
                email : taiKhoanUpdate.email,
                password : taiKhoanUpdate.password,
            },
            thongTinNguoiDung: {
                ten: nguoiDungUpdate.ten,
                cccd: nguoiDungUpdate.cccd,
                sdt: nguoiDungUpdate.sdt,
                gioiTinh: nguoiDungUpdate.gioiTinh,
                ngaySinh: nguoiDungUpdate.ngaySinh,
            },
            files: listFile,
            diaChiCuThe: nguoiDungUpdate.diaChiCuThe,
            tinhThanhPho: this.state.tinhThanhPho,
            quanHuyen: this.state.quanHuyen,
            xaPhuongThiTran: this.state.xaPhuongThiTran,

        };
        console.log('nsx' + JSON.stringify(requestData));

        if (listFile.length === 0) {
            this.setState({error: {...this.state.errorUpdate, files: "Chọn ít nhất 1 ảnh !"}});
            console.log('nsx' + JSON.stringify(requestData));
            return;
        } else {
            this.setState({ error: { ...this.state.errorUpdate, files: "" } });
        }

        // Kiểm tra không được để trống
        if (!nguoiDungUpdate.cccd.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, cccd: "CCCD không được bỏ trống!" } });
            return;
        } else if (!/^\d+$/.test(nguoiDungUpdate.cccd)) {
            // Kiểm tra là số nguyên
            this.setState({ errorUpdate: { ...this.state.errorUpdate, cccd: "CCCD phải là số nguyên và không được chứa khoảng trắng !" } });
            return;
        } else if (nguoiDungUpdate.cccd.length !== 12) {
            // Kiểm tra có đủ 12 số
            this.setState({ errorUpdate: { ...this.state.errorUpdate, cccd: "CCCD phải có đủ 12 số!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.cccd === nguoiDungUpdate.cccd)) {
            // Kiểm tra trùng căn cước
            this.setState({ errorUpdate: { ...this.state.errorUpdate, cccd: "CCCD đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, cccd: "" } });
        }


        //check ten
        if (!nguoiDungUpdate.ten.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "Tên không được bỏ trống!" } });
            return;
        } else if (!/^[\p{L}\s]+$/u.test(nguoiDungUpdate.ten)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "Tên chỉ được chứa chữ cái và không có kí tự đặc biệt!" } });
            return;
            // } else if (/\s/.test(nguoiDungAdd.ten)) {
            //     this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên không được chứa khoảng trắng!" } });
            //     return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "" } });
        }

        //check ngaySinh
        const inputDate = new Date(nguoiDungUpdate.ngaySinh.trim());
        const currentDate = new Date();

        if (!nguoiDungUpdate.ngaySinh.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ngaySinh: "Ngày sinh không được bỏ trống!" } });
            return;
        } else if (inputDate > currentDate) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ngaySinh: "Không được lấy ngày sinh trong tương lai!" } });
            return;
        } else if (inputDate.toDateString() === currentDate.toDateString()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ngaySinh: "Ngày sinh không được lấy ngày hiện tại!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ngaySinh: "" } });
        }
        // check gioiTinh
        if (nguoiDungUpdate.gioiTinh === null || nguoiDungUpdate.gioiTinh === undefined || nguoiDungUpdate.gioiTinh === "") {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, gioiTinh: "Giới tính không được bỏ trống !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, gioiTinh: "" } });
        }
        // check thanhPho
        if (!this.state.tinhThanhPho.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, tinhThanhPho: "Tỉnh/Thành phố không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, tinhThanhPho: "" } });
        }
        // check quanHuyen
        if (!this.state.quanHuyen.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quanHuyen: "Quận/Huyện không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quanHuyen: "" } });
        }
        // check xaPhuongThiTran
        if (!this.state.xaPhuongThiTran.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, xaPhuongThiTran: "Xã/Phường/Thị trấn không được bỏ trống!" } });
            return;
        } else {
            this.setState({errorUpdate: {...this.state.errorUpdate, xaPhuongThiTran: ""}});
        }
        // check diaChiCuThe
        if (!nguoiDungUpdate.diaChiCuThe.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, diaChiCuThe: "Địa chỉ cụ thể không được bỏ trống !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, diaChiCuThe: "" } });
        }
        // check sdt
        const sdtRegex = /^[0-9]{10}$/; // Regex for 10 digits

        if (!nguoiDungUpdate.sdt.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, sdt: "SDT không được bỏ trống!" } });
            return;
        } else if (!sdtRegex.test(nguoiDungUpdate.sdt.trim())) {
            this.setState({
                errorUpdate: {
                    ...this.state.errorUpdate,
                    sdt: "SDT phải là số nguyên, không có kí tự đặc biệt và phải có 10 chữ số!"
                }
            });
            return;
        } else if (/\s/.test(nguoiDungUpdate.sdt.trim())) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, sdt: "SDT không được chứa khoảng trắng!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.sdt === nguoiDungUpdate.sdt)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, sdt: "SDT đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, sdt: "" } });
        }

        // check email
        if (!taiKhoanUpdate || !taiKhoanUpdate.email || !taiKhoanUpdate.email.trim()) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email không được bỏ trống!" } });
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(taiKhoanUpdate.email)) {
            // Check if email is in correct format
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Địa chỉ email không đúng định dạng!" } });
            return;
        } else if (/\s/.test(taiKhoanUpdate.email)) {
            // Check if email contains whitespace
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email không được chứa khoảng trắng!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.taiKhoan && user.taiKhoan.email === taiKhoanUpdate.email)) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "Email đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, email: "" } });
        }


        // Log the request data for debugging purposes
        console.log('Request Data: ' + JSON.stringify(requestData));
        taikhoanservice.updateNhanVien(requestData, this.state.taiKhoanUpdate.id)
            .then((response) => {
                const {taiKhoan, thongTinNguoiDung} = response.data;
                this.setState({
                    taiKhoanUpdate: taiKhoan,
                    nguoiDungUpdate: thongTinNguoiDung,
                });
                setTimeout(() => {
                    window.location.href = (`/nhanvien`);
                }, 2000);
                toast.success("Sửa thành công!");
            })
            .catch((error) => {
                console.error("Update request error:", error);
                toast.error("Lỗi khi cập nhật");
            });
    }
    ;


    thayDoiTenUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ten: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, ten: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    thayDoiSdtUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    sdt: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, sdt: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiGioiTinhUpdate = (selectedGender) => {
        const updatedNguoiDung = {...this.state.nguoiDungUpdate, gioiTinh: selectedGender};
        this.setState({nguoiDungUpdate: updatedNguoiDung});
        let errorUpdate = {...this.state.errorUpdate, gioiTinh: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiNGaySinhUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ngaySinh: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, ngaySinh: ""};
        this.setState({errorAdd: errorUpdate});
    }

    thayDoiEmailUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    email: event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, email: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    thayDoiPassUpdate = (e) => {
        const newPassword = e.target.value;
        this.setState((prevState) => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                password: newPassword,
            },
        }));
        let errorUpdate = {...this.state.errorUpdate, password: ""};
        this.setState({errorUpdate: errorUpdate});
    }
    toggleShowPassword = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };
    thayDoiAnhUpdate = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Use URL.createObjectURL to set image URL
            const imageUrl = URL.createObjectURL(file);

            this.setState((prevState) => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    anh: imageUrl,
                },
                files: [file],
            }));
        }
        this.setState({ files: [ ...event.target.files] })
        let errorUpdate = { ...this.state.errorUpdate, anh: "" };
        this.setState({ errorUpdate: errorUpdate });
    };
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
    thayDoiTinhUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    tinhThanhPho: event.target.value                }
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
                    quanHuyen: event.target.value                }
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
                    xaPhuongThiTran: event.target.value                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate, xaPhuongThiTran: ""};
        this.setState({errorUpdate: errorUpdate});
    }

    fetchCities() {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                this.setState({ cities: response.data });
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }

    fetchDistricts(selectedCity) {
        axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
            .then((response) => {
                const districts = response.data.districts.map(district => ({
                    name: district.name,
                    code: district.code,
                }));
                this.setState({ districts }, () => {
                    // After setting districts, fetch wards if needed
                    const selectedDistrict = this.state.districts.find(d => d.name === this.state.nguoiDungUpdate.quanHuyen);
                    if (selectedDistrict) {
                        this.fetchWards(selectedDistrict);
                    }
                });
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    }

    fetchWards(selectedDistrict) {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
            .then((response) => {
                const wards = response.data.wards.map(ward => ({
                    name: ward.name,
                    code: ward.code,
                }));
                this.setState({ wards });
            })
            .catch((error) => {
                console.error('Error fetching wards:', error);
            });
    }

    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        this.setState((prevState) => ({
            nguoiDungUpdate: {
                ...prevState.nguoiDungUpdate,
                tinhThanhPho: selectedCityName,
                quanHuyen: '', // Reset quanHuyen when the city changes
                xaPhuongThiTran: '', // Reset xaPhuongThiTran when the city changes
            },
            errorUpdate: {
                ...prevState.errorUpdate,
                quanHuyen: '',  // Reset the error for quanHuyen
                xaPhuongThiTran: '',  // Reset the error for xaPhuongThiTran
            },
        }), () => {
            // After setting city, fetch districts if needed
            if (selectedCity) {
                this.fetchDistricts(selectedCity);
            }
        });
    }


    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        this.setState((prevState) => ({
            nguoiDungUpdate: {
                ...prevState.nguoiDungUpdate,
                quanHuyen: selectedDistrictName,
                xaPhuongThiTran: '', // Reset xaPhuongThiTran when the district changes
            },
            errorUpdate: {
                ...prevState.errorUpdate,
                xaPhuongThiTran: '',  // Reset the error for xaPhuongThiTran
            },
        }), () => {
            // After setting district, fetch wards if needed
            if (selectedDistrict) {
                this.fetchWards(selectedDistrict);
            }
        });
    }


    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState((prevState) => ({
            nguoiDungUpdate: {
                ...prevState.nguoiDungUpdate,
                xaPhuongThiTran: selectedWardName,
            },
        }));
    }


    render() {

        return (
            <div>
                <div className="pagetitle">
                    <h1>Thêm mới nhân viên</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Tài khoản</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">ADD<span>| xx</span></h5>
                                    <form>

                                        {/* Ảnh */}
                                        <div className="form-group">
                                            <label className="avatar-label" htmlFor="anh">
                                                <input
                                                    type="file"
                                                    id="anh"
                                                    accept="image/*"
                                                    onChange={this.thayDoiAnhUpdate}
                                                    className="file-input"
                                                />
                                                <div className="avatar-preview">
                                                    {this.state.taiKhoanUpdate.anh ? (
                                                        <img
                                                            src={`/niceadmin/img/${this.state.taiKhoanUpdate.anh}`}
                                                            alt="Selected Avatar"
                                                            className="avatar-img"
                                                        />
                                                    ) : (
                                                        <div className="avatar-placeholder">
                                                            <span>Chọn ảnh <span style={{ color: 'red' }}>*</span></span>
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                            {this.state.errorUpdate.files && (
                                                <div className="invalid-feedback">{this.state.errorUpdate.files}</div>
                                            )}
                                        </div>

                                        {/* CCCD */}
                                        <div className="form-group">
                                            <label htmlFor="cccd">CCCD:<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.cccd ? 'is-invalid' : ''}`}
                                                id="cccd"
                                                value={this.state.nguoiDungUpdate.cccd}
                                                readOnly
                                                style={{ backgroundColor: '#f0f0f0' }}
                                            />
                                            {this.state.errorUpdate.cccd && <div className="invalid-feedback">{this.state.errorUpdate.cccd}</div>}
                                        </div>

                                        {/* Họ và tên */}
                                        <div className="form-group">
                                            <label htmlFor="ten">Họ và tên: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                id="ten"
                                                value={this.state.nguoiDungUpdate.ten}
                                                onChange={this.thayDoiTenUpdate}
                                            />
                                            {this.state.errorUpdate.ten && <div className="invalid-feedback">{this.state.errorUpdate.ten}</div>}
                                        </div>
                                        {/* Ngày Sinh */}
                                        <div className="form-group">
                                            <label htmlFor="ngaySinh">Ngày Sinh: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="date"
                                                className={`form-control ${this.state.errorUpdate.ngaySinh ? 'is-invalid' : ''}`}
                                                id="ngaySinh"
                                                value={this.state.nguoiDungUpdate.ngaySinh}
                                                onChange={this.thayDoiNGaySinhUpdate}
                                            />
                                            {this.state.errorUpdate.ngaySinh && <div className="invalid-feedback">{this.state.errorUpdate.ngaySinh}</div>}
                                        </div>
                                        {/* Giới tính */}
                                        <div className="form-group">
                                            <label htmlFor="ngaySinh">Giới tính: <span style={{ color: 'red' }}>*</span></label>
                                            {this.state.nguoiDungUpdate && (
                                                <div>
                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="0"
                                                            checked={this.state.nguoiDungUpdate.gioiTinh === 0}
                                                            onChange={() => this.thayDoiGioiTinhUpdate(0)}
                                                        />
                                                        <span className="radio-custom"></span>
                                                        Nam
                                                    </label>
                                                    <label className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="gioiTinh"
                                                            value="1"
                                                            checked={this.state.nguoiDungUpdate.gioiTinh === 1}
                                                            onChange={() => this.thayDoiGioiTinhUpdate(1)}
                                                        />
                                                        <span className="radio-custom"></span>
                                                        Nữ
                                                    </label>
                                                </div>
                                            )}
                                            {this.state.errorUpdate.gioiTinh && (
                                                <div className="text-danger">{this.state.errorUpdate.gioiTinh}</div>
                                            )}
                                        </div>
                                        {/* Địa chỉ */}

                                        <label>Địa chỉ: <span style={{ color: 'red' }}>*</span></label>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <select
                                                    className="form-control"
                                                    name="tinhThanhPho"
                                                    onChange={(event) => this.handleCityChange(event)}
                                                    value={this.state.nguoiDungUpdate.tinhThanhPho}

                                                >
                                                    <option value="">Chọn tỉnh thành</option>
                                                    {this.state.cities.map(city => (
                                                        <option key={city.code} value={city.name}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {this.state.errorUpdate.tinhThanhPho && (
                                                    <div className="text-danger">{this.state.errorUpdate.tinhThanhPho}</div>
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-control"
                                                    name="quanHuyen"
                                                    onChange={(event) => this.handleDistrictChange(event)}
                                                    value={this.state.nguoiDungUpdate.quanHuyen}
                                                >
                                                    <option value="">Chọn quận huyện</option>
                                                    {this.state.districts.map(district => (
                                                        <option key={district.code} value={district.name}>
                                                            {district.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {this.state.errorUpdate.quanHuyen && (
                                                    <div className="text-danger">{this.state.errorUpdate.quanHuyen}</div>
                                                )}
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-control"
                                                    name="xaPhuongThiTran"
                                                    onChange={(event) => this.handleWardChange(event)}
                                                    value={this.state.nguoiDungUpdate.xaPhuongThiTran}
                                                >
                                                    <option value="">Chọn phường xã</option>
                                                    {this.state.wards.map(ward => (
                                                        <option key={ward.code} value={ward.name}>
                                                            {ward.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {this.state.errorUpdate.xaPhuongThiTran && (
                                                    <div className="text-danger">{this.state.errorUpdate.xaPhuongThiTran}</div>
                                                )}
                                            </div>
                                        </div>


                                        {/* Số nhà/Thôn */}
                                        <div className="form-group">
                                            <label htmlFor="diaChiCuThe">Địa chỉ cụ thể : <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.diaChiCuThe ? 'is-invalid' : ''}`}
                                                id="diaChiCuThe"
                                                onChange={this.thayDoiDiaChiUpdate}
                                                value={this.state.nguoiDungUpdate.diaChiCuThe}
                                            />
                                            {this.state.errorUpdate.diaChiCuThe && <div className="invalid-feedback">{this.state.errorUpdate.diaChiCuThe}</div>}
                                        </div>



                                        {/* SDT */}
                                        <div className="form-group">
                                            <label htmlFor="sdt">SDT: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.sdt ? 'is-invalid' : ''}`}
                                                id="sdt"
                                                onChange={this.thayDoiSdtUpdate}
                                                value={this.state.nguoiDungUpdate.sdt}
                                            />
                                            {this.state.errorUpdate.sdt && <div className="invalid-feedback">{this.state.errorUpdate.sdt}</div>}
                                        </div>

                                        {/* Email */}
                                        <div className="form-group">
                                            <label htmlFor="email">Email: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="email"
                                                className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                value={this.state.taiKhoanUpdate.email}
                                                onChange={this.thayDoiEmailUpdate}
                                            />
                                            {this.state.errorUpdate.email && <div className="invalid-feedback">{this.state.errorUpdate.email}</div>}
                                        </div>

                                        <input type="submit" className="btn btn-primary" value="Update"
                                               style={{marginTop: '10px'}} onClick={this.update}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        )
    }
}

export default TaiKhoanNVUpdate