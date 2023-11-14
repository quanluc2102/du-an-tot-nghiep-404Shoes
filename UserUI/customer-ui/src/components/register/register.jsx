import React, { Fragment } from "react"
import './style.css'
import './styleRegister.css'

function Register() {

    return (
        <Fragment>
            <body>
                <section className="h-100">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card card-registration my-4">
                                    <div className="row g-0">
                                        <div className="col-xl-6 d-none d-xl-block">
                                            <img src="https://wallpapers.com/images/hd/4k-white-nike-shoes-image-d3soiovymseu3m8x.jpg"
                                                alt="Sample photo" className="img-fluid"
                                                 style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="card-body p-md-5 text-black">
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
                                                    <button type="button" className="btn btn-light btn-lg">Làm Mới</button>
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
                    <footer className="bg-dark py-5">
                        <div className="container">
                            <div className="row text-white g-4">
                                <div className="col-md-6 col-lg-3">
                                    <a className="text-uppercase text-decoration-none brand text-white" href="index.html">404SHOES</a>
                                    <p className="text-white text-muted mt-3"> <strong>Giày Việt chính hãng </strong><br />
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
                                                <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
                                                    <i className="fab fa-facebook-f">Facebook</i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
                                                    <i className="fab fa-twitter">Twitter</i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-white text-decoration-none text-muted fs-4 me-4">
                                                    <i className="fab fa-instagram">Instagram</i>
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