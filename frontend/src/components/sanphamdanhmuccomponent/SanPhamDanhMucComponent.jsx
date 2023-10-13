import React, { Component } from 'react';
import danhmucservice from '../../services/sanphamdanhmucservice/sanphamdanhmucservice';
import { toast } from 'react-toastify';
import sanphamdanhmucservice from '../../services/sanphamdanhmucservice/sanphamdanhmucservice';

class SanPhamDanhMucComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sanPhamDanhMuc: [],
            sanPhamDanhMucAdd: {
                sanPhamId: '', // Sử dụng 'sanPhamId' và 'danhMucId' thay vì 'sanPhamId' hai lần
                danhMucId: '',
            },
            sanPhamDanhMucUpdate: {
                id: this.props.match.params.id,
                sanPhamId: '', // Sử dụng 'sanPhamId' và 'danhMucId' thay vì 'sanPhamId' hai lần
                danhMucId: '',
            },
            sanPhams: [],  // Thêm danh sách Sản phẩm vào state
            danhMucs: [],  // Thêm danh sách Danh mục vào state
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiSanPhamIdAdd = this.thayDoiSanPhamIdAdd.bind(this);
        this.thayDoiDanhMucIdAdd = this.thayDoiDanhMucIdAdd.bind(this);
        this.thayDoiSanPhamIdUpdate = this.thayDoiSanPhamIdUpdate.bind(this);
        this.thayDoiDanhMucIdUpdate = this.thayDoiDanhMucIdUpdate.bind(this);
    }

    componentDidMount() {
        this.loadSanPhamDanhMucData();
        this.loadDanhMucData();
        this.loadSanPhamData(); // Thêm dòng này để tải danh sách Sản phẩm
    }


    loadSanPhamData() {
        // Gọi API hoặc lấy danh sách Sản phẩm từ dữ liệu và lưu vào state
        // Ví dụ:
        sanphamdanhmucservice.getSanPham().then((res) => {
            this.setState({ sanPhams: res.data });
        });
    }

    loadDanhMucData() {
        // Gọi API hoặc lấy danh sách Danh mục từ dữ liệu và lưu vào state
        // Ví dụ:
        sanphamdanhmucservice.getDanhMuc().then((res) => {
            this.setState({ danhMucs: res.data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadSanPhamDanhMucData();
        }
    }

    loadSanPhamDanhMucData() {
        sanphamdanhmucservice.getSanPhamDanhMuc().then((res) => {
            console.log(res.data);
            this.setState({ sanPhamDanhMuc: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            danhmucservice.getSanPhamDanhMucById(id).then((res) => {
                this.setState({ sanPhamDanhMucUpdate: res.data });
            });
        }
    }


    delete(id) {
        danhmucservice.deleteSanPhamDanhMuc(id).then((res) => {
            console.log(res); // Xem phản hồi từ API
            if (res.status === 200) { // Kiểm tra nếu phản hồi là thành công
                this.setState({
                    sanPhamDanhMuc: this.state.sanPhamDanhMuc.filter(sanPhamDanhMuc => sanPhamDanhMuc.id !== id)
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
        let sanPhamDanhMuc = {
            sanPhamId: this.state.sanPhamDanhMucAdd.sanPhamId,
            danhMucId: this.state.sanPhamDanhMucAdd.danhMucId
        };

        danhmucservice.createSanPhamDanhMuc(sanPhamDanhMuc).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let sanPhamDanhMucMoi = res.data;
                this.setState(prevState => ({
                    sanPhamDanhMuc: [...prevState.sanPhamDanhMuc, sanPhamDanhMucMoi]
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
        let sanPhamDanhMuc = {
            sanPhamId: this.state.sanPhamDanhMucUpdate.sanPhamId,
            danhMucId: this.state.sanPhamDanhMucUpdate.danhMucId
        };
        console.log('nsx' + JSON.stringify(sanPhamDanhMuc));
        // let id = this.state.sanPhamDanhMucUpdate.id;
        danhmucservice.updateSanPhamDanhMuc(sanPhamDanhMuc, this.state.sanPhamDanhMucUpdate.id).then((res) => {
            let sanPhamDanhMucCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                sanPhamDanhMuc: prevState.sanPhamDanhMuc.map(dm =>
                    dm.id === sanPhamDanhMucCapNhat.id ? sanPhamDanhMucCapNhat : dm
                )
            }));
        })

    }
    detail(id) {
        const dmspSelected = this.state.sanPhamDanhMuc.find(dmsp => dmsp.id === id);
        console.log(dmspSelected); // Thêm dòng này
        if (dmspSelected) {
            this.setState({
                sanPhamDanhMucUpdate: {
                    id: dmspSelected.id,
                    sanPhamId: dmspSelected.sanPham.id,
                    danhMucId: dmspSelected.danhMuc.id
                }
            });
        }
    }

    thayDoiSanPhamIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamDanhMucAdd: {
                ...prevState.sanPhamDanhMucAdd,
                sanPhamId: event.target.value
            }
        }));
    }

    thayDoiDanhMucIdAdd = (event) => {
        this.setState(prevState => ({
            sanPhamDanhMucAdd: {
                ...prevState.sanPhamDanhMucAdd,
                danhMucId: event.target.value // Sửa ở đây
            }
        }));
    }
    thayDoiSanPhamIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamDanhMucUpdate: {
                ...prevState.sanPhamDanhMucUpdate,
                sanPhamId: event.target.value
            }
        }));
    }
    thayDoiDanhMucIdUpdate = (event) => {
        this.setState(prevState => ({
            sanPhamDanhMucUpdate: {
                ...prevState.sanPhamDanhMucUpdate,
                danhMucId: event.target.value // Sửa ở đây
            }
        }));
    }




    render() {
        console.log(this.state.sanPhamDanhMucUpdate);
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
                                                        <th>Ngày tạo</th>
                                                        <th>Giá nhập</th>
                                                        <th>Giá bán </th>
                                                        <th>Danh mục </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.sanPhamDanhMuc.map((dmsp) => (
                                                        <tr key={dmsp.id}>
                                                            <td>{dmsp.sanPham.ten}</td>
                                                            <td>{dmsp.sanPham.ngayTao}</td>
                                                            <td>{dmsp.sanPham.giaNhap}</td>
                                                            <td>{dmsp.sanPham.giaBan}</td>
                                                            <td>{dmsp.danhMuc.ten}</td>
                                                            <td>
                                                                <button onClick={() => this.delete(dmsp.id)} className='btn btn-danger'>Xóa</button>
                                                                <button onClick={() => this.detail(dmsp.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    <select name="sanPhamId" value={this.state.sanPhamDanhMucUpdate.sanPhamId} className="form-control" onChange={this.thayDoiSanPhamIdUpdate}>
                                                        <option value="">Chọn Danh mục</option>
                                                        {this.state.sanPhams.map((sanPham) => (
                                                            <option key={sanPham.id} value={sanPham.id}>
                                                                {sanPham.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Danh mục</label>
                                                    <select name="danhMucId" value={this.state.sanPhamDanhMucUpdate.danhMucId} className="form-control" onChange={this.thayDoiDanhMucIdUpdate}>
                                                        <option value="">Chọn Danh mục</option>
                                                        {this.state.danhMucs.map((danhMuc) => (
                                                            <option key={danhMuc.id} value={danhMuc.id}>
                                                                {danhMuc.ten}
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
                                                    <label>Danh mục</label>
                                                    <select name="danhMucId" className="form-control" onChange={this.thayDoiDanhMucIdAdd}>
                                                        <option value="">Chọn danh mục</option>
                                                        {this.state.danhMucs.map((danhMuc) => (
                                                            <option key={danhMuc.id} value={danhMuc.id}>
                                                                {danhMuc.ten}
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
export default SanPhamDanhMucComponent