import React, {Fragment, useEffect, useState} from "react"
import { useParams } from 'react-router-dom';
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";
import {SanPhamService} from "../../service/SanPhamService";
import axios from "axios";

function ProductDetail({ match }) {
    const [sanPham, setSanPham] = useState();
    const [user,setUser]=useState([]);
    const [listSPCT, setListSPCT] = useState([]);
    const [listSPAnh, setListSPAnh] = useState([]);
    const [listMauSac, setListMauSac] = useState([]);
    const [listKichThuoc, setListKichThuoc] = useState([]);
    const [selectedMauSac, setSelectedMauSac] = useState(null);
    const [selectedKichThuoc, setSelectedKichThuoc] = useState(null);
    const [soLuong, setSoLuong] = useState(0);
    const [selectedAnh, setSelectedAnh] = useState(0);
    const { id } = match.params;
    const fetchData = async () =>{

        try {
            const dataSanPham = await SanPhamService.getSPOne(id);
            const dataSPCT = await SanPhamService.getSPCT(id);
            const dataSPAnh = await SanPhamService.getSPAnh(id);
            const storedDataUser = localStorage.getItem('currentUser');
            const dataUser = storedDataUser ? JSON.parse(storedDataUser) : [];
            if(storedDataUser){
                setUser(dataUser)
            }
            setSanPham(dataSanPham);
            setListSPAnh(dataSPAnh);
            setListSPCT(dataSPCT);
            const mauSacList = [] ;
            const kichThuocList = [] ;
            for(let i =0;i<listSPCT.length;i++){
                const mauSac = listSPCT[i].mauSac;
                const idMauSac = listSPCT[i].mauSac.id;

                // Kiểm tra xem màu sắc đã tồn tại trong danh sách chưa
                const existingMauSac = mauSacList.find(item => item.id === idMauSac);

                if (!existingMauSac) {
                    mauSacList.push( mauSac );
                }

            }
            for(let i =0;i<listSPCT.length;i++){
                const kichThuoc = listSPCT[i].kichThuoc;
                const idKichThuoc = listSPCT[i].kichThuoc.id;

                // Kiểm tra xem màu sắc đã tồn tại trong danh sách chưa
                const existingKichThuoc = kichThuocList.find(item => item.id === idKichThuoc);

                if (!existingKichThuoc) {
                    kichThuocList.push( kichThuoc );
                }

            }
            setListMauSac(mauSacList);
            setListKichThuoc(kichThuocList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {

        const obse = new IntersectionObserver((enti) => {
            enti.forEach((enty) => {
                if (enty.isIntersecting) {
                    enty.target.classList.add('show')
                } else {
                    enty.target.classList.remove('show')
                }
            })
        })

        const contentText = document.querySelectorAll('.contentProductDetail-right')
        contentText.forEach((e) => { obse.observe(e) })
        const contentImg = document.querySelectorAll('.contentProductDetail-left')
        contentImg.forEach((e) => { obse.observe(e) })

        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';
        });
        fetchData();
        const filteredSPCT = filterSPCT();
    },);
    const addGioHang=async () => {
        let sanPham = {
            spct: filteredSPCT[0],
            soLuong: soLuong,
            nguoiDung: user
        }
        console.log('nsx' + JSON.stringify(sanPham));
        const gioHang = await SanPhamService.fakeGHGuest();
        try {
            if(sanPham.soLuong===0||!sanPham.soLuong===0){
                alert("Không thể thêm vào giỏ hàng vì số lượng = 0 !")
            }else{
                if(user.length!=0){
                    const response = await SanPhamService.addGioHang(sanPham);
                    alert('Sản phẩm đã được thêm vào giỏ hàng !');
                }else{
                    const storedDataSPCT = localStorage.getItem("listSPCT");
                    const dataSPCT = storedDataSPCT ? JSON.parse(storedDataSPCT) : [];
                    const spct = {
                        id:Math.floor(Math.random() * 100000) + 1,
                        gioHangId:gioHang,
                        sanPhamChiTietId: filteredSPCT[0],
                        soLuong: soLuong
                    }
                    let total =0;
                    dataSPCT.map(sp=>{
                        if(sp.sanPhamChiTietId.id===spct.sanPhamChiTietId.id){
                            total+=1;
                        }
                    })

                    if(total===0){
                        dataSPCT.push(spct);
                    }else {
                        dataSPCT.map(sp=>{
                            if(sp.sanPhamChiTietId.id===spct.sanPhamChiTietId.id){
                                sp.soLuong+=spct.soLuong;
                            }
                        })
                    }

                    console.log(total)
                    localStorage.setItem("listSPCT", JSON.stringify(dataSPCT));
                    alert("Thêm vào giỏ hàng thành công !")
                }
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    const handleMauSacClick = (ms) => {
        setSelectedMauSac(ms === selectedMauSac ? null : ms);
        setSoLuong(0)
        console.log(selectedMauSac)
        console.log(String(selectedMauSac) === String(ms))
    };

    const handleKichThuocClick = (kt) => {
        setSelectedKichThuoc(kt === String(selectedKichThuoc) ? null : kt);
        setSoLuong(0)
        console.log(selectedKichThuoc)
        console.log(filteredSPCT)
    };

    const filterSPCT = () => {
        return listSPCT.filter((item) => {
            // Kiểm tra xem sản phẩm có màu sắc và kích thước phù hợp không
            return (
                (!selectedMauSac || item.mauSac.id === selectedMauSac.id) &&
                (!selectedKichThuoc || item.kichThuoc.id === selectedKichThuoc.id)
            );
        });
    };
    const changeSoLuong = (e) => {
        const maxSoLuong = filteredSPCT.length > 0 ? filteredSPCT[0].soLuong : 0;
        setSoLuong(Math.min(maxSoLuong, Math.max(0 ,e.target.value)));
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const filteredSPCT = filterSPCT();
    return (
        <Fragment>
            {sanPham && (
                <body>
                {/*<header>*/}
                {/*</header>*/}

                <main style={{minHeight: '100vh'}} data-bs-spy="scroll"
                      data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabIndex="0" id="main">
                    <div className="contentProductDetail trang2ProductDetail " id="div1">
                        <div className="row container">
                            <div className="col-7 contentProductDetail-left">

                                <div className="mb-3">
                                    <img
                                        src={'/img/'+listSPAnh[selectedAnh].anh}
                                        className="anh-to w-100" id="product-image" alt=""/>

                                </div>
                                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">

                                    <div className="carousel-inner" role="listbox">
                                        <div className="carousel-item active ">
                                            <div className="row">
                                                {listSPAnh.map(anh=>(
                                                    <div className="col-3" key={anh.id}>
                                                        <img
                                                            src={'/img/'+anh.anh}                                                            height="140px"
                                                            // onClick="changeProductImage('/imgs/shoe-banner (6).jpg')"
                                                            alt="First slide"/>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="carousel-item">
                                            <div className="row">

                                                {/*<div className="col-3">*/}
                                                {/*    <img*/}
                                                {/*        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1ba59130eb734cbb92efaf9c00a336cf_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_05_standard.jpg"*/}
                                                {/*        height="140px"*/}
                                                {/*        onClick="changeProductImage('/imgs/shoe-banner (2).jpg')"*/}
                                                {/*        alt="First slide"/>*/}

                                            </div>
                                        </div>
                                    </div>

                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselId"
                                            data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Trang Trước</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselId"
                                            data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Trang Sau</span>
                                    </button>
                                </div>
                            </div>

                            <div className="col-5 contentProductDetail-right">
                                <h1><strong>{sanPham.ten}</strong></h1>
                                <div className="row">
                                    <div className="col-6"><span>Mã sản phẩm: {sanPham.ma}</span></div>
                                    <div className="col-6"><span>Tình trạng: Vãn còn</span></div>
                                    <div className="col-6"><span>Hãng: {sanPham.thuongHieu.ten}</span></div>
                                    <div className="col-6"><span>Loại: {sanPham.danhMuc.ten}</span></div>
                                </div>

                                <div className="row">
                                    {filteredSPCT.length!=1?(<div className="col-12"><br/>
                                    </div>):(<div className="col-12"><br/>
                                        <h3><strong style={{color: 'orangered'}}>{formatCurrency(filteredSPCT[0].donGia)}</strong></h3>
                                    </div>)}


                                </div>
                                <hr className="dashed-hr"/>
                                <span>{sanPham.moTa}
                                </span>
                                <hr className="dashed-hr"/>
                                <div className="row">
                                    {listMauSac.map((ms, index) => (

                                        // <div
                                        //     key={index}
                                        //     className={`color-item ${ms.id === selectedMauSac.id ? 'selected' : ''}`}
                                        //     // style={{ backgroundColor: "aqua" }}
                                        //     onClick={() => handleMauSacClick(ms)}
                                        //
                                        // ><label>{ms.ten}</label></div>
                                        !selectedMauSac ? (<div
                                            key={index}
                                            className={`color-item `}
                                            // style={{ backgroundColor: color }}
                                            onClick={() => handleMauSacClick(ms)}
                                        ><label>{ms.ten}</label></div>) : (
                                            <div
                                                key={index}
                                                className={`color-item ${ms.id === selectedMauSac.id ? 'selected' : ''}`}
                                                // style={{ backgroundColor: color }}
                                                onClick={() => handleMauSacClick(ms)}
                                            ><label style={{alignContent:"center"}}>{ms.ten}</label></div>
                                        )

                                    ))}
                                    {/*<div className="col-1 ms-1 mb-3">*/}
                                    {/*    <a href="#">*/}
                                    {/*        <div style={{*/}
                                    {/*            width: '40px',*/}
                                    {/*            height: '40px',*/}
                                    {/*            backgroundColor: 'rgb(32, 8, 97)'*/}
                                    {/*        }}>*/}
                                    {/*        </div>*/}
                                    {/*    </a>*/}
                                    {/*</div>*/}
                                </div>

                                <hr className="dashed-hr"/>
                                <div className="row ">
                                    <div className="col-6">
                                        <div className="accordion" id="accordionExample3">
                                            <div className="accordion-item ">
                                                <h1 className="accordion-header" id="headingOne3">
                                                    <button className="accordion-button collapsed" type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne3"
                                                            aria-controls="collapseOne3"
                                                            aria-expanded="false">
                                                        <strong className="font-monospace">Kích Thước</strong>
                                                    </button>
                                                </h1>
                                                <div id="collapseOne3" className="accordion-collapse collapse"
                                                     aria-labelledby="headingOne3" data-bs-parent="#accordionExample3">
                                                    <div className="accordion-body row ">
                                                        {listKichThuoc.map(kt => (
                                                            !selectedKichThuoc ? (<div className="col-3 mb-3" key={kt.id}>
                                                                <a href="#" className={`btn btn-sm btn-outline-dark size-item`} onClick={() => handleKichThuocClick(kt)}>
                                                                    <div>{kt.giaTri}</div>
                                                                </a>
                                                            </div>) : (
                                                                <div className="col-3 mb-3" key={kt.id}>
                                                                    <a href="#" className={`btn btn-sm btn-outline-dark size-item ${kt.id === selectedKichThuoc.id ? 'selected' : ''}`} onClick={() => handleKichThuocClick(kt)}>
                                                                        <div>{kt.giaTri}</div>
                                                                    </a>
                                                                </div>
                                                                )

                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">

                                        <div className="form-floating mb-3 border-0">
                                            <input type="number" className="form-control" name="formId1"
                                                   id="formId1"
                                                   disabled={filteredSPCT.length > 1}
                                                   value={soLuong}
                                                    onChange={(e)=>changeSoLuong(e)}/>
                                            <label htmlFor="formId1" className="font-monospace"><strong>Số Lượng
                                                : {filteredSPCT.length===1 ? filteredSPCT[0].soLuong : "0" }</strong></label>
                                        </div>
                                    </div>
                                </div>

                                <hr className="dashed-hr"/>
                                <div className="row">


                                    <div className="col-12">
                                        <a className="btn btn-success btn-lg" style={{width: '100%'}} onClick={()=>addGioHang()}><strong>THÊM
                                            VÀO GIỎ
                                            HÀNG</strong></a>
                                    </div>
                                </div>
                            </div>

                            <hr className="dashed-hr mt-5"/>
                            <h1 className="text-center">SẢN PHẨM LIÊN QUAN</h1>
                            <div className="row mb-5">

                                <div className="col-3 mt-4">
                                    <div className="cardProductDetail text-start ">
                                        <div className="position-relative">

                                            <img className="card-img-top"
                                                 src="https://ananas.vn/wp-content/uploads/Pro_A6T014_2-500x500.jpeg"
                                                 alt="Title"/>
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Mới !</button>
                                            </div>

                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br/>

                                        <div className="card-body text-center">

                                            <h4 className="card-title"><strong>Tên Sản Phẩm</strong></h4>
                                            <h6 className="card-text">Hãng - Dòng</h6>
                                            <h5 className="card-text">1.000.000 VND</h5>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-3 mt-4">
                                    <div className="cardProductDetail text-start ">
                                        <div className="position-relative">

                                            <img className="card-img-top"
                                                 src="https://ananas.vn/wp-content/uploads/Pro_A6T015_2-500x500.jpeg"
                                                 alt="Title"/>
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Mới !</button>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br/>

                                        <div className="card-body text-center">

                                            <h4 className="card-title"><strong>Tên Sản Phẩm</strong></h4>
                                            <h6 className="card-text">Hãng - Dòng</h6>
                                            <h5 className="card-text">1.000.000 VND</h5>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-3 mt-4">
                                    <div className="cardProductDetail text-start ">
                                        <div className="position-relative">

                                            <img className="card-img-top"
                                                 src="https://ananas.vn/wp-content/uploads/Pro_A6T014_2-500x500.jpeg"
                                                 alt="Title"/>
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Cũ !</button>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br/>

                                        <div className="card-body text-center">

                                            <h4 className="card-title"><strong>Tên Sản Phẩm</strong></h4>
                                            <h6 className="card-text">Hãng - Dòng</h6>
                                            <h5 className="card-text">1.000.000 VND</h5>

                                        </div>
                                    </div>
                                </div>

                                <div className="col-3 mt-4">
                                    <div className="cardProductDetail text-start ">
                                        <div className="position-relative">
                                            <img className="card-img-top"
                                                 src="https://ananas.vn/wp-content/uploads/Pro_A6T012_2-500x500.jpg"
                                                 alt="Title"/>
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Hết Hàng !</button>
                                            </div>

                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br/>

                                        <div className="card-body text-center">

                                            <h4 className="card-title"><strong>Tên Sản Phẩm</strong></h4>
                                            <h6 className="card-text">Hãng - Dòng</h6>
                                            <h5 className="card-text">1.000.000 VND</h5>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>


                {/*<footer>*/}
                {/*</footer>*/}

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                    className="bi bi-arrow-up-short"></i></a>
                </body>
            )}

        </Fragment>
    )
}

export default ProductDetail;