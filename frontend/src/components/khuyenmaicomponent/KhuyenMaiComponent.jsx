import React, {Component} from 'react';
import KhuyenMaiService from '../../services/khuyenmaiservice/KhuyenMaiService';
import {toast} from 'react-toastify';
import "./KhuyenMaiComponentStyle.css"

class KhuyenMaiComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            khuyenMai: [],
            pageCount: 0,
            khuyenMaiUpdate: {
                id: this.props.match.params.id,
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
            error: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                kieuKhuyenMai: '',
                dieuKien: '',
                soLuong: '',
                trangThai: '',
            },
            errorUpdate: {
                ma: '',
                ten: '',
                moTa: '',
                batDau: '',
                ketThuc: '',
                giamGia: '',
                dieuKien: '',
                soLuong: '',
            },
            maxSoLuong: 1350, // Giới hạn số lượng
            minSoLuong: 0
        };


        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.add = this.add.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            KhuyenMaiService.getKhuyenMaiById(id)
                .then((res) => {
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
                        trangThai
                    } = res.data;

                    const batDauDate = new Date(batDau);
                    const ketThucDate = new Date(ketThuc);

                    if (!isNaN(batDauDate) && !isNaN(ketThucDate)) {
                        this.setState({
                            khuyenMaiUpdate: {
                                ...this.state.khuyenMaiUpdate,
                                id,
                                ma,
                                ten,
                                moTa,
                                batDau: this.formatDate(batDauDate),
                                ketThuc: this.formatDate(ketThucDate),
                                giamGia,
                                kieuKhuyenMai,
                                dieuKien,
                                soLuong,
                                trangThai,
                            },
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }

    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    handleFieldChange(event, fieldType) {
        const fieldName = event.target.name;
        const value = event.target.value;
        const {name} = event.target;
        if (name === 'soLuong') {
            // Chuyển đổi giá trị nhập vào thành số
            const newValue = parseInt(value, 10); // Change value1 to value
            const newValueMin = 0 // Change value1 to value
            // Kiểm tra nếu giá trị nhập vào vượt quá giới hạn, đặt lại giá trị tối đa
            const giaTriToiDa = this.state.maxSoLuong;
            const giaTriMin = this.state.minSoLuong;
            const giaTriCuoiCung = newValue > giaTriToiDa ? giaTriToiDa : newValue;
            const giaTriCuoiCungMin = newValueMin < giaTriMin ? giaTriMin : newValueMin;

            this.setState((prevState) => ({
                khuyenMaiUpdate: {
                    ...prevState.khuyenMaiUpdate,
                    [name]: giaTriCuoiCung || giaTriCuoiCungMin,
                },
                errorUpdate: {
                    ...prevState.errorUpdate,
                    [name]: '',
                },
            }));
        } else {
            this.setState((prevState) => ({
                khuyenMaiUpdate: {
                    ...prevState.khuyenMaiUpdate,
                    [fieldName]: value,
                },
            }));
        }
    }

    delete(id) {
        KhuyenMaiService.deleteKhuyenMai(id).then((res) => {
            // Handle successful deletion
            this.props.history.push('/index');
        });
    }

    add = (e) => {
        e.preventDefault();
        const {khuyenMaiUpdate} = this.state;
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
        } = khuyenMaiUpdate;

        // Validate the form fields here, similar to what you were doing in your code
        // ...

        if (Object.values(this.state.error).some((error) => error !== '')) {
            return;
        }

        const newKhuyenMai = {
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
        };

        KhuyenMaiService.createKhuyenMai(newKhuyenMai)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Khuyến mãi đã được thêm thành công!');
                    const khuyenMaiMoi = res.data;
                    this.setState((prevState) => ({
                        khuyenMai: [...prevState.khuyenMai, khuyenMaiMoi],
                    }));
                    window.location.href = ('/khuyenmai');
                } else {
                    toast.error('Có lỗi xảy ra khi thêm.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi thêm khuyến mãi:', error);
                toast.error('Có lỗi xảy ra khi thêm.');
            });
    };

    update = (e) => {
        e.preventDefault(); // Prevent the default form submission
        const confirmed = window.confirm('Bạn có chắc chắn muốn chỉnh sửa khuyến mãi này?');
        if (!confirmed) {
            return; // Người dùng bấm "Cancel", không thực hiện thêm
        }
        const {khuyenMaiUpdate} = this.state;
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
        } = khuyenMaiUpdate;
        const errorUpdate = {
            ma: '',
            ten: '',
            moTa: '',
            batDau: '',
            ketThuc: '',
            giamGia: '',
            kieuKhuyenMai: '',
            dieuKien: '',
            soLuong: '',
            trangThai: ''
        };
        const currentDate = new Date();
        const batDauDate = new Date(khuyenMaiUpdate.batDau);
        const ketThucDate = new Date(khuyenMaiUpdate.ketThuc);

        if (!ma || !ma.trim() || /[\s!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\\/-]+/.test(ma)) {
            errorUpdate.ma = 'Mã không được bỏ trống hoặc chứa khoảng trắng hoặc kí tự đặc biệt!';
        }

        if (!ten || !ten.trim() || !/^[a-zA-Z\sàáảãạăắằẳẵặâấầẩẫậèéẹêềếểễệđìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵÀÁẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬÈÉẺẼẸÊỀẾỂỄỆĐÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ0-9]+$/.test(ten)) {
            errorUpdate.ten = 'Tên không được bỏ trống, chứa kí tự đặc biệt!';
        }


        if (!moTa || !moTa.trim() || moTa.trim() === '') {
            errorUpdate.moTa = 'Mô tả không được bỏ trống hoặc chỉ chứa khoảng trắng!';
        }

        // const batDauDate = new Date(batDau);
        // const ketThucDate = new Date(ketThuc);


        if (!batDauDate || isNaN(batDauDate.getTime())) {
            toast.error('Không được để trống ngày bắt đầu.');
            return;
        } else {
            khuyenMaiUpdate.batDau = batDauDate.toISOString();
        }

        if (!ketThucDate || isNaN(ketThucDate.getTime())) {
            toast.error('Không được để trống ngày kết thúc.');
            return;
        } else {
            khuyenMaiUpdate.ketThuc = ketThucDate.toISOString();
        }

        if (batDauDate > ketThucDate) {
            toast.error('Ngày bắt đầu không được lớn hơn ngày kết thúc!');
            return;
        } else {
            khuyenMaiUpdate.batDau = batDauDate.toISOString(); // Chuyển đổi sang định dạng ISO 8601
        }

        var ngayHienTai = new Date();
        console.log(ngayHienTai)

        if (batDauDate < ngayHienTai) {
            toast.error('Ngày bắt đầu không được nhỏ hơn ngày hiện tại!');
            return;
        } else {
            khuyenMaiUpdate.batDau = batDauDate.toISOString();
        }

        if (!giamGia.trim() || isNaN(parseFloat(giamGia)) || /[a-zA-Z]+/.test(giamGia)) {
            errorUpdate.giamGia = 'Giảm giá không hợp lệ!';
        }


        if (kieuKhuyenMai === '1' && giamGia <= 0 || kieuKhuyenMai === '1'&& giamGia > 100) {
            // errorUpdate.giamGia = 'Phần trăm giảm giá phải nằm trong khoảng 1-100!';
            errorUpdate.giamGia = ('Phần trăm giảm giá phải nằm trong khoảng 1-100!');
            console.log("lỗi nè má")
        }
        if (kieuKhuyenMai === '0' && giamGia <= 0) {
            errorUpdate.giamGia = 'Số tiền giảm giá phải lớn hơn 0 !!';

        }

        if (kieuKhuyenMai === '') {
            errorUpdate.kieuKhuyenMai = 'Không được bỏ trống kiểu khuyến mãi';

        }
        if (this.state.khuyenMai.some(km => km.ma === khuyenMaiUpdate.ma)) {
            // Kiểm tra trùng căn cước
            this.setState({ errorUpdate: { ...this.state.errorUpdate, ma: "Mã khuyến mãi đã tồn tại !" } });
            return;
        }


        if (!dieuKien.trim() || isNaN(parseInt(dieuKien)) || parseInt(dieuKien) < 0 || /[a-zA-Z]+/.test(dieuKien)) {
            errorUpdate.dieuKien = 'Điều kiện không hợp lệ!';
        }

        if (!soLuong || isNaN(parseInt(soLuong)) || parseInt(soLuong) < 0 || /[a-zA-Z]+/.test(soLuong)) {
            errorUpdate.soLuong = 'Số lượng không hợp lệ!';
        }

        if (Object.values(errorUpdate).some((error) => error !== '')) {
            this.setState({errorUpdate});
            return;
        }

        const id = khuyenMaiUpdate.id;
        // Continue with the update logic
        KhuyenMaiService.updateKhuyenMai(id, khuyenMaiUpdate)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Khuyến mãi đã được cập nhật thành công!');
                    window.location.href = '/khuyenmai';
                } else {
                    toast.error('Có lỗi xảy ra khi cập nhật.');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật khuyến mãi:', error);
                toast.error(error.response.data);
            });
    };

    thayDoiTruongUpdate(event) {
        const fieldName = event.target.name;
        const value = event.target.value;
        const {name} = event.target;
        if (name === 'soLuong') {
            // Chuyển đổi giá trị nhập vào thành số
            const newValue = parseInt(value, 10); // Change value1 to value
            const newValueMin = 0 // Change value1 to value
            // Kiểm tra nếu giá trị nhập vào vượt quá giới hạn, đặt lại giá trị tối đa
            const giaTriToiDa = this.state.maxSoLuong;
            const giaTriMin = this.state.minSoLuong;
            const giaTriCuoiCung = newValue > giaTriToiDa ? giaTriToiDa : newValue;
            const giaTriCuoiCungMin = newValueMin < giaTriMin ? giaTriMin : newValueMin;

            this.setState((prevState) => ({
                khuyenMaiUpdate: {
                    ...prevState.khuyenMaiUpdate,
                    [name]: giaTriCuoiCung || giaTriCuoiCungMin,
                },
                errorUpdate: {
                    ...prevState.errorUpdate,
                    [name]: '',
                },
            }));
        } else {
            this.setState((prevState) => ({
                khuyenMaiUpdate: {
                    ...prevState.khuyenMaiUpdate,
                    [fieldName]: value,
                },
            }));
        }


    }


    detail(id) {
        this.props.history.push(`/khuyenMaidetail/${id}`);
    }

    render() {
        const {batDau, ketThuc} = this.state.khuyenMaiAdd;

        // Chuyển đổi ngược từ múi giờ UTC sang múi giờ cục bộ
        const batDauLocal = new Date(batDau).toLocaleString();
        const ketThucLocal = new Date(ketThuc).toLocaleString();
        return (
            <div>
                <div className="pagetitle">
                    <h1>Thêm phiếu giảm giá</h1>
                </div>
                <section className="section dashboard">
                    <div className="row">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <span></span>
                                    </h5>
                                    <form>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Mã <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ma ? 'is-invalid' : ''}`}
                                                        name="ma"
                                                        onChange={this.thayDoiTruongUpdate}
                                                    />
                                                    {this.state.errorUpdate.ma && (
                                                        <div className="text-danger">{this.state.errorUpdate.ma}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Tên: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ten ? 'is-invalid' : ''}`}
                                                        name="ten"
                                                        onChange={this.thayDoiTruongUpdate}
                                                    />
                                                    {this.state.errorUpdate.ten && (
                                                        <div className="text-danger">{this.state.errorUpdate.ten}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Mô tả: <span style={{color: 'red'}}>*</span></label>
                                            <input
                                                className={`form-control ${this.state.errorUpdate.moTa ? 'is-invalid' : ''}`}
                                                name="moTa"
                                                onChange={this.thayDoiTruongUpdate}
                                            />
                                            {this.state.errorUpdate.moTa && (
                                                <div className="text-danger">{this.state.errorUpdate.moTa}</div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Ngày bắt đầu: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.batDau ? 'is-invalid' : ''}`}
                                                        name="batDau"
                                                        type="datetime-local"
                                                        onChange={this.thayDoiTruongUpdate}
                                                        value={batDau}
                                                    />
                                                    {this.state.errorUpdate.batDau && (
                                                        <div className="text-danger">{this.state.errorUpdate.batDau}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Kết thúc: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.ketThuc ? 'is-invalid' : ''}`}
                                                        name="ketThuc"
                                                        type="datetime-local"
                                                        onChange={this.thayDoiTruongUpdate}
                                                        value={ketThuc}
                                                    />
                                                    {this.state.errorUpdate.ketThuc && (
                                                        <div className="text-danger">{this.state.errorUpdate.ketThuc}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <label>Kiểu khuyến mãi <span style={{color: 'red'}}>*</span></label>
                                                    <select
                                                        className={`form-control ${this.state.errorUpdate.kieuKhuyenMai ? 'is-invalid' : ''}`}
                                                        name="kieuKhuyenMai"
                                                        onChange={this.thayDoiTruongUpdate}
                                                    >
                                                        <option value="">Chọn kiểu khuyến mãi</option>
                                                        <option value="0">Giảm giá theo số tiền</option>
                                                        <option value="1">Giảm giá theo phần trăm</option>
                                                        {/*<option value="3">Tặng quà</option>*/}
                                                    </select>
                                                    {this.state.errorUpdate.kieuKhuyenMai && (
                                                        <div
                                                            className="text-danger">{this.state.errorUpdate.kieuKhuyenMai}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Giảm giá: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.giamGia ? 'is-invalid' : ''}`}
                                                        name="giamGia"
                                                        onChange={this.thayDoiTruongUpdate}
                                                    />
                                                    {this.state.errorUpdate.giamGia && (
                                                        <div className="text-danger">{this.state.errorUpdate.giamGia}</div>
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    <label>Số lượng: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        // type={"number"}
                                                        className={`form-control ${this.state.errorUpdate.soLuong ? 'is-invalid' : ''}`}
                                                        name="soLuong"
                                                        onChange={this.thayDoiTruongUpdate}
                                                        value={this.state.khuyenMaiAdd.soLuong}
                                                    />
                                                    {this.state.errorUpdate.soLuong && (
                                                        <div className="text-danger">{this.state.errorUpdate.soLuong}</div>
                                                    )}
                                                </div>

                                                <div className="col-md-3">
                                                    <label>Điều kiện: <span style={{color: 'red'}}>*</span></label>
                                                    <input
                                                        className={`form-control ${this.state.errorUpdate.dieuKien ? 'is-invalid' : ''}`}
                                                        name="dieuKien"
                                                        onChange={this.thayDoiTruongUpdate}
                                                    />
                                                    {this.state.errorUpdate.dieuKien && (
                                                        <div
                                                            className="text-danger">{this.state.errorUpdate.dieuKien}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Sửa khuyến mãi"
                                               style={{marginTop: '10px'}} onClick={this.update}/>
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

export default KhuyenMaiComponent