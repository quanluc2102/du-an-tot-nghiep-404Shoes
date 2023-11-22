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
            taiKhoanUpdate: {
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            },
            nguoiDungUpdate: {
                sdt: '',
                ten: '',
                cccd: '',
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
                cccd: '',
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
        const id = this.props.match.params.id;
        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                const taiKhoanData = response.data;
                console.log("User Account Data:", taiKhoanData);
                this.setState({taiKhoanUpdate: taiKhoanData});

                // Sau khi lấy thông tin tài khoản, bạn có thể tiếp tục lấy thông tin người dùng.
                taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
                    .then((thongTinResponse) => {
                        const thongTinData = thongTinResponse.data;
                        console.log("User Information Data:", thongTinData);
                        this.setState({
                            nguoiDungUpdate: thongTinData,
                            tinhThanhPho: thongTinData.tinhThanhPho || '', // Kiểm tra null hoặc undefined
                            quanHuyen: thongTinData.quanHuyen || '',
                            xaPhuongThiTran: thongTinData.xaPhuongThiTran || '',
                            diaChiCuThe: thongTinData.diaChiCuThe || '',
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching user information:", error);
                    });
            })
        this.fetchCities();
    }


    update = (e) => {
        e.preventDefault();
        let listFile = [];
        for (let i = 0; i < this.state.files.length; i++) {
            listFile.push(this.state.files[i].name);
            const {taiKhoanUpdate, nguoiDungUpdate} = this.state;
            const requestData = {
                taiKhoan: taiKhoanUpdate,
                thongTinNguoiDung: nguoiDungUpdate,
                files: listFile,
                diaChiCuThe: nguoiDungUpdate.diaChiCuThe,
                tinhThanhPho: this.state.tinhThanhPho,
                quanHuyen: this.state.quanHuyen,
                xaPhuongThiTran: this.state.xaPhuongThiTran,
            };

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
    }

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
                                    <form onSubmit={this.update}>

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

                                        <div className="form-group">
                                            <label htmlFor="ten">CCCD:</label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorUpdate.cccd ? 'is-invalid' : ''}`}
                                                id="cccd"
                                                value={this.state.nguoiDungUpdate.cccd}
                                                // onChange={this.thayDoiTenUpdate}d
                                                disabled
                                            />
                                            {this.state.errorUpdate.cccd && <div className="invalid-feedback">{this.state.errorUpdate.cccd}</div>}
                                        </div>

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
                                            <label htmlFor="diaChiCuThe">Số nhà/Thôn:</label>
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

                                        {/* Giới tính */}
                                        <div className="form-group">
                                            <label>Giới tính:</label>
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

export default TaiKhoanNVUpdate