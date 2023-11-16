import React, { Fragment, useEffect } from "react"
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";

function Login() {

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

        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';

        });
    }, []);

    return (
        <Fragment>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-0 py-4 fixed-top" id="navbarhead" style={{ backgroundColor: 'rgb(178, 221, 235) ' }}>
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <a className="navbar-brand d-flex align-items-center">
                                <img style={{ transform: 'rotateX(-180deg)', width: '20px' }}
                                    src="data:image/png;base64,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"
                                    alt="site icon" />
                                <span className="text-uppercase fw-lighter ms-2">404Shoes</span>
                            </a>
                            <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navMenu">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>

                        <div className="collapse navbar-collapse justify-content-end" id="navMenu">
                            <ul className="navbar-nav mx-auto text-center">
                                <li className="nav-item px-2 py-2">
                                    <Link to='/' style={{ textDecoration: 'none' }}> <a className="nav-link text-uppercase ">TRANG CHỦ</a></Link>

                                </li>
                                <li className="nav-item px-2 py-2">
                                    <Link to='product-list' style={{ textDecoration: 'none' }}><a className="nav-link text-uppercase ">SẢN PHẨM</a></Link>
                                </li>
                                <li className="nav-item px-2 py-2">
                                    <a className="nav-link text-uppercase " href="#div6">KHÁM PHÁ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="position-relative" style={{ marginTop: '100px' }}>
                    <div className="position-fixed bottom-0 end-0 me-3" style={{ marginBottom: '5.6em' }}>
                        <div className="btn-group dropstart">
                            <button type="button" className="btn btn-info " data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i className='bx bxs-user-circle '></i>

                                {/* <span className="cart-count">0</span> */}

                            </button>
                            <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                <a className="dropdown-item" href="#"><i className='bx bxs-user'></i>  Hồ sơ</a>
                                <a className="dropdown-item" href="#"><i className='bx bxs-cog' ></i>  Cài đặt</a>
                                <a className="dropdown-item" href="#"><i className='bx bx-history' ></i> Lịch sử</a>
                                <a className="dropdown-item" href="#"><i className='bx bxs-bell' ></i> Thông báo</a>
                                <a className="dropdown-item" href="#"><i className='bx bxs-food-menu'></i> Danh Sách đơn hàng</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#"><i className='bx bx-log-out' ></i> Đăng xuất</a>
                            </div>
                        </div>
                    </div>

                    <div className="position-fixed bottom-0 end-0  me-3" style={{ marginBottom: '2.8em' }}>
                        <div className="btn-group dropstart">
                            <button type="button" className="btn btn-dark " data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i className='bx bxs-shopping-bag ' ></i>
                                <span className="cart-count">0</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-start" aria-labelledby="triggerId">
                                <a className="dropdown-item" href="#">Sản phẩm 1 x3</a>
                                <a className="dropdown-item" href="#">sản phẩm 2 x2</a>
                                <a className="dropdown-item" href="#">sản phẩm 3 x2</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Thanh Toán</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="background"></div>
            <section className="home" style={{ marginTop: '100px' }}>
                <div className="contentLogin">
                    <a href="#" className="logo"> <i className="fas fa-shoe-prints"></i>404SHOES</a>
                    <h2> Chào Mừng!</h2>
                    <h3> Đến với website của chúng tôi </h3>
                    <div className="pre"> 404Shoes - shop giày thể thao
                        uy tín nhất hệ mặt trời😘😘😘</div>
                    <div className="icon">
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-twitter"></i>
                    </div>
                </div>
                <div className="login">
                    <h2> Đăng nhập </h2>
                    <div className="input">
                        <input type="text" className="input1" placeholder="Email" required />
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="input">
                        <input type="password" className="input1" placeholder="Password" required />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="check">
                        <label> <input type="checkbox" />Remember me </label>
                        <Link to='/'>Quên mật khẩu?</Link>
                    </div>
                    <div className="buttonLogin" style={{ backgroundColor: 'rgb(0, 104, 139)' }}>
                        <button className="btn" style={{ color: 'rgb(255, 255, 255)' }}> Đăng nhập </button>
                    </div>
                    <div className="sign-up">
                        <p> Chưa có tài khoản?</p>
                        <Link to='/register'>Đăng ký ngay</Link>
                    </div>
                </div>
            </section>

            <footer>
                <footer className="bg-dark py-5">
                    <div className="container">
                        <div className="row text-white g-4">
                            <div className="col-md-6 col-lg-3">
                                <a className="text-uppercase text-decoration-none brand text-white" href="index.html">404SHOES</a>
                                <p className="text-white text-muted mt-3"> <strong>Giày thể thao chính hãng </strong><br />
                                    Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br />
                                    Đội ngũ hỗ trợ khách hàng luôn luôn 24/7
                                </p>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h5 className="fw-light">Liên Kết</h5>
                                <ul className="list-unstyled">
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            Home
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            Bộ sưu tập
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            Blogs
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
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
                                    <span className="fw-light"> 404shopshoes@gmail.com
                                    </span>
                                </div>
                                <div className="d-flex justify-content-start align-items-start my-2 text-muted">
                                    <span className="me-0">
                                        <i className="fas fa-phone-alt"></i>
                                    </span>
                                    <span className="fw-light"> +84 0819130199
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-3">
                                <h5 className="fw-light mb-3">Theo Dõi</h5>
                                <div>
                                    <ul className="list-unstyled d-flex flex-column">
                                        <li>
                                            <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
                                                <i className="fab fa-facebook-f"> Facebook</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
                                                <i className="fab fa-twitter"> Twitter</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
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
        </Fragment>
    )
}

export default Login;