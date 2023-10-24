import React, { Component } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';
import HoaDonService from '../../services/hoadonservice/HoaDonService';

class HoaDonChiTietComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDonChiTiet: [],
            hoaDonId: {
                id: this.props.match.params.id
            },
            hoaDon: {
                id: this.props.match.params.id,
                thanhToan: '',
                taiKhoan: ''
            }

        }
        // this.detail = this.detail.bind(this);
    }
    componentDidMount() {
        HoaDonChiTietService.detailHDCT(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDonChiTiet: res.data })
        });
        HoaDonService.getOneHD(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDon: res.data })
        });
    }

    render() {
        let total = 0;
        return (
            <div>
                <div className="pagetitle">
                    <h1>Hóa đơn</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Hóa đơn</li>
                        </ol>
                    </nav>
                </div>


                <section className="section dashboard">
                    <div className="row">

                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card recent-sales overflow-auto">


                                        <div className="card-body">
                                            <h5 className="card-title">Thông tin sản phẩm<span>| </span></h5>

                                            <div>
        <table className="table table-borderless datatable">
          <thead>
            <tr>
              <th>STT</th>
              <th>Số Lượng</th>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {this.state.hoaDonChiTiet.map((hoaDonChiTiet, index) => {
              total += hoaDonChiTiet.sanPhamChiTiet.sanPham.giaBan * hoaDonChiTiet.soLuong; // Cộng dồn tổng

              return (
                <tr key={hoaDonChiTiet.id}>
                  <td>{index + 1}</td> {/* STT */}
                  <td>{hoaDonChiTiet.soLuong}</td>
                  <td>
                  <img
                    // src={hoaDonChiTiet.sanPhamChiTiet.sanPham.imageURL}
                    // alt={hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                  <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}</td>
                  <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.giaBan}</td>
                  <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.giaBan * hoaDonChiTiet.soLuong}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <label>Tổng: {total}</label> {/* Hiển thị tổng */}
      </div>

                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>




                        <div className="col-lg-4">


                            <div className="card">

                                <div className="card-body">
                                    <h5 className="card-title">Thông tin <span>| xx</span></h5>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                aria-selected="true">Người tạo

                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                aria-selected="false">Khách hàng
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                                data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                                aria-selected="false">Detail
                                            </button>
                                        </li>
                                    </ul>


                                    <div className="tab-content pt-2" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel"
                                            aria-labelledby="home-tab">
                                            <div className='container'>
                                                <h10 className="nav-link"  >
                                                    Người bán : {this.state.hoaDon?.taiKhoan?.thongTinNguoiDung?.ten}
                                                </h10>

                                                <h10 className="nav-link"  >
                                                    Ngày bán : {this.state.hoaDon?.taiKhoan?.ngayTao}</h10>

                                                    <h10 className="nav-link"  >
                                                    Ghi chú : {this.state.hoaDon?.ghiChu}</h10>

                                                {<div className="text-danger"></div>}
                                                <button type="button" class="btn btn-outline-primary">Thông tin chi tiết</button>
                                            </div>


                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div>
                                                    Tên :

                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                    // value={this.state.xuatXuUpdate.trangThai}

                                                    >
                                                        <option value='0'>Còn</option>
                                                        <option value="1">Ko còn</option>
                                                    </select>

                                                </div>

                                            </form>
                                        </div>


                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                            <form className="row g-3" method="get">
                                                <div className="form-group">
                                                    {/* ID : ${mau.id} */}
                                                </div>
                                                <div className="form-group">
                                                    {/* Name : ${mau.name} */}
                                                </div>

                                            </form>
                                        </div>
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

export default HoaDonChiTietComponents;