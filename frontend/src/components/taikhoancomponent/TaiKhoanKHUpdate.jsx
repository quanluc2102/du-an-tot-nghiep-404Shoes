import React, { Component } from 'react';
import taikhoanservice from '../../services/taikhoanservice/taikhoanservice';
import { toast } from 'react-toastify';
import axios from "axios";

class TaiKhoanKHUpdate extends Component {
    state = {
        nhanVienQuyen3: [],
        thongTinNguoiDung: [],
        provinces: [],
        districts: [],
        wards: [],
        pageCount: 0,
        taiKhoanUpdate: {
            id: this.props.match.params.id,
            maTaiKhoan: '',
            email: '',
            anh: '',
        },
        nguoiDungUpdate: {
            id: this.props.match.params.id,
            diaChi: '',
            sdt: '',
            ten: '',
            cccd: '',
            gioiTinh: '',
            ngaySinh: '',
            addresses: [],
        },
        currentAddress: {
            name: '',
            phone: '',
            detailedAddress: '',
            province: '',
            district: '',
            ward: '',
            town: '',
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
            password: '',
            anh: ''
        },
        address: {
            name: '',
            phone: '',
            detailedAddress: '',
            province: '',
            district: '',
            ward: '',
            town: '',
        },
    };

    componentDidMount() {
        const id = this.props.match.params.id;

        // Fetch user account data
        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                const taiKhoanData = response.data;
                console.log('User Account Data:', taiKhoanData);
                this.setState({ taiKhoanUpdate: taiKhoanData });

                // Fetch user information data
                taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
                    .then((thongTinResponse) => {
                        const thongTinData = thongTinResponse.data;
                        console.log('User Information Data:', thongTinData);
                        this.setState({ nguoiDungUpdate: thongTinData });
                    })
                    .catch((error) => {
                        console.error('Error fetching user information:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching user account:', error);
            });

        // Fetch provinces and initialize empty arrays for districts and wards
        axios.get("https://provinces.open-api.vn/api/?depth=1")
            .then((response) => {
                this.setState({ provinces: response.data, districts: [], wards: [] });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách tỉnh/thành phố:', error);
            });
    }


    update = (e) => {
        e.preventDefault();
        const { taiKhoanUpdate, nguoiDungUpdate, currentAddress, addresses } = this.state;
        const requestData = {
            taiKhoan: taiKhoanUpdate,
            thongTinNguoiDung: nguoiDungUpdate,
            diaChi: currentAddress,
            addresses: addresses,
        };

        console.log('Request Data: ' + JSON.stringify(requestData));
        taikhoanservice
            .updateQuanLy(requestData, this.state.taiKhoanUpdate.id)
            .then((response) => {
                const { taiKhoan, thongTinNguoiDung } = response.data;
                this.setState({
                    taiKhoanUpdate: taiKhoan,
                    nguoiDungUpdate: thongTinNguoiDung,
                    currentAddress: {
                        name: '',
                        phone: '',
                        detailedAddress: '',
                        province: '',
                        district: '',
                        ward: '',
                        town: '',
                    },
                    addresses: [],
                });
                setTimeout(() => {
                    window.location.href = `/khachhang`;
                }, 2000);
                toast.success('Sửa thành công!');
            })
            .catch((error) => {
                console.error('Update request error:', error);
                toast.error('Lỗi khi cập nhật');
            });
    };

    themDiaChiMoi = () => {
        const { currentAddress, addresses } = this.state;

        if (!currentAddress.name || !currentAddress.phone || !currentAddress.detailedAddress || !currentAddress.province || !currentAddress.district || !currentAddress.ward || !currentAddress.town) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, diaChi: 'Vui lòng nhập đầy đủ thông tin địa chỉ.' } });
            return;
        }

        this.setState({
            addresses: [...addresses, currentAddress],
            currentAddress: {
                name: '',
                phone: '',
                detailedAddress: '',
                province: '',
                district: '',
                ward: '',
                town: '',
            },
        });
    }

    xoaDiaChi = (index) => {
        const { addresses } = this.state;
        const newAddresses = [...addresses];
        newAddresses.splice(index, 1);
        this.setState({ addresses: newAddresses });
    }

    thayDoiTenDiaChi = (event) => {
        this.setState(
            prevState => ({
                currentAddress: {
                    ...prevState.currentAddress,
                    name: event.target.value
                }
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, diaChi: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiSoDienThoaiDiaChi = (event) => {
        this.setState(
            prevState => ({
                currentAddress: {
                    ...prevState.currentAddress,
                    phone: event.target.value
                }
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, diaChi: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiDiaChiCuTheUpdate = (event) => {
        this.setState(
            prevState => ({
                currentAddress: {
                    ...prevState.currentAddress,
                    detailedAddress: event.target.value
                }
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, diaChi: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiTinhThanhPho = (event) => {
        this.setState(
            prevState => ({
                currentAddress: {
                    ...prevState.currentAddress,
                    province: event.target.value
                }
            })
        );

        axios.get(`https://provinces.open-api.vn/api/districts?province=${event.target.value}`)
            .then((response) => {
                this.setState({ districts: response.data });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách quận/huyện:', error);
            });
    }

    thayDoiTinhThanhPho = (event) => {
        const selectedProvince = event.target.value;
        this.setState((prevState) => ({
            currentAddress: {
                ...prevState.currentAddress,
                province: selectedProvince,
            },
        }));
        this.fetchDistricts(selectedProvince);
    };

    thayDoiQuanHuyen = (event) => {
        const selectedDistrict = event.target.value;
        this.setState((prevState) => ({
            currentAddress: {
                ...prevState.currentAddress,
                district: selectedDistrict,
            },
        }));
        this.fetchWards(selectedDistrict);
    };

    render() {
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
                                    <div className="update-form">
                                        <div className="left-column">

                                            <div>
                                                Ảnh:
                                                <input
                                                    className={`form-control ${this.state.errorUpdate.anh ? 'is-invalid' : ''}`}
                                                    type="file"
                                                    onChange={this.thayDoiAnhUpdate}
                                                />
                                                {this.state.errorUpdate.anh &&
                                                <div className="text-danger">{this.state.errorUpdate.anh}</div>}
                                            </div>
                                            <div>
                                                Họ và tên:
                                                <input
                                                    className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                    name="ten"
                                                    value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.ten ? this.state.nguoiDungUpdate.ten : ''}
                                                    onChange={this.thayDoiTenUpdate}
                                                />
                                                {this.state.errorUpdate.ten &&
                                                <div className="text-danger">{this.state.errorUpdate.ten}</div>}
                                            </div>
                                            <div>
                                                Email:
                                                <input
                                                    className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                    name="email"
                                                    value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.email ? this.state.taiKhoanUpdate.email : ''}
                                                    onChange={this.thayDoiEmailUpdate}
                                                />
                                                {this.state.errorUpdate.email &&
                                                <div className="text-danger">{this.state.errorUpdate.email}</div>}
                                            </div>
                                            <div>
                                                UserName:
                                                <input
                                                    className={`form-control ${this.state.errorUpdate.maTaiKhoan ? 'is-invalid' : ''}`}
                                                    name="maTaiKhoan"
                                                    value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.maTaiKhoan ? this.state.taiKhoanUpdate.maTaiKhoan : ''}
                                                    onChange={this.thayDoiUsernameUpdate}
                                                    disabled
                                                />
                                                {this.state.errorUpdate.maTaiKhoan &&
                                                <div className="text-danger">{this.state.errorUpdate.maTaiKhoan}</div>}
                                            </div>

                                        </div>
                                        <div className="right-column">
                                            <h2>Thêm địa chỉ mới</h2>
                                            <div>
                                                Địa chỉ cụ thể:
                                                <input
                                                    className={`form-control ${this.state.errorUpdate.diaChi ? 'is-invalid' : ''}`}
                                                    name="diaChi"
                                                    value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.diaChi ? this.state.nguoiDungUpdate.diaChi : ''}
                                                    onChange={this.thayDoiDiaChiCuTheUpdate}
                                                />
                                                {this.state.errorUpdate.diaChi &&
                                                <div className="text-danger">{this.state.errorUpdate.diaChi}</div>}
                                            </div>
                                            <div>
                                                Tỉnh/Thành phố:
                                                <select
                                                    className="form-control"
                                                    onChange={this.thayDoiTinhThanhPho}
                                                >
                                                    <option value="">Chọn</option>
                                                    {this.state.provinces.map(province => (
                                                        <option
                                                            key={province.code}
                                                            value={province.name}
                                                        >
                                                            {province.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                Quận/Huyện:
                                                <select
                                                    id="district"
                                                    className="form-control"
                                                    onChange={this.thayDoiQuanHuyen}
                                                >
                                                    <option value="">Chọn</option>
                                                    {this.state.districts.map((district) => (
                                                        <option key={district.code} value={district.code}>
                                                            {district.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                Xã/Phường/Thị trấn:
                                                <select
                                                    id="ward"
                                                    className="form-control"
                                                    onChange={this.thayDoiPhuongXa}
                                                >
                                                    <option value="">Chọn</option>
                                                    {this.state.wards.map((ward) => (
                                                        <option key={ward.code} value={ward.code}>
                                                            {ward.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/*<div>*/}
                                            {/*    Giới tính:*/}
                                            {/*    <label className="radio-label">*/}
                                            {/*        <input*/}
                                            {/*            type="radio"*/}
                                            {/*            name="gioiTinh"*/}
                                            {/*            value="0"*/}
                                            {/*            checked={this.state.nguoiDungUpdate.gioiTinh === 0}*/}
                                            {/*            onChange={() => this.thayDoiGioiTinhUpdate(0)}*/}
                                            {/*        />*/}
                                            {/*        <span className="radio-custom"></span>*/}
                                            {/*        Nam*/}
                                            {/*    </label>*/}
                                            {/*    <label className="radio-label">*/}
                                            {/*        <input*/}
                                            {/*            type="radio"*/}
                                            {/*            name="gioiTinh"*/}
                                            {/*            value="1"*/}
                                            {/*            checked={this.state.nguoiDungUpdate.gioiTinh === 1}*/}
                                            {/*            onChange={() => this.thayDoiGioiTinhUpdate(1)}*/}
                                            {/*        />*/}
                                            {/*        <span className="radio-custom"></span>*/}
                                            {/*        Nữ*/}
                                            {/*    </label>*/}
                                            {/*    {this.state.errorUpdate.gioiTinh && (*/}
                                            {/*        <div className="text-danger">{this.state.errorUpdate.gioiTinh}</div>*/}
                                            {/*    )}*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    Ngày Sinh:*/}
                                            {/*    <input*/}
                                            {/*        className={`form-control ${this.state.errorUpdate.ngaySinh ? 'is-invalid' : ''}`}*/}
                                            {/*        value={this.state.nguoiDungUpdate && this.state.nguoiDungUpdate.ngaySinh ? this.state.nguoiDungUpdate.ngaySinh : ''}*/}
                                            {/*        name="ngaySinh"*/}
                                            {/*        type="date"*/}
                                            {/*        onChange={this.thayDoiNGaySinhUpdate}*/}
                                            {/*    />*/}
                                            {/*    {this.state.errorUpdate.ngaySinh &&*/}
                                            {/*    <div className="text-danger">{this.state.errorUpdate.ngaySinh}</div>}*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    Email:*/}
                                            {/*    <input*/}
                                            {/*        className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}*/}
                                            {/*        name="email"*/}
                                            {/*        value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.email ? this.state.taiKhoanUpdate.email : ''}*/}
                                            {/*        onChange={this.thayDoiEmailUpdate}*/}
                                            {/*    />*/}
                                            {/*    {this.state.errorUpdate.email &&*/}
                                            {/*    <div className="text-danger">{this.state.errorUpdate.email}</div>}*/}
                                            {/*</div>*/}
                                            {/*<div>*/}
                                            {/*    UserName:*/}
                                            {/*    <input*/}
                                            {/*        className={`form-control ${this.state.errorUpdate.maTaiKhoan ? 'is-invalid' : ''}`}*/}
                                            {/*        name="maTaiKhoan"*/}
                                            {/*        value={this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.maTaiKhoan ? this.state.taiKhoanUpdate.maTaiKhoan : ''}*/}
                                            {/*        onChange={this.thayDoiUsernameUpdate}*/}
                                            {/*        disabled*/}
                                            {/*    />*/}
                                            {/*    {this.state.errorUpdate.maTaiKhoan &&*/}
                                            {/*    <div className="text-danger">{this.state.errorUpdate.maTaiKhoan}</div>}*/}
                                            {/*</div>*/}

                                            <div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </div>
                                            {/*</form>*/}
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

export default TaiKhoanKHUpdate;


