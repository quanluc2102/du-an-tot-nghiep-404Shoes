import React, {Fragment, useEffect, useState} from "react"
import './style.css'
import { Link } from "react-router-dom/cjs/react-router-dom";
import AuthService from "./AuthService";

function Login({ onLogin, onLogout }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [userInfo, setUserInfo] = useState(null); // Thêm state để lưu thông tin người dùng

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const token = await AuthService.login(credentials);
            localStorage.setItem('token', token);

            // Sau khi đăng nhập thành công, gọi hàm để lấy thông tin người dùng
            getUserInfo();

            onLogin();
        } catch (error) {
            // Xử lý lỗi, hiển thị thông báo, vv.
        }
    };

    const getUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Token not found');
            }

            // Fetch the specific user using the provided endpoint
            const userEndpoint = 'http://localhost:8080/tai_khoan/nhan-vien-quyen-3';

            const userResponse = await fetch(userEndpoint, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(userResponse)
            console.log("credentials"+credentials.email)
            if (userResponse.ok) {
                const allUsers = await userResponse.json();

                // Example: Assuming each user in allUsers has an 'email' field
                const desiredEmail = credentials.email; // Replace with the desired email

                // Find the user with the matching email in the array
                const matchingUser = allUsers.find(user => user.email === desiredEmail);

                if (matchingUser) {
                    localStorage.setItem('currentUser', JSON.stringify(matchingUser));
                    console.log('User found and saved to local storage:', matchingUser);
                } else {
                    console.error('User not found with the specified email:', desiredEmail);

                }
            } else {
                const errorResponse = await userResponse.json();
                throw new Error(errorResponse.message || 'Failed to get user info');
            }
        } catch (error) {
            console.error('Error getting user info:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        AuthService.logout();
        onLogout(); // Ensure onLogout is defined before calling
        setUserInfo(null); // Đăng xuất cũng cần xóa thông tin người dùng
    };

    // Hàm để lấy thông tin người dùng từ backend
    // const getUserInfo = async () => {
    //     try {
    //         const user = await AuthService.getUserInfo();
    //         setUserInfo(user);
    //     } catch (error) {
    //         console.error('Error fetching user info:', error);
    //     }
    // };

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

        window.addEventListener('scroll', function () {
            var parallax3 = document.getElementById('navbarhead');
            let scrolled = this.window.scrollY;
            parallax3.style.top = - scrolled * 0.9 + 'px';

        });
    }, []);

    return (
        <Fragment>
            {/*<header>*/}
            {/*    <nav class="navbar navbar-light bg-light">*/}
            {/*        <div class="container-fluid justify-content-end">*/}
            {/*            <Link to='/register' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-user'></i> Đăng ký</a></Link>*/}
            {/*            <Link to='your-cart' style={{ textDecoration: 'none' }}><a class="navbar-brand" href="#" style={{ fontSize: '13px' }}> <i className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>*/}
            {/*        </div>*/}
            {/*    </nav>*/}

            {/*    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>*/}
            {/*        <div className="container">*/}
            {/*            <div className="d-flex justify-content-between align-items-left w-100" style={{ marginRight: '10px' }}>*/}
            {/*                <Link to='/' style={{ textDecoration: 'none' }}> <a className="navbar-brand d-flex align-items-center">*/}
            {/*                    <img style={{ width: '90px' }}*/}
            {/*                        src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"*/}
            {/*                        alt="site icon" />*/}
            {/*                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
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
            {/*                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">SẢN PHẨM</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">BÀI VIẾT</a>*/}
            {/*                        </Link>*/}
            {/*                    </li>*/}
            {/*                    <li className="nav-item px-1 py-1">*/}
            {/*                        <Link to='product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                            <a className="nav-link text-uppercase">LIÊN HỆ</a>*/}
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

            <div className="background"></div>
            <section className="home" style={{ marginTop: '130px' }}>
                <div className="login">
                    <h2> Đăng nhập </h2>
                    <div className="input">
                        <input
                            type="text"
                            name="email"
                            id="yourEmail"
                            className="input1"
                            placeholder="Email"
                            onChange={handleInputChange}
                            required
                        />
                        <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="input">
                        <input
                            type="password"
                            className="input1"
                            placeholder="Password"
                            name="password"
                            id="yourPassword"
                            onChange={handleInputChange}
                            required
                        />
                        <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="check">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <Link to='/'>Quên mật khẩu?</Link>
                    </div>
                    <div className="buttonLogin" style={{ backgroundColor: 'rgb(0, 104, 139)' }}>
                        <button className="btn" style={{ color: 'rgb(255, 255, 255)' }} onClick={handleLogin}>
                            Đăng nhập
                        </button>
                    </div>
                    <div className="sign-up">
                        <p> Chưa có tài khoản?</p>
                        <Link to='/register'>Đăng ký ngay</Link>
                    </div>
                </div>
            </section>


            {/*<footer>*/}
            {/*    <footer class="bg-gray py-5" style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}>*/}
            {/*        <div class="container">*/}
            {/*            <div class="row text-black g-4">*/}
            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <a class="text-uppercase text-decoration-none brand text-black" style={{ fontWeight: 'bold', fontSize: '26px' }}>404SHOES</a>*/}
            {/*                    <p class="text-black text-muted mt-3"> <strong>Giày thể thao chính hãng </strong><br />*/}
            {/*                        Hoàn trả 100% nếu sản phẩm bị lỗi hoặc hỏng khi vận chuyển <br />*/}
            {/*                        Đội ngũ hỗ trợ khách hàng luôn luôn 24/7*/}
            {/*                    </p>*/}
            {/*                </div>*/}

            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <h5 class="fw-dark">Liên Kết</h5>*/}
            {/*                    <ul className="navbar-nav mx-auto text-center">*/}
            {/*                        <li className="nav-item px-1 py-1">*/}

            {/*                            <Link to='/' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">TRANG CHỦ</a>*/}
            {/*                            </Link>*/}

            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1">*/}
            {/*                            <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">SẢN PHẨM</a>*/}
            {/*                            </Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1">*/}
            {/*                            <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">BÀI VIẾT</a>*/}
            {/*                            </Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1">*/}
            {/*                            <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">LIÊN HỆ</a>*/}
            {/*                            </Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1">*/}
            {/*                            <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>*/}
            {/*                            </Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1">*/}
            {/*                            <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>*/}
            {/*                                <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>*/}
            {/*                            </Link>*/}
            {/*                        </li>*/}
            {/*                        <li className="nav-item px-1 py-1" style={{ marginLeft: '65px' }}>*/}
            {/*                            <form className="d-flex">*/}
            {/*                                <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" style={{ width: '200px' }} />*/}
            {/*                                <button className="btn btn-outline-success" type="submit">Search</button>*/}
            {/*                            </form>*/}
            {/*                        </li>*/}
            {/*                    </ul>*/}
            {/*                </div>*/}

            {/*                <div class="col-md-6 col-lg-3">*/}
            {/*                    <h5 class="fw-light mb-4">Liên Hệ</h5>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span class="me-0">*/}
            {/*                            <i class="fas fa-map-marked-alt"></i>*/}
            {/*                        </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                            Hoàng Quốc Việt - Cầu Giấy - Hà Nội*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span class="me-0">*/}
            {/*                            <i class="fas fa-envelope"></i>*/}
            {/*                        </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                            404shopshoes@gmail.com*/}
            {/*                        </span>*/}
            {/*                    </div>*/}
            {/*                    <div class="d-flex justify-content-start align-items-start my-2 text-muted">*/}
            {/*                        <span class="me-0">*/}
            {/*                            <i class="fas fa-phone-alt"></i>*/}
            {/*                        </span>*/}
            {/*                        <span class="fw-light">*/}
            {/*                            +84 0819130199*/}
            {/*                        </span>*/}
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
        </Fragment>
    )
}

export default Login;