import React, {Component} from 'react';
import KhuyenMaiService from "../../services/khuyenmaiservice/KhuyenMaiService";
import {toast} from "react-toastify";



class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
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
            khuyenMaiUpdate:{
                id:this.props.match.params.id,
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
        // this.loadKhuyenMaiData();
        KhuyenMaiService.getKhuyenMai().then((res)=>{
            this.setState({khuyenMai:res.data});
        });
    //
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
        const kieuKhuyenMai = this.state.khuyenMaiAdd.kieuKhuyenMai;
        if (!this.state.khuyenMaiAdd.ma) {
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
            this.setState({errorAdd: {...this.state.errorAdd, moTa: "moTa không được bỏ trống!"}});
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

        if (!this.state.khuyenMaiAdd.giamGia) {
            this.setState({errorAdd: {...this.state.errorAdd, giamGia: "Giá giảm không được bỏ trống!"}});
            return;
        } else if(giamGia < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        }
        else if(giamGia < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        } else  if (kieuKhuyenMai === '0') { // Nếu là phần trăm
            const giamGia = parseFloat(this.state.khuyenMaiAdd.giamGia);
            if (giamGia <= 0 || giamGia > 100) {
                // Hiển thị lỗi khi giảm giá không hợp lệ
                this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Phần trăm giảm giá phải nằm trong khoảng 1-100!" } });
                return;
            }
        } else if (kieuKhuyenMai === '1') { // Nếu là tiền
            const giamGia = parseFloat(this.state.khuyenMaiAdd.giamGia);
            if (giamGia <= 0) {
                // Hiển thị lỗi khi giảm giá không hợp lệ
                this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Số tiền giảm giá phải lớn hơn 0!" } });
                return;
            }
        }else {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "" } });
        }
        if (!this.state.khuyenMaiAdd.dieuKien) {
            this.setState({errorAdd: {...this.state.errorAdd, dieuKien: "Điều kiện  không được bỏ trống!"}});
            return;
        }
        else if(dieuKien < 0) {
                this.setState({errorAdd: { ...this.state.errorAdd, dieuKien: "Điều kiện  không được bé hơn 0 !" } });
                return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, dieuKien: "" } });
        }
        if (!this.state.khuyenMaiAdd.soLuong) {
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

        let giamGia = parseInt(khuyenMai.giamGia);
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
            this.setState({errorUpdate: {...this.state.errorUpdate, moTa: "moTa không được bỏ trống!"}});
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
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "Giảm giá không được bỏ trống" }});
        }else if(giamGia < 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "" } });
        }
        if (!this.state.khuyenMaiUpdate.dieuKien) {
            this.setState({errorUpdate: {...this.state.errorUpdate, dieuKien: "Điều kiện  không được bỏ trống!"}});
            return;
        } else if(dieuKien < 0) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, dieuKien: "Điều kiện  không được bé hơn 0 !" } });
            return;
        }  else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, dieuKien: "" } });
        }
        if (!this.state.khuyenMaiUpdate.soLuong) {
            this.setState({errorUpdate: {...this.state.errorUpdate, soLuong: "Số lượng  không được bỏ trống!"}});
            return;
        } else if(soLuong < 0) {
            this.setState({errorUpdate: { ...this.state.errorUpdate, soLuong: "Số lượng  không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, soLuong: "" } });
        }
        let id = this.state.khuyenMaiUpdate.id;
        KhuyenMaiService.updateKhuyenMai(khuyenMai, this.state.mauSacUpdate.id).then((res) => {
            let khuyenMaiCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                khuyenMai: prevState.khuyenMai.map(km =>
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
                                    <h5 className="card-title">Sửa <span>| xx</span></h5>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                             aria-labelledby="home-tab">
                                            <form>
                                                <div>
                                                    Mã :
                                                    <input className={`form-control ${this.state.errorUpdate.ma ? 'is-invalid' : ''}`} name="ma" value={this.state.khuyenMaiUpdate.ma} onChange={this.thayDoiMaUpdate}/>
                                                    {this.state.errorUpdate.ma && <div className="text-danger">{this.state.errorUpdate.ma}</div>}
                                                </div>
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
                                                    <input className={`form-control ${this.state.errorUpdate.batDau ? 'is-invalid' : ''}`} name="batDau"  type="date" value={this.state.khuyenMaiUpdate.batDau} onChange={this.thayDoiBatDauUpdate}/>
                                                    {this.state.errorUpdate.batDau && <div className="text-danger">{this.state.errorUpdate.batDau}</div>}
                                                </div>
                                                <div>
                                                    Kết thúc :
                                                    <input className={`form-control ${this.state.errorUpdate.ketThuc ? 'is-invalid' : ''}`} name="ketThuc" type="date" value={this.state.khuyenMaiUpdate.ketThuc} onChange={this.thayDoiKetThucUpdate}/>
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
                                                <div>
                                                   Điều kiện :
                                                    <input className={`form-control ${this.state.errorUpdate.dieuKien ? 'is-invalid' : ''}`} name="dieuKien" value={this.state.khuyenMaiUpdate.dieuKien} onChange={this.thayDoiDieuKienUpdate}/>
                                                    {this.state.errorUpdate.dieuKien && <div className="text-danger">{this.state.errorUpdate.dieuKien}</div>}
                                                </div>
                                                <div>
                                                    Số  lượng :
                                                    <input className={`form-control ${this.state.errorUpdate.soLuong ? 'is-invalid' : ''}`} name="soLuong" value={this.state.khuyenMaiUpdate.soLuong} onChange={this.thayDoiSoLuongUpdate}/>
                                                    {this.state.errorUpdate.soLuong && <div className="text-danger">{this.state.errorUpdate.giamGia}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select name="trangThai" id="trangThai" value={this.state.khuyenMaiUpdate.trangThai} className="form-control" onChange={this.thayDoiTrangThaiUpdate}>
                                                        <option value="1">Sắp diễn ra</option>
                                                        <option value="0">Đã diễn ra</option>
                                                        <option value="2">Đang diễn ra</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{marginTop: '10px'}} onClick={this.update}/>
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