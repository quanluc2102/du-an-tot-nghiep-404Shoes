import React, { Fragment, useEffect } from "react"
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";

function Home() {

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


            <main style={{ minHeight: '100vh', backgroundColor: 'aquamarine' }} data-bs-spy="scroll" data-bs-target="#nav-example"
                data-bs-smooth-scroll="true" tabindex="0">
                <div className="contentHome trang1-home">
                    <p className="description"> <span style={{ fontSize: '40px' }}> <span>Giày thể thao mùa đông 2023</span> </span><br /> với nhiều ưu đãi hấp dẫn 💥 </p>

                    <a href="#div1" className="btn">
                        <h1 className="text-center" id="x1">👉 Mua Ngay</h1>
                    </a>
                </div>

                <div className="contentHome trang2-home" id="div1">
                    <div className="row container">
                        <div className="col-6 content-left">
                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00202_1.jpg"
                                className={`img-fluid ${['rounded-top', 'rounded-right', 'rounded-bottom', 'rounded-left', 'rounded-circle'][3]}`}
                                alt="" />
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY THỂ THAO NAM</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="contentHome trang3-home">
                    <div className="row container">
                        <div className="col-6 content-left">
                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00007_1.jpeg"
                                className={`img-fluid ${['rounded-top', 'rounded-right', 'rounded-bottom', 'rounded-left', 'rounded-circle'][3]}`}
                                alt="" />
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY THỂ THAO NỮ</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="contentHome trang4-home">
                    <div className="row container">
                        <div className="col-6 content-left">
                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00202_1.jpg"
                                className={`img-fluid ${['rounded-top', 'rounded-right', 'rounded-bottom', 'rounded-left', 'rounded-circle'][3]}`}
                                alt="" />
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY HOT TREND</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="contentHome trang5-home">
                    <div className="row container">
                        <div className="col-6 content-left">
                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00197_1.jpg"
                                className={`img-fluid ${['rounded-top', 'rounded-right', 'rounded-bottom', 'rounded-left', 'rounded-circle'][3]}`}
                                alt="" />
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY THỂ THAO</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="contentHome trang6-home">
                    <div className="row container" id="div6">
                        <div className="col-6 content-left">
                            <h1 className="font-monospace fw-bolder"><strong>👈 BÀI VIẾT FACEBOOK</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>TRANG INSTAGRAM CỦA SHOP 👉</strong></h1>
                            <hr />
                            <p className="font-monospace">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut
                                labore et dolore magna aliqua. Ac turpis egestas maecenas pharetra. Et tortor consequat id porta
                                nibh venenatis. Bibendum at varius vel pharetra vel. Nunc pulvinar sapien et ligula ullamcorper
                                malesuada. Morbi quis commodo odio aenean sed adipiscing diam donec adipiscing. Ipsum a arcu
                                cursus vitae congue mauris rhoncus aenean. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Libero nunc consequat interdum varius. Arcu risus quis varius quam quisque. Sed cras
                                ornare arcu dui vivamus arcu felis bibendum. In dictum non consectetur a erat nam at lectus.
                                Ultrices eros in cursus turpis massa tincidunt dui. Eleifend donec pretium vulputate sapien nec
                                sagittis aliquam malesuada bibendum. Aenean euismod elementum nisi quis eleifend quam adipiscing
                                vitae proin. Amet porttitor eget dolor morbi non arcu risus.</p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
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
    )
}

export default Home;
