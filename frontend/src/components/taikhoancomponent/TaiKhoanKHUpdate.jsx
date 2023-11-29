import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import {toast} from "react-toastify";
import axios from "axios";
import "./nhanvien.css";
import $ from 'jquery';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";

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
            cities: [],
            districts: [],
            wards: [],
            pageCount: 0,
            diaChi: [],
            files: null,
            showPassword: false,
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            },

            nguoiDungUpdate: {
                id: this.props.match.params.id,
                sdt: '',
                ten: '',

                gioiTinh: '',
                ngaySinh: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                diaChiCuThe: '',
            },
            errorUpdate: {
                diaChi: '',
                sdt: '',
                ten: '',

                gioiTinh: '',
                ngaySinh: '',
                maTaiKhoan: '',
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
        // Lấy id từ URL
        const id = this.props.match.params.id;

        // Gọi API để lấy thông tin tài khoản dựa trên id
        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                // Lấy dữ liệu từ phản hồi của API
                const taiKhoanData = response.data;

                // Log thông tin tài khoản ra console
                console.log("User Account Data:", taiKhoanData);

                // Cập nhật state với dữ liệu tài khoản mới
                this.setState({ taiKhoanUpdate: taiKhoanData });

                // Tiếp tục lấy thông tin người dùng sau khi có thông tin tài khoản
                this.fetchUserInfo(taiKhoanData);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error("Error fetching user account:", error);
            });
    }

    fetchUserInfo(taiKhoanData) {
        // Gọi API để lấy thông tin người dùng dựa trên dữ liệu tài khoản
        taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
            .then((thongTinResponse) => {
                // Lấy dữ liệu thông tin người dùng từ phản hồi của API
                const thongTinData = thongTinResponse.data;

                // Log thông tin người dùng ra console
                console.log("User Information Data:", thongTinData);

                // Cập nhật state với dữ liệu thông tin người dùng mới
                this.setState({
                    nguoiDungUpdate: thongTinData,
                    tinhThanhPho: thongTinData.tinhThanhPho || '', // Kiểm tra null hoặc undefined
                    quanHuyen: thongTinData.quanHuyen || '',
                    xaPhuongThiTran: thongTinData.xaPhuongThiTran || '',
                    diaChiCuThe: thongTinData.diaChiCuThe || '',
                });
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error("Error fetching user information:", error);
            });
    }

    update = async (e) => {
        e.preventDefault();

        // Kiểm tra số điện thoại
        const phoneNumber = this.state.nguoiDungUpdate.sdt;
        const phoneNumberRegex = /^[0-9]{10}$/;

        if (!phoneNumberRegex.test(phoneNumber)) {
            let errorUpdate = { ...this.state.errorUpdate, sdt: "Số điện thoại không hợp lệ" };
            this.setState({ errorUpdate: errorUpdate });
            return;
        }



        // Kiểm tra tên không được để trống
        if (!this.state.nguoiDungUpdate.ten) {
            let errorUpdate = { ...this.state.errorUpdate, ten: "Tên không được để trống" };
            this.setState({ errorUpdate: errorUpdate });
            return;
        }

        // Kiểm tra tên không chứa các kí tự đặc biệt hoặc số
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>1234567890]/;
        if (specialCharacterRegex.test(this.state.nguoiDungUpdate.ten)) {
            let errorUpdate = { ...this.state.errorUpdate, ten: "Tên không được chứa các kí tự đặc biệt hoặc số" };
            this.setState({ errorUpdate: errorUpdate });
            return;
        }

        // Kiểm tra ngày sinh không phải là ngày hôm nay
        const today = new Date();
        const selectedDate = new Date(this.state.nguoiDungUpdate.ngaySinh);

        if (
            selectedDate.getDate() === today.getDate() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getFullYear() === today.getFullYear()
        ) {
            let errorUpdate = { ...this.state.errorUpdate, ngaySinh: "Ngày sinh không được là ngày hôm nay" };
            this.setState({ errorUpdate: errorUpdate });
            return;
        }

        const confirmed = window.confirm('Bạn có chắc chắn muốn chỉnh sửa khách hàng này?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }

        const { taiKhoanUpdate, nguoiDungUpdate } = this.state;
        const requestData = {
            taiKhoan: taiKhoanUpdate,
            thongTinNguoiDung: nguoiDungUpdate,
        };

        taikhoanservice.updateKhachHang(this.state.taiKhoanUpdate.id, requestData)
            .then((response) => {
                const { taiKhoan, thongTinNguoiDung } = response.data;
                this.setState({
                    taiKhoanUpdate: taiKhoan,
                    nguoiDungUpdate: thongTinNguoiDung,
                });
                setTimeout(() => {
                    window.location.href = (`/khachhang`);
                }, 2000);
                toast.success("Sửa thành công!");
            })
            .catch((error) => {
                console.error("Update request error:", error);
                toast.error("Lỗi khi cập nhật");
            });
    };




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

        console.log(this.state.tinhThanhPho)
        console.log(this.state.quanHuyen)
        console.log(this.state.xaPhuongThiTran)
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
        this.setState({errorUpdate: errorUpdate});
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
        } else {
            // Không có tệp nào được chọn
            this.setState({ files: [] });
        }

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
                this.setState({ districts: response.data.districts });
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    }

    fetchWards(selectedDistrict) {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
            .then((response) => {
                this.setState({ wards: response.data.wards });
            })
            .catch((error) => {
                console.error('Error fetching wards:', error);
            });
    }

    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        this.setState({
            tinhThanhPho: selectedCityName,
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity); // Chỉ thực hiện fetchDistricts nếu có dữ liệu cho selectedCity
        }
    }

    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        this.setState({
            quanHuyen: selectedDistrictName,
        });

        if (selectedDistrict) {
            this.fetchWards(selectedDistrict); // Chỉ thực hiện fetchWards nếu có dữ liệu cho selectedDistrict
        }
    }

    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState({ xaPhuongThiTran: selectedWardName });
    }

    render() {
        const { taiKhoanUpdate } = this.state;

        // Kiểm tra nếu taiKhoanUpdate không phải là null hoặc undefined
        if (!taiKhoanUpdate) {
            return <div>Đang tải...</div>; // hoặc hiển thị một chỉ báo tải
        }

        return (
            <div>
                <div className="pagetitle">
                    <h1>Tài khoản khách hàng</h1>
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
                                    <h5 className="card-title">UPDATE<span>| xx</span></h5>
                                    <form onSubmit={this.update}>

                                        {/* Họ và tên */}
                                        <div className="form-group">
                                            <label htmlFor="ten">Họ và tên:</label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                id="ten"
                                                value={this.state.nguoiDungUpdate.ten}
                                                onChange={this.thayDoiTenUpdate}
                                            />
                                            {this.state.errorUpdate.ten && <div className="invalid-feedback">{this.state.errorUpdate.ten}</div>}
                                        </div>





                                        {/* SDT */}
                                        <div className="form-group">
                                            <label htmlFor="sdt">SDT:</label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.sdt ? 'is-invalid' : ''}`}
                                                id="sdt"
                                                onChange={this.thayDoiSdtUpdate}
                                                value={this.state.nguoiDungUpdate.sdt}
                                            />
                                            {this.state.errorUpdate.sdt && <div className="invalid-feedback">{this.state.errorUpdate.sdt}</div>}
                                        </div>


                                        {/* Ngày Sinh */}
                                        <div className="form-group">
                                            <label htmlFor="ngaySinh">Ngày Sinh:</label>
                                            <input
                                                type="date"
                                                className={`form-control ${this.state.errorUpdate.ngaySinh ? 'is-invalid' : ''}`}
                                                id="ngaySinh"
                                                value={this.state.nguoiDungUpdate.ngaySinh}
                                                onChange={this.thayDoiNGaySinhUpdate}
                                            />
                                            {this.state.errorUpdate.ngaySinh && <div className="invalid-feedback">{this.state.errorUpdate.ngaySinh}</div>}
                                        </div>

                                        {/* Email */}
                                        <div className="form-group">
                                            <label htmlFor="email">Email:</label>
                                            <input
                                                type="email"
                                                className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                value={this.state.taiKhoanUpdate.email}
                                                onChange={this.thayDoiEmailUpdate}
                                            />
                                            {this.state.errorUpdate.email && <div className="invalid-feedback">{this.state.errorUpdate.email}</div>}
                                        </div>

                                        <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} />

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

export default TaiKhoanKHUpdate