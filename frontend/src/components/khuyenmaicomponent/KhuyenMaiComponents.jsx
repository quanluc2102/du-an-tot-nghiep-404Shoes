import React, { Component } from 'react';
import KhuyenMaiService from '../../services/khuyenmaiservice/KhuyenMaiService';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import './KhuyenMaiComponentStyle.css';

class KhuyenMaiComponents extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        khuyenMai: [],
        listThayThe: [],
        trangThai: '2',
        kieuKhuyenMai: '2',
        search: '',
        pageCount: 0,
        itemPerPage: 5,
        currentSearch: '',
        currentKieuKhuyenMai: '2',
        currentTrangThai: '2',
    };

    componentDidMount() {
        this.fetchData();
        this.setupAutoRefresh();
    }

    componentWillUnmount() {
        clearInterval(this.refreshIntervalId);
    }

    fetchData = () => {
        KhuyenMaiService.getKhuyenMaiAll().then((res) => {
            this.setState({
                listThayThe: res.data,
            });
            this.timKiemMoi();
        });
    };

    setupAutoRefresh = () => {
        this.refreshIntervalId = setInterval(this.fetchData, 1000);
    };

    timKiem = (e) => {
        this.setState(
            {
                search: e.target.value.toLowerCase(),
            },
            () => {
                this.timKiemMoi();
            }
        );

        if (e.target.value.length === 0) {
            this.setState({
                khuyenMai: this.state.listThayThe,
            });
        }
    };

    thayDoiKieuKhuyenMai = (e) => {
        this.setState(
            {
                kieuKhuyenMai: e.target.value,
            },
            () => {
                this.timKiemMoi();
            }
        );
    };

    thayDoiTrangThai = (e) => {
        this.setState(
            {
                trangThai: e.target.value,
            },
            () => {
                this.timKiemMoi();
            }
        );
    };

    timKiemMoi() {
        if (this.state.kieuKhuyenMai === '2' && this.state.trangThai === '2') {
            const filteredKhuyenMai = this.state.listThayThe.filter((khuyenMai) => {
                return (
                    khuyenMai.ma.toLowerCase().includes(this.state.search) ||
                    khuyenMai.ten.toLowerCase().includes(this.state.search) ||
                    khuyenMai.moTa.toLowerCase().includes(this.state.search)
                );
            });

            this.setState(
                {
                    khuyenMai: filteredKhuyenMai,
                    currentSearch: this.state.search,
                    currentKieuKhuyenMai: this.state.kieuKhuyenMai,
                    currentTrangThai: this.state.trangThai,
                },
                () => {
                    this.updateListKM();
                }
            );
        } else {
            const filteredKhuyenMai = this.state.listThayThe.filter((khuyenMai) => {
                return (
                    khuyenMai.kieuKhuyenMai === parseInt(this.state.kieuKhuyenMai) &&
                    (khuyenMai.ma.toLowerCase().includes(this.state.search) ||
                        khuyenMai.ten.toLowerCase().includes(this.state.search) ||
                        khuyenMai.moTa.toLowerCase().includes(this.state.search)) &&
                    khuyenMai.trangThai === parseInt(this.state.trangThai)
                );
            });

            this.setState(
                {
                    khuyenMai: filteredKhuyenMai,
                    currentSearch: this.state.search,
                    currentKieuKhuyenMai: this.state.kieuKhuyenMai,
                    currentTrangThai: this.state.trangThai,
                },
                () => {
                    this.updateListKM();
                }
            );
        }
    }

    updateListKM() {
        const startIndex = this.state.pageCount * this.state.itemPerPage;
        const endIndex = startIndex + this.state.itemPerPage;
        const listKM = this.state.khuyenMai.slice(startIndex, endIndex);
        this.setState({ khuyenMai: listKM });
    }

    handlePageClick = (data) => {
        this.setState({ pageCount: data.selected }, () => {
            this.updateListKM();
        });
    };

    detail = (id) => {
        window.location.href = `/khuyenMaiDetail/${id}`;
    };

    add = () => {
        window.location.href = `/khuyenMaiAdd`;
    };

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
                                                <div className="col-lg-12">
                                                    <h5 className="card-title" style={{ margin: 10 }}>
                                                        Lọc và tìm kiếm
                                                    </h5>
                                                    <label style={{ margin: 10 }}>Tìm kiếm</label>
                                                    <br />
                                                    <input
                                                        className="col-lg-8"
                                                        type="search"
                                                        name="search"
                                                        style={{ borderRadius: 5, height: 38, margin: 10 }}
                                                        placeholder="Search"
                                                        onChange={this.timKiem}
                                                    />
                                                    <button
                                                        className="btn btn-primary "
                                                        style={{ margin: 10 }}
                                                        onClick={this.add}
                                                    >
                                                        Thêm khuyến mãi
                                                    </button>
                                                    <div>
                                                        <label style={{ margin: 10 }}>Kiểu khuyến mãi</label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="2"
                                                                name="kieuKhuyenMai"
                                                                id="kieuKhuyenMai"
                                                                checked={this.state.kieuKhuyenMai === '2'}
                                                                onChange={this.thayDoiKieuKhuyenMai}
                                                            />{' '}
                                                            Tất cả
                                                        </label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="1"
                                                                name="kieuKhuyenMai"
                                                                id="kieuKhuyenMai"
                                                                checked={this.state.kieuKhuyenMai === '1'}
                                                                onChange={this.thayDoiKieuKhuyenMai}
                                                            />{' '}
                                                            Tiền
                                                        </label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="0"
                                                                name="kieuKhuyenMai"
                                                                id="kieuKhuyenMai"
                                                                checked={this.state.kieuKhuyenMai === '0'}
                                                                onChange={this.thayDoiKieuKhuyenMai}
                                                            />{' '}
                                                            Phần trăm
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label style={{ margin: 10 }}>Trạng thái</label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="2"
                                                                name="trangThai"
                                                                id="trangThai"
                                                                checked={this.state.trangThai === '2'}
                                                                onChange={this.thayDoiTrangThai}
                                                            />{' '}
                                                            Đã kết thúc
                                                        </label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="1"
                                                                name="trangThai"
                                                                id="trangThai"
                                                                checked={this.state.trangThai === '1'}
                                                                onChange={this.thayDoiTrangThai}
                                                            />{' '}
                                                            Đang diễn ra
                                                        </label>
                                                        <label style={{ margin: 10 }}>
                                                            <input
                                                                type="radio"
                                                                value="0"
                                                                name="trangThai"
                                                                id="trangThai"
                                                                checked={this.state.trangThai === '0'}
                                                                onChange={this.thayDoiTrangThai}
                                                            />{' '}
                                                            Chưa diễn ra
                                                        </label>
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
                                                        <td>
                                                            {moment(km.batDau).format(
                                                                'YYYY-MM-DD HH:mm:ss'
                                                            )}
                                                        </td>
                                                        <td>
                                                            {moment(km.ketThuc).format(
                                                                'YYYY-MM-DD HH:mm:ss'
                                                            )}
                                                        </td>
                                                        <td>{km.giamGia}</td>
                                                        <td>
                                                            {km.kieuKhuyenMai === 0
                                                                ? 'Phần trăm'
                                                                : km.kieuKhuyenMai === 1
                                                                    ? 'Tiền'
                                                                    : 'Khuyến mãi khác'}
                                                        </td>
                                                        <td>{km.dieuKien}</td>
                                                        <td>{km.soLuong}</td>
                                                        <td className={km.trangThai===0?'badge bg-warning text-dark':km.trangThai===1?'badge bg-success':'badge bg-danger'}>
                                                            {km.trangThai === 0
                                                                ? 'Chưa diễn ra'
                                                                : km.trangThai === 1
                                                                    ? 'Đang diễn ra'
                                                                    : 'Đã kết thúc'}
                                                        </td>
                                                        <td>
                                                            <button
                                                                onClick={() => this.detail(km.id)}
                                                                className="btn btn-info"
                                                            >
                                                                <span className="bi bi-info-circle"></span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <div className="pagination-container">
                                                <ReactPaginate
                                                    previousLabel={'<'}
                                                    nextLabel={'>'}
                                                    breakLabel={'...'}
                                                    breakClassName={'page-item'}
                                                    breakLinkClassName={'page-link'}
                                                    pageClassName={'page-item'}
                                                    pageLinkClassName={'page-link'}
                                                    previousClassName={'page-item'}
                                                    previousLinkClassName={'page-link'}
                                                    nextClassName={'page-item'}
                                                    nextLinkClassName={'page-link'}
                                                    pageCount={Math.ceil(
                                                        this.state.listThayThe.length /
                                                        this.state.itemPerPage
                                                    )}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={this.handlePageClick}
                                                    containerClassName={
                                                        'pagination justify-content-center'
                                                    } // added justify-content-center for center alignment
                                                    activeClassName={'active'}
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
