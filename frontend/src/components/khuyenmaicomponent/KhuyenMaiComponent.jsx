import React, {Component} from "react";
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";



class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMai: [],
            khuyenMaiAdd: {
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: ''},
            khuyenMaiUpdate:{
                id:this.props.match.params.id,
                ten : '',
                moTa : '',
                batDau: '',
                ketThuc: '',
                giamGia : '',
                kieuKhuyenMai:''
            }
        }
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.update=this.update.bind(this);
        this.detail=this.detail.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiBatDauAdd=this.thayDoiBatDauAdd.bind(this);
        this.thayDoiKetThucAdd=this.thayDoiKetThucAdd.bind(this);
        this.thayDoiGiamGiaAdd=this.thayDoiGiamGiaAdd.bind(this);
        this.thayDoiKieuKhuyenMaiAdd=this.thayDoiKieuKhuyenMaiAdd.bind(this);
        this.thayDoiTenUpdate=this.thayDoiTenUpdate.bind(this);
        this.thayDoiMoTaUpdate=this.thayDoiMoTaUpdate.bind(this);
        this.thayDoiBatDauUpdate=this.thayDoiBatDauUpdate.bind(this);
        this.thayDoiKetThucUpdate=this.thayDoiKetThucUpdate.bind(this);
        this.thayDoiGiamGiaUpdate=this.thayDoiGiamGiaUpdate.bind(this);
        this.thayDoiKieuKhuyenMaiUpdate=this.thayDoiKieuKhuyenMaiUpdate.bind(this);
    }
    componentDidMount() {
        this.loadKhuyenMaiData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadKhuyenMaiData();
        }
    }

    loadKhuyenMaiData() {
        KhuyenMaiService.getKhuyenMai().then((res) => {
            this.setState({ khuyenMai: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(id).then((res) => {
                this.setState({ khuyenMaiUpdate: res.data });
            });
        }
    }


    delete(id) {
        KhuyenMaiService.deleteKhuyenMai(id).then((res) => {
            this.setState({ khuyenMai: this.state.khuyenMai.filter(khuyenMai => khuyenMai.id != id) });
        });
    }
    add = (e) => {
        e.preventDefault();
        let khuyenMai = { ten: this.state.khuyenMaiAdd.ten, trangThai: this.state.khuyenMaiAdd.trangThai }
        KhuyenMaiService.createKhuyenMai(khuyenMai).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let khuyenMaiMoi = res.data;
                this.setState(prevState => ({
                    khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm khuyến mãi.";
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
        let khuyenMai = { giaTri: this.state.khuyenMaiUpdate.giaTri, ten: this.state.khuyenMaiUpdate.ten, trangThai: this.state.khuyenMaiUpdate.trangThai }
        // console.log('nsx' + JSON.stringify(thuongHieu));
        let id = this.state.khuyenMaiUpdate.id;
        KhuyenMaiService.updateKhuyenMai(khuyenMai, this.state.khuyenMaiUpdate.id).then((res) => {
            let khuyenMaiCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                khuyenMai: prevState.khuyenMai.map(th =>
                    th.id === khuyenMaiCapNhat.id ? khuyenMaiCapNhat : th
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id) {
        window.location.href = (`/khuyenMaidetail/${id}`);
    }

    thayDoiTenAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiMoTaAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiBatDauAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiKetThucAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiGiamGiaAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiKieuKhuyenMaiAdd = (event) => {
        this.setState(prevState => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                ten: event.target.value
            }
        }));
    }
    thayDoiTenUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiMoTaUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiBatDauUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiKetThucUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
            }
        }));
    }

    thayDoiGiamGiaUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
            }
        }));
    }
    thayDoiKieuKhuyenMaiUpdate = (event) => {
        this.setState(prevState => ({
            khuyenMaiUpdate: {
                ...prevState.khuyenMaiUpdate,
                ten: event.target.value
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
                                            <h5 className="card-title">Khuyến mãi <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Tên</th>
                                                    <th>Mô tả</th>
                                                    <th>Bắt đầu</th>
                                                    <th>Kết thúc</th>
                                                    <th>Giảm giá</th>
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
                                                    this.state.khuyenMai.map(
                                                        km =>
                                                            <tr key={km.id}>
                                                                <td>{km.ten}</td>
                                                                <td>{km.moTa}</td>
                                                                <td>{km.batDau}</td>
                                                                <td>{km.ketThuc}</td>
                                                                <td>{km.giamGia}</td>
                                                                <td>
                                                                    <button onClick={() => this.delete(km.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={() => this.detail(km.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    Tên :
                                                    <input className="form-control" name="ten" value={this.state.khuyenMaiUpdate.ten} onChange={this.thayDoiTenUpdate} />
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className="form-control" name="moTa" value={this.state.khuyenMaiUpdate.moTa} onChange={this.thayDoiMoTaUpdate} />
                                                </div>

                                                <div>
                                                    Bắt đầu:
                                                    <input className="form-control" name="batDau" type="date"  value={this.state.khuyenMaiUpdate.batDau} onChange={this.thayDoiBatDauUpdate} />
                                                </div>
                                                <div>
                                                     Kết thúc:
                                                    <input className="form-control" name="ketThuc" type="date"  value={this.state.khuyenMaiUpdate.ketThuc} onChange={this.thayDoiKetThucUpdate} />
                                                </div>
                                                <div>
                                                    Giảm giá:
                                                    <input className="form-control" name="giamGia" value={this.state.khuyenMaiUpdate.giamGia} onChange={this.thayDoiGiamGiaUpdate} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Kiểu khuyến mãi</label>
                                                    <select name="kieuKhuyenMai" id="kieuKhuyenMai" value={this.state.khuyenMaiUpdate.kieuKhuyenMai} className="form-control" onChange={this.thayDoiKieuKhuyenMaiUpdate}>
                                                        <option value='1'>Phần trăm</option>
                                                        <option value="0">Tiền</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" value={this.state.khuyenMaiAdd.ten} onChange={this.thayDoiTenAdd} />
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className="form-control" name="moTa" value={this.state.khuyenMaiAdd.moTa} onChange={this.thayDoiMoTaUpdate} />
                                                </div>

                                                <div>
                                                    Bắt đầu:
                                                    <input className="form-control" name="batDau" type="date"  value={this.state.khuyenMaiAdd.batDau} onChange={this.thayDoiBatDauAdd} />
                                                </div>
                                                <div>
                                                    Kết thúc:
                                                    <input className="form-control" name="ketThuc" type="date"  value={this.state.khuyenMaiAdd.ketThuc} onChange={this.thayDoiKetThucAdd} />
                                                </div>
                                                <div>
                                                    Giảm giá:
                                                    <input className="form-control" name="giamGia" value={this.state.khuyenMaiAdd.giamGia} onChange={this.thayDoiGiamGiaAdd} />
                                                </div>
                                                <div className='form-group'>
                                                    <label>Kiểu khuyến mãi</label>
                                                    <select name="kieuKhuyenMai" id="kieuKhuyenMai" value={this.state.khuyenMaiAdd.kieuKhuyenMai} className="form-control" onChange={this.thayDoiKieuKhuyenMaiAdd}>
                                                        <option value='1'>Phần trăm</option>
                                                        <option value="0">Tiền</option>
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
export default KhuyenMaiComponent