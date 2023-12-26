import React, { Fragment, useEffect } from "react"
import { Link } from "react-router-dom/cjs/react-router-dom";

function Payment() {

    useEffect(() => {
        
    }, []);

    return (
        <Fragment>
            <body>

                {/*<header>*/}
                {/*    <nav class="navbar navbar-light bg-light">*/}
                {/*        <div class="container-fluid justify-content-end">*/}
                {/*            <Link to='/register' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-user'></i> Đăng ký</a></Link>*/}
                {/*            <Link to='your-cart' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>*/}
                {/*        </div>*/}
                {/*    </nav>*/}

                {/*    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>*/}
                {/*        <div className="container">*/}
                {/*            <div className="d-flex justify-content-between align-items-left w-100" style={{ marginRight: '10px' }}>*/}
                {/*                <Link to='/' style={{ textDecoration: 'none' }}> <a className="navbar-brand d-flex align-items-center">*/}
                {/*                    <img style={{ width: '90px' }}*/}
                {/*                        src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"*/}
                {/*                        alt="site icon" />*/}
                {/*                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
                {/*                </a>*/}
                {/*                </Link>*/}
                {/*            </div>*/}

                {/*            <div className="collapse navbar-collapse justify-content-center" id="navMenu">*/}
                {/*                <ul className="navbar-nav mx-auto text-center">*/}
                {/*                    <li className="nav-item px-1 py-1">*/}

                {/*                        <Link to='/' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">TRANG CHỦ</a>*/}
                {/*                        </Link>*/}

                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1">*/}
                {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">SẢN PHẨM</a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1">*/}
                {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">BÀI VIẾT</a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1">*/}
                {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">LIÊN HỆ</a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1">*/}
                {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1">*/}
                {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
                {/*                            <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                    <li className="nav-item px-1 py-1" style={{ marginLeft: '65px' }}>*/}
                {/*                        <form className="d-flex">*/}
                {/*                            <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" style={{ width: '200px' }} />*/}
                {/*                            <button className="btn btn-outline-success" type="submit">Search</button>*/}
                {/*                        </form>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </nav>*/}
                {/*</header>*/}

                <main style={{ minHeight: '100vh', backgroundColor: 'rgb(234, 227, 219)' }} data-bs-spy="scroll"
                    data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabindex="0">
                    <div className="content trang2 " id="div1">
                        <div className="row container">
                            <div className="col-8 content-left bg-light pt-3">
                                <h1><strong>THÔNG TIN NHẬN HÀNG</strong></h1>
                                <hr />
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="formId1" id="formId1" placeholder="tên" />
                                    <label for="formId1">Họ tên</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="formId2" id="formId1" placeholder="sdt" />
                                    <label for="formId2">Số điện thoại</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" name="formId3" id="formId1" placeholder="tên" />
                                    <label for="formId3">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="formId1" id="formId4" placeholder="tên" />
                                    <label for="formId4">Địa chỉ</label>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <select className="form-select form-select mb-3" id="city" aria-label=".form-select">
                                            <option value="" selected>Chọn tỉnh thành</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <select className="form-select form-select mb-3" id="district" aria-label=".form-select">
                                            <option value="" selected>Chọn quận huyện</option>
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <select className="form-select form-select" id="ward" aria-label=".form-select">
                                            <option value="" selected>Chọn phường xã</option>
                                        </select>
                                    </div>
                                </div>
                                <h2><strong>PHƯƠNG THỨC GIAO HÀNG</strong></h2>
                                <hr />
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" name="" id="" type="radio" value="checkedValue"
                                            aria-label="Text for screen reader" />
                                        a đù
                                    </label>

                                </div>

                                <h2><strong>PHƯƠNG THỨC THANH TOÁN</strong></h2>
                                <hr />
                            </div>
                            <div className="col-4 content-right bg-light pt-3">
                                <h1><strong>ĐƠN HÀNG</strong></h1>
                                <hr />
                                <div className="row mb-4 border py-2">
                                    <div className="col-8">
                                        <h5><strong>tên sản phẩm + Màu</strong></h5>
                                        <span>Size: 34</span>
                                        <span className="float-end">Số lượng: 4</span>
                                    </div>
                                    <div className="col-4 ">
                                        <p></p>
                                        <h6 className="float-end">100.000 VND</h6>
                                    </div>

                                </div>
                                <div className="row mb-4 border py-2">
                                    <div className="col-8">
                                        <h5><strong>tên sản phẩm + Màu</strong></h5>
                                        <span>Size: 54</span>
                                        <span className="float-end">Số lượng: 4</span>
                                    </div>
                                    <div className="col-4 ">
                                        <p></p>
                                        <h6 className="float-end">250.000 VND</h6>
                                    </div>
                                </div>

                                <hr className="dashed-hr" />
                                <div className="row">
                                    <div className="col-6"> <span>Đơn hàng :</span></div>
                                    <div className="col-6"> <span className="float-end">100.333.213 VND</span></div>
                                    <div className="col-6"> <span>Giảm :</span></div>
                                    <div className="col-6"> <span className="float-end">900.000</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-4"><br />
                                        <h5><strong style={{ color: 'orangered' }}>TỔNG CỘNG: </strong></h5>
                                    </div>
                                    <div className="col-8 "><br />
                                        <h5><strong className="float-end" style={{ color: 'orangered' }}>124.121.000 VND</strong></h5>
                                    </div>

                                </div>
                                <hr className="dashed-hr" />
                                <span>

                                    Cảm ơn quý khách đã tin tưởng và mua hàng tại website của chúng tôi 😍
                                </span>
                                <hr className="dashed-hr" />



                                <div className="row">
                                    <div className="col-12 mt-2">
                                        <a href="#" className="btn btn-warning btn-lg" style={{ width: '100%' }}><strong>TIẾP TỤC THANH
                                            TOÁN</strong></a>
                                    </div>
                                </div>
                            </div>
                            <hr className="dashed-hr mt-5" />
                        </div>
                    </div>
                </main>

                {/*<footer>*/}
                {/*    <footer class="bg-gray py-5" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>*/}
                {/*        <div class="container">*/}
                {/*            <div class="row text-black g-4">*/}
                {/*                <div class="col-md-6 col-lg-3">*/}
                {/*                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
                {/*                    <p class="text-black text-muted mt-3"> <strong>Giày thể thao chính hãng </strong><br />*/}
                {/*                        Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br />*/}
                {/*                        Đội ngũ hỗ trợ khách hàng luôn luôn 24/7*/}
                {/*                    </p>*/}
                {/*                </div>*/}

                {/*                <div class="col-md-6 col-lg-3">*/}
                {/*                    <h5 class="fw-dark">Liên Kết</h5>*/}
                {/*                    <ul class="list-unstyled">*/}
                {/*                        <li class="my-3">*/}
                {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
                {/*                                Home*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                        <li class="my-3">*/}
                {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
                {/*                                Bộ sưu tập*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                        <li class="my-3">*/}
                {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
                {/*                                Blogs*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                        <li class="my-3">*/}
                {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
                {/*                                Về chúng tôi*/}
                {/*                            </a>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}

                {/*                <div class="col-md-6 col-lg-3">*/}
                {/*                    <h5 class="fw-light mb-4">Liên Hệ</h5>*/}
                {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
                {/*                        <span class="me-0">*/}
                {/*                            <i class="fas fa-map-marked-alt"></i>*/}
                {/*                        </span>*/}
                {/*                        <span class="fw-light">*/}
                {/*                            Hoàng Quốc Việt - Cầu Giấy - Hà Nội*/}
                {/*                        </span>*/}
                {/*                    </div>*/}
                {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
                {/*                        <span class="me-0">*/}
                {/*                            <i class="fas fa-envelope"></i>*/}
                {/*                        </span>*/}
                {/*                        <span class="fw-light">*/}
                {/*                            404shopshoes@gmail.com*/}
                {/*                        </span>*/}
                {/*                    </div>*/}
                {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
                {/*                        <span class="me-0">*/}
                {/*                            <i class="fas fa-phone-alt"></i>*/}
                {/*                        </span>*/}
                {/*                        <span class="fw-light">*/}
                {/*                            +84 0819130199*/}
                {/*                        </span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <div class="col-md-6 col-lg-3">*/}
                {/*                    <h5 class="fw-light mb-3">Theo Dõi</h5>*/}
                {/*                    <div>*/}
                {/*                        <ul class="list-unstyled d-flex flex-column">*/}
                {/*                            <li>*/}
                {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
                {/*                                    <i class="fab fa-facebook-f"> Facebook</i>*/}
                {/*                                </a>*/}
                {/*                            </li>*/}
                {/*                            <li>*/}
                {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
                {/*                                    <i class="fab fa-twitter"> Twitter</i>*/}
                {/*                                </a>*/}
                {/*                            </li>*/}
                {/*                            <li>*/}
                {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
                {/*                                    <i class="fab fa-instagram"> Instagram</i>*/}
                {/*                                </a>*/}
                {/*                            </li>*/}
                {/*                        </ul>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </footer>*/}
                {/*</footer>*/}

            </body>
        </Fragment>
    )
}

export default Payment;