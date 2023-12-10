import React, {Fragment, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import './style.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import {GioHangService} from "../../service/GioHangService";

function Cart({ match }) {
    const [SPCT, setSPCT] = useState([]);
    const [listSPCTSelected,setListSPCTSelected] = useState([]);
    const [tongTien,setTongTien] = useState(0);
    const { id } = match.params;
    // const fetchData = async () =>{
    //
    //     try {
    //         const dataGioHang = await GioHangService.getGHOne(id)
    //
    //         setSPCT(dataGioHang);
    //         console.log(dataGioHang)
    //         console.log(SPCT)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataGioHang = await GioHangService.getGHOne(id);
                setSPCT(dataGioHang);
            } catch (error) {
            }
        };
        const obse = new IntersectionObserver((enti) => {
            enti.forEach((enty) => {
                if (enty.isIntersecting) {
                    enty.target.classList.add('show')
                } else {
                    enty.target.classList.remove('show')
                }
            })
        })

        const contentText = document.querySelectorAll('.content-right')
        contentText.forEach((e) => { obse.observe(e) })
        const contentImg = document.querySelectorAll('.content-left')
        contentImg.forEach((e) => { obse.observe(e) })


        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';

        });
        fetchData();
    }, )
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const thayDoiSoLuong = (id, soLuongMoi) =>{
        const updatedProducts = SPCT.map(product => {
            if (product.id === id) {
                // Nếu là sản phẩm cần thay đổi, cập nhật số lượng mới
                return { ...product, soLuong: soLuongMoi };
            }
            return product;
        });
        setSPCT(updatedProducts);
        GioHangService.updateGHCT(id,soLuongMoi);
    }
    const xoaDon = async (id)=>{
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng ?");
        if(!confirm){
            return;
        }
        const res = await GioHangService.deleteOne(id);
        if (res.status === 200) {
            toast.success("Xóa thành công");
        } else {
            const errorMessage = "Có lỗi xảy ra khi xóa.";
            toast.error("Lỗi: " + errorMessage);
        }
        // GioHangService.deleteOne(id).then((res) => {
        //     if (res.status === 200) {
        //         toast.success("Xóa thành công"); // Display success message
        //         alert("Xóa thành công");
        //     } else {
        //         const errorMessage = "Có lỗi xảy ra khi xóa.";
        //         toast.error("Lỗi: " + errorMessage);
        //     }
        // })
        //     .catch((error) => {
        //         console.error("Error deleting item:", error);
        //     });
    }

    const xoaNhieu = ()=>{
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa những sản phẩm này khỏi giỏ hàng ?");
        if(!confirm){
            return;
        }
        listSPCTSelected.map(value => {
            GioHangService.deleteOne(value.id).then((res) => {
                if (res.status === 200) {
                    toast.success("Xóa thành công"); // Display success message
                } else {
                    const errorMessage = "Có lỗi xảy ra khi xóa.";
                    toast.error("Lỗi: " + errorMessage);
                }
            })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                });
        })
        setListSPCTSelected([])
        setTongTien(0)
    }

    const tinhTongTien = () =>{
        const tongTien = listSPCTSelected.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
        return tongTien;
    }

    const chonSPCT = (spct)=>{
        const isSelected = listSPCTSelected.some((selected) => selected.id === spct.id);

        // Nếu đã chọn, loại bỏ spct khỏi danh sách
        // Nếu chưa chọn, thêm spct vào danh sách
        if (isSelected) {
            setListSPCTSelected(listSPCTSelected.filter((selected) => selected.id !== spct.id));
        } else {
            setListSPCTSelected([...listSPCTSelected, spct]);
        }
    }
    return (
        <Fragment>
            {SPCT && (<body>

            <header>
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid justify-content-end">
                        <Link to='/login' style={{textDecoration: 'none'}}><a className="navbar-brand" href="#"
                                                                              style={{fontSize: '13px'}}> <i
                            className='bx bxs-user'></i> Đăng nhập</a></Link>
                        <Link to='your-cart' style={{textDecoration: 'none'}}><a className="navbar-brand" href="#"
                                                                                 style={{fontSize: '13px'}}> <i
                            className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>
                    </div>
                </nav>

                <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead"
                     style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-left w-100"
                             style={{marginRight: '10px'}}>
                            <Link to='/' style={{textDecoration: 'none'}}> <a
                                className="navbar-brand d-flex align-items-center">
                                <img style={{width: '90px'}}
                                     src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"
                                     alt="site icon"/>
                                <a className="text-uppercase text-decoration-none brand text-black"
                                   style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>
                            </a>
                            </Link>
                        </div>

                        <div className="collapse navbar-collapse justify-content-center" id="navMenu">
                            <ul className="navbar-nav mx-auto text-center">
                                <li className="nav-item px-1 py-1">

                                    <Link to='/' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">TRANG CHỦ</a>
                                    </Link>

                                </li>
                                <li className="nav-item px-1 py-1">
                                    <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">SẢN PHẨM</a>
                                    </Link>
                                </li>
                                <li className="nav-item px-1 py-1">
                                    <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">BÀI VIẾT</a>
                                    </Link>
                                </li>
                                <li className="nav-item px-1 py-1">
                                    <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">LIÊN HỆ</a>
                                    </Link>
                                </li>
                                <li className="nav-item px-1 py-1">
                                    <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>
                                    </Link>
                                </li>
                                <li className="nav-item px-1 py-1">
                                    <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                        <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>
                                    </Link>
                                </li>
                                <li className="nav-item px-1 py-1" style={{ marginLeft: '65px' }}>
                                    <form className="d-flex">
                                        <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" style={{ width: '200px' }} />
                                        <button className="btn btn-outline-success" type="submit">Search</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <main style={{minHeight: '120vh'}} data-bs-spy="scroll"
                  data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabIndex="0">
                <div className="content" id="div1">
                    <div className="row container">
                        <div className="col-8 content-left bg-light pt-3">
                            <h1 style={{display: 'flex'}}><strong>GIỎ HÀNG</strong></h1>
                            <hr/>
                            {SPCT.map((spct, index) => (
                                <div className="the-san-pham my-3 position-relative" key={spct.id}>
                                    <div className="row">

                                        <div className="col-1" style={{}}>
                                            <input type="checkbox" className="btn-check" id={spct.id}
                                                   autoComplete="off" onChange={(e)=>chonSPCT(spct)}/>
                                            <label className="btn btn-outline-primary" htmlFor={spct.id}>✔</label>
                                            <button className="btn btn-outline-danger" style={{width:40,marginTop:10}} onClick={()=>xoaDon(spct.id)}>X</button>
                                        </div>

                                        <div className="col-4">
                                            <img
                                                src={'/img/'+spct.sanPhamChiTietId.anh}
                                                width="200px"
                                                height="200px" alt="ảnh sản phẩm"/>
                                        </div>
                                        <div className="col-7">
                                            <div className="row mb-6">
                                                <h4 style={{display: 'flex'}}>
                                                    <strong>{spct.sanPhamChiTietId.sanPham.ten}</strong>
                                                </h4>
                                                <div style={{display: 'flex'}} className="col-6">
                                                    <span style={{color:"red"}}><strong style={{color:"black"}}>Giá : </strong> {formatCurrency(spct.sanPhamChiTietId.donGia)} </span></div>
                                                <div style={{display: 'flex'}} className="col-6">
                                                    <span><strong>Size</strong> : {spct.sanPhamChiTietId.kichThuoc.giaTri}</span></div>
                                                <div style={{display: 'flex'}} className="col-6">
                                                    <span style={{color:"red"}}><strong style={{color:"black"}}>Đơn giá : </strong> {formatCurrency(spct.sanPhamChiTietId.donGia * spct.soLuong)} </span></div>
                                                <div style={{display: 'flex'}} className="col-6">
                                                    <span><strong>Màu</strong> : {spct.sanPhamChiTietId.mauSac.ten}</span></div>
                                            </div>

                                            <br/>
                                            <div className="row ">
                                                <div className="col-4">
                                                    <div className="form-floating mb-3 border-1">
                                                        <input type="number" className="form-control" min="1"
                                                               name="formId1" id="formId1"
                                                               value={spct.soLuong}
                                                               onChange={(e) => thayDoiSoLuong(spct.id,parseInt(e.target.value, 10))}
                                                               placeholder="Số Lượng"/>
                                                        <label htmlFor="formId1" className="font-monospace"><strong>Số
                                                            Lượng :</strong></label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <hr className="dashed-hr"/>

                            <button className="btn btn-danger" style={{marginLeft: '0em', width: '25%'}} onClick={()=>xoaNhieu()}>Xóa ({listSPCTSelected.length})</button>
                            <button className="btn btn-primary" style={{marginLeft: '5px', width: '25%'}}>Tiếp tục mua
                                hàng
                            </button>

                        </div>


                        <div className="col-4 content-right bg-light pt-3">
                            <h1><strong>SẢN PHẨM</strong></h1>
                            <hr/>
                            {listSPCTSelected.map((spct, index) => (
                                <div className="row mb-4 border py-2">
                                    <div className="col-8">
                                        <h5><strong>{spct.sanPhamChiTietId.sanPham.ten} + {spct.sanPhamChiTietId.mauSac.ten}</strong></h5>
                                        <span>Size: {spct.sanPhamChiTietId.kichThuoc.giaTri}</span>
                                        <span className="float-end">Số lượng: {spct.soLuong}</span>
                                    </div>
                                    <div className="col-4 ">
                                        <p></p>
                                        <h6 className="float-end" style={{color:"red"}}>{formatCurrency(spct.sanPhamChiTietId.donGia)}</h6>
                                    </div>

                                </div>
                            ))}

                            <hr className="dashed-hr"/>
                            <div className="row">
                                <div className="col-5"><br/>
                                    <h5><strong style={{color: 'orangered'}}>TỔNG CỘNG: </strong></h5>
                                </div>
                                <div className="col-7 "><br/>
                                    <h5><strong className="float-end" style={{color: 'orangered'}}>{formatCurrency(tinhTongTien())}</strong>
                                    </h5>
                                </div>

                            </div>
                            <hr className="dashed-hr"/>
                            <span>
                                    Hoàn trả 100% nếu sản phẩm bị lỗi hoặc bị hỏng trong quá trình vận chuyển 🤩
                                </span>
                            <hr className="dashed-hr"/>


                            <div className="row">


                                <div className={`col-12 mt-2 ${listSPCTSelected.length === 0 ? 'disabled' : ''}`}>
                                    <a href={listSPCTSelected.length === 0 ? '#' : '/check-out'}
                                       className={`btn btn-warning btn-lg`}
                                       style={{width: '100%'}}
                                       disabled={listSPCTSelected.length === 0}><strong>TIẾP
                                        TỤC THANH
                                        TOÁN</strong></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <footer className="bg-gray py-5" style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>
                    <div className="container">
                        <div className="row text-black g-4">
                            <div className="col-md-6 col-lg-3">
                                <a className="text-uppercase text-decoration-none brand text-black"
                                   style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>
                                <p className="text-black text-muted mt-3"><strong>Giày thể thao chính
                                    hãng </strong><br/>
                                    Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br/>
                                    Đội ngũ hỗ trợ khách hàng luôn luôn 24/7
                                </p>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h5 className="fw-dark">Liên Kết</h5>
                                <ul className="list-unstyled">
                                    <li className="my-3">
                                        <a href="#" className="text-black text-decoration-none text-muted">
                                            Home
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-black text-decoration-none text-muted">
                                            Bộ sưu tập
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-black text-decoration-none text-muted">
                                            Blogs
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-black text-decoration-none text-muted">
                                            Về chúng tôi
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h5 className="fw-light mb-4">Liên Hệ</h5>
                                <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span className="me-0">
                                            <i className="fas fa-map-marked-alt"></i>
                                        </span>
                                    <span className="fw-light">
                                            Hoàng Quốc Việt - Cầu Giấy - Hà Nội
                                        </span>
                                </div>
                                <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span className="me-0">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    <span className="fw-light">
                                            404shopshoes@gmail.com
                                        </span>
                                </div>
                                <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span className="me-0">
                                            <i className="fas fa-phone-alt"></i>
                                        </span>
                                    <span className="fw-light">
                                            +84 0819130199
                                        </span>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h5 className="fw-light mb-3">Theo Dõi</h5>
                                <div>
                                    <ul className="list-unstyled d-flex flex-column">
                                        <li>
                                            <a href="#"
                                               className="text-black text-decoration-none text-muted fs-4 me-4">
                                                <i className="fab fa-facebook-f"> Facebook</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="text-black text-decoration-none text-muted fs-4 me-4">
                                                <i className="fab fa-twitter"> Twitter</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#"
                                               className="text-black text-decoration-none text-muted fs-4 me-4">
                                                <i className="fab fa-instagram"> Instagram</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </footer>
            </body>
            )}

        </Fragment>
    )
}


export default Cart;