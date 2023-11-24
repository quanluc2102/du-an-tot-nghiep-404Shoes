import React, { Component } from 'react';
import taikhoanservice from '../../services/taikhoanservice/taikhoanservice';
import { toast } from 'react-toastify';
import "./khachHangUpdate.css";
import axios from "axios";

class TaiKhoanKHUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            taiKhoanUpdate: {
                maTaiKhoan: '',
                email: '',
                anh: '',
            },
            nguoiDungUpdate: {
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
            },
            errorUpdate: {
                sdt: '',
                ten: '',
                cccd: '',
                gioiTinh: '',
                ngaySinh: '',
                maTaiKhoan: '',
                email: '',
            },
        };

        this.update = this.update.bind(this);
        this.thayDoiTenUpdate = this.thayDoiTenUpdate.bind(this);
        this.thayDoiEmailUpdate = this.thayDoiEmailUpdate.bind(this);
        this.thayDoiSdtUpdate = this.thayDoiSdtUpdate.bind(this);
        this.thayDoiNGaySinhUpdate = this.thayDoiNGaySinhUpdate.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;

        // Kiểm tra xem id có tồn tại hay không
        if (!id) {
            console.error("ID is missing from props.");
            // Xử lý tùy thuộc vào trường hợp của bạn (ví dụ: redirect hoặc hiển thị thông báo lỗi)
            return;
        }

        // Kiểm tra xem id có phải là một số hợp lệ hay không
        if (isNaN(id)) {
            console.error("ID is not a valid number.");
            // Xử lý tùy thuộc vào trường hợp của bạn (ví dụ: redirect hoặc hiển thị thông báo lỗi)
            return;
        }

        taikhoanservice.getTaiKhoanById(id)
            .then((response) => {
                const taiKhoanData = response.data;
                console.log("User Account Data:", taiKhoanData);
                this.setState({ taiKhoanUpdate: taiKhoanData });

                // Sau khi lấy thông tin tài khoản, bạn có thể tiếp tục lấy thông tin người dùng.
                taikhoanservice.getThongTinByTaiKhoan(taiKhoanData)
                    .then((thongTinResponse) => {
                        const thongTinData = thongTinResponse.data;
                        console.log("User Information Data:", thongTinData);
                        this.setState({
                            nguoiDungUpdate: thongTinData,
                        });
                    })
                    .catch((error) => {
                        console.error("Error fetching user information:", error);
                    });
            })
    }

    update = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn chỉnh sửa khách hàng này?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }

        const { taiKhoanUpdate, nguoiDungUpdate } = this.state;
        const requestData = {
            taiKhoan: taiKhoanUpdate,
            thongTinNguoiDung: nguoiDungUpdate,
        };

        // Log the request data for debugging purposes
        console.log('Request Data: ' + JSON.stringify(requestData));

        axios.put(`http://localhost:3000/updateKhachHang/${this.state.id}`, requestData)

            .then((response) => {
                const { taiKhoan, thongTinNguoiDung } = response.data;
                this.setState({
                    taiKhoanUpdate: taiKhoan,
                    nguoiDungUpdate: thongTinNguoiDung,
                });
                setTimeout(() => {
                    window.location.href = `/khachhang`;
                }, 2000);
                toast.success("Sửa thành công!");
            })
            .catch((error) => {
                console.error("Update request error:", error);

                // Kiểm tra xem nếu có lỗi validation từ server
                if (error.response && error.response.data && error.response.data.errors) {
                    const serverErrors = error.response.data.errors;

                    // Cập nhật state errorUpdate từ serverErrors
                    this.setState((prevState) => ({
                        errorUpdate: {
                            ...prevState.errorUpdate,
                            ...serverErrors,
                        },
                    }));
                }

                toast.error("Lỗi khi cập nhật");
            });
    };

    thayDoiTenUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ten: event.target.value,
                },
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, ten: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiSdtUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    sdt: event.target.value,
                },
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, sdt: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiNGaySinhUpdate = (event) => {
        this.setState(
            prevState => ({
                nguoiDungUpdate: {
                    ...prevState.nguoiDungUpdate,
                    ngaySinh: event.target.value,
                },
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, ngaySinh: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    thayDoiEmailUpdate = (event) => {
        this.setState(
            prevState => ({
                taiKhoanUpdate: {
                    ...prevState.taiKhoanUpdate,
                    email: event.target.value,
                },
            })
        );
        let errorUpdate = { ...this.state.errorUpdate, email: "" };
        this.setState({ errorUpdate: errorUpdate });
    }

    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Tài khoản khách hàng</h1>
                </div>

                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={this.update}>
                                        <div className="update-form">
                                            <div className="left-column">
                                                <div>
                                                    Mã KH: <span style={{ fontWeight: 'bold' }}>{" "}
                                                    {this.state.taiKhoanUpdate && this.state.taiKhoanUpdate.maTaiKhoan
                                                        ? this.state.taiKhoanUpdate.maTaiKhoan
                                                        : ''}
                                                    </span>
                                                    {this.state.errorUpdate.maTaiKhoan && (
                                                        <div className="text-danger">{this.state.errorUpdate.maTaiKhoan}</div>
                                                    )}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ten">Họ và tên:</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                        id="ten"
                                                        name="ten"
                                                        value={this.state.nguoiDungUpdate.ten}
                                                        onChange={this.thayDoiTenUpdate}
                                                    />
                                                    {this.state.errorUpdate.ten && <div className="invalid-feedback">{this.state.errorUpdate.ten}</div>}
                                                </div>

                                                {/* Email */}
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input
                                                        type="email"
                                                        className={`form-control ${this.state.errorUpdate.email ? 'is-invalid' : ''}`}
                                                        id="email"
                                                        name="email"
                                                        value={this.state.taiKhoanUpdate.email}
                                                        onChange={this.thayDoiEmailUpdate}
                                                    />
                                                    {this.state.errorUpdate.email && <div className="invalid-feedback">{this.state.errorUpdate.email}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="sdt">SDT:</label>
                                                    <input
                                                        type="text"
                                                        className={`form-control ${this.state.errorUpdate.sdt ? 'is-invalid' : ''}`}
                                                        id="sdt"
                                                        name="sdt"
                                                        onChange={this.thayDoiSdtUpdate}
                                                        value={this.state.nguoiDungUpdate.sdt}
                                                    />
                                                    {this.state.errorUpdate.sdt && <div className="invalid-feedback">{this.state.errorUpdate.sdt}</div>}
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="ngaySinh">Ngày Sinh:</label>
                                                    <input
                                                        type="date"
                                                        className={`form-control ${this.state.errorUpdate.ngaySinh ? 'is-invalid' : ''}`}
                                                        id="ngaySinh"
                                                        name="ngaySinh"
                                                        value={this.state.nguoiDungUpdate.ngaySinh}
                                                        onChange={this.thayDoiNGaySinhUpdate}
                                                    />
                                                    {this.state.errorUpdate.ngaySinh && <div className="invalid-feedback">{this.state.errorUpdate.ngaySinh}</div>}
                                                </div>

                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default TaiKhoanKHUpdate;
