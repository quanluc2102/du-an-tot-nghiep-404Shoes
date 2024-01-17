import React, {Component, useRef} from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import {toast} from "react-toastify";
import axios from "axios";
import "./nhanvien.css";
import QrScanner from 'react-qr-scanner';
class TaiKhoanNVComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nhanVienQuyen1: [],
            thongTinNguoiDung: [],
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            listThayThe:[],
            diaChiCuThe:'' ,
            cities: [],
            districts: [],
            wards: [],
            pageCount: 0,
            diaChi:[],
            files:null,
            result:'No QR code scanned yet',
            isQRReaderOn: false,
            taiKhoanAdd: {
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            },
            nguoiDungAdd: {
                cccd: '',
                ten: '',
                ngaySinh: '',
                gioiTinh: '',
                diaChiCuThe:'' ,
                xaPhuongThiTran: '',
                quanHuyen: '',
                tinhThanhPho: '',
                sdt: '',
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
                files:'',
                diaChiCuThe: '',
                tinhThanhPho: '',
                quanHuyen: '',
                xaPhuongThiTran: '',
            },
        }
        this.myRef = React.createRef();
        this.add = this.add.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiDiaChiAdd = this.thayDoiDiaChiAdd.bind(this);
        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);
        this.thayDoiGioiTinhAdd = this.thayDoiGioiTinhAdd.bind(this);
        this.thayDoiPassAdd = this.thayDoiPassAdd.bind(this);
        this.thayDoiNGaySinhAdd = this.thayDoiNGaySinhAdd.bind(this);
        this.thayDoiMaNVAdd = this.thayDoiMaNVAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiCCCDAdd = this.thayDoiCCCDAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
        this.thayDoiTinhAdd = this.thayDoiTinhAdd.bind(this);
        this.thayDoiHuyenAdd = this.thayDoiHuyenAdd.bind(this);
        this.thayDoiXaAdd = this.thayDoiXaAdd.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }
    toggleQRReader = () => {
        // Toggle the QR code reader state
        this.setState((prevState) => ({
            isQRReaderOn: !prevState.isQRReaderOn,
        }), () => {
            // Start or stop the QR code scanning based on the new state
            if (this.myRef.current) {
                if (this.state.isQRReaderOn) {
                    this.myRef.current.start();
                } else {
                    this.myRef.current.stop();
                }
            }
        });
    }
    handleScan = (data) => {
        if (data && data.text) {
            const dataArray = data.text.split('|');
            const cccd = dataArray[0];
            const ten = dataArray[2];
            const ngaySinhOriginal = dataArray[3];
            const gioiTinhOriginal = dataArray[4];
            const ngaySinh = this.convertToFormattedDate(ngaySinhOriginal);
            const gioiTinh = gioiTinhOriginal === 'Nam' ? 0 : gioiTinhOriginal === 'Nữ' ? 1 : null;

            this.setState({
                nguoiDungAdd: {  // Change 'result' to 'nguoiDungAdd'
                    cccd,
                    ten,
                    ngaySinh,
                    gioiTinh,
                },
                isScanned: true,
            });
        }
    };

    convertToFormattedDate = (dateString) => {
        const day = dateString.slice(0, 2);
        const month = dateString.slice(2, 4);
        const year = dateString.slice(4, 8);
        return `${year}-${month}-${day}`;
    };

    handleError = (error) => {
        console.error(error);
        // Handle error as needed
    };
    componentDidMount() {
        taikhoanservice.getNhanVien().then((res) => {
            this.setState({nhanVienQuyen1: res.data});
        });
        this.fetchCities();
        // const id = this.props.match.params.id;
        // if (id) {
        //     taikhoanservice.getTaiKhoanById()(this.state.taiKhoanUpdate.id).then((res) => {
        //         this.setState({taiKhoanUpdate: res.data});
        //     })
        // }


    }
    sendEmail = (recipientEmail) => {
        const emailData = {
            to: recipientEmail,
            subject: 'Subject of the email',
            text: 'Body of the email',
        };

        axios.post('http://localhost:3000/tai_khoan/addNhanVien', emailData)
            .then(response => {
                console.log('Email sent successfully:', response.data);
                // Handle success, e.g., show a success message to the user
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Handle error, e.g., show an error message to the user
            });
    };

    add = (e) => {
        e.preventDefault();

        let listFile = [];

        if (!this.state.files || this.state.files.length === 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, files: "Chọn ít nhất 1 ảnh!" } });
            return;
        } else {
            // Reset error message if files are selected
            this.setState({ errorAdd: { ...this.state.errorAdd, files: "" } });
        }
        for (let i = 0; i < this.state.files.length; i++) {
            listFile.push(this.state.files[i].name);
        }

        const {taiKhoanAdd, nguoiDungAdd} = this.state;
        const requestData = {
            taiKhoan: {
                email : taiKhoanAdd.email,
            },
            thongTinNguoiDung: {
                ten: nguoiDungAdd.ten,
                cccd: nguoiDungAdd.cccd,
                sdt: nguoiDungAdd.sdt,
                gioiTinh: nguoiDungAdd.gioiTinh,
                ngaySinh: nguoiDungAdd.ngaySinh,
            },
            files: listFile,
            diaChiCuThe: nguoiDungAdd.diaChiCuThe,
            tinhThanhPho: this.state.tinhThanhPho,
            quanHuyen: this.state.quanHuyen,
            xaPhuongThiTran: this.state.xaPhuongThiTran,

        };
        console.log('nsx' + JSON.stringify(requestData));

        if (listFile.length === 0) {
            this.setState({error: {...this.state.errorAdd, files: "Chọn ít nhất 1 ảnh !"}});
            console.log('nsx' + JSON.stringify(requestData));
            return;
        } else {
            this.setState({ error: { ...this.state.errorAdd, files: "" } });
        }

        // Kiểm tra không được để trống
        if (!nguoiDungAdd.cccd.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD không được bỏ trống!" } });
            return;
        } else if (!/^\d+$/.test(nguoiDungAdd.cccd)) {
            // Kiểm tra là số nguyên
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải là số nguyên và không được chứa khoảng trắng !" } });
            return;
        } else if (nguoiDungAdd.cccd.length !== 12) {
            // Kiểm tra có đủ 12 số
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải có đủ 12 số!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.cccd === nguoiDungAdd.cccd)) {
            // Kiểm tra trùng căn cước
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "" } });
        }


        //check ten
        if (!nguoiDungAdd.ten.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên không được bỏ trống!" } });
            return;
        } else if (!/^[\p{L}\s]+$/u.test(nguoiDungAdd.ten)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên chỉ được chứa chữ cái và không có kí tự đặc biệt!" } });
            return;
            // } else if (/\s/.test(nguoiDungAdd.ten)) {
            //     this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên không được chứa khoảng trắng!" } });
            //     return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        }

        //check ngaySinh
        const inputDate = new Date(nguoiDungAdd.ngaySinh.trim());
        const currentDate = new Date();

        if (!nguoiDungAdd.ngaySinh.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "Ngày sinh không được bỏ trống!" } });
            return;
        } else if (inputDate > currentDate) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "Không được lấy ngày sinh trong tương lai!" } });
            return;
        } else if (inputDate.toDateString() === currentDate.toDateString()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "Ngày sinh không được lấy ngày hiện tại!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ngaySinh: "" } });
        }
        // check gioiTinh
        if (nguoiDungAdd.gioiTinh === null || nguoiDungAdd.gioiTinh === undefined || nguoiDungAdd.gioiTinh === "") {
            this.setState({ errorAdd: { ...this.state.errorAdd, gioiTinh: "Giới tính không được bỏ trống !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, gioiTinh: "" } });
        }
        // check thanhPho
        if (!this.state.tinhThanhPho.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, tinhThanhPho: "Tỉnh/Thành phố không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, tinhThanhPho: "" } });
        }
        // check quanHuyen
        if (!this.state.quanHuyen.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, quanHuyen: "Quận/Huyện không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, quanHuyen: "" } });
        }
        // check xaPhuongThiTran
        if (!this.state.xaPhuongThiTran.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, xaPhuongThiTran: "Xã/Phường/Thị trấn không được bỏ trống!" } });
            return;
        } else {
            this.setState({errorAdd: {...this.state.errorAdd, xaPhuongThiTran: ""}});
        }
        // check diaChiCuThe
        if (!nguoiDungAdd.diaChiCuThe.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, diaChiCuThe: "Địa chỉ cụ thể không được bỏ trống !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, diaChiCuThe: "" } });
        }
        // check sdt
        const sdtRegex = /^[0-9]{10}$/; // Regex for 10 digits

        if (!nguoiDungAdd.sdt.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT không được bỏ trống!" } });
            return;
        } else if (!sdtRegex.test(nguoiDungAdd.sdt.trim())) {
            this.setState({
                errorAdd: {
                    ...this.state.errorAdd,
                    sdt: "SDT phải là số nguyên, không có kí tự đặc biệt và phải có 10 chữ số!"
                }
            });
            return;
        } else if (/\s/.test(nguoiDungAdd.sdt.trim())) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT không được chứa khoảng trắng!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.sdt === nguoiDungAdd.sdt)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "" } });
        }

        const isDuplicateEmail = this.state.nhanVienQuyen1.some(user =>
            user.taiKhoan && user.taiKhoan.email.toLowerCase() === taiKhoanAdd.email.toLowerCase()
        );
        if (!taiKhoanAdd || !taiKhoanAdd.email || !taiKhoanAdd.email.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không được bỏ trống!" } });
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(taiKhoanAdd.email)) {
            // Check if email is in correct format
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Địa chỉ email không đúng định dạng!" } });
            return;
        } else if (/\s/.test(taiKhoanAdd.email)) {
            // Check if email contains whitespace
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không được chứa khoảng trắng!" } });
            return;
        } else if (isDuplicateEmail) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "" } });
        }


        console.log(requestData);
        // Gọi API để thêm tài khoản
        const confirmed = window.confirm('Bạn có chắc chắn muốn Thêm nhân viên ?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        taikhoanservice.addNhanVien(requestData)
            .then((res) => {
                if (res.status === 200) {
                    // Xử lý khi thêm thành công
                    let taiKhoanMoi = res.data.taiKhoan;
                    let nguoiDungMoi = res.data.thongTinNguoiDung;
                    let diaChiMoi = res.data.diaChi;

                    this.setState((prevState) => ({
                        nhanVienQuyen1: [...prevState.nhanVienQuyen1, taiKhoanMoi],
                        thongTinNguoiDung: [...prevState.thongTinNguoiDung, nguoiDungMoi],
                        diaChi: [...prevState.diaChi, diaChiMoi],
                    }));

                    this.sendEmail(
                        taiKhoanAdd.email,
                        "Welcome to Our Company",
                        "Dear " + nguoiDungAdd.ten +
                        ",\n\nWelcome to our company! Your account has been successfully created."
                    );

                    setTimeout(() => {
                        window.location.href = (`/nhanvien`);
                    }, 1000);
                    toast.success("Thêm thành công!");
                    this.handleAddSuccess(res.data);

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
    handleAddSuccess = (responseData) => {
        // Fetch the updated list of employees from the server
        taikhoanservice.getNhanVien(this.state.currentPage)
            .then(response => {
                this.setState((prevState) => {
                    // Add the new employee information to the top of the list
                    const updatedNhanVien = [responseData.taiKhoan, ...prevState.nhanVienQuyen1];
                    const updatedThongTinNguoiDung = [responseData.thongTinNguoiDung, ...prevState.thongTinNguoiDung];
                    const updatedDiaChi = [responseData.diaChi, ...prevState.diaChi];

                    return {
                        nhanVienQuyen1: updatedNhanVien,
                        thongTinNguoiDung: updatedThongTinNguoiDung,
                        diaChi: updatedDiaChi,
                        pageCount: response.data.totalPages,
                    };
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    detail(id) {
        window.location.href = (`/nhanviendetail/${id}`);
    }

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
        // Allow manual selection of radio buttons even after scanning
        const gioiTinh = parseInt(event.target.value, 10);

        this.setState((prevState) => ({
            nguoiDungAdd: {
                ...prevState.nguoiDungAdd,
                gioiTinh,
            },
            isScanned: false, // Reset the flag when manually changing the radio buttons
        }));
        let errorAdd = {...this.state.errorAdd, gioiTinh: ""};
        this.setState({errorAdd: errorAdd});
    };
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


    thayDoiMaNVAdd = (event) => {
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
    thayDoiPassAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    password: event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd, password: ""};
        this.setState({errorAdd: errorAdd});
    }
    thayDoiAnhAdd = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Use URL.createObjectURL to set image URL
            const imageUrl = URL.createObjectURL(file);

            this.setState((prevState) => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    anh: imageUrl,
                },
                files: [file],
            }));
        }
        this.setState({ files: [ ...event.target.files] })
        let errorAdd = { ...this.state.errorAdd, anh: "" };
        this.setState({ errorAdd: errorAdd });
    };


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
        let errorAdd = {...this.state.errorAdd, tinhThanhPho: ""};
        this.setState({errorAdd: errorAdd});
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
        let errorAdd = {...this.state.errorAdd, quanHuyen: ""};
        this.setState({errorAdd: errorAdd});
    }

    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState({ xaPhuongThiTran: selectedWardName });
        let errorAdd = {...this.state.errorAdd, xaPhuongThiTran: ""};
        this.setState({errorAdd: errorAdd});
    }

    render() {
        const { isQRReaderOn, result , nguoiDungAdd } = this.state;
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
                                    <form onSubmit={this.add}>
                                        <div className="form-group">
                                            <label>Quét mã QR :</label>
                                            <div>
                                                {this.state.isQRReaderOn && (
                                                    <QrScanner
                                                        ref={this.myRef}
                                                        onScan={this.handleScan}
                                                        onError={this.handleError}
                                                        style={{ width: '300px', height: '300px' }}
                                                    />
                                                )}

                                                {/* Container for button text and QR code image */}
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {/* Nút để bật/tắt quét QR */}
                                                    <button
                                                        onClick={this.toggleQRReader}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            padding: '10px 10px',
                                                            fontSize: '16px',
                                                            backgroundColor: '#FFC0CB', /* Light Pink color */
                                                            border: 'none',
                                                            color: 'white',
                                                            borderRadius: '5px',
                                                            cursor: 'pointer',
                                                            margin: '10px 0',
                                                        }}
                                                    >
                                                        {this.state.isQRReaderOn} {/* Text */}
                                                        <img
                                                            src="/niceadmin/img/QR.png"
                                                            alt="QR Code"
                                                            style={{
                                                                width: '30px', // Adjust the size as needed
                                                                height: '30px',
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="avatar-label" htmlFor="anh">
                                                <input
                                                    type="file"
                                                    id="anh"
                                                    accept="image/*"
                                                    onChange={this.thayDoiAnhAdd}
                                                    className="file-input"
                                                />
                                                <div className="avatar-preview">
                                                    {this.state.taiKhoanAdd.anh ? (
                                                        <img
                                                            src={this.state.taiKhoanAdd.anh}
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
                                            {this.state.errorAdd.files && (
                                                <div className="invalid-feedback">{this.state.errorAdd.files}</div>
                                            )}
                                        </div>


                                        {/* CCCD */}
                                        <div className="form-group">
                                            <label htmlFor="cccd">CCCD:<span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorAdd.cccd ? 'is-invalid' : ''}`}
                                                id="cccd"
                                                onChange={this.thayDoiCCCDAdd}
                                                value={this.state.nguoiDungAdd.cccd }
                                            />
                                            {this.state.errorAdd.cccd && <div className="invalid-feedback">{this.state.errorAdd.cccd}</div>}
                                        </div>
                                        {/* Họ và tên */}
                                        <div className="form-group">
                                            <label htmlFor="ten">Họ và tên: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`}
                                                id="ten"
                                                value={this.state.nguoiDungAdd.ten}
                                                onChange={this.thayDoiTenAdd}
                                            />
                                            {this.state.errorAdd.ten && <div className="invalid-feedback">{this.state.errorAdd.ten}</div>}
                                        </div>
                                        {/* Ngày Sinh */}
                                        <div className="form-group">
                                            <label htmlFor="ngaySinh">Ngày Sinh: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="date"
                                                className={`form-control ${this.state.errorAdd.ngaySinh ? 'is-invalid' : ''}`}
                                                id="ngaySinh"
                                                value={this.state.nguoiDungAdd.ngaySinh}
                                                onChange={this.thayDoiNGaySinhAdd}
                                            />
                                            {this.state.errorAdd.ngaySinh && <div className="invalid-feedback">{this.state.errorAdd.ngaySinh}</div>}
                                        </div>
                                        {/* Giới tính */}
                                        <div className="form-group">
                                            <label>Giới tính: <span style={{ color: 'red' }}>*</span></label>
                                            <div>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        name="gioiTinh"
                                                        value="0"
                                                        checked={(this.state.isScanned && this.state.nguoiDungAdd.gioiTinh === 0) || (!this.state.isScanned && this.state.nguoiDungAdd.gioiTinh === 0)}
                                                        onChange={this.thayDoiGioiTinhAdd}
                                                    /> Nam
                                                </label>
                                                <label className="form-check-label">
                                                    <input
                                                        type="radio"
                                                        name="gioiTinh"
                                                        value="1"
                                                        checked={(this.state.isScanned && this.state.nguoiDungAdd.gioiTinh === 1) || (!this.state.isScanned && this.state.nguoiDungAdd.gioiTinh === 1)}
                                                        onChange={this.thayDoiGioiTinhAdd}
                                                        style={{ marginLeft : '10px' }}
                                                    /> Nữ
                                                </label>
                                            </div>
                                            {this.state.errorAdd.gioiTinh && (
                                                <div className="text-danger">{this.state.errorAdd.gioiTinh}</div>
                                            )}
                                        </div>
                                        {/* Địa chỉ */}
                                        <div className="form-group">
                                            <label>Địa chỉ: <span style={{ color: 'red' }}>*</span></label>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <select
                                                        className="form-control"
                                                        name="tinhThanhPho"
                                                        onChange={(event) => this.handleCityChange(event)}
                                                    >
                                                        <option value="">Chọn tỉnh thành</option>
                                                        {this.state.cities.map(city => (
                                                            <option key={city.code} value={city.name}>
                                                                {city.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorAdd.tinhThanhPho && (
                                                        <div className="text-danger">{this.state.errorAdd.tinhThanhPho}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-4">
                                                    <select
                                                        className="form-control"
                                                        name="quanHuyen"
                                                        onChange={(event) => this.handleDistrictChange(event)}
                                                    >
                                                        <option value="">Chọn quận huyện</option>
                                                        {this.state.districts.map(district => (
                                                            <option key={district.code} value={district.name}>
                                                                {district.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorAdd.quanHuyen && (
                                                        <div className="text-danger">{this.state.errorAdd.quanHuyen}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-4">
                                                    <select
                                                        className="form-control"
                                                        name="xaPhuongThiTran"
                                                        onChange={(event) => this.handleWardChange(event)}
                                                    >
                                                        <option value="">Chọn phường xã</option>
                                                        {this.state.wards.map(ward => (
                                                            <option key={ward.code} value={ward.name}>
                                                                {ward.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorAdd.xaPhuongThiTran && (
                                                        <div className="text-danger">{this.state.errorAdd.xaPhuongThiTran}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Số nhà/Thôn */}
                                        <div className="form-group">
                                            <label htmlFor="diaChiCuThe">Địa chỉ cụ thể : <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorAdd.diaChiCuThe ? 'is-invalid' : ''}`}
                                                id="diaChiCuThe"
                                                onChange={this.thayDoiDiaChiAdd}
                                            />
                                            {this.state.errorAdd.diaChiCuThe && <div className="invalid-feedback">{this.state.errorAdd.diaChiCuThe}</div>}
                                        </div>



                                        {/* SDT */}
                                        <div className="form-group">
                                            <label htmlFor="sdt">SDT: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className={`form-control ${this.state.errorAdd.sdt ? 'is-invalid' : ''}`}
                                                id="sdt"
                                                onChange={this.thayDoiSdtAdd}
                                                value={this.state.nguoiDungAdd.sdt}
                                            />
                                            {this.state.errorAdd.sdt && <div className="invalid-feedback">{this.state.errorAdd.sdt}</div>}
                                        </div>

                                        {/* Email */}
                                        <div className="form-group">
                                            <label htmlFor="email">Email: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="email"
                                                className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`}
                                                id="email"
                                                value={this.state.taiKhoanAdd.email}
                                                onChange={this.thayDoiEmailAdd}
                                            />
                                            {this.state.errorAdd.email && <div className="invalid-feedback">{this.state.errorAdd.email}</div>}
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} />

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

export default TaiKhoanNVComponent