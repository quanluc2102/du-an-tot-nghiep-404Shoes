import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";



class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMai:[],
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
            },
            errorAdd: {
                ten : '',
                moTa : '',
                batDau: '',
                ketThuc: '',
                giamGia : '',
                kieuKhuyenMai:''
            },
            errorUpdate: {
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
    componentDidMount(){
        KhuyenMaiService.getKhuyenMai().then((res)=>{
            this.setState({khuyenMai:res.data});
        });
        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(this.state.khuyenMaiUpdate.id).then((res)=>{
                // this.setState(this.state.sanPhamUpdate.ten=sanPham1.ten,
                //     this.state.sanPhamUpdate.giaNhap=sanPham1.giaNhap,
                //     this.state.sanPhamUpdate.giaBan=sanPham1.giaBan,
                //     this.state.sanPhamUpdate.giamGia=sanPham1.giamGia,
                //     this.state.sanPhamUpdate.trangThai=sanPham1.trangThai,
                //     this.state.sanPhamUpdate.moTa=sanPham1.moTa)
                this.setState({khuyenMaiUpdate:res.data});
            })
        }


    }
    delete(id){
        KhuyenMaiService.deleteKhuyenMai(id).then((res)=>{
        });
        window.location.href = (`/index`);
    }
    add = (e)=>{
        e.preventDefault();

        let giamGia = parseInt(this.state.khuyenMaiAdd.giamGia);

        if (!this.state.khuyenMaiAdd.ten.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        }
        if (!this.state.khuyenMaiAdd.moTa.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, moTa: "moTa không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, moTa: "" } });
        }
        if(!this.state.khuyenMaiAdd.batDau.trim()){
            this.setState({errorAdd: {...this.state.errorAdd,batDau: "Ngày bắt đầu không được bỏ trống "}})
        }else{
            this.setState({ errorAdd: { ...this.state.errorAdd,batDau: "" } });

        }
        if(!this.state.khuyenMaiAdd.ketThuc.trim()){
            this.setState({errorAdd: {...this.state.errorAdd,ketThuc: "Ngày bắt đầu không được bỏ trống "}})
         }
        // else if(ketThuc < batDau) {
        //         this.setState({ errorAdd: { ...this.state.errorAdd,ketThuc: "Ngày kết thúc không được bé hơn ngày bắt đầu!" } });
        //         return;
        // }
        else{
            this.setState({ errorAdd: { ...this.state.errorAdd,ketThuc: "" } });

        }

        if (!this.state.khuyenMaiAdd.giamGia.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, giamGia: "Giá giảm không được bỏ trống!"}});
            return;
        } else if(giamGia < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "" } });
        }


        KhuyenMaiService.addKhuyenMai(this.state.khuyenMaiAdd).then((res)=>{
            window.location.href = (`/khuyenmai`);
        })
    }
    update=(e)=>{
        e.preventDefault();
        var khuyenMai= {ten: this.state.khuyenMaiUpdate.ten,
            moTa:this.state.khuyenMaiUpdate.moTa,
            batDau:this.state.khuyenMaiUpdate.batDau,
            ketThuc:this.state.khuyenMaiUpdate.ketThuc,
            giamGia:this.state.khuyenMaiUpdate.giamGia,
            kieuKhuyenMai: this.state.khuyenMaiUpdate.kieuKhuyenMai}
        console.log('nsx' + JSON.stringify(khuyenMai));

        let giamGia = parseInt(khuyenMai.giamGia);

        if (!this.state.khuyenMaiUpdate.ten.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "" } });
        }
        if (!this.state.khuyenMaiUpdate.moTa.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, moTa: "moTa không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, moTa: "" } });
        }
        if(!this.state.khuyenMaiUpdate.batDau.trim()){
            this.setState({errorUpdate: {...this.state.errorUpdate,batDau: "Ngày bắt đầu không được bỏ trống "}})
        }else{
            this.setState({ errorUpdate: { ...this.state.errorUpdate,batDau: "" } });

        }
        if(!this.state.khuyenMaiUpdate.ketThuc.trim()){
            this.setState({errorUpdate: {...this.state.errorUpdate,ketThuc: "Ngày bắt đầu không được bỏ trống "}})
        // }else if(ketThuc < batDau) {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate,ketThuc: "Ngày kết thúc không được bé hơn ngày bắt đầu!" } });
        //     return;
        }else{
            this.setState({ errorUpdate: { ...this.state.errorUpdate,ketThuc: "" } });

        }

        // if (!this.state.khuyenMaiUpdate.giamGia.trim()) {
        //     this.setState({errorUpdate: {...this.state.errorUpdate, giamGia: "Giá giảm không được bỏ trống!"}});
        //     return;
        // } else if(giamGia < 0) {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "Giá giảm không được bé hơn 0 !" } });
        //     return;
        // } else {
        //     this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "" } });
        // }

        let id = this.state.khuyenMaiUpdate.id;
        KhuyenMaiService.updateKhuyenMai(id,khuyenMai).then((res)=>{
            window.location.href = (`/khuyenMai`);
        })
    }
    detail(id){
        window.location.href = (`/khuyenMaidetail/${id}`);

    }
    thayDoiTenAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    ten:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,ten:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiMoTaAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    moTa:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,moTa:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiBatDauAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    batDau:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,batDau:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiKetThucAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    ketThuc:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,ketThuc:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiGiamGiaAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    giamGia:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,giamGia:""};
        this.setState({errorAdd:errorAdd});
    }

    thayDoiKieuKhuyenMaiAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    kieuKhuyenMai:event.target.value
                }
            })
        );
    }
    thayDoiTenUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    ten:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,ten:""};
        this.setState({errorUpdate:errorUpdate});
    }
    thayDoiMoTaUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    moTa:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,moTa:""};
        this.setState({errorUpdate:errorUpdate});
    }
    thayDoiBatDauUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    batDau:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,batDau:""};
        this.setState({errorUpdate:errorUpdate});
    }
    thayDoiKetThucUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    ketThuc:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,ketThuc:""};
        this.setState({errorUpdate:errorUpdate});
    }
    thayDoiGiamGiaUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    giamGia:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,giamGia:""};
        this.setState({errorUpdate:errorUpdate});
    }

    thayDoiKieuKhuyenMaiUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    kieuKhuyenMai:event.target.value
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
                                            <h5 className="card-title">Khuyến mãi <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>Tên</th>
                                                    <th>Mô tả</th>
                                                    <th>Bắt đầu</th>
                                                    <th>Kết thúc</th>
                                                    <th>Giảm giá</th>
                                                    <th>Kiểu khuyến mãi</th>
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
                                                                <td>{km.kieuKhuyenMai===1?"Phần trăm":"Tiền"}</td>
                                                                <td>
                                                                    <button onClick={()=>this.delete(km.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={()=>this.detail(km.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    <input className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`} name="ten" value={this.state.khuyenMaiUpdate.ten} onChange={this.thayDoiTenUpdate}/>
                                                    {this.state.errorUpdate.ten && <div className="text-danger">{this.state.errorUpdate.ten}</div>}
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className={`form-control ${this.state.errorUpdate.moTa ? 'is-invalid' : ''}`} name="moTa" value={this.state.khuyenMaiUpdate.moTa} onChange={this.thayDoiMoTaUpdate}/>
                                                    {this.state.errorUpdate.moTa && <div className="text-danger">{this.state.errorUpdate.moTa}</div>}
                                                </div>
                                                <div>
                                                    Bắt đầu :
                                                    <input className={`form-control ${this.state.errorUpdate.batDau ? 'is-invalid' : ''}`} name="batDau" value={this.state.khuyenMaiUpdate.batDau} onChange={this.thayDoiBatDauUpdate}/>
                                                    {this.state.errorUpdate.batDau && <div className="text-danger">{this.state.errorUpdate.batDau}</div>}
                                                </div>
                                                <div>
                                                    Kết thúc :
                                                    <input className={`form-control ${this.state.errorUpdate.ketThuc ? 'is-invalid' : ''}`} name="ketThuc" value={this.state.khuyenMaiUpdate.ketThuc} onChange={this.thayDoiKetThucUpdate}/>
                                                    {this.state.errorUpdate.ketThuc && <div className="text-danger">{this.state.errorUpdate.ketThuc}</div>}
                                                </div>
                                                <div>
                                                    Giảm giá :
                                                    <input className={`form-control ${this.state.errorUpdate.giamGia ? 'is-invalid' : ''}`} name="giamGia" value={this.state.khuyenMaiUpdate.giamGia} onChange={this.thayDoiGiamGiaUpdate}/>
                                                    {this.state.errorUpdate.giamGia && <div className="text-danger">{this.state.errorUpdate.giamGia}</div>}
                                                </div>

                                                <div className='form-group'>
                                                    <label>Kiểu khuyến mãi</label>
                                                    <select name="kieuKhuyenMai" id="kieuKhuyenMai" value={this.state.khuyenMaiUpdate.kieuKhuyenMai} className="form-control" onChange={this.thayDoiKieuKhuyenMaiUpdate}>
                                                        <option value="1">Phần trăm</option>
                                                        <option value="0">Tiền</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{marginTop: '10px'}} onClick={this.update}/>
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :
                                                    <input className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`} name="ten" onChange={this.thayDoiTenAdd}/>
                                                    {this.state.errorAdd.ten && <div className="text-danger">{this.state.errorAdd.ten}</div>}
                                                </div>
                                                <div>
                                                    Mô tả :
                                                    <input className={`form-control ${this.state.errorAdd.moTa ? 'is-invalid' : ''}`} name="moTa"  onChange={this.thayDoiMoTaAdd}/>
                                                    {this.state.errorAdd.moTa && <div className="text-danger">{this.state.errorAdd.moTa}</div>}
                                                </div>
                                                <div>
                                                    Bắt đầu :
                                                    <input className={`form-control ${this.state.errorAdd.batDau ? 'is-invalid' : ''}`} name="batDau" onChange={this.thayDoiBatDauAdd}/>
                                                    {this.state.errorAdd.batDau && <div className="text-danger">{this.state.errorAdd.batDau}</div>}
                                                </div>
                                                <div>
                                                    Kết thúc :
                                                    <input className={`form-control ${this.state.errorAdd.ketThuc ? 'is-invalid' : ''}`} name="ketThuc"  onChange={this.thayDoiKetThucAdd}/>
                                                    {this.state.errorAdd.ketThuc && <div className="text-danger">{this.state.errorAdd.ketThuc}</div>}
                                                </div>
                                                <div>
                                                    Giảm giá :
                                                    <input className={`form-control ${this.state.errorAdd.giamGia ? 'is-invalid' : ''}`} name="giamGia" onChange={this.thayDoiGiamGiaAdd}/>
                                                    {this.state.errorAdd.giamGia && <div className="text-danger">{this.state.errorAdd.giamGia}</div>}
                                                </div>

                                                <div className='form-group'>
                                                    <label>Kiểu khuyến mãi</label>
                                                    <select name="kieuKhuyenMai" id="kieuKhuyenMai" className="form-control" onChange={this.thayDoiKieuKhuyenMaiAdd}>
                                                        <option value="1">Phần trăm</option>
                                                        <option value="0">Tiền</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Add" style={{marginTop: '10px'}} onClick={this.add}/>
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
export default KhuyenMaiComponent