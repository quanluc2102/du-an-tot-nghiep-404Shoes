import React, {Component} from 'react';
import HoaDonChiTietService from './hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from './hoadonservice/HoaDonService';
import {Modal, Button} from 'react-bootstrap';
import OrderStatus from './OrderStatus';
import Select from 'react-select';
// import { tichDiemDaCoTaiKhoan, tichDiemMoi } from "../tichdiemcomponent/TichDiemService";
import 'font-awesome/css/font-awesome.min.css';
import './hoadonchitiet.css'
import BanHangService from './BanHangService';

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
            this.setState({hoaDonChiTiet: res.data});
        });
        HoaDonService.getOneHD(this.state.hoaDonId.id).then((res) => {
            this.setState({hoaDon: res.data});
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
        this.setState({showModal3: true});
    };
    handleCloseModal3 = () => {
        this.setState({showModal3: false});
    };
    handleShowModal = () => {
        this.setState({showModal: true});
    };
    handleShowModal1 = () => {
        this.setState({showModal1: true});
    };

    handleCloseModal = () => {
        this.setState({showModal: false});
    };
    handleCloseModal1 = () => {
        this.setState({showModal1: false});
    };
    handleShowModal2 = () => {
        BanHangService.getDC(this.state.hoaDon?.taiKhoanKhachHang.id).then((res) => {
            this.setState({diaChi: res.data});
            console.log(res.data)
        });
        this.setState({showModal2: true});
    };
    handleCloseModal2 = () => {
        this.setState({showModal2: false});
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

        const hoaDon = {ghiChuHuy: this.state.hoaDonHuy.ghiChuHuy};

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
        const updateKey = this.getStatusUpdateKey(trangThai); // Use 'this' to reference the method

        const hoaDon = {
            [updateKey]: this.state.hoaDonUpdate[updateKey],
            phiShip: this.state.hoaDonUpdate.phiShip
        };
        const id = this.state.hoaDonUpdate.id;

        HoaDonService.updateHoaDon(hoaDon, id).then((res) => {
            window.location.href = `/HoaDonChiTiet/${this.state.hoaDonId.id}`;
        });
    };
    updateDC = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn sửa địa chỉ không ?');
        if (!confirmed) {
            return;
        }

        // Validate required fields
        const {diaChiCuThe, quanHuyen, tinhThanhPho, xaPhuongThiTran} = this.state.selectedAddress;
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
            this.setState({validationErrors});
            return;
        }

        // Clear previous validation errors
        this.setState({validationErrors: {}});

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

    detail = (id) => {
        this.props.history.push(`/billdetail/${id}`)

    };

    back = () => {
        this.props.history.push("/tracuudonhang")
    };


    render() {
        let total = 0;
        let giam = 0;
        const {provinces, districts, communes} = this.state;
        const isHoaDonDaHuy = this.state.hoaDon.trangThai === 5;
        const isHoaDonKoDcHuy = this.state.hoaDon.trangThai >= 3;
        const {validationErrors} = this.state;
        return (

            <div className="account-container">
                <div className="account-container">
                    <div className="account-dropdown-container">
                        <button className="account-dropdown-container-button" onClick={() => this.back()}>
                            <svg enable-background="new 0 0 11 11" viewBox="0 0 11 11" x="0" y="0"
                                 className="account-dropdown-container-svg">
                                <g>
                                    <path
                                        d="m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z"></path>
                                </g>
                            </svg>
                            <span>TRỞ LẠI</span>
                        </button>
                    </div>
                </div>
                <div>
                    <OrderStatus currentStatus={this.state.hoaDon.trangThai} order={this.state.hoaDon}/>
                    <center> {this.state.hoaDon.trangThai === 5 ?
                        <button type="button" class="btn btn-outline-danger" disabled>Lí do đơn hàng bị Hủy
                            : {this.state.hoaDon.ghiChuHuy} </button> : ''}</center>
                    <div>

                    </div>
                    <br/>

                    <center>{this.state.hoaDon.kieuHoaDon === 0 ? <button type="button" style={isHoaDonKoDcHuy ? {
                        color: 'red',
                        borderColor: 'red',
                        cursor: 'not-allowed'
                    } : {}} disabled={isHoaDonKoDcHuy} class="btn btn-outline-danger"
                                                                          onClick={this.handleShowModal2}>Thôn tin giao
                        hàng : {this.state.hoaDon.ten}( {this.state.hoaDon.sdt})
                        |{this.state.hoaDon.diaChiCuThe} - {this.state.hoaDon.xaPhuongThiTran} - {this.state.hoaDon.quanHuyen} - {this.state.hoaDon.tinhThanhPho}</button> : ""}</center>
                    <section className="section dashboard">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card thong-tin">
                                        <div className="card-body">
                                            <h5 className="card-title">Địa Chỉ Nhận Hàng</h5>
                                            <div className='row'>
                                                <div className="text-left col-12">
                                                    <table className="table">
                                                        <tbody>
                                                        <tr>
                                                            <th scope="row">Tên người nhận: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung ? this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung.ten : "Khách lẻ"} </th>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Số điện thoại: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung ? this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung.sdt : "Khách lẻ"}</th>
                                                            <td className="text-left col-4">
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Địa chỉ: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung ? this.state.hoaDon.diaChiCuThe +", "+ this.state.hoaDon.xaPhuongThiTran +", "+ this.state.hoaDon.quanHuyen +", "+ this.state.hoaDon.tinhThanhPho : "Khách lẻ"}</th>
                                                            <td>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className='col-5'></div>
                                            </div>
                                        </div>
                                    </div>
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
                                                        giam = total - this.state.hoaDon?.tongTien;

                                                        return (
                                                            <tr key={hoaDonChiTiet.id}>
                                                                <td>{index + 1}</td>
                                                                <td>{hoaDonChiTiet.soLuong}</td>
                                                                <td>
                                                                    <img
                                                                        src={`/img/${hoaDonChiTiet.sanPhamChiTiet.sanPham.anh}`}
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
                                                    <div className="text-left col-12">
                                                        <table className="table">
                                                            <thead>
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <th scope="row">Tổng tiền hàng</th>
                                                                <td>
                                                                    <label className="text-left"><s>{total.toLocaleString()} VNĐ</s></label>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Voucher từ Shop</th>
                                                                <td className="text-left col-4">
                                                                    - {giam.toLocaleString()}đ (Giảm {this.state.hoaDon?.khuyenMai?.giamGia} {this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 1 ? "%" : this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 0 ? "VND" : ""})
                                                                </td>
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
                                                                        {(total + this.state.hoaDon.phiShip - giam).toLocaleString()} VNĐ
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className='col-5'></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div>

                    </div>
                </div>
            </div>
        );
    }
}

export default HoaDonChiTietComponents;
