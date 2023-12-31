import React, {Fragment, useEffect, useState} from "react"
import {Link} from "react-router-dom/cjs/react-router-dom.min"
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'
import {SanPhamService} from "../../service/SanPhamService";
import {LocSanPhamService} from "../../service/LocSanPhamService";

function ProductList() {
    const [listSP, setListSP] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [listDM, setListDM] = useState([]);
    const [listTH, setListTH] = useState([]);
    const [listMS, setListMS] = useState([]);
    const [listXX, setListXX] = useState([]);
    const [listKT, setListKT] = useState([]);
    const [filters, setFilters] = useState({
        danhMuc: [],
        thuongHieu: [],
        xuatXu: [],
        kichThuoc: [],
        mauSac: [],
    });
    const [search, setSearch] = useState({
        searchString: ''
    });

    const isFilterSelected = (filterType, value) => {
        return filters[filterType].includes(value);
    };

    const handleFilterChange = () => {
        fetchFilteredData();
    };

    const fetchData = async () => {
        try {
            console.log("Chời ơi ưo", JSON.stringify(search));

            const response = await fetch(`http://localhost:8080/san_pham/search_san_pham`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(search), // Chỉ cần truyền filters, không cần { filters }
            });

            const data = await response.json();

            console.log('Filtered Data:', data);

            // Kiểm tra xem thuộc tính 'content' có được định nghĩa không
            if (data) {
                setListSP(data);
            } else {
                console.error('Data content is undefined:', data);
            }
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const fetchFilteredData = async () => {
        try {
            console.log("Chời ơi ưo", JSON.stringify(filters));

            const response = await fetch(`http://localhost:8080/san_pham/phan_trang_user_filtered`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters), // Chỉ cần truyền filters, không cần { filters }
            });

            const data = await response.json();

            console.log('Filtered Data:', data);

            // Kiểm tra xem thuộc tính 'content' có được định nghĩa không
            if (data) {
                setListSP(data);
            } else {
                console.error('Data content is undefined:', data);
            }
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };






    const handleCheckboxChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const index = prevFilters[filterType].indexOf(value);
            const updatedFilters = { ...prevFilters };

            if (index === -1) {
                updatedFilters[filterType] = [...prevFilters[filterType], value];
            } else {
                updatedFilters[filterType] = [
                    ...prevFilters[filterType].slice(0, index),
                    ...prevFilters[filterType].slice(index + 1),
                ];
            }

            console.log('Updated Filters:', updatedFilters);

            // Gọi fetchFilteredData ngay khi có thay đổi trong checkbox
            // console.log("Filters after handleCheckboxChange:", filters);
            return updatedFilters;
        });
    };




    const fetchDataLoc = async () => {
        try {
            const thuongHieuData = await LocSanPhamService.getThuongHieu();
            const xuatXuData = await LocSanPhamService.getXuatXu();
            const danhMucData = await LocSanPhamService.getDanhMuc();
            const mauSacData = await LocSanPhamService.getMauSac();
            const kichThuocData = await LocSanPhamService.getKichThuoc();

            setListTH(thuongHieuData);
            setListXX(xuatXuData);
            setListDM(danhMucData);
            setListMS(mauSacData);
            setListKT(kichThuocData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const changeDetail = (id) => {
        window.location.href = `/product-detail/${id}`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'VND'}).format(amount);
    };

    useEffect(() => {
        const obse = new IntersectionObserver((enti) => {
            enti.forEach((enty) => {
                if (enty.isIntersecting) {
                    enty.target.classList.add('show');
                } else {
                    enty.target.classList.remove('show');
                }
            });
        });

        const contentText = document.querySelectorAll('.contentProductList-right');
        contentText.forEach((e) => {
            obse.observe(e);
        });
        const contentImg = document.querySelectorAll('.contentProductList-left');
        contentImg.forEach((e) => {
            obse.observe(e);
        });

        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = -scrolled * 0.9 + 'px';
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

        document.addEventListener('DOMContentLoaded', function () {
            const xemThemButton = document.getElementById('learnMore');

            xemThemButton.addEventListener('click', function () {
                const danhSachSanPham = document.getElementById('div2');

                danhSachSanPham.scrollIntoView({behavior: 'smooth'});
            });
        });

        fetchData();
        fetchDataLoc();
        // fetchFilteredData(); // Gọi hàm fetchFilteredData khi filters thay đổi
    }, []);

    useEffect(() => {
        fetchFilteredData(); // Gọi hàm fetchFilteredData khi filters thay đổi
    }, [filters]);

    return (
        <Fragment>
            <body>
            {/*<header>*/}
            {/*    <nav class="navbar navbar-light bg-light">*/}
            {/*        <div class="container-fluid justify-content-end">*/}
            {/*            <Link to='/login' style={{textDecoration: 'none'}}><a class="navbar-brand" href="#"*/}
            {/*                                                                  style={{fontSize: '13px'}}> <i*/}
            {/*                className='bx bxs-user'></i> Đăng nhập</a></Link>*/}
            {/*            <Link to='your-cart' style={{textDecoration: 'none'}}><a class="navbar-brand" href="#"*/}
            {/*                                                                     style={{fontSize: '13px'}}> <i*/}
            {/*                className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>*/}
            {/*        </div>*/}
            {/*    </nav>*/}

            {/*    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead"*/}
            {/*         style={{backgroundColor: 'rgb(255, 255, 255)'}}>*/}
            {/*        <div className="container">*/}
            {/*            <div className="d-flex justify-content-between align-items-left w-100"*/}
            {/*                 style={{marginRight: '10px'}}>*/}
            {/*                <Link to='/' style={{textDecoration: 'none'}}> <a*/}
            {/*                    className="navbar-brand d-flex align-items-center">*/}
            {/*                    <img style={{width: '90px'}}*/}
            {/*                         src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"*/}
            {/*                         alt="site icon"/>*/}
            {/*                    <a class="text-uppercase text-decoration-none brand text-black"*/}
            {/*                       style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>*/}
            {/*                </a>*/}
            {/*                </Link>*/}
            {/*            </div>*/}

            {/*            <div className="collapse navbar-collapse justify-content-center" id="navMenu">*/}
            {/*                <ul className="navbar-nav mx-auto text-center">*/}
            {/*                    <li className="nav-item px-1 py-1">*/}

            {/*                        <Link to='/'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">TRANG CHỦ</a>*/}
            {/*                        </Link>*/}

            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">SẢN PHẨM</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">BÀI VIẾT</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">LIÊN HỆ</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list'*/}
            {/*                              style={{textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em'}}>*/}
            {/*                            <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1" style={{marginLeft: '65px'}}>*/}
            {/*                        <form className="d-flex">*/}
            {/*                            <input className="form-control me-2" type="search" placeholder="Tìm kiếm..."*/}
            {/*                                   aria-label="Search" style={{width: '200px'}}/>*/}
            {/*                            <button className="btn btn-outline-success" type="submit">Search</button>*/}
            {/*                        </form>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </nav>*/}
            {/*</header>*/}

            <main style={{minHeight: '70vh', backgroundColor: 'rgb(234, 227, 219)'}} data-bs-spy="scroll"
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
                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                            <strong class="font-monospace">DANH MỤC</strong>
                                        </button>
                                    </h1>
                                    <div id="collapseOne" class="accordion-collapse collapse show "
                                         aria-labelledby="headingOne"
                                         data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <ul className="list-group list-group-flush">
                                                {listDM.map((danhMuc) => (
                                                    <label key={danhMuc.id} className="list-group-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isFilterSelected('danhMuc', danhMuc.id)}
                                                            onChange={() => handleCheckboxChange('danhMuc', danhMuc.id)}
                                                        />
                                                        {danhMuc.ten}
                                                    </label>
                                                ))}

                                            </ul>
                                        </div>


                                    </div>
                                </div>

                            </div>
                            <hr/>
                            <div class="accordion" id="accordionExample1">

                                <div class="accordion-item border-0">
                                    <h1 class="accordion-header" id="headingOne1">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne1"
                                                aria-expanded="true" aria-controls="collapseOne1">
                                            <strong class="font-monospace">THƯƠNG HIỆU</strong>
                                        </button>
                                    </h1>
                                    <div id="collapseOne1" class="accordion-collapse collapse show"
                                         aria-labelledby="headingOne1"
                                         data-bs-parent="#accordionExample1">
                                        <div class="accordion-body">
                                            <ul class="list-group list-group-flush">
                                                {listTH.map((thuongHieu) => (
                                                    <label key={thuongHieu.id} className="list-group-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isFilterSelected('thuongHieu', thuongHieu.id)}
                                                            onChange={() => handleCheckboxChange('thuongHieu', thuongHieu.id)}
                                                        />
                                                        {thuongHieu.ten}
                                                    </label>
                                                ))}

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>
                            <div class="accordion" id="accordionExample5">
                                <div class="accordion-item border-0">
                                    <h1 class="accordion-header" id="headingTwo1">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo1"
                                                aria-expanded="true" aria-controls="collapseTwo1">
                                            <strong class="font-monospace">XUẤT XỨ</strong>
                                        </button>
                                    </h1>
                                    <div id="collapseTwo1" class="accordion-collapse collapse show"
                                         aria-labelledby="headingTwo1"
                                         data-bs-parent="#accordionExample5">
                                        <div class="accordion-body">
                                            <ul class="list-group list-group-flush">
                                                {listXX.map((xuatXu) => (
                                                    <label key={xuatXu.id} className="list-group-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isFilterSelected('xuatXu', xuatXu.id)}
                                                            onChange={() => handleCheckboxChange('xuatXu', xuatXu.id)}
                                                        />
                                                        {xuatXu.ten}
                                                    </label>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>

                            <div class="accordion" id="accordionExample2">
                                <div class="accordion-item border-0 ">
                                    <h1 class="accordion-header " id="headingOne2">
                                        <button class="accordion-button " type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne2" aria-expanded="true"
                                                aria-controls="collapseOne2">
                                            <strong class="font-monospace">KÍCH THƯỚC</strong>
                                        </button>
                                    </h1>
                                    <div id="collapseOne2" class="accordion-collapse collapse show "
                                         aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                                        <div class="accordion-body">
                                            <ul class="list-group list-group-flush">
                                                {listKT.map((kichThuoc) => (
                                                    <label key={kichThuoc.id} className="list-group-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isFilterSelected('kichThuoc', kichThuoc.id)}
                                                            onChange={() => handleCheckboxChange('kichThuoc', kichThuoc.id)}
                                                        />
                                                        {kichThuoc.giaTri}
                                                    </label>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr/>
                            <div className="accordion" id="accordionExample2">
                                <div className="accordion-item border-0 ">
                                    <h1 className="accordion-header " id="headingOne2">
                                        <button className="accordion-button " type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne2" aria-expanded="true"
                                                aria-controls="collapseOne2">
                                            <strong className="font-monospace">MÀU SẮC</strong>
                                        </button>
                                    </h1>
                                    <div id="collapseOne2" className="accordion-collapse collapse show "
                                         aria-labelledby="headingOne2" data-bs-parent="#accordionExample2">
                                        <div className="accordion-body">
                                            <ul className="list-group list-group-flush">
                                                {listMS.map((mauSac) => (
                                                    <label key={mauSac.id} className="list-group-item">
                                                        <input
                                                            type="checkbox"
                                                            checked={isFilterSelected('mauSac', mauSac.id)}
                                                            onChange={() => handleCheckboxChange('mauSac', mauSac.id)}
                                                        />
                                                        {mauSac.ten}
                                                    </label>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr/>

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
                                                       placeholder="Username"/>
                                                <label for="floatingInputGroup1">Tìm Kiếm</label>
                                            </div>
                                            <span class="input-group-text"><i class='bx bx-search'></i></span>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <hr/>
                            <div class="row">
                                <InfiniteScroll
                                    dataLength={listSP.length}
                                    next={fetchData}
                                    hasMore={hasMore}
                                    loader={loading ? (
                                        <div className="text-center" style={{marginTop: "25%", marginBottom: "25%"}}>
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                            <div>Loading...</div>
                                        </div>
                                    ) : null}
                                >
                                    {/* start product card*/}
                                    {/* Display your products here */}
                                    {listSP.map((sp) => (
                                        <div className="col-lg-4 mt-4 float-start" key={sp.id}
                                             onClick={() => changeDetail(sp.id)}>
                                            <div className="cardProductList text-start">
                                                <div className="position-relative">

                                                    <img className="card-img-top"
                                                         src={'/img/' + sp.anhBia}
                                                        // src={'/frontend/public/niceadmin/img/'+sp.anh}
                                                         alt="Title"
                                                         height={270}
                                                         width={335}
                                                    />

                                                    <div
                                                        className="position-absolute bottom-0 start-0 mb-1 ms-1 shopBtn">
                                                        <button className="btn btn-success ">Mua Ngay!</button>
                                                    </div>

                                                </div>
                                                <br/>
                                                <div className="card-body text-center">

                                                    <h4 className="card-title " style={{fontSize: 22}}>
                                                        <strong>{sp.ten}</strong></h4>
                                                    <h7 className="card-text">{sp.tenThuongHieu} | {sp.tenXuatXu} | {sp.tenDanhMuc}</h7>
                                                    <h5 className="card-text"
                                                        style={{color: "red"}}>{formatCurrency(sp.min === sp.max ? (sp.max) : (
                                                        <p>{sp.min} ~ {sp.max}</p>))}</h5>
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

            {/*<footer>*/}
            {/*    <footer class="bg-gray py-5" style={{backgroundColor: 'rgba(0,0,0,0.03)'}}>*/}
            {/*        <div class="container">*/}
            {/*            <div class="row text-black g-4">*/}
            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <a class="text-uppercase text-decoration-none brand text-black"*/}
            {/*                       style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>*/}
            {/*                    <p class="text-black text-muted mt-3"><strong>Giày thể thao chính hãng </strong><br/>*/}
            {/*                        Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br/>*/}
            {/*                        Đội ngũ hỗ trợ khách hàng luôn luôn 24/7*/}
            {/*                    </p>*/}
            {/*                </div>*/}

            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <h5 class="fw-dark">Liên Kết</h5>*/}
            {/*                    <ul class="list-unstyled">*/}
            {/*                        <li class="my-3">*/}
            {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
            {/*                                Home*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li class="my-3">*/}
            {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
            {/*                                Bộ sưu tập*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li class="my-3">*/}
            {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
            {/*                                Blogs*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li class="my-3">*/}
            {/*                            <a href="#" class="text-black text-decoration-none text-muted">*/}
            {/*                                Về chúng tôi*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </div>*/}

            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <h5 class="fw-light mb-4">Liên Hệ</h5>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                            <span class="me-0">*/}
            {/*                                <i class="fas fa-map-marked-alt"></i>*/}
            {/*                            </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                                Hoàng Quốc Việt - Cầu Giấy - Hà Nội*/}
            {/*                            </span>*/}
            {/*                    </div>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                            <span class="me-0">*/}
            {/*                                <i class="fas fa-envelope"></i>*/}
            {/*                            </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                                404shopshoes@gmail.com*/}
            {/*                            </span>*/}
            {/*                    </div>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                            <span class="me-0">*/}
            {/*                                <i class="fas fa-phone-alt"></i>*/}
            {/*                            </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                                +84 0819130199*/}
            {/*                            </span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <h5 class="fw-light mb-3">Theo Dõi</h5>*/}
            {/*                    <div>*/}
            {/*                        <ul class="list-unstyled d-flex flex-column">*/}
            {/*                            <li>*/}
            {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i class="fab fa-facebook-f"> Facebook</i>*/}
            {/*                                </a>*/}
            {/*                            </li>*/}
            {/*                            <li>*/}
            {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i class="fab fa-twitter"> Twitter</i>*/}
            {/*                                </a>*/}
            {/*                            </li>*/}
            {/*                            <li>*/}
            {/*                                <a href="#" class="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i class="fab fa-instagram"> Instagram</i>*/}
            {/*                                </a>*/}
            {/*                            </li>*/}
            {/*                        </ul>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </footer>*/}
            {/*</footer>*/}
            </body>
        </Fragment>
    )
}

export default ProductList;
