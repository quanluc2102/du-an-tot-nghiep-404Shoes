import React, { Component } from 'react';
import { toast } from 'react-toastify';
import sanphamxuatxuservice from '../../services/sanphamxuatxuservice/sanphamxuatxuservice';
import SanPhamService1 from '../../services/sanphamservice/SanPhamService1';
import xuatxuservice from '../../services/xuatxuservice/xuatxuservice';

class SanPhamXuatXuComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPhamXuatXu: [],
            sanPhamXuatXuAdd: {
                sanPhamId: '', // Sử dụng 'sanPhamId' và 'xuatXuId' thay vì 'sanPhamId' hai lần
                xuatXuId: '',
            },
            sanPhamXuatXuUpdate: {
                id: this.props.match.params.id,
                sanPhamId: '', // Sử dụng 'sanPhamId' và 'xuatXuId' thay vì 'sanPhamId' hai lần
                xuatXuId: '',
            },
            sanPhams: [],  // Thêm danh sách Sản phẩm vào state
            xuatXus: [],  // Thêm danh sách Thương Hiệu vào state
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiSanPhamIdAdd = this.thayDoiSanPhamIdAdd.bind(this);
        this.thayDoiXuatXuIdAdd = this.thayDoiXuatXuIdAdd.bind(this);
        this.thayDoiSanPhamIdUpdate = this.thayDoiSanPhamIdUpdate.bind(this);
        this.thayDoiXuatXuIdUpdate = this.thayDoiXuatXuIdUpdate.bind(this);
    }

    componentDidMount() {
        this.loadSanPhamXuatXuData();
        this.loadXuatXuData();
        this.loadSanPhamData(); // Thêm dòng này để tải danh sách Sản phẩm
    }


    loadSanPhamData() {
        // Gọi API hoặc lấy danh sách Sản phẩm từ dữ liệu và lưu vào state
        // Ví dụ:
        SanPhamService1.getSanPham().then((res) => {
            this.setState({ sanPhams: res.data });
        });
    }

    loadXuatXuData() {
        // Gọi API hoặc lấy danh sách Thương Hiệu từ dữ liệu và lưu vào state
        // Ví dụ:
        xuatxuservice.getXuatXu().then((res) => {
            this.setState({ xuatXus: res.data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadSanPhamXuatXuData();
        }
    }

    loadSanPhamXuatXuData() {
        sanphamxuatxuservice.getSanPhamXuatXu().then((res) => {
            console.log(res.data);
            this.setState({ sanPhamXuatXu: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            sanphamxuatxuservice.getSanPhamXuatXuById(id).then((res) => {
                this.setState({ sanPhamXuatXuUpdate: res.data });
            });
        }
    }


    delete(id) {
        sanphamxuatxuservice.deleteSanPhamXuatXu(id).then((res) => {
            console.log(res); // Xem phản hồi từ API
            if (res.status === 200) { // Kiểm tra nếu phản hồi là thành công
                this.setState({
                    sanPhamXuatXu: this.state.sanPhamXuatXu.filter(sanPhamXuatXu => sanPhamXuatXu.id !== id)
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
        let sanPhamXuatXu = {
            sanPhamId: this.state.sanPhamXuatXuAdd.sanPhamId,
            xuatXuId: this.state.sanPhamXuatXuAdd.xuatXuId
        };

        sanphamxuatxuservice.createSanPhamXuatXu(sanPhamXuatXu).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let sanPhamXuatXuMoi = res.data;
                this.setState(prevState => ({
                    sanPhamXuatXu: [...prevState.sanPhamXuatXu, sanPhamXuatXuMoi]
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
        let sanPhamXuatXu = {
            sanPhamId: this.state.sanPhamXuatXuUpdate.sanPhamId,
            xuatXuId: this.state.sanPhamXuatXuUpdate.xuatXuId
        };
        console.log('nsx' + JSON.stringify(sanPhamXuatXu));
        // let id = this.state.sanPhamXuatXuUpdate.id;
        sanphamxuatxuservice.updateSanPhamXuatXu(sanPhamXuatXu, this.state.sanPhamXuatXuUpdate.id).then((res) => {
            let sanPhamXuatXuCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                sanPhamXuatXu: prevState.sanPhamXuatXu.map(dm =>
                    dm.id === sanPhamXuatXuCapNhat.id ? sanPhamXuatXuCapNhat : dm
                )
            }));
        })

    }
    detail(id) {
        const spthSelected = this.state.sanPhamXuatXu.find(spxx => spxx.id === id);
        console.log(spthSelected); // Thêm dòng này
        if (spthSelected) {
            this.setState({
                sanPhamXuatXuUpdate: {
                    id: spthSelected.id,
                    sanPhamId: spthSelected.sanPham.id,
                    xuatXuId: spthSelected.xuatXu.id
                }
            });
        }
    }

    thayDoiSanPhamIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamXuatXuAdd: {
                ...prevState.sanPhamXuatXuAdd,
                sanPhamId: event.target.value
            }
        }));
    }

    thayDoiXuatXuIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamXuatXuAdd: {
                ...prevState.sanPhamXuatXuAdd,
                xuatXuId: event.target.value // Sửa ở đây
            }
        }));
    }
    thayDoiSanPhamIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamXuatXuUpdate: {
                ...prevState.sanPhamXuatXuUpdate,
                sanPhamId: event.target.value
            }
        }));
    }
    thayDoiXuatXuIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamXuatXuUpdate: {
                ...prevState.sanPhamXuatXuUpdate,
                xuatXuId: event.target.value // Sửa ở đây
            }
        }));
    }




    render() {
        console.log(this.state.sanPhamXuatXuUpdate);
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
                                                        <th>Xuất xứ </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.sanPhamXuatXu.map((spxx) => (
                                                        <tr key={spxx.id}>
                                                            <td>{spxx.sanPham.ten}</td>
                                                            {/* <td>{spxx.sanPham.ngayTao}</td> */}
                                                            <td>{spxx.sanPham.giaNhap}</td>
                                                            <td>{spxx.sanPham.giaBan}</td>
                                                            <td>{spxx.xuatXu.ten}</td>
                                                            <td>
                                                                <button onClick={() => this.delete(spxx.id)} className='btn btn-danger'>Xóa</button>
                                                                <button onClick={() => this.detail(spxx.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    <select name="sanPhamId" value={this.state.sanPhamXuatXuUpdate.sanPhamId} className="form-control" onChange={this.thayDoiSanPhamIdUpdate}>
                                                        <option value="">Chọn Sản Phẩm</option>
                                                        {this.state.sanPhams.map((sanPham) => (
                                                            <option key={sanPham.id} value={sanPham.id}>
                                                                {sanPham.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Xuất xứ</label>
                                                    <select name="xuatXuId" value={this.state.sanPhamXuatXuUpdate.xuatXuId} className="form-control" onChange={this.thayDoiXuatXuIdUpdate}>
                                                        <option value="">Chọn Xuất xứ</option>
                                                        {this.state.xuatXus.map((xuatXu) => (
                                                            <option key={xuatXu.id} value={xuatXu.id}>
                                                                {xuatXu.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Sản phẩm</label>
                                                    <select name="sanPhamId" className="form-control" onChange={this.thayDoiSanPhamIdAdd}>
                                                        <option value="">Chọn Sản phẩm</option>
                                                        {this.state.sanPhams.map((sanPham) => (
                                                            <option key={sanPham.id} value={sanPham.id}>
                                                                {sanPham.ten}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </div>

                                                <div className='form-group'>
                                                    <label>Xuất xứ</label>
                                                    <select name="xuatXuId" className="form-control" onChange={this.thayDoiXuatXuIdAdd}>
                                                        <option value="">Chọn Xuất xứ</option>
                                                        {this.state.xuatXus.map((xuatXu) => (
                                                            <option key={xuatXu.id} value={xuatXu.id}>
                                                                {xuatXu.ten}
                                                            </option>
                                                        ))}
                                                    </select>
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
export default SanPhamXuatXuComponent