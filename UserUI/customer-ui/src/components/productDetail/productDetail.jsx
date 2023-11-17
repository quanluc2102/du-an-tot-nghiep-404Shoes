import React, { Fragment, useEffect } from "react"
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";

function ProductDetail() {

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

                <main style={{ minHeight: '100vh' }} data-bs-spy="scroll"
                    data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabindex="0" id="main">
                    <div className="contentProductDetail trang2ProductDetail " id="div1">
                        <div className="row container">
                            <div className="col-7 contentProductDetail-left">

                                <div className="mb-3">
                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ae1b69a78a2b452b96e5af9c00a31a34_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_02_standard_hover.jpg" className="anh-to w-100" id="product-image" alt="" />

                                </div>
                                <div id="carouselId" className="carousel slide" data-bs-ride="carousel">

                                    <div className="carousel-inner" role="listbox">
                                        <div className="carousel-item active ">
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ae1b69a78a2b452b96e5af9c00a31a34_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_02_standard_hover.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (2).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aeb405a727294b148ee7af9c00a32c92_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_04_standard.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (5).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2137b3245f1641198a34af9c00a322a1_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_03_standard.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (4).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/26848b484b1d49e78be5af9c00a3050a_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_01_standard.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (6).jpg')" alt="First slide" />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="carousel-item">
                                            <div className="row">
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/1ba59130eb734cbb92efaf9c00a336cf_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_05_standard.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (2).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/80d366ab86384d81a96baf9c00a33f9a_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_41_detail.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (5).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/9b11dd3c8c0948cdad66af9c00a35a95_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_09_standard.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (4).jpg')" alt="First slide" />

                                                </div>
                                                <div className="col-3">
                                                    <img src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ee4cdcd2bcb54260afceaf9c00a349c5_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_42_detail.jpg" height="140px"
                                                        onclick="changeProductImage('/imgs/shoe-banner (6).jpg')" alt="First slide" />

                                                </div>
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
                                <h1><strong>GIÀY BÁN</strong></h1>
                                <div className="row">
                                    <div className="col-6"> <span>Mã sản phẩm: 007</span></div>
                                    <div className="col-6"> <span>Tình trạng: Vãn còn</span></div>
                                    <div className="col-6"> <span>Hãng: Adidas</span></div>
                                    <div className="col-6"> <span>Loại: Thể thao</span></div>
                                </div>
                                <div className="row">
                                    <div className="col-12"><br />
                                        <h3><strong style={{ color: 'orangered' }}>324.000 VND</strong></h3>
                                    </div>

                                </div>
                                <hr className="dashed-hr" />
                                <span>

                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam atque alias molestias dicta
                                    reiciendis. Tenetur atque in necessitatibus dolore voluptatibus! Assumenda quos pariatur a nemo
                                    similique itaque quasi doloribus repellendus.
                                </span>
                                <hr className="dashed-hr" />
                                <div className="row">
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'aqua' }}></div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(32, 8, 97)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(62, 150, 21)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(255, 0, 0)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(208, 255, 0)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(255, 0, 187)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(21, 0, 255)' }}>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-1 ms-1 mb-3">
                                        <a href="#">
                                            <div style={{ width: '40px', height: '40px', backgroundColor: 'rgb(144, 0, 255)' }}>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <hr className="dashed-hr" />
                                <div className="row ">
                                    <div className="col-6">
                                        <div className="accordion" id="accordionExample3">
                                            <div className="accordion-item ">
                                                <h1 className="accordion-header" id="headingOne3">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne3"
                                                        aria-controls="collapseOne3"
                                                        aria-expanded="false">
                                                        <strong className="font-monospace">Kích Thước</strong>
                                                    </button>
                                                </h1>
                                                <div id="collapseOne3" className="accordion-collapse collapse"
                                                    aria-labelledby="headingOne3" data-bs-parent="#accordionExample3">
                                                    <div className="accordion-body row ">
                                                        <div className="col-3 mb-3">
                                                            <a href="#" className="btn btn-sm btn-outline-dark">
                                                                <div>43</div>
                                                            </a>
                                                        </div>
                                                        <div className="col-3 mb-3">
                                                            <a href="#" className="btn btn-sm btn-outline-dark">
                                                                <div>23</div>
                                                            </a>
                                                        </div>
                                                        <div className="col-3 mb-3">
                                                            <a href="#" className="btn btn-sm btn-outline-dark">
                                                                <div>44</div>
                                                            </a>
                                                        </div>
                                                        <div className="col-3 mb-3">
                                                            <a href="#" className="btn btn-sm btn-outline-dark">
                                                                <div>45</div>
                                                            </a>
                                                        </div>
                                                        <div className="col-3 mb-3">
                                                            <a href="#" className="btn btn-sm btn-outline-dark">
                                                                <div>21</div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-floating mb-3 border-0">
                                            <input type="number" min="1" className="form-control" name="formId1" id="formId1"
                                                placeholder="Số Lượng" />
                                            <label for="formId1" className="font-monospace"><strong>Số Lượng :</strong></label>
                                        </div>
                                    </div>
                                </div>

                                <hr className="dashed-hr" />
                                <div className="row">


                                    <div className="col-12">
                                        <a href="#" className="btn btn-success btn-lg" style={{ width: '100%' }}><strong>THÊM VÀO GIỎ
                                            HÀNG</strong></a>
                                    </div>

                                    <div className="col-12 mt-2">
                                        <a href="#" className="btn btn-warning btn-lg" style={{ width: '100%' }}><strong>THANH
                                            TOÁN</strong></a>
                                    </div>
                                </div>
                            </div>

                            <hr className="dashed-hr mt-5" />
                            <h1 className="text-center">SẢN PHẨM LIÊN QUAN</h1>
                            <div className="row mb-5">

                                <div className="col-3 mt-4">
                                    <div className="cardProductDetail text-start ">
                                        <div className="position-relative">

                                            <img className="card-img-top"
                                                src="https://ananas.vn/wp-content/uploads/Pro_A6T014_2-500x500.jpeg" alt="Title" />
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Mới !</button>
                                            </div>

                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br />

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
                                                src="https://ananas.vn/wp-content/uploads/Pro_A6T015_2-500x500.jpeg" alt="Title" />
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Mới !</button>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br />

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
                                                src="https://ananas.vn/wp-content/uploads/Pro_A6T014_2-500x500.jpeg" alt="Title" />
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Cũ !</button>
                                            </div>
                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br />

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
                                                src="https://ananas.vn/wp-content/uploads/Pro_A6T012_2-500x500.jpg" alt="Title" />
                                            <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                <button className="badge bg-danger">Hết Hàng !</button>
                                            </div>

                                            <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                <button className="btn btn-success ">Mua Ngay!</button>
                                            </div>

                                        </div>
                                        <br />

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

                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i
                    className="bi bi-arrow-up-short"></i></a>
            </body>
        </Fragment>
    )
}

export default ProductDetail;