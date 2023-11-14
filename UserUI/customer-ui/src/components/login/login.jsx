import React, { Fragment, useEffect } from "react"
import './style.css'
import './styleLogin.css'

function Login() {

    return (
        <Fragment>
            <header className="header">
                <nav className="nav">
                    <a href="#"> Trang Chủ </a>
                    <a href="#"> Sản Phẩm </a>
                    <a href="#"> Bài Viết </a>
                    <a href="#"> Liên Hệ </a>
                </nav>     
            </header>

            <div className="background"></div>
            <section className="home">
                <div className="content">
                    <a href="#" className="logo"> <i className="fas fa-shoe-prints"></i>404SHOES</a>
                    <h2> Chào Mừng!</h2>
                    <h3> Đến với website của chúng tôi </h3>
                    <pre> 404Shoes - shop giày thể thao
                        uy tín nhất hệ mặt trời 😘 </pre>
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
                        <a href="#"> Quên mật khẩu?</a>
                    </div>
                    <div className="buttonLogin" style={{ backgroundColor: 'rgb(0, 104, 139)' }}>
                        <button className="btn" style={{ color: 'rgb(255, 255, 255)' }}> Đăng nhập </button>
                    </div>
                    <div className="sign-up">
                        <p> Chưa có tài khoản?</p>
                        <a href="#"> Đăng ký ngay</a>
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
                                            <i className="fas fa-chevron-right me-1"></i> Home
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            <i className="fas fa-chevron-right me-1"></i> Bộ sưu tập
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            <i className="fas fa-chevron-right me-1"></i> Blogs
                                        </a>
                                    </li>
                                    <li className="my-3">
                                        <a href="#" className="text-white text-decoration-none text-muted">
                                            <i className="fas fa-chevron-right me-1"></i> Về chúng tôi
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