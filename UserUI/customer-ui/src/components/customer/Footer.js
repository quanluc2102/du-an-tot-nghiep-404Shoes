import React from 'react'

function Footer() {
  return (
      <footer>
        <footer className="bg-gray py-5" style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>
          <div className="container">
            <div className="row text-black g-4">
              <div className="col-md-6 col-lg-3">
                <a className="text-uppercase text-decoration-none brand text-black"
                   style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>
                <p className="text-black text-muted mt-3"><strong>Giày thể thao chính
                  hãng </strong><br/>
                  Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br/>
                  Đội ngũ hỗ trợ khách hàng luôn luôn 24/7
                </p>
              </div>

              <div className="col-md-6 col-lg-3">
                <h5 className="fw-dark">Liên Kết</h5>
                <ul className="list-unstyled">
                  <li className="my-3">
                    <a href="#" className="text-black text-decoration-none text-muted">
                      Home
                    </a>
                  </li>
                  <li className="my-3">
                    <a href="#" className="text-black text-decoration-none text-muted">
                      Bộ sưu tập
                    </a>
                  </li>
                  <li className="my-3">
                    <a href="#" className="text-black text-decoration-none text-muted">
                      Blogs
                    </a>
                  </li>
                  <li className="my-3">
                    <a href="#" className="text-black text-decoration-none text-muted">
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
                      <a href="#"
                         className="text-black text-decoration-none text-muted fs-4 me-4">
                        <i className="fab fa-facebook-f"> Facebook</i>
                      </a>
                    </li>
                    <li>
                      <a href="#"
                         className="text-black text-decoration-none text-muted fs-4 me-4">
                        <i className="fab fa-twitter"> Twitter</i>
                      </a>
                    </li>
                    <li>
                      <a href="#"
                         className="text-black text-decoration-none text-muted fs-4 me-4">
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
  )
}

export default Footer