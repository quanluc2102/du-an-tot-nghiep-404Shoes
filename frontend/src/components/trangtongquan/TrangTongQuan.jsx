import React, {Component} from 'react';
import thongkeservice from '../../services/thongkeservice/thongkeservice';
import {toast} from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import {FaFileExcel} from 'react-icons/fa';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ThongKeInfo from "./ThongKeInfo";
import './style.css'

class TrangTongQuan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tongSoSanPham: 0,
            tongSoDonHang: 0,
            soKhachHang: 0,
            hoaDonChuaXuLy: '',
                    };

    }

    componentDidMount() {
        this.fetchTongSoSanPham();
        this.fetchHoaDon();
        this.fetchKhachHang();
        this.fetchHoaDonChuaXuLy();
    }

    formatNumberOrZero(value) {
        return typeof value === 'number' ? value : 0;
    }



    fetchHoaDonChuaXuLy = () => {
        thongkeservice.countHoaDonChuaHoanThanhTQ()
            .then(data => {
                this.setState({hoaDonChuaXuLy: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };



    fetchHoaDon = () => {
        thongkeservice.countHoaDonTQ()
            .then(data => {
                this.setState({tongSoDonHang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
            });
    };

    fetchKhachHang = () => {
        thongkeservice.countDistinctTaiKhoanIdTQ()
            .then(data => {
                this.setState({soKhachHang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
            });
    };

    fetchTongSoSanPham = () => {
        thongkeservice.countSanPhamChiTietTQ()
            .then(data => {
                this.setState({tongSoSanPham: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuQuy:', error);
            });
    };

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleInputChangeDoanhThu = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };



    handleThongKeThangNewClick = () => {
        this.fetchDataThongKeThangNew();
        this.setState({showTable: false});
    };


    renderTongSoSanPham() {
        return `${this.formatCurrency(this.state.tongSoSanPham)} Sản phẩm`;
    }

    renderSoHoaDonChuaXuLy() {
        return `${this.formatCurrency(this.state.hoaDonChuaXuLy)} Hóa đơn  chưa xử lý`;
    }

    renderSoHoaDon() {
        return `${this.formatCurrency(this.state.tongSoDonHang)} Hóa đơn`;
    }

    renderSoKhachHang() {
        return `${this.formatCurrency(this.state.soKhachHang)} Khách hàng`;
    }


    formatCurrency(amount) {
        // Sử dụng toLocaleString để định dạng số và chèn dấu chấm phân tách
        return amount.toLocaleString('vi-VN');
    }

    render() {
        return (
            <div>
                <div className="align-center">
                    <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '0', fontWeight: '600', color: '#012970' }}>
                        Xin chào Tên người dùng!
                    </h1>
                    <nav>
                        <ol className="breadcrumb"></ol>
                    </nav>
                </div>

                <div className="col-xxl-4 col-md-6">


                </div>

                <div className="row">
                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Tổng số sản phẩm
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'green', // Màu xanh lá cây
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-minecart text-white"></i> {/* Sử dụng biểu tượng tiền */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-success pt-1 fw-bold">
                                            {this.renderTongSoSanPham()}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Tổng số đơn hàng
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'blue', // Màu xanh dương
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-receipt text-white"></i> {/* Sử dụng biểu tượng receipt thay vì cart */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-primary pt-1 fw-bold">
                                            {this.renderSoHoaDon()}

                                        </h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Số khách hàng
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'gray', // Màu xanh dương
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-person-fill text-white"></i> {/* Sử dụng biểu tượng file-earmark-x thay vì receipt */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-danger pt-1 fw-bold">
                                            {this.renderSoKhachHang()}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Hóa đơn chưa xử lý
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'red', // Màu xanh dương
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-x text-white"></i> {/* Sử dụng biểu tượng file-earmark-x thay vì receipt */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-danger pt-1 fw-bold">
                                            {this.renderSoHoaDonChuaXuLy()} {/* Thêm phần "Hóa đơn bị hủy" */}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default TrangTongQuan;
