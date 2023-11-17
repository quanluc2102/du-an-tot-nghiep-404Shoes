import React, { Fragment, useEffect } from 'react'
import './style.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'

function Cart() {

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


        const contentText = document.querySelectorAll('.content-right')
        contentText.forEach((e) => { obse.observe(e) })
        const contentImg = document.querySelectorAll('.content-left')
        contentImg.forEach((e) => { obse.observe(e) })

        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';

        });
    }, [])

    return (
        <Fragment>
            <body>

                <header>
                    <nav class="navbar navbar-light bg-light">
                        <div class="container-fluid justify-content-end">
                            <Link to='/login' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-user'></i> Đăng nhập</a></Link>
                            <Link to='your-cart' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>
                        </div>
                    </nav>

                    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-left w-100" style={{ marginRight: '10px' }}>
                                <Link to='/' style={{ textDecoration: 'none' }}> <a className="navbar-brand d-flex align-items-center">
                                    <img style={{ width: '90px' }}
                                        src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"
                                        alt="site icon" />
                                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>
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
                                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">SẢN PHẨM</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">BÀI VIẾT</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">LIÊN HỆ</a>
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

                <main style={{ minHeight: '120vh' }} data-bs-spy="scroll"
                    data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabindex="0">
                    <div className="content" id="div1">
                        <div className="row container">
                            <div className="col-8 content-left bg-light pt-3">
                                <h1 style={{ display: 'flex' }}><strong>GIỎ HÀNG</strong></h1>
                                <hr />
                                <div className="the-san-pham my-3 position-relative">
                                    <div className="row">

                                        <div className="col-1" style={{}}>
                                            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
                                            <label class="btn btn-outline-primary" for="btncheck1">✔</label>
                                        </div>

                                        <div className="col-4">
                                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1-500x500.jpeg" width="200px"
                                                height="200px" alt="ảnh sản phẩm" />
                                        </div>
                                        <div className="col-7">
                                            <div className="row mb-6">
                                                <h4 style={{ display: 'flex' }}><strong>GIÀY CHẠY BỘ ADIDAS</strong></h4>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Giá</strong> : 120.000 VND</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Tình trạng</strong> : Còn Hàng</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Đơn giá</strong> : 100.000 VND</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Màu</strong> : Nâu Đất</span></div>
                                            </div>

                                            <br />
                                            <div className="row ">
                                                <div className="col-4">
                                                    <div className="form-floating mb-3 border-1">
                                                        <input type="number" className="form-control" min="1" name="formId1" id="formId1"
                                                            placeholder="Số Lượng" />
                                                        <label for="formId1" className="font-monospace"><strong>Số Lượng :</strong></label>
                                                    </div>
                                                    {/*<i class='bx bx-trash-alt fs-2' ></i>*/}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="dashed-hr" />

                                <div className="the-san-pham my-3 position-relative">
                                    <div className="row">

                                        <div className="col-1">
                                            <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
                                            <label class="btn btn-outline-primary" for="btncheck2">✔</label>
                                        </div>

                                        <div className="col-4">
                                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00167_1-500x500.jpeg" width="200px"
                                                height="200px" alt="ảnh sản phẩm" />
                                        </div>
                                        <div className="col-7">
                                            <div className="row mb-6">
                                                <h4 style={{ display: 'flex' }}><strong>GIÀY CHẠY BỘ ADIDAS</strong></h4>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Giá</strong> : 120.000 VND</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Tình trạng</strong> : Còn Hàng</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Đơn giá</strong> : 100.000 VND</span></div>
                                                <div style={{ display: 'flex' }} className="col-6"> <span><strong>Màu</strong> : Nâu Đất</span></div>
                                            </div>

                                            <br />
                                            <div className="row ">
                                                <div className="col-4">
                                                    <div className="form-floating mb-3 border-1">
                                                        <input type="number" className="form-control" min="1" name="formId1" id="formId1"
                                                            placeholder="Số Lượng" />
                                                        <label for="formId1" className="font-monospace"><strong>Số Lượng :</strong></label>
                                                    </div>
                                                    {/*<i class='bx bx-trash-alt fs-2' ></i>*/}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="dashed-hr" />

                                <button className="btn btn-danger" style={{ marginLeft: '0em', width: '25%' }}>Xóa</button>
                                <button className="btn btn-primary" style={{ marginLeft: '5px', width: '25%' }}>Tiếp tục mua hàng</button>

                            </div>


                            <div class="col-4 content-right bg-light pt-3">
                                <h1><strong>SẢN PHẨM</strong></h1>
                                <hr />
                                <div class="row mb-4 border py-2">
                                    <div class="col-8">
                                        <h5><strong>tên sản phẩm + Màu</strong></h5>
                                        <span>Size: 34</span>
                                        <span class="float-end">Số lượng: 4</span>
                                    </div>
                                    <div class="col-4 ">
                                        <p></p>
                                        <h6 class="float-end">99.999</h6>
                                    </div>

                                </div>
                                <div class="row mb-4 border py-2">
                                    <div class="col-8">
                                        <h5><strong>tên sản phẩm + Màu</strong></h5>
                                        <span>Size: 54</span>
                                        <span class="float-end">Số lượng: 4</span>
                                    </div>
                                    <div class="col-4 ">
                                        <p></p>
                                        <h6 class="float-end">99.999.0900</h6>
                                    </div>
                                </div>

                                <hr class="dashed-hr" />
                                <div class="row">
                                    <div class="col-5"><br />
                                        <h5><strong style={{ color: 'orangered' }}>TỔNG CỘNG: </strong></h5>
                                    </div>
                                    <div class="col-7 "><br />
                                        <h5><strong class="float-end" style={{ color: 'orangered' }}>124.121.000 VND</strong></h5>
                                    </div>

                                </div>
                                <hr class="dashed-hr" />
                                <span>
                                    Hoàn trả 100% nếu sản phẩm bị lỗi hoặc bị hỏng trong quá trình vận chuyển 🤩
                                </span>
                                <hr class="dashed-hr" />



                                <div class="row">



                                    <div class="col-12 mt-2">
                                        <a href="#" class="btn btn-warning btn-lg" style={{ width: '100%' }}><strong>TIẾP TỤC THANH
                                            TOÁN</strong></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer>
                    <footer class="bg-gray py-5" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>
                        <div class="container">
                            <div class="row text-black g-4">
                                <div class="col-md-6 col-lg-3">
                                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>
                                    <p class="text-black text-muted mt-3"> <strong>Giày thể thao chính hãng </strong><br />
                                        Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br />
                                        Đội ngũ hỗ trợ khách hàng luôn luôn 24/7
                                    </p>
                                </div>

                                <div class="col-md-6 col-lg-3">
                                    <h5 class="fw-dark">Liên Kết</h5>
                                    <ul class="list-unstyled">
                                        <li class="my-3">
                                            <a href="#" class="text-black text-decoration-none text-muted">
                                                Home
                                            </a>
                                        </li>
                                        <li class="my-3">
                                            <a href="#" class="text-black text-decoration-none text-muted">
                                                Bộ sưu tập
                                            </a>
                                        </li>
                                        <li class="my-3">
                                            <a href="#" class="text-black text-decoration-none text-muted">
                                                Blogs
                                            </a>
                                        </li>
                                        <li class="my-3">
                                            <a href="#" class="text-black text-decoration-none text-muted">
                                                Về chúng tôi
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="col-md-6 col-lg-3">
                                    <h5 class="fw-light mb-4">Liên Hệ</h5>
                                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span class="me-0">
                                            <i class="fas fa-map-marked-alt"></i>
                                        </span>
                                        <span class="fw-light">
                                            Hoàng Quốc Việt - Cầu Giấy - Hà Nội
                                        </span>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span class="me-0">
                                            <i class="fas fa-envelope"></i>
                                        </span>
                                        <span class="fw-light">
                                            404shopshoes@gmail.com
                                        </span>
                                    </div>
                                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">
                                        <span class="me-0">
                                            <i class="fas fa-phone-alt"></i>
                                        </span>
                                        <span class="fw-light">
                                            +84 0819130199
                                        </span>
                                    </div>
                                </div>

                                <div class="col-md-6 col-lg-3">
                                    <h5 class="fw-light mb-3">Theo Dõi</h5>
                                    <div>
                                        <ul class="list-unstyled d-flex flex-column">
                                            <li>
                                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">
                                                    <i class="fab fa-facebook-f"> Facebook</i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">
                                                    <i class="fab fa-twitter"> Twitter</i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">
                                                    <i class="fab fa-instagram"> Instagram</i>
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

export default Cart;