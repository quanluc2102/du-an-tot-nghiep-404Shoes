import React, { Component } from 'react';
import mausacservice from '../../services/mausacservice/mausacservice';
import { toast } from 'react-toastify';

class MauSacComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mauSac: [],
            mauSacAdd: {
                giaTri: '',
                ten: '',
                trangThai: '',
            },
            mauSacUpdate: {
                id: this.props.match.params.id,
                giaTri: '',
                ten: '',
                trangThai: '',
            }
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
        this.thayDoiGiaTriUpdate = this.thayDoiGiaTriUpdate.bind(this);
        this.thayDoiGiaTriAdd = this.thayDoiGiaTriAdd.bind(this);
    }

    componentDidMount() {
        this.loadMauSacData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadMauSacData();
        }
    }

    loadMauSacData() {
        mausacservice.getMauSac().then((res) => {
            this.setState({ mauSac: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            mausacservice.getMauSacById(id).then((res) => {
                this.setState({ mauSacUpdate: res.data });
            });
        }
    }


    delete(id) {
        mausacservice.deleteMauSac(id).then((res) => {
            this.setState({ mauSac: this.state.mauSac.filter(mauSac => mauSac.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let mauSac = { giaTri: this.state.mauSacAdd.giaTri, ten: this.state.mauSacAdd.ten, trangThai: this.state.mauSacAdd.trangThai }
        mausacservice.createMauSac(mauSac).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let mauSacMoi = res.data;
                this.setState(prevState => ({
                    mauSac: [...prevState.mauSac, mauSacMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm danh mục.";
                alert("lỗi" + errorMessage) // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    update = (e) => {
        e.preventDefault();
        let mauSac = { giaTri: this.state.mauSacUpdate.giaTri, ten: this.state.mauSacUpdate.ten, trangThai: this.state.mauSacUpdate.trangThai }
        console.log('nsx' + JSON.stringify(mauSac));
        let id = this.state.mauSacUpdate.id;
        mausacservice.updateMauSac(mauSac, this.state.mauSacUpdate.id).then((res) => {
            let mauSacCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                mauSac: prevState.mauSac.map(ms =>
                    ms.id === mauSacCapNhat.id ? mauSacCapNhat : ms
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/mausacdetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            mauSacAdd: {
                ...prevState.mauSacAdd,
                ten: event.target.value
            }
        }));
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            mauSacAdd: {
                ...prevState.mauSacAdd,
                trangThai: event.target.value
            }
        }));
    }
    thayDoiGiaTriAdd = (event) => {
        this.setState(prevState => ({
            mauSacAdd: {
                ...prevState.mauSacAdd,
                giaTri: event.target.value
            }
        }));
    }
    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            mauSacUpdate: {
                ...prevState.mauSacUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiGiaTriUpdate = (event) => {
        this.setState(prevState => ({
            mauSacUpdate: {
                ...prevState.mauSacUpdate,
                giaTri: event.target.value
            }
        }));
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            mauSacUpdate: {
                ...prevState.mauSacUpdate,
                trangThai: event.target.value
            }
        }));
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
                                                        <th>Tên</th>
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
                                                        this.state.mauSac.map(
                                                            ms =>
                                                                <tr key={ms.id}>
                                                                    <td>{ms.giaTri}</td>
                                                                    <td>{ms.ten}</td>
                                                                    <td>{ms.trangThai == 1 ? "HD" : "Ko HD"}</td>
                                                                    <td>
                                                                        <button onClick={() => this.delete(ms.id)} className='btn btn-danger'>Xóa</button>
                                                                        <button onClick={() => this.detail(ms.id)} className='btn btn-primary'>Chi tiết</button>
                                                                    </td>
                                                                </tr>
                                                        )
                                                    }
                                                </tbody>


                                            </table>

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
                                                    Giá trị :
                                                    <input className="form-control" name="giaTri" value={this.state.mauSacUpdate.giaTri} onChange={this.thayDoiGiaTriUpdate} />
                                                </div>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" value={this.state.mauSacUpdate.ten} onChange={this.thayDoiTenUpdate} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.mauSacUpdate.trangThai} className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value='true'>Còn</option>
                                                        <option value="false">Ko còn</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Giá trị :
                                                    <input className="form-control" name="giaTri" onChange={this.thayDoiGiaTriAdd} />
                                                </div>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" onChange={this.thayDoiTenAdd} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value='true'>Còn</option>
                                                        <option value="false">Ko còn</option>
                                                    </select>
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
export default MauSacComponent