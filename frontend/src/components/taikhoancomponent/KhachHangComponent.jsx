import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";

class KhachHangComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: [],
            nhanVienQuyen3: [],
            itemsPerPage: 5,
            currentPage: 1,
            filterStatus: 'all',
            searchValue: '',
        };
    }

    componentDidMount(pageNumber) {
        taikhoanservice.getKhachHang(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen3: res.data,
                    pageCount: res.data.totalPages,
                });
            });
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
                this.setState({taiKhoanUpdate: res.data});
            })
        }

    }

    handlePageClick = (selectedPage) => {
        const pageNumber = selectedPage.selected + 1; // ReactPaginate uses zero-based indexing
        this.setState({pageNumber}, () => {
            this.loadKhachHangData(pageNumber);
        });
    };

    loadQuanLyData(pageNumber) {
        taikhoanservice.getKhachHang(pageNumber)
            .then(response => {
                this.setState({
                    nhanVienQuyen3: response.data,
                    pageCount: response.data.totalPages,
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };

    handleFilterChange = (event) => {
        const filterStatus = event.target.value;
        this.setState({filterStatus});
    }

    handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        this.setState({
            searchValue,
            currentPage: 1, // Reset currentPage when searching
        });
    };

    add(id) {
        window.location.href = '/addKhachHang';

    }

    detail(id) {
        window.location.href = `/khachhangdetail/${id}`;
    }


    toggleTaiKhoan = (id, currentTaiKhoan) => {
        const newTrangThai = !currentTaiKhoan === true ? false : true; // Chuyển đổi trạng thái;
        taikhoanservice.updateTaiKhoanTrangThai({trangThai: newTrangThai}, id)
            .then((res) => {
                let taiKhoanCapNhat = res.data;
                this.setState(prevState => ({
                    nhanVienQuyen3: prevState.nhanVienQuyen3.map(tk =>
                        tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                    )
                }));
            });
    }

    render() {
        const {nhanVienQuyen3, itemsPerPage, currentPage, filterStatus, searchValue} = this.state;

        // Filter employees based on filterStatus
        const filteredEmployees = nhanVienQuyen3.filter((employee) => {
            if (filterStatus === 'all') {
                return true;
            } else if (filterStatus === 'active') {
                return employee.trangThai === true;
            } else {
                return employee.trangThai === false;
            }
        });
        const searchFilteredEmployees = filteredEmployees.filter((employee) => {
            const {maTaiKhoan, email, thongTinNguoiDung} = employee;
            const maTaiKhoanLowerCase = maTaiKhoan ? maTaiKhoan.toLowerCase() : '';
            const emailLowerCase = email ? email.toLowerCase() : '';
            const tenNhanVienLowerCase = thongTinNguoiDung.ten ? thongTinNguoiDung.ten.toLowerCase() : '';
            const sdtLowerCase = thongTinNguoiDung.sdt ? thongTinNguoiDung.sdt.toLowerCase() : '';

            return (
                maTaiKhoanLowerCase.includes(searchValue) ||
                emailLowerCase.includes(searchValue) ||
                sdtLowerCase.includes(searchValue) ||
                tenNhanVienLowerCase.includes(searchValue)
            );
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentItems = searchFilteredEmployees.slice(startIndex, endIndex);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khách hàng</h1>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách khách hàng</h5>
                                            <div className="card-body">
                                                <h5 className="card-title">Danh sách nhân viên <span>| </span></h5>
                                                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <button onClick={this.add} className='btn btn-success'>
                                                        Thêm khách hàng
                                                    </button>
                                                </div>
                                                <div className="search-container">
                                                    <input
                                                        type="text"
                                                        placeholder="Tìm kiếm theo tên, mã, SDT, hoặc email"
                                                        value={searchValue} // Bind the search input value to the state
                                                        onChange={this.handleSearch} // Attach the search event handler
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="filterAll"
                                                        name="filterStatus"
                                                        value="all"
                                                        checked={filterStatus === 'all'}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                    <label htmlFor="filterAll">Tất cả</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="filterActive"
                                                        name="filterStatus"
                                                        value="active"
                                                        checked={filterStatus === 'active'}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                    <label htmlFor="filterActive">Hoạt động</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id="filterInactive"
                                                        name="filterStatus"
                                                        value="inactive"
                                                        checked={filterStatus === 'inactive'}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                    <label htmlFor="filterInactive">Ngừng hoạt động</label>
                                                </div>
                                                <table className="table table-borderless datatable">
                                                    <thead>
                                                    <tr>
                                                        <th>Mã KH</th>
                                                        <th>Tên</th>
                                                        <th>Email</th>
                                                        <th>SDT</th>
                                                        <th>Ngày tạo</th>
                                                        <th>Trạng thái</th>
                                                        <th>Action</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {currentItems.map(tk => (
                                                        <tr key={tk.id}>
                                                            <td>{tk.maTaiKhoan}</td>
                                                            <td>{tk.thongTinNguoiDung.ten}</td>
                                                            <td>{tk.email}</td>
                                                            <td>{tk.thongTinNguoiDung ? tk.thongTinNguoiDung.sdt : 'N/A'}</td>
                                                            <td>{tk.ngayTao}</td>
                                                            <td>{tk.trangThai === true ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                                            <td>
                                                                <label className="switch">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={tk.trangThai === true}
                                                                        onChange={() => this.toggleTaiKhoan(tk.id, tk.trangThai)}
                                                                    />
                                                                    <span className="slider round"></span>
                                                                </label>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => this.detail(tk.id)}
                                                                        className='btn btn-primary'>Detail
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                                <ul className="pagination justify-content-center">
                                                    {Array.from({length: Math.ceil(nhanVienQuyen3.length / itemsPerPage)}, (_, i) => (
                                                        <li key={i}
                                                            className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                                                            <button
                                                                className="page-link"
                                                                onClick={() => this.handlePageChange(i + 1)}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
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

export default KhachHangComponent;
