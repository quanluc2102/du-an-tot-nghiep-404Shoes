import React, { Fragment, useEffect } from "react"
import './styleRegister.css'
import './style.css'
import { Link } from "react-router-dom";

function Register() {

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
    }, []);

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

                <section className="h-100" style={{ backgroundImage: 'url(https://c0.wallpaperflare.com/preview/475/119/659/shoe-street-basketball-sneaker.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                    <div className="container py-5 h-100" style={{ width: '50%', opacity: '0.9' }}>
                        <div className="row d-flex justify-content-center h-100">
                            <div className="col">
                                <div className="card card-registration my-4">
                                    <div className="row g-0">
                                        <div className="col-xl-12">
                                            <div className="card-body p-md-5 text-black" style={{ float: 'left' }}>
                                                <h3 className="mb-5 text-uppercase">Đăng Ký Tài Khoản</h3>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input type="text" id="form3Example1m"
                                                                className="form-control form-control-lg" />
                                                            <label className="form-label" for="form3Example1m">Họ</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input type="text" id="form3Example1n"
                                                                className="form-control form-control-lg" />
                                                            <label className="form-label" for="form3Example1n">Tên</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input type="text" id="form3Example1m1"
                                                                className="form-control form-control-lg" />
                                                            <label className="form-label" for="form3Example1m1">Số điện thoại</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-4">
                                                        <div className="form-outline">
                                                            <input type="text" id="form3Example1n1"
                                                                className="form-control form-control-lg" />
                                                            <label className="form-label" for="form3Example1n1">Username</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example8" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example8">Địa Chỉ</label>
                                                </div>

                                                <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">

                                                    <h6 className="mb-0 me-4">Giới tính: </h6>

                                                    <div className="form-check form-check-inline mb-0 me-4">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                            id="femaleGender" value="option1" />
                                                        <label className="form-check-label" for="femaleGender">Nam</label>
                                                    </div>

                                                    <div className="form-check form-check-inline mb-0 me-4">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                            id="maleGender" value="option2" />
                                                        <label className="form-check-label" for="maleGender">Nữ</label>
                                                    </div>

                                                    <div className="form-check form-check-inline mb-0">
                                                        <input className="form-check-input" type="radio" name="inlineRadioOptions"
                                                            id="otherGender" value="option3" />
                                                        <label className="form-check-label" for="otherGender">Khác</label>
                                                    </div>

                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6 mb-4">

                                                        <select className="select">
                                                            <option value="1">State</option>
                                                            <option value="2">Option 1</option>
                                                            <option value="3">Option 2</option>
                                                            <option value="4">Option 3</option>
                                                        </select>

                                                    </div>
                                                    <div className="col-md-6 mb-4">

                                                        <select className="select">
                                                            <option value="1">City</option>
                                                            <option value="2">Option 1</option>
                                                            <option value="3">Option 2</option>
                                                            <option value="4">Option 3</option>
                                                        </select>

                                                    </div>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example9" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example9">DOB</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example90" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example90">Pincode</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example99" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example99">Course</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="form3Example97" className="form-control form-control-lg" />
                                                    <label className="form-label" for="form3Example97">Email ID</label>
                                                </div>

                                                <div className="d-flex justify-content-end pt-3">
                                                    <button type="button" className="btn btn-light btn-lg" style={{ backgroundColor: 'rgb(178, 221, 235)' }}>Làm Mới</button>
                                                    <button type="button" className="btn btn-warning btn-lg ms-2">Đăng Ký</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

export default Register;