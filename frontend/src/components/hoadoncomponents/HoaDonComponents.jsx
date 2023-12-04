import React, { Component } from 'react';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import "../hoadoncomponents/HoadonCss.css"
import _ from 'lodash'; // Import lodash
import ReactPaginate from 'react-paginate';
class HoaDonComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDon: [],
            sortedColumn: null,
            isSortAsc: true,
            searchTerm: '',
            currentPage: 0, // Trang hiện tại
            perPage: 4, // Số mục trên mỗi trang// Initialize searchTerm
        }
        // this.detail = this.detail.bind(this);
    }
    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    }

    componentDidMount() {
        HoaDonService.getHoaDon().then((res) => {
            this.setState({ hoaDon: res.data })
        });
        const storedSearchTerm = localStorage.getItem('searchTerm');
        if (storedSearchTerm) {
            this.setState({ searchTerm: storedSearchTerm });
        }
    }
    handleSearch = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });

        // Lưu trạng thái tìm kiếm vào localStorage
        localStorage.setItem('searchTerm', searchTerm);
    }
    handleStatusFilter = (filterValue) => {
        this.setState({ searchTerm: filterValue });
    }

    // Phương thức này trả về dữ liệu đã được lọc dựa trên giá trị tìm kiếm
    filteredData = () => {
        const { hoaDon, searchTerm } = this.state;

        return _.filter(hoaDon, (item) => {
            // Combine the values of the columns you want to search in
            const searchValues = (
                (item.ten && item.ten !== null ? item.ten : "Khách lẻ") +
                (item.maHoaDon) + (item.ngayTao) + (item.ghiChu) +
                (item.sdt) + (item.taiKhoan && item.taiKhoan.maTaiKhoan) +
                (item.trangThai === 4 ? "Hoàn thành" : item.trangThai === 0 ? "Chờ xác nhận" : item.trangThai === 1 ? "Đã xác nhận" : item.trangThai === 2 ? "Chuẩn bị giao" : item.trangThai === 3 ? "Đang giao" : item.trangThai === 4 ? "Hoàn thành" : item.trangThai === 5 ? "Đã Hủy": item.trangThai === 6 ? "Tại quầy" : "Chờ")
            ).toLowerCase();

            switch (searchTerm) {
                case "6":
                    return item.trangThai == 6;
                case "5":
                    return item.trangThai == 5; // Filter for "Đã thanh toán"
                case "3":
                    return item.trangThai == 3; // Filter for "Chưa thanh toán"
                case "4":
                    return item.trangThai == 4; // Filter for "Chờ"
                case "2":
                    return item.trangThai == 2;
                case "0":
                    return item.trangThai == 0;
                case "1":
                    return item.trangThai == 1;
                default:
                    return searchValues.includes(searchTerm.toLowerCase());
            }
        });
    }
    detail(id) {
        window.location.href = (`/HoaDonChiTiet/${id}`);
    }
    handleDetailClick = (id) => {
        // Redirect to the detail page or perform any other action you need
        window.location.href = `/HoaDonChiTiet/${id}`;
    }
    handleSort = (column) => {
        const { hoaDon, sortedColumn, isSortAsc } = this.state;

        // Sắp xếp dữ liệu theo cột được chọn
        const sortedData = _.orderBy(hoaDon, [column], [isSortAsc ? 'asc' : 'desc']);

        this.setState({
            hoaDon: sortedData,
            sortedColumn: column,
            isSortAsc: !isSortAsc
        });
    }
    getStatusColor = (status) => {
        switch (status) {
            case 6:
                return'#50C7C7';
            case 5:
                return 'red'; // Đã hoàn thành (màu xanh)
            case 3:
                return 'yellow'; // Chưa thanh toán (màu đỏ)
            case 4:
                return 'green'; // Chờ (màu vàng)
            case 2:
                return 'red'; // Chờ (màu vàng)
            case 1:
                return 'blue'; // Chờ (màu vàng)
            case 0:
                return '#e0e0e0'; // Chờ (màu vàng)

            default:
                return 'white'; // Default color (or another color of your choice)
        }
    }

    getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Chưa xác nhận';
            case 1:
                return 'Đã xác nhận';
            case 2:
                return 'Chuẩn bị giao';
            case 3:
                return 'Đang giao';
            case 4:
                return 'Hoàn thành';
            case 5:
                return 'Hủy';
            case 6:
                return "Tại quầy";
            default:
                return 'Không xác định';  // Default text (or another text of your choice)
        }
    }
    handleSearchFocus = () => {
        // Đặt trang hiện tại về 0 để nhảy về trang đầu tiên
        this.setState({ currentPage: 0 });
    }
    getStatusCounts = () => {
        const { hoaDon } = this.state;
        const statusCounts = {
            "": hoaDon.length, // All
            "0": 0, // Chờ xác nhận
            "1": 0, // Đã xác nhận
            "2": 0, // Chuẩn bị giao
            "3": 0, // Đang giao
            "4": 0, // Hoàn thành
            "5": 0  // Hủy
        };

        hoaDon.forEach(item => {
            switch (item.trangThai) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    statusCounts[item.trangThai.toString()]++;
                    break;
                default:
                    statusCounts[""]++;
                    break;
            }
        });

        return statusCounts;
    }

    render() {
        const searchTerm = localStorage.getItem('searchTerm') || this.state.searchTerm;
        const statusCounts = this.getStatusCounts();
        const { currentPage, perPage } = this.state;
        const hoaDonList = this.filteredData();
        const offset = currentPage * perPage;
        const currentHoaDonList = hoaDonList.slice(offset, offset + perPage);
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

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-13">
                            <div className="row">
                                <div className="col-17">
                                    <div className="card recent-sales overflow-auto">
                                        <br />
                                        <br />
                                        <div className="col-17">
                                            <div className="row">
                                                <div className="col-2 container">
                                                    <input
                                                        type="text"
                                                        name="query"
                                                        placeholder="Tìm kiếm"
                                                        title="Enter search keyword"
                                                        value={searchTerm}
                                                        onChange={this.handleSearch}
                                                        onFocus={this.handleSearchFocus} // Thêm sự kiện onFocus
                                                    />
                                                </div>
                                                <div className="col-7">
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterAll"
                                                            name="statusFilter"
                                                            value=""
                                                            checked={this.state.searchTerm === ""}
                                                            onChange={() => this.handleStatusFilter("")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterAll" className="form-check-label">Tất cả  <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts[""]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPending"
                                                            name="statusFilter"
                                                            value="0"
                                                            checked={this.state.searchTerm === "0"}
                                                            onChange={() => this.handleStatusFilter("0")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPending" className="form-check-label">Chờ xác nhận  <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["0"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPaid"
                                                            name="statusFilter"
                                                            value="4"
                                                            checked={this.state.searchTerm === "1"}
                                                            onChange={() => this.handleStatusFilter("1")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPaid" className="form-check-label">Đã xác nhận <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["1"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPaid"
                                                            name="statusFilter"
                                                            value="4"
                                                            checked={this.state.searchTerm === "2"}
                                                            onChange={() => this.handleStatusFilter("2")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPaid" className="form-check-label">Chuẩn bị giao <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["2"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterUnpaid"
                                                            name="statusFilter"
                                                            value="2"
                                                            checked={this.state.searchTerm === "3"}
                                                            onChange={() => this.handleStatusFilter("3")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterUnpaid" className="form-check-label">Đang giao <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["3"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPending"
                                                            name="statusFilter"
                                                            value="3"
                                                            checked={this.state.searchTerm === "4"}
                                                            onChange={() => this.handleStatusFilter("4")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPending" className="form-check-label">Hoàn thành <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["4"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPending"
                                                            name="statusFilter"
                                                            value="3"
                                                            checked={this.state.searchTerm === "5"}
                                                            onChange={() => this.handleStatusFilter("5")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPending" className="form-check-label">Hủy  <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["5"]}</span></label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            type="radio"
                                                            id="filterPending"
                                                            name="statusFilter"
                                                            value="3"
                                                            checked={this.state.searchTerm === "6"}
                                                            onChange={() => this.handleStatusFilter("6")}
                                                            className="form-check-input"
                                                        />
                                                        <label htmlFor="filterPending" className="form-check-label">Tại quầy<span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts["5"]}</span></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Hóa đơn <span>|</span></h5>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã Hóa Đơn</th>
                                                        <th>Mã Nhân Viên</th>
                                                        <th>Tên Khách Hàng</th>
                                                        <th>SĐT Khách Hàng</th>
                                                        <th onClick={() => this.handleSort('ngayTao')}>Ngày Mua {this.renderSortIcon('ngayTao')}</th>
                                                        <th onClick={() => this.handleSort('ngayCapNhat')}>Ngày cập nhật {this.renderSortIcon('ngayCapNhat')}</th>
                                                        <th>Thạng thái</th>
                                                        <th>Ghi chú</th>
                                                        <th onClick={() => this.handleSort('tongTienSauGiam')}>Khách Phải Trả {this.renderSortIcon('tongTienSauGiam')}</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentHoaDonList.map(
                                                            (hoaDon, index) =>
                                                                <tr key={hoaDon.id}>

                                                                    <td>{index + 1}</td>
                                                                    <td>{hoaDon.maHoaDon}</td>
                                                                    <td>{hoaDon.taiKhoan && hoaDon.taiKhoan.maTaiKhoan ? hoaDon.taiKhoan.maTaiKhoan : "Tạm"}</td>
                                                                    <td>{hoaDon && hoaDon.ten !== null ? hoaDon.ten : "Khách lẻ"}</td>
                                                                    <td>{hoaDon && hoaDon.sdt !== null ? hoaDon.sdt : "Khách lẻ"}</td>
                                                                    <td>{hoaDon.ngayTao}</td>
                                                                    <td>{hoaDon.ngayCapNhat}</td>
                                                                    <td style={{ color: this.getStatusColor(hoaDon.trangThai) }}>
                                                                        {this.getStatusText(hoaDon.trangThai)}
                                                                    </td>
                                                                    <td>{hoaDon.ghiChu}</td>
                                                                    <td>{hoaDon.tongTien !== null && hoaDon.tongTien !== undefined ? hoaDon.tongTien.toLocaleString() : 'N/A'}</td>
                                                                    <td><a onClick={() => this.detail(hoaDon.id)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi1JREFUSEvF10vITVEUwPHflzL0yjvJQBETGRBFpIgJMTEzUEQGyiMywEQpFMUAmRuIGUqEZMDAK0mEMpBXiBGhpX20ne+e795zz823Jve271r7v9djr7Vvn0GSvkHiagceiVmYidEdHvI9HuEePlXZVIEn4hjWdAirUjuLLYjD/COtwDNwBRMaQgvzF1iC+PwrZfBk3MWYpHEOJ3C15iECFJ6uSnYBnZN7XgZfwMqkvB2HawLL6nuxLy2exMZCIQeHt6/SD5GbtQ2hhfklLMN3RLF+ix9y8HqcTtpRyfdrgofjcwubpbic1lfgYhm8GweSwhD8rAGOQryV6uFQyW4UPqS1rThaBkcuIifl9Xb8oXiAaUlxT+ZAYfsrfdlf5DwPdTfgIrybcTxt/hrTi1ymtZ6CY/Mb2IUz2ITwaG75zqJn4IBex9jk0QacwoiKNtkTcOQyoOOy5Edvnp2uTKuaaAyeipsYn+3+BAvxboAqbASegttdQOM8XYMDGp5Oyrx6hvltPG10nSKsd1pAF+BNu0ve5DotwrUM8BLzakC7DnUODmh4Gk2iUxmW9fBtONJpy4y7GUMj5DHedkpMeouzeb4a5zsF1+T0U4/JFBPqRxqLX/8H+CB2pqNEZ4sO90eaDomqaMQrJl4by5PC89TDi/FYCW4a3tz+aQp18brp53FMl3jY9VJiau3Ax/Kmeahjtq5DvBiaSFT9w/R0+lK1Ubt/Ek0OMKDtoIF/AxLsgR+5iHZvAAAAAElFTkSuQmCC" /></a></td>

                                                                </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                            <ReactPaginate
                                                pageCount={Math.ceil(hoaDonList.length / perPage)}
                                                pageRangeDisplayed={5}
                                                marginPagesDisplayed={2}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={'pagination'}
                                                activeClassName={'active'}
                                                previousLabel={"Previous"} // Customize the labels as needed
                                                nextLabel={"Next"}
                                            />
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
    renderSortIcon(column) {
        const { sortedColumn, isSortAsc } = this.state;
        if (sortedColumn === column) {
            return isSortAsc ? <i className="fa fa-sort-asc"></i> : <i className="fa fa-sort-desc"></i>;
        }
        return null;
    }
}

export default HoaDonComponents;
