import React, {Fragment, useEffect, useState} from 'react'
import { useParams ,useHistory} from 'react-router-dom';
import {toast} from "react-toastify";
import './style.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import {GioHangService} from "../../service/GioHangService";

function Cart() {
    const [SPCT, setSPCT] = useState([]);
    const [listSPCTSelected,setListSPCTSelected] = useState([]);
    const [user,setUser]=useState([]);
    const [tongTien,setTongTien] = useState(0);
    const history = useHistory();
    const fetchData = async () => {
            const storedDataUser = localStorage.getItem('currentUser');
            const dataUser = storedDataUser ? JSON.parse(storedDataUser) : [];
            let data ;
            if(storedDataUser){
                data = await GioHangService.getGHOne(JSON.parse(storedDataUser).id);
                // setSPCT(dataGioHang);
            }else {
                data = JSON.parse(localStorage.getItem('listSPCT'));
                // setSPCT(JSON.parse(dataGioHangGuest));
            }
            setSPCT(data);
            setUser(dataUser)

    };
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
        fetchData();
    }, [SPCT])
    const fetchDataLocal = () =>{
        const storedDataUser = localStorage.getItem('currentUser');
        if(storedDataUser){
            setUser(JSON.parse(storedDataUser))
        }else{
            const storedDataUser = localStorage.getItem('currentUser');
        }
    }
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const goToListSP = () => {
        history.push(`/product-list`)
    };
    const thayDoiSoLuong = (id, soLuongMoi) =>{
        const updatedProducts = SPCT.map(product => {
            if (product.id === id) {
                // Nếu là sản phẩm cần thay đổi, cập nhật số lượng mới
                return { ...product, soLuong: soLuongMoi };
            }
            return product;
        });
        setSPCT(updatedProducts);
        if(user.length!=0){
            GioHangService.updateGHCT(id,soLuongMoi);
        }else {
            localStorage.setItem("listSPCT", JSON.stringify(updatedProducts));
        }

        console.log(SPCT)
    }

    const xoaDon = async (id,index)=>{
        if(user.length!=0){
            const res = await GioHangService.deleteOne(id);
            // window.location.reload()
        }else {
            console.log("aaaaaaaaaa")
            const updatedList = [...SPCT];

            // Xóa phần tử tại index cụ thể
            updatedList.splice(index, 1);

            // Cập nhật state với mảng mới (đã xóa phần tử)
            setSPCT(updatedList);
            localStorage.setItem("listSPCT", JSON.stringify(updatedList));
        }


    }

    const xoaNhieu = ()=>{
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa những sản phẩm này khỏi giỏ hàng ?");
        if(!confirm){
            return;
        }
        listSPCTSelected.map(value => {
            GioHangService.deleteOne(value.id).then((res) => {
                if (res.status === 200) {
                    toast.success("Xóa thành công"); // Display success message
                } else {
                    const errorMessage = "Có lỗi xảy ra khi xóa.";
                    toast.error("Lỗi: " + errorMessage);
                }
            })
                .catch((error) => {
                    console.error("Error deleting item:", error);
                });
        })
        setListSPCTSelected([])
        setTongTien(0)
    }

    const tinhTongTien = () =>{
        const tongTien = SPCT.reduce((total, spct) => {
            return total + spct.sanPhamChiTietId.donGia * spct.soLuong;
        }, 0);
        return tongTien;
    }

    const chonSPCT = (spct)=>{
        const isSelected = listSPCTSelected.some((selected) => selected.id === spct.id);

        // Nếu đã chọn, loại bỏ spct khỏi danh sách
        // Nếu chưa chọn, thêm spct vào danh sách
        if (isSelected) {
            setListSPCTSelected(listSPCTSelected.filter((selected) => selected.id !== spct.id));
        } else {
            setListSPCTSelected([...listSPCTSelected, spct]);
        }
    }
    return (
        <Fragment>
            {SPCT && (<body>

            {/*<header>*/}
            {/*</header>*/}

            <main style={{minHeight: '120vh'}} data-bs-spy="scroll"
                  data-bs-target="#nav-example" data-bs-smooth-scroll="true" tabIndex="0">
                <div className="content" id="div1">
                    <div className="row container">
                        <div className="col-8 content-left bg-white pt-3">
                            <h1 style={{display: 'flex'}}><strong>GIỎ HÀNG</strong></h1>
                            <hr/>
                            {SPCT.length===0?(
                                    <div>
                                        <img src={"/img/GioHangTrong.png"} width="500px"
                                             height="auto"
                                        style={{marginLeft:150}}/>
                                        <hr className="dashed-hr"/>
                                    </div>


                            ):(
                                <div>{SPCT.map((spct, index) => (
                                    <div className="the-san-pham my-3 position-relative" key={spct.id}>
                                        <div className="row">

                                            <div className="col-1" style={{}}>
                                                {/*<input type="checkbox" className="btn-check" id={spct.id}*/}
                                                {/*       autoComplete="off" onChange={(e)=>chonSPCT(spct)}/>*/}
                                                {/*<label className="btn btn-outline-primary" htmlFor={spct.id}>✔</label>*/}
                                                <button className="btn btn-outline-danger" style={{width:40,marginTop:10}} onClick={()=>xoaDon(spct.id,index)}>X</button>
                                            </div>

                                            <div className="col-4">
                                                <img
                                                    src={'/img/'+spct.sanPhamChiTietId.anh}
                                                    width="200px"
                                                    height="200px" alt="ảnh sản phẩm"/>
                                            </div>
                                            <div className="col-7">
                                                <div className="row mb-6">
                                                    <h4 style={{display: 'flex'}}>
                                                        <strong>{spct.sanPhamChiTietId.sanPham.ten}</strong>
                                                    </h4>
                                                    <div style={{display: 'flex'}} className="col-6">
                                                        <span style={{color:"red"}}><strong style={{color:"black"}}>Giá : </strong> {formatCurrency(spct.sanPhamChiTietId.donGia)} </span></div>
                                                    <div style={{display: 'flex'}} className="col-6">
                                                        </div>
                                                    <div style={{display: 'flex'}} className="col-6">
                                                        <span><strong>Size</strong> : {spct.sanPhamChiTietId.kichThuoc.giaTri}</span></div>
                                                    <div style={{display: 'flex'}} className="col-6">
                                                        <span><strong>Màu</strong> : {spct.sanPhamChiTietId.mauSac.ten}</span></div>
                                                </div>

                                                <br/>
                                                <div className="row ">
                                                    <div className="col-4">
                                                        <div className="form-floating mb-3 border-1">
                                                            <input type="number" className="form-control" min="1"
                                                                   name="formId1" id="formId1"
                                                                   value={spct.soLuong}
                                                                   onChange={(e) => thayDoiSoLuong(spct.id,parseInt(e.target.value, 10))}
                                                                   placeholder="Số Lượng"/>
                                                            <label htmlFor="formId1" className="font-monospace"><strong>Số
                                                                Lượng :</strong></label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                    <hr className="dashed-hr"/></div>
                                )}
                            {/*<button className="btn btn-danger" style={{marginLeft: '0em', width: '25%'}} onClick={()=>xoaNhieu()}>Xóa ({listSPCTSelected.length})</button>*/}
                            <button className="btn btn-primary" style={{marginLeft: '5px', width: '25%'}} onClick={goToListSP}>Tiếp tục mua
                                hàng
                            </button>

                        </div>


                        <div className="col-4 content-right bg-light pt-3">
                            <h1><strong>SẢN PHẨM</strong></h1>
                            <hr/>
                            {SPCT.map((spct, index) => (
                                <div className="row mb-4 border py-2">
                                    <div className="col-8">
                                        <h5><strong>{spct.sanPhamChiTietId.sanPham.ten} + {spct.sanPhamChiTietId.mauSac.ten}</strong></h5>
                                        <span>Size: {spct.sanPhamChiTietId.kichThuoc.giaTri}</span>
                                        <span className="float-end">Số lượng: {spct.soLuong}</span>
                                    </div>
                                    <div className="col-4 ">
                                        <p></p>
                                        <h6 className="float-end" style={{color:"red"}}>{formatCurrency(spct.sanPhamChiTietId.donGia)}</h6>
                                    </div>

                                </div>
                            ))}

                            <hr className="dashed-hr"/>
                            <div className="row">
                                <div className="col-5"><br/>
                                    <h5><strong style={{color: 'orangered'}}>TỔNG CỘNG: </strong></h5>
                                </div>
                                <div className="col-7 "><br/>
                                    <h5><strong className="float-end" style={{color: 'orangered'}}>{formatCurrency(tinhTongTien())}</strong>
                                    </h5>
                                </div>

                            </div>
                            <hr className="dashed-hr"/>
                            <span>
                                    Hoàn trả 100% nếu sản phẩm bị lỗi hoặc bị hỏng trong quá trình vận chuyển 🤩
                                </span>
                            <hr className="dashed-hr"/>


                            <div className="row">


                                <div className={`col-12 mt-2 ${listSPCTSelected.length === 0 ? 'disabled' : ''}`}>
                                    <Link to={{
                                        pathname: SPCT.length===0 ? `/your-cart` : `/check-out`,
                                        state: { listSPCTSelected, SPCT },
                                    }}
                                       className={`btn btn-warning btn-lg`}
                                       style={{width: '100%'}}
                                       disabled={SPCT.length === 0 ? true : false}><strong>TIẾP
                                        TỤC THANH
                                        TOÁN</strong></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <br/>
            <br/>
            {/*<footer>*/}
            {/*</footer>*/}
            </body>
            )}

        </Fragment>
    )
}


export default Cart;