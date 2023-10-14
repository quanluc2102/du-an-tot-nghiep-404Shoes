import React, { Component } from 'react';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";

class TaiKhoanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: [],
            taiKhoanAdd: {
                username: '',
                email: '',
                ten: '',
                diaChi: '',
                ngayTao: '',
                ngayCapNhat: '',
                password: '',
                anh: '',
                sdt: '',
                trangThai: ''
            },
            taiKhoanUpdate: {
                id: this.props.match.params.id,
                username: '',
                email: '',
                ten: '',
                diaChi: '',
                ngayTao: '',
                ngayCapNhat: '',
                password: '',
                anh: '',
                sdt: '',
                trangThai: ''
            },
        }
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiUsernameAdd = this.thayDoiUsernameAdd.bind(this);
        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);
        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);
        this.thayDoiDiaChiAdd= this.thayDoiDiaChiAdd.bind(this);
        this.thayDoiNgayTaoAdd = this.thayDoiNgayTaoAdd.bind(this);
        this.thayDoiNgayCapNhatAdd = this.thayDoiNgayCapNhatAdd.bind(this);
        this.thayDoiPasswordAdd = this.thayDoiPasswordAdd.bind(this);
        this.thayDoiAnhAdd = this.thayDoiAnhAdd.bind(this);
        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiUsernameUpdate = this.thayDoiUsernameUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);
        this.thayDoiNgayTaoUpdate = this.thayDoiNgayTaoUpdate.bind(this);
        this.thayDoiNgayCapNhatUpdate = this.thayDoiNgayCapNhatUpdate.bind(this);
        this.thayDoiPasswordUpdate = this.thayDoiPasswordUpdate.bind(this);
        this.thayDoiAnhUpdate = this.thayDoiAnhUpdate.bind(this);
        this.thayDoiSdtUpdate = this.thayDoiSdtUpdate.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount() {
        this.loadTaiKhoanData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadTaiKhoanData();
        }
    }

    loadTaiKhoanData() {
        taikhoanservice.getTaiKhoan().then((res) => {
            this.setState({ taiKhoan: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            taikhoanservice.getTaiKhoanById(id).then((res) => {
                this.setState({ taiKhoanUpdate: res.data });
            });
        }
    }


    delete(id) {
        taikhoanservice.deleteTaiKhoan(id).then((res) => {
            this.setState({ taiKhoan: this.state.taiKhoan.filter(taiKhoan => taiKhoan.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let taiKhoan = {
            username: this.state.taiKhoanAdd.username,
            email: this.state.taiKhoanAdd.email,
            ten: this.state.taiKhoanAdd.ten,
            diaChi: this.state.taiKhoanAdd.diaChi,
            ngayTao: this.state.taiKhoanAdd.ngayTao,
            ngayCapNhat: this.state.taiKhoanAdd.ngayCapNhat,
            password: this.state.taiKhoanAdd.password,
            anh: this.state.taiKhoanAdd.anh,
            sdt: this.state.taiKhoanAdd.sdt,
            trangThai: this.state.taiKhoanAdd.trangThai
        }
        taikhoanservice.addTaiKhoan(taiKhoan).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let taiKhoanMoi = res.data;
                this.setState(prevState => ({
                    taiKhoan: [...prevState.taiKhoan, taiKhoanMoi]
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
        let taiKhoan = {
            username: this.state.taiKhoanUpdate.username,
            email: this.state.taiKhoanUpdate.email,
            ten: this.state.taiKhoanUpdate.ten,
            diaChi: this.state.taiKhoanUpdate.diaChi,
            ngayTao: this.state.taiKhoanUpdate.ngayTao,
            ngayCapNhat: this.state.taiKhoanUpdate.ngayCapNhat,
            password: this.state.taiKhoanUpdate.password,
            anh: this.state.taiKhoanUpdate.anh,
            sdt: this.state.taiKhoanUpdate.sdt,
            trangThai: this.state.taiKhoanUpdate.trangThai }
        console.log('nsx' + JSON.stringify(taiKhoan));
        let id = this.state.taiKhoanUpdate.id;
        taikhoanservice.updateTaiKhoan( this.state.taiKhoanUpdate.id).then((res) => {
            let taiKhoanCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                taiKhoan: prevState.taiKhoan.map(tk =>
                    tk.id === taiKhoanCapNhat.id ? taiKhoanCapNhat : tk
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/taikhoandetail/${id}`);
    }

    thayDoiUsernameAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                username: event.target.value
            }
        }));
    }
    thayDoiEmailAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                email: event.target.value
            }
        }));
    }
    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiDiaChiAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                diaChi: event.target.value
            }
        }));
    }
    thayDoiNgayTaoAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                ngayTao: event.target.value
            }
        }));
    }
    thayDoiNgayCapNhatAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                ngayCapNhat: event.target.value
            }
        }));
    }
    thayDoiPasswordAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                password: event.target.value
            }
        }));
    }
    thayDoiAnhAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                anh: event.target.value
            }
        }));
    }
    thayDoiSdtAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                sdt: event.target.value
            }
        }));
    }
    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            taiKhoanAdd: {
                ...prevState.taiKhoanAdd,
                trangThai: event.target.value
            }
        }));
    }
    ///////
    thayDoiUsernameUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                username: event.target.value
            }
        }));
    }
    thayDoiEmailUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                email: event.target.value
            }
        }));
    }
    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiDiaChiUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                diaChi: event.target.value
            }
        }));
    }
    thayDoiNgayTaoUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                ngayTao: event.target.value
            }
        }));
    }
    thayDoiNgayCapNhatUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                ngayCapNhat: event.target.value
            }
        }));
    }
    thayDoiPasswordUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                password: event.target.value
            }
        }));
    }
    thayDoiAnhUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                anh: event.target.value
            }
        }));
    }
    thayDoiSdtUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                sdt: event.target.value
            }
        }));
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            taiKhoanUpdate: {
                ...prevState.taiKhoanUpdate,
                trangThai: event.target.value
            }
        }));
    }




    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Tài khoản</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Tài khoản</li>
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
                                            <h5 className="card-title">Tài khoản <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Tên</th>
                                                    <th>Địa chỉ</th>
                                                    <th>SDT</th>
                                                    <th>Ảnh</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.taiKhoan.map(
                                                        tk =>
                                                            <tr key={tk.id}>
                                                                <td>{tk.username}</td>
                                                                <td>{tk.ten}</td>
                                                                <td>{tk.diaChi}</td>
                                                                <td>{tk.sdt}</td>
                                                                <td>{tk.anh}</td>
                                                                <td>{tk.trangThai == true ? "Hoạt động" : "Ngừng hoạt động"}</td>
                                                                <td>
                                                                    <button onClick={() => this.delete(tk.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={() => this.detail(tk.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    Username :
                                                    <input className="form-control" name="username" value={this.state.taiKhoanUpdate.username} onChange={this.thayDoiUsernameUpdate} />
                                                </div>
                                                <div>
                                                    Email :
                                                    <input className="form-control" name="email" value={this.state.taiKhoanUpdate.email} onChange={this.thayDoiEmailUpdate} />
                                                </div>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" value={this.state.taiKhoanUpdate.ten} onChange={this.thayDoiTenUpdate} />
                                                </div>
                                                <div>
                                                    Địa chỉ :
                                                    <input className="form-control" name="diaChi" value={this.state.taiKhoanUpdate.diaChi} onChange={this.thayDoiDiaChiUpdate} />
                                                </div>
                                                <div>
                                                    Ngày cập nhật :
                                                    <input className="form-control" name="ngayCapNhat" type="date"  value={this.state.taiKhoanUpdate.ngayCapNhat} onChange={this.thayDoiNgayCapNhatUpdate} />
                                                </div>
                                                <div>
                                                    Password :
                                                    <input className="form-control" name="password" value={this.state.taiKhoanUpdate.password} onChange={this.thayDoiPasswordUpdate} />
                                                </div>
                                                <div>
                                                    Ảnh :
                                                    <input className="form-control" name="anh" value={this.state.taiKhoanUpdate.anh} onChange={this.thayDoiAnhUpdate} />
                                                </div>
                                                <div>
                                                    SDT :
                                                    <input className="form-control" name="sdt" value={this.state.taiKhoanUpdate.sdt} onChange={this.thayDoiSdtUpdate} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.taiKhoanUpdate.trangThai} className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value='true'>Hoạt động</option>
                                                        <option value="false">Ngừng hoạt động</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Username :
                                                    <input className="form-control" name="username" onChange={this.thayDoiUsernameAdd} />
                                                </div>
                                                <div>
                                                    Email :
                                                    <input className="form-control" name="email" onChange={this.thayDoiEmailAdd} />
                                                </div>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" onChange={this.thayDoiTenAdd} />
                                                </div>
                                                <div>
                                                    Địa chỉ :
                                                    <input className="form-control" name="diaChi" onChange={this.thayDoiDiaChiAdd} />
                                                </div>
                                                <div>
                                                    Ngày tạo :
                                                    <input className="form-control" name="ngayTao" type="date" onChange={this.thayDoiNgayTaoAdd} />
                                                </div>

                                                <div>
                                                    Password :
                                                    <input className="form-control" name="password" onChange={this.thayDoiPasswordAdd} />
                                                </div>
                                                <div>
                                                    Ảnh :
                                                    <input className="form-control" name="anh" type="file" onChange={this.thayDoiAnhAdd} />
                                                </div>
                                                <div>
                                                    SDT :
                                                    <input className="form-control" name="sdt" onChange={this.thayDoiSdtAdd} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value='true'>Hoạt động</option>
                                                        <option value="false">Ngừng hoạt động</option>
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
export default TaiKhoanComponent