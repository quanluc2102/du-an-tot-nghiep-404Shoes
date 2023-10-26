import React, { Component } from 'react';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import "../hoadoncomponents/HoadonCss.css"

class HoaDonComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDon: []
        }
        // this.detail = this.detail.bind(this);
    }
    componentDidMount() {
        HoaDonService.getHoaDon().then((res) => {
            this.setState({ hoaDon: res.data })
        });
    }
    detail(id) {
        window.location.href = (`/HoaDonChiTiet/${id}`);
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
                                                        <th>Tên Khách Hàng</th>
                                                        <th>Ngày Tạo</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Thạng thái</th>
                                                        <th>Ghi chú</th>
                                                        <th>Khách Phải Trả</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.hoaDon.map(
                                                            hoaDon =>
                                                                <tr key={hoaDon.id}>
                                                                    <td>{hoaDon.id}</td>
                                                                    <td>{hoaDon.ten}</td>
                                                                    <td>{hoaDon.ngayTao}</td>
                                                                    <td>{hoaDon.ngayCapNhat}</td>
                                                                    <td style={{ color: hoaDon.trangThai === 1 ? 'green' : 'red' }}>
                                                                        {hoaDon.trangThai === 1 ? "Đã thanh toán" : "Chưa thanh toán"}
                                                                    </td>
                                                                    <td>{hoaDon.ghiChu}</td>
                                                                    <td>{hoaDon.tongTienSauGiam}</td>
                                                                    <td><a  onClick={() => this.detail(hoaDon.id)}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAi1JREFUSEvF10vITVEUwPHflzL0yjvJQBETGRBFpIgJMTEzUEQGyiMywEQpFMUAmRuIGUqEZMDAK0mEMpBXiBGhpX20ne+e795zz823Jve271r7v9djr7Vvn0GSvkHiagceiVmYidEdHvI9HuEePlXZVIEn4hjWdAirUjuLLYjD/COtwDNwBRMaQgvzF1iC+PwrZfBk3MWYpHEOJ3C15iECFJ6uSnYBnZN7XgZfwMqkvB2HawLL6nuxLy2exMZCIQeHt6/SD5GbtQ2hhfklLMN3RLF+ix9y8HqcTtpRyfdrgofjcwubpbic1lfgYhm8GweSwhD8rAGOQryV6uFQyW4UPqS1rThaBkcuIifl9Xb8oXiAaUlxT+ZAYfsrfdlf5DwPdTfgIrybcTxt/hrTi1ymtZ6CY/Mb2IUz2ITwaG75zqJn4IBex9jk0QacwoiKNtkTcOQyoOOy5Edvnp2uTKuaaAyeipsYn+3+BAvxboAqbASegttdQOM8XYMDGp5Oyrx6hvltPG10nSKsd1pAF+BNu0ve5DotwrUM8BLzakC7DnUODmh4Gk2iUxmW9fBtONJpy4y7GUMj5DHedkpMeouzeb4a5zsF1+T0U4/JFBPqRxqLX/8H+CB2pqNEZ4sO90eaDomqaMQrJl4by5PC89TDi/FYCW4a3tz+aQp18brp53FMl3jY9VJiau3Ax/Kmeahjtq5DvBiaSFT9w/R0+lK1Ubt/Ek0OMKDtoIF/AxLsgR+5iHZvAAAAAElFTkSuQmCC"/></a></td>


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





                    </div>

                </section>
            </div>
        );
    }
}

export default HoaDonComponents;