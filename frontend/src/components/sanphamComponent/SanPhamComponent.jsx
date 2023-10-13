import React, {Component} from 'react';
import { useState } from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import { toast } from 'react-toastify';
import SanPhamService1 from "../../services/sanphamservice/SanPhamService1";

class SanPhamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPham:[],
            sanPhamAdd:{
                ten : '',
                giaNhap : '',
                giaBan : '',
                giamGia : '',
                moTa : '',
                trangThai:''},
            sanPhamUpdate:{
                id:this.props.match.params.id,
                ten : '',
                giaNhap : '',
                giaBan : '',
                giamGia : '',
                moTa : '',
                trangThai:''
            }
        }

        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.update=this.update.bind(this);
        this.detail=this.detail.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiGiaNhapAdd=this.thayDoiGiaNhapAdd.bind(this);
        this.thayDoiGiaBanAdd=this.thayDoiGiaBanAdd.bind(this);
        this.thayDoiGiamGiaAdd=this.thayDoiGiamGiaAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiTrangThaiAdd=this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTenUpdate=this.thayDoiTenUpdate.bind(this);
        this.thayDoiGiaNhapUpdate=this.thayDoiGiaNhapUpdate.bind(this);
        this.thayDoiGiaBanUpdate=this.thayDoiGiaBanUpdate.bind(this);
        this.thayDoiGiamGiaUpdate=this.thayDoiGiamGiaUpdate.bind(this);
        this.thayDoiMoTaUpdate=this.thayDoiMoTaUpdate.bind(this);
        this.thayDoiTrangThaiUpdate=this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount(){
        SanPhamService.getSanPham().then((res)=>{
            this.setState({sanPham:res.data});
        });
        const id = this.props.match.params.id;
        if (id) {
            SanPhamService.getSanPhamById(this.state.sanPhamUpdate.id).then((res)=>{
                // this.setState(this.state.sanPhamUpdate.ten=sanPham1.ten,
                //     this.state.sanPhamUpdate.giaNhap=sanPham1.giaNhap,
                //     this.state.sanPhamUpdate.giaBan=sanPham1.giaBan,
                //     this.state.sanPhamUpdate.giamGia=sanPham1.giamGia,
                //     this.state.sanPhamUpdate.trangThai=sanPham1.trangThai,
                //     this.state.sanPhamUpdate.moTa=sanPham1.moTa)
                this.setState({sanPhamUpdate:res.data});
            })
        }


    }
    delete(id){
        SanPhamService.deleteSanPham(id).then((res)=>{
        });
        window.location.href = (`/index`);
    }
    add = (e)=>{
        e.preventDefault();

        SanPhamService.addSanPham(this.state.sanPhamAdd).then((res)=>{
            window.location.href = (`/index`);
        })

    }
    update=(e)=>{
        e.preventDefault();
        var sanPham = {ten: this.state.sanPhamUpdate.ten,
            trangThai: this.state.sanPhamUpdate.trangThai,
            giamGia:this.state.sanPhamUpdate.giamGia,
            giaBan:this.state.sanPhamUpdate.giaBan,
            giaNhap:this.state.sanPhamUpdate.giaNhap,
            moTa:this.state.sanPhamUpdate.moTa }
        console.log('nsx' + JSON.stringify(sanPham));
        let id = this.state.sanPhamUpdate.id;
        SanPhamService.updateSanPham(id,sanPham).then((res)=>{
            window.location.href = (`/index`);
        })
    }
    detail(id){
        window.location.href = (`/detail/${id}`);
    }
    thayDoiTenAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    ten:event.target.value
                }
            })
        );
    }
    thayDoiGiaNhapAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    giaNhap:event.target.value
                }
            })
        );
    }
    thayDoiGiaBanAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    giaBan:event.target.value
                }
            })
        );
    }
    thayDoiGiamGiaAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    giamGia:event.target.value
                }
            })
        );
    }
    thayDoiMoTaAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    moTa:event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPhamAdd:{
                    ...prevState.sanPhamAdd,
                    trangThai:event.target.value
                }
            })
        );
    }
    thayDoiTenUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
                    ten:event.target.value
                }
            })
        );
    }
    thayDoiGiaNhapUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
                    giaNhap:event.target.value
                }
            })
        );
    }
    thayDoiGiaBanUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
                    giaBan:event.target.value
                }
            })
        );
    }
    thayDoiGiamGiaUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
                    giamGia:event.target.value
                }
            })
        );
    }
    thayDoiMoTaUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
                    moTa:event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiUpdate=(event)=>{
        this.setState(
            prevState=>({
                sanPhamUpdate:{
                    ...prevState.sanPhamUpdate,
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
                                                    <th>Tên</th>
                                                    <th>Giá nhập</th>
                                                    <th>Giá bán</th>
                                                    <th>Giảm giá</th>
                                                    <th>Mô tả</th>
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
                                                    this.state.sanPham.map(
                                                        sp =>
                                                            <tr key={sp.id}>
                                                                <td>{sp.ten}</td>
                                                                <td>{sp.giaNhap}</td>
                                                                <td>{sp.giaBan}</td>
                                                                <td>{sp.giamGia}</td>
                                                                <td>{sp.moTa}</td>
                                                                <td>{sp.trangThai==1?"HD":"Ko HD"}</td>
                                                                <td>
                                                                    <button onClick={()=>this.delete(sp.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={()=>this.detail(sp.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    <input className="form-control" name="ten" value={this.state.sanPhamUpdate.ten} onChange={this.thayDoiTenUpdate}/>
                                                </div>
                                                <div>
                                                    Giá nhập :
                                                    <input className="form-control" name="giaNhap" value={this.state.sanPhamUpdate.giaNhap} onChange={this.thayDoiGiaNhapUpdate}/>
                                                </div>
                                                <div>
                                                    Giá bán :
                                                    <input className="form-control" name="giaBan" value={this.state.sanPhamUpdate.giaBan} onChange={this.thayDoiGiaBanUpdate}/>
                                                </div>
                                                <div>
                                                    Giảm giá :
                                                    <input className="form-control" name="giamGia" value={this.state.sanPhamUpdate.giamGia} onChange={this.thayDoiGiamGiaUpdate}/>
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className="form-control" name="moTa" value={this.state.sanPhamUpdate.moTa} onChange={this.thayDoiMoTaUpdate}/>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.sanPhamUpdate.trangThai} className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value="true">Còn</option>
                                                        <option value="false">Ko còn</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{marginTop: '10px'}} onClick={this.update}/>
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className="form-control" name="ten" onChange={this.thayDoiTenAdd}/>
                                                </div>
                                                <div>
                                                    Giá nhập :
                                                    <input className="form-control" name="giaNhap" onChange={this.thayDoiGiaNhapAdd}/>
                                                </div>
                                                <div>
                                                    Giá bán :
                                                    <input className="form-control" name="giaBan"  onChange={this.thayDoiGiaBanAdd}/>
                                                </div>
                                                <div>
                                                    Giảm giá :
                                                    <input className="form-control" name="giamGia" onChange={this.thayDoiGiamGiaAdd}/>
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className="form-control" name="moTa"  onChange={this.thayDoiMoTaAdd}/>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value="true">Còn</option>
                                                        <option value="false">Ko còn</option>
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
        )
    }
}

export default SanPhamComponent