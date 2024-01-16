import React, { Fragment, useEffect } from "react"
import './style.css'
import './bootstrap.min.css'
import './tiny-slider.css'
import { Link } from "react-router-dom/cjs/react-router-dom";
import { styled } from '@mui/material/styles';
import { MdOutlineLocalShipping } from "react-icons/md";
import { GiReturnArrow} from "react-icons/gi";
import { FiShoppingBag } from "react-icons/fi";
import { TiSupport } from "react-icons/ti";
import { IoMdAddCircle } from "react-icons/io";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";


function Home() {

    // const  bagImg = require('../../img/bag.svg')
    // const  truckImg = require('../../img/truck.svg')
    // const  supportImg = require('../../img/support.svg')
    // const  returnImg = require('../../img/return.svg')
    // const crossImg = require('../../img/cross.svg')

    const handlePrice = (price) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    }

    const images = [
        {
            url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/aeb405a727294b148ee7af9c00a32c92_9366/Ultra_4DFWD_Running_Shoes_Pink_GV9063_04_standard.jpg',
            title: 'Sales-off',
            width: '25%',
            price: '500000',
        },
        {
            url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c7e1459db45d46259b14af3b008c9966_9366/adidas_4DFWD_Running_Shoes_White_HP7668_04_standard.jpg',
            title: 'New Arrivals',
            width: '25%',
            price: '500000',
        },
        {
            url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ed9ac57ecbd34b188b10af47017b50c2_9366/4DFWD_2_Running_Shoes_Red_IF9933_04_standard.jpg',
            title: 'Best Seller',
            width: '25%',
            price: '500000',
        },
    ]

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImagebackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const Imagebackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));

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
            {/*<header>*/}
            {/*    <nav className="navbar navbar-light bg-light">*/}
            {/*        <div className="container-fluid justify-content-end">*/}
            {/*            <Link to='/login' style={{ textDecoration: 'none' }}><a className="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-user'></i> Đăng nhập</a></Link>*/}
            {/*            <Link to='your-cart' style={{ textDecoration: 'none' }}><a className="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>*/}
            {/*        </div>*/}
            {/*    </nav>*/}

            {/*    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>*/}
            {/*        <div className="container">*/}
            {/*            <div className="d-flex justify-content-between align-items-left w-100" style={{ marginRight: '10px' }}>*/}
            {/*                <Link to='/' style={{ textDecoration: 'none' }}> <a className="navbar-brand d-flex align-items-center">*/}
            {/*                    <img style={{ width: '90px' }}*/}
            {/*                        src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"*/}
            {/*                        alt="site icon" />*/}
            {/*                    <a className="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
            {/*                </a>*/}
            {/*                </Link>*/}
            {/*            </div>*/}

            {/*            <div className="collapse navbar-collapse justify-content-center" id="navMenu">*/}
            {/*                <ul className="navbar-nav mx-auto text-center">*/}
            {/*                    <li className="nav-item px-1 py-1">*/}

            {/*                        <Link to='/' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">TRANG CHỦ</a>*/}
            {/*                        </Link>*/}

            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">SẢN PHẨM</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">BÀI VIẾT</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">LIÊN HỆ</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1" style={{ marginLeft: '65px' }}>*/}
            {/*                        <form className="d-flex">*/}
            {/*                            <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" style={{ width: '200px' }} />*/}
            {/*                            <button className="btn btn-outline-success" type="submit">Search</button>*/}
            {/*                        </form>*/}
            {/*                    </li>*/}
            {/*                </ul>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </nav>*/}
            {/*</header>*/}

            {/* <main style={{ minHeight: '100vh', backgroundColor: 'aquamarine' }} data-bs-spy="scroll" data-bs-target="#nav-example"
                data-bs-smooth-scroll="true" tabindex="0">
                <div className="contentHome trang1-home">
                    <p className="description"> <span style={{ fontSize: '40px' }}> <span>Giày thể thao mùa đông 2023</span> </span><br /> với nhiều ưu đãi hấp dẫn 💥 </p>

                    <a href="#div1" className="btn">
                        <h1 className="text-center" id="x1">👉 Mua Ngay</h1>
                    </a>
                </div>

                <div className="showCase" id="div1" style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                    <div className="row">
                        <p>DANH MỤC MUA HÀNG</p>
                    </div>
                    <br />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                        {images.map((image) => (
                            <ImageButton
                                focusRipple
                                key={image.title}
                                style={{
                                    width: image.width,
                                }}
                            >
                                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                <Imagebackdrop className="MuiImagebackdrop-root" />
                                <Image>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            pt: 2,
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                    >
                                        {image.title}
                                        <ImageMarked className="MuiImageMarked-root" />
                                    </Typography>
                                </Image>
                            </ImageButton>
                        ))}
                    </Box>
                </div>

                <div className="contentHome trang2-home">
                    <div className="row container">
                        <div className="col-6 content-left">
                            <img src="https://ananas.vn/wp-content/uploads/Pro_AV00202_1.jpg"
                                className={`img-fluid ${['rounded-top', 'rounded-right', 'rounded-bottom', 'rounded-left', 'rounded-circle'][3]}`}
                                alt="" />
                        </div>
                        <div className="col-6 content-right">
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY THỂ THAO NAM</strong></h1>
                            <hr />
                            <p className="font-monospace">Được thiết kế với chất liệu chống nước và đế đàn hồi cao cấp, đôi giày này không chỉ giúp bảo vệ đôi chân của bạn khỏi mọi điều kiện thời tiết khắc nghiệt mà còn mang lại trải nghiệm thoải mái khi di chuyển.
                                Kiểu dáng của chúng được tối ưu hóa để phản ánh sự hiện đại và phong cách đẳng cấp.

                                Bên cạnh đó, công nghệ đệm Air Cushion tại phần đế giúp giảm áp lực cho đôi chân khi bạn di chuyển, tạo cảm giác nhẹ nhàng và thoải mái suốt cả ngày.
                                Điều này làm cho đôi giày trở thành sự lựa chọn hoàn hảo cho những người hoạt động năng động, đồng thời không làm mất đi vẻ đẹp thời trang.</p>

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
                            <p className="font-monospace">Đôi giày thể thao nữ của chúng tôi không chỉ là biểu tượng của sự thoải mái mà còn là nguồn cảm hứng từ xu hướng thời trang mới nhất.
                                Thiết kế hiện đại và tinh tế giúp chúng phản ánh đẳng cấp và sự nữ tính. Chất liệu chống nước và đế linh hoạt giúp đảm bảo thoải mái và bảo vệ chân bạn trong mọi điều kiện thời tiết.

                                Ngoài ra, đôi giày này còn được trang bị công nghệ đệm Cloudfoam, tạo ra cảm giác êm ái và hỗ trợ tối ưu cho đôi chân của bạn.
                                Điều này làm cho chúng trở thành sự lựa chọn hoàn hảo cho những người phụ nữ có lối sống tích cực và muốn kết hợp giữa phong cách và sự thoải mái.</p>

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
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY SALES GIÁ HỜI</strong></h1>
                            <hr />
                            <p className="font-monospace">Chúng tôi tự hào giới thiệu bộ sưu tập giày thể thao đang được giảm giá, với kiểu dáng thời trang và mức giá hấp dẫn.
                                Những đôi giày này không chỉ là sự kết hợp hoàn hảo giữa giá trị và phong cách, mà còn được thiết kế để đáp ứng nhu cầu của những người yêu thể thao và thời trang.

                                Với chất liệu nhẹ và đế êm ái, những đôi giày này không chỉ giúp bạn tiết kiệm chi phí mà còn đảm bảo sự thoải mái khi di chuyển.
                                Kiểu dáng đa dạng và màu sắc phối hợp tinh tế sẽ làm cho bạn nổi bật mà không cần phải chi trả một khoản lớn.

                                Hãy đến và khám phá ngay bộ sưu tập giày thể thao nữ giảm giá tại cửa hàng của chúng tôi.
                                Chúng tôi tin rằng bạn sẽ tìm thấy đôi giày ưng ý với mức giá phải chăng, mang lại sự hài lòng và thoải mái cho từng bước chân.</p>

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
                            <h1 className="font-monospace fw-bolder"><strong>GIÀY BÁN CHẠY NHẤT</strong></h1>
                            <hr />
                            <p className="font-monospace">Đôi giày này không chỉ là lựa chọn phổ biến của khách hàng mà còn là biểu tượng của sự thoải mái và phong cách.
                                Với thiết kế tinh tế, chúng phản ánh xu hướng thời trang mới nhất và có khả năng kết hợp linh hoạt với nhiều trang phục khác nhau.

                                Được làm từ chất liệu cao cấp và đế linh hoạt, đôi giày này mang lại cảm giác thoải mái và hỗ trợ tốt cho đôi chân của bạn.
                                Công nghệ đệm tiên tiến giúp giảm mệt mỏi khi di chuyển, làm cho chúng trở thành sự lựa chọn ưa thích cho những người muốn kết hợp giữa phong cách và sự thoải mái.

                                Đừng bỏ lỡ cơ hội trải nghiệm đôi giày thể thao nữ bán chạy nhất tại cửa hàng của chúng tôi.
                                Chúng tôi tin rằng bạn sẽ không chỉ hài lòng với sự phổ biến của chúng mà còn đánh giá cao sự thoải mái và chất lượng mà đôi giày này mang lại. </p>

                            <div className="d-flex justify-content-center">

                                <button className="btn btn-outline-success mt-3">Xem Thêm</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contentHome trang6-home">
                    <div className="row container" id="div6">
                        <div className="col-6 content-left">
                            <h1 className="font-monospace fw-bolder"><strong>👉 BÀI VIẾT FACEBOOK</strong></h1>
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
                            <h1 className="font-monospace fw-bolder"><strong>👉 TRANG INSTAGRAM</strong></h1>
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
            </main> */}
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Giày thể thao mùa đông 2023 <span clsas="d-block">với nhiều ưu đãi hấp dẫn 💥</span></h1>
                                <p className="mb-4">404Shoes là một trong những thương hiệu giày thể thao hàng đầu trên thế giới và có một lịch sử dài với nhiều đóng góp quan trọng trong ngành công nghiệp thể thao và thời trang.</p>
                                <p><a href="" className="btn btn-secondary me-2">Shop Now</a><a href="#" className="btn btn-white-outline">Explore</a></p>
                            </div>
                        </div>
                        <div className="col-lg-7">

                            <div className="hero-img-wrap">
                                <img src={require('../../img/giay-nike-court-vision-mid-smoke-grey-dn3577-002-3-1020x680-removebg-preview.png')} className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-section">
                <div className="container">
                    <div className="row">

                        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                            <h2 className="mb-4 section-title">Đa dạng mẫu mã</h2>
                            <p className="mb-4">Chúng tôi cung cấp nhiều loại giày với nhiều mẫu mã khác nhau, đáp ứng nhu cầu của người tiêu dùng từ các hoạt động thể thao đến phong cách hàng ngày.</p>
                            <p><a href="shop.html" className="btn">Explore</a></p>
                        </div>

                        {images.map((item, index) => (
                            <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src={item.url} className="img-fluid product-thumbnail" />
                                <h3 className="product-title">{item.name}</h3>
                                <strong className="product-price">{handlePrice(item.price)}</strong>
                                {/* <span className="icon-cross"> */}
                                    {/* <img src={require('../../img/cross.svg')} className="img-fluid" /> */}
                                    <IoMdAddCircle className="add_cart" />
                                {/* </span> */}
                            </a>
                        </div>
                        ))}

                        {/* <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src={require('../../img/product-2.png')} className="img-fluid product-thumbnail" />
                                <h3 className="product-title">Kruzo Aero Chair</h3>
                                <strong className="product-price">$78.00</strong>

                                <span className="icon-cross">
                                    <img src={require('../../img/cross.svg')} className="img-fluid" />
                                </span>
                            </a>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img src={require('../../img/product-3.png')} className="img-fluid product-thumbnail" />
                                <h3 className="product-title">Ergonomic Chair</h3>
                                <strong className="product-price">$43.00</strong>

                                <span className="icon-cross">
                                    <img src={require('../../img/cross.svg')} className="img-fluid" />
                                </span>
                            </a>
                        </div> */}

                    </div>
                </div>
            </div>

            <div className="why-choose-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <h2 className="section-title">Lý do nên chọn chúng tôi</h2>
                            <p>404Shoes là một trong những công ty hàng đầu thế giới trong lĩnh vực thiết kế, sản xuất và kinh doanh các sản phẩm thể thao và đồng phục.</p>

                            <div className="row my-5">
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <MdOutlineLocalShipping className="imf-fluid" />
                                        </div>
                                        <h3>Nhanh chóng &amp; Thuận tiện </h3>
                                        <p>Với giao diện trực tuyến tiện lợi, người mua có thể dễ dàng duyệt qua một loạt các sản phẩm thể thao và giày dép đa dạng. 
                                            Quá trình đặt hàng trở nên đơn giản với các tùy chọn thanh toán linh hoạt và giao hàng nhanh chóng.</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <FiShoppingBag className="imf-fluid" />
                                        </div>
                                        <h3>Dễ dàng mua sắm</h3>
                                        <p>Nike sản xuất và phân phối nhiều dòng giày thể thao nổi tiếng như Air Max, Air Jordan, Nike SB, Roshe Run, và nhiều dòng sản phẩm khác.
                                        Mỗi dòng sản phẩm thường mang đến những đặc điểm độc đáo và công nghệ tiên tiến.</p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <TiSupport className="imf-fluid" />
                                        </div>
                                        <h3>Hỗ trợ 24/7</h3>
                                        <p>Nike có một đội ngũ chăm sóc khách hàng chuyên nghiệp để giải quyết các vấn đề và câu hỏi của khách hàng.
                                        Nếu có vấn đề kỹ thuật liên quan đến sản phẩm, Nike có thể cung cấp hỗ trợ kỹ thuật thông qua đội ngũ chuyên gia.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <GiReturnArrow className="imf-fluid" />
                                        </div>
                                        <h3>Hoàn trả miễn phí</h3>
                                        <p>Nếu có bất kỳ lý do gì khiến bạn không hài lòng với sản phẩm nhận được, chính sách hoàn trả miễn phí của Nike sẽ giúp bạn dễ dàng trở lại và đổi trả mà không phải chịu thêm bất kỳ chi phí nào. </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="img-wrap">
                                <img style={{height: '700px', width: '500px'}} src={require('../../img/52da8066a1ee3049322082a2f4d9f214.jpg')} alt="Image" className="img-fluid" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="we-help-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="imgs-grid">
                                <div className="grid grid-1"><img src={require('../../img/pexels-melvin-buezo-2529148.jpg')} alt="Untree.co" /></div>
                                <div className="grid grid-2"><img src={require('../../img/pexels-sadegh-abdollahi-13600672.jpg')} alt="Untree.co" /></div>
                                <div className="grid grid-3"><img src={require('../../img/pexels-ray-piedra-1464624.jpg')} alt="Untree.co" /></div>
                            </div>
                        </div>
                        <div className="col-lg-5 ps-lg-5">
                            <h2 className="section-title mb-4">Chúng tôi sẽ giúp bạn có những trải nghiệm tuyệt vời</h2>
                            <p>Thương hiệu chúng tôi nổi tiếng với chất lượng và độ bền của sản phẩm, giúp giày được sử dụng trong thời gian dài mà vẫn giữ được hiệu suất.</p>

                            <ul className="list-unstyled custom-list my-4">
                                <li>Giày chúng tôi thường được thiết kế với các công nghệ thoải mái, giúp giảm áp lực lên chân và tăng cường sự thoải mái khi di chuyển.</li>
                                <li>Công nghệ đệm trong giày giúp giảm sóc lực khi chân đặt chấm trên mặt đất, giảm thiểu va chạm và giúp bảo vệ khớp và cơ bắp.</li>
                                <li>Với việc sử dụng các chất liệu nhẹ và linh hoạt như Flyknit, giày mang lại cảm giác nhẹ nhàng và dễ dàng di chuyển.</li>
                                <li>Chúng tôi cung cấp nhiều dòng giày phù hợp cho nhiều hoạt động khác nhau, từ chạy bộ đến đá bóng, và các môn thể thao khác.</li>
                            </ul>
                            <p><a herf="#" className="btn">Explore</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="popular-product">
                <div className="container">
                    <div className="row">

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src={require('../../img/giay-nike-air-max-systm-nam-den-trang-01-removebg-preview.png')} alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Air Max</h3>
                                    <p>Dòng Air Max nổi tiếng với việc sử dụng công nghệ đệm khí Air Max ở đế giày, tạo ra sự thoải mái và đàn hồi đặc biệt. </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src={require('../../img/air-jordan-1-mid-shoes-86f1ZW-removebg-preview.png')} alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Air Jordan</h3>
                                    <p>Dòng giày Air Jordan được thiết kế đặc biệt cho đối tác đặc biệt của Nike, cầu thủ bóng rổ huyền thoại Michael Jordan. </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img src={require('../../img/free-run-5-road-running-shoes-m8L9mr-removebg-preview.png')} alt="Image" className="img-fluid" />
                                </div>
                                <div className="pt-3">
                                    <h3>Nike Free</h3>
                                    <p>Dòng giày Nike Free được thiết kế để tạo cảm giác tự nhiên, như là chân không mặc giày </p>
                                    <p><a href="#">Read More</a></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="testimonial-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mx-auto text-center">
                            <h2 className="section-title">Testimonials</h2>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="testimonial-slider-wrap text-center">

                                <div id="testimonial-nav">
                                    <span className="prev" data-controls="prev"><span className="fa fa-chevron-left"></span></span>
                                    <span className="next" data-controls="next"><span className="fa fa-chevron-right"></span></span>
                                </div>

                                <div className="testimonial-slider">

                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">

                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img src={require('../../img/person-1.png')} alt="Maria Jones" className="img-fluid" />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">

                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img src={require('../../img/person-1.png')} alt="Maria Jones" className="img-fluid" />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">

                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>&ldquo;Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.&rdquo;</p>
                                                    </blockquote>

                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img src={require('../../img/person-1.png')} alt="Maria Jones" className="img-fluid" />
                                                        </div>
                                                        <h3 className="font-weight-bold">Maria Jones</h3>
                                                        <span className="position d-block mb-3">CEO, Co-Founder, XYZ Inc.</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-section">
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-md-6">
                            <h2 className="section-title">Recent Blog</h2>
                        </div>
                        <div className="col-md-6 text-start text-md-end">
                            <a href="#" className="more">View All Posts</a>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src={require('../../img/pexels-ray-piedra-1478442.jpg')} alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">First Time Home Owner Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src={require('../../img/pexels-photo-2385477.jpeg')} alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0">
                            <div className="post-entry">
                                <a href="#" className="post-thumbnail"><img src={require('../../img/pexels-rafa-de-345415.jpg')} alt="Image" className="img-fluid" /></a>
                                <div className="post-content-entry">
                                    <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
                                    <div className="meta">
                                        <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*<footer>*/}
            {/*    <footer className="bg-gray py-5" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>*/}
            {/*        <div className="container">*/}
            {/*            <div className="row text-black g-4">*/}
            {/*                <div className="col-md-6 col-lg-3">*/}
            {/*                    <a className="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
            {/*                    <p className="text-black text-muted mt-3"> <strong>Giày thể thao chính hãng </strong><br />*/}
            {/*                        Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br />*/}
            {/*                        Đội ngũ hỗ trợ khách hàng luôn luôn 24/7*/}
            {/*                    </p>*/}
            {/*                </div>*/}

            {/*                <div className="col-md-6 col-lg-3">*/}
            {/*                    <h5 className="fw-dark">Liên Kết</h5>*/}
            {/*                    <ul className="list-unstyled">*/}
            {/*                        <li className="my-3">*/}
            {/*                            <a href="#" className="text-black text-decoration-none text-muted">*/}
            {/*                                Home*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li className="my-3">*/}
            {/*                            <a href="#" className="text-black text-decoration-none text-muted">*/}
            {/*                                Bộ sưu tập*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li className="my-3">*/}
            {/*                            <a href="#" className="text-black text-decoration-none text-muted">*/}
            {/*                                Blogs*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                        <li className="my-3">*/}
            {/*                            <a href="#" className="text-black text-decoration-none text-muted">*/}
            {/*                                Về chúng tôi*/}
            {/*                            </a>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </div>*/}

            {/*                <div className="col-md-6 col-lg-3">*/}
            {/*                    <h5 className="fw-light mb-4">Liên Hệ</h5>*/}
            {/*                    <div className="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span className="me-0">*/}
            {/*                            <i className="fas fa-map-marked-alt"></i>*/}
            {/*                        </span>*/}
            {/*                        <span className="fw-light">*/}
            {/*                            Hoàng Quốc Việt - Cầu Giấy - Hà Nội*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                    <div className="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span className="me-0">*/}
            {/*                            <i className="fas fa-envelope"></i>*/}
            {/*                        </span>*/}
            {/*                        <span className="fw-light">*/}
            {/*                            404shopshoes@gmail.com*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                    <div className="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span className="me-0">*/}
            {/*                            <i className="fas fa-phone-alt"></i>*/}
            {/*                        </span>*/}
            {/*                        <span className="fw-light">*/}
            {/*                            +84 0819130199*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="col-md-6 col-lg-3">*/}
            {/*                    <h5 className="fw-light mb-3">Theo Dõi</h5>*/}
            {/*                    <div>*/}
            {/*                        <ul className="list-unstyled d-flex flex-column">*/}
            {/*                            <li>*/}
            {/*                                <a href="#" className="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i className="fab fa-facebook-f"> Facebook</i>*/}
            {/*                                </a>*/}
            {/*                            </li>*/}
            {/*                            <li>*/}
            {/*                                <a href="#" className="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i className="fab fa-twitter"> Twitter</i>*/}
            {/*                                </a>*/}
            {/*                            </li>*/}
            {/*                            <li>*/}
            {/*                                <a href="#" className="text-black text-decoration-none text-muted fs-4 me-4">*/}
            {/*                                    <i className="fab fa-instagram"> Instagram</i>*/}
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
    )
}

export default Home;
     