import React, {Fragment, useEffect, useState} from 'react';
import { Modal} from 'react-bootstrap';
import { useParams ,useHistory} from 'react-router-dom';
import {toast} from "react-toastify";
import "./style.css";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import {Select} from "antd";
import {GioHangService} from "../../service/GioHangService";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import {da} from "date-fns/locale";

function CheckOut({ location }) {
    const [SPCT, setSPCT] = useState([]);
    const [listSPCTSelected,setListSPCTSelected] = useState([]);
    const [listDC,setListDC] = useState([]);
    const [listXa,setListXa] = useState([]);
    const [listQuanHuyen,setListQuanHuyen] = useState([]);
    const [listThanhPho,setListThanhPho] = useState([]);
    const [listHD,setListHD] = useState([]);
    const [codeTP,setCodeTP] = useState(0);
    const [codeQuan,setCodeQuan] = useState(0);
    const [codeXa,setCodeXa] = useState(0);
    const [KM,setKM]=useState([]);
    const [selectedKM,setSelectedKM]=useState([]);
    const [modalDC,setModalDC]=useState(false);
    const [tongTien1,setTongTien1]=useState("");
    const [user,setUser]=useState([]);
    const [phiShip,setPhiShip]=useState(0);
    const [PTTT,setPTTT]=useState(2);
    const [PTVT,setPTVT]=useState(2);
    const [ghiChu,setGhiChu]=useState("");
    const [dcSelected,setDcSelected]=useState(0);
    const [sdt,setSDT]=useState("");
    const [ten,setTen]=useState("");
    const [diaChiCuThe,setDiaChiCuThe]=useState("");
    const [xaPhuongThiTran,setXaPhuongThiTran]=useState("");
    const [quanHuyen,setQuanHuyen]=useState("");
    const [tinhThanhPho,setTinhThanhPho]=useState("");
    const [sdtNew,setSDTNew]=useState("");
    const [tenNew,setTenNew]=useState("");
    const [diaChiCuTheNew,setDiaChiCuTheNew]=useState("");
    const [xaPhuongThiTranNew,setXaPhuongThiTranNew]=useState("");
    const [quanHuyenNew,setQuanHuyenNew]=useState("");
    const [tinhThanhPhoNew,setTinhThanhPhoNew]=useState("");
    const [code,setCode]=useState("");

    const { id } = useParams();
    const history = useHistory();
    useEffect  ( () => {
        const fetchData = async () => {
            try {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0];
                // setListHD(response.data);
                setCode(generateCode(10))
                const storedData = localStorage.getItem('currentUser');

                const dataDC = await GioHangService.getDCByTaiKhoan(JSON.parse(storedData).id);
                setListDC(dataDC)
                if(storedData){
                    setUser(JSON.parse(storedData))
                    if(dataDC.length===0){

                    }else {
                        setTen(dataDC[0].ten)
                        setSDT(dataDC[0].sdt)
                        setDiaChiCuThe(dataDC[0].diaChiCuThe)
                        setXaPhuongThiTran(dataDC[0].xaPhuongThiTran)
                        setQuanHuyen(dataDC[0].quanHuyen)
                        setTinhThanhPho(dataDC[0].tinhThanhPho)
                        layIdXP(dataDC[0].tinhThanhPho,dataDC[0].quanHuyen,dataDC[0].xaPhuongThiTran)
                    }
                }
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
        loadTP();
    }, [PTTT])
    function generateCode(length) {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomString += charset.charAt(randomIndex);
        }

        return randomString;
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const changeTen = (event) =>{
        setTen(event.target.value)
        setTenNew(event.target.value)
    }
    const changeSDT = (event) =>{
        setSDT(event.target.value)
        setSDTNew(event.target.value)
    }
    const changeDiaChiCuThe = (event) =>{
        setDiaChiCuThe(event.target.value)
        setDiaChiCuTheNew(event.target.value)
    }
    const chonTP = (event) =>{
        const tp = parseInt(event.target.value)
        setCodeTP(tp)
        listThanhPho.map(value => {
            if(value.ProvinceID===tp){
                setTinhThanhPhoNew(value.ProvinceName)
                setTinhThanhPho(value.ProvinceName)
            }
        })
        setCodeQuan(0)
        setCodeXa(0)
        setPhiShip(0)
        loadQH(tp)
    }
    const chonQH = (event) =>{
        const qh = parseInt(event.target.value)
        setCodeQuan(qh)
        listQuanHuyen.map(value => {
            if(value.DistrictID===qh){
                setQuanHuyenNew(value.DistrictName)
                setQuanHuyen(value.DistrictName)
            }
        })
        setCodeXa(0)
        setPhiShip(0)
        loadXP(qh)
    }
    const chonXP = (event) =>{
        const xp = String(event.target.value)
        setCodeXa(xp)
        listXa.map(value => {
            if(value.WardCode===xp){
                setXaPhuongThiTranNew(value.WardName)
                setXaPhuongThiTran(value.WardName)
            }
        })
    }
    const loadTP = async () =>{
        const responseTp = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
            },
        });
        const provincesData = responseTp.data.data;
        setListThanhPho(provincesData)
    }
    const loadQH = async (tp) =>{
        const responseQH = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${tp}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
            },
        });
        const districtData = responseQH.data.data;
        setListQuanHuyen(districtData)

    }
    const loadXP = async (qh) =>{
        const responseXP = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${qh}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e', // Thay YOUR_API_KEY bằng API key thực tế của bạn
            },
        });
        const wardData = responseXP.data.data;
        setListXa(wardData)
    }
    const suaGhiChu = async (e) =>{
        setGhiChu(e.target.value)
    }
    const check = ()=>{
        console.log(listSPCTSelected)
        console.log(SPCT)
    }
    const PTTTCod = ()=>{
        setPTTT(2);
    }
    const PTTTVNPay = async () => {
        setPTTT(3);
    }
    const PTTTVietQR = ()=>{
        setPTTT(1);
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
    const tinhTongTien = () =>{
        let tongTien = SPCT.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
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

    const urlParams = new URLSearchParams(window.location.search);
    const transactionStatus = urlParams.get('vnp_TransactionStatus');
    const responseCode = urlParams.get('vnp_ResponseCode');

    const save = async () => {
        let confirm;

        confirm = window.confirm("Bạn xác nhận muốn đặt hóa đơn này ?");
        if (!confirm) {
            return;
        }

        if (confirm && PTTT === 3) {


            const tong = SPCT.reduce((total, spct) => {
                return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
            }, 0);
            const tongTienSauKhiGiam = tinhTongTienHang();
            const hd = {
                gioHang: SPCT,
                km: selectedKM.length != 0 ? parseInt(selectedKM) : 0,
                tongTien: tong,
                tongTienSauKhiGiam: tongTienSauKhiGiam,
                tienGiam: tong - tongTienSauKhiGiam,
                tienShip: phiShip,
                taiKhoanId: user.length != 0 ? parseInt(user.id) : 0,
                diaChiId: 3,
                thanhToanId: PTTT,
                ghiChu: `"Đã thanh toán VNPay"`,
                ghiChuChoXacNhan: `"Đã thanh toán VNPay"`,
                //bắt đầu
                // kieuHoaDon:1,
                trangThai:0,
                ten: ten,
                sdt: sdt,
                // email:"",
                diaChiCuThe: diaChiCuThe,
                xaPhuongThiTran: xaPhuongThiTran,
                quanHuyen: quanHuyen,
                tinhThanhPho: tinhThanhPho
            }
            console.log(hd)
            if(phiShip===0){
                alert("Chưa chọn địa chỉ giao , không thể đặt hàng !!!");
                return;
            }
            if(ten.length===0){
                alert("Chưa nhập họ tên ! ");
                return;
            }
            if(sdt.length < 10){
                alert("SĐT nhập sai (SĐT có 10 số) ! ");
                return;
            }
            if(sdt.length > 10){
                alert("SĐT nhập sai ( SĐT có 10 số) ! ");
                return;
            }
            if(!/^\d+$/.test(sdt)){
                alert("SĐT có chữ ! ");
                return;
            }
            if(diaChiCuThe.length===0){
                alert("Chưa nhập địa chỉ nhận cụ thể ! ");
                return;
            }else{
                localStorage.setItem('hoanDonData', JSON.stringify(hd));
                let tongTien = tinhTongTienHang();
                const linkTT = await GioHangService.pay(tongTien);
                // const done = GioHangService.done();
                const newTab = window.location.href = linkTT;
                if (newTab) {
                    // newTab.focus(); // Đảm bảo tab mới được mở và đưa ra trước mặt
                    let tabOpened = false;
                    tabOpened = true; // Đặt tabOpened thành true để tránh việc thực hiện lại
                    // const thongBao = GioHangService.sold(hd);

                    // alert(thongBao)
                }

                if (user.length != 0) {

                } else {
                    localStorage.removeItem('listSPCT')
                }
                // history.push(`/thanhcong`)
            }

        }

        if (confirm && PTTT === 2) {
            const tong = SPCT.reduce((total, spct) => {
                return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
            }, 0);
            const tongTienSauKhiGiam = tinhTongTienHang();
            const hd = {
                gioHang: SPCT,
                km: selectedKM.length != 0 ? parseInt(selectedKM) : 0,
                tongTien: tong,
                tongTienSauKhiGiam: tongTienSauKhiGiam,
                tienGiam: tong - tongTienSauKhiGiam,
                tienShip: phiShip,
                taiKhoanId: user.length != 0 ? parseInt(user.id) : 0,
                diaChiId: 3,
                thanhToanId: PTTT,
                ghiChu: ghiChu,
                ghiChuChoXacNhan: `"Thanh toán khi nhận hàng"`,
                //bắt đầu
                // kieuHoaDon:1,
                trangThai:0,
                ten: ten,
                sdt: sdt,
                // email:"",
                diaChiCuThe: diaChiCuThe,
                xaPhuongThiTran: xaPhuongThiTran,
                quanHuyen: quanHuyen,
                tinhThanhPho: tinhThanhPho
            }
            console.log(hd)
            if(phiShip===0){
                alert("Chưa chọn địa chỉ giao , không thể đặt hàng !!!");
                return;
            }
            if(ten.length===0){
                alert("Chưa nhập họ tên ! ");
                return;
            }
            if(sdt.length < 10){
                alert("SĐT nhập sai (SĐT có 10 số) ! ");
                return;
            }
            if(sdt.length > 10){
                alert("SĐT nhập sai ( SĐT có 10 số) ! ");
                return;
            }
            if(!/^\d+$/.test(sdt)){
                alert("SĐT có chữ ! ");
                return;
            }
            if(diaChiCuThe.length===0){
                alert("Chưa nhập địa chỉ nhận cụ thể ! ");
                return;
            } else {
                const thongBao = await GioHangService.sold(hd);
                alert(thongBao)
                if (user.length != 0) {

                } else {
                    localStorage.removeItem('listSPCT')
                }
                history.push(`/thanhcong`)
            }
        }

        if (confirm && PTTT === 1) {
            const tong = SPCT.reduce((total, spct) => {
                return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
            }, 0);
            const tongTienSauKhiGiam = tinhTongTienHang();
            const hd = {
                gioHang: SPCT,
                km: selectedKM.length != 0 ? parseInt(selectedKM) : 0,
                tongTien: tong,
                tongTienSauKhiGiam: tongTienSauKhiGiam,
                tienGiam: tong - tongTienSauKhiGiam,
                tienShip: phiShip,
                taiKhoanId: user.length != 0 ? parseInt(user.id) : 0,
                diaChiId: 3,
                thanhToanId: PTTT,
                ghiChu: ghiChu,
                ghiChuChoXacNhan: `"Thanh toán VietQR với Số điện thoại ${sdt}"`,
                //bắt đầu
                // kieuHoaDon:1,
                trangThai:0,
                ten: ten,
                sdt: sdt,
                // email:"",
                diaChiCuThe: diaChiCuThe,
                xaPhuongThiTran: xaPhuongThiTran,
                quanHuyen: quanHuyen,
                tinhThanhPho: tinhThanhPho
            }
            console.log(hd)
            if(phiShip===0){
                alert("Chưa chọn địa chỉ giao , không thể đặt hàng !!!");
                return;
            }
            if(ten.length===0){
                alert("Chưa nhập họ tên ! ");
                return;
            }
            if(sdt.length < 10){
                alert("SĐT nhập sai (SĐT có 10 số) ! ");
                return;
            }
            if(sdt.length > 10){
                alert("SĐT nhập sai ( SĐT có 10 số) ! ");
                return;
            }
            if(!/^\d+$/.test(sdt)){
                alert("SĐT có chữ ! ");
                return;
            }
            if(diaChiCuThe.length===0){
                alert("Chưa nhập địa chỉ nhận cụ thể ! ");
                return;
            } else {
                const thongBao = await GioHangService.sold(hd);
                alert(thongBao)
                if (user.length != 0) {

                } else {
                    localStorage.removeItem('listSPCT')
                }
                history.push(`/thanhcong`)
            }
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
                "insurance_value": tongTien,
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
            {user.length!=0?(<div className="card-body">
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
                    <br/>
                    <hr/>
            </div>
            ) : (<div></div>)}

            <h4>Thêm mới</h4>
            <div style={{float:"left",width:"48%",marginLeft:10,marginTop:10}}>
                Họ và tên <a style={{color:"red"}}>*</a> :
                <input className={`form-control`} type="text" onChange={changeTen} value={tenNew}/>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
            <div style={{float:"left",width:"48%",marginLeft:20,marginTop:10}}>
                Số điện thoại <a style={{color:"red"}}>*</a> :
                <input className={`form-control`} type="text" onChange={changeSDT} value={sdtNew}/>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>

            <div style={{float:"left",width:"32%",marginLeft:10,marginTop:20}}>
                Thành phố <a style={{color:"red"}}>*</a> :
                {/*<input className={`form-control`} type="text"/>*/}
                <select className={`form-control`} onChange={chonTP} value={codeTP}>
                    <option value="">Chọn thành phố</option>
                    {listThanhPho.map(tp=>(
                        <option value={tp.ProvinceID}>{tp.ProvinceName}</option>
                    ))}
                </select>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
            <div style={{float:"left",width:"32%",marginLeft:10,marginTop:20}}>
                Quận huyện <a style={{color:"red"}}>*</a> :
                <select className={`form-control`} onChange={chonQH} value={codeQuan}>
                    <option value="">Chọn quận huyện</option>
                    {listQuanHuyen.map(tp=>(
                        <option value={tp.DistrictID}>{tp.DistrictName}</option>
                    ))}
                </select>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
            <div style={{float:"left",width:"32%",marginLeft:10,marginTop:20}}>
                Xã phường <a style={{color:"red"}}>*</a> :
                <select className={`form-control`} onChange={chonXP} value={codeXa}>
                    <option value="">Chọn xã phường</option>
                    {listXa.map(tp=>(
                        <option value={tp.WardCode}>{tp.WardName}</option>
                    ))}
                </select>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
            <br/>
            <br/>
            <div style={{float:"left",width:"100%",marginLeft:10,marginTop:30}}>
                Địa chỉ cụ thể <a style={{color:"red"}}>*</a> :
                <TextArea className={`form-control`} onChange={changeDiaChiCuThe} value={diaChiCuTheNew}/>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
            <div style={{float:"right",width:"20%",marginLeft:10,marginTop:20}}>
                <input className={`form-control btn btn-primary`} onClick={dongModal} type={"submit"}/>
                {/*{this.state.error.ten && <div className="text-danger">{this.state.error.ten}</div>}*/}
            </div>
        </div>
    );

    return (
        <Fragment>
            <body>
                {/*<header>*/}
                {/*</header>*/}

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

                                    {codeXa===0?(<strong></strong>):(<strong>{ten} ({sdt}) : {diaChiCuThe} , {xaPhuongThiTran} , {quanHuyen} , {tinhThanhPho} </strong>)}

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
                                    <h5 style={{marginLeft:35}}>Phương thức thanh toán
                                        <a href="#" className={`btn btn-sm btn-outline-dark size-item ${PTTT===2 ? 'selected' : ''}`} style={user!=0?{marginLeft:450}:{marginLeft:640}}  onClick={PTTTCod} >
                                            <div>Thanh toán khi nhận hàng</div>
                                        </a>
                                        {user!=0?(<a href="#" className={`btn btn-sm btn-outline-dark size-item ${PTTT===3 ? 'selected' : ''}`} style={{marginLeft:20}} onClick={PTTTVNPay}>
                                            <div>Thanh toán bằng VNPay</div>
                                        </a>):(<a></a>)}

                                        <a href="#" className={`btn btn-sm btn-outline-dark size-item ${PTTT===1 ? 'selected' : ''}`} style={{marginLeft:20}} onClick={PTTTVietQR}>
                                            <div>Thanh toán bằng VietQR</div>
                                        </a>
                                        {phiShip===0?(<p style={{color:"red",textAlign:"right"}} hidden={PTTT!=1}>Chưa nhập địa chỉ giao , chưa thể quét VietQR</p>):(<img style={{maxWidth:300,marginLeft:930,marginTop:20}} src={`https://api.vietqr.io/image/970422-0362460679-vE5Br8f.jpg?accountName=BUI%20XUAN%20THIEU&amount=${tinhTongTienHang()+phiShip}&addInfo=TRA%20TIEN%20HOA%20DON`} hidden={PTTT!=1}/>)}
                                    </h5>
                                    {/*<a style={{textDecoration:"none",cursor:"pointer",color:"mediumblue",marginLeft:980}}>Đổi</a>*/}
                                    <hr className="dashed-hr" style={{marginTop:30}}/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tổng tiền : <span style={{float:"right"}}> {formatCurrency(tinhTongTien())}</span></h7>
                                    <br/>
                                    <br/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tiền giảm : <span style={{float:"right"}}> - {formatCurrency(tinhTongTien()-tinhTongTienHang())}</span></h7>
                                    <br/>
                                    <br/>
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Phí ship : <span style={{float:"right"}}> + {formatCurrency(phiShip)}</span></h7>
                                    <br/>
                                    <br/>
                                    {/*{formatCurrency(selectedKM.length===0?tinhTongTienHang():tongTien)}*/}
                                    <h7 style={{marginTop:8,marginLeft:980,textAlign: 'right'}}>Tông thanh toán : <span style={{float:"right",color:"red",fontSize:22}}>{formatCurrency(tinhTongTienHang()+phiShip)}</span></h7>
                                    <br/>
                                    <hr className="dashed-hr"/>
                                    <div className="row">


                                        <div className="col-12 mt-2">
                                            <a className="btn btn-danger btn-lg col-4"
                                               style={{width: '23%', float: "right", color: "white"}} onClick={save}>THANH
                                                TOÁN</a>
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
                {/*<footer>*/}
                {/*</footer>*/}
                </body>
        </Fragment>
    )
}


export default CheckOut;