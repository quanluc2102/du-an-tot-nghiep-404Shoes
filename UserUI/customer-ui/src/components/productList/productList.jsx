import React, { Fragment, useEffect ,useState} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'
import {SanPhamService} from "../../service/SanPhamService";

function ProductList() {
    const [listSP, setListSP] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        try {
            // Lấy danh sách sản phẩm và danh mục từ service.js
            // const data = await SanPhamService.getSPActive();

            // const data = await SanPhamService.getSPPhanTrang(page);
            const response = await fetch(`http://localhost:8080/san_pham/phan_trang?page=${page}`);
            const data = await response.json();
            console.log(data);
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setListSP([...listSP, ...data.content]); // Assume your API returns an array of products
                setPage(page + 1);
            }
            // setListSP(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const changeDetail = () =>{
        window.location.href=(`/product-detail`);
    }

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


        const contentText = document.querySelectorAll('.contentProductList-right')
        contentText.forEach((e) => { obse.observe(e) })
        const contentImg = document.querySelectorAll('.contentProductList-left')
        contentImg.forEach((e) => { obse.observe(e) })


        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';
        });


        var favoriteButtons = document.querySelectorAll('.favorite-button');

        favoriteButtons.forEach(function (button) {
            var productId = button.dataset.productId;

            var isFavorite = localStorage.getItem(productId) === 'true';

            updateFavoriteButton(button, isFavorite);

            button.addEventListener('click', function () {
                isFavorite = !isFavorite;
                updateFavoriteButton(button, isFavorite);
                localStorage.setItem(productId, isFavorite);
            });
        });

        function updateFavoriteButton(button, isFavorite) {
            if (isFavorite) {
                button.innerHTML = "<i class='bx bxs-heart  fs-2'></i>";

            } else {
                button.innerHTML = "<i class='bx bx-heart  fs-2'></i>";

            }
        }


        document.addEventListener("DOMContentLoaded", function () {
            const xemThemButton = document.getElementById("learnMore");

            xemThemButton.addEventListener("click", function () {
                const danhSachSanPham = document.getElementById("div2");

                danhSachSanPham.scrollIntoView({ behavior: "smooth" });
            });
        });
        fetchData();
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
                               <Link to='/' style={{textDecoration: 'none'}}> <a className="navbar-brand d-flex align-items-center">
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

                <main style={{ minHeight: '70vh', backgroundColor: 'rgb(234, 227, 219)' }} data-bs-spy="scroll"
                    data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabindex="0">
                    <div class="contentProductList trang1-productList">
                    </div>

                    <div class="contentProductList trang2-productList" id="div1">
                        <div class="row container">
                            <div class="col-3 contentProductList-left">

                                <div class="accordion" id="accordionExample">
                                    <div class="accordion-item border-0 ">
                                        <h1 class="accordion-header " id="headingOne">
                                            <button class="accordion-button " type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <strong class="font-monospace">TRẠNG THÁI</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseOne" class="accordion-collapse collapse show " aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Đang Bán</li>
                                                    <li class="list-group-item">Đang Giảm Giá</li>
                                                    <li class="list-group-item">Hết Hàng</li>
                                                    <li class="list-group-item">Sắp Về</li>
                                                    <li class="list-group-item">Sắp Hết Hàng</li>
                                                </ul>
                                            </div>


                                        </div>
                                    </div>

                                </div>
                                <hr />
                                <div class="accordion" id="accordionExample1">

                                    <div class="accordion-item border-0">
                                        <h1 class="accordion-header" id="headingOne1">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne1"
                                                aria-expanded="true" aria-controls="collapseOne1">
                                                <strong class="font-monospace">THƯƠNG HIỆU</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseOne1" class="accordion-collapse collapse show" aria-labelledby="headingOne1"
                                            data-bs-parent="#accordionExample1">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Nai Kì</li>
                                                    <li class="list-group-item">A Di Đát</li>
                                                    <li class="list-group-item">Ba Lan Xi A Ga</li>
                                                    <li class="list-group-item">APPLE</li>
                                                    <li class="list-group-item">SAMSUNG</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div class="accordion" id="accordionExample5">
                                    <div class="accordion-item border-0">
                                        <h1 class="accordion-header" id="headingTwo1">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo1"
                                                aria-expanded="true" aria-controls="collapseTwo1">
                                                <strong class="font-monospace">XUẤT XỨ</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseTwo1" class="accordion-collapse collapse show" aria-labelledby="headingTwo1"
                                            data-bs-parent="#accordionExample5">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Việt Nam</li>
                                                    <li class="list-group-item">Mỹ</li>
                                                    <li class="list-group-item">Nhật</li>
                                                    <li class="list-group-item">Pháp</li>
                                                    <li class="list-group-item">Trung Quốc</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div class="accordion" id="accordionExample4">
                                    <div class="accordion-item border-0">
                                        <h1 class="accordion-header" id="headingThree1">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree1"
                                                aria-expanded="true" aria-controls="collapseThree1">
                                                <strong class="font-monospace">MẠNG DI ĐỘNG</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseThree1" class="accordion-collapse collapse show" aria-labelledby="headingThree1"
                                            data-bs-parent="#accordionExample4">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Viettel</li>
                                                    <li class="list-group-item">Vinaphone</li>
                                                    <li class="list-group-item">Mobifone</li>
                                                    <li class="list-group-item">Vietnamobile</li>
                                                    <li class="list-group-item">Gmobile</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div className="accordion" id="accordionExample6">
                                    <div class="accordion-item border-0">
                                        <h1 class="accordion-header" id="headingFour1">
                                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour1"
                                                aria-expanded="true" aria-controls="collapseFour1">
                                                <strong class="font-monospace">CHẤT LIỆU</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseFour1" class="accordion-collapse collapse show"
                                            aria-labelledby="headingFour1"
                                            data-bs-parent="#accordionExample6">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">Chất liệu 1</li>
                                                    <li class="list-group-item">Chất liệu 2</li>
                                                    <li class="list-group-item">Chất liệu 3</li>
                                                    <li class="list-group-item">Chất liệu 4</li>
                                                    <li class="list-group-item">Chất liệu 5</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />

                                <div class="accordion" id="accordionExample2">
                                    <div class="accordion-item border-0 ">
                                        <h1 class="accordion-header " id="headingOne2">
                                            <button class="accordion-button " type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne2" aria-expanded="true" aria-controls="collapseOne2">
                                                <strong class="font-monospace">GIÁ</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseOne2" class="accordion-collapse collapse show "
                                            aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                                            <div class="accordion-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item">0 - 500 </li>
                                                    <li class="list-group-item">500 - 1000</li>
                                                    <li class="list-group-item">1000 - 2000</li>
                                                    <li class="list-group-item">2000 - 9999</li>
                                                    <li class="list-group-item">free</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr />
                                <div class="accordion" id="accordionExample3">
                                    <div class="accordion-item border-0 ">
                                        <h1 class="accordion-header " id="headingOne3">
                                            <button class="accordion-button " type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne3" aria-expanded="true" aria-controls="collapseOne3">
                                                <strong class="font-monospace">MÀU SẮC</strong>
                                            </button>
                                        </h1>
                                        <div id="collapseOne3" class="accordion-collapse collapse show "
                                            aria-labelledby="headingOne3" data-bs-parent="#accordionExample3">
                                            <div class="accordion-body row">
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'aqua' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(45, 179, 19)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(13, 68, 68)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(42, 79, 79)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(51, 60, 176)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgba(213, 172, 48, 0.734)' }} ></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(104, 188, 25)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(254, 99, 99)' }}></button>
                                                </div>
                                                <div class="col-3 mb-3">
                                                    <button class="btn color-pick" style={{ backgroundColor: 'rgb(59, 59, 59)' }}></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                            </div>
                            <div class="col-9 contentProductList-right">
                                <div class="row" id="div2">
                                    <div class="col-6">
                                        <h1 class="font-monospace fw-bolder"><strong>DANH SÁCH SẢN PHẨM</strong></h1>
                                    </div>
                                    <div class="col-6">
                                        <form action="#">
                                            <div class="input-group mb-3">

                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="floatingInputGroup1"
                                                        placeholder="Username" />
                                                    <label for="floatingInputGroup1">Tìm Kiếm</label>
                                                </div>
                                                <span class="input-group-text"><i class='bx bx-search'></i></span>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                                <hr />
                                <div class="row">
                                    <InfiniteScroll
                                        dataLength={listSP.length}
                                        next={fetchData}
                                        hasMore={hasMore}
                                        loader={loading ? (
                                            <div className="text-center" style={{ marginTop: "25%", marginBottom: "25%" }}>
                                                <div className="spinner-border" role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                                <div>Loading...</div>
                                            </div>
                                        ) : null}
                                    >
                                        {/* start product card*/}
                                        {/* Display your products here */}
                                        {listSP.map((sp)=> (
                                            <div className="col-lg-4 mt-4 float-start" key={sp.id} onClick={changeDetail}>
                                                <div className="cardProductList text-start " >
                                                    <div className="position-relative">

                                                        <img className="card-img-top"
                                                             src={'/img/'+sp.anh}
                                                            // src={'/frontend/public/niceadmin/img/'+sp.anh}
                                                             alt="Title"
                                                             height={270}
                                                             width={335}
                                                        />

                                                        <div className="position-absolute top-0 end-0 mt-1 me-1">
                                                            <button className="badge bg-danger">Mới !</button>
                                                        </div>
                                                        <div className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                            <button className="btn btn-success ">Mua Ngay!</button>
                                                        </div>

                                                    </div>
                                                    <br/>
                                                    <div className="card-body text-center">

                                                        <h4 className="card-title" style={{fontSize:22}}><strong>{sp.ten}</strong></h4>
                                                        <h7 className="card-text">{sp.thuongHieu.ten}</h7>
                                                        <h5 className="card-text" style={{color:"red"}}>1.000.000 VND</h5>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/*    end*/}
                                    </InfiniteScroll>

                                </div>
                                <br/>
                                {/*<div class="d-flex justify-content-center  pt-5">*/}
                                {/*    <nav aria-label="Page navigation ">*/}
                                {/*        <ul class="pagination">*/}
                                {/*            <li class="page-item">*/}
                                {/*                <a class="page-link" href="#" aria-label="Previous">*/}
                                {/*                    <span aria-hidden="true">&laquo;</span>*/}
                                {/*                </a>*/}
                                {/*            </li>*/}
                                {/*            <li class="page-item"><a class="page-link" href="#div2">1</a></li>*/}
                                {/*            <li class="page-item"><a class="page-link" href="#div2">2</a></li>*/}
                                {/*            <li class="page-item"><a class="page-link" href="#div2">3</a></li>*/}
                                {/*            <li class="page-item">*/}
                                {/*                <a class="page-link" href="#" aria-label="Next">*/}
                                {/*                    <span aria-hidden="true">&raquo;</span>*/}
                                {/*                </a>*/}
                                {/*            </li>*/}
                                {/*        </ul>*/}
                                {/*    </nav>*/}

                                {/*</div>*/}
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

export default ProductList;
