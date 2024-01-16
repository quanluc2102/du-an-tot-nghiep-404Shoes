import React, {Component} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import Select from 'react-select';
import axios from "axios";
import {toast} from "react-toastify";
import './ChonAnh.css';
class SanPhamAddComponnent extends Component {
    constructor(props) {
        super(props);
        this.state={
            listFileTong:[],
            files:[],
            listSPCT:[],
            selectedOptionMS:null,
            selectedOptionKT:null,
            listSPValue:[],
            listAnhSPCT:[],
            listKichThuoc:[],
            listMauSac:[],
            listThuongHieu:[],
            listXuatXu:[],
            listDanhMuc:[],
            sanPham:{
                ten:'',
                moTa:'',
                thuongHieuId:'',
                xuatXuId:'',
                danhMucId:''
            },
            error:{
                files:'',
                ten:'',
                moTa:'',
                thuongHieuId:'',
                xuatXuId:'',
                danhMucId:''
            },
        };
        this.home=this.home.bind(this);
        this.add=this.add.bind(this);
        this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.saveFileToPublic=this.saveFileToPublic.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiThuongHieuAdd=this.thayDoiThuongHieuAdd.bind(this);
        this.thayDoiXuatXuAdd=this.thayDoiXuatXuAdd.bind(this);
        this.thayDoiDanhMucAdd=this.thayDoiDanhMucAdd.bind(this);
    }
    home = ()=>{
        window.location.href = (`/index`);
    }
    add = (e)=>{
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc chắn muốn thêm sản phẩm  này ?");
        if(!confirm){
            return;
        }
        try {
        let listFile = [];
        for(let i=0;i<this.state.files.length;i++){
            listFile.push(this.state.files[i].file.name);
        }

        if(this.state.listSPCT.length===0){

        }else{
            for(let i=0;i<this.state.listSPCT.length;i++){
                const { listSPCT } = this.state;
                const updatedListSPCT = [...listSPCT];
                updatedListSPCT[i].anh = this.state.listSPCT[i].anh[0].file.name;
                this.setState({ listSPCT: updatedListSPCT });
            }
        }
        var sanPham = {files:listFile,
            ten: this.state.sanPham.ten,
            moTa:this.state.sanPham.moTa ,
            thuongHieuId:this.state.sanPham.thuongHieuId,
            xuatXuId:this.state.sanPham.xuatXuId,
            danhMucId:this.state.sanPham.danhMucId,
            listSPCT: this.state.listSPCT
        }
        console.log('nsx' + JSON.stringify(sanPham));

        if (listFile.length === 0) {
            this.setState({error: {...this.state.error, files: "Chọn ít nhất 1 ảnh !"}});
            alert("Mời bạn chọn lại ảnh của sản phẩm chi tiết (nếu có) !");
            return;
        } else if (listFile.length >3 ) {
            this.setState({error: {...this.state.error, files: "Chọn tối đa 3 ảnh !"}});
            alert("Mời bạn chọn lại ảnh của sản phẩm chi tiết (nếu có) !");
            return;
        } else {
            this.setState({ error: { ...this.state.error, files: "" } });
        }

        if (!this.state.sanPham.ten.trim()) {
            this.setState({error: {...this.state.error, ten: "Tên không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, ten: "" } });
        }

        if (!this.state.sanPham.thuongHieuId.trim()) {
            this.setState({error: {...this.state.error, thuongHieuId: "Chưa chọn thương hiệu !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, thuongHieuId: "" } });
        }

        if (!this.state.sanPham.xuatXuId.trim()) {
            this.setState({error: {...this.state.error, xuatXuId: "Chưa chọn xuất xứ !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, xuatXuId: "" } });
        }

        if (!this.state.sanPham.danhMucId.trim()) {
            this.setState({error: {...this.state.error, danhMucId: "Chưa chọn danh mục !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, danhMucId: "" } });
        }

        if (!this.state.sanPham.moTa.trim()) {
            this.setState({error: {...this.state.error, moTa: "Mô tả không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, moTa: "" } });
        }
        this.handleUpload();
        SanPhamService.addSanPham(sanPham).then((res)=>{
            if (res.status=== 200) {
                setTimeout(() => {
                    this.home();
                }, 0);
                toast.success("Thêm thành công!");
                alert("Thêm thành công")
            }else {
                const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm sản phẩm.";
                toast.error("Lỗi: " + errorMessage);
                console.log(res.data.error)
            }

        })} catch (error) {
            // Xử lý lỗi ở đây
            if (error instanceof TypeError && error.message.includes('Cannot read properties of undefined (reading \'file\')')) {
                // Nếu lỗi là do thuộc tính 'file' không tồn tại
                alert('Chưa chọn đầy đủ ảnh của các sản phẩm');
                // Hoặc hiển thị thông báo thông qua một cổng thông báo khác
                // alert('Chưa chọn file');
            } else {
                // Xử lý các loại lỗi khác
                console.error(error);
            }
        }
    }

    fileSelectedHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        this.setState({ files: [ ...this.state.files,...selectedImagesArray] })
        this.setState({ listFileTong: [ ...this.state.listFileTong,...selectedImagesArray] })
        let error = {...this.state.error,files:""};
        this.setState({error:error});
    }

    handleUpload = () => {
        if (this.state.files) {
            this.saveFileToPublic();
        } else {
            alert('Vui lòng chọn một file');
        }
    };

    saveFileToPublic = () => {
        const formData = new FormData();
        for (const file of this.state.listFileTong) {
            formData.append('files', file.file);
        }
        axios.post('http://localhost:8080/api/images/upload1', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error uploading files: ', error);
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
        if(!event.target.value.trim()){
            let error = {...this.state.error,ten:"Tên không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,ten:""};
            this.setState({error:error});
        }
        console.log(this.state.listAnhSPCT)
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
        if(!event.target.value.trim()){
            let error = {...this.state.error,moTa:"Mô tả không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,moTa:""};
            this.setState({error:error});
        }
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
        if(!event.target.value.trim()){
            let error = {...this.state.error,danhMucId:"Chưa chọn danh mục !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,danhMucId:""};
            this.setState({error:error});
        }
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
        if(!event.target.value.trim()){
            let error = {...this.state.error,thuongHieuId:"Chưa chọn thương hiệu !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,thuongHieuId:""};
            this.setState({error:error});
        }
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
        if(!event.target.value.trim()){
            let error = {...this.state.error,xuatXuId:"Chưa chọn xuất xứ !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,xuatXuId:""};
            this.setState({error:error});
        }
    }

    handleChangeMS = (selectedOptionMS) => {
        this.setState({ selectedOptionMS }, () => {
            console.log(`Option selected:`, this.state.selectedOptionMS);
            this.generateSPCTList();
        });
        console.log(this.state.listSPCT[0]);
    };

    handleChangeKT = (selectedOptionKT) => {
        this.setState({ selectedOptionKT }, () =>{
            console.log(`Option selected:`, this.state.selectedOptionKT);
            }
        );

    };

    handleSoLuongChange = (index, newValue) => {
        const { listSPCT } = this.state;
        const updatedListSPCT = [...listSPCT];
        updatedListSPCT[index].soLuong = Math.max(1, Math.min(200, newValue));
        this.setState({ listSPCT: updatedListSPCT });
        console.log(this.state.listSPCT[index].soLuong)
    };

    handleGiaChange = (index, newValue) => {
        const { listSPCT } = this.state;
        const updatedListSPCT = [...listSPCT];
        updatedListSPCT[index].gia = Math.max(0, Math.min(100000000, newValue));
        this.setState({ listSPCT: updatedListSPCT });
        console.log(this.state.listSPCT[index].gia)
    };

    thayDoiAnh = (index, newValue) => {
        const selectedFiles = newValue.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        const { listSPCT } = this.state;
        this.setState({ listFileTong: [ ...this.state.listFileTong,...selectedImagesArray] })
        this.setState({ listAnhSPCT: [ ...this.state.listAnhSPCT,...selectedImagesArray] })
        const updatedListSPCT = [...listSPCT];
        updatedListSPCT[index].anh = selectedImagesArray;
        if (selectedImagesArray.length ===0){
            updatedListSPCT[index].error = "Bạn cần chọn ít nhất 1 ảnh";
        }else{
            updatedListSPCT[index].error = "";
        }
        this.setState({ listSPCT: updatedListSPCT });
    };

    componentDidMount() {
        SanPhamService.getDanhMuc().then((res)=>{
            this.setState({listDanhMuc:res.data})
        })
        SanPhamService.getKichThuocAdd().then((res)=>{
            this.setState({listKichThuoc:res.data})
        })
        SanPhamService.getMauSacAdd().then((res)=>{
            this.setState({listMauSac:res.data});
        })
        SanPhamService.getThuongHieu().then((res)=>{
            this.setState({listThuongHieu:res.data})
        })
        SanPhamService.getXuatXu().then((res)=>{
            this.setState({listXuatXu:res.data})
        })
        SanPhamService.getSanPhamValue().then((res)=>{
            this.setState({listSPValue:res.data})
        })
    }

    generateSPCTList = () => {
        const { selectedOptionKT, selectedOptionMS } = this.state;
        const listSPCT = selectedOptionKT.map((kt) =>
                selectedOptionMS.map((ms) => ({
                    anh:[],
                    kichThuoc: kt,
                    mauSac: ms,
                    soLuong: 1,
                    gia: 1000000,
                    error:''
                }))
            ).flat();

            this.setState({ listSPCT });

    };

    removeItem = (index) => {
        const { listSPCT } = this.state;
        const updatedListSPCT = [...listSPCT];
        updatedListSPCT.splice(index, 1);
        this.setState({ listSPCT: updatedListSPCT });
    };

    removeAnh = (index) => {
        const { files } = this.state;
        const updatedListFiles = [...files];
        updatedListFiles.splice(index, 1);
        this.setState({ files: updatedListFiles });
    };

    render() {
        const { selectedOptionMS } = this.state;
        const { selectedOptionKT } = this.state;
        return (
            <div className="col-lg-12" style={{float:"right",marginTop:60,marginRight:30}}>


                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin cơ bản</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                <div style={{marginLeft:"30px"}}>
                                    <label style={{float:"none"}}>Chọn ảnh<a style={{color:"red"}}>*</a> :</label>
                                    <div className="image-uploader">
                                        <label htmlFor="file-input" className="upload-btn btn btn-outline-danger">
                                            <i className="bi bi-image-fill"></i> <br/>Chọn ảnh
                                        </label>
                                        <input type="file" id="file-input" multiple={true} onChange={this.fileSelectedHandler} accept="image/*"/>
                                        {this.state.error.files && <div className="text-danger">{this.state.error.files}</div>}
                                        {this.state.files.map((image, index) => (
                                            <div className="image-box" key={index}>
                                                <img  src={image.URL} alt={image.file.name} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                                <button className="delete-button bi bi-trash" onClick={() => this.removeAnh(index)}></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px",float:"none"}}>
                                    Tên<a style={{color:"red"}}>*</a> :
                                    <input className={`form-control ${this.state.error.ten ? 'is-invalid' : ''}`} type="text" onChange={this.thayDoiTenAdd}/>
                                    {this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}
                                </div>
                                <br/>

                                <div className="col-lg-3" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Thuong hiệu<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.thuongHieuId ? 'is-invalid' : ''}`} onChange={this.thayDoiThuongHieuAdd}>
                                        <option value=''>Chọn thương hiệu</option>
                                        {this.state.listThuongHieu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.thuongHieuId && <div className="text-danger">{this.state.error.thuongHieuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Xuất xứ<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.xuatXuId ? 'is-invalid' : ''}`} onChange={this.thayDoiXuatXuAdd}>
                                        <option value=''>Chọn xuất xứ</option>
                                        {this.state.listXuatXu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.xuatXuId && <div className="text-danger">{this.state.error.xuatXuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Danh mục<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.danhMucId ? 'is-invalid' : ''}`} onChange={this.thayDoiDanhMucAdd}>
                                        <option value=''>Chọn danh mục</option>
                                        {this.state.listDanhMuc.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.danhMucId && <div className="text-danger">{this.state.error.danhMucId}</div>}
                                </div>

                                <br/>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Mô tả<a style={{color:"red"}}>*</a> :
                                    <textarea className={`form-control ${this.state.error.moTa ? 'is-invalid' : ''}`} onChange={this.thayDoiMoTaAdd}/>
                                    {this.state.error.moTa && <div className="text-danger">{this.state.error.moTa}</div>}
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


                        {this.state.listSPCT.length > 0 ? (
                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Sản phẩm chi tiết</h5>
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                        aria-labelledby="home-tab">
                                        <table style={{width: '100%',
                                            borderCollapse: 'collapse'}}>
                                            <thead>
                                                <tr className={"tr1"}>
                                                    <th>Ảnh sản phẩm</th>
                                                    <th>Kích thước</th>
                                                    <th>Màu sắc</th>
                                                    <th>Số lượng </th>
                                                    <th>Giá</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.listSPCT.map((spct, index) => (

                                                <tr key={index} className={"tr1"}>
                                                    <th >
                                                        {spct.anh&&spct.anh.length !== 0?(
                                                            <div className="image-box" key={index}>
                                                                <img  src={spct.anh[0].URL} alt={spct.anh[0].name}  style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                                            </div>
                                                        ):(<></>)}
                                                            <input type="file" onChange={(e) => this.thayDoiAnh(index,e)} accept="image/*"/>
                                                            {spct.error && <div className="text-danger">{spct.error}</div>}
                                                    </th>
                                                    <th >{spct.kichThuoc.label}</th>
                                                    <th >{spct.mauSac.label}</th>
                                                    <th ><input type={"number"} value={spct.soLuong} style={{padding: 10,
                                                        border: '1px solid #ddd',
                                                        borderRadius: 5,width:'90%'}} onChange={(e) => this.handleSoLuongChange(index, e.target.value)} min={1}/> </th>
                                                    <th ><input type={"number"} value={spct.gia} style={{padding: 10,
                                                        border: '1px solid #ddd',
                                                        borderRadius: 5,width:'90%'}} onChange={(e) => this.handleGiaChange(index, e.target.value)} min={0}/> </th>
                                                    <th ><button onClick={() => this.removeItem(index)} className='btn btn-danger bi bi-trash3'></button></th>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>


                                    </div>

                            </div>
                        ) : (
                            <p></p>
                        )}


                <div className="card-body">
                    <button className="btn btn-warning bi bi-floppy" style={{float:"right",marginRight:20}} onClick={this.add}></button>
                    <button className="btn btn-info bi bi-house" style={{float:"right",marginRight:10}} onClick={this.home}></button>
                </div>

            </div>

        );
    }
}

export default SanPhamAddComponnent;