import React, {Component} from 'react';
import { Modal} from 'react-bootstrap';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import Select from 'react-select';
import axios from "axios";
import "./ChonAnh.css";
import {toast} from "react-toastify";

class ChiTietComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            listFileTong:[],
            files:[],
            anhThay:[],
            listSPCTAdd:[],
            selectedOptionMS:null,
            selectedOptionKT:null,
            listKichThuoc:[],
            listMauSac:[],
            listSPA:[],
            listSPCT:[],
            listThuongHieu:[],
            listXuatXu:[],
            listDanhMuc:[],
            showModal:false,
            showModalDetail:false,
            detailSPCT:[],
            sanPham:{
                id:this.props.match.params.id,
                ma:'',
                ten:'',
                moTa:'',
                thuongHieu:'',
                xuatXu:'',
                danhMuc:''
            },
            error:{
                ten:'',
                moTa:'',
                thuongHieuId:'',
                xuatXuId:'',
                danhMucId:'',
                soLuong:'',
                gia:''
            },
        };
        this.home=this.home.bind(this);
        this.handleShowModal=this.handleShowModal.bind(this);
        this.handleCloseModal=this.handleCloseModal.bind(this);
        this.handleShowModalSPCTDetail=this.handleShowModalSPCTDetail.bind(this);
        this.handleCloseModalSPCTDetail=this.handleCloseModalSPCTDetail.bind(this);
        this.detail=this.detail.bind(this);
        this.delete=this.delete.bind(this);
        this.deleteAnh=this.deleteAnh.bind(this);
        this.updateQuality=this.updateQuality.bind(this);
        this.updatePrice=this.updatePrice.bind(this);
        this.changeSL=this.changeSL.bind(this);
        this.addSPCT=this.addSPCT.bind(this);
        this.save=this.save.bind(this);
        this.update=this.update.bind(this);
        this.fileSelectedHandler=this.fileSelectedHandler.bind(this);
        this.handleUpload=this.handleUpload.bind(this);
        this.saveFileToPublic=this.saveFileToPublic.bind(this);
        this.thayDoiTenAdd=this.thayDoiTenAdd.bind(this);
        this.thayDoiMoTaAdd=this.thayDoiMoTaAdd.bind(this);
        this.thayDoiThuongHieuAdd=this.thayDoiThuongHieuAdd.bind(this);
        this.thayDoiXuatXuAdd=this.thayDoiXuatXuAdd.bind(this);
        this.thayDoiDanhMucAdd=this.thayDoiDanhMucAdd.bind(this);
        this.thayDoiMauSacOne=this.thayDoiMauSacOne.bind(this);
        this.thayDoiKichThuocOne=this.thayDoiKichThuocOne.bind(this);
        this.thayDoiSoLuongOne=this.thayDoiSoLuongOne.bind(this);
        this.thayDoiGiaOne=this.thayDoiGiaOne.bind(this);
        this.thayDoiAnhOne=this.thayDoiAnhOne.bind(this);
    }
    home = ()=>{
        window.location.href = (`/`);
    }
    handleChangeMS = (selectedOptionMS) => {
        this.setState({ selectedOptionMS }, () =>{
            console.log(`Option selected:`, this.state.selectedOptionMS);
            this.generateSPCTList();
        });
    };
    handleChangeKT = (selectedOptionKT) => {
        this.setState({ selectedOptionKT }, () =>
            console.log(`Option selected:`, this.state.selectedOptionKT)
        );
    };
    handleShowModal = () => {
        this.setState({showModal:true})
    };
    handleCloseModal = () => {
        this.setState({showModal:false})
    };
    handleShowModalSPCTDetail = (index) => {
        this.setState({detailSPCT:this.state.listSPCT[index]})
        this.setState({showModalDetail:true})
        this.setState(
            prevState=>({
                detailSPCT:{
                    ...prevState.detailSPCT,
                    mauSac:this.state.listSPCT[index].mauSac.id,
                    kichThuoc:this.state.listSPCT[index].kichThuoc.id,
                }
            })
        );
        console.log(this.state.detailSPCT)
    };
    handleCloseModalSPCTDetail = () => {
        this.setState({showModalDetail:false})
    };

    detail(id) {
        window.location.href = (`/sanphamchitietdetail/${id}`);
    }
    delete(id) {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm  này ?");
        if(!confirm){
            return;
        }
        SanPhamService.deleteSanPhamChiTiet(id).then((res)=>{
            this.setState({listSPCT : this.state.listSPCT.filter(listSPCT=>listSPCT.id!==id)});
            alert(res.data);
        })

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
        SanPhamService.getKichThuocAdd().then((res)=>{
            this.setState({listKichThuoc:res.data})
        })
        SanPhamService.getMauSacAdd().then((res)=>{
            this.setState({listMauSac:res.data});
        })

    }

    deleteAnh = (id,index)=>{
        const { listSPA } = this.state;
        const updatedListSPA = [...listSPA];
        updatedListSPA.splice(index, 1);
        this.setState({ listSPA: updatedListSPA });
        SanPhamService.deleteAnh(id).then((res)=>{

        })
    }

    changeSL = ()=>{
        console.log(this.state.listSPCT[0].soLuong);
    }

    updateQuality = (productId,newQuality) => {
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, soLuong: Math.max(0, Math.min(200, newQuality)) } : product
        );
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].soLuong);
    };

    updatePrice = (productId,newQuality) => {
        const updatedProducts = this.state.listSPCT.map(product =>
            product.id === productId ? { ...product, donGia: Math.max(0, Math.min(100000000, newQuality)) } : product
        );
        this.setState({ listSPCT: updatedProducts });
        console.log(this.state.listSPCT[0].donGia);
    };

    thayDoiAnh = (index, newValue) => {
        const selectedFiles = newValue.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        const { listSPCTAdd } = this.state;
        this.setState({ listFileTong: [ ...this.state.listFileTong,...selectedImagesArray] })
        const updatedListSPCTAdd = [...listSPCTAdd];
        updatedListSPCTAdd[index].anh = selectedImagesArray;
        if (selectedImagesArray.length ===0){
            updatedListSPCTAdd[index].error = "Bạn cần chọn ít nhất 1 ảnh";
        }else{
            updatedListSPCTAdd[index].error = "";
        }
        this.setState({ listSPCTAdd: updatedListSPCTAdd });
    };

    handleSoLuongChange = (index, newValue) => {
        const { listSPCTAdd } = this.state;
        const updatedListSPCT = [...listSPCTAdd];
        updatedListSPCT[index].soLuong = Math.max(0, Math.min(200, newValue));
        this.setState({ listSPCTAdd: updatedListSPCT });
        console.log(this.state.listSPCTAdd[index].soLuong)
        console.log(this.state.listSPCTAdd[0])
    };

    handleGiaChange = (index, newValue) => {
        const { listSPCTAdd } = this.state;
        const updatedListSPCT = [...listSPCTAdd];
        updatedListSPCT[index].gia = Math.max(0, Math.min(100000000, newValue));
        this.setState({ listSPCTAdd: updatedListSPCT });
        console.log(this.state.listSPCTAdd[index].gia)
    };

    generateSPCTList = () => {
        const { selectedOptionKT, selectedOptionMS } = this.state;
        const listSPCTAdd = selectedOptionKT.map((kt) =>
            selectedOptionMS.map((ms) => ({
                anh:[],
                kichThuoc: kt,
                mauSac: ms,
                soLuong: 0,
                gia: 0,
                error:''
            }))
        ).flat();

        this.setState({ listSPCTAdd });

    };

    addSPCT = (e)=>{
        e.preventDefault();

        if(this.state.listSPCTAdd.length===0){

        }else{
            for(let i=0;i<this.state.listSPCTAdd.length;i++){
                const { listSPCTAdd } = this.state;
                const updatedListSPCT = [...listSPCTAdd];
                updatedListSPCT[i].anh = this.state.listSPCTAdd[i].anh[0].file.name;
                this.setState({ listSPCTAdd: updatedListSPCT });
            }
        }
        var sanPham = {
            listSPCT: this.state.listSPCTAdd
        }
        this.handleUpload();
        const id = this.props.match.params.id;
        SanPhamService.addSanPhamChiTiet(id,sanPham).then((res)=>{
            window.location.href = (`/detail/` + id);
        })
    }

    update = (e)=>{
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc chắn muốn sửa sản phẩm này ?");
        if(!confirm){
            return;
        }
        let listFile = []
        for(let i=0;i<this.state.files.length;i++){
            listFile.push(this.state.files[i].file.name);
        }
        var sanPham = {files:listFile,
            ten: this.state.sanPham.ten,
            moTa:this.state.sanPham.moTa ,
            thuongHieuId:this.state.sanPham.thuongHieu,
            xuatXuId:this.state.sanPham.xuatXu,
            danhMucId:this.state.sanPham.danhMuc,
            listMauSac: this.state.selectedOptionMS,
            listKichThuoc :this.state.selectedOptionKT
        }
        if (!this.state.sanPham.ten.trim()) {
            this.setState({error: {...this.state.error, ten: "Tên không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, ten: "" } });
        }

        if (!this.state.error.thuongHieuId.length===0) {
            return;
        }

        if (!this.state.error.xuatXuId.length===0) {
            return;
        }

        if (!this.state.error.danhMucId.length===0) {
            return;
        }

        if (!this.state.sanPham.moTa.trim()) {
            this.setState({error: {...this.state.error, moTa: "Mô tả không được bỏ trống !"}});
            return;
        } else {
            this.setState({ error: { ...this.state.error, moTa: "" } });
        }

        console.log('nsx' + JSON.stringify(sanPham));
        let id =this.props.match.params.id;
        SanPhamService.updateSanPhamChiTiet(this.state.listSPCT).then((res)=>{

        })
        this.handleUpload()
        SanPhamService.updateSanPham(id,sanPham).then((res)=>{
            if (res.status=== 200) {
                setTimeout(() => {
                    window.location.href = (`/index`);
                }, 2000);
                toast.success("Sửa thành công!");
            }else {
                // Xử lý khi có lỗi trả về từ API
                const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm sản phẩm.";
                toast.error("Lỗi: " + errorMessage);
                console.log(res.data.error)
            }
        })
    }

    save = (e)=>{
        e.preventDefault();
        const confirm = window.confirm("Bạn có chắc chắn muốn sửa sản phẩm này ?");
        if(!confirm){
            return ;
        }
        if(this.state.anhThay.length===0){
            var spct = {kichThuoc : this.state.detailSPCT.kichThuoc,
                mauSac : this.state.detailSPCT.mauSac,
                donGia : this.state.detailSPCT.donGia,
                soLuong : this.state.detailSPCT.soLuong,
                anh : this.state.detailSPCT.anh,
            }
        }else{
            var spct = {kichThuoc : this.state.detailSPCT.kichThuoc,
                mauSac : this.state.detailSPCT.mauSac,
                donGia : this.state.detailSPCT.donGia,
                soLuong : this.state.detailSPCT.soLuong,
                anh : this.state.anhThay[0].file.name,
            }
        }

        let id =this.props.match.params.id;
        console.log('nsx' + JSON.stringify(this.state.detailSPCT));
        this.handleUpload()
        SanPhamService.updateOneSanPhamChiTiet(this.state.detailSPCT.id,spct).then((res)=>{
            if (res.status=== 200) {
                setTimeout(() => {
                    window.location.href = (`/detail/`+id);
                }, 2000);
                toast.success("Sửa thành công!");
            }else {
                // Xử lý khi có lỗi trả về từ API
                const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm sản phẩm.";
                toast.error("Lỗi: " + errorMessage);
                console.log(res.data.error)
            }
        })

    }

    removeSelectedFile = (index) => {
        const { files } = this.state;
        const updatedListFiles = [...files];
        updatedListFiles.splice(index, 1);
        this.setState({ files: updatedListFiles });
    };

    removeItem = (index) => {
        const { listSPCTAdd } = this.state;
        const updatedListSPCT = [...listSPCTAdd];
        updatedListSPCT.splice(index, 1);
        this.setState({ listSPCTAdd: updatedListSPCT });
    };

    fileSelectedHandler = (e) => {
        const selectedFiles = e.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        this.setState({ files: [ ...this.state.files,...selectedImagesArray] })
        this.setState({ listFileTong: [ ...this.state.listFileTong,...selectedImagesArray] })
    };

    handleUpload = () => {
        if (this.state.files) {
            this.saveFileToPublic(this.state.files[0]);
        } else {
            alert('Vui lòng chọn một file');
        }
    };

    saveFileToPublic = (file) => {
        const formData1 = new FormData();
        for (const file of this.state.listFileTong) {
            formData1.append('files', file.file);
        }
        if(!this.state.listFileTong){

        }else{
            axios.post('http://localhost:8080/api/images/upload1', formData1)
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error uploading files: ', error);
                });
        }

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
        console.log(this.state.detailSPCT)
        if(!event.target.value.trim()){
            let error = {...this.state.error,ten:"Tên không được trống !"};
            this.setState({error:error});
        }else{
            let error = {...this.state.error,ten:""};
            this.setState({error:error});
        }
    };

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
    };

    thayDoiDanhMucAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    danhMuc:event.target.value
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
    };

    thayDoiThuongHieuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    thuongHieu:event.target.value
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
    };

    thayDoiXuatXuAdd=(event)=>{
        this.setState(
            prevState=>({
                sanPham:{
                    ...prevState.sanPham,
                    xuatXu:event.target.value
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
        console.log(`Option selected:`, this.state.selectedOptionMS)
    };

    thayDoiKichThuocOne=(event)=>{
        this.setState(
            prevState=>({
                detailSPCT:{
                    ...prevState.detailSPCT,
                    kichThuoc:event.target.value
                }
            })
        );
    };
    thayDoiMauSacOne=(event)=>{
        this.setState(
            prevState=>({
                detailSPCT:{
                    ...prevState.detailSPCT,
                    mauSac:event.target.value
                }
            })
        );
    };
    thayDoiGiaOne=(event)=>{
        let newValue = Number(event.target.value); // Chuyển đổi giá trị nhập thành số

        // Sử dụng Math.min và Math.max để giới hạn giá trị trong khoảng từ 0 đến 200
        newValue = Math.min(100000000, Math.max(0, newValue));
        this.setState(
            prevState=>({
                detailSPCT:{
                    ...prevState.detailSPCT,
                    donGia: newValue
                }
            })
        );
    };
    thayDoiSoLuongOne=(event)=>{
        let newValue = Number(event.target.value); // Chuyển đổi giá trị nhập thành số

        // Sử dụng Math.min và Math.max để giới hạn giá trị trong khoảng từ 0 đến 200
        newValue = Math.min(200, Math.max(0, newValue));
        this.setState(
            prevState=>({
                detailSPCT:{
                    ...prevState.detailSPCT,
                    soLuong:newValue
                }
            })
        );

    };
    thayDoiAnhOne=(event)=>{
        const selectedFiles = event.target.files;
        const selectedImagesArray = Array.from(selectedFiles).map(file => ({file,URL: URL.createObjectURL(file),}));
        this.setState({ listFileTong: [ ...this.state.listFileTong,...selectedImagesArray] })
        this.setState({anhThay:selectedImagesArray})
    };
    downloadImage = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    render() {
        const { selectedOptionMS } = this.state;
        const { selectedOptionKT } = this.state;
        const popupContent = (
            <div className="popup">
                <h2>Thêm sản phẩm chi tiết</h2>
                <div>
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
                <div>
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
                            {this.state.listSPCTAdd.map((spct, index) => (

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
                                        borderRadius: 5,width:'90%'}} onChange={(e) => this.handleSoLuongChange(index, e.target.value)} min={0}/> </th>
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
                <br/>
                <div>
                    <button style={{float:"right"}} className="btn btn-warning bi bi-floppy" onClick={this.addSPCT}></button>
                </div>
                <div>
                </div>
            </div>
        );

        return (

            <div className="col-lg-12">
                <div className="card">

                    <div className="card-body">
                        <h5 className="card-title">Thông tin cơ bản</h5>
                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                             aria-labelledby="home-tab">
                            <form>
                                <div style={{marginLeft:"30px"}}>
                                    <label>Ảnh đã có : </label>
                                    <br/>
                                    {this.state.listSPA.map((image, index) => (
                                        <div className="image-box" key={image.id}>
                                            <img  src={'/niceadmin/img/'+ image.anh} alt={image.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                            <button className="delete-button bi bi-trash" onClick={()=>this.deleteAnh(image.id,index)}></button>
                                        </div>
                                    ))}
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                                <div style={{marginLeft:"30px"}}>


                                    <br/>
                                    <label style={{float:"none"}}>Chọn ảnh :</label>
                                    <br/>
                                    <div className="image-uploader">
                                        <label htmlFor="file-input" className="upload-btn btn btn-outline-danger">
                                            <i className="bi bi-image-fill"></i> <br/>Chọn ảnh
                                        </label>
                                        <input type="file" id="file-input" multiple={true} onChange={this.fileSelectedHandler} accept="image/*"/>

                                        {this.state.files.map((image, index) => (
                                            <div className="image-box" key={index}>
                                                <img  src={image.URL} alt={image.file.name} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                                <button className="delete-button bi bi-trash" onClick={() => this.removeSelectedFile(index)}></button>
                                            </div>
                                        ))}


                                    </div>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                     Mã :
                                    <input className="form-control" defaultValue={this.state.sanPham.ma} type="text" onChange={this.thayDoiTenAdd} disabled={true}/>
                                </div>
                                <br/>
                                <div style={{marginLeft:"30px"}}>
                                    Tên<a style={{color:"red"}}>*</a> :
                                    <input className={`form-control ${this.state.error.ten ? 'is-invalid' : ''}`} defaultValue={this.state.sanPham.ten} type="text" onChange={this.thayDoiTenAdd}/>
                                    {this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}
                                </div>
                                <br/>

                                <div className="col-lg-3" style={{marginLeft:"30px",display:"inline-block"}}>
                                    <label>Thuong hiệu<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.thuongHieuId ? 'is-invalid' : ''}`} value={this.state.sanPham.thuongHieu} onChange={this.thayDoiThuongHieuAdd}>
                                        <option value="">Chọn thương hiệu</option>
                                        {this.state.listThuongHieu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.thuongHieuId && <div className="text-danger">{this.state.error.thuongHieuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Xuất xứ<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.xuatXuId ? 'is-invalid' : ''}`} value={this.state.sanPham.xuatXu} onChange={this.thayDoiXuatXuAdd}>
                                        <option value="">Chọn xuất xứ</option>
                                        {this.state.listXuatXu.map(
                                            sp =>
                                                <option key={sp.id} value={sp.id}>{sp.ten}</option>
                                        )}
                                    </select>
                                    {this.state.error.xuatXuId && <div className="text-danger">{this.state.error.xuatXuId}</div>}
                                </div>
                                <div className="col-lg-3" style={{marginLeft:"115px",display:"inline-block"}}>
                                    <label>Danh mục<a style={{color:"red"}}>*</a> : </label>
                                    <select className={`form-control ${this.state.error.danhMucId ? 'is-invalid' : ''}`} value={this.state.sanPham.danhMuc} onChange={this.thayDoiDanhMucAdd}>
                                        <option value="">Chọn danh mục</option>
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
                                    <textarea className={`form-control ${this.state.error.moTa ? 'is-invalid' : ''}`} defaultValue={this.state.sanPham.moTa} onChange={this.thayDoiMoTaAdd}/>
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
                        <table style={{width: '100%',
                            borderCollapse: 'collapse'}}>
                            <thead>
                            <tr className={this.tr1}>
                                <th>Mã</th>
                                <th>Ảnh</th>
                                <th>Kích thước</th>
                                <th>Màu sắc</th>
                                <th>Số lượng </th>
                                <th>Giá</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.listSPCT.map((spct, index) => (

                                <tr key={index} className={this.tr1}>
                                    <th >{spct.ma}</th>
                                    <th ><img  src={'/niceadmin/img/'+ spct.anh} alt={spct.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} /></th>
                                    <th >{spct.kichThuoc.giaTri}</th>
                                    <th >{spct.mauSac.ten}</th>
                                    <th ><input type={"number"} value={spct.soLuong} style={{padding: 10,
                                        border: '1px solid #ddd',
                                        borderRadius: 5,width:'90%'}} onChange={(e)=>this.updateQuality(spct.id, e.target.value)} min={0}/> </th>
                                    <th ><input type={"number"} value={spct.donGia} style={{padding: 10,
                                        border: '1px solid #ddd',
                                        borderRadius: 5,width:'90%'}} onChange={(e) => this.updatePrice(spct.id, e.target.value)} min={0}/> </th>
                                    <th ><button onClick={()=>this.delete(spct.id)} className='btn btn-danger bi bi-trash3' style={{marginRight:10}}></button>
                                        <button className="btn btn-primary bi bi-info" onClick={()=>this.handleShowModalSPCTDetail(index)} style={{marginRight:10}}></button>
                                    </th>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary bi bi-plus" onClick={this.handleShowModal}></button>
                        <Modal show={this.state.showModal} onHide={this.handleCloseModal} backdrop="static" style={{maxWidth: '100%', width: '100%'}} size={"lg"}>
                            <Modal.Header closeButton>
                                <Modal.Title>Nhập thông tin sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {popupContent}
                            </Modal.Body>
                        </Modal>
                        <div>
                            <div className={`overlay ${this.state.showModalDetail ? 'active' : ''}`} onClick={this.handleCloseModalSPCTDetail}>
                                {!this.state.detailSPCT  ? (
                                    <p></p>
                                    ) : (
                                    <div className="small-window" onClick={(e) => e.stopPropagation()}>
                                {/* Nội dung cửa sổ nhỏ */}

                                    <h2>Chi tiết sản phẩm</h2>
                                        {/*<div style={{marginLeft:"30px"}}>*/}
                                        {/*    Tên :*/}
                                        {/*    <input className={`form-control ${this.state.error.ten ? 'is-invalid' : ''}`} defaultValue={this.state.sanPham.ten} type="text" onChange={this.thayDoiTenAdd}/>*/}
                                        {/*</div>*/}
                                        <div style={{marginLeft:"30px"}}>
                                            Mã :
                                            <input className={`form-control`} defaultValue={this.state.detailSPCT.ma} type="text" disabled={true}/>
                                        </div>
                                        <div style={{marginLeft:"30px"}}>
                                            <label>Kích thước : </label>
                                                <select className="form-control col-lg-5" onChange={this.thayDoiKichThuocOne}>
                                                    {this.state.listKichThuoc.map(
                                                        sp =>
                                                    <option key={sp.value} value={sp.value} selected={this.state.detailSPCT.kichThuoc === sp.value}>{sp.label}</option>
                                                )}
                                                </select>
                                        </div>
                                        <div style={{marginLeft:"30px"}}>
                                            <label>Màu sắc : </label>
                                                <select className="form-control col-lg-5" onChange={this.thayDoiMauSacOne}>
                                                    {this.state.listMauSac.map(
                                                    sp =>
                                                    <option key={sp.value} value={sp.value} selected={this.state.detailSPCT.mauSac === sp.value}>{sp.label}</option>
                                                )}
                                                </select>
                                        </div>
                                        <div style={{marginLeft:"30px",display:"inline-block"}} className="col-lg-6">
                                            <label>Số lượng : </label>
                                            <input className={`form-control`} value={this.state.detailSPCT.soLuong} type="number" onChange={this.thayDoiSoLuongOne}/>
                                        </div>
                                        <div style={{marginLeft:"30px",display:"inline-block"}} className="col-lg-5">
                                            <label>Giá : </label>
                                            <input className={`form-control`} value={this.state.detailSPCT.donGia} type="number" onChange={this.thayDoiGiaOne}/>
                                        </div>
                                        <div style={{marginLeft:"30px",display:"inline-block"}}>
                                            <label>QR : </label>
                                            <a href={'/niceadmin/img/'+ this.state.detailSPCT.qr}
                                               download={this.state.detailSPCT.qr}
                                               target="_blank"
                                               rel="noopener noreferrer">
                                                <img  src={'/niceadmin/img/'+ this.state.detailSPCT.qr} alt={this.state.detailSPCT.qr} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                            </a>
                                        </div>
                                        <div style={{marginLeft:"30px",display:"inline-block"}}>
                                            <label>Ảnh hiện tại : </label>
                                            <img  src={'/niceadmin/img/'+ this.state.detailSPCT.anh} alt={this.state.detailSPCT.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                        </div>
                                        <div style={{marginLeft:"30px"}}>
                                            {this.state.anhThay.map((image, index) => (
                                                <div className="image-box" key={index}>
                                                    <img  src={image.URL} alt={image.file.name} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}} />
                                                </div>
                                            ))}
                                            <br/>
                                            <br/>
                                            <br/>
                                            <label>Chọn ảnh thay</label>
                                            <input type="file" onChange={(e) => this.thayDoiAnhOne(e)} accept="image/*"/>
                                            <button onClick={this.save} className={"btn btn-warning bi bi-floppy"} style={{float:"right",marginRight:10}}></button>
                                            <button onClick={this.handleCloseModalSPCTDetail} className={"btn btn-danger bi bi-x-lg"} style={{float:"right",marginRight:10}}></button>
                                        </div>
                                        <br/>

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="card-body">
                    <button className="btn btn-warning bi bi-floppy" style={{float:"right",marginRight:20}} onClick={this.update}></button>
                    <button className="btn btn-info bi bi-house" style={{float:"right",marginRight:10}} onClick={this.home}></button>
                </div>

            </div>
        );
    }
}

export default ChiTietComponent;