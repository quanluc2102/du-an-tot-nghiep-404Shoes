import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";



class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMai:[],
            pageCount: 0,
            khuyenMaiAdd: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: '',
                dieuKien: '',
                soLuong: '',
                trangThai: ''},
            errorAdd: {
                ma: '',
                ten : '',
                moTa : '',
                batDau: '',
                ketThuc: '',
                giamGia : '',
                kieuKhuyenMai:'',
                dieuKien: '',
                soLuong: '',
                trangThai: ''
            },
            errorUpdate: {
                ma: '',
                ten : '',
                moTa : '',
                batDau: '',
                ketThuc: '',
                giamGia : '',
                kieuKhuyenMai:'',
                dieuKien: '',
                soLuong: '',
                trangThai: ''
            }
        }


        this.add=this.add.bind(this);
        this.delete=this.delete.bind(this);
        this.update=this.update.bind(this);
        this.detail=this.detail.bind(this);
        this.thayDoiMaAdd=this.thayDoiMaAdd.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiBatDauAdd=this.thayDoiBatDauAdd.bind(this);
        this.thayDoiKetThucAdd=this.thayDoiKetThucAdd.bind(this);
        this.thayDoiGiamGiaAdd=this.thayDoiGiamGiaAdd.bind(this);
        this.thayDoiKieuKhuyenMaiAdd=this.thayDoiKieuKhuyenMaiAdd.bind(this);
        this.thayDoiDieuKienAdd=this.thayDoiDieuKienAdd.bind(this);
        this.thayDoiSoLuongAdd=this.thayDoiSoLuongAdd.bind(this);
        this.thayDoiTrangThaiAdd=this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiMaUpdate=this.thayDoiMaUpdate.bind(this);
        this.thayDoiTenUpdate=this.thayDoiTenUpdate.bind(this);
        this.thayDoiMoTaUpdate=this.thayDoiMoTaUpdate.bind(this);
        this.thayDoiBatDauUpdate=this.thayDoiBatDauUpdate.bind(this);
        this.thayDoiKetThucUpdate=this.thayDoiKetThucUpdate.bind(this);
        this.thayDoiGiamGiaUpdate=this.thayDoiGiamGiaUpdate.bind(this);
        this.thayDoiKieuKhuyenMaiUpdate=this.thayDoiKieuKhuyenMaiUpdate.bind(this);
        this.thayDoiDieuKienUpdate=this.thayDoiDieuKienUpdate.bind(this);
        this.thayDoiSoLuongUpdate=this.thayDoiSoLuongUpdate.bind(this);
        this.thayDoiTrangThaiUpdate=this.thayDoiTrangThaiUpdate.bind(this);
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
        let khuyenMai ={ma: this.state.khuyenMaiAdd.ma,ten: this.state.khuyenMaiAdd.ten}
        let giamGia = parseInt(this.state.khuyenMaiAdd.giamGia);
        let soLuong = parseInt(this.state.khuyenMaiAdd.soLuong);
        let  dieuKien = parseInt(this.state.khuyenMaiAdd. dieuKien);
        const batDau = new Date(this.state.khuyenMaiAdd.batDau);
        const ketThuc = new Date(this.state.khuyenMaiAdd.ketThuc);
        const currentDate = new Date();
        if (!this.state.khuyenMaiAdd.ma.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, ma: "Mã không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ma: "" } });
        }
        if (!this.state.khuyenMaiAdd.ten.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        }
        if (!this.state.khuyenMaiAdd.moTa.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, moTa: "Mô tả  không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, moTa: "" } });
        }
        if(!this.state.khuyenMaiAdd.batDau.trim()){
            this.setState({errorAdd: {...this.state.errorAdd,batDau: "Ngày bắt đầu không được bỏ trống "}})
        }else  if (batDau < currentDate) {
            this.setState({ errorAdd: { ...this.state.errorAdd, batDau: "Ngày bắt đầu không được là ngày quá khứ!" } });
            return;
        }
        else{
            this.setState({ errorAdd: { ...this.state.errorAdd,batDau: "" } });

        }
        if(!this.state.khuyenMaiAdd.ketThuc.trim()){
            this.setState({errorAdd: {...this.state.errorAdd,ketThuc: "Ngày kết thúc không được bỏ trống "}})
        }
        else if(ketThuc < batDau) {
            this.setState({errorAdd: {...this.state.errorAdd,ketThuc: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu "}})
            return;
        }else  if (ketThuc < currentDate) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ketThuc: "Ngày kết thúc không được là ngày quá khứ!" } });
            return;
        }
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
        if (!this.state.khuyenMaiAdd.dieuKien.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, dieuKien: "Điều kiện  không được bỏ trống!"}});
            return;
        }
        else if(dieuKien < 0) {
                this.setState({errorAdd: { ...this.state.errorAdd, dieuKien: "Điều kiện  không được bé hơn 0 !" } });
                return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, dieuKien: "" } });
        }
        if (!this.state.khuyenMaiAdd.soLuong.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, soLuong: "Số lượng  không được bỏ trống!"}});
            return;
        } else if( soLuong < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, soLuong: "Số lượng  không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, soLuong: "" } });
        }
        KhuyenMaiService.createKhuyenMai(khuyenMai).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let khuyenMaiMoi = res.data;
                this.setState(prevState => ({
                    khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi]
                }));
            }  else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
            toast.error("Lỗi: " + error.data); // Hiển thị lỗi bằng Toast
        });
        // KhuyenMaiService.addKhuyenMai(this.state.khuyenMaiAdd).then((res)=>{
        //     window.location.href = (`/khuyenmai`);
        // })
    }
    update=(e)=>{
        e.preventDefault();
        var khuyenMai= {ma: this.state.khuyenMaiUpdate.ma,
            ten: this.state.khuyenMaiUpdate.ten,
            moTa:this.state.khuyenMaiUpdate.moTa,
            batDau:this.state.khuyenMaiUpdate.batDau,
            ketThuc:this.state.khuyenMaiUpdate.ketThuc,
            giamGia:this.state.khuyenMaiUpdate.giamGia,
            kieuKhuyenMai: this.state.khuyenMaiUpdate.kieuKhuyenMai,
            dieuKien: this.state.khuyenMaiUpdate.dieuKien,
            soLuong: this.state.khuyenMaiUpdate.soLuong,
           trangThai: this.state.khuyenMaiUpdate.trangThai}
        console.log('nsx' + JSON.stringify(khuyenMai));

        let soLuong = parseInt(khuyenMai.soLuong);
        let dieuKien = parseInt(khuyenMai.dieuKien);
        const batDau = new Date(khuyenMai.batDau);
        const ketThuc = new Date(khuyenMai.ketThuc);
        const currentDate = new Date();

        if (!this.state.khuyenMaiUpdate.ma.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, ma: "Mã không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ma: "" } });
        }
        if (!this.state.khuyenMaiUpdate.ten.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "" } });
        }
        if (!this.state.khuyenMaiUpdate.moTa.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, moTa: "Mô tả  không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, moTa: "" } });
        }

        if(!this.state.khuyenMaiUpdate.batDau.trim()){
            this.setState({errorUpdate: {...this.state.errorUpdate,batDau: "Ngày bắt đầu không được bỏ trống "}})
        }else  if (batDau < currentDate) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, batDau: "Ngày bắt đầu không được là ngày quá khứ!" } });
            return;
        }
        else{
            this.setState({ errorUpdate: { ...this.state.errorUpdate,batDau: "" } });

        }
        if(!this.state.khuyenMaiUpdate.ketThuc.trim()){
            this.setState({errorUpdate: {...this.state.errorUpdate,ketThuc: "Ngày kết thúc không được bỏ trống "}})
        }
        else if(ketThuc < batDau) {
            this.setState({errorUpdate: {...this.state.errorUpdate,ketThuc: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu "}})
            return;
        }else  if (ketThuc < currentDate) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ketThuc: "Ngày kết thúc không được là ngày quá khứ!" } });
            return;
        }
        else{
            this.setState({ errorUpdate: { ...this.state.errorUpdate,ketThuc: "" } });

        }
        if (!this.state.khuyenMaiUpdate.giamGia) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, giamGia: "Giảm giá không được bỏ trống!" } });
            return;
        } else if (isNaN(this.state.khuyenMaiUpdate.giamGia)) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, giamGia: "Giảm giá phải là một số!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, giamGia: "" } });
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
        if (!this.state.khuyenMaiUpdate.dieuKien.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, dieuKien: "Điều kiện  không được bỏ trống!"}});
            return;
        } else if(dieuKien < 0) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, dieuKien: "Điều kiện  không được bé hơn 0 !" } });
            return;
        }  else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, dieuKien: "" } });
        }
        if (!this.state.khuyenMaiUpdate.soLuong.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, soLuong: "Số lượng  không được bỏ trống!"}});
            return;
        } else if(soLuong < 0) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, soLuong: "Số lượng  không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, soLuong: "" } });
        }
        KhuyenMaiService.updateKhuyenMai(khuyenMai, this.state.mauSacUpdate.id).then((res) => {
            let khuyenMaiCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                khuyenMia: prevState.khuyenMai.map(km =>
                    km.id === khuyenMaiCapNhat.id ? khuyenMaiCapNhat : km
                )
            }));
        }).catch(error => {
            // Log the error or handle it as needed
            console.error("Update request error:", error);
        });

    }
    detail(id){
        window.location.href = (`/khuyenMaidetail/${id}`);

    }
    thayDoiMaAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    ma:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,ma:""};
        this.setState({errorAdd:errorAdd});
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
    thayDoiDieuKienAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    dieuKien:event.target.value
                }
            })
        );
    }
    thayDoiSoLuongAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                    soLuong:event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiAdd=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiAdd:{
                    ...prevState.khuyenMaiAdd,
                   trangThai:event.target.value
                }
            })
        );
    }
    thayDoiMaUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    ma:event.target.value
                }
            })
        );
        let errorUpdate = {...this.state.errorUpdate,ma:""};
        this.setState({errorUpdate:errorUpdate});
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
    thayDoiDieuKienUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    dieuKien:event.target.value
                }
            })
        );
    }
    thayDoiSoLuongUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    soLuong:event.target.value
                }
            })
        );
    }
    thayDoiTrangThaiUpdate=(event)=>{
        this.setState(
            prevState=>({
                khuyenMaiUpdate:{
                    ...prevState.khuyenMaiUpdate,
                    trangThai:event.target.value
                }
            })
        );
    }
    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khuyến mãi</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Khuyến mãi</li>
                        </ol>
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="row">


                        <div className="col-lg-10">


                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">ADD<span>| xx</span></h5>




                                            <form>
                                                <div>
                                                    Mã :
                                                    <input className={`form-control ${this.state.errorAdd.ma ? 'is-invalid' : ''}`} name="ma" onChange={this.thayDoiMaAdd}/>
                                                    {this.state.errorAdd.ma && <div className="text-danger">{this.state.errorAdd.ma}</div>}
                                                </div>
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
                                                    <input className={`form-control ${this.state.errorAdd.batDau ? 'is-invalid' : ''}`} name="batDau" type="date" onChange={this.thayDoiBatDauAdd}/>
                                                    {this.state.errorAdd.batDau && <div className="text-danger">{this.state.errorAdd.batDau}</div>}
                                                </div>
                                                <div>
                                                    Kết thúc :
                                                    <input className={`form-control ${this.state.errorAdd.ketThuc ? 'is-invalid' : ''}`} name="ketThuc" type="date" onChange={this.thayDoiKetThucAdd}/>
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
                                                        <option value="0">Phần trăm</option>
                                                        <option value="1">Tiền</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    Điều kiện :
                                                    <input className={`form-control ${this.state.errorAdd.dieuKien ? 'is-invalid' : ''}`} name="dieuKien" onChange={this.thayDoiDieuKienAdd}/>
                                                    {this.state.errorAdd.dieuKien && <div className="text-danger">{this.state.errorAdd.dieuKien}</div>}
                                                </div>
                                                <div>
                                                   Số lượng :
                                                    <input className={`form-control ${this.state.errorAdd.soLuong ? 'is-invalid' : ''}`} name="soLuong" onChange={this.thayDoiSoLuongAdd}/>
                                                    {this.state.errorAdd.soLuong && <div className="text-danger">{this.state.errorAdd.soLuong}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" className="form-control" onChange={this.thayDoiTrangThaiAdd}>
                                                        <option value="0">Đã diễn ra</option>
                                                        <option value="1">Sắp diễn ra</option>
                                                        <option value="2">Đang diễn ra</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Add" style={{marginTop: '10px'}} onClick={this.add}/>
                                            </form>



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