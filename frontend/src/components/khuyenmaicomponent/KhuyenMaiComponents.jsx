import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import ReactPaginate from "react-paginate";
import {toast} from 'react-toastify';
import moment from 'moment';
class KhuyenMaiComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            khuyenMai: [],
            pageCount: 0,
        }
        // this.detail = this.detail.bind(this);
    }

    componentDidMount() {
        this.loadKhuyenMaiData();
        // KhuyenMaiService.getKhuyenMai().then((res) => {
        //     this.setState({khuyenMai: res.data})
        // });
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadKhuyenMaiData();
        }
    }
    loadPageData(pageNumber){
        KhuyenMaiService.getKhuyenMai(pageNumber).then(res => {
            this.setState({
                khuyenMai: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }
    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };
    loadKhuyenMaiData(pageNumber) {
        KhuyenMaiService.getKhuyenMai(pageNumber).then(res => {
            this.setState({
                khuyenMai: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(id).then((res) => {
                this.setState({ khuyenMaiUpdate: res.data });
            });
        }
    }
    detail(id) {
        window.location.href = (`/khuyenMaidetail/${id}`);

    }

    add(id) {
        window.location.href = (`/khuyenmaiadd`);

    }

    render() {
        return (

            <div>
                <div className="pagetitle">
                    <h1>Khuyến mãi</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Khuyến mãi</li>
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
                                            <h5 className="card-title">Khuyến mãi <span>| </span></h5>
                                            {/*<button onClick={this.add} className='btn btn-success'>Tạo voucher</button>*/}
                                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                <button onClick={this.add} className='btn btn-success'>
                                                    Tạo voucher
                                                </button>
                                            </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Mô tả</th>
                                                    <th>Bắt đầu</th>
                                                    <th>Kết thúc</th>
                                                    <th>Giảm giá</th>
                                                    <th>Kiểu khuyến mãi</th>
                                                    <th>Điều kiện</th>
                                                    <th>Số lượng</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                {
                                                    this.state.khuyenMai.map(
                                                        km =>

                                                            <tr key={km.id}>
                                                                <td>{km.ma}</td>
                                                                <td>{km.ten}</td>
                                                                <td>{km.moTa}</td>
                                                                <td>{moment(km.batDau).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                                <td>{moment(km.ketThuc).format('YYYY-MM-DD HH:mm:ss')}</td>
                                                                <td>{km.giamGia}</td>
                                                                <td>{km.kieuKhuyenMai === 0 ? "Phần trăm" : "Tiền"}</td>
                                                                <td>{km.dieuKien}</td>
                                                                <td>{km.soLuong}</td>
                                                                <td>{km.trangThai === 0 ? "Đã diễn ra" : km.trangThai === 1 ? "Sắp diễn ra" : "Đang diễn ra"}</td>
                                                                <td>
                                                                    {/*<button onClick={() => this.delete(km.id)}*/}
                                                                    {/*        className='btn btn-danger'>Xóa*/}
                                                                    {/*</button>*/}
                                                                    <button onClick={() => this.detail(km.id)}
                                                                            className='btn btn-primary'>Chi tiết
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                    )
                                                }

                                                </tbody>


                                            </table>
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

                </section>
            </div>
        );
    }
}

export default KhuyenMaiComponents;