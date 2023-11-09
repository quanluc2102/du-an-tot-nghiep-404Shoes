import React, { Component } from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import ReactPaginate from "react-paginate";
import moment from 'moment';
import './KhuyenMaiComponentStyle.css';

class KhuyenMaiComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMaiAll: [],
            khuyenMai: [],
            pageCount: 0,
            discountType: "all",
            searchQuery: "",
            currentPage: 0,
        };
    }

    handleSearch = () => {
        const { searchQuery, discountType } = this.state;
        const filteredData = this.state.khuyenMaiAll.filter(km => {
            const matchesSearchQuery =
                km.ma.toLowerCase().includes(searchQuery.toLowerCase()) ||
                km.ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
                km.moTa.toLowerCase().includes(searchQuery.toLowerCase()) ||
                km.giamGia.toString().includes(searchQuery) ||
                (km.trangThai === 0 ? "Chưa diễn ra" : km.trangThai === 1 ? "Đang diễn ra" : "Đã kết thúc").toLowerCase().includes(searchQuery.toLowerCase());

            if (discountType === "percent") {
                return matchesSearchQuery && km.kieuKhuyenMai === 0;
            } else if (discountType === "money") {
                return matchesSearchQuery && km.kieuKhuyenMai === 1;
            } else {
                return matchesSearchQuery;
            }
        });

        this.setState({ khuyenMai: filteredData });
    }

    handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        this.setState({ searchQuery }, () => {
            if (searchQuery === "") {
                this.loadAllData(); // Load all data when search query is empty
            } else {
                this.callApiWithSearchQuery(searchQuery, this.state.discountType);
            }
        });
    }

    handlePageClick = data => {
        let selected = data.selected;
        this.loadPageData(selected);
    };

    componentDidMount() {
        this.loadAllData(); // Load all data when the component first mounts
    }

    loadAllData() {
        const { searchQuery, discountType, currentPage } = this.state;
        KhuyenMaiService.getKhuyenMaiAll(searchQuery, discountType)
            .then((res) => {
                const filteredData = res.data;
                this.setState({
                    khuyenMaiAll: filteredData,
                });
                this.loadPageData(currentPage);
            });
    }

    callApiWithSearchQuery = (searchQuery, discountType) => {
        KhuyenMaiService.getKhuyenMaiAll(searchQuery, discountType)
            .then((res) => {
                const filteredData = res.data;
                this.setState({
                    khuyenMaiAll: filteredData,
                });
                this.handleSearch();
            });
    }

    loadPageData(selectedPage) {
        const { searchQuery, discountType, khuyenMaiAll } = this.state;
        const itemsPerPage = 5;
        const startIdx = selectedPage * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedData = khuyenMaiAll.slice(startIdx, endIdx);

        this.setState({
            khuyenMai: paginatedData,
            pageCount: Math.ceil(khuyenMaiAll.length / itemsPerPage),
            currentPage: selectedPage,
        });
    }

    handleDiscountTypeChange = (e) => {
        const discountType = e.target.value;
        this.setState({ discountType }, () => {
            this.callApiWithSearchQuery(this.state.searchQuery, discountType);
        });
    }

    detail(id) {
        window.location.href = (`/khuyenMaiDetail/${id}`);
    }

    add() {
        window.location.href = (`/khuyenMaiAdd`);
    }

    render() {
        return (
            <div>
                <div className="pageTitle">
                    <h4>Quản lý phiếu giảm giá</h4>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Phiếu giảm giá</h5>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <div>
                                                    <div className="radio-buttons">
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="discountType"
                                                                value="all"
                                                                checked={this.state.discountType === "all"}
                                                                onChange={this.handleDiscountTypeChange}
                                                            />
                                                            Tất cả
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="discountType"
                                                                value="percent"
                                                                checked={this.state.discountType === "percent"}
                                                                onChange={this.handleDiscountTypeChange}
                                                            />
                                                            Phần trăm
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="discountType"
                                                                value="money"
                                                                checked={this.state.discountType === "money"}
                                                                onChange={this.handleDiscountTypeChange}
                                                            />
                                                            Tiền
                                                        </label>
                                                    </div>
                                                    <div className="search-button-container">
                                                        <input
                                                            type="text"
                                                            placeholder="Tìm theo Mã, Tên, Mô tả, Giảm giá, Kiểu khuyến mãi, Điều kiện"
                                                            value={this.state.searchQuery}
                                                            onChange={this.handleSearchChange}
                                                        />
                                                        <button onClick={this.add} className='btn btn-success'>
                                                            Thêm khuyến mãi
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Mô tả</th>
                                                    <th>Ngày bắt đầu</th>
                                                    <th>Ngày kết thúc</th>
                                                    <th>Giảm giá</th>
                                                    <th>Kiểu khuyến mãi</th>
                                                    <th>Điều kiện</th>
                                                    <th>Số lượng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.khuyenMai.map((km) => (
                                                    <tr key={km.id}>
                                                        <td>{km.ma}</td>
                                                        <td>{km.ten}</td>
                                                        <td>{km.moTa}</td>
                                                        <td>{moment(km.batDau).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                        <td>{moment(km.ketThuc).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                        <td>{km.giamGia}</td>
                                                        <td>{km.kieuKhuyenMai === 0 ? "Phần trăm" : km.kieuKhuyenMai === 1 ? "Tiền" : "Khuyến mãi khác"}</td>
                                                        <td>{km.dieuKien}</td>
                                                        <td>{km.soLuong}</td>
                                                        <td>{km.trangThai === 0 ? "Chưa diễn ra" : km.trangThai === 1 ? "Đang diễn ra" : "Đã kết thúc"}</td>
                                                        <td>
                                                            <button onClick={() => this.detail(km.id)} className='btn btn-primary'>
                                                                Chi tiết
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <div className="pagination-container">
                                                <ReactPaginate
                                                    previousLabel={"<"}
                                                    nextLabel={">"}
                                                    breakLabel={"..."}
                                                    breakClassName={"page-item"}
                                                    breakLinkClassName={"page-link"}
                                                    pageClassName={"page-item"}
                                                    pageLinkClassName={"page-link"}
                                                    previousClassName={"page-item"}
                                                    previousLinkClassName={"page-link"}
                                                    nextClassName={"page-item"}
                                                    nextLinkClassName={"page-link"}
                                                    pageCount={this.state.pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.handlePageClick}
                                                    containerClassName={"pagination justify-content-center"}
                                                    activeClassName={"active"}
                                                />
                                            </div>
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

export default KhuyenMaiComponents;
