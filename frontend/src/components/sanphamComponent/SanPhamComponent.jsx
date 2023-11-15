import React, {Component,useRef} from 'react';
import SanPhamService from "../../services/sanphamservice/SanPhamService";
import ReactPaginate from 'react-paginate';
// import { QrReader } from 'react-qr-reader';
import QrScanner  from 'react-qr-scanner';
import './ChonAnh.css';

class SanPhamComponent extends Component {
    constructor(props) {

        super(props);
        this.state = {
            sanPham:[],
            listThayThe:[],
            trangThai:'2',
            search:"",
            pageCount: 0,
            itemPerPage:5,
            result:'No QR code scanned yet',
            isQRReaderOn: true
        };
        this.myRef = React.createRef();
        this.timKiem=this.timKiem.bind(this);
        this.formAdd=this.formAdd.bind(this);
        this.delete=this.delete.bind(this);
        this.detail=this.detail.bind(this);
        this.thayDoiTrangThai=this.thayDoiTrangThai.bind(this);
        this.updateListSP = this.updateListSP.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    toggleQRReader = () => {
        this.setState((prevState) => ({
            isQRReaderOn: !prevState.isQRReaderOn,
        }));
    };
    handleScan = (data) => {
        if (data) {
            this.setState({ result: data });
        }
    };

    handleError = (err) => {
        console.error(err);
    };
    timKiem = (e)=>{
        // var list = this.state.listThayThe.filter(value => value.ten.toLowerCase().includes(e.target.value.toLowerCase()))
        this.setState({
            search: e.target.value.toLowerCase()
        }, () => {
            this.timKiemMoi();
        });

        if(e.target.value.length ===0){
            this.setState({
                sanPham:this.state.listThayThe
            })
        }
    }
    thayDoiTrangThai = (e) => {
        this.setState({
            trangThai:e.target.value}, () => {
            this.timKiemMoi();
        })
    };
    timKiemMoi(){
        if(this.state.trangThai==="2"){
            const filteredProducts = this.state.listThayThe.filter(product => {
                return (product.ma.toLowerCase().includes(this.state.search) ||
                    product.ten.toLowerCase().includes(this.state.search) ||
                    product.danhMuc.ten.toLowerCase().includes(this.state.search) ||
                    product.xuatXu.ten.toLowerCase().includes(this.state.search)||
                    product.thuongHieu.ten.toLowerCase().includes(this.state.search)
                );
            });

            this.setState({
                sanPham: filteredProducts
            });
        }else{
            const filteredProducts = this.state.listThayThe.filter(product => {
                return ( product.trangThai===parseInt(this.state.trangThai)&&
                    (   product.ma.toLowerCase().includes(this.state.search) ||
                        product.ten.toLowerCase().includes(this.state.search) ||
                        product.danhMuc.ten.toLowerCase().includes(this.state.search) ||
                        product.xuatXu.ten.toLowerCase().includes(this.state.search)||
                        product.thuongHieu.ten.toLowerCase().includes(this.state.search))
                );
            });

            this.setState({
                sanPham: filteredProducts
            });
        }
    }
    loadPageData(pageNumber) {
        SanPhamService.getSanPham(pageNumber).then(res => {
            this.setState({
                sanPham: res.data.content,
                pageCount: res.data.totalPages,
            });
        });
    }
    handlePageClick (data){
        this.setState({ pageCount: data.selected }, () => {
            this.updateListSP();
        });
    };

    componentDidMount(){
        SanPhamService.getAllSanPham().then(res=>{
            this.setState({
                listThayThe:res.data,
                sanPham:res.data.slice(0,5)
            });
        })

        this.updateListSP();
    }
    updateListSP(){
        const startIndex = this.state.pageCount * this.state.itemPerPage;
        const endIndex = startIndex + this.state.itemPerPage;
        const listSP = this.state.listThayThe.slice(startIndex, endIndex);
        this.setState({ sanPham: listSP });
    }
    formAdd(){
        window.location.href=(`/sanpham/formadd`);
    }
    delete(id){
        const confirm = window.confirm("Bạn có chắc chắn muốn chuyển trạng thái sản phẩm  này ?");
        if(!confirm){
            return;
        }
        SanPhamService.deleteSanPham(id).then((res)=>{
        });
        window.location.href = (`/index`);
    }
    detail(id){
        window.location.href = (`/detail/${id}`);
    }
    render() {
        const { isQRReaderOn, result } = this.state;
        return (
            <div>
                <div className="pagetitle">
                    <h1>Quản lý sản phẩm</h1>
                    <nav>
                    </nav>
                </div>
            {/*    <div>*/}
            {/*        {isQRReaderOn && (*/}
            {/*            <QrScanner*/}
            {/*                ref={this.myRef}*/}
            {/*                onScan={this.handleScan}*/}
            {/*                onError={this.handleError}*/}
            {/*                style={{ width: '300px',height:'300px' }}*/}
            {/*            />*/}
            {/*        )}*/}

            {/*        /!* Nút để bật/tắt quét QR *!/*/}
            {/*    <button onClick={this.toggleQRReader}>*/}
            {/*        {isQRReaderOn ? 'Turn Off QR Scanner' : 'Turn On QR Scanner'}*/}
            {/*    </button>*/}

            {/*    /!* Hiển thị kết quả quét QR *!/*/}
            {/*    <p>QR Code Result: {result.text}</p>*/}

            {/*    /!* Rest of your component *!/*/}
                {/*</div>*/}
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card ">
                                        <div className="col-lg-12">
                                            <h5 className="card-title" style={{margin:10}}>Lọc và tìm kiếm</h5>
                                            <label style={{margin:10}}>Tìm kiếm</label>
                                            <br/>
                                            <input className="col-lg-8" type="search" name="search" style={{borderRadius:5,height:38,margin:10}} placeholder="Search" onChange={this.timKiem}/>
                                            <button className="btn btn-primary " style={{margin:10}} onClick={this.formAdd}> Thêm sản phẩm </button>
                                            <div>
                                                <label style={{margin:10}}>Trạng thái</label>
                                                <label style={{margin:10,color:"blue"}}><input type="radio" value="2" name="trangThai" id="trangThai" checked={this.state.trangThai==="2"} onChange={this.thayDoiTrangThai}/> Tất cả</label>
                                                <label style={{margin:10,color:"green"}}><input type="radio" value="1" name="trangThai" id="trangThai" checked={this.state.trangThai==="1"} onChange={this.thayDoiTrangThai}/> Hoạt động</label>
                                                <label style={{margin:10,color:"red"}}><input type="radio" value="0" name="trangThai" id="trangThai" checked={this.state.trangThai==="0"}  onChange={this.thayDoiTrangThai}/> Ngừng hoạt động</label>


                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>

                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">
                                        <div className="card-body">
                                            <h5 className="card-title">Danh sách sản phẩm <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr className="tr1">
                                                    <th>Ảnh</th>
                                                    <th>Mã</th>
                                                    <th>Tên</th>
                                                    <th>Danh mục</th>
                                                    <th>Thương hiệu</th>
                                                    <th>Xuất xứ</th>
                                                    <th>Mô tả</th>
                                                    <th>Trạng thái</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>

                                                <tbody>

                                                {
                                                    this.state.sanPham.map(
                                                        sp =>
                                                            <tr key={sp.id}>
                                                                <td><img src={`/niceadmin/img/`+sp.anh} alt={sp.anh} style={{ width: '100px', height: '100px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}}/></td>
                                                                <td>{sp.ma}</td>
                                                                <td>{sp.ten}</td>
                                                                <td>{sp.danhMuc.ten}</td>
                                                                <td>{sp.thuongHieu.ten}</td>
                                                                <td>{sp.xuatXu.ten}</td>
                                                                <td>{sp.moTa}</td>
                                                                <td style={{ color: sp.trangThai === 1 ? 'green' : 'red' }}>{sp.trangThai===1?"HD":"Ko HD"}</td>
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
                                                pageCount={Math.ceil(this.state.listThayThe.length / this.state.itemPerPage)}
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