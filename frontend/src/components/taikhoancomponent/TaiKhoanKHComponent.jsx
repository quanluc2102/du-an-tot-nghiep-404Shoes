import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import $ from 'jquery';
import "./TaiKhoanKH.css";
class TaiKhoanKHComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen3: [],
            thongTinNguoiDung: [],
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe:'' ,
            provinces: [],  // Stores the list of provinces
            districts: [],  // Stores the list of districts
            wards: [],
            cities: [],
            diaChi:[],
            pageCount: 0,
            files:null,
            taiKhoanAdd: {
                maTaiKhoan: '',
                email: '',
                anh: '',
            },
            taiKhoanUpdate: {
                maTaiKhoan: '',
                email: '',
                anh: ''
            },
            nguoiDungAdd: {
                // diaChi: '',
                // diaChiCuThe: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '0',
                ngaySinh: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
                diaChiCuThe:'' ,
            },
            nguoiDungUpdate: {
                diaChi: '',
                diaChiCuThe: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '0',
                ngaySinh: '',
            },
            errorAdd: {
                diaChi: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: '',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },
            errorUpdate: {
                diaChi: '',
                diaChiCuThe: '',
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            }
        };
        this.add = this.add.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiDiaChiAdd = this.thayDoiDiaChiAdd.bind(this);
        // this.thayDoiDiaChiCuTheAdd = this.thayDoiDiaChiCuTheAdd.bind(this);
        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);
        this.thayDoiGioiTinhAdd = this.thayDoiGioiTinhAdd.bind(this);
        // this.thayDoiPassAdd = this.thayDoiPassAdd.bind(this);
        this.thayDoiNGaySinhAdd = this.thayDoiNGaySinhAdd.bind(this);
        this.thayDoiMaKHAdd = this.thayDoiMaKHAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiCCCDAdd = this.thayDoiCCCDAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
        this.thayDoiTinhAdd = this.thayDoiTinhAdd.bind(this);
        this.thayDoiHuyenAdd = this.thayDoiHuyenAdd.bind(this);
        this.thayDoiXaAdd = this.thayDoiXaAdd.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
    }

    componentDidMount() {
        this.fetchCities(); // Call this to load the list of provinces.
        taikhoanservice.getKhachHang().then((res) => {
            this.setState({ nhanVienQuyen3: res.data });
        });
    }



    // ... (Các xử lý khác)

    add = (e) => {
        e.preventDefault();

        let listFile = [];
        if (this.state.files) {
            for (let i = 0; i < this.state.files.length; i++) {
                listFile.push(this.state.files[i].name);
            }
        }


        const { taiKhoanAdd, nguoiDungAdd } = this.state;
        const requestData = {
            taiKhoan: taiKhoanAdd,
            thongTinNguoiDung: nguoiDungAdd,
            files: listFile,
            diaChiCuThe: nguoiDungAdd.diaChiCuThe,
            tinhThanhPho: this.state.tinhThanhPho,
            quanHuyen: this.state.quanHuyen,
            xaPhuongThiTran: this.state.xaPhuongThiTran,
        };

        let errorAdd = {
            diaChiCuThe: '',
            sdt: '',
            ten: '',
            cccd: '',
            gioiTinh: '',
            ngaySinh: '',
            maTaiKhoan: '',
            email: '',
            password: '',
            anh: '',
        };
        if (!nguoiDungAdd.ten || !nguoiDungAdd.ten.trim() || !/^[a-zA-Z\sàáảãạăắằẳẵặâấầẩẫậèéẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ]+$/.test(nguoiDungAdd.ten)) {
            errorAdd.ten = 'Tên không được bỏ trống hoặc chứa kí tự đặc biệt!';
        }
        // Kiểm tra số điện thoại
        if (!nguoiDungAdd.sdt || !nguoiDungAdd.sdt.trim() || !/^\d+$/.test(nguoiDungAdd.sdt)) {
            errorAdd.sdt = 'Số điện thoại không được bỏ trống và chỉ chứa số!';
        }

        // Kiểm tra email
        if (!taiKhoanAdd.email || !taiKhoanAdd.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(taiKhoanAdd.email)) {
            errorAdd.email = 'Email không được bỏ trống và phải là địa chỉ email hợp lệ!';
        }

        // Kiểm tra địa chỉ cụ thể
        if (!nguoiDungAdd.diaChiCuThe || !nguoiDungAdd.diaChiCuThe.trim() || nguoiDungAdd.diaChiCuThe.trim() === '') {
            errorAdd.diaChiCuThe = 'Địa chỉ cụ thể không được bỏ trống hoặc chỉ chứa khoảng trắng!';
        }

        // Kiểm tra CCCD
        if (!nguoiDungAdd.cccd || !nguoiDungAdd.cccd.trim()) {
            errorAdd.cccd = 'CCCD không được bỏ trống!';
        }



        if (Object.values(errorAdd).some((error) => error !== '')) {
            this.setState({ errorAdd });
            return;
        }
        console.log(requestData);
        taikhoanservice.addKhachHang(requestData)
            .then((res) => {
                if (res.status === 200) {
                    // Xử lý khi thêm thành công
                    let taiKhoanMoi = res.data.taiKhoan;
                    this.setState((prevState) => ({
                        nhanVienQuyen3: [...prevState.nhanVienQuyen3, taiKhoanMoi],
                    }));

                    let nguoiDungMoi = res.data.thongTinNguoiDung;
                    this.setState((prevState) => ({
                        thongTinNguoiDung: [...prevState.thongTinNguoiDung, nguoiDungMoi],
                    }));
                    let diaChiMoi = res.data.diaChi
                    this.setState((prevState) => ({
                        diaChi: [...prevState.diaChi, diaChiMoi],
                    }));
                    setTimeout(() => {
                        window.location.href = (`/khachhang`);
                    }, 2000);
                    toast.success("Thêm thành công!");
                } else {
                    // Xử lý khi có lỗi trả về từ API
                    const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm danh mục.";
                    toast.error("Lỗi: " + errorMessage);
                    console.log(res.data.error);
                }
            })
            .catch((error) => {
                // Xử lý lỗi khi gửi yêu cầu API
                if (error.message === "Network Error") {
                    toast.error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.");
                } else {
                    toast.error("Lỗi khi gửi yêu cầu API: " + error);
                }
            });
    }

// ... (Các xử lý khác)



    thayDoiTenAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    ten: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, ten: ""};
        this.setState({errorAdd: errorAdd});
        console.log(this.state.tinhThanhPho)
        console.log(this.state.quanHuyen)
        console.log(this.state.xaPhuongThiTran)
    }
    // thayDoiDiaChiAdd = (event) => {
    //     this.setState(
    //         prevState => ({
    //             nguoiDungAdd: {
    //                 ...prevState.nguoiDungAdd,
    //                 diaChi: event.target.value
    //             }
    //         })
    //     );
    //     let errorAdd = {...this.state.errorAdd, diaChi: ""};
    //     this.setState({errorAdd: errorAdd});
    // }
    thayDoiDiaChiAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    diaChiCuThe: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, diaChiCuThe: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiSdtAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    sdt: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, sdt: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiGioiTinhAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    gioiTinh: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, gioiTinh: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiNGaySinhAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    ngaySinh: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, ngaySinh: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiMaKHAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    maTaiKhoan: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, maTaiKhoan: ""};
        this.setState({errorAdd: errorAdd});
    }

    thayDoiCCCDAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    cccd: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, cccd: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiEmailAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    email: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, email: ""};
        this.setState({errorAdd: errorAdd});
    }

    thayDoiAnhAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    anh: event.target.value                }
            })
        );
        this.setState({ files: [ ...event.target.files] })
        let errorAdd = {...this.state.errorAdd, anh: ""};
        this.setState({errorAdd: errorAdd});
    }

    thayDoiTinhAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    tinhThanhPho: event.target.value                }
            })
        );
        let errorAdd = {...this.state.errorAdd, tinhThanhPho: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiHuyenAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    quanHuyen: event.target.value                }
            })
        );
        let errorAdd = {...this.state.errorAdd, quanHuyen: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiXaAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    xaPhuongThiTran: event.target.value                }
            })
        );
        let errorAdd = {...this.state.errorAdd, xaPhuongThiTran: ""};
        this.setState({errorAdd: errorAdd});
    }

    detail(id) {
        window.location.href = `/khachhangdetail/${id}`;
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
                    <h1> Khách hàng </h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <form>
                                        <div>
                                            Ảnh :
                                            <input
                                                className={`form-control ${this.state.errorAdd.anh ? 'is-invalid' : ''}`}                                                type={"file"} value={this.state.taiKhoanAdd.anh}
                                                type="file" value={this.state.taiKhoanAdd.anh}
                                                onChange={this.thayDoiAnhAdd}/>
                                            {this.state.errorAdd.anh &&
                                            <div className="text-danger">{this.state.errorAdd.anh}</div>}
                                        </div>
                                        <div>
                                            Họ và tên :
                                            <input
                                                className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`}
                                                name="ten"
                                                value={this.state.nguoiDungAdd.ten} onChange={this.thayDoiTenAdd}/>
                                            {this.state.errorAdd.ten &&
                                            <div className="text-danger">{this.state.errorAdd.ten}</div>}
                                        </div>
                                        <div>
                                            Địa chỉ:
                                            <select name="tinhThanhPho" onChange={(event) => this.handleCityChange(event)}>
                                                <option value="">Chọn tỉnh thành</option>
                                                {this.state.cities.map(city => (
                                                    <option key={city.code} value={city.name}>{city.name}</option>
                                                ))}
                                            </select>
                                            <select name="quanHuyen" onChange={(event) => this.handleDistrictChange(event)}>
                                                <option value="">Chọn quận huyện</option>
                                                {this.state.districts.map(district => (
                                                    <option key={district.code} value={district.name}>{district.name}</option>
                                                ))}
                                            </select>
                                            <select name="xaPhuongThiTran" onChange={(event) => this.handleWardChange(event)}>
                                                <option value="">Chọn phường xã</option>
                                                {this.state.wards.map(ward => (
                                                    <option key={ward.code} value={ward.name}>{ward.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label>Địa chỉ cụ thể :</label>
                                            <input
                                                className={`form-control ${this.state.errorAdd.diaChiCuThe ? 'is-invalid' : ''}`}
                                                name="diaChiCuThe" style={{}}
                                                onChange={this.thayDoiDiaChiAdd}
                                                value={this.state.nguoiDungAdd.diaChiCuThe}/>

                                            {this.state.errorAdd.diaChiCuThe &&
                                            <div className="text-danger">{this.state.errorAdd.diaChiCuThe}</div>}
                                        </div>


                                        <div>
                                            CCCD :
                                            <input
                                                className={`form-control ${this.state.errorAdd.cccd ? 'is-invalid' : ''}`}
                                                name="cccd" style={{}}
                                                onChange={this.thayDoiCCCDAdd}
                                                value={this.state.nguoiDungAdd.cccd}/>

                                            {this.state.errorAdd.cccd &&
                                            <div className="text-danger">{this.state.errorAdd.cccd}</div>}
                                        </div>
                                        <div>
                                            SDT :
                                            <input
                                                className={`form-control ${this.state.errorAdd.sdt ? 'is-invalid' : ''}`}
                                                name="sdt"
                                                onChange={this.thayDoiSdtAdd}
                                                value={this.state.nguoiDungAdd.sdt}/>

                                            {this.state.errorAdd.sdt &&
                                            <div className="text-danger">{this.state.errorAdd.sdt}</div>}
                                        </div>
                                        <div>
                                            Giới tính :
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gioiTinh"
                                                    value="0"
                                                    checked={this.state.nguoiDungAdd.gioiTinh === '0'}
                                                    onChange={this.thayDoiGioiTinhAdd}
                                                /> Nam
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="gioiTinh"
                                                    value="1"
                                                    checked={this.state.nguoiDungAdd.gioiTinh === '1'}
                                                    onChange={this.thayDoiGioiTinhAdd}
                                                /> Nữ
                                            </label>
                                            {this.state.errorAdd.gioiTinh && (
                                                <div className="text-danger">{this.state.errorAdd.gioiTinh}</div>
                                            )}
                                        </div>

                                        <div>
                                            Ngày Sinh :
                                            <input
                                                className={`form-control ${this.state.errorAdd.ngaySinh ? 'is-invalid' : ''}`}
                                                value={this.state.nguoiDungAdd.ngaySinh} name="ngaySinh" type="date"
                                                onChange={this.thayDoiNGaySinhAdd}/>
                                            {this.state.errorAdd.ngaySinh &&
                                            <div className="text-danger">{this.state.errorAdd.ngaySinh}</div>}
                                        </div>
                                        <div>
                                            Email :
                                            <input
                                                className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`}
                                                name="email" value={this.state.taiKhoanAdd.email}
                                                onChange={this.thayDoiEmailAdd}/>
                                            {this.state.errorAdd.email &&
                                            <div className="text-danger">{this.state.errorAdd.email}</div>}
                                        </div>
                                        <div className="my-3">
                                            <button className="btn btn-success" onClick={this.add}>
                                                Add
                                            </button>
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

export default TaiKhoanKHComponent;
