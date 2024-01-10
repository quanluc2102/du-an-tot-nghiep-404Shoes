import React from 'react'


const getUserNameFromLocalStorage = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(savedUser.thongTinNguoiDung.ten)
    return savedUser.thongTinNguoiDung.ten || '';
  } catch (error) {
    console.error('Error while retrieving user name from local storage:', error);
    return '';
  }
}

const getRoleFromLocalStorage = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(savedUser.email)
    return savedUser.email || '';
  } catch (error) {
    console.error('Error while retrieving user name from local storage:', error);
    return '';
  }
}

const handleLogout = () => {
  // Thực hiện các thao tác đăng xuất, ví dụ: xóa token từ localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('currentUser');

  // Chuyển hướng người dùng về trang đăng nhập
  window.location.href = (`/login`);
};

const name = getUserNameFromLocalStorage();
const role = getRoleFromLocalStorage();

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

    <div className="d-flex align-items-center justify-content-between">
      <a href="/" className="logo d-flex align-items-center">
        {/* <img src="%PUBLIC_URL%/niceadmin/img/logo.png" alt=""/> */}
        <span className="d-none d-lg-block">404Shoes</span>
      </a>
      {/* <i className="bi bi-list toggle-sidebar-btn"></i> */}
    </div>

    {/*<div className="search-bar">*/}
    {/*  <form className="search-form d-flex align-items-center" method="POST" action="#">*/}
    {/*    <input type="text" name="query" placeholder="Search" title="Enter search keyword"/>*/}
    {/*    <button type="submit" title="Search"><i className="bi bi-search"></i></button>*/}
    {/*  </form>*/}
    {/*</div>*/}

    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">

        <li className="nav-item dropdown pe-3">

          <a className="nav-link nav-profile d-flex align-items-center pe-0"  data-bs-toggle="dropdown">
            {/* <img src="%PUBLIC_URL%/niceadmin/img/profile-img.jpg" alt="Profile" className="rounded-circle"/> */}
            <span className="d-none d-md-block dropdown-toggle ps-2">{name}</span>
          </a>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li className="dropdown-header">
              <h6>{name}</h6>
              <span>{role}</span>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li>

            <li>
              <a className="dropdown-item d-flex align-items-center" href="/userinfo">
                <i className="bi bi-person"></i>
                <span>Thông tin cá nhân</span>
              </a>
            </li>
            <li>
              <hr className="dropdown-divider"/>
            </li>



            <li>
              <a className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i>
                <span>Đăng xuất</span>
              </a>
            </li>

          </ul>
        </li>

      </ul>
    </nav>

  </header>
    
  )
}

export default Header