import React, { Component } from 'react';
import HoaDonService from '../../services/hoadonservice/HoaDonService';

class HoaDonComponents extends Component {
    constructor(props){
        super(props)
        this.state = {
            hoaDon : []
        }
    }
    componentDidMount(){
        HoaDonService.getHoaDon().then((res) => {
            this.setState({hoaDon : res.data})
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
                            <th>Ngày Tạo</th>
                            <th>Ngày cập nhật</th>
                            <th>Thạng thái</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                   this.state.hoaDon.map(
                                                    hoaDon => 
                                                    <tr key = {hoaDon.id}>
                                                        <td>{hoaDon.ngayTao}</td>
                                                        <td>{hoaDon.ngayCapNhat}</td>
                                                        <td>{hoaDon.trangThai}</td>
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