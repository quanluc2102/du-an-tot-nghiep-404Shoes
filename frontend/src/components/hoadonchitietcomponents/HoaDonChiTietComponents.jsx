import React, { Component } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import { Modal, Button } from 'react-bootstrap';
// import { tichDiemDaCoTaiKhoan, tichDiemMoi } from "../tichdiemcomponent/TichDiemService";
import 'font-awesome/css/font-awesome.min.css';
import './hoadonchitiet.css'
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css"></link>
class HoaDonChiTietComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hoaDonChiTiet: [],
            hoaDonUpdate: {
                id: this.props.match.params.id,
                choXacNhan: '',
                ghiChuChoXacNhan: '',
                choGiao: '',
                ghiChuChoGiao: '',
                dangGiao: '',
                ghiChuDangGiao: '',
                hoanThanh:'',
                ghiChuHoanThanh:''

            },
            hoaDonId: {
                id: this.props.match.params.id
            },
            hoaDon: {
                id: this.props.match.params.id,
                thanhToan: '',
                taiKhoan: '',
                trangThai:'',
            },
            sdt: '',
            diem: '',
            result: '',
            showModal: false,
            showModal1: false,
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
        if (trangThai === 1) {
            return 'gray'; // Chờ duyệt
        } else if (trangThai === 2) {
            return 'green'; // Duyệt
        } else if (trangThai === 3) {
            return 'blue'; // Đóng gói
        } else if (trangThai === 4) {
            return 'orange'; // Xuất kho
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
        } };
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
   
   
        update = (e) => {
            e.preventDefault();
            const confirmed = window.confirm('Bạn có chắc chắn muốn sửa danh mục?');
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

                <div>
                    {/* ... Các phần mã khác ở đây ... */}
                    <div style={{maxWidth: '960px', marginLeft: '330px'}}>
                        {/* ... Các phần mã khác ở đây ... */}

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {Array.from(Array(4).keys()).map((index) => {
                                const trangThai = index + 1;
                                const isActive = this.state.hoaDon.trangThai >= trangThai;

                                return (
                                    <div style={{ textAlign: 'center', flex: 1 }} key={trangThai}>
                                        <div
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: trangThai === 0 ? 'gray' : isActive ? 'green' : '#e0e0e0',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                color: isActive ? 'white' : '#555',
                                                margin: '0 auto 10px',
                                            }}
                                        >
                                            {trangThai}
                                        </div>
                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            {trangThai === 1 ? 'Xác nhận' : trangThai === 2 ? 'Chuẩn bị giao' : trangThai === 3 ? 'Đang giao' : trangThai === 4 ? 'Hoàn thành': ""}
                                        </div>
                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            {trangThai === 1 ? this.state.hoaDon.choXacNhan : trangThai === 2 ? this.state.hoaDon.choGiao : trangThai === 3 ? this.state.hoaDon.dangGiao : trangThai === 4 ? this.state.hoaDon.hoanThanh : "Chờ duyệt"}
                                        </div>
                                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                                            {trangThai === 1 ? this.state.hoaDon.ghiChuChoXacNhan : trangThai === 2 ? this.state.hoaDon.ghiChuChoGiao : trangThai === 3 ? this.state.hoaDon.ghiChuDangGiao : trangThai === 4 ? this.state.hoaDon.ghiChuHoanThanh : trangThai === 5 ? this.state.hoaDon.ghiChuHuy : "Chờ duyệt"}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Kết nối các ô trạng thái bằng các đường kẻ */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 1 ? 'green' : '#e0e0e0'}}></div>
                            <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 2 ? 'green' : '#e0e0e0' }}></div>
                            <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 3 ? 'green' : '#e0e0e0' }}></div>
                            <div style={{ flex: 1, height: '10px', backgroundColor: this.state.hoaDon.trangThai >= 4 ? 'green' : '#e0e0e0' }}></div>
                        </div>
                        <br />
                        <br />
                        <Button variant="btn btn-outline-primary" onClick={this.handleShowModal1}>
                        {this.state.hoaDon.trangThai === 0 ? 'Xác nhận hóa đơn' : this.state.hoaDon.trangThai === 1 ? 'Xác nhận chuẩn bị giao' : this.state.hoaDon.trangThai === 2 ? 'Xác nhận Đang giao' : this.state.hoaDon.trangThai === 3 ? 'Đang giao' : this.state.hoaDon.trangThai === 4 ? 'Hoàn thành' : ""}
                        </Button>
                        <Modal show={this.state.showModal1} onHide={this.handleCloseModal1} backdrop="static">
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.hoaDon.trangThai === 0 ? 'Xác nhận' : this.state.hoaDon.trangThai === 1 ? ' Xác nhận Chờ giao' : this.state.hoaDon?.trangThai === 3 ? ' Xác nhận Đang giao' : this.state.hoaDon?.trangThai === 4 ? 'Xác nhận Hoàn thành' : this.state.hoaDon?.trangThai === 5 ? 'Hủy' : "Chờ duyệt"}</Modal.Title>
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
                <br />

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
                                                            total += hoaDonChiTiet.sanPhamChiTiet.donGia * hoaDonChiTiet.soLuong; // Cộng dồn tổng

                                                            return (
                                                                <tr key={hoaDonChiTiet.id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{hoaDonChiTiet.soLuong}</td>
                                                                    <td>
                                                                        <img
                                                                            // src={hoaDonChiTiet.sanPhamChiTiet.sanPham.imageURL}
                                                                            // alt={hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}
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
                                                <div className="text-right mt-3">
                                                    <label>Tổng: {total.toLocaleString()} VNĐ</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                                aria-selected="false">Khách hàng
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                data-bs-target="#contact" type="button" role="tab"
                                                aria-controls="contact"
                                                aria-selected="false">Detail
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
                                                                // src={hoaDonChiTiet.sanPhamChiTiet.sanPham.imageURL}
                                                                // alt={hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}
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
                                                        Người mua: {this.state.hoaDon?.ten}</h10>
                                                    <h10 className="nav-link">
                                                        Địa chỉ: {this.state.hoaDon?.xaPhuongThiTran}, {this.state.hoaDon?.quanHuyen}, {this.state.hoaDon?.tinhThanhPho}</h10>
                                                    <h10 className="nav-link">
                                                        Số điện thoại: {this.state.hoaDon?.sdt}</h10>
                                                    <h10 className="nav-link">
                                                        Email:{this.state.hoaDon && this.state.hoaDon.email !== null ? this.state.hoaDon.email : "--+--"}</h10>

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
                    </div>

                </section>
                <div>

                </div>
            </div>
        );
    }
}

export default HoaDonChiTietComponents;
