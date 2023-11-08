import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import ReactPaginate from "react-paginate";
import {toast} from 'react-toastify';
import moment from 'moment';
import './KhuyenMaiComponentStyle.css';

class KhuyenMaiComponents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMaiAll: [], // Lưu trữ toàn bộ dữ liệu khuyenMai
            khuyenMai: [], // Lưu trữ dữ liệu khuyenMai trên trang hiện tại
            pageCount: 0,
            discountType: "all",
            searchQuery: "",
            currentPage: 0,
            debounceTimeout: null,
            isAutoReloadInProgress: false, // Add this line

        };
    }

    handleSearch = () => {
        const { searchQuery, selectedDiscountType, isAutoReloadInProgress } = this.state;

        if (!isAutoReloadInProgress) {
            const filteredData = this.state.khuyenMaiAll.filter(km => {
                const matchesSearchQuery =
                    km.ma.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    km.ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    km.moTa.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    km.giamGia.toString().includes(searchQuery) ||
                    (km.trangThai === 0 ? "Chưa diễn ra" : km.trangThai === 1 ? "Đang diễn ra" : "Đã kết thúc").toLowerCase().includes(searchQuery.toLowerCase());

                if (selectedDiscountType === "percent") {
                    return matchesSearchQuery && km.kieuKhuyenMai === 0;
                } else if (selectedDiscountType === "money") {
                    return matchesSearchQuery && km.kieuKhuyenMai === 1;
                } else {
                    return matchesSearchQuery;
                }
            });

            this.setState({ khuyenMai: filteredData });
        }
    }


    handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        this.setState({searchQuery}, () => {
            if (searchQuery === "") {
                this.loadPageData(0); // Reset page to 0 when clearing the search query
            } else {
                // Call the API with the updated search query
                this.callApiWithSearchQuery(searchQuery, this.state.discountType);
            }
        });
    }


    handlePageClick = data => {
        let selected = data.selected;
        this.loadPageData(selected); // Load dữ liệu cho trang mới được chọn
    };

    componentDidMount() {
        this.loadAllData(); // Load dữ liệu ban đầu

        // Set isAutoReloadInProgress to true
        this.setState({isAutoReloadInProgress: true});

        // Reset the search query
        this.setState({searchQuery: ""});

        this.loadAllData(); // Load data with the searchQuery reset

        // After 1 second, set isAutoReloadInProgress back to false
        setTimeout(() => {
            this.setState({isAutoReloadInProgress: false});
        }, 1000);
    }

    // componentWillUnmount() {
    //     // Xóa interval khi component unmount để tránh rò rỉ bộ nhớ
    //     clearInterval(this.apiRefreshInterval);
    // }

    loadAllData() {
        const { searchQuery, selectedDiscountType, currentPage } = this.state;
        KhuyenMaiService.getKhuyenMaiAll(searchQuery, selectedDiscountType)
            .then((res) => {
                const filteredData = res.data;
                this.setState({
                    khuyenMaiAll: filteredData,
                });

                // Gọi lại dữ liệu và duy trì trang hiện tại
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

                // After getting the data, apply the search query filter and pagination
                this.handleSearch();
            });
    };


    loadPageData(selectedPage) {
        const {searchQuery, discountType, khuyenMaiAll} = this.state;
        const itemsPerPage = 5; // Số mục trên mỗi trang
        const startIdx = selectedPage * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginatedData = khuyenMaiAll.slice(startIdx, endIdx); // Lấy dữ liệu cho trang hiện tại

        this.setState({
            khuyenMai: paginatedData,
            pageCount: Math.ceil(khuyenMaiAll.length / itemsPerPage), // Tính số lượng trang
            currentPage: selectedPage,
        });
    }

    handleDiscountTypeChange = (e) => {
        const selectedDiscountType = e.target.value;
        this.setState({ selectedDiscountType }, () => {
            // Call the API with the updated discount type
            this.callApiWithSearchQuery(this.state.searchQuery, selectedDiscountType);
        });
    };


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
                                            <h5 className="card-title">Phiếu giảm giá<span> </span></h5>
                                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <div>
                                                    <div className="radio-buttons">
                                                        <div className="radio-buttons">
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name="discountType"
                                                                    value="all"
                                                                    checked={this.state.selectedDiscountType === "all"} // Update this line
                                                                    onChange={this.handleDiscountTypeChange}
                                                                />
                                                                Tất cả
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name="discountType"
                                                                    value="percent"
                                                                    checked={this.state.selectedDiscountType === "percent"} // Update this line
                                                                    onChange={this.handleDiscountTypeChange}
                                                                />
                                                                Phần trăm
                                                            </label>
                                                            <label>
                                                                <input
                                                                    type="radio"
                                                                    name="discountType"
                                                                    value="money"
                                                                    checked={this.state.selectedDiscountType === "money"} // Update this line
                                                                    onChange={this.handleDiscountTypeChange}
                                                                />
                                                                Tiền
                                                            </label>
                                                        </div>

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
                                                {
                                                    this.state.khuyenMai.map((km) => (
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
                                                                <button onClick={() => this.detail(km.id)}
                                                                        className='btn btn-primary'>
                                                                    Chi tiết
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
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
                                                    containerClassName={"pagination justify-content-center"} // added justify-content-center for center alignment
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
