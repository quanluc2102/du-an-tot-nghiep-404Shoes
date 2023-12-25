import React, {Fragment, useEffect, useState} from 'react';
import { Modal} from 'react-bootstrap';
import { useParams ,useHistory} from 'react-router-dom';
import {toast} from "react-toastify";
import "./style.css";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {Select} from "antd";
import {GioHangService} from "../../service/GioHangService";
import axios from "axios";

function CheckOut({ match, location }) {
    const [SPCT, setSPCT] = useState([]);
    const [listSPCTSelected,setListSPCTSelected] = useState([]);
    const [listDC,setListDC] = useState([]);
    const [listXa,setListXa] = useState([]);
    const [listQuanHuyen,setListQuanHuyen] = useState([]);
    const [listThanhPho,setListThanhPho] = useState([]);
    const [codeTP,setCodeTP] = useState(0);
    const [codeQuan,setCodeQuan] = useState(0);
    const [codeXa,setCodeXa] = useState(0);
    const [KM,setKM]=useState([]);
    const [selectedKM,setSelectedKM]=useState([]);
    const [modalDC,setModalDC]=useState(false);
    const [phiShip,setPhiShip]=useState(0);
    const [ghiChu,setGhiChu]=useState("");
    const [dcSelected,setDcSelected]=useState(0);
    const [sdt,setSDT]=useState("");
    const [ten,setTen]=useState("");
    const [diaChiCuThe,setDiaChiCuThe]=useState("");
    const [xaPhuongThiTran,setXaPhuongThiTran]=useState("");
    const [quanHuyen,setQuanHuyen]=useState("");
    const [tinhThanhPho,setTinhThanhPho]=useState("");

    const { id } = useParams();
    const history = useHistory();
    useEffect  ( () => {
        const fetchData = async () => {
            try {
                const dataDC = await GioHangService.getDCByTaiKhoan(id);
                setListDC(dataDC)
            } catch (error) {
            }
        };
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
        if (location.state) {
            const { listSPCTSelected, SPCT } = location.state;
            setSPCT(SPCT);
            setListSPCTSelected(listSPCTSelected)

        }

        fetchData();
    }, [])
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const suaGhiChu = (e) =>{
        setGhiChu(e.target.value)
        // console.log(listThanhPho)
        // console.log(listQuanHuyen)
        // console.log(listXa)
        console.log(phiShip)
    }
    const check = ()=>{
        console.log(listSPCTSelected)
        console.log(SPCT)
    }
    const tinhTongTienHang = () =>{
        let tongTien = SPCT.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
        const km1= KM.find((km)=>km.id===selectedKM)
        if(km1){
            if(km1.kieuKhuyenMai===1){
                tongTien*=(100-km1.giamGia)/100;
            }else{
                tongTien=tongTien-km1.giamGia;
            }
        }
        return tongTien;
    }

    const reloadKM = async () =>{
        const getKM = await GioHangService.reloadKM(tinhTongTienHang());
        setKM(getKM);
    }

    const changeKM = (value)=>{
        if (value.length > 0) {
            const newlySelectedPromotion = value[value.length - 1];

            if (selectedKM && selectedKM !== newlySelectedPromotion) {
                // Hiển thị thông báo và không cho phép chọn nếu đã có mã khác được chọn trước đó
                toast.error("Chỉ một mã khuyến mãi bạn chọn đầu tiên được áp dụng.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            // Cập nhật state với mã khuyến mãi được chọn
            setSelectedKM(newlySelectedPromotion)
        } else {
            // Nếu không có mã nào được chọn, reset selectedPromotion về null
            setSelectedKM(null)
        }

        // Cập nhật state với các mã khuyến mãi được chọn
        setSelectedKM(value)
    }

    const save = async ()=>{
        const tong = SPCT.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
        const tongTienSauKhiGiam = tinhTongTienHang();
        const hd = {
            gioHang : SPCT,
            km :selectedKM.length!=0?parseInt(selectedKM):0,
            tongTien:tong,
            tongTienSauKhiGiam:tongTienSauKhiGiam+30000,
            tienGiam:tong-tongTienSauKhiGiam,
            tienShip:phiShip,
            taiKhoanId:parseInt(id),
            diaChiId:3,
            thanhToanId:2,
            ghiChu: ghiChu,
            //bắt đầu
            // kieuHoaDon:1,
            // trangThai:0,
            ten:ten,
            sdt:sdt,
            // email:"",
            diaChiCuThe:diaChiCuThe,
            xaPhuongThiTran:xaPhuongThiTran,
            quanHuyen:quanHuyen,
            tinhThanhPho:tinhThanhPho
        }
        console.log(hd)
        if(diaChiCuThe===""){
            alert("Chưa chọn địa chỉ giao , không thanh toán được");
        }else{
            const thongBao = await GioHangService.sold(hd);
            alert(thongBao)
            history.push(`/your-cart/${id}`)
        }
    }

    const moModal = () => {
        setModalDC(true);
    };

    const dongModal = () => {
        setModalDC(false);
    };

    const chonDC = (value) => {
        setDcSelected(value.id);
        setTen(value.ten);
        setSDT(value.sdt);
        setDiaChiCuThe(value.diaChiCuThe);
        setXaPhuongThiTran(value.xaPhuongThiTran);
        setQuanHuyen(value.quanHuyen);
        setTinhThanhPho(value.tinhThanhPho);
        layIdXP(value.tinhThanhPho,value.quanHuyen,value.xaPhuongThiTran)
        dongModal();
    }


    // const apiUrl = 'https://services.giaohangtietkiem.vn/services/shipment/fee';
    const tinhTienShip = async () => {

        let tongTien = SPCT.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
        let tongKL = SPCT.length * 100;
        try {
            const requestBody = {
                "service_type_id": 2,
                "insurance_value": 10000000,
                "coupon": null,
                "from_district_id": 1582,
                "from_ward_code": "1A1319",
                "to_district_id": codeQuan,
                "to_ward_code": `${codeXa}`,
                "height": 15,
                "length": 15,
                "weight": 1000,
                "width": 15
            };

            const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', requestBody, {
                headers: {
                    'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
                },
            });
            setPhiShip(response.data.data.service_fee)
            return response.data.data.service_fee;
        } catch (error) {
            // Xử lý lỗi tại đây
            if (error.response) {
                // Nếu có phản hồi từ server
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // Nếu yêu cầu được gửi đi nhưng không nhận được phản hồi
                console.error('No response received');
            } else {
                // Lỗi trong quá trình thiết lập yêu cầu
                console.error('Error setting up the request:', error.message);
            }
            throw error;
        }
    };

    const layIdXP = async (TP,QH,XP) =>{
        try {
            const responseTp = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
                },
            });
            const provincesData = responseTp.data.data;
            let provinceId ;
            let districtId ;
            let wardCode ;
            for(let i=0;i<provincesData.length;i++){
                for(let j=0;j<provincesData[i].NameExtension.length;j++){
                    if(provincesData[i].NameExtension[j].toLowerCase()===TP.toLowerCase()){
                        setCodeTP(provincesData[i].ProvinceID);
                        provinceId=provincesData[i].ProvinceID;
                    }
                }

            }
            const responseQH = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`, {
                headers: {
                    'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
                },
            });
            const districtData = responseQH.data.data;
            for(let i=0;i<districtData.length;i++){
                for(let j=0;j<districtData[i].NameExtension.length;j++){
                    if(districtData[i].NameExtension[j].toLowerCase()===QH.toLowerCase()){
                        setCodeQuan(districtData[i].DistrictID);
                        districtId=districtData[i].DistrictID;
                    }
                }

            }

            const responseXP = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`, {
                headers: {
                    'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
                },
            });
            const wardData = responseXP.data.data;
            for(let i=0;i<wardData.length;i++){
                for(let j=0;j<wardData[i].NameExtension.length;j++){
                    if(wardData[i].NameExtension[j].toLowerCase()===XP.toLowerCase()){
                        setCodeXa(wardData[i].WardCode);
                        return wardCode=wardData[i].WardCode;
                    }
                }

            }
            return wardCode;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const popupContent = (
        <div className="popup">
            <div className="card-body">
                <div className="tab-pane fade show active" id="home" role="tabpanel"
                     aria-labelledby="home-tab">
                    <table style={{width: '100%',
                        borderCollapse: 'collapse'}}>
                        <thead>
                        <tr className={"tr1"}>
                            <th>Tên</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {listDC.map((dc, index) => (

                            <tr className={"tr1"}>
                                <th >
                                    {dc.ten}
                                </th>
                                <th >{dc.sdt}</th>
                                <th >{dc.diaChiCuThe} , {dc.xaPhuongThiTran} , {dc.quanHuyen} , {dc.tinhThanhPho}</th>
                                <th ><button className={`btn ${dcSelected===dc.id? 'btn-primary' : 'btn-outline-primary'} `} onClick={(e)=>chonDC(dc)}>Chọn</button></th>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>


            </div>
            <br/>
        </div>
    );

    return (
        <Fragment>
            <body>
                <header>
                    <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid justify-content-end">
                            <Link to='/login' style={{textDecoration: 'none'}}><a className="navbar-brand" href="#"
                                                                                  style={{fontSize: '13px'}}> <i
                                className='bx bxs-user'></i> Đăng nhập</a></Link>
                            <Link to='your-cart' style={{textDecoration: 'none'}}><a className="navbar-brand" href="#"
                                                                                     style={{fontSize: '13px'}}> <i
                                className='bx bxs-cart'></i>Giỏ hàng {'(0)'}</a></Link>
                        </div>
                    </nav>

                    <nav className="navbar navbar-expand-lg navbar-light bg-0 py-1" id="navbarhead"
                         style={{backgroundColor: 'rgb(255, 255, 255)'}}>
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-left w-100"
                                 style={{marginRight: '10px'}}>
                                <Link to='/' style={{textDecoration: 'none'}}> <a
                                    className="navbar-brand d-flex align-items-center">
                                    <img style={{width: '90px'}}
                                         src="https://t3.ftcdn.net/jpg/00/71/53/56/360_F_71535683_03OP8nG0N3YRVDTasetbEfT2BpucFmo5.jpg"
                                         alt="site icon"/>
                                    <a className="text-uppercase text-decoration-none brand text-black"
                                       style={{fontWeight: 'bold', fontSize: '26px'}}>404SHOES</a>
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
                                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">SẢN PHẨM</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">BÀI VIẾT</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">LIÊN HỆ</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">TRA CỨU ĐƠN HÀNG</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item px-1 py-1">
                                        <Link to='/product-list' style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em' }}>
                                            <a className="nav-link text-uppercase">VỀ CHÚNG TÔI</a>
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

                <main style={{minHeight: '120vh'}} data-bs-spy="scroll"
                      data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabIndex="0">
                    <div className="content" id="div1">
                        <div className="row container ">
                            <div className="col-12 bg-light pt-3 colored-border" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red"
                                     className="bi bi-geo-alt-fill float-start" viewBox="0 0 16 16" style={{marginLeft:30}}>
                                    <path
                                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                                <h5 style={{color:"red",marginLeft:35}}>Địa chỉ giao hàng {dcSelected===0?(<a style={{marginLeft:50,textDecoration:"none",cursor:"pointer",color:"mediumblue"}} onClick={moModal}>Thay đổi</a>):(<strong></strong>)}</h5>
                                <br/>
                                <p style={{marginLeft:30}}>
                                    {dcSelected===0?(<strong></strong>):(<strong>{ten} ({sdt}) : {diaChiCuThe} , {xaPhuongThiTran} , {quanHuyen} , {tinhThanhPho} </strong>)}

                                    {dcSelected===0?(<strong></strong>):(<a style={{marginLeft:50,textDecoration:"none",cursor:"pointer",color:"mediumblue"}} onClick={moModal}>Thay đổi</a>)}
                                </p>
                                <Modal show={modalDC} onHide={dongModal} backdrop="static" style={{maxWidth: '100%', width: '100%'}} size={"lg"}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Chọn địa chỉ giao</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {popupContent}
                                    </Modal.Body>
                                </Modal>
                            </div>
                            <br/>
                            <br/>
                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <table className="table table-borderless datatable">
                                    <thead>
                                    <tr className="tr1">
                                        <th>Sản phẩm</th>
                                        <th></th>
                                        <th></th>
                                        <th style={{opacity:0.5}}>Đơn giá</th>
                                        <th style={{opacity:0.5}}>Số lượng</th>
                                        <th style={{opacity:0.5,float:"right"}}>Thành tiền</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                        {SPCT.map((spct,index)=>
                                            <tr>
                                                <td><img src={`/img/`+spct.sanPhamChiTietId.anh} style={{ width: '60px', height: '60px' ,margin:10,objectFit: 'cover',objectPosition: 'center'}}/> {spct.sanPhamChiTietId.sanPham.ten}</td>
                                                <td><br/>Màu : {spct.sanPhamChiTietId.mauSac.ten}</td>
                                                <td><br/>Kich Thước : {spct.sanPhamChiTietId.kichThuoc.giaTri}</td>
                                                <td><br/>{formatCurrency(spct.sanPhamChiTietId.donGia)}</td>
                                                <td><br/>{spct.soLuong}</td>
                                                <td style={{textAlign:"right"}}><br/>{formatCurrency(spct.sanPhamChiTietId.donGia*spct.soLuong)}</td>
                                            </tr>
                                        )}
                                    </tbody>


                                </table>

                                <hr className="dashed-hr"/>
                                <div className="row" style={{ height: '50px' }}>
                                    <div className="col-5 d-inline-flex" style={{borderRight:"2px dashed black", height: '100%'}}>
                                        <h7 style={{marginTop:8,marginLeft:35}}>Lời nhắn:   </h7>
                                        <input className="form-control input-group" placeholder={"Lời nhắn cho người bán"} style={{marginLeft:20,width:390,height:40}} onChange={(e)=>suaGhiChu(e)}/>
                                    </div>
                                    <div className="col-7 d-inline">
                                        <h7 style={{marginTop:8,float:"right"}}>Phí ship : {formatCurrency(phiShip)}</h7>
                                        {codeXa===0?(<h7 style={{display: 'none',marginTop:8,float:"right"}}>Phí ship : {formatCurrency(phiShip)}</h7>) : (<h7 style={{display: 'none', marginTop:8,float:"right"}}>Phí ship : {formatCurrency(tinhTienShip())}</h7>)}
                                    </div>

                                </div>
                                <hr className="dashed-hr"/>
                            </div>

                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <div className="col-12 bg-light pt-3" >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-ticket-perforated float-start" viewBox="0 0 16 16" style={{marginLeft:30,color:"red"}}>
                                        <path
                                            d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9H4m7 0v.9h1v-.9h-1m-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z"/>
                                        <path
                                            d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z"/>
                                    </svg>
                                    <h5 style={{marginLeft:40}}>Voucher <a style={{textDecoration:"none",cursor:"pointer",color:"mediumblue",marginLeft:835}} onClick={reloadKM}><Select
                                        style={{ width: 300, maxWidth: '500px' }}
                                        dropdownStyle={{ maxHeight: '300px', overflowY: 'auto', width: '300px' }}
                                        optionLabelProp="option.ma"
                                        onClick={reloadKM}
                                        filterOption
                                        onChange={changeKM}
                                        placeholder="Thêm khuyến mãi"
                                        options={KM.map((option, index) => ({
                                            label: (
                                                <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                                    <div style={{ color: 'red' }}>Cho hóa đơn tối thiểu :<b> {option.dieuKien} VND</b> </div>
                                                    <div >Mã giảm giá: {option.ma} <br /> {'Số lượng còn: '}{option.soLuong}</div>
                                                    <div > Giá trị: <b>{option.giamGia} {option.kieuKhuyenMai === 1 ? "%" : option.kieuKhuyenMai === 0 ? "VND" : ""}</b></div>
                                                    <div className={option.trangThai === 0 ? 'badge bg-warning text-dark' : option.trangThai === 1 ? 'badge bg-success' : 'badge bg-danger'}>{option.trangThai === 0
                                                        ? 'Chưa diễn ra'
                                                        : option.trangThai === 1
                                                            ? 'Đang diễn ra'
                                                            : 'Đã kết thúc'}</div>
                                                </div>

                                            ),
                                            value: option.id,
                                        }))}
                                    /></a></h5>
                                    <h7></h7>
                                    <br/>
                                </div>


                                {/*<div className="row">*/}


                                {/*    <div className="col-12 mt-2">*/}
                                {/*        <a href="#" className="btn btn-warning btn-lg" style={{width: '100%'}}><strong>TIẾP*/}
                                {/*            TỤC THANH*/}
                                {/*            TOÁN</strong></a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="col-12 bg-light pt-3" style={{marginTop:30}}>
                                <div className="col-12 bg-light pt-3" >
                                    <h5 style={{marginLeft:35}}>Phương thức thanh toán <a style={{textDecoration:"none",cursor:"pointer",color:"mediumblue",marginLeft:980}}>Đổi</a></h5>
                                    <hr className="dashed-hr" style={{marginTop:30}}/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tổng tiền hàng : <span style={{float:"right"}}> {formatCurrency(tinhTongTienHang())}</span></h7>
                                    <br/>
                                    <br/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Phí ship : <span style={{float:"right"}}>  {formatCurrency(phiShip)}</span></h7>
                                    <br/>
                                    <br/>
                                    {/*{formatCurrency(selectedKM.length===0?tinhTongTienHang():tongTien)}*/}
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tông thanh toán : <span style={{float:"right",color:"red",fontSize:22}}>{formatCurrency(tinhTongTienHang()+phiShip)}</span></h7>
                                    <br/>
                                    <hr className="dashed-hr"/>
                                    <div className="row">


                                        <div className="col-12 mt-2">
                                            <a className="btn btn-danger btn-lg col-4" style={{width: '23%',float:"right",color:"white"}} onClick={save}>THANH TOÁN</a>
                                        </div>
                                    </div>
                                </div>
                                <br/>

                                {/*<div className="row">*/}


                                {/*    <div className="col-12 mt-2">*/}
                                {/*        <a href="#" className="btn btn-warning btn-lg" style={{width: '100%'}}><strong>TIẾP*/}
                                {/*            TỤC THANH*/}
                                {/*            TOÁN</strong></a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </main>
                <br/>
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
                </body>

        </Fragment>
    )
}


export default CheckOut;