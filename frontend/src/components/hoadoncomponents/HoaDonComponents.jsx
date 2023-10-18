import React, { Component } from 'react';
import HoaDonService from '../../services/hoadonservice/HoaDonService';
import "../hoadoncomponents/HoadonCss.css"

class HoaDonComponents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hoaDon: []
        }
    }
    componentDidMount() {
        HoaDonService.getHoaDon().then((res) => {
            this.setState({ hoaDon: res.data })
        });
    }

    render() {
        return (

            <div>
                <div className="pagetitle">
                    <h1>Tài khoản</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Tài khoản</li>
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
                                            <h5 className="card-title">Tài khoản <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Tên Khách Hàng</th>
                                                        <th>Ngày Tạo</th>
                                                        <th>Ngày cập nhật</th>
                                                        <th>Thạng thái</th>
                                                        <th>Action</th>
                                                        <th>Khách Phải Trả</th>
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
                                                                    <td><button type="button" class="btn btn-outline-info"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABCFJREFUSEvFl3uIFXUUx79n5jezM7u4La3QQ4grmNoL9p+FTe+d22IgRVgGSRJGf0SRUAkWFBHWYiYVkvWHPf6IQiIF8w8pi4TbvXcjcY3CEossjWp7LilxZ+bO/O6cmMeFO3sfO5sLzp+/Oed8zvmdx5whXKSHLhIX8wPvZ9W8XI4xU47AV8RO0zSYzzh/imPYQI2sgWQC95Xdq1USTzJ4PYChLsZnGHQQJJ93C8aPcznQG3yc+027sRPgzQDUuYwl7z1ivGgvFhO4jrxuOl3BRsnJQYhDxLi+aRDgA0zKR6oSnKh52ukhQPi6n2s0MEKEW8B0JwCRyB9TPLGudjP90QneEayX69eopEwCuDRUYsZhBHKzO26e7RV1X8ldpqjqawDWRHKMXxGIMWecfpmt1wYeOMKXBZr8AoQlUekwnrWL2jMZrzn0ksyqfAHAY5E+cMp2xCjWUq3VRhvYrHr7wLQhdhjbXEubmA0dKvGQK+RIeG5I8dW5cTo3W8as+i+D8Whc+NjtFLQtXcED5foNASknEoEPHEu7rVOkRtW/iRilyDnCuFvQPm2Ti1uvAmAVAJ8UkbPzNN2US0XcX/beZqJ7AdRIEctbBVsNZwID6Jt0VyiB+k1YcATssC3tqXbwSdbNGfk3gEUM2uNaImyhjk+Wq24qmhX/IIA7AD7rWPrSNrBR8dcQcCRKiUK32nlxOHNB9RDsr3j3M+jNUCTgxvJ60fg+KbpYy6h49xHorRgslnS75vD9fCIe+MwbCRr0ZWSXaJ1dEIdSYLPiPw4gbAM4w6Kv19TJmuOmk3VV/hNFx7zFKeq70+CyvxWElyKwIgaRp3+73eB8wDjKg6Ynz0e2CFudgrYrDa7KjWB+N8qF0lhZzxvfLQRYr9SvVaGcjCOmu52i2JcGT3pjCOjzGEYbHUu8txBgoyo3EfM7ce3wqJ3Xj6fAyaj7C8AwwHsdS9+0EGCz4u8HcBeA352CuBJEnAaHlV2WrxPxA2GawWKFU6SfO8Gz5jgZIOEk1AF61bHEI017qcmVCJ6KKp/xiW2JtU0PWx3IBI5HZjhK81ELs1zmFs0zHcHhoVnx9gJ0T9x32G4XtKdnR52lj82KfAXgh+Muojfconiw1U7b12lRiRdL1Z8CKJfkYsK2tG3d8t12zqyYk3JXy5fpWx1i1fkCxb2cPB0XgXDHUkg9mloEhHjIXU0/9XIgWSD2ACgmctPckKs7LRDzWX3qAL/PUD5UKfi6ZmunL+mH7rO/FIxRJgq3jnD1ae5mUwRxu23Rb52c7b3sfcwDpim3AwirUcl43R4BO+1h8dz/WvZaIXqpvlKo9ARA6xkY7OLADDMdgFB3zJWStj6eM6ISC4PkjSC6KrXQK8EPTl6bAlEwp41exZVV+ULkMv1JXAigm+5/5PnRLjGBChUAAAAASUVORK5CYII="/></button></td>
                                                                    <td>{hoaDon.tongTienSauGiam}</td>

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