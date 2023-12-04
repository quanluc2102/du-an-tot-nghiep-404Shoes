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
            listHoaDonChuaXuLy: [],
            topSanPhamBanChay: [],
        };

    }

    componentDidMount() {
        this.fetchTongSoSanPham();
        this.fetchHoaDon();
        this.fetchKhachHang();
        this.fetchHoaDonChuaXuLy();
        this.fetchListHoaDonChuaXuLy();
        this.fetchDataTopSanPham();
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

    fetchDataTopSanPham = () => {
        thongkeservice.countTopSanPhamBanChay()
            .then(data => {
                this.setState({topSanPhamBanChay: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
            });
    };
    fetchListHoaDonChuaXuLy = () => {
        thongkeservice.hoaDonChuaXuLy()
            .then(data => {
                this.setState({listHoaDonChuaXuLy: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
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

    detail(id) {
        window.location.href = (`/HoaDonChiTiet/${id}`);
    }

    render() {
        return (

            <div>
                <div className="align-center">
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        marginBottom: '0',
                        fontWeight: '600',
                        color: '#012970'
                    }}>
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


                <div className="row">
                    <div className="col-xxl-6 col-md-6">
                        <div className="card top-selling overflow-auto">
                            <div className="card-body pb-0">
                                <h5 className="card-title">Top 10 sản phẩm bán chạy</h5>

                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col">Ảnh</th>
                                        <th scope="col">Tên sản phẩm</th>
                                        <th scope="col">Số lượng đã bán</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.topSanPhamBanChay.map((th, index) => (
                                        <tr key={index}>
                                            {/*<td>{th[4]}</td>*/}
                                            <td><img style={{height: '60px', width: '60px', float: 'left'}}
                                                     src={`/niceadmin/img/${th[4]}`}/></td>
                                            <td>{this.formatCurrency(th[2])}</td>
                                            <td>{th[1]}</td>
                                            {/*<td>{th[4]}</td>*/}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>


                    <div className="col-xxl-6 col-md-6">
                        <div className="card top-selling overflow-auto">
                            <div className="card-body pb-0">
                                <h5 className="card-title">Đơn hàng chưa xử lý</h5>

                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col">Mã đơn hàng</th>
                                        <th scope="col">Người mua</th>
                                        <th scope="col">Ngày mua</th>
                                        {/*<th scope="col">Xử lý đơn hàng</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.listHoaDonChuaXuLy.map((th, index) => (
                                        <tr key={index} onClick={() => this.detail(th[0])} className="table-row">
                                            <td>{th[1]}</td>
                                            <td>{this.formatCurrency(th[2])}</td>
                                            <td>{th[3]}</td>
                                            <td><a onClick={() => this.detail(th[0])}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi1JREFUSEvF10vITVEUwPHflzL0yjvJQBETGRBFpIgJMTEzUEQGyiMywEQpFMUAmRuIGUqEZMDAK0mEMpBXiBGhpX20ne+e795zz823Jve271r7v9djr7Vvn0GSvkHiagceiVmYidEdHvI9HuEePlXZVIEn4hjWdAirUjuLLYjD/COtwDNwBRMaQgvzF1iC+PwrZfBk3MWYpHEOJ3C15iECFJ6uSnYBnZN7XgZfwMqkvB2HawLL6nuxLy2exMZCIQeHt6/SD5GbtQ2hhfklLMN3RLF+ix9y8HqcTtpRyfdrgofjcwubpbic1lfgYhm8GweSwhD8rAGOQryV6uFQyW4UPqS1rThaBkcuIifl9Xb8oXiAaUlxT+ZAYfsrfdlf5DwPdTfgIrybcTxt/hrTi1ymtZ6CY/Mb2IUz2ITwaG75zqJn4IBex9jk0QacwoiKNtkTcOQyoOOy5Edvnp2uTKuaaAyeipsYn+3+BAvxboAqbASegttdQOM8XYMDGp5Oyrx6hvltPG10nSKsd1pAF+BNu0ve5DotwrUM8BLzakC7DnUODmh4Gk2iUxmW9fBtONJpy4y7GUMj5DHedkpMeouzeb4a5zsF1+T0U4/JFBPqRxqLX/8H+CB2pqNEZ4sO90eaDomqaMQrJl4by5PC89TDi/FYCW4a3tz+aQp18brp53FMl3jY9VJiau3Ax/Kmeahjtq5DvBiaSFT9w/R0+lK1Ubt/Ek0OMKDtoIF/AxLsgR+5iHZvAAAAAElFTkSuQmCC" /></a></td>
                                            {/*<td>{th[4]}</td>*/}
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>



                </div>

            </div>


        );
    }
}

export default TrangTongQuan;
