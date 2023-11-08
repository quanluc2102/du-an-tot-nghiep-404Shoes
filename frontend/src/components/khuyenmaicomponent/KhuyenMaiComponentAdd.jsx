import React, { Component } from 'react';
import KhuyenMaiService from '../../services/khuyenmaiservice/KhuyenMaiService';
import { toast } from 'react-toastify';
import "./KhuyenMaiComponentStyle.css"

class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            khuyenMai: [],
            khuyenMaiAdd: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: '0',
                dieuKien: '',
                soLuong: '',
                trangThai: '0',
            },
            errorAdd: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                dieuKien: '',
                soLuong: '',
            },
        };

        this.add = this.add.bind(this);
        this.thayDoiTruongAdd = this.thayDoiTruongAdd.bind(this);
    }

    add = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('Bạn có chắc chắn muốn thêm khuyến mãi?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        const { khuyenMaiAdd } = this.state;
        const {
            ma,
            ten,
            moTa,
            batDau,
            ketThuc,
            giamGia,
            kieuKhuyenMai,
            dieuKien,
            soLuong,
            trangThai,
        } = khuyenMaiAdd;

        // Chuyển đổi ngày và giờ sang múi giờ UTC
        const batDauUTC = new Date(batDau).toISOString();
        const ketThucUTC = new Date(ketThuc).toISOString();

        // Clear previous errors
        let errorAdd = {
            ma: '',
            ten: '',
            moTa: '',
            batDau: '',
            ketThuc: '',
            giamGia: '',
            dieuKien: '',
            soLuong: '',
        };

        if (!ma || !ma.trim() || /[\s!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/-]+/.test(ma)) {
            errorAdd.ma = 'Mã không được bỏ trống hoặc chứa khoảng trắng hoặc kí tự đặc biệt!';
        }

        if (!ten || !ten.trim() || !/^[a-zA-Z\sàáảãạăắằẳẵặâấầẩẫậèéẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ]+$/.test(ten)) {
            errorAdd.ten = 'Tên không được bỏ trống hoặc chứa kí tự đặc biệt!';
        }

        if (!moTa || !moTa.trim() || moTa.trim() === '') {
            errorAdd.moTa = 'Mô tả không được bỏ trống hoặc chỉ chứa khoảng trắng!';
        }

        const batDauDate = new Date(batDau);
        const ketThucDate = new Date(ketThuc);


        if (!batDau.trim()) {
            errorAdd.batDau = 'Ngày bắt đầu không được bỏ trống!';
        }else{
            khuyenMaiAdd.batDau = batDauDate.toISOString(); // Chuyển đổi sang định dạng ISO 8601
        }

        if (!ketThuc.trim()) {
            errorAdd.ketThuc = 'Ngày kết thúc không được bỏ trống!';
        }else{

            khuyenMaiAdd.ketThuc = ketThucDate.toISOString(); // Chuyển đổi sang định dạng ISO 8601
        }

        if (!giamGia.trim() || isNaN(parseFloat(giamGia)) || /[a-zA-Z]+/.test(giamGia)) {
            errorAdd.giamGia = 'Giảm giá không hợp lệ!';
        }

        if (kieuKhuyenMai === '1') {
            const giamGiaValue = parseFloat(giamGia);
            if (giamGiaValue <= 0 || giamGiaValue > 100) {
                errorAdd.giamGia = 'Phần trăm giảm giá phải nằm trong khoảng 1-100!';
            }
        } else if (kieuKhuyenMai === '2') {
            const giamGiaValue = parseFloat(giamGia);
            if (giamGiaValue <= 0) {
                errorAdd.giamGia = 'Số tiền giảm giá phải lớn hơn 0!';
            }
        }

        if (!dieuKien.trim() || isNaN(parseInt(dieuKien)) || parseInt(dieuKien) < 0 || /[a-zA-Z]+/.test(dieuKien)) {
            errorAdd.dieuKien = 'Điều kiện không hợp lệ!';
        }

        if (!soLuong.trim() || isNaN(parseInt(soLuong)) || parseInt(soLuong) < 0 || /[a-zA-Z]+/.test(soLuong)) {
            errorAdd.soLuong = 'Số lượng không hợp lệ!';
        }

        if (Object.values(errorAdd).some((error) => error !== '')) {
            this.setState({ errorAdd });
            return;
        }

        // If all data is valid, proceed to create a new KhuyenMai object
        const newKhuyenMai = {
            ma,
            ten,
            moTa,
            batDau: batDauUTC, // Sử dụng thời gian đã chuyển đổi sang múi giờ UTC
            ketThuc: ketThucUTC, // Sử dụng thời gian đã chuyển đổi sang múi giờ UTC
            giamGia,
            kieuKhuyenMai,
            dieuKien,
            soLuong,
            trangThai,
        };

        KhuyenMaiService.createKhuyenMai(newKhuyenMai)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Khuyến mãi đã được thêm thành công!');
                    const khuyenMaiMoi = res.data;
                    this.setState((prevState) => ({
                        khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi],
                    }));
                    window.location.href = '/khuyenmai'; // Redirect using props.history if available
                } else {
                    toast.error('Có lỗi xảy ra khi thêm.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi thêm khuyến mãi:', error);
                toast.error('Có lỗi xảy ra khi thêm.');
            });
    };

    thayDoiTruongAdd(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        this.setState((prevState) => ({
            khuyenMaiAdd: {
                ...prevState.khuyenMaiAdd,
                [fieldName]: value,
            },
        }));
    }

    render() {
        const { batDau, ketThuc } = this.state.khuyenMaiAdd;

        // Chuyển đổi ngược từ múi giờ UTC sang múi giờ cục bộ
        const batDauLocal = new Date(batDau).toLocaleString();
        const ketThucLocal = new Date(ketThuc).toLocaleString();
        return (
            <div>
                <div className="pagetitle">
                    <h1>Khuyến mãi</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        ADD<span>| xx</span>
                                    </h5>
                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Mã <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.ma ? 'is-invalid' : ''}`}
                                                        name="ma"
                                                        onChange={this.thayDoiTruongAdd}
                                                    />
                                                    {this.state.errorAdd.ma && (
                                                        <div className="text-danger">{this.state.errorAdd.ma}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Tên: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        onChange={this.thayDoiTruongAdd}
                                                    />
                                                    {this.state.errorAdd.ten && (
                                                        <div className="text-danger">{this.state.errorAdd.ten}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Mô tả: <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                className={`form-control ${this.state.errorAdd.moTa ? 'is-invalid' : ''}`}
                                                name="moTa"
                                                onChange={this.thayDoiTruongAdd}
                                            />
                                            {this.state.errorAdd.moTa && (
                                                <div className="text-danger">{this.state.errorAdd.moTa}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Ngày bắt đầu: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.batDau ? 'is-invalid' : ''}`}
                                                        name="batDau"
                                                        type="datetime-local"
                                                        onChange={this.thayDoiTruongAdd}
                                                        value={batDau}
                                                    />
                                                    {this.state.errorAdd.batDau && (
                                                        <div className="text-danger">{this.state.errorAdd.batDau}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Kết thúc: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.ketThuc ? 'is-invalid' : ''}`}
                                                        name="ketThuc"
                                                        type="datetime-local"
                                                        onChange={this.thayDoiTruongAdd}
                                                        value={ketThuc}
                                                    />
                                                    {this.state.errorAdd.ketThuc && (
                                                        <div className="text-danger">{this.state.errorAdd.ketThuc}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label>Kiểu khuyến mãi <span style={{ color: 'red' }}>*</span></label>
                                                    <select
                                                        className={`form-control ${this.state.errorAdd.kieu ? 'is-invalid' : ''}`}
                                                        name="kieu"
                                                        onChange={this.thayDoiTruongAdd}
                                                    >
                                                        <option value="">Chọn kiểu khuyến mãi</option>
                                                        <option value="1">Giảm giá theo phần trăm</option>
                                                        <option value="2">Giảm giá theo số tiền</option>
                                                        <option value="3">Tặng quà</option>
                                                    </select>
                                                    {this.state.errorAdd.kieuKhuyenMai && (
                                                        <div className="text-danger">{this.state.errorAdd.kieuKhuyenMai}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Giảm giá: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.giamGia ? 'is-invalid' : ''}`}
                                                        name="giamGia"
                                                        onChange={this.thayDoiTruongAdd}
                                                    />
                                                    {this.state.errorAdd.giamGia && (
                                                        <div className="text-danger">{this.state.errorAdd.giamGia}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Số lượng: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.soLuong ? 'is-invalid' : ''}`}
                                                        name="soLuong"
                                                        onChange={this.thayDoiTruongAdd}
                                                    />
                                                    {this.state.errorAdd.soLuong && (
                                                        <div className="text-danger">{this.state.errorAdd.soLuong}</div>
                                                    )}
                                                </div>

                                                <div className="col-md-3">
                                                    <label>Điều kiện: <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorAdd.dieuKien ? 'is-invalid' : ''}`}
                                                        name="dieuKien"
                                                        onChange={this.thayDoiTruongAdd}
                                                    />
                                                    {this.state.errorAdd.dieuKien && (
                                                        <div className="text-danger">{this.state.errorAdd.dieuKien}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
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

export default KhuyenMaiComponent;
