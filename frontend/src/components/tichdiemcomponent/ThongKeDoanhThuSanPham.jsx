// ThongKeDoanhThuSanPham.js

import React, { Component } from 'react';
import thongkeservice from '../../services/thongkeservice/thongkeservice';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';

class ThongKeDoanhThuSanPham extends Component{
    constructor(props) {
        super(props);
        this.state = {
            thongKeSanPham: [],
        };
    }

    componentDidMount() {
        // Gọi API và cập nhật state khi dữ liệu được trả về
        thongkeservice.getThongKeSanPham("2023-01-01", "2023-12-31")
            .then(data => {
                this.setState({ thongKeSanPham: data });
            })
            .catch(error => {
                // Xử lý lỗi nếu cần
                console.error("Error fetching data:", error);
            });
    }

    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Thống kê</h1>
                    <nav>
                        <ol className="breadcrumb">
                            {/*<li className="breadcrumb-item"><a href="index.html">Home</a></li>*/}
                            {/*<li className="breadcrumb-item active">Overview</li>*/}
                            {/*<li className="breadcrumb-item active">Color</li>*/}
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
                                            <h5 className="card-title">Biểu đồ thống kê doanh thu theo sản phẩm <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Số lượng đã bán</th>
                                                    <th>Tổng tiền</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.thongKeSanPham.map((th, index) => (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{th[0]}</td>
                                                        <td>{th[1]}</td>
                                                        <td>{th[2]}</td>
                                                    </tr>
                                                ))}

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


                        <div className="col-lg-12">


                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Bảng thống kê theo sản phẩm <span>|</span></h5>




                                    <table className="table table-borderless datatable">
                                        <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Sản phẩm</th>
                                            <th>Số lượng đã bán</th>
                                            <th>Tổng tiền</th>
                                        </tr>
                                        </thead>
                                        {/* </tr>
                                                    <tr>
                                                        <td>${mau.id}</td>
                                                        <td>${mau.name}</td>

                                                        <td>
                                                            <a href="/color/delete/${mau.id}" className="btn btn-danger" onclick="return confirm('Bạn chắc chắn có muốn xóa??')" style="text-decoration: none;color: white"><i className='bx bx-trash'></i></a>
                                                            <a href="/color/detail/${mau.id}" className="btn btn-success" style="text-decoration: none;color: white; margin-top: 5px" ><i className='bi bi-arrow-repeat'></i></a>
                                                        </td>
                                                    </tr> */}
                                        <tbody>
                                        {this.state.thongKeSanPham.map((th, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{th[0]}</td>
                                                <td>{th[1]}</td>
                                                <td>{th[2]}</td>
                                            </tr>
                                        ))}
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

                </section>
            </div>
        )
    }

}
export default ThongKeDoanhThuSanPham;
