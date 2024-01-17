import React, { Component } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import { Modal, Button } from 'react-bootstrap';
import OrderStatus from './OrderStatus';
import Select from 'react-select';
// import { tichDiemDaCoTaiKhoan, tichDiemMoi } from "../tichdiemcomponent/TichDiemService";
import 'font-awesome/css/font-awesome.min.css';
import './hoadonchitiet.css'
import BanHangService from '../../services/banhangservice/BanHangService';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"></link>
class HoaDonChiTietComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isButtonVisible: true,
            hoaDonChiTiet: [],
            hoaDonUpdate: {
                id: this.props.match.params.id,
                choXacNhan: '',
                ghiChuChoXacNhan: '',
                choGiao: '',
                ghiChuChoGiao: '',
                dangGiao: '',
                ghiChuDangGiao: '',
                hoanThanh: '',
                ghiChuHoanThanh: '',
                phiShip: '',
                taiKhoan: ''



            },
            selectedAddress: {
                diaChiCuThe: '',
                xaPhuongThiTran: '',
                quanHuyen: '',
                tinhThanhPho: '',
            },
            hoaDonUpdateDiaChi: {
                id: this.props.match.params.id,
                diaChiCuThe: '',
                xaPhuongThiTran: '',
                quanHuyen: '',
                tinhThanhPho: '',



            },
            provinces: [],
            districts: [],
            communes: [],
            hoaDonHuy: {
                id: this.props.match.params.id,
                ghiChuHuy: '',



            },
            diaChi: [],
            hoaDonId: {
                id: this.props.match.params.id,
                taiKhoanKhachHang: '',
            },
            validationErrors: {},
            hoaDon: {
                id: this.props.match.params.id,
                thanhToan: '',
                taiKhoan: '',

                trangThai: '',
            },
            sdt: '',
            diem: '',
            result: '',
            showModal: false,
            showModal1: false,
            showModal2: false,
            showModal3: false,
            trangThaiLabels: [
                'Chờ duyệt',
                'Duyệt',
                'Đóng gói',
                'Xuất kho',
                'Hoàn thành',
            ],
        };
        this.update = this.update.bind(this);
        this.thayDoiHDHuy = this.thayDoiHDHuy.bind(this);
        this.thayDoiMoTa = this.thayDoiMoTa.bind(this);
        this.thayDoiPhiShip = this.thayDoiPhiShip.bind(this);
        this.thayDoiDCCT = this.thayDoiDCCT.bind(this);
        this.thayDoiDCTinhThanh = this.thayDoiDCTinhThanh.bind(this);
        this.thayDoiHuyen = this.thayDoiHuyen(this);
        this.thayDoiXaPhuongThiTran = this.thayDoiXaPhuongThiTran(this);
    }
    getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Chờ xác nhận';
            case 2:
                return 'Xác nhận chờ giao';
            case 3:
                return 'Xác nhận đang giao';
            case 4:
                return 'Xác hoàn thành';
            default:
                return 'Không xác định'; // Default text (or another text of your choice)
        }

    }

    componentDidMount() {
        HoaDonChiTietService.detailHDCT(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDonChiTiet: res.data });
        });
        HoaDonService.getOneHD(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDon: res.data });
        });
    };
    handleAddress = (diaChiCuThe, xaPhuongThiTran, quanHuyen, tinhThanhPho) => {
        // Cập nhật trạng thái selectedAddress khi nút "chọn" được nhấn
        this.setState({
            selectedAddress: {
                diaChiCuThe,
                xaPhuongThiTran,
                quanHuyen,
                tinhThanhPho,
            },
        });

        // Cập nhật giá trị của các ô input
        document.getElementById('address-input').value = diaChiCuThe;
        document.getElementById('city-input').value = tinhThanhPho;
        document.getElementById('district-input').value = quanHuyen;
        document.getElementById('ward-input').value = xaPhuongThiTran;
    };

    handleShowModal3 = () => {
        this.setState({ showModal3: true });
    };
    handleCloseModal3 = () => {
        this.setState({ showModal3: false });
    };
    handleShowModal = () => {
        this.setState({ showModal: true });
    };
    handleShowModal1 = () => {
        this.setState({ showModal1: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    handleCloseModal1 = () => {
        this.setState({ showModal1: false });
    };
    handleShowModal2 = () => {
        BanHangService.getDC(this.state.hoaDon?.taiKhoanKhachHang.id).then((res) => {
            this.setState({ diaChi: res.data });
            console.log(res.data)
        });
        this.setState({ showModal2: true });
    };
    handleCloseModal2 = () => {
        this.setState({ showModal2: false });
    };

    handleTimTaiKhoan = async () => {
        // Code xử lý tìm kiếm tài khoản theo số điện thoại
        // Gọi API hoặc thực hiện tìm kiếm tại đây và cập nhật tài khoản ID
    };

    // handleTichDiemDaCoTaiKhoan = async () => {
    //     const message = await tichDiemDaCoTaiKhoan(this.state.sdt, this.state.diem);
    //     this.setState({ result: message });
    // };
    //
    // handleTichDiemMoi = async () => {
    //     const message = await tichDiemMoi(this.state.sdt, this.state.diem);
    //     this.setState({ result: message });
    // };

    getCircleColor(trangThai) {
        if (trangThai === 1) {
            return 'gray'; // Chờ duyệt
        } else if (trangThai === 4) {
            return 'green'; // Duyệt
        } else if (trangThai === 3) {
            return 'blue'; // Đóng gói
        } else if (trangThai === 3) {
            return 'orange'; // Xuất kho
        } else if (trangThai === 2) {
            return 'yellow'; // Hoàn thành
        } else {
            return '#555'; // Trạng thái mặc định
        }
    }

    getCircleBackgroundColor(trangThai) {
        if (trangThai === 0 || trangThai === 5) {
            return 'gray'; // Set background color to gray for trangThai 0 and 5
        } else if (trangThai === 1) {
            return 'green'; // Chờ xác nhận
        } else if (trangThai === 2) {
            return 'blue'; // Xác nhận chờ giao
        } else if (trangThai === 3) {
            return 'orange'; // Xác nhận đang giao
        } else if (trangThai === 4) {
            return 'yellow'; // Xác nhận hoàn thành
        } else {
            return '#e0e0e0'; // Màu mặc định
        }
    }
    getStatusUpdateKey = (status) => {
        switch (status) {
            case 0:
                return 'ghiChuChoXacNhan';
            case 1:
                return 'ghiChuChoGiao';
            case 2:
                return 'ghiChuDangGiao';
            case 3:
                return 'ghiChuHoanThanh';
            default:
                return ''; // Handle default case
        }
    };
    thayDoiPhiShip = (event) => {
        this.setState((prevState) => ({
            hoaDonUpdate: {
                ...prevState.hoaDonUpdate,
                phiShip: event.target.value,
            },
        }));
    };
    thayDoitaiKhoanNhanVienId = (event) => {
        this.setState((prevState) => ({
            hoaDonUpdate: {
                ...prevState.hoaDonUpdate,
                taiKhoanNhanVienId: event.target.value,
            },
        }));
    };
    thayDoiDCCT = (event) => {
        this.setState((prevState) => ({
            selectedAddress: {
                ...prevState.selectedAddress,
                diaChiCuThe: event.target.value,
            },
        }));
    };

    thayDoiDCTinhThanh = (event) => {
        this.setState((prevState) => ({
            selectedAddress: {
                ...prevState.selectedAddress,
                tinhThanhPho: event.target.value,
            },
        }));
    };

    thayDoiHuyen = (event) => {
        this.setState((prevState) => ({
            selectedAddress: {
                ...prevState.selectedAddress,
                quanHuyen: event.target.value,
            },
        }));
    };

    thayDoiXaPhuongThiTran = (event) => {
        this.setState((prevState) => ({
            selectedAddress: {
                ...prevState.selectedAddress,
                xaPhuongThiTran: event.target.value,
            },
        }));
    };

    thayDoiMoTa = (event) => {
        const trangThai = this.state.hoaDon.trangThai;
        const updateKey = this.getStatusUpdateKey(trangThai); // Fix the function call

        this.setState((prevState) => ({
            hoaDonUpdate: {
                ...prevState.hoaDonUpdate,
                [updateKey]: event.target.value,
            },
        }));
    };
    thayDoiHDHuy = (event) => {
        this.setState((prevState) => ({
            hoaDonHuy: {
                ...prevState.hoaDonHuy,
                ghiChuHuy: event.target.value,
            },
        }));
    };
    huyHD = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn hủy hóa đơn này không ?');
        if (!confirmed) {
            return;
        }
        const id = this.state.hoaDonId.id;

        const hoaDon = { ghiChuHuy: this.state.hoaDonHuy.ghiChuHuy };

        HoaDonService.huyHD(hoaDon, id)
            .then((res) => {
                // Xử lý phản hồi thành công

                window.location.href = `/HoaDonChiTiet/${this.state.hoaDonId.id}`;

            })
            .catch((error) => {
                // Xử lý lỗi
                console.error("Lỗi trong huyHD:", error);
                // Bạn cũng có thể hiển thị thông báo lỗi cho người dùng
            });
    };
    update = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn xác nhận' + `${this.state.hoaDon.trangThai === 0 ? '' : this.state.hoaDon.trangThai === 1 ? ' Chuẩn bị giao' : this.state.hoaDon?.trangThai === 2 ? 'Đang giao' : this.state.hoaDon?.trangThai === 3 ? 'Hoàn thành' : ""}`);
        if (!confirmed) {
            return;
        }

        const trangThai = this.state.hoaDon.trangThai;
        const updateKey = this.getStatusUpdateKey(trangThai);
        console.log(this.getUserNameFromLocalStorage() + "đây")
        const hoaDon = {
            [updateKey]: this.state.hoaDonUpdate[updateKey],
            phiShip: this.state.hoaDonUpdate.phiShip==""?this.state.hoaDon.phiShip:this.state.hoaDonUpdate.phiShip,
            taiKhoan: this.getUserNameFromLocalStorage(), // G t 
        };
        const id = this.state.hoaDonUpdate.id;

        HoaDonService.updateHoaDon(hoaDon, id).then((res) => {
            window.location.href = `/HoaDonChiTiet/${this.state.hoaDonId.id}`;
        });

        
    };
    FCInHD=(e) =>{
        e.preventDefault();
        const url = `http://localhost:8080/hoa_don/export/${this.state.hoaDonId.id}`;
        window.open(url, "_blank");
    };
    updateDC = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn sửa địa chỉ không ?');
        if (!confirmed) {
            return;
        }

        // Validate required fields
        const { diaChiCuThe, quanHuyen, tinhThanhPho, xaPhuongThiTran } = this.state.selectedAddress;
        let validationErrors = {};

        if (!diaChiCuThe) {
            validationErrors.diaChiCuThe = 'Vui lòng nhập địa chỉ cụ thể.';
        }

        if (!quanHuyen) {
            validationErrors.quanHuyen = 'Vui lòng nhập quận/huyện.';
        }

        if (!tinhThanhPho) {
            validationErrors.tinhThanhPho = 'Vui lòng nhập tỉnh/thành phố.';
        }

        if (!xaPhuongThiTran) {
            validationErrors.xaPhuongThiTran = 'Vui lòng nhập phường/xã/thị trấn.';
        }

        // Check if there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            // Update state with validation errors
            this.setState({ validationErrors });
            return;
        }

        // Clear previous validation errors
        this.setState({ validationErrors: {} });

        // Proceed with the update
        const hoaDon = {
            diaChiCuThe: diaChiCuThe,
            quanHuyen: quanHuyen,
            tinhThanhPho: tinhThanhPho,
            xaPhuongThiTran: xaPhuongThiTran,
        };

        // Perform the update using HoaDonService
        const id = this.state.hoaDonUpdateDiaChi.id;
        HoaDonService.updateHoaDonDC(id, hoaDon).then((res) => {
            console.log(this.state.selectedAddress.diaChiCuThe);
            window.location.href = `/HoaDonChiTiet/${this.state.hoaDonId.id}`;
        });
    };

    getUserNameFromLocalStorage() {
        try {
            const savedUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log(savedUser);
            return savedUser || {};
        } catch (error) {
            console.error('Error while retrieving user data from local storage:', error);
            return {};
        }
    }

    render() {
        let total = 0;
        const userId = this.getUserNameFromLocalStorage();
        let giam = 0;
        const isHoaDonDaHuy = this.state.hoaDon.trangThai === 5;
        const isHoaDonKoDcHuy = this.state.hoaDon.trangThai >= 3 || this.state.hoaDon.thanhToan.id ===3;
        const { validationErrors } = this.state;
        return (

            <div>
                <div className="pagetitle">
                    <div className="align-center">
                        <h1 style={{
                            textAlign: 'center',
                            fontSize: '24px',
                            marginBottom: '0',
                            fontWeight: '600',
                            color: '#012970'
                        }}>
                            
                        </h1>
                        <nav>
                            <ol className="breadcrumb"></ol>
                        </nav>
                    </div>
                    <h1>Hóa đơn</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Hóa đơn</li>
                        </ol>
                    </nav>
                </div>
             
                <OrderStatus currentStatus={this.state.hoaDon.trangThai} order={this.state.hoaDon} />
                <center> {this.state.hoaDon.trangThai === 5 ? <button type="button" class="btn btn-outline-danger" disabled>Lí do đơn hàng bị Hủy : {this.state.hoaDon.ghiChuHuy} </button> : ''}</center>
                <center> {this.state.hoaDon.thanhToan.id === 3 ? <button type="button" class="btn btn-outline-success" disabled> Đã thanh toán VNPay </button>: ''}</center>
                <center> {this.state.hoaDon.thanhToan.id === 2 ? <button type="button" class="btn btn-outline-success" disabled> Thanh toán khi nhận hàng  </button>: ''}</center>
                <center> {this.state.hoaDon.thanhToan.id === 1 ? <button type="button" class="btn btn-outline-success" disabled> Thanh toán VietQR </button>: ''}</center>
                <div>
                    <div style={{ maxWidth: '960px' }}>
                        <br />
                        <br />
                        <div>  <button
        className='btn btn-warning btn-lg' // Thêm lớp 'btn-lg' để làm nút lớn hơn
        onClick={this.FCInHD}
        style={{ borderRadius: '10px' }} // Thêm border-radius để làm cho góc nút cong
      >
        In đơn hàng
      </button>{this.state.hoaDon.trangThai === 6 || this.state.hoaDon.trangThai < 5 ? <Button
                            variant="btn btn-outline-primary"
                            onClick={this.handleShowModal1}
                            Visible
                            disabled={isHoaDonDaHuy || this.state.hoaDon.trangThai === 4 || this.state.hoaDon.trangThai === 6}
                            style={isHoaDonDaHuy ? { color: 'gray', borderColor: 'gray', cursor: 'not-allowed', visible: false } : this.state.hoaDon.trangThai === 4 ? { color: 'green', borderColor: 'green' } : this.state.hoaDon.trangThai === 6 ? { color: 'green', borderColor: 'green' } : {}}
                        >
                            {this.state.hoaDon.trangThai === 0 ? 'Xác nhận' : this.state.hoaDon.trangThai === 1 ? ' Xác nhận chuẩn bị giao' : this.state.hoaDon?.trangThai === 2 ? ' Xác nhận Đang giao' : this.state.hoaDon?.trangThai === 3 ? 'Xác nhận Hoàn thành' : this.state.hoaDon?.trangThai === 4 ? 'Đã hoàn thành' : this.state.hoaDon?.trangThai === 6 ? 'Đã hoàn thành bán tại quầy' : ''}
                        </Button> : ""}

                            <h1></h1>
                            <Button style={isHoaDonKoDcHuy ? { color: 'gray', borderColor: 'gray', cursor: 'not-allowed' } : {}} disabled={isHoaDonKoDcHuy} type="submit" value="huyHD" className="btn btn-outline-" onClick={this.handleShowModal3}> {this.state.hoaDon.trangThai === 5 ? 'Hóa đơn này đã hủy' : "Hủy hóa đơn"}</Button>
                            <Modal show={this.state.showModal1} onHide={this.handleCloseModal1} backdrop="static">
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.hoaDon.trangThai === 0 ? 'Xác nhận' : this.state.hoaDon.trangThai === 1 ? ' Xác nhận chuẩn bị giao' : this.state.hoaDon?.trangThai === 2 ? ' Xác nhận Đang giao' : this.state.hoaDon?.trangThai === 3 ? 'Xác nhận Hoàn thành' : ""}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="form-floating">

                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" onChange={this.thayDoiMoTa}></textarea>
                                        <label for="floatingTextarea2" >Mô tả</label>
                                        <br />
                                        <div class="input-group mb-3">
                                            {this.state.hoaDon.trangThai === 0 ? <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon1">Phí vận chuyển </span>
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder={this.state.hoaDon.phiShip}                        
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                    onChange={this.thayDoiPhiShip}
                                                />                                                <span class="input-group-text">VND</span>
                                            </div> : ''}


                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-dark me-2">Hủy</button>  <h1> </h1>
                                            <button type="submit" value="Update" className="btn btn-outline-primary" onClick={this.update}>Xác nhận</button>
                                        </div>
                                    </div>
                                    {this.popupContent}
                                </Modal.Body>
                            </Modal>
                            <Modal show={this.state.showModal3} onHide={this.handleCloseModal3} backdrop="static">
                                <Modal.Header closeButton>
                                    <Modal.Title>Ghi chú hủy</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" onChange={this.thayDoiHDHuy}></textarea>
                                        <label for="floatingTextarea2" >Mô tả</label>
                                        <br />
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-dark me-2">Hủy</button>  <h1> </h1>
                                            <button type="submit" value="Update" className="btn btn-outline-primary" onClick={this.huyHD}>Xác nhận</button>
                                        </div>
                                    </div>
                                    {this.popupContent}
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
                <br />

                <center>{this.state.hoaDon.kieuHoaDon === 0 || 1 ? <button type="button" style={isHoaDonKoDcHuy ? { color: 'red', borderColor: 'red', cursor: 'not-allowed' } : {}} disabled={isHoaDonKoDcHuy} class="btn btn-outline-danger" onClick={this.handleShowModal2} >Thôn tin giao hàng :  {this.state.hoaDon.ten}( {this.state.hoaDon.sdt}) |{this.state.hoaDon.diaChiCuThe} - {this.state.hoaDon.xaPhuongThiTran} - {this.state.hoaDon.quanHuyen} - {this.state.hoaDon.tinhThanhPho}</button> : ""}</center>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">

                                            <h5 className="card-title">Thông tin sản phẩm<span>| </span></h5>
                                            <div>
                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Số Lượng</th>
                                                            <th>Ảnh</th>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Đơn giá</th>
                                                            <th>Thành tiền</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.hoaDonChiTiet.map((hoaDonChiTiet, index) => {
                                                            total += hoaDonChiTiet.sanPhamChiTiet.donGia * hoaDonChiTiet.soLuong;


                                                            return (
                                                                <tr key={hoaDonChiTiet.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{hoaDonChiTiet.soLuong}</td>
                                                                    <td>
                                                                        <img
                                                                            src={`/niceadmin/img/${hoaDonChiTiet.sanPhamChiTiet.sanPham.anh}`}
                                                                            style={{ width: '50px', height: '50px' }}
                                                                        />
                                                                    </td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}</td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.donGia.toLocaleString()} VNĐ</td>
                                                                    <td>{(hoaDonChiTiet.sanPhamChiTiet.donGia * hoaDonChiTiet.soLuong).toLocaleString()} VNĐ</td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                                <div className='row'>
                                                    <div className="text-right col-12">
                                                        <table class="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col"></th>
                                                                    <th scope="col"></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">Tổng tiền hàng</th>
                                                                    <td><label color='red' className="text-right "><s>{total.toLocaleString()} VNĐ</s></label></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Voucher từ Shop</th>
                                                                    <td className="text-left col-4">- {this.state.hoaDon?.tienGiam?.toLocaleString()}đ (Giảm {this.state.hoaDon?.khuyenMai?.giamGia} {this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 1 ? "%" : this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 0 ? "VND" : ""})</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Tổng tiền sau giảm</th>
                                                                    <td className="text-left col-4">{this.state.hoaDon?.tongTienSauGiam?.toLocaleString()} VNĐ </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Phi vận chuyển</th>
                                                                    <td>
                                                                        <p style={{ color: 'red', fontSize: '14px' }}>
                                                                            {this.state.hoaDon.phiShip} VNĐ
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Thành tiền</th>
                                                                    <td>
                                                                        <p style={{ color: 'red', fontSize: '24px' }}>
                                                                            {(this.state.hoaDon.tongTienSauGiam + this.state.hoaDon.phiShip).toLocaleString()} VNĐ
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div><div className='col-5'></div></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Thông tin <span>| xx</span></h5>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                aria-selected="true">Người tạo
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile" type of="button" role="tab"
                                                aria-controls="profile"
                                                aria-selected="false">{this.state.hoaDon.taiKhoanKhachHang != null ? "Khách Hàng" : "Khách lẻ"}
                                            </button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div>
                                                <h10 className="nav-link">
                                                    Người bán : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}
                                                </h10>
                                                <h10 className="nav-link">
                                                    Ngày bán : {this.state.hoaDon?.taiKhoan?.ngayTao}</h10>
                                                <h10 className="nav-link">
                                                    Ghi chú : {this.state.hoaDon?.ghiChu}</h10>
                                                <div>
                                                    <Button variant="btn btn-outline-primary" onClick={this.handleShowModal}>
                                                        Thông tin chi tiết
                                                    </Button>
                                                    <Modal show={this.state.showModal} onHide={this.handleCloseModal} backdrop="static">
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Thông tin nhân viên</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <h10 className="nav-link">
                                                                Avatar
                                                            </h10>
                                                            <img
                                                                src={`/niceadmin/img/${this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.anh}`}
                                                                style={{ width: '55px', height: '70px' }}
                                                            />
                                                            <h10 className="nav-link">
                                                                Tên : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}</h10>
                                                            <h10 className="nav-link">
                                                                Địa chỉ : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.diaChi}</h10>
                                                            <h10 className="nav-link">
                                                                Số điện thoại : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.sdt}</h10>
                                                            <h10 className="nav-link">
                                                                Ngày sinh : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ngaySinh}</h10>
                                                            <h10 className="nav-link">
                                                                Giới tính :  {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.gioiTinh === 1 ? "Nữ" : "Nam"}</h10>
                                                            {this.popupContent}
                                                        </Modal.Body>
                                                    </Modal>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel"
                                            aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    <h10 className="nav-link">
                                                        Người mua: {this.state.hoaDon.ten ? this.state.hoaDon.ten : "Khách lẻ"} </h10>
                                                    <h10 className="nav-link">
                                                        Số điện thoại:{this.state.hoaDon.ten ? this.state.hoaDon.sdt : "Khách lẻ"}</h10>
                                                    <h10 className="nav-link">
                                                        Email: {this.state.hoaDon.email ? this.state.hoaDon.email : "Khách lẻ"}</h10>
                                                    <div>
                                                        {this.state.hoaDon.taiKhoanKhachHang != null ? <Button variant="btn btn-outline-primary" onClick={this.handleShowModal2} >
                                                            Danh sách địa chỉ
                                                        </Button> : ''}

                                                        <Modal show={this.state.showModal2} onHide={this.handleCloseModal2} backdrop="static">
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Thông tin nhân viên</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <div>
                                                                    {/* ... Các ô input và bảng */}
                                                                    <div class="input-group mb-3">
                                                                        <label for="address-input" class="input-group-text" id="address-addon">
                                                                            Địa chỉ cụ thể <span style={{ color: 'red' }}>*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${validationErrors.diaChiCuThe ? 'is-invalid' : ''}`}
                                                                            id="address-input"
                                                                            placeholder="Địa chỉ cụ thể"
                                                                            aria-label="Địa chỉ cụ thể"
                                                                            aria-describedby="address-addon"
                                                                            onChange={this.thayDoiDCCT}
                                                                            required
                                                                        /> {validationErrors.diaChiCuThe && (
                                                                            <span className="invalid-feedback">{validationErrors.diaChiCuThe}</span>
                                                                        )}
                                                                    </div>

                                                                    <div class="input-group mb-3">
                                                                        <label for="city-input" class="input-group-text" id="city-addon">
                                                                            Tỉnh thành phố <span style={{ color: 'red' }}>*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${validationErrors.tinhThanhPho ? 'is-invalid' : ''}`}
                                                                            id="city-input"
                                                                            placeholder="Thành phố"
                                                                            aria-label="Thành phố"
                                                                            aria-describedby="city-addon"
                                                                            onChange={this.thayDoiDCTinhThanh}
                                                                            required
                                                                        /> {validationErrors.tinhThanhPho && (
                                                                            <span className="invalid-feedback">{validationErrors.tinhThanhPho}</span>
                                                                        )}
                                                                    </div>

                                                                    <div class="input-group mb-3">
                                                                        <label for="district-input" class="input-group-text" id="district-addon">
                                                                            Quận Huyện <span style={{ color: 'red' }}>*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${validationErrors.quanHuyen ? 'is-invalid' : ''}`}
                                                                            id="district-input"
                                                                            placeholder="Huyện"
                                                                            aria-label="Huyện"
                                                                            aria-describedby="district-addon"
                                                                            onChange={this.thayDoiHuyen}
                                                                            required
                                                                        />
                                                                        {validationErrors.quanHuyen && (
                                                                            <span className="invalid-feedback">{validationErrors.quanHuyen}</span>
                                                                        )}
                                                                    </div>

                                                                    <div class="input-group mb-3">
                                                                        <label for="ward-input" class="input-group-text" id="ward-addon">
                                                                            Phường xã <span style={{ color: 'red' }}>*</span>
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className={`form-control ${validationErrors.xaPhuongThiTran ? 'is-invalid' : ''}`}
                                                                            id="ward-input"
                                                                            placeholder="Xã"
                                                                            aria-label="Xã"
                                                                            aria-describedby="ward-addon"
                                                                            onChange={this.thayDoiXaPhuongThiTran}
                                                                            required
                                                                        />
                                                                        {validationErrors.xaPhuongThiTran && (
                                                                            <span className="invalid-feedback">{validationErrors.xaPhuongThiTran}</span>
                                                                        )}
                                                                    </div>
                                                                    <button type="button" class="btn btn-outline-warning" onClick={this.updateDC}>Cập nhật điạ chỉ cho đơn hàng</button>
                                                                </div>
                                                                <br />
                                                                <table className="table table-borderless datatable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>STT</th>
                                                                            <th>Tên người nhận</th>
                                                                            <th>Số điện thoại</th>
                                                                            <th>Địa chỉ</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {
                                                                            this.state.diaChi.map(
                                                                                (diaChi, index) => {
                                                                                    return (
                                                                                        <tr key={diaChi.id}>
                                                                                            <td>{index + 1}</td>
                                                                                            <td>{diaChi.ten}</td>

                                                                                            <td>{diaChi.sdt}</td>
                                                                                            <td>{diaChi.diaChiCuThe}, {diaChi.xaPhuongThiTran}, {diaChi.quanHuyen},{diaChi.tinhThanhPho}</td>
                                                                                            <td><button
                                                                                                onClick={() => this.handleAddress(diaChi.diaChiCuThe, diaChi.xaPhuongThiTran, diaChi.quanHuyen, diaChi.tinhThanhPho)} className="btn btn-outline-info">chọn</button></td>
                                                                                        </tr>
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="contact" role="presentation"
                                            aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    <h10 className="nav-link">
                                                        Người mua: {this.state.hoaDon?.ten}</h10>
                                                    <h10 className="nav-link">
                                                        Địa chỉ: {this.state.hoaDon?.phuongXa}, {this.state.hoaDon?.quanHuyen}, {this.state.hoaDon?.thanhPho}</h10>
                                                    <h10 className="nav-link">
                                                        Số điện thoại: {this.state.hoaDon?.sdt}</h10>
                                                    <h10 className="nav-link">
                                                        Email:{this.state.hoaDon && this.state.hoaDon.email !== null ? this.state.hoaDon.email : "--+--"}</h10>

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div >

                </section >
                <div>

                </div>
            </div >
        );
    }
}

export default HoaDonChiTietComponents;
