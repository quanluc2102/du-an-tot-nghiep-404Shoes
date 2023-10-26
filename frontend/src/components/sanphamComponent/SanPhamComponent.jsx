import React, {Component} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import ReactPaginate from 'react-paginate';

class SanPhamComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPham:[],
            pageCount: 0,
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
            },errorAdd: {
                ten : '',
                giaNhap : '',
                giaBan : '',
                giamGia : '',
                moTa : '',
                trangThai:''
            },
            errorUpdate: {
                ten : '',
                giaNhap : '',
                giaBan : '',
                giamGia : '',
                moTa : '',
                trangThai:''
            }
        }

        this.add=this.add.bind(this);
        this.formAdd=this.formAdd.bind(this);
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

    loadPageData(pageNumber) {
        SanPhamService.getSanPham(pageNumber).then(res => {
            this.setState({
                sanPham: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
        });
    }

    handlePageClick = data => {
        let selected = data.selected; // Trang được chọn từ react-paginate
        this.loadPageData(selected);
    };

    componentDidMount(pageNumber){
        SanPhamService.getSanPham(pageNumber).then(res => {
            this.setState({
                sanPham: res.data.content, // Dữ liệu trên trang hiện tại
                pageCount: res.data.totalPages, // Tổng số trang
            });
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
    formAdd(){
        window.location.href=(`/sanpham/formadd`);
    }
    delete(id){
        SanPhamService.deleteSanPham(id).then((res)=>{
        });
        window.location.href = (`/index`);
    }
    add = (e)=>{
        e.preventDefault();


        let giaNhap = parseInt(this.state.sanPhamAdd.giaNhap);
        let giaBan = parseInt(this.state.sanPhamAdd.giaBan);
        let giamGia = parseInt(this.state.sanPhamAdd.giamGia);

        if (!this.state.sanPhamAdd.ten.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        }


        if (!this.state.sanPhamAdd.giaNhap.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, giaNhap: "Giá nhập không được bỏ trống!"}});
            return;
        } else if(giaNhap < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giaNhap: "Giá nhập không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, giaNhap: "" } });
        }

        if (!this.state.sanPhamAdd.giaBan.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, giaBan: "Giá bán không được bỏ trống!"}});
            return;
        } else if(giaBan < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "Giá bán không được bé hơn 0 !" } });
            return;
        } else if(giaBan < giaNhap) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "Giá bán không được bé hơn Giá nhập !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, giaBan: "" } });
        }

        if (!this.state.sanPhamAdd.giamGia.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, giamGia: "Giá giảm không được bỏ trống!"}});
            return;
        } else if(giamGia < 0) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        } else if(giamGia > giaBan) {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "Giá giảm không được lớn hơn Giá bán !" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, giamGia: "" } });
        }

        if (!this.state.sanPhamAdd.moTa.trim()) {
            this.setState({errorAdd: {...this.state.errorAdd, moTa: "moTa không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, moTa: "" } });
        }

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

        let giaNhap = parseInt(sanPham.giaNhap);
        let giaBan = parseInt(sanPham.giaBan);
        let giamGia = parseInt(sanPham.giamGia);

        if (!this.state.sanPhamUpdate.ten.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, ten: "Tên không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ten: "" } });
        }

        if (!this.state.sanPhamUpdate.giaNhap.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, giaNhap: "Giá nhập không được bỏ trống!"}});
            return;
        } else if(giaNhap < 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giaNhap: "Giá nhập không được bé hơn 0 !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giaNhap: "" } });
        }

        if (!this.state.sanPhamUpdate.giaBan.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, giaBan: "Giá bán không được bỏ trống!"}});
            return;
        } else if(giaBan < 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giaBan: "Giá bán không được bé hơn 0 !" } });
            return;
        } else if(giaBan < giaNhap) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giaBan: "Giá bán không được bé hơn Giá nhập !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giaBan: "" } });
        }

        if (!this.state.sanPhamUpdate.giamGia.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, giamGia: "Giá giảm không được bỏ trống!"}});
            return;
        } else if(giamGia < 0) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "Giá giảm không được bé hơn 0 !" } });
            return;
        } else if(giamGia > giaBan) {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "Giá giảm không được lớn hơn Giá bán !" } });
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, giamGia: "" } });
        }

        if (!this.state.sanPhamUpdate.moTa.trim()) {
            this.setState({errorUpdate: {...this.state.errorUpdate, moTa: "Mô tả không được bỏ trống!"}});
            return;
        } else {
            this.setState({ errorUpdate: { ...this.state.errorUpdate, moTa: "" } });
        }

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
        let errorAdd = {...this.state.errorAdd,ten:""};
        this.setState({errorAdd:errorAdd});
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
        let errorAdd = {...this.state.errorAdd,giaNhap:""};
        this.setState({errorAdd:errorAdd});
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
        let errorAdd = {...this.state.errorAdd,giaBan:""};
        this.setState({errorAdd:errorAdd});
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
        let errorAdd = {...this.state.errorAdd,giamGia:""};
        this.setState({errorAdd:errorAdd});
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
        let errorAdd = {...this.state.errorAdd,moTa:""};
        this.setState({errorAdd:errorAdd});
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
        let errorUpdate = {...this.state.errorUpdate,ten:""};
        this.setState({errorUpdate:errorUpdate});
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
        let errorUpdate = {...this.state.errorUpdate,giaNhap:""};
        this.setState({errorUpdate:errorUpdate});
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
        let errorUpdate = {...this.state.errorUpdate,giaBan:""};
        this.setState({errorUpdate:errorUpdate});
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
        let errorUpdate = {...this.state.errorUpdate,giamGia:""};
        this.setState({errorUpdate:errorUpdate});
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
        let errorUpdate = {...this.state.errorUpdate,moTa:""};
        this.setState({errorUpdate:errorUpdate});
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
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <button className="btn btn-primary col-lg-4" onClick={this.formAdd}> Add</button>
                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className="col-lg-12">
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
                                                    <th>Danh mục</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Xuất xứ</th>
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
                                                                <td>{sp.danhMuc.ten}</td>
                                                                <td>{sp.thuongHieu.ten}</td>
                                                                <td>{sp.xuatXu.ten}</td>
                                                                <td>{sp.moTa}</td>
                                                                <td>{sp.trangThai===1?"HD":"Ko HD"}</td>
                                                                <td>
                                                                    <button onClick={()=>this.delete(sp.id)} className='btn btn-danger'>Xóa</button>
                                                                    <button onClick={()=>this.detail(sp.id)} className='btn btn-primary'>Chi tiết</button>
                                                                </td>
                                                            </tr>
                                                    )
                                                }
                                                </tbody>


                                            </table>
                                            <ReactPaginate
                                                previousLabel={"<"}
                                                nextLabel={">"}
                                                breakLabel={"..."}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                pageClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                previousClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextClassName={"page-item"}
                                                nextLinkClassName={"page-link"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination justify-content-center"} // added justify-content-center for center alignment
                                                activeClassName={"active"}
                                            />
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