import React, { Fragment, useEffect } from "react";
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";

function UserInformation() {

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
            parallax3.style.top = - scrolled * 0.78 + 'px';
        });
    }, []);

    return (
        <Fragment>
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
                            <a className="navbar-brand d-flex align-items-center">
                                <img style={{ width: '90px' }}
                                    src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"
                                    alt="site icon" />
                                <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>
                            </a>
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

            <main style={{ minHeight: '150vh', paddingTop: '130px' }} className="bg-light">
                <section className="section profile container">
                    <div className="row">
                        <div className="col-xl-12 ">
                            <div className="card" style={{ height: '850px' }}>
                                <div className="card-body pt-1">
                                    {/*<!-- Bordered Tabs -->*/}
                                    <ul className="nav nav-tabs nav-tabs-bordered">
                                        <li className="nav-item">
                                            <button className="nav-link active" data-bs-toggle="tab"
                                                data-bs-target="#profile-overview">Lịch Sử Mua</button>
                                        </li>

                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Chỉnh
                                                Sửa
                                                Hồ Sơ</button>
                                        </li>

                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-settings">Cài
                                                Đặt</button>
                                        </li>

                                        <li className="nav-item">
                                            <button className="nav-link" data-bs-toggle="tab"
                                                data-bs-target="#profile-change-password">Đổi mật khẩu</button>
                                        </li>

                                    </ul>
                                    <div className="tab-content pt-2">

                                        <div className="tab-pane fade show active profile-overview" id="profile-overview">

                                            <div className="row">
                                                <div className="col-8 content-left pt-3">

                                                    <h1 className="text-center">Lịch sử mua hàng</h1>

                                                </div>
                                                <div className="col-4 content-right bg-light pt-3">
                                                    <h1><strong>ĐƠN HÀNG</strong></h1>
                                                    <h6><i className='bx bxs-truck fs-6' ></i> Giao Hàng Nhanh</h6>
                                                    <h6><i className='bx bxs-barcode fs-6'></i> Mã đơn : 89979976880 </h6>
                                                    <hr />

                                                    <div className="position-relative m-5">
                                                        <div className="progress" role="progressbar" aria-label="Progress"
                                                            aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"
                                                            style={{ height: '1px' }}>
                                                            <div className="progress-bar" style={{ width: '50%' }}></div>
                                                        </div>
                                                        <button type="button"
                                                            className="position-absolute top-0 start-0 translate-middle btn btn-sm btn-success rounded-pill"
                                                            style={{ width: '2rem', height: '2rem' }} title="đã xác nhận"><i className='bx bxs-package' ></i></button>
                                                        <button type="button"
                                                            className="position-absolute top-0 start-50 translate-middle btn btn-sm btn-success rounded-pill"
                                                            style={{ width: '2rem', height: '2rem' }} title="đang giao"><i className='bx bxs-truck' ></i></button>
                                                        <button type="button"
                                                            className="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
                                                            style={{ width: '2rem', height: '2rem' }} title="đã nhận hàng"><i className='bx bx-check'></i></button>

                                                    </div>

                                                    <div className="row mb-4 border py-2">
                                                        <div className="col-8">
                                                            <h5><strong>tên sản phẩm + Màu</strong></h5>
                                                            <span>Size: 34</span>
                                                            <span className="float-end">Số lượng: 4</span>
                                                        </div>
                                                        <div className="col-4 ">
                                                            <p></p>
                                                            <h6 className="float-end">99.999</h6>
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
                                                            <h6 className="float-end">99.999.0900</h6>
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
                                                        <div className="col-3"><br />
                                                            <h5><strong style={{ color: 'orangered' }}>TỔNG CỘNG: </strong></h5>
                                                        </div>
                                                        <div className="col-8 "><br />
                                                            <h5><strong className="float-end" style={{ color: 'orangered' }}>124.121.000 VND</strong></h5>
                                                        </div>

                                                    </div>
                                                    <hr className="dashed-hr" />
                                                    <span>
                                                        * không biết viết gì ở đây nhưng nếu biết thì cũng tốt
                                                    </span>
                                                    <hr className="dashed-hr" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

                                            {/* <!-- Profile Edit Form -->*/}
                                            <form>
                                                <div className="row mb-3">
                                                    <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile
                                                        Image</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <img src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=600"
                                                            alt="Profile" />
                                                        <div className="pt-2">
                                                            <a href="#" className="btn btn-primary btn-sm"
                                                                title="Upload new profile image" /><i className='bx bx-upload'></i>
                                                            <a href="#" className="btn btn-danger btn-sm"
                                                                title="Remove my profile image"><i
                                                                    className='bx bx-trash'></i></a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Full
                                                        Name</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="fullName" type="text" className="form-control" id="fullName"
                                                            value="Kevin Anderson" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <textarea name="about" className="form-control" id="about"
                                                            style={{ height: '100px' }}>Sunt est soluta temporibus accusantium neque nam maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor. Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi sed ea saepe at unde.</textarea>
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="company"
                                                        className="col-md-4 col-lg-3 col-form-label">Company</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="company" type="text" className="form-control" id="company"
                                                            value="Lueilwitz, Wisoky and Leuschke" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Job" className="col-md-4 col-lg-3 col-form-label">Job</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="job" type="text" className="form-control" id="Job"
                                                            value="Web Designer" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Country"
                                                        className="col-md-4 col-lg-3 col-form-label">Country</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="country" type="text" className="form-control" id="Country"
                                                            value="USA" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Address"
                                                        className="col-md-4 col-lg-3 col-form-label">Address</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="address" type="text" className="form-control" id="Address"
                                                            value="A108 Adam Street, New York, NY 535022" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="phone" type="text" className="form-control" id="Phone"
                                                            value="(436) 486-3538 x29071" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="email" type="email" className="form-control" id="Email"
                                                            value="k.anderson@example.com" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter
                                                        Profile</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="twitter" type="text" className="form-control" id="Twitter"
                                                            value="https://twitter.com/#" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook
                                                        Profile</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="facebook" type="text" className="form-control" id="Facebook"
                                                            value="https://facebook.com/#" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram
                                                        Profile</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="instagram" type="text" className="form-control" id="Instagram"
                                                            value="https://instagram.com/#" />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label for="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin
                                                        Profile</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input name="linkedin" type="text" className="form-control" id="Linkedin"
                                                            value="https://linkedin.com/#" />
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form>
                                            {/*<!-- End Profile Edit Form -->*/}

                                        </div>

                                        <div className="tab-pane fade pt-3" id="profile-settings">

                                            {/* <!-- Settings Form -->*/}
                                            <form>

                                                <div className="row mb-3">
                                                    <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Email
                                                        Notifications</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="changesMade"
                                                                checked />
                                                            <label className="form-check-label" for="changesMade">
                                                                Changes made to your account
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="newProducts"
                                                                checked />
                                                            <label className="form-check-label" for="newProducts">
                                                                Information on new products and services
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="proOffers" />
                                                            <label className="form-check-label" for="proOffers">
                                                                Marketing and promo offers
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="securityNotify"
                                                                checked disabled />
                                                            <label className="form-check-label" for="securityNotify">
                                                                Security alerts
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                                </div>
                                            </form> {/*<!-- End settings Form -->*/}</div>

                                    </div>

                                    <div className="tab-pane fade pt-3" id="profile-change-password">
                                        {/*<!-- Change Password Form -->*/}
                                        <form>

                                            <div className="row mb-3">
                                                <label for="currentPassword"
                                                    className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="password" type="password" className="form-control"
                                                        id="currentPassword" />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New
                                                    Password</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="newpassword" type="password" className="form-control"
                                                        id="newPassword" />
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter
                                                    New Password</label>
                                                <div className="col-md-8 col-lg-9">
                                                    <input name="renewpassword" type="password" className="form-control"
                                                        id="renewPassword" />
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary">Change Password</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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

        </Fragment>
    )
}

export default UserInformation;