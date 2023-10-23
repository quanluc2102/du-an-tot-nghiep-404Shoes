import React, {Component} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import Select from 'react-select';
class SanPhamAddComponnent extends Component {
    constructor(props) {
        super(props);
        this.state={
            files:null,
            selectedOptionMS:null,
            selectedOptionKT:null,
            listKichThuoc:[],
            listMauSac:[],
            listThuongHieu:[],
            listXuatXu:[],
            listDanhMuc:[],
            sanPham:{
                ten:'',
                giaNhap:'',
                giaBan:'',
                giamGia:'',
                moTa:'',
                thuongHieuId:'',
                xuatXuId:'',
                danhMucId:''
            },
        };
        this.add=this.add.bind(this);
        this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.saveFileToPublic=this.saveFileToPublic.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiGiaNhapAdd=this.thayDoiGiaNhapAdd.bind(this);
        this.thayDoiGiaBanAdd=this.thayDoiGiaBanAdd.bind(this);
        this.thayDoiGiamGiaAdd=this.thayDoiGiamGiaAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiThuongHieuAdd=this.thayDoiThuongHieuAdd.bind(this);
        this.thayDoiXuatXuAdd=this.thayDoiXuatXuAdd.bind(this);
        this.thayDoiDanhMucAdd=this.thayDoiDanhMucAdd.bind(this);
    }
    add = (e)=>{
        e.preventDefault();
        let listFile = [];
        for(let i=0;i<this.state.files.length;i++){
            listFile.push(this.state.files[i].name);
        }
        var sanPham = {files:listFile,
            ten: this.state.sanPham.ten,
            giaNhap:this.state.sanPham.giaNhap,
            giaBan:this.state.sanPham.giaBan,
            giamGia:this.state.sanPham.giamGia,
            moTa:this.state.sanPham.moTa ,
            thuongHieuId:this.state.sanPham.thuongHieuId,
            xuatXuId:this.state.sanPham.xuatXuId,
            danhMucId:this.state.sanPham.danhMucId,
            listMauSac: this.state.selectedOptionMS,
            listKichThuoc :this.state.selectedOptionKT
        }
        console.log('nsx' + JSON.stringify(sanPham));
        // let giaNhap = parseInt(this.state.sanPhamAdd.giaNhap);
        // let giaBan = parseInt(this.state.sanPhamAdd.giaBan);
        // let giamGia = parseInt(this.state.sanPhamAdd.giamGia);
        //
        // if (!this.state.sanPhamAdd.ten.trim()) {
        //     this.setState({errorAdd: {...this.state.errorAdd, ten: "Tên không được bỏ trống!"}});
        //     return;
        // } else {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        // }
        //
        //
        // if (!this.state.sanPhamAdd.giaNhap.trim()) {
        //     this.setState({errorAdd: {...this.state.errorAdd, giaNhap: "Giá nhập không được bỏ trống!"}});
        //     return;
        // } else if(giaNhap < 0) {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giaNhap: "Giá nhập không được bé hơn 0 !" } });
        //     return;
        // } else {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giaNhap: "" } });
        // }
        //
        // if (!this.state.sanPhamAdd.giaBan.trim()) {
        //     this.setState({errorAdd: {...this.state.errorAdd, giaBan: "Giá bán không được bỏ trống!"}});
        //     return;
        // } else if(giaBan < 0) {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "Giá bán không được bé hơn 0 !" } });
        //     return;
        // } else if(giaBan < giaNhap) {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "Giá bán không được bé hơn Giá nhập !" } });
        //     return;
        // } else {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "" } });
        // }
        //
        // if (!this.state.sanPhamAdd.giamGia.trim()) {
        //     this.setState({errorAdd: {...this.state.errorAdd, giamGia: "Giá giảm không được bỏ trống!"}});
        //     return;
        // } else if(giamGia < 0) {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được bé hơn 0 !" } });
        //     return;
        // } else if(giamGia > giaBan) {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được lớn hơn Giá bán !" } });
        //     return;
        // } else {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "" } });
        // }
        //
        // if (!this.state.sanPhamAdd.moTa.trim()) {
        //     this.setState({errorAdd: {...this.state.errorAdd, moTa: "moTa không được bỏ trống!"}});
        //     return;
        // } else {
        //     this.setState({ errorAdd: { ...this.state.errorAdd, moTa: "" } });
        // }


        SanPhamService.addSanPham(sanPham).then((res)=>{
            window.location.href = (`/index`);
        })
    }
    fileSelectedHandler = (e) => {
        this.setState({ files: [ ...e.target.files] })
    }
    handleUpload = () => {
        if (this.state.files) {
            // Gọi hàm để lưu file vào thư mục public
            this.saveFileToPublic(this.state.files[0]);
        } else {
            alert('Vui lòng chọn một file');
        }
    };
    saveFileToPublic = (file) => {
        // Tạo một đường dẫn đến thư mục public
        const publicFolderPath = process.env.PUBLIC_URL;

        // Tạo một đường dẫn đầy đủ cho file trong thư mục public
        const filePathInPublic = `./src/img/`+this.state.files[0].name;

        // Sử dụng API hoặc thư viện phù hợp để lưu file vào đường dẫn đã tạo
        // Đoạn mã này chỉ là một ví dụ, bạn có thể sử dụng FormData hoặc các thư viện như axios để gửi file lên server

        // Ví dụ sử dụng fetch API:
        fetch(filePathInPublic, {
            method: 'POST', // Hoặc 'POST' tùy thuộc vào yêu cầu của bạn
            body: this.state.files[0],
        })
            .then(response => response.json())
            .then(data => {
                console.log('File đã được lưu thành công', data);
            })
            .catch(error => {
                console.error('Lỗi khi lưu file', error);
            });
    };
    thayDoiTenAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    ten:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,ten:""};
        this.setState({errorAdd:errorAdd});
        console.log(this.state.files)
    }
    thayDoiGiaNhapAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    giaNhap:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,giaNhap:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiGiaBanAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    giaBan:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,giaBan:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiGiamGiaAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    giamGia:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,giamGia:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiMoTaAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    moTa:event.target.value
                }
            })
        );
        let errorAdd = {...this.state.errorAdd,moTa:""};
        this.setState({errorAdd:errorAdd});
    }
    thayDoiDanhMucAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    danhMucId:event.target.value
                }
            })
        );
    }
    thayDoiThuongHieuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    thuongHieuId:event.target.value
                }
            })
        );
    }
    thayDoiXuatXuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    xuatXuId:event.target.value
                }
            })
        );
        console.log(`Option selected:`, this.state.selectedOptionMS)
    }
    handleChangeMS = (selectedOptionMS) => {
        this.setState({ selectedOptionMS }, () =>
            console.log(`Option selected:`, this.state.selectedOptionMS)
        );
    };
    handleChangeKT = (selectedOptionKT) => {
        this.setState({ selectedOptionKT }, () =>
            console.log(`Option selected:`, this.state.selectedOptionKT)
        );
    };
    componentDidMount() {
        SanPhamService.getDanhMuc().then((res)=>{
            this.setState({listDanhMuc:res.data})
        })
        SanPhamService.getKichThuoc().then((res)=>{
            this.setState({listKichThuoc:res.data})
        })
        SanPhamService.getMauSac().then((res)=>{
            this.setState({listMauSac:res.data});
        })
        SanPhamService.getThuongHieu().then((res)=>{
            this.setState({listThuongHieu:res.data})
        })
        SanPhamService.getXuatXu().then((res)=>{
            this.setState({listXuatXu:res.data})
        })
    }

    render() {
        const { selectedOptionMS } = this.state;
        const { selectedOptionKT } = this.state;
        return (
            <div className="col-lg-12">


                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin cơ bản</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                <div style={{marginLeft:"30px"}}>
                                    Chọn ảnh :
                                    <input className="form-control" name="files" type="file" multiple={true} onChange={this.fileSelectedHandler}/>
                                    <button onClick={this.handleUpload}>Upload</button>
                                    <img src="/niceadmin/img/card.jpg"/>
                                </div>
                                <div style={{marginLeft:"30px"}}>
                                    Tên :
                                    <input className="form-control" type="text" onChange={this.thayDoiTenAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giá nhập :
                                    <input className="form-control" type="text" onChange={this.thayDoiGiaNhapAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giá bán :
                                    <input className="form-control" type="text" onChange={this.thayDoiGiaBanAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giảm giá :
                                    <input className="form-control" type="text" onChange={this.thayDoiGiamGiaAdd}/>
                                </div>
                                <br/>

                                <div className="col-lg-3" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Thuong hiệu : </label>
                                    <select className="form-control" onChange={this.thayDoiThuongHieuAdd}>
                                        {this.state.listThuongHieu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Xuất xứ : </label>
                                    <select className="form-control" onChange={this.thayDoiXuatXuAdd}>
                                        {this.state.listXuatXu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Danh mục : </label>
                                    <select className="form-control" onChange={this.thayDoiDanhMucAdd}>
                                        {this.state.listDanhMuc.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                </div>

                                <br/>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Mô tả :
                                    <textarea className="form-control" onChange={this.thayDoiMoTaAdd}/>
                                </div>
                                <br/>
                            </form>
                        </div>

                    </div>

                </div>

                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin chi tiết</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                <div className="col-lg-5" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Kích thước : </label>
                                    {/*<select className="form-control">*/}
                                    {/*    {this.state.listKichThuoc.map(*/}
                                    {/*        sp =>*/}
                                    {/*            <option key={sp.id} value={sp.id}>{sp.ten}</option>*/}
                                    {/*    )}*/}
                                    {/*</select>*/}
                                    <Select
                                        isMulti
                                        value={selectedOptionKT}
                                        onChange={this.handleChangeKT}
                                        options={this.state.listKichThuoc}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <div className="col-lg-5" style={{marginLeft:"120px",display:"inline-block"}} >
                                    <label>Màu sắc : </label>
                                    {/*<select className="form-control"  >*/}
                                    {/*    {this.state.listMauSac.map(*/}
                                    {/*        sp =>*/}
                                    {/*            <option key={sp.id} value={sp.id}>{sp.ten}</option>*/}
                                    {/*    )}*/}
                                    {/*</select>*/}
                                    <Select
                                        isMulti
                                        value={selectedOptionMS}
                                        onChange={this.handleChangeMS}
                                        options={this.state.listMauSac}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                </div>
                                <br/>
                                <br/>
                            </form>
                        </div>

                    </div>

                </div>
                <div className="card-body">
                    <button className="btn btn-warning bi bi-floppy" style={{float:"right",marginRight:20}} onClick={this.add}></button>
                    <button className="btn btn-info bi bi-house" style={{float:"right",marginRight:10}}></button>
                </div>

            </div>

        );
    }
}

export default SanPhamAddComponnent;