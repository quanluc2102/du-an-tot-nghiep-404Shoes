import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import ReactPaginate from 'react-paginate';
import {toast} from "react-toastify";
import thongtinservice from "../../services/thongtinservice/thongtinservice";
import "./nhanvien.css";

class NhanVienComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taiKhoan: [],
            itemsPerPage: 5, // Number of items to display per page
            currentPage: 1,   // Current page
            filterStatus: 'all',
            searchValue: '',
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe:'' ,
            nhanVienQuyen1: [],
            taiKhoanAdd: {
                maTaiKhoan: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                maTaiKhoan: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            errorAdd: {
                maTaiKhoan: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            },
            errorUpdate: {
                maTaiKhoan: '',
                email: '',
                // ngayTao: '',
                // ngayCapNhat: '',
                password: '',
                anh: '',
                trangThai: ''
            }
        }
        this.add = this.add.bind(this);
        // this.delete = this.delete.bind(this);
        //   this.handleSearch=this.handleSearch.bind(this);
        this.detail = this.detail.bind(this);

    }
    loadQuanLyData(pageNumber) {
        taikhoanservice.getNhanVien(pageNumber)
            .then(response => {
                this.setState({
                    nhanVienQuyen1: response.data,
                    pageCount: response.data.totalPages,
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    handlePageClick = (selectedPage) => {
        const pageNumber = selectedPage.selected + 1; // ReactPaginate uses zero-based indexing
        this.setState({ pageNumber }, () => {
            this.loadQuanLyData(pageNumber);
        });
    };
    handlePageChange = (pageNumber) => {
        this.setState({
            currentPage: pageNumber,
        });
    };
    componentDidMount(pageNumber) {
        taikhoanservice.getNhanVien(pageNumber)
            .then(res => {
                this.setState({
                    nhanVienQuyen1: res.data,
                    pageCount: res.data.totalPages,
                });
            });
        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(this.state.id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            })
        }

    }
    add(id) {
        window.location.href = (`/addNhanVien`);

    }

    detail(id) {
        window.location.href = (`/nhanviendetail/${id}`);
    }

    toggleTaiKhoan(id, currentTaiKhoan) {
        const newTrangThai = currentTaiKhoan === true ? false : true; // Chuyển đổi trạng thái
        taikhoanservice.updateTaiKhoanTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let taiKhoanCapNhat = res.data;
            this.setState(prevState => ({
                nhanVienQuyen1: prevState.nhanVienQuyen1.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        });
    }
    handleFilterChange = (event) => {
        const filterStatus = event.target.value;
        this.setState({ filterStatus });
    }

    handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        this.setState({
            searchValue,
            currentPage: 1, // Reset currentPage when searching
        });
    };

    render() {
        const { nhanVienQuyen1, itemsPerPage, currentPage, filterStatus, searchValue } = this.state;

        // Filter employees based on filterStatus
        const filteredEmployees = nhanVienQuyen1.filter((employee) => {
            if (filterStatus === 'all') {
                return true;
            } else if (filterStatus === 'active') {
                return employee.trangThai === true;
            } else {
                return employee.trangThai === false;
            }
        });

        // Apply the search filter on top of other filters
        const searchFilteredEmployees = filteredEmployees.filter((employee) => {
            const { maTaiKhoan, email, thongTinNguoiDung } = employee;
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
                    <h1>Nhân viên</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Color</li>
                        </ol>
                    </nav>
                </div>

                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách nhân viên <span>| </span></h5>
                                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <button onClick={this.add} className='btn btn-success'>
                                                    Tạo tài khoản
                                                </button>
                                            </div>
                                            <div className="search-container">
                                                <input
                                                    type="text"
                                                    placeholder="Tìm kiếm theo tên, mã, SDT, hoặc email"
                                                    value={searchValue}
                                                    onChange={this.handleSearch}
                                                    style={{
                                                        padding: '10px',
                                                        width: '300px',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '5px',
                                                    }}
                                                />
                                            </div>

                                            <div className="filter-container" style={{ display: 'flex' }}>
                                                <div style={{ marginRight: '10px' }}>
                                                    <input
                                                        type="radio"
                                                        id="filterAll"
                                                        name="filterStatus"
                                                        value="all"
                                                        checked={filterStatus === 'all'}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                    <label
                                                        htmlFor="filterAll"
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '8px 12px',
                                                            borderRadius: '5px',
                                                            backgroundColor: '#fff',
                                                            color: '#333',
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                        }}
                                                    >
                                                        Tất cả
                                                    </label>
                                                </div>

                                                <div style={{ marginRight: '10px' }}>
                                                    <input
                                                        type="radio"
                                                        id="filterActive"
                                                        name="filterStatus"
                                                        value="active"
                                                        checked={filterStatus === 'active'}
                                                        onChange={this.handleFilterChange}
                                                    />
                                                    <label
                                                        htmlFor="filterActive"
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '8px 12px',
                                                            borderRadius: '5px',
                                                            backgroundColor: '#fff',
                                                            color: 'green',
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                        }}
                                                    >
                                                        Đang làm
                                                    </label>
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
                                                    <label
                                                        htmlFor="filterInactive"
                                                        style={{
                                                            cursor: 'pointer',
                                                            padding: '8px 12px',
                                                            borderRadius: '5px',
                                                            backgroundColor: '#fff',
                                                            color: 'red',
                                                            transition: 'background-color 0.3s, color 0.3s',
                                                        }}
                                                    >
                                                        Nghỉ việc
                                                    </label>
                                                </div>
                                            </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Mã NV</th>
                                                    <th>Email</th>
                                                    <th>SDT</th>
                                                    <th>Tên</th>
                                                    <th>Ảnh</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                {currentItems.map((tk, index) => (
                                                    <tr key={tk.id}>
                                                        <td>{tk.maTaiKhoan}</td>
                                                        <td>{tk.email}</td>
                                                        <td>{tk.thongTinNguoiDung.sdt}</td>
                                                        <td>{tk.thongTinNguoiDung.ten}</td>

                                                        <td>
                                                            {tk.anh && <img src={`/niceadmin/img/${tk.anh}`} width="100px" height="100px" />}

                                                        </td>
                                                        <td>
                                                          <span style={{ color: tk.trangThai ? 'green' : 'red' }}>
                                                                  {tk.trangThai ? 'Đang làm' : 'Nghỉ việc'}
                                                          </span>
                                                        </td>
                                                        <td><label className="switch">
                                                            <input
                                                                type="checkbox"
                                                                checked={tk.trangThai === true}
                                                                onChange={() => this.toggleTaiKhoan(tk.id, tk.trangThai)}
                                                            />

                                                            <span className="slider round"></span>
                                                        </label></td>

                                                        {/*<td>  <button onClick={() => this.delete(tk.id)} className='btn btn-danger'>Delete</button>  </td>*/}
                                                        <td> <button onClick={() => this.detail(tk.id)} className='btn btn-primary'>Detail</button></td>

                                                    </tr>
                                                ))}


                                                </tbody>
                                            </table>
                                            {/* Pagination component */}
                                            <ul className="pagination justify-content-center">
                                                {Array.from({ length: Math.ceil(nhanVienQuyen1.length / itemsPerPage) }, (_, i) => (
                                                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
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

                </section>
            </div>
        );
    }
}

export default NhanVienComponent;