import React, { Component } from 'react';
import { toast } from 'react-toastify';
import kichthuocmausacservice from '../../services/kichthuocmausacservice/kichthuocmausacservice';
import ReactPaginate from 'react-paginate';
// import KichThuocService1 from '../../services/sanphamservice/KichThuocService1';
// import xuatxuservice from '../../services/xuatxuservice/xuatxuservice';

class KichThuocMauSacComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kichThuocMauSac: [],
            pageCount: 0,
            kichThuocMauSacAdd: {
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            kichThuocMauSacUpdate: {
                id: this.props.match.params.id,
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            errorsAdd: {
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            errorsUpdate: {
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            kichThuocs: [],  // Thêm danh sách Kích thước vào state
            mauSacs: [],  // Thêm danh sách Thương Hiệu vào state
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiKichThuocIdAdd = this.thayDoiKichThuocIdAdd.bind(this);
        this.thayDoiMauSacIdAdd = this.thayDoiMauSacIdAdd.bind(this);
        this.thayDoiKichThuocIdUpdate = this.thayDoiKichThuocIdUpdate.bind(this);
        this.thayDoiMauSacIdUpdate = this.thayDoiMauSacIdUpdate.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount() {
        this.loadKichThuocMauSacData();
        this.loadMauSacData();
        this.loadKichThuocData(); // Thêm dòng này để tải danh sách Kích thước
    }

    loadPageData(pageNumber) {
        kichthuocmausacservice.getKichThuocMauSac(pageNumber).then(res => {
            this.setState({
                kichThuocMauSac: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };


    loadKichThuocData() {
        // Gọi API hoặc lấy danh sách Kích thước từ dữ liệu và lưu vào state
        kichthuocmausacservice.getKichThuoc().then((res) => {
            this.setState({ kichThuocs: res.data.content });
        });
    }

    loadMauSacData() {
        // Gọi API hoặc lấy danh sách Thương Hiệu từ dữ liệu và lưu vào state
        kichthuocmausacservice.getMauSac().then((res) => {
            this.setState({ mauSacs: res.data.content });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadKichThuocMauSacData();
        }
    }

    loadKichThuocMauSacData(pageNumber) {
        kichthuocmausacservice.getKichThuocMauSac(pageNumber).then(res => {
            this.setState({
                kichThuocMauSac: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });

        const id = this.props.match.params.id;
        if (id) {
            kichthuocmausacservice.getKichThuocMauSacById(id).then((res) => {
                this.setState({ kichThuocMauSacUpdate: res.data });
            });
        }
    }


    delete(id) {
        kichthuocmausacservice.deleteKichThuocMauSac(id).then((res) => {
            console.log(res); // Xem phản hồi từ API
            if (res.status === 200) { // Kiểm tra nếu phản hồi là thành công
                this.setState({
                    kichThuocMauSac: this.state.kichThuocMauSac.filter(kichThuocMauSac => kichThuocMauSac.id !== id)
                });
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi xóa danh mục.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
            }
        }).catch(error => {
            toast.error("Lỗi: " + (error.response && error.response.data ? error.response.data : "Có lỗi xảy ra khi xóa danh mục."));
        });
    }

    add = (e) => {
        e.preventDefault();
        let kichThuocMauSac = {
            mauSacId: this.state.kichThuocMauSacAdd.mauSacId,
            kichThuocId: this.state.kichThuocMauSacAdd.kichThuocId,
            trangThai: this.state.kichThuocMauSacAdd.trangThai
        };

        console.log(kichThuocMauSac)

        if (!this.state.kichThuocMauSacAdd.kichThuocId.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, kichThuocId: "Màu sắc không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, kichThuocId: "" } });
        }

        if (!this.state.kichThuocMauSacAdd.mauSacId.trim()) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, mauSacId: "Màu sắc không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, mauSacId: "" } });
        }



        if (!this.state.kichThuocMauSac.trangThai) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, trangThai: "" } });
        }

        kichthuocmausacservice.createKichThuocMauSac(kichThuocMauSac).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let kichThuocMauSacMoi = res.data;
                this.setState(prevState => ({
                    kichThuocMauSac: [...prevState.kichThuocMauSac, kichThuocMauSacMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm danh mục.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        });

    }
    update = (e) => {
        e.preventDefault();
        let kichThuocMauSac = {
            mauSacId: this.state.kichThuocMauSacUpdate.mauSacId,
            kichThuocId: this.state.kichThuocMauSacUpdate.kichThuocId,
            trangThai: this.state.kichThuocMauSacUpdate.trangThai
        };
        console.log('nsx' + JSON.stringify(kichThuocMauSac));
        // let id = this.state.kichThuocMauSacUpdate.id;

        if (!this.state.kichThuocMauSacUpdate.kichThuocId) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, kichThuocId: "Kích thước không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, kichThuocId: "" } });
        }
        if (!this.state.kichThuocMauSacUpdate.mauSacId) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, mauSacId: "Màu sắc không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, mauSacId: "" } });
        }
        if (!this.state.kichThuocMauSacUpdate.trangThai) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "Trạng thái không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, trangThai: "" } });
        }

        kichthuocmausacservice.updateKichThuocMauSac(kichThuocMauSac, this.state.kichThuocMauSacUpdate.id).then((res) => {
            let kichThuocMauSacCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                kichThuocMauSac: prevState.kichThuocMauSac.map(dm =>
                    dm.id === kichThuocMauSacCapNhat.id ? kichThuocMauSacCapNhat : dm
                )
            }));
        })

    }
    detail(id) {
        const spthSelected = this.state.kichThuocMauSac.find(ktms => ktms.id === id);
        console.log(spthSelected); // Thêm dòng này
        if (spthSelected) {
            this.props.history.push(`/kichthuocmausacdetail/${id}`)
            this.setState({
                kichThuocMauSacUpdate: {
                    id: spthSelected.id,
                    mauSacId: spthSelected.mauSac.id,
                    kichThuocId: spthSelected.kichThuoc.id,
                    trangThai: spthSelected.trangThai,
                },
            });

        }

    }

    thayDoiKichThuocIdAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                kichThuocId: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, kichThuocId: "" };
        this.setState({ errorsAdd: errorsAdd });
    }

    thayDoiKichThuocIdUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                kichThuocId: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, kichThuocId: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                trangThai: event.target.value // Sửa ở đây
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, trangThai: "" };
        this.setState({ errorsAdd: errorsAdd });
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                trangThai: event.target.value // Sửa ở đây
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, trangThai: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }
    thayDoiMauSacIdAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                mauSacId: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, mauSacId: "" };
        this.setState({ errorsAdd: errorsAdd });
    }
    thayDoiMauSacIdUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                mauSacId: event.target.value // Sửa ở đây
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, mauSacId: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }




    render() {
        // console.log(this.state.kichThuocMauSacUpdate);
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
                                                        {/* <th>Tên</th> */}
                                                        {/* <th>Ngày tạo</th> */}
                                                        <th>Màu sắc</th>
                                                        <th>Kích thước </th>
                                                        <th>Trạng thái </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.kichThuocMauSac.map((ktms) => (
                                                        <tr key={ktms.id}>
                                                            <td>{ktms.mauSac.ten}</td>
                                                            {/* <td>{ktms.kt.ngayTao}</td> */}
                                                            <td>{ktms.kichThuoc.giaTri}</td>
                                                            <td>{ktms.trangThai}</td>
                                                            <td>
                                                                <button onClick={() => this.delete(ktms.id)} className='btn btn-danger'>Xóa</button>
                                                                <button onClick={() => this.detail(ktms.id)} className='btn btn-primary'>Chi tiết</button>
                                                            </td>
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
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Kích thước</label>
                                                    <select name="kichThuocId" value={this.state.kichThuocMauSacUpdate.kichThuocId} className={`form-control ${this.state.errorsUpdate.kichThuocId ? 'is-invalid' : ''}`} onChange={this.thayDoiKichThuocIdUpdate}>
                                                        <option value="">Chọn kích thước</option>
                                                        {this.state.kichThuocs.map((kt) => (
                                                            <option key={kt.id} value={kt.id}>
                                                                {kt.giaTri}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsUpdate.kichThuocId && <div className="text-danger">{this.state.errorsUpdate.kichThuocId}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label>Màu sắc</label>
                                                    <select name="mauSacId" value={this.state.kichThuocMauSacUpdate.mauSacId} className={`form-control ${this.state.errorsUpdate.mauSacId ? 'is-invalid' : ''}`} onChange={this.thayDoiMauSacIdUpdate}>
                                                        <option value="">Chọn Màu sắc</option>
                                                        {this.state.mauSacs.map((ms) => (
                                                            <option key={ms.id} value={ms.id}>
                                                                {ms.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsUpdate.mauSacId && <div className="text-danger">{this.state.errorsUpdate.mauSacId}</div>}

                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        // value={this.state.xuatXuUpdate.trangThai}
                                                        onChange={this.thayDoiTrangThaiUpdate}
                                                        className={`form-control ${this.state.errorsUpdate.trangThai ? 'is-invalid' : ''}`}
                                                    >
                                                        <option value='1'>Còn</option>
                                                        <option value="2">Ko còn</option>
                                                    </select>
                                                    {this.state.errorsUpdate.trangThai && <div className="text-danger">{this.state.errorsUpdate.trangThai}</div>}

                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Kích thước</label>
                                                    <select name="kichThuocId" className={`form-control ${this.state.errorsAdd.kichThuocId ? 'is-invalid' : ''}`} onChange={this.thayDoiKichThuocIdAdd}>
                                                        <option value="">Chọn Kích thước</option>
                                                        {this.state.kichThuocs.map((kt) => (
                                                            <option key={kt.id} value={kt.id}>
                                                                {kt.giaTri}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsAdd.kichThuocId && <div className="text-danger">{this.state.errorsAdd.kichThuocId}</div>}
                                                </div>

                                                <div className='form-group'>
                                                    <label>Màu sắc</label>
                                                    <select name="mauSacId" className={`form-control ${this.state.errorsAdd.mauSacId ? 'is-invalid' : ''}`} onChange={this.thayDoiMauSacIdAdd}>
                                                        <option value="">Chọn Màu sắc</option>
                                                        {this.state.mauSacs.map((ms) => (
                                                            <option key={ms.id} value={ms.id}>
                                                                {ms.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsAdd.mauSacId && <div className="text-danger">{this.state.errorsAdd.mauSacId}</div>}
                                                </div>

                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        // value={this.state.xuatXuUpdate.trangThai}
                                                        onChange={this.thayDoiTrangThaiAdd}
                                                        className={`form-control ${this.state.errorsAdd.trangThai ? 'is-invalid' : ''}`}
                                                    >
                                                        <option value='0'>Còn</option>
                                                        <option value="1">Ko còn</option>
                                                    </select>
                                                    {this.state.errorsAdd.trangThai && <div className="text-danger">{this.state.errorsAdd.trangThai}</div>}
                                                </div>

                                                <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
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
export default KichThuocMauSacComponent