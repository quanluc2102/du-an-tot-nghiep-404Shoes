import React, { Component } from 'react';
import phanquyenservice from "../../services/PhanQuyen/phanquyenservice";
import ReactPaginate from 'react-paginate';

class PhanQuyenComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            phanQuyen: [],
            taiKhoan: [],
            quyen: [],
            pageCount: 0,
            phanQuyenAdd: {
                taiKhoan: '',
                quyen: '',
            },
            phanQuyenUpdate: {
                taiKhoan: '',
                quyen: '',
            },
            errorAdd: {
                taiKhoan: '',
                quyen: '',
            },
            errorUpdate: {
                taiKhoan: '',
                quyen: '',
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTaiKhoanAdd = this.thayDoiTaiKhoanAdd.bind(this);
        this.thayDoiQuyenAdd = this.thayDoiQuyenAdd.bind(this);
        this.thayDoiTaiKhoanUpdate = this.thayDoiTaiKhoanUpdate.bind(this);
        this.thayDoiQuyenUpdate = this.thayDoiQuyenUpdate.bind(this);
    }

    loadPageData(pageNumber) {
        phanquyenservice.getPhanQuyen(pageNumber).then(res => {
            this.setState({
                phanQuyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber) {
        phanquyenservice.getTaiKhoan().then((res) => {
            this.setState({ taiKhoan: res.data.content });
        })
        phanquyenservice.getQuyen().then((res) => {
            this.setState({ quyen: res.data.content });
        })
        phanquyenservice.getPhanQuyen(pageNumber).then(res => {
            this.setState({
                phanQuyen: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
        const id = this.props.match.params.id;
        if (id) {
            phanquyenservice.getPhanQuyenById(this.state.id).then((res) => {
                this.setState({ phanQuyenUpdate: res.data });
            })
        }
    }
    delete(id) {
        phanquyenservice.deletePhanQuyen(id).then((res) => {
        });
        window.location.href = (`/phanquyen`);
    }
    add = (e) => {
        e.preventDefault();
        let phanQuyen = {
            taiKhoan: this.state.phanQuyenAdd.taiKhoan,
            quyen : this.state.phanQuyenAdd.quyen
        }
        if (!this.state.phanQuyenAdd.taiKhoan) {
            this.setState({ errorAdd: { ...this.state.errorAdd, taiKhoan: "Tai khoann không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, taiKhoan: "" } });
        }
        if (!this.state.phanQuyenAdd.quyen) {
            this.setState({ errorAdd: { ...this.state.errorAdd, quyen: "Quyèn không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, quyen: "" } });
        }
        phanquyenservice.createPhanQuyen(phanQuyen).then((res) => {
            window.location.href = (`/phanquyen`);
        })

    }
    update = (e) => {
        e.preventDefault();
        var phanQuyen = {
            taiKhoan: this.state.phanQuyenUpdate.taiKhoan,
            quyen : this.state.phanQuyenUpdate.quyen
        }
        let soLuong = parseInt(this.state.sanPhamChiTietUpdate.soLuong);
        if (!this.state.phanQuyenUpdate.taiKhoan) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, taiKhoan: "Tai khoann không được bỏ trống!" } });
            return;
        } else {
            this.setState({errorUpdate: { ...this.state.errorUpdate, taiKhoan: "" } });
        }
        if (!this.state.phanQuyenUpdate.quyen) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quyen: "Quyèn không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, quyen: "" } });
        }
        console.log('nsx' + JSON.stringify(phanQuyen));
        let id = this.state.phanQuyenUpdate.id;
        phanquyenservice.updatePhanQuyen(phanQuyen,id).then((res) => {
            window.location.href = (`/phanquyen`);
        })
    }
    detail(id) {
        window.location.href = (`/phanquyendetail/${id}`);
    }

    thayDoiTaiKhoanAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    taiKhoan: event.target.value
                }
            })
        );
    }
    thayDoiQuyenAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    quyen: event.target.value
                }
            })
        );
    }

    thayDoiTaiKhoanUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    taiKhoan: event.target.value
                }
            })
        );
    }
    thayDoiQuyenUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    quyen: event.target.value
                }
            })
        );
    }


    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Color</h1>
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

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Color <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Tài khoản</th>
                                                    <th>Quyền</th>
                                                    <th>Action</th>
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
                                                {
                                                    this.state.phanQuyen.map(
                                                        pq =>
                                                            <tr key={pq.id}>
                                                                <td>{pq.taiKhoan.username}</td>
                                                                <td>{pq.quyen.ten}</td>
                                                                <td>
                                                                    <button onClick={() => this.delete(pq.id)} className='btn btn-danger'>Xóa</button>

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


                        <div className="col-lg-4">


                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Sửa <span>| xx</span></h5>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                    aria-selected="true">Edit
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                    data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                    aria-selected="false">Add new
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                    data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                                    aria-selected="false">Detail
                                            </button>
                                        </li>
                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                             aria-labelledby="home-tab">
                                            <form>
                                                <div>
                                                    Tài khoản:
                                                    <select className="form-control" value={this.state.phanQuyenUpdate.taiKhoan} onChange={this.thayDoiTaiKhoanUpdate}>
                                                        {this.state.taiKhoan.map(
                                                            tk =>
                                                                <option key={tk.id} value={tk.id}>{tk.username}</option>
                                                        )}
                                                    </select>

                                                </div>
                                                <div>
                                                    Quyền :
                                                    <select className="form-control" value={this.state.phanQuyenUpdate.quyen} onChange={this.thayDoiQuyenUpdate}>
                                                        {this.state.quyen.map(
                                                            q =>
                                                                <option key={q.id} value={q.id} >{q.ten}</option>
                                                        )}
                                                    </select>
                                                    {/*{this.state.errorUpdate.quyen && <div className="text-danger">{this.state.errorUpdate.quyen}</div>}*/}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tài khoản:
                                                    <select className="form-control" value={this.state.phanQuyenAdd.taiKhoan} onChange={this.thayDoiTaiKhoanAdd}>
                                                        {this.state.taiKhoan.map(
                                                            tk =>
                                                                <option key={tk.id} value={tk.id}>{tk.username}</option>
                                                        )}
                                                    </select>
                                                    {/*{this.state.errorAdd.taiKhoan && <div className="text-danger">{this.state.errorAdd.taiKhoan}</div>}*/}
                                                </div>
                                                <div>
                                                    Quyền :
                                                    <select className="form-control" value={this.state.phanQuyenUpdate.quyen} onChange={this.thayDoiQuyenAdd}>
                                                        {this.state.quyen.map(
                                                            q =>
                                                                <option key={q.id} value={q.id} >{q.ten}</option>
                                                        )}
                                                    </select>
                                                    {/*{this.state.errorAdd.quyen && <div className="text-danger">{this.state.errorAdd.quyen}</div>}*/}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
                                            </form>
                                        </div>


                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <form className="row g-3" method="get">
                                                <div className="form-group">
                                                    {/* ID : ${mau.id} */}
                                                </div>
                                                <div className="form-group">
                                                    {/* Name : ${mau.name} */}
                                                </div>

                                            </form>
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

export default PhanQuyenComment;