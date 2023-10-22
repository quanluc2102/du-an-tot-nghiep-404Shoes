import React, { Component } from 'react';
import HoaDonChiTietService from '../../services/hoadonchitietservice/HoaDonChiTietService';

class HoaDonChiTietComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDonChiTiet: [],
            hoaDonId: {
                id: this.props.match.params.id
            },
         
        }
        // this.detail = this.detail.bind(this);
    }
    componentDidMount() {
        HoaDonChiTietService.detailHDCT(this.state.hoaDonId.id).then((res) => {
            this.setState({ hoaDonChiTiet: res.data })
        });
        // HoaDonChiTietService.getOneHDCT(this.state.hoaDonId.id).then((res) => {
        //     this.setState({ hoaDonChiTiet: res.data })
        // });
    }

    render() {
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
                                            <h5 className="card-title">Hóa đơn <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Số Lượng</th>
                                                        <th>Id Hóa đơn</th>
                                                        <th>Id sản phẩm CT</th>
                                                        <th>Giá bán</th>
                                                        <th>Ghi chú</th>
                                                        <th>Tổng tiền</th>
                                                        <th>Người tạo hóa đơn</th>
                                                        <th>Khách hàng</th>
                                                        <th>Ngày tạo hóa đơn</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.hoaDonChiTiet.map(
                                                            hoaDonChiTiet =>
                                                                <tr key={hoaDonChiTiet.id}>
                                                                    <td>{hoaDonChiTiet.id}</td>
                                                                    <td>{hoaDonChiTiet.soLuong}</td>
                                                                    <td>{hoaDonChiTiet.hd.id}</td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.ten}</td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.giamGia}</td>
                                                                    <td>{hoaDonChiTiet.ghiChu}</td>
                                                                    <td>{hoaDonChiTiet.sanPhamChiTiet.sanPham.giamGia * hoaDonChiTiet.soLuong}</td>
                                                                    <td>{hoaDonChiTiet.hd.taiKhoan.id}</td>
                                                                    <td>{hoaDonChiTiet.hd.ten}</td>
                                                                    <td>{hoaDonChiTiet.hd.ngayTao}</td>

                                                                </tr>
                                                        )
                                                    }
                                                </tbody>


                                            </table>

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

                                            <div>
                                                Tên :

                                            </div>
                                            <div className='form-group'>
                                                <label>Trạng thái</label>

                                            </div>

                                            <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />

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
                                                <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
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