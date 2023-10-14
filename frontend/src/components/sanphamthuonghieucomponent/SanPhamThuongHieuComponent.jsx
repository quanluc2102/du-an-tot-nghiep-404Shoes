import React, { Component } from 'react';
import { toast } from 'react-toastify';
import sanphamthuonghieuservice from '../../services/sanphamthuonghieuservice/sanphamthuonghieuservice';
import SanPhamService1 from '../../services/sanphamservice/SanPhamService1';
import thuonghieuservice from '../../services/thuonghieuservice/thuonghieuservice';

class SanPhamThuongHieuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPhamThuongHieu: [],
            sanPhamThuongHieuAdd: {
                sanPhamId: '', 
                thuongHieuId: '',
            },
            sanPhamThuongHieuUpdate: {
                id: this.props.match.params.id,
                sanPhamId: '', 
                thuongHieuId: '',
            },
            errorsAdd: {
                sanPhamId: '', 
                thuongHieuId: '',
            },
            errorsUpdate: {
                sanPhamId: '', 
                thuongHieuId: '',
            },
            sanPhams: [],  // Thêm danh sách Sản phẩm vào state
            thuongHieus: [],  // Thêm danh sách Thương Hiệu vào state
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiSanPhamIdAdd = this.thayDoiSanPhamIdAdd.bind(this);
        this.thayDoiThuongHieuIdAdd = this.thayDoiThuongHieuIdAdd.bind(this);
        this.thayDoiSanPhamIdUpdate = this.thayDoiSanPhamIdUpdate.bind(this);
        this.thayDoiThuongHieuIdUpdate = this.thayDoiThuongHieuIdUpdate.bind(this);
    }

    componentDidMount() {
        this.loadSanPhamThuongHieuData();
        this.loadThuongHieuData();
        this.loadSanPhamData(); // Thêm dòng này để tải danh sách Sản phẩm
    }


    loadSanPhamData() {
        // Gọi API hoặc lấy danh sách Sản phẩm từ dữ liệu và lưu vào state
        // Ví dụ:
        SanPhamService1.getSanPham().then((res) => {
            this.setState({ sanPhams: res.data });
        });
    }

    loadThuongHieuData() {
        // Gọi API hoặc lấy danh sách Thương Hiệu từ dữ liệu và lưu vào state
        // Ví dụ:
        thuonghieuservice.getThuongHieu().then((res) => {
            this.setState({ thuongHieus: res.data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadSanPhamThuongHieuData();
        }
    }

    loadSanPhamThuongHieuData() {
        sanphamthuonghieuservice.getSanPhamThuongHieu().then((res) => {
            console.log(res.data);
            this.setState({ sanPhamThuongHieu: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            sanphamthuonghieuservice.getSanPhamThuongHieuById(id).then((res) => {
                this.setState({ sanPhamThuongHieuUpdate: res.data });
            });
        }
    }


    delete(id) {
        sanphamthuonghieuservice.deleteSanPhamThuongHieu(id).then((res) => {
            console.log(res); // Xem phản hồi từ API
            if (res.status === 200) { // Kiểm tra nếu phản hồi là thành công
                this.setState({
                    sanPhamThuongHieu: this.state.sanPhamThuongHieu.filter(sanPhamThuongHieu => sanPhamThuongHieu.id !== id)
                });
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi xóa danh mục.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
            }
        }).catch(error => {
            toast.error("Lỗi: " + (error.response && error.response.data ? error.response.data : "Có lỗi xảy ra khi xóa danh mục."));
        });
    }

    add = (e) => {
        e.preventDefault();
        let sanPhamThuongHieu = {
            sanPhamId: this.state.sanPhamThuongHieuAdd.sanPhamId,
            thuongHieuId: this.state.sanPhamThuongHieuAdd.thuongHieuId
        };

        if (!this.state.sanPhamThuongHieuAdd.sanPhamId) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sanPhamId: "Sản phẩm không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, sanPhamId: "" } });
        }

        if (!this.state.sanPhamThuongHieuAdd.thuongHieuId) {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, thuongHieuId: "Thương hiệu không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsAdd: { ...this.state.errorsAdd, thuongHieuId: "" } });
        }


        sanphamthuonghieuservice.createSanPhamThuongHieu(sanPhamThuongHieu).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let sanPhamThuongHieuMoi = res.data;
                this.setState(prevState => ({
                    sanPhamThuongHieu: [...prevState.sanPhamThuongHieu, sanPhamThuongHieuMoi]
                }));
            } else {
                // Xử lý khi có lỗi
                const errorMessage = res.data || "Có lỗi xảy ra khi thêm danh mục.";
                toast.error("Lỗi: " + errorMessage); // Hiển thị lỗi bằng Toast
                console.log(errorMessage);
            }
        });

    }
    update = (e) => {
        e.preventDefault();
        let sanPhamThuongHieu = {
            sanPhamId: this.state.sanPhamThuongHieuUpdate.sanPhamId,
            thuongHieuId: this.state.sanPhamThuongHieuUpdate.thuongHieuId
        };
        console.log('nsx' + JSON.stringify(sanPhamThuongHieu));
        // let id = this.state.sanPhamThuongHieuUpdate.id;

        if (!this.state.sanPhamThuongHieuUpdate.sanPhamId) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sanPhamId: "Sản phẩm không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, sanPhamId: "" } });
        }

        if (!this.state.sanPhamThuongHieuUpdate.thuongHieuId) {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, thuongHieuId: "Thương hiệu không được bỏ trống!" } });
            return;
        } else {
            this.setState({ errorsUpdate: { ...this.state.errorsUpdate, thuongHieuId: "" } });
        }

        sanphamthuonghieuservice.updateSanPhamThuongHieu(sanPhamThuongHieu, this.state.sanPhamThuongHieuUpdate.id).then((res) => {
            let sanPhamThuongHieuCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                sanPhamThuongHieu: prevState.sanPhamThuongHieu.map(dm =>
                    dm.id === sanPhamThuongHieuCapNhat.id ? sanPhamThuongHieuCapNhat : dm
                )
            }));
        })

    }
    detail(id) {
        const spthSelected = this.state.sanPhamThuongHieu.find(thsp => thsp.id === id);
        console.log(spthSelected); // Thêm dòng này
        if (spthSelected) {
            this.setState({
                sanPhamThuongHieuUpdate: {
                    id: spthSelected.id,
                    sanPhamId: spthSelected.sanPham.id,
                    thuongHieuId: spthSelected.thuongHieu.id
                }
            });
        }
    }

    thayDoiSanPhamIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamThuongHieuAdd: {
                ...prevState.sanPhamThuongHieuAdd,
                sanPhamId: event.target.value
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, sanPhamId: "" };
        this.setState({ errorsAdd: errorsAdd });
    }

    thayDoiThuongHieuIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamThuongHieuAdd: {
                ...prevState.sanPhamThuongHieuAdd,
                thuongHieuId: event.target.value // Sửa ở đây
            }
        }));
        let errorsAdd = { ...this.state.errorsAdd, thuongHieuId: "" };
        this.setState({ errorsAdd: errorsAdd });
    }
    thayDoiSanPhamIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamThuongHieuUpdate: {
                ...prevState.sanPhamThuongHieuUpdate,
                sanPhamId: event.target.value
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, sanPhamId: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }
    thayDoiThuongHieuIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamThuongHieuUpdate: {
                ...prevState.sanPhamThuongHieuUpdate,
                thuongHieuId: event.target.value // Sửa ở đây
            }
        }));
        let errorsUpdate = { ...this.state.errorsUpdate, thuongHieuId: "" };
        this.setState({ errorsUpdate: errorsUpdate });
    }




    render() {
        console.log(this.state.sanPhamThuongHieuUpdate);
        return (
            <div>
                <div className="pagetitle">
                    <h1>Color</h1>
                    <nav>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li className="breadcrumb-item active">Overview</li>
                            <li className="breadcrumb-item active">Color</li>
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
                                            <h5 className="card-title">Color <span>| </span></h5>

                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>Tên</th>
                                                        {/* <th>Ngày tạo</th> */}
                                                        <th>Giá nhập</th>
                                                        <th>Giá bán </th>
                                                        <th>Thương hiệu </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.sanPhamThuongHieu.map((thsp) => (
                                                        <tr key={thsp.id}>
                                                            <td>{thsp.sanPham.ten}</td>
                                                            {/* <td>{thsp.sanPham.ngayTao}</td> */}
                                                            <td>{thsp.sanPham.giaNhap}</td>
                                                            <td>{thsp.sanPham.giaBan}</td>
                                                            <td>{thsp.thuongHieu.ten}</td>
                                                            <td>
                                                                <button onClick={() => this.delete(thsp.id)} className='btn btn-danger'>Xóa</button>
                                                                <button onClick={() => this.detail(thsp.id)} className='btn btn-primary'>Chi tiết</button>
                                                            </td>
                                                        </tr>
                                                    ))}
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
                                    <h5 className="card-title">Sửa <span>| xx</span></h5>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                                data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                                aria-selected="true">Edit
                                            </button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                                data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                                aria-selected="false">Add new
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
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Sản phẩm</label>
                                                    <select name="sanPhamId" value={this.state.sanPhamThuongHieuUpdate.sanPhamId} className={`form-control ${this.state.errorsUpdate.sanPhamId ? 'is-invalid' : ''}`} onChange={this.thayDoiSanPhamIdUpdate}>
                                                        <option value="">Chọn Sản Phẩm</option>
                                                        {this.state.sanPhams.map((sanPham) => (
                                                            <option key={sanPham.id} value={sanPham.id}>
                                                                {sanPham.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsUpdate.sanPhamId && <div className="text-danger">{this.state.errorsUpdate.sanPhamId}</div>}
                                                </div>
                                                <div className='form-group'>
                                                    <label>Thương Hiệu</label>
                                                    <select name="thuongHieuId" value={this.state.sanPhamThuongHieuUpdate.thuongHieuId} className={`form-control ${this.state.errorsUpdate.thuongHieuId ? 'is-invalid' : ''}`} onChange={this.thayDoiThuongHieuIdUpdate}>
                                                        <option value="">Chọn Thương Hiệu</option>
                                                        {this.state.thuongHieus.map((thuongHieu) => (
                                                            <option key={thuongHieu.id} value={thuongHieu.id}>
                                                                {thuongHieu.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsUpdate.thuongHieuId && <div className="text-danger">{this.state.errorsUpdate.thuongHieuId}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Sản phẩm</label>
                                                    <select name="sanPhamId" className={`form-control ${this.state.errorsAdd.sanPhamId ? 'is-invalid' : ''}`} onChange={this.thayDoiSanPhamIdAdd}>
                                                        <option value="">Chọn Sản phẩm</option>
                                                        {this.state.sanPhams.map((sanPham) => (
                                                            <option key={sanPham.id} value={sanPham.id}>
                                                                {sanPham.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsAdd.sanPhamId && <div className="text-danger">{this.state.errorsAdd.sanPhamId}</div>}

                                                </div>

                                                <div className='form-group'>
                                                    <label>Thương Hiệu</label>
                                                    <select name="thuongHieuId" className={`form-control ${this.state.errorsAdd.thuongHieuId ? 'is-invalid' : ''}`} onChange={this.thayDoiThuongHieuIdAdd}>
                                                        <option value="">Chọn thương hiệu</option>
                                                        {this.state.thuongHieus.map((thuongHieu) => (
                                                            <option key={thuongHieu.id} value={thuongHieu.id}>
                                                                {thuongHieu.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {this.state.errorsAdd.thuongHieuId && <div className="text-danger">{this.state.errorsAdd.thuongHieuId}</div>}
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} onClick={this.add} />
                                            </form>
                                        </div>

                                    </div>


                                </div>

                            </div>
                        </div>


                    </div>

                </section>
            </div>
        )
    }

}
export default SanPhamThuongHieuComponent