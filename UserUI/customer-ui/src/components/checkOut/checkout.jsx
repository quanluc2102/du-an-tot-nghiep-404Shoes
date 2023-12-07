import React, {Fragment, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import "./style.css"
import { Link } from 'react-router-dom/cjs/react-router-dom'

function CheckOut({ match }) {
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
        // const fetchData = async () => {
        //     try {
        //         const dataGioHang = await GioHangService.getGHOne(id);
        //         setSPCT(dataGioHang);
        //     } catch (error) {
        //     }
        // };
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
        // fetchData();
    }, )
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <Fragment>
            <body>
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

                                        <Link to='/'
                                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                            <a className="nav-link text-uppercase">TRANG CHỦ</a>
                                        </Link>

                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='product-list'
                                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                            <a className="nav-link text-uppercase">SẢN PHẨM</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='product-list'
                                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                            <a className="nav-link text-uppercase">BÀI VIẾT</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='product-list'
                                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>
                                            <a className="nav-link text-uppercase">LIÊN HỆ</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1" style={{marginLeft: '65px'}}>
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Tìm kiếm..."
                                                   aria-label="Search" style={{width: '200px'}}/>
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
                        <div className="row container ">
                            <div className="col-12 bg-light pt-3 colored-border" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red"
                                     className="bi bi-geo-alt-fill float-start" viewBox="0 0 16 16" style={{marginLeft:30}}>
                                    <path
                                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                <h5 style={{color:"red",marginLeft:35}}>Địa chỉ giao hàng</h5>
                                <br/>
                                <p style={{marginLeft:30}}><strong>Tên người dùng (Số điện thoại) </strong> Địa chỉ người dùng <a style={{marginLeft:50,textDecoration:"none",cursor:"pointer",color:"mediumblue"}} onClick>Thay đổi</a></p>
                            </div>
                            <br/>
                            <br/>
                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <table className="table table-borderless datatable">
                                    <thead>
                                    <tr className="tr1">
                                        <th>Sản phẩm</th>
                                        <th></th>
                                        <th></th>
                                        <th style={{opacity:0.5}}>Đơn giá</th>
                                        <th style={{opacity:0.5}}>Số lượng</th>
                                        <th style={{opacity:0.5,float:"right"}}>Thành tiền</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><img src={`/img/anh1.jpg`} style={{ width: '60px', height: '60px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}}/> Sản Phẩm 1</td>
                                            <td><br/>Màu : Đen</td>
                                            <td><br/>Kich Thước : 38</td>
                                            <td><br/>150000 VND</td>
                                            <td><br/>1</td>
                                            <td style={{textAlign:"right"}}><br/>150000 VND</td>
                                        </tr>
                                        <tr>
                                            <td><img src={`/img/anh2.jpg`} style={{ width: '60px', height: '60px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}}/> Sản Phẩm 1</td>
                                            <td><br/>Màu : Đen</td>
                                            <td><br/>Kich Thước : 38</td>
                                            <td><br/>150000 VND</td>
                                            <td><br/>1</td>
                                            <td style={{textAlign:"right"}}><br/>150000 VND</td>
                                        </tr>
                                    </tbody>


                                </table>

                                <hr className="dashed-hr"/>
                                <div className="row" style={{ height: '50px' }}>
                                    <div className="col-5 d-inline-flex" style={{borderRight:"2px dashed black", height: '100%'}}>
                                        <h7 style={{marginTop:8,marginLeft:35}}>Lời nhắn:   </h7>
                                        <input className="form-control input-group" placeholder={"Lời nhắn cho người bán"} style={{marginLeft:20,width:390,height:40}}/>
                                    </div>
                                    <div className="col-7 d-inline">
                                        <h7 style={{marginTop:8,float:"right"}}>Phí ship : 15000 VND
                                        </h7>
                                    </div>

                                </div>
                                <hr className="dashed-hr"/>
                                <span style={{textAlign:"right"}}>
                                    <p>Tổng số tiền (số sản phẩm) : 300000 VND</p>
                                </span>
                                <hr className="dashed-hr"/>
                            </div>

                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <div className="col-12 bg-light pt-3" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-ticket-perforated float-start" viewBox="0 0 16 16" style={{marginLeft:30,color:"red"}}>
                                        <path
                                            d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9H4m7 0v.9h1v-.9h-1m-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                                        <path
                                            d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
                                    </svg>
                                    <h5 style={{marginLeft:40}}>Voucher <a style={{textDecoration:"none",cursor:"pointer",color:"mediumblue",marginLeft:1000}} onClick>Chọn voucher</a></h5>
                                    <h7></h7>
                                    <br/>
                                </div>


                                {/*<div className="row">*/}


                                {/*    <div className="col-12 mt-2">*/}
                                {/*        <a href="#" className="btn btn-warning btn-lg" style={{width: '100%'}}><strong>TIẾP*/}
                                {/*            TỤC THANH*/}
                                {/*            TOÁN</strong></a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <div className="col-12 bg-light pt-3" >
                                    <h5 style={{marginLeft:35}}>Phương thức thanh toán <a style={{textDecoration:"none",cursor:"pointer",color:"mediumblue",marginLeft:980}} onClick>Đổi</a></h5>
                                    <hr className="dashed-hr" style={{marginTop:30}}/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tổng tiền hàng : <span style={{float:"right"}}> 300000 VND</span></h7>
                                    <br/>
                                    <br/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Phí ship : <span style={{float:"right"}}> 15000 VND</span></h7>
                                    <br/>
                                    <br/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tông thanh toán : <span style={{float:"right",color:"red",fontSize:22}}> 315000 VND</span></h7>
                                    <br/>
                                    <hr className="dashed-hr"/>
                                    <div className="row">


                                        <div className="col-12 mt-2">
                                            <a className="btn btn-danger btn-lg col-4" style={{width: '23%',float:"right",color:"white"}}>THANH TOÁN</a>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                {/*<div className="row">*/}


                                {/*    <div className="col-12 mt-2">*/}
                                {/*        <a href="#" className="btn btn-warning btn-lg" style={{width: '100%'}}><strong>TIẾP*/}
                                {/*            TỤC THANH*/}
                                {/*            TOÁN</strong></a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </main>
                <br/>
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

        </Fragment>
    )
}


export default CheckOut;