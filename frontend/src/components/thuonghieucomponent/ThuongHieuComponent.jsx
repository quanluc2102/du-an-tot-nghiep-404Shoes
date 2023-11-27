import React, { Component } from 'react';
import thuonghieuservice from '../../services/thuonghieuservice/thuonghieuservice';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import './thuonghieucom.css'
class ThuongHieuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thuongHieu: [],
            pageCount: 0,
            thuongHieuAdd: {
                ten: '',
                trangThai: '',
            },
            thuongHieuUpdate: {
                id: this.props.match.params.id,
                ten: '',
                trangThai: '',
            },
            errorsAdd: {
                ten: '',
                trangThai: '',
            },
            errorsUpdate: {
                ten: '',
                trangThai: '',
            },
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount() {
        this.loadThuongHieuData(0);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadThuongHieuData();
        }
    }

    loadPageData(pageNumber) {
        thuonghieuservice.getThuongHieu(pageNumber).then(res => {
            this.setState({
                thuongHieu: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    loadThuongHieuData(pageNumber) {
        thuonghieuservice.getThuongHieu(pageNumber).then(res => {
            this.setState({
                thuongHieu: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            thuonghieuservice.getThuongHieuById(id).then((res) => {
                this.setState({ thuongHieuUpdate: res.data });
            });
        }
    }


    delete(id) {
        thuonghieuservice.deleteThuongHieu(id).then((res) => {
            this.setState({ thuongHieu: this.state.thuongHieu.filter(thuongHieu => thuongHieu.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn thêm thương hiệu?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        e.preventDefault();
        let thuongHieu = { ten: this.state.thuongHieuAdd.ten, trangThai: this.state.thuongHieuAdd.trangThai }

        if (!this.state.thuongHieuAdd.ten) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên màu không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.thuongHieuAdd.ten)) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "Tên phải là chữ!" } });
            return;
        }
        else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, ten: "" } });
        }


        if (!this.state.thuongHieuAdd.trangThai) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "" } });
        }

        thuonghieuservice.createThuongHieu(thuongHieu).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let thuongHieuMoi = res.data;
                this.setState(prevState => ({
                    thuongHieu: [...prevState.thuongHieu, thuongHieuMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm thương hiệu.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
            toast.error("Lỗi: " + error.data); // Hiển thị lỗi bằng Toast
        });

    }
    update = (e) => {
        const confirmed = window.confirm('Bạn có chắc chắn muốn sửa thương hiệu?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        e.preventDefault();
        let thuongHieu = { giaTri: this.state.thuongHieuUpdate.giaTri, ten: this.state.thuongHieuUpdate.ten, trangThai: this.state.thuongHieuUpdate.trangThai }
        console.log('nsx' + JSON.stringify(thuongHieu));
        let id = this.state.thuongHieuUpdate.id;

        if (!this.state.thuongHieuUpdate.ten) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên thương hiệu không được bỏ trống!" } });
            return;
        } else if (!isNaN(this.state.thuongHieuUpdate.ten)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "Tên phải là chữ!" } });
            return;
        }
        else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, ten: "" } });
        }


        if (!this.state.thuongHieuUpdate.trangThai) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "" } });
        }

        thuonghieuservice.updatethuongHieu(thuongHieu, this.state.thuongHieuUpdate.id).then((res) => {
            let thuongHieuCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                thuongHieu: prevState.thuongHieu.map(th =>
                    th.id === thuongHieuCapNhat.id ? thuongHieuCapNhat : th
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/thuongHieudetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            thuongHieuAdd: {
                ...prevState.thuongHieuAdd,
                ten: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, ten: "" };
        this.setState({ errorsAdd: errorsAdd });
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            thuongHieuAdd: {
                ...prevState.thuongHieuAdd,
                trangThai: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, trangThai: "" };
        this.setState({ errorsAdd: errorsAdd });
    }
    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            thuongHieuUpdate: {
                ...prevState.thuongHieuUpdate,
                ten: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, ten: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            thuongHieuUpdate: {
                ...prevState.thuongHieuUpdate,
                trangThai: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, trangThai: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }

    toggleThuongHieu(id, currentTrangThai) {
        const confirmed = window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        const newTrangThai = currentTrangThai === 0 ? 1 : 0; // Chuyển đổi trạng thái
        thuonghieuservice.updateThuongHieuTrangThai({ trangThai: newTrangThai }, id).then((res) => {
            let thuongHieuCapNhat = res.data;
            this.setState(prevState => ({
                thuongHieu: prevState.thuongHieu.map(th =>
                    th.id === thuongHieuCapNhat.id ? thuongHieuCapNhat : th
                )
            }));
        });
    }


    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Thương hiệu</h1>
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

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách thương hiệu <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>Thương hiệu</th>
                                                        <th>Trạng thái</th>
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
                                                        this.state.thuongHieu.map(
                                                            th =>
                                                                <tr key={th.id}>
                                                                    <td>{th.ten}</td>
                                                                    <td><label className="switch">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={th.trangThai === 0}
                                                                            onChange={() => this.toggleThuongHieu(th.id, th.trangThai)}
                                                                        />

                                                                        <span className="slider round"></span>
                                                                    </label></td>
                                                                    <td>
                                                                        {/*<button onClick={() => this.delete(th.id)} className='btn btn-danger'>Xóa</button>*/}
                                                                        <button onClick={() => this.detail(th.id)} className='btn btn-primary'>Chi tiết</button>
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
                                    <h5 className="card-title">Thao tác <span>|</span></h5>

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
                                        {/*<li className="nav-item" role="presentation">*/}
                                        {/*    <button className="nav-link" id="contact-tab" data-bs-toggle="tab"*/}
                                        {/*        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"*/}
                                        {/*        aria-selected="false">Detail*/}
                                        {/*    </button>*/}
                                        {/*</li>*/}
                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className={`form-control ${this.state.errorsUpdate.ten ? 'is-invalid' : ''}`} name="ten" value={this.state.thuongHieuUpdate.ten} onChange={this.thayDoiTenUpdate} />
                                                    {this.state.errorsUpdate.ten && <div className="text-danger">{this.state.errorsUpdate.ten}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.thuongHieuUpdate.trangThai} className={`form-control ${this.state.errorsUpdate.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value=''>Chọn trạng thái</option>
                                                        <option value="0">Hoạt động</option>
                                                        <option value="1">Không hoạt động</option>
                                                    </select>
                                                    {this.state.errorsUpdate.trangThai && <div className="text-danger">{this.state.errorsUpdate.trangThai}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className={`form-control ${this.state.errorsAdd.ten ? 'is-invalid' : ''}`} name="ten" onChange={this.thayDoiTenAdd} />
                                                    {this.state.errorsAdd.ten && <div className="text-danger">{this.state.errorsAdd.ten}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className={`form-control ${this.state.errorsAdd.trangThai ? 'is-invalid' : ''}`} onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value=''>Chọn trạng thái</option>
                                                        <option value="0">Hoạt động</option>
                                                        <option value="1">Không hoạt động</option>
                                                    </select>
                                                    {this.state.errorsAdd.trangThai && <div className="text-danger">{this.state.errorsAdd.trangThai}</div>}

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
        )
    }

}
export default ThuongHieuComponent