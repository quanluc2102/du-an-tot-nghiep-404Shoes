import React, { Component, useState } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import { Modal, Button } from 'react-bootstrap';
import OrderStatus from './OrderStatus';
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


            },
            diaChi:[],
            hoaDonId: {
                id: this.props.match.params.id,
                taiKhoanKhachHang:'',
            },
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
            trangThaiLabels: [
                'Chờ duyệt',
                'Duyệt',
                'Đóng gói',
                'Xuất kho',
                'Hoàn thành',
            ],
        };
        this.update = this.update.bind(this);
        this.thayDoiMoTa = this.thayDoiMoTa.bind(this);
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
        
    }
    
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
            this.setState({ diaChi :res.data });
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

    huyHD = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn hủy hóa đơn này không ?');
        if (!confirmed) {
            return;
        }
        const id = this.state.hoaDonId.id;
        HoaDonService.huyHD(id)
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

        const hoaDon = { [updateKey]: this.state.hoaDonUpdate[updateKey] };
        const id = this.state.hoaDonUpdate.id;

        HoaDonService.updateHoaDon(hoaDon, id).then((res) => {
            window.location.href = `/HoaDonChiTiet/${this.state.hoaDonId.id}`;
        });
    };

    render() {
        let total = 0;
        let giam = 0;
 
        const isHoaDonDaHuy = this.state.hoaDon.trangThai === 5;
        const isHoaDonKoDcHuy = this.state.hoaDon.trangThai >= 3;
        const isKhachLe  = this.state.hoaDon.taiKhoanKhachHang === '';
        return (

            <div>
                <div className="pagetitle">
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
                <div>
                    <div style={{ maxWidth: '960px' }}>  
                        <br />
                        <br />
                        <div>{this.state.hoaDon.trangThai === 6 || this.state.hoaDon.trangThai <5 ?<Button
                                variant="btn btn-outline-primary"
                                onClick={this.handleShowModal1}
                                Visible
                                disabled={isHoaDonDaHuy || this.state.hoaDon.trangThai === 4 || this.state.hoaDon.trangThai === 6}
                                style={isHoaDonDaHuy ? { color: 'gray', borderColor: 'gray', cursor: 'not-allowed', visible: false } : this.state.hoaDon.trangThai === 4 ? { color: 'green', borderColor: 'green' } : this.state.hoaDon.trangThai === 6 ? { color: 'green', borderColor: 'green' } : {}}
                            >
                                {this.state.hoaDon.trangThai === 0 ? 'Xác nhận' : this.state.hoaDon.trangThai === 1 ? ' Xác nhận chuẩn bị giao' : this.state.hoaDon?.trangThai === 2 ? ' Xác nhận Đang giao' : this.state.hoaDon?.trangThai === 3 ? 'Xác nhận Hoàn thành' : this.state.hoaDon?.trangThai === 4 ? 'Đã hoàn thành' : this.state.hoaDon?.trangThai === 6 ? 'Đã hoàn thành bán tại quầy':''}
                            </Button>:""}
                            
                            <h1></h1>
                            <button style={isHoaDonKoDcHuy ? { color: 'gray', borderColor: 'gray', cursor: 'not-allowed' } : {}} disabled={isHoaDonKoDcHuy} type="submit" value="huyHD" className="btn btn-outline-primary" onClick={this.huyHD}> {this.state.hoaDon.trangThai === 5 ? 'Hóa đơn này đã hủy' : "Hủy hóa đơn"}</button>
                            <Modal show={this.state.showModal1} onHide={this.handleCloseModal1} backdrop="static">
                                <Modal.Header closeButton>
                                    <Modal.Title>{this.state.hoaDon.trangThai === 0 ? 'Xác nhận' : this.state.hoaDon.trangThai === 1 ? ' Xác nhận chuẩn bị giao' : this.state.hoaDon?.trangThai === 2 ? ' Xác nhận Đang giao' : this.state.hoaDon?.trangThai === 3 ? 'Xác nhận Hoàn thành' : ""}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="form-floating">
                                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" onChange={this.thayDoiMoTa}></textarea>
                                        <label for="floatingTextarea2" >Mô tả</label>
                                        <br />
                                        <div className="d-flex justify-content-end">
                                            <button type="button" className="btn btn-outline-dark me-2">Hủy</button>  <h1> </h1>
                                            <button type="submit" value="Update" className="btn btn-outline-primary" onClick={this.update}>Xác nhận</button>
                                        </div>
                                    </div>
                                    {this.popupContent}
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>          
                <br/>          
               
                <center>{this.state.hoaDon.kieuHoaDon=== 0?<button type="button" class="btn btn-outline-danger" onClick={this.handleShowModal2} >Thôn tin giao hàng :  {this.state.hoaDon.ten}( {this.state.hoaDon.sdt}) |{this.state.hoaDon.diaChiCuThe} - {this.state.hoaDon.xaPhuongThiTran} - {this.state.hoaDon.quanHuyen} - {this.state.hoaDon.tinhThanhPho}</button>:""}</center>
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
                                                            giam = total - this.state.hoaDon?.tongTien;// Cộng dồn tổng

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
                                                                    <td><label color='red' className="text-right "><s> {total.toLocaleString()} VNĐ</s></label></td>

                                                                </tr>
                                                                <tr>

                                                                    <th scope="row">Voucher từ Shop</th>
                                                                    <td className="text-left col-4">- {giam.toLocaleString()
                                                                    }đ (Giảm {this.state.hoaDon?.khuyenMai?.giamGia} {this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 1 ? "%" : this.state.hoaDon?.khuyenMai?.kieuKhuyenMai === 0 ? "VND" : ""})</td>

                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Thành tiền</th>
                                                                    <td ><p style={{ color: 'red', fontSize: '24px' }}>
                                                                        {this.state.hoaDon?.tongTien?.toLocaleString()} VNĐ
                                                                    </p></td>

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
                                                aria-selected="false">{this.state.hoaDon.taiKhoanKhachHang != null ? "Khách Hàng" :"Khách lẻ" }
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
                                                        Người mua: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung ? this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung.ten : "Khách lẻ"}</h10>
                                                    <h10 className="nav-link">
                                            
                                                        Số điện thoại: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung ? this.state.hoaDon.taiKhoanKhachHang.thongTinNguoiDung.sdt : "Khách lẻ"}</h10>
                                                    <h10 className="nav-link">
                                                        Email: {this.state.hoaDon.taiKhoanKhachHang && this.state.hoaDon.taiKhoanKhachHang ? this.state.hoaDon.taiKhoanKhachHang.email : "Khách lẻ"}</h10>
                                                    <div>
                                                        {this.state.hoaDon.taiKhoanKhachHang != null ?<Button variant="btn btn-outline-primary" onClick={this.handleShowModal2} >
                                                            Danh sách địa chỉ
                                                        </Button>: ''}
                                                        
                                                        <Modal show={this.state.showModal2} onHide={this.handleCloseModal2} backdrop="static">
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Thông tin nhân viên</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
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
                                                                            onClick={() => this.handleAddress(diaChi.diaChiCuThe, diaChi.xaPhuongThiTran, diaChi.quanHuyen, diaChi.tinhThanhPho)}  className="btn btn-outline-info">chọn</button></td>
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
