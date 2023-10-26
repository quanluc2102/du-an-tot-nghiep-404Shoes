import React, {Component} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import "./SanPhamCss.css";
import axios from "axios";

class ChiTietComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            files:null,
            listSPA:[],
            listSPCT:[],
            listThuongHieu:[],
            listXuatXu:[],
            listDanhMuc:[],
            sanPham:{
                id:this.props.match.params.id,
                ten:'',
                giaNhap:'',
                giaBan:'',
                giamGia:'',
                moTa:'',
                thuongHieu:'',
                xuatXu:'',
                danhMuc:''
            },
        };
        this.detail=this.detail.bind(this);
        this.deleteAnh=this.deleteAnh.bind(this);
        this.updateQuality=this.updateQuality.bind(this);
        this.min=this.min.bind(this);
        this.plus=this.plus.bind(this);
        this.changeSL=this.changeSL.bind(this);
        this.update=this.update.bind(this);
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
    detail(id) {
        window.location.href = (`/sanphamchitietdetail/${id}`);
    }
    componentDidMount() {
        SanPhamService.getDanhMuc().then((res)=>{
            this.setState({listDanhMuc:res.data})
        })
        SanPhamService.getThuongHieu().then((res)=>{
            this.setState({listThuongHieu:res.data})
        })
        SanPhamService.getXuatXu().then((res)=>{
            this.setState({listXuatXu:res.data})
        })
        SanPhamService.getSanPhamById(this.state.sanPham.id).then((res)=>{
            this.setState({sanPham:res.data});
        })
        SanPhamService.getSanPhamAnhByIdSP(this.state.sanPham.id).then((res)=>{
            this.setState({listSPA:res.data});
        })
        SanPhamService.getSanPhamCTByIdSP(this.state.sanPham.id).then((res)=>{
            this.setState({listSPCT:res.data});
        })
    }
    deleteAnh = (id)=>{
        SanPhamService.deleteAnh(id).then((res)=>{
            this.setState({listSPA : this.state.listSPA.filter(listSPA=>listSPA.id!==id)});
        })
    }
    min = (productId)=>{
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, soLuong : Math.max(0,product.soLuong-1)} : product
        );
        // Update state with the new array
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].soLuong);
    }
    plus = (productId)=>{
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, soLuong : product.soLuong+1} : product
        );

        // Update state with the new array
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].soLuong);
    }
    changeSL = ()=>{
        console.log(this.state.listSPCT[0].soLuong);
    }
    updateQuality = (productId,newQuality) => {
        // Create a new array with the updated quality for the specified product
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, soLuong: Math.max(0,newQuality) } : product
        );

        // Update state with the new array
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].soLuong);
    };
    update = (e)=>{
        e.preventDefault();
        let listFile = [];
        if(this.state.files.length!=0){
            for(let i=0;i<this.state.files.length;i++){
                listFile.push(this.state.files[i].name);
            }
        }else{
            listFile =[];
        }
        var sanPham = {files:listFile,
            ten: this.state.sanPham.ten,
            giaNhap:this.state.sanPham.giaNhap,
            giaBan:this.state.sanPham.giaBan,
            giamGia:this.state.sanPham.giamGia,
            moTa:this.state.sanPham.moTa ,
            thuongHieuId:this.state.sanPham.thuongHieu,
            xuatXuId:this.state.sanPham.xuatXu,
            danhMucId:this.state.sanPham.danhMuc,
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
        this.handleUpload();
        SanPhamService.updateSanPhamChiTiet(this.state.listSPCT).then((res)=>{

        })
        SanPhamService.updateSanPham(this.state.sanPham.id,sanPham).then((res)=>{
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
        const formData = new FormData();
        for (const file of this.state.files) {
            formData.append('files', file);
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
                    danhMuc:event.target.value
                }
            })
        );
    }
    thayDoiThuongHieuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    thuongHieu:event.target.value
                }
            })
        );
    }
    thayDoiXuatXuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    xuatXu:event.target.value
                }
            })
        );
        console.log(`Option selected:`, this.state.selectedOptionMS)
    }
    boxStyle = {
        position: 'relative',
        border: '1px solid #ccc',
        float:'left',
        padding: '10px',
        margin: '20px',
        width: '150px',
        height: '150px',
        overflow: 'hidden', // Đảm bảo hình ảnh không tràn ra khỏi box
    };
    imageStyle = {
        width: '100%', // Hình ảnh chiếm toàn bộ chiều rộng của box
        height: '100%', // Tính tỷ lệ chiều cao tự động
    };
    deleteButtonStyle = {
        position: 'absolute',
        top: '5px',
        right: '5px',
        padding: '5px 10px',
        backgroundColor: '#ff0000',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };
    render() {
        return (

            <div className="col-lg-12">
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin cơ bản</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                {/*<div style={{marginLeft:"30px"}}>*/}
                                {/*    Ảnh đã có :*/}
                                {/*    {*/}
                                {/*        this.state.listSPA.map(*/}
                                {/*            sp =>*/}
                                {/*                <img key={sp.id} src={'/niceadmin/img/'+sp.anh} width={100} height={100} style={{marginLeft:20}}/>*/}

                                {/*        )*/}
                                {/*    }*/}
                                {/*    <br/>*/}
                                {/*    Chọn ảnh :*/}
                                {/*    <input className="form-control" name="files" type="file" multiple={true} />*/}
                                {/*</div>*/}
                                Ảnh đã có :
                                <div style={{marginLeft:"30px"}}>

                                    {
                                        this.state.listSPA.map(
                                            sp =>
                                                <div key={sp.id} style={this.boxStyle}>
                                                    <button style={this.deleteButtonStyle} onClick={()=>this.deleteAnh(sp.id)}>
                                                        X
                                                    </button>
                                                    <img
                                                        src={'/niceadmin/img/'+ sp.anh}// Thay đổi đường dẫn hình ảnh của bạn ở đây
                                                        alt={"Hình ảnh"}
                                                        style={this.imageStyle}
                                                    />
                                                </div>
                                        )
                                    }
                                    <br/>
                                    <br/>
                                    <br/>

                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <label style={{float:"none"}}>Chọn ảnh :</label>

                                    <input className="form-control" name="files" type="file" multiple={true} onChange={this.fileSelectedHandler}/>
                                    <br/>
                                </div>
                                <div style={{marginLeft:"30px"}}>
                                    Tên :
                                    <input className="form-control" defaultValue={this.state.sanPham.ten} type="text" onChange={this.thayDoiTenAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giá nhập :
                                    <input className="form-control" defaultValue={this.state.sanPham.giaNhap} type="text" onChange={this.thayDoiGiaNhapAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giá bán :
                                    <input className="form-control" defaultValue={this.state.sanPham.giaBan} type="text" onChange={this.thayDoiGiaBanAdd}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Giảm giá :
                                    <input className="form-control" defaultValue={this.state.sanPham.giamGia} type="text" onChange={this.thayDoiGiamGiaAdd}/>
                                </div>
                                <br/>

                                <div className="col-lg-3" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Thuong hiệu : </label>
                                    <select className="form-control" defaultValue={this.state.sanPham.thuongHieu.id} onChange={this.thayDoiThuongHieuAdd}>
                                        {this.state.listThuongHieu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Xuất xứ : </label>
                                    <select className="form-control" defaultValue={this.state.sanPham.xuatXu.id} onChange={this.thayDoiXuatXuAdd}>
                                        {this.state.listXuatXu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Danh mục : </label>
                                    <select className="form-control" defaultValue={this.state.sanPham.danhMuc.id} onChange={this.thayDoiDanhMucAdd}>
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
                                    <textarea className="form-control" defaultValue={this.state.sanPham.moTa} onChange={this.thayDoiMoTaAdd}/>
                                </div>
                                <br/>
                            </form>
                        </div>

                    </div>

                </div>
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin chi tiết</h5>
                        <table className="table table-borderless datatable">
                            <thead>
                            <tr>
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
                                this.state.listSPCT.map(
                                    sp =>
                                        <tr key={sp.id}>
                                            <td>{sp.mauSac.ten}</td>
                                            <td>{sp.kichThuoc.giaTri}</td>
                                            <td>
                                            <button type={"button"} onClick={()=>this.min(sp.id)} >-</button>
                                            <input type={"number"} id="soLuong" value={sp.soLuong} onChange={(e)=>this.updateQuality(sp.id, e.target.value)}/>
                                            <button type={"button"} onClick={()=>this.plus(sp.id)}>+</button>

                                            </td>
                                            <td>{sp.trangThai===1?"HD":"Ko HD"}</td>
                                            <td>
                                                <button onClick={()=>this.detail(sp.id)} className='btn btn-primary'>Chi tiết</button>
                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>


                        </table>
                    </div>

                </div>

                <div className="card-body">
                    <button className="btn btn-warning bi bi-floppy" style={{float:"right",marginRight:20}} onClick={this.update}></button>
                    <button className="btn btn-info bi bi-house" style={{float:"right",marginRight:10}}></button>
                </div>

            </div>
        );
    }
}

export default ChiTietComponent;