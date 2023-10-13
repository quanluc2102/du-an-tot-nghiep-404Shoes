import React, { Component } from 'react';
import { toast } from 'react-toastify';
import kichthuocmausacservice from '../../services/kichthuocmausacservice/kichthuocmausacservice';
// import KichThuocService1 from '../../services/sanphamservice/KichThuocService1';
// import xuatxuservice from '../../services/xuatxuservice/xuatxuservice';

class KichThuocMauSacComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kichThuocMauSac: [],
            kichThuocMauSacAdd: {
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            kichThuocMauSacUpdate: {
                id: this.props.match.params.id,
                mauSacId: '', // Sử dụng 'mauSacId' và 'kichThuocId' thay vì 'mauSacId' hai lần
                kichThuocId: '',
                trangThai: ''
            },
            kichThuocs: [],  // Thêm danh sách Kích thước vào state
            mauSacs: [],  // Thêm danh sách Thương Hiệu vào state
        }

        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
        this.update = this.update.bind(this);
        this.detail = this.detail.bind(this);
        this.thayDoiKichThuocIdAdd = this.thayDoiKichThuocIdAdd.bind(this);
        this.thayDoiMauSacIdAdd = this.thayDoiMauSacIdAdd.bind(this);
        this.thayDoiKichThuocIdUpdate = this.thayDoiKichThuocIdUpdate.bind(this);
        this.thayDoiMauSacIdUpdate = this.thayDoiMauSacIdUpdate.bind(this);
        this.thayDoiTrangThaiAdd = this.thayDoiTrangThaiAdd.bind(this);
        this.thayDoiTrangThaiUpdate = this.thayDoiTrangThaiUpdate.bind(this);
    }

    componentDidMount() {
        this.loadKichThuocMauSacData();
        this.loadMauSacData();
        this.loadKichThuocData(); // Thêm dòng này để tải danh sách Kích thước
    }


    loadKichThuocData() {
        // Gọi API hoặc lấy danh sách Kích thước từ dữ liệu và lưu vào state
        kichthuocmausacservice.getKichThuoc().then((res) => {
            this.setState({ kichThuocs: res.data });
        });
    }

    loadMauSacData() {
        // Gọi API hoặc lấy danh sách Thương Hiệu từ dữ liệu và lưu vào state
        kichthuocmausacservice.getMauSac().then((res) => {
            this.setState({ mauSacs: res.data });
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.loadKichThuocMauSacData();
        }
    }

    loadKichThuocMauSacData() {
        kichthuocmausacservice.getKichThuocMauSac().then((res) => {
            console.log(res.data);
            this.setState({ kichThuocMauSac: res.data });
        });

        const id = this.props.match.params.id;
        if (id) {
            kichthuocmausacservice.getKichThuocMauSacById(id).then((res) => {
                this.setState({ kichThuocMauSacUpdate: res.data });
            });
        }
    }


    delete(id) {
        kichthuocmausacservice.deleteKichThuocMauSac(id).then((res) => {
            console.log(res); // Xem phản hồi từ API
            if (res.status === 200) { // Kiểm tra nếu phản hồi là thành công
                this.setState({
                    kichThuocMauSac: this.state.kichThuocMauSac.filter(kichThuocMauSac => kichThuocMauSac.id !== id)
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
        let kichThuocMauSac = {
            mauSacId: this.state.kichThuocMauSacAdd.mauSacId,
            kichThuocId: this.state.kichThuocMauSacAdd.kichThuocId,
            trangThai: this.state.kichThuocMauSacAdd.trangThai
        };

        console.log(kichThuocMauSac)

        kichthuocmausacservice.createKichThuocMauSac(kichThuocMauSac).then((res) => {
            if (res.status === 200) {
                // Xử lý khi thêm thành công
                let kichThuocMauSacMoi = res.data;
                this.setState(prevState => ({
                    kichThuocMauSac: [...prevState.kichThuocMauSac, kichThuocMauSacMoi]
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
        let kichThuocMauSac = {
            mauSacId: this.state.kichThuocMauSacUpdate.mauSacId,
            kichThuocId: this.state.kichThuocMauSacUpdate.kichThuocId,
            trangThai: this.state.kichThuocMauSacUpdate.trangThai
        };
        console.log('nsx' + JSON.stringify(kichThuocMauSac));
        // let id = this.state.kichThuocMauSacUpdate.id;
        kichthuocmausacservice.updateKichThuocMauSac(kichThuocMauSac, this.state.kichThuocMauSacUpdate.id).then((res) => {
            let kichThuocMauSacCapNhat = res.data; // Giả sử API trả về đối tượng vừa được cập nhật
            this.setState(prevState => ({
                kichThuocMauSac: prevState.kichThuocMauSac.map(dm =>
                    dm.id === kichThuocMauSacCapNhat.id ? kichThuocMauSacCapNhat : dm
                )
            }));
        })

    }
    detail(id) {
        const spthSelected = this.state.kichThuocMauSac.find(ktms => ktms.id === id);
        console.log(spthSelected); // Thêm dòng này
        if (spthSelected) {
            this.props.history.push(`/kichthuocmausacdetail/${id}`)
            this.setState({
                kichThuocMauSacUpdate: {
                    id: spthSelected.id,
                    mauSacId: spthSelected.mauSac.id,
                    kichThuocId: spthSelected.kichThuoc.id,
                    trangThai: spthSelected.trangThai,
                },
            });
            
        }
        
    }

    thayDoiKichThuocIdAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                kichThuocId: event.target.value
            }
        }));
    }

    thayDoiKichThuocIdUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                kichThuocId: event.target.value
            }
        }));
    }

    thayDoiTrangThaiAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                trangThai: event.target.value // Sửa ở đây
            }
        }));
    }
    thayDoiTrangThaiUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                trangThai: event.target.value // Sửa ở đây
            }
        }));
    }
    thayDoiMauSacIdAdd = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacAdd: {
                ...prevState.kichThuocMauSacAdd,
                mauSacId: event.target.value
            }
        }));
    }
    thayDoiMauSacIdUpdate = (event) => {
        this.setState(prevState => ({
            kichThuocMauSacUpdate: {
                ...prevState.kichThuocMauSacUpdate,
                mauSacId: event.target.value // Sửa ở đây
            }
        }));
    }




    render() {
        // console.log(this.state.kichThuocMauSacUpdate);
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
                                                        {/* <th>Tên</th> */}
                                                        {/* <th>Ngày tạo</th> */}
                                                        <th>Màu sắc</th>
                                                        <th>Kích thước </th>
                                                        <th>Trạng thái </th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.kichThuocMauSac.map((ktms) => (
                                                        <tr key={ktms.id}>
                                                            <td>{ktms.mauSac.ten}</td>
                                                            {/* <td>{ktms.kt.ngayTao}</td> */}
                                                            <td>{ktms.kichThuoc.giaTri}</td>
                                                            <td>{ktms.trangThai}</td>
                                                            <td>
                                                                <button onClick={() => this.delete(ktms.id)} className='btn btn-danger'>Xóa</button>
                                                                <button onClick={() => this.detail(ktms.id)} className='btn btn-primary'>Chi tiết</button>
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
                                                    <label>Kích thước</label>
                                                    <select name="kichThuocId" value={this.state.kichThuocMauSacUpdate.kichThuocId} className="form-control" onChange={this.thayDoiKichThuocIdUpdate}>
                                                        <option value="">Chọn kích thước</option>
                                                        {this.state.kichThuocs.map((kt) => (
                                                            <option key={kt.id} value={kt.id}>
                                                                {kt.giaTri}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Màu sắc</label>
                                                    <select name="mauSacId" value={this.state.kichThuocMauSacUpdate.mauSacId} className="form-control" onChange={this.thayDoiMauSacIdUpdate}>
                                                        <option value="">Chọn Màu sắc</option>
                                                        {this.state.mauSacs.map((ms) => (
                                                            <option key={ms.id} value={ms.id}>
                                                                {ms.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        // value={this.state.xuatXuUpdate.trangThai}
                                                        onChange={this.thayDoiTrangThaiUpdate}
                                                        className="form-control"
                                                    >
                                                        <option value='1'>Còn</option>
                                                        <option value="2">Ko còn</option>
                                                    </select>
                                                </div>
                                                <input type="submit" className="btn btn-primary" value="Update" style={{ marginTop: '10px' }} onClick={this.update} />
                                            </form>
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <form>
                                                <div className='form-group'>
                                                    <label>Kích thước</label>
                                                    <select name="kichThuocId" className="form-control" onChange={this.thayDoiKichThuocIdAdd}>
                                                        <option value="">Chọn Kích thước</option>
                                                        {this.state.kichThuocs.map((kt) => (
                                                            <option key={kt.id} value={kt.id}>
                                                                {kt.giaTri}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </div>

                                                <div className='form-group'>
                                                    <label>Màu sắc</label>
                                                    <select name="mauSacId" className="form-control" onChange={this.thayDoiMauSacIdAdd}>
                                                        <option value="">Chọn Màu sắc</option>
                                                        {this.state.mauSacs.map((ms) => (
                                                            <option key={ms.id} value={ms.id}>
                                                                {ms.ten}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className='form-group'>
                                                    <label>Trạng thái</label>
                                                    <select
                                                        name="trangThai"
                                                        id="trangThai"
                                                        // value={this.state.xuatXuUpdate.trangThai}
                                                        onChange={this.thayDoiTrangThaiAdd}
                                                        className="form-control"
                                                    >
                                                        <option value='0'>Còn</option>
                                                        <option value="1">Ko còn</option>
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
export default KichThuocMauSacComponent