import React from "react"
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";

function ErrorPage() {
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
         
            <div id="error-page" style={{ top: '15em' }}>
               <div className="contentErrorPage" >
                  <h2 className="headerError" data-text="404">
                     404
                  </h2>
                  <h4 data-text="Opps! Page not found">
                     Opps! Page not found
                  </h4>
                  <p>
                     Sorry, the page you're looking for doesn't exist. If you think something is broken, report a problem.
                  </p>
                  <div className="btns">
                     <Link to='/'> Quay lại trang chủ</Link>
                     <Link to='/product-list'> Đến trang sản phẩm</Link>
                  </div>
               </div>
            </div>

         <footer style={{ marginTop: '40em' }}>
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

export default ErrorPage;