import React, {Component} from 'react';
import SanPhamChiTietService from "../../services/spctservice/SanPhamChiTietService";

class SanPhamCTComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            sanPhamId: '',
            kichThuocMauSacId: '',
            sanPhamChiTiet: [],
            sanPham:[],
            kichThuocMS:[],
            sanPhamChiTietAdd: {
                soLuong: '',
                trangThai: ''
            },
            sanPhamChiTietUpdate: {
                soLuong: '',
                trangThai: ''
            }
        }
        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.update=this.update.bind(this);
        this.detail=this.detail.bind(this);
        this.thayDoiSoLuongAdd=this.thayDoiSoLuongAdd.bind(this);
        this.thayDoiSanPhamAdd=this.thayDoiSanPhamAdd.bind(this);
        this.thayDoiKichThuocMauSacAdd=this.thayDoiKichThuocMauSacAdd.bind(this);
        this.thayDoiTrangThaiAdd=this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiSoLuongUpdate=this.thayDoiSoLuongUpdate.bind(this);
        this.thayDoiSanPhamUpdate=this.thayDoiSanPhamUpdate.bind(this);
        this.thayDoiKichThuocMauSacUpdate=this.thayDoiKichThuocMauSacUpdate.bind(this);
        this.thayDoiTrangThaiUpdate=this.thayDoiTrangThaiUpdate.bind(this);
    }
    componentDidMount() {
        SanPhamChiTietService.getKTMS().then((res)=>{
            this.setState({kichThuocMS:res.data});
        })
        SanPhamChiTietService.getSanPham().then((res)=>{
            this.setState({sanPham:res.data});
        })
        SanPhamChiTietService.getSanPhamChiTiet().then((res)=>{
            this.setState({sanPhamChiTiet:res.data});
        })
        const id = this.props.match.params.id;
        if (id) {
            SanPhamChiTietService.getSanPhamChiTietById(this.state.id).then((res)=>{
                this.setState({sanPhamChiTietUpdate:res.data});
            })
        }
    }
    delete(id){
        SanPhamChiTietService.deleteSanPhamChiTiet(id).then((res)=>{
        });
        window.location.href = (`/san_pham_chi_tiet`);
    }
    add = (e)=>{
        e.preventDefault();

        SanPhamChiTietService.addSanPhamChiTiet(this.state.sanPhamChiTietAdd,this.state.kichThuocMauSacId,this.state.sanPhamId).then((res)=>{
            window.location.href = (`/san_pham_chi_tiet`);
        })

    }
    update=(e)=>{
        e.preventDefault();
        var spct = {soLuong: this.state.sanPhamChiTietUpdate.soLuong,
            trangThai: this.state.sanPhamChiTietUpdate.trangThai}
        console.log('nsx' + JSON.stringify(spct));
        let id = this.state.sanPhamChiTietUpdate.id;
        SanPhamChiTietService.updateSanPhamChiTiet(id,this.state.kichThuocMauSacId,this.state.sanPhamId,spct).then((res)=>{
            window.location.href = (`/san_pham_chi_tiet`);
        })
    }
    detail(id){
        window.location.href = (`/san_pham_chi_tiet_detail/${id}`);
    }
    thayDoiSoLuongAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamChiTietAdd:{
                    ...prevState.sanPhamChiTietAdd,
                    soLuong:event.target.value
                }
            })
        );
    }
    thayDoiSanPhamAdd=(event)=>{
        this.setState({sanPhamId:event.target.value});
    }
    thayDoiKichThuocMauSacAdd=(event)=>{
        this.setState({kichThuocMauSacId:event.target.value});
    }
    thayDoiTrangThaiAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamChiTietAdd:{
                    ...prevState.sanPhamChiTietAdd,
                    trangThai:event.target.value
                }
            })
        );
    }
    thayDoiSoLuongUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamChiTietUpdate:{
                    ...prevState.sanPhamChiTietUpdate,
                    soLuong:event.target.value
                }
            })
        );
    }
    thayDoiSanPhamUpdate=(event)=>{
        this.setState({sanPhamId:event.target.value});
    }
    thayDoiKichThuocMauSacUpdate=(event)=>{
        this.setState({kichThuocMauSacId:event.target.value});
    }
    thayDoiTrangThaiUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamChiTietUpdate:{
                    ...prevState.sanPhamChiTietUpdate,
                    trangThai:event.target.value
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
                                                        <th>Sản phẩm</th>
                                                        <th>Màu sắc</th>
                                                        <th>Kích thước</th>
                                                        <th>Số lượng</th>
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
                                                        this.state.sanPhamChiTiet.map(
                                                            spct =>
                                                                <tr key={spct.id}>
                                                                    <td>{spct.sanPhamId.ten}</td>
                                                                    <td>{spct.kichThuocMauSacId.mauSac.ten}</td>
                                                                    <td>{spct.kichThuocMauSacId.kichThuoc.giaTri}</td>
                                                                    <td>{spct.soLuong}</td>
                                                                    <td>{spct.trangThai==1?"HD":"Ko HD"}</td>
                                                                    <td>
                                                                        <button onClick={()=>this.delete(spct.id)} className='btn btn-danger'>Xóa</button>
                                                                        <button onClick={()=>this.detail(spct.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                        Sản phẩm :
                                                        <select className="form-control" value={this.state.sanPhamChiTietUpdate.sanPhamId} onChange={this.thayDoiSanPhamUpdate}>
                                                            {this.state.sanPham.map(
                                                                sp =>
                                                                    <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        Kích thước và màu sắc :
                                                        <select className="form-control" value={this.state.sanPhamChiTietUpdate.kichThuocMauSacId} onChange={this.thayDoiKichThuocMauSacUpdate}>
                                                            {this.state.kichThuocMS.map(
                                                                ktms =>
                                                                    <option key={ktms.id} value={ktms.id} >{ktms.mauSac.ten} Size {ktms.kichThuoc.giaTri}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        Số lượng :
                                                        <input className="form-control" id="soLuongAdd" value={this.state.sanPhamChiTietUpdate.soLuong} onChange={this.thayDoiSoLuongUpdate}/>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Trạng thái</label>
                                                        <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                            <option value="1">Còn</option>
                                                            <option value="0">Ko còn</option>
                                                        </select>
                                                    </div>
                                                    <input type="submit" className="btn btn-primary" value="Update" style={{marginTop: '10px'}} onClick={this.update}/>
                                                </form>
                                            </div>

                                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                                <form>
                                                    <div>
                                                        Sản phẩm :
                                                        <select className="form-control" onChange={this.thayDoiSanPhamAdd}>
                                                            {this.state.sanPham.map(
                                                                sp =>
                                                                    <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        Kích thước và màu sắc :
                                                        <select className="form-control" onChange={this.thayDoiKichThuocMauSacAdd}>
                                                            {this.state.kichThuocMS.map(
                                                                ktms =>
                                                                    <option key={ktms.id} value={ktms.id} >{ktms.mauSac.ten} Size {ktms.kichThuoc.giaTri}</option>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        Số lượng :
                                                        <input className="form-control" id="soLuongAdd" onChange={this.thayDoiSoLuongAdd}/>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>Trạng thái</label>
                                                        <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                            <option value="1">Còn</option>
                                                            <option value="0">Ko còn</option>
                                                        </select>
                                                    </div>
                                                    <input type="submit" className="btn btn-primary" value="Update" style={{marginTop: '10px'}} onClick={this.add}/>
                                                </form>
                                            </div>


                                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                                <form className="row g-3"  method="get">
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

export default SanPhamCTComponent;