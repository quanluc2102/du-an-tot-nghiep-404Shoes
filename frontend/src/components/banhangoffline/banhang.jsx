import React, { Component } from "react";
import axios from "axios";
import './banhangoff.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import {
    Col,
    Tabs,
    Input,
    Select,
    Flex,
    Switch,
    Button
} from "antd";
import { ProfileOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import BanHangService from "../../services/banhangservice/BanHangService";
import { Modal } from 'react-bootstrap';
let renderHDCT;
class BanHangOffline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ten: '',
            sdt: '',
            kieuHoaDon: '',
            sanPhamChiTietList: [],
            idKhachHang: '',
            searchTerm: '',
            searchTermKH: '',
            selectedPromotions: [],
            taiKhoan: [],
            khuyenMai: [],
            selectedProducts: [],
            sanPhamChiTiet: [],
            activeTabKey: '',
            tabList: [],
            diaChi: [],
            enteredAmount: 0,
            selectedRowKeys: [],
            showModal: false,
            showModal1: false,
            showModal2: false,
            showModal3: false,
            currentPage: 0,
            perPage: 4,
            currentPageKH: 0,
            perPageKH: 4,
            tabProducts: [],
            tabCustomers: {
                tabKey1: [],
                tabKey2: [],
                tabKey3: [],
                tabKey4: [],
                tabKey5: [],
            },
            checked: false,
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe: '',
            cities: [],
            districts: [],
            wards: [],
            currentSanPhamChiTietList: [],
        };
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.nextTabIndex = 0
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
    }

    componentDidMount() {
        // const { tabProducts, activeTabKey } = this.state;

        BanHangService.getSPCT().then((res) => {
            this.setState({ sanPhamChiTiet: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        BanHangService.getKMTT(parseInt("1000000000")).then((res) => {
            this.setState({ khuyenMai: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        BanHangService.getKhachHang().then((res) => {
            this.setState({ taiKhoan: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

        this.fetchCities();

        this.fetchHoaDonChoDauTien();
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.tinhThanhPho !== prevState.tinhThanhPho) {
            const { cities, tinhThanhPho } = this.state;
            const selectedCity = cities.find(city => city.name === tinhThanhPho);

            if (selectedCity) {
                this.fetchDistricts(selectedCity);
            }
        }

        if (this.state.quanHuyen !== prevState.quanHuyen) {
            const { districts, quanHuyen } = this.state;
            const selectedDistrict = districts.find(district => district.name === quanHuyen);

            if (selectedDistrict) {
                this.fetchWards(selectedDistrict);
            }
        }

        if (this.state.activeTabKey !== prevState.activeTabKey) {
            this.fetchHDCT(this.state.activeTabKey);
        }
    }

    getIdKhachHang(id) {
        this.setState({ idKhachHang: id });
    }

    addKH(id) {
        window.location.href = '/addKhachHang';

    }

    handleSearch = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });

        localStorage.setItem('searchTerm', searchTerm);
    }

    handleSearchKH = (event) => {
        const searchTermKH = event.target.value;
        this.setState({ searchTermKH });

        localStorage.setItem('searchTermKH', searchTermKH);
    }

    handleStatusFilter = (filterValue) => {
        this.setState({ searchTerm: filterValue });
    }

    formAdd() {
        window.location.href = (`/sanpham/formadd`);
    }

    filteredData = () => {
        const { sanPhamChiTiet, searchTerm } = this.state;

        return _.filter(sanPhamChiTiet, (item) => {
            const searchValues = (
                (item.sanPham.ten) + (item.soLuong) + (item.donGia) +
                (item.kichThuoc.giaTri) + (item.mauSac.ten) +
                (item.trangThai === 1 ? "Đang bán" : item.trangThai === 0 ? "Không bán" : "Chờ")
            ).toLowerCase();

            switch (searchTerm) {
                case "0":
                    return item.trangThai === 0;
                case "1":
                    return item.trangThai === 1;
                default:
                    return searchValues.includes(searchTerm.toLowerCase());
            }
        });
    }

    formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    filteredDataKH = () => {
        const { taiKhoan, searchTermKH } = this.state;

        return _.filter(taiKhoan, (item) => {
            const searchValues = (
                (item.thongTinNguoiDung.ten) + (item.thongTinNguoiDung.sdt)
            ).toLowerCase();

            switch (searchTermKH) {
                case "0":
                    return item.trangThai === 0;
                case "1":
                    return item.trangThai === 1;
                default:
                    return searchValues.includes(searchTermKH.toLowerCase());
            }
        });
    }

    reloadKM = () => {
        const { tabProducts, activeTabKey } = this.state;
        const selectedProducts = tabProducts[activeTabKey] || [];
        BanHangService.getKMTT(this.getTotalAmount(selectedProducts)).then((res) => {
            this.setState({ khuyenMai: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    async fetchCities() {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
            this.setState({ cities: response.data });
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    async fetchDistricts(selectedCity) {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`);
            const districtsData = response.data.districts;
            this.setState({ districts: districtsData });
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    }

    async fetchWards(selectedDistrict) {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
            const wardsData = response.data.wards;
            this.setState({ wards: wardsData });
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    }

    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        this.setState({
            tinhThanhPho: selectedCityName,
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity);
        }
    }

    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        this.setState({
            quanHuyen: selectedDistrictName,
        });

        if (selectedDistrict) {
            this.fetchWards(selectedDistrict);
        }
    }

    handleTenChange = (event) => {
        this.setState({ ten: event.target.value });
    };

    handleSdtChange = (event) => {
        this.setState({ sdt: event.target.value });
    };

    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState({ xaPhuongThiTran: selectedWardName });
    }

    handleAddress = async (diaChiCuThe, xaPhuongThiTran, quanHuyen, tinhThanhPho) => {
        this.setState({
            diaChiCuThe,
            tinhThanhPho
        }, () => {
            console.log('XaPhuongThiTran after setState:', this.state.xaPhuongThiTran);
            console.log('quanHuyen after setState:', this.state.quanHuyen);
        });

        this.setState({
            quanHuyen,
        });

        this.setState({
            xaPhuongThiTran,
        })
    };

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    handleShowModal = () => {
        this.setState({ showModal: true });
    };
    handleCloseModal1 = () => {
        this.setState({ showModal1: false });
    };
    handleShowModal1 = () => {
        this.setState({ showModal1: true });
    };
    handleCloseModal2 = () => {
        this.setState({ showModal2: false });
    };
    handleShowModal2 = () => {
        this.setState({ showModal2: true });
    };
    handleCloseModal3 = () => {
        this.setState({ showModal3: false });
    };
    handleShowModal3 = () => {
        this.setState({ showModal3: true });
    };

    handleSearchFocus = () => {
        this.setState({ currentPage: 0 });
    }

    handleSearchFocusKH = () => {
        this.setState({ currentPageKH: 0 });
    }

    handlePageClickKH = (data) => {
        this.setState({ currentPageKH: data.selected });
    }

    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    }

    getCurrentPageData = () => {
        const { sanPhamChiTiet, currentPage, perPage } = this.state;
        const offset = currentPage * perPage;
        return sanPhamChiTiet.slice(offset, offset + perPage);
    }

    add = async (e) => {
        e.preventDefault();

        const { tabProducts, activeTabKey, selectedPromotions } = this.state;
        const selectedProducts = tabProducts[activeTabKey] || [];
        const firstSelectedPromotion = selectedPromotions.length > 0 ? selectedPromotions[0] : null;
        // const activeTabProducts = tabProducts[activeTabKey] || [];

        // if (this.state.enteredAmount !== null && this.state.enteredAmount > 0 && this.state.enteredAmount - this.getTotalAmount(activeTabProducts) >= 0) {
        // const confirm = window.confirm('Bạn xác nhận muốn thanh toán hóa đơn này chứ?');
        // if (!confirm) {
        //     return;
        // }

        const thanhToan = {

            sanPhamChiTietList: selectedProducts,

            khuyenMai: firstSelectedPromotion ? firstSelectedPromotion : null,

            hoaDon: {
                tongTien: this.getTotalAmount(selectedProducts),
                ghiChu: document.getElementById("ghiChuDonHang").value,
            },

            xaPhuongThiTran: this.state.xaPhuongThiTran,

            quanHuyen: this.state.quanHuyen,

            tinhThanhPho: this.state.tinhThanhPho,

            diaChiCuThe: this.state.diaChiCuThe,

            kieuHoaDon: this.state.kieuHoaDon,

            // giaGiam: this.getTotalAmountWithoutPromotions(activeTabProducts) - this.getTotalAmount(activeTabProducts),

            sdt: document.getElementById("sdt").value,

            ten: document.getElementById("ten").value,
        };

        try {
            const response = await BanHangService.createHoaDon(thanhToan);

            if (response.status === 201) {
                toast.success("Thanh toán thành công!!!");
                console.log(response.status);
            } else {
                toast.success("Thanh toán thành công!!!!");
                console.log(thanhToan);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error('Thanh toán không thành công, vui lòng kiểm tra lại!!!.');
                console.log(thanhToan);
            } else {
                console.error('Error', error);
                console.log(thanhToan);
                toast.error('Thanh toán không thành công, vui lòng kiểm tra lại!!!');
            }
        }
    };

    onChangeEnteredAmount = (e) => {
        const enteredAmount = parseFloat(e.target.value) || 0;
        this.setState({ enteredAmount });
    };

    getTotalQuantity = (products) => {
        return products.reduce((total, product) => total + product.quantity, 0);
    };

    getTotalAmount = (products) => {
        let totalAmount = products.reduce((total, product) => total + product.donGia * product.quantity, 0);

        const { selectedPromotions } = this.state;

        selectedPromotions.forEach((promotionId) => {
            const promotion = this.state.khuyenMai.find((promo) => promo.id === promotionId);

            if (promotion) {
                if (promotion.kieuKhuyenMai === 1) {
                    totalAmount *= (100 - promotion.giamGia) / 100;
                } else if (promotion.kieuKhuyenMai === 0) {
                    totalAmount -= promotion.giamGia;
                }
            }
        });

        return totalAmount;
    };

    getTotalAmountWithoutPromotions = (products) => {
        return products.reduce((total, product) => total + product.donGia * product.quantity, 0);
    };

    handleTabChange = (idHoaDon) => {
        this.setState({ activeTabKey: idHoaDon }, () => {
        })
    };

    handleProductClick = async (productId, idHoaDon) => {

        if (idHoaDon === null || idHoaDon === undefined) {
            toast.warning("Hãy chọn hóa đơn để thêm sản phẩm vào!!!");
        } else {

            const UpdateHoaDonChiTietDTO = {
                sanPhamChiTiet: productId
            }
            if (idHoaDon === null || idHoaDon === undefined) {
                toast.warning("Hãy chọn hóa đơn để thêm sản phẩm vào!!!");
            } else {
                try {
                    const response = await axios.post(`http://localhost:8080/ban_hang/update_hdct/${idHoaDon}`, UpdateHoaDonChiTietDTO);
                    this.setState({ tabProducts: response.data }, () => {
                        console.log('Thêm sản phẩm thành công!!!', response.data);
                        if (response.status === 200) {
                            this.fetchDanhSachSP();
                            toast.success('Đã thêm sản phẩm vào giỏ hàng!!!');
                        }

                        this.handleCloseModal1();
                    });
                } catch (error) {
                    console.log('Error: ', error);
                }
            }
        }

    };

    handleAddUser = (userId, tabKey) => {
        const { tabCustomers } = this.state;
        const customers = tabCustomers[tabKey] || [];
        const isCustomerExist = customers.length > 0;
        this.getIdKhachHang(userId);

        this.setState({ ten: userId.ten }, () => { console.log("ten:", this.state.ten) })
        this.setState({ sdt: userId.sdt }, () => { console.log("sdt:", this.state.sdt) })

        console.log('Dữ liệu khách hàng: ', this.state.idKhachHang);

        if (isCustomerExist) {
            this.setState({
                tabCustomers: {
                    ...tabCustomers,
                    [tabKey]: [{ ...userId }],
                },
            }, () => {
                console.log("idKhachHang updated:", this.state.idKhachHang);
                toast.success("Đã cập nhật khách hàng", { position: toast.POSITION.MID_RIGHT, autoClose: true });
                this.handleCloseModal2();
            });
        } else {
            const newCustomer = { ...userId };
            const updatedCustomers = [...customers, newCustomer];

            this.setState(prevState => ({
                tabCustomers: {
                    ...prevState.tabCustomers,
                    [tabKey]: updatedCustomers,
                },
            }), () => {
                console.log("idKhachHang state updated:", this.state.idKhachHang);
                toast.success("Đã thêm khách hàng!!!", { position: toast.POSITION.MID_RIGHT });
                this.handleCloseModal2();
            });
        }
    };

    fetchHDCT = async (idHoaDon) => {
        try {
            if (idHoaDon === null || idHoaDon === undefined) {
                console.log('Không có ID!!!');
                return;
            }
            const response = await axios.get(`http://localhost:8080/ban_hang/hdct/${idHoaDon}`);
            const danhSachHDCT = response.data;
            this.setState({ tabProducts: danhSachHDCT });
        } catch (error) {
            console.log('Lỗi lấy dữ liệu!!!', error);
        }
    };

    fetchDanhSachSP = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/san_pham_chi_tiet/hien-thi`);
            this.setState({ sanPhamChiTiet: response.data }, () => {
                console.log('Du lieu spct: ', response.data);
            });
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    renderProductsForTab = (idHoaDon) => {

        const products = this.state.tabProducts || [];

        let path = require('./img/cart-empty.png')

        if (products.length === 0) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                    <img style={{ width: '400px', height: '300px' }} src={path} alt="" />
                    <p>Giỏ hàng trống</p>
                </div>
            )
        } else {
            return (
                products.map((product, index) => (
                    <Col key={index} style={{ backgroundColor: '#fff', height: '75px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                        <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }}>{index + 1}</Col>
                        <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                            <img style={{ height: '60px', width: '60px' }} src={`/niceadmin/img/${product.sanPhamChiTiet.anh}`} alt="" />
                        </Col>
                        <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.sanPhamChiTiet.mauSac.ten}</Col>
                        <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', }}>{product.sanPhamChiTiet.kichThuoc.giaTri}</Col>
                        <Col span={6} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', }}>{product.sanPhamChiTiet.sanPham.ten}</Col>
                        <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                            <input
                                type="number"
                                className="soLuong"
                                min="1"
                                style={{ width: '50px' }}
                                value={product.soLuong}
                                onChange={(e) => this.handleQuantityChange(e, product.ma)}
                            />
                        </Col>
                        <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{this.formatCurrency(product.sanPhamChiTiet.donGia)}</Col>
                        <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{this.formatCurrency(product.sanPhamChiTiet.donGia * product.soLuong)}</Col>
                        <Col span={1} style={{ transition: 'color 0.3s' }}>
                            <DeleteOutlined
                                onClick={() => this.onDelete(product.id, this.state.activeTabKey)}
                                style={{ cursor: 'pointer' }}
                                onMouseEnter={(e) => e.target.style.color = 'red'}
                                onMouseLeave={(e) => e.target.style.color = 'black'}
                            />
                        </Col>
                    </Col>
                ))
            )
        }
    };

    renderUserForTab = (tabKey) => {
        const { tabCustomers } = this.state;
        const customers = tabCustomers[tabKey] || [];
        return customers.map((customer) => {
            return (
                {}
            )
        });
    }

    handleQuantityChange = (e, productId) => {
        const newQuantity = parseInt(e.target.value, 10);
        const { sanPhamChiTiet } = this.state;
        console.log('newQuantity:', newQuantity);

        const selectedProduct = sanPhamChiTiet.find(product => product.ma === productId);
        console.log('selectedProduct:', selectedProduct);

        const limitedQuantity = Math.min(newQuantity, selectedProduct ? selectedProduct.soLuong : 1);

        this.setState((prevState) => {
            const { activeTabKey, tabProducts } = prevState;
            const updatedProducts = tabProducts[activeTabKey].map((product) => {
                if (product.ma === productId) {
                    return { ...product, quantity: limitedQuantity };
                }
                return product;
            });

            return {
                tabProducts: {
                    ...tabProducts,
                    [activeTabKey]: updatedProducts,
                },
            };
        });
    };

    fetchHoaDonCho = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ban_hang`);
            const danhSachHD = response.data;
            renderHDCT = await response.data[0].id;
            this.setState({ tabList: danhSachHD });
            console.log('Dữ liệu tabList:', renderHDCT);
        } catch (error) {
            console.log('Lỗi lấy dữ liệu!!!', error)
        }
    }

    fetchHoaDonChoDauTien = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ban_hang`);
            const danhSachHD = response.data;
            this.setState({ activeTabKey: response.data[0].id })
            this.setState({ tabList: danhSachHD });
            this.fetchHDCT(response.data[0].id);
        } catch (error) {
            console.log('Lỗi lấy dữ liệu!!!', error)
        }
    }

    addHoaDon = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/ban_hang/create`);
            console.log('Tạo hóa đơn thành công!!!', response.data);
            this.setState({ tabList: [...this.state.tabList, response.data] })
        } catch (error) {
            console.log('Không tạo được hóa đơn mới!!!', error);
        }
    }

    deleteHoaDonCho = async (idHoaDon) => {

        const deleteHoaDonDTO = {
            listHoaDonChiTiet: this.state.tabProducts
        }
        console.log(deleteHoaDonDTO);
        try {
            const response = await axios.put(`http://localhost:8080/ban_hang/delete/${idHoaDon}`, deleteHoaDonDTO || { listHoaDonChiTiet: [] });
            this.setState({ tabList: response.data });
            this.setState({ activeTabKey: response.data[0].id });
        } catch (error) {
            console.log('Xóa hóa đơn thất bại!!!', error);
        }
    }

    scrollToDeleteButton = () => {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.scrollIntoView({ behavior: 'smooth' });
    }

    onEdit = (tabKey, action) => {
        if (action === 'add' && this.state.tabList.length < 5) {

            this.addHoaDon();

            this.nextTabIndex += 1;

        } else if (action === 'remove') {
            this.scrollToDeleteButton();
            console.log('Button dieu huong!!!');
        } else if (action === 'add') {
            alert('Hàng chờ đã đầy');

        } else if (action === 'prev') {
            this.nextTabIndex -= 1;

        } else if (action === 'next') {

            this.nextTabIndex += 1;
        }
    };

    onDelete = async (hdctId, activeTabKey) => {

        if (activeTabKey !== null || activeTabKey !== undefined) {
            const DeleteHdctDTO = {
                hoaDonId: activeTabKey
            }
            console.log(DeleteHdctDTO);
            try {
                const response = await axios.put(`http://localhost:8080/ban_hang/delete_hdct/${hdctId}`, DeleteHdctDTO);
                this.setState({ tabProducts: response.data })
                console.log('Du lieu sau xoa: ', response.data);
            } catch (error) {
                console.log('Error: ', error);
            }
        } else {
            toast.error("Hãy chọn hóa đơn để xóa!!!!");
        }
    };

    onChangePay = value => {
        console.log('changed', value);
    };

    onChangeSwitch = () => {
        this.setState(
            (prevState) => ({ checked: !prevState.checked }),
            () => {
                console.log('checked', this.state.checked);

                if (this.state.checked) {
                    this.setState({ kieuHoaDon: 0 }, () => {
                        console.log('kieuHoaDon', this.state.kieuHoaDon);
                    });
                } else {
                    this.setState({ kieuHoaDon: 2 }, () => {
                        console.log('kieuHoaDon', this.state.kieuHoaDon);
                    });
                }
            }
        );
    };

    onChangeSearchInput = (selectedValues) => {
        const { selectedPromotion } = this.state;

        if (selectedValues.length > 0) {
            const newlySelectedPromotion = selectedValues[selectedValues.length - 1];

            if (selectedPromotion && selectedPromotion !== newlySelectedPromotion) {
                toast.error("Chỉ một mã khuyến mãi bạn chọn đầu tiên được áp dụng.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            this.setState({ selectedPromotion: newlySelectedPromotion });
        } else {
            this.setState({ selectedPromotion: null });
        }
        this.setState({ selectedPromotions: selectedValues });
    };

    getStatusCounts = () => {
        const { sanPhamChiTiet } = this.state;
        const statusCounts = {
            "": sanPhamChiTiet.length,
            "0": 0,
            "1": 0,
        };

        sanPhamChiTiet.forEach(item => {
            switch (item.trangThai) {
                case 0:
                case 1:

                    statusCounts[item.trangThai.toString()]++;
                    break;
                default:
                    statusCounts[""]++;
                    break;
            }
        });

        return statusCounts;
    }

    render() {
        const searchTerm = localStorage.getItem('searchTerm') || this.state.searchTerm;
        const statusCounts = this.getStatusCounts();
        const sanPhamList = this.filteredData();
        const { currentPage, perPage } = this.state;
        const offset = currentPage * perPage;
        const currentSanPhamChiTietList = sanPhamList.slice(offset, offset + perPage);
        const searchTermKH = localStorage.getItem('searchTermKH') || this.state.searchTermKH;
        const ListKH = this.filteredDataKH();
        const { currentPageKH, perPageKH } = this.state;
        const offsetKH = currentPageKH * perPageKH;
        const currentKHList = ListKH.slice(offsetKH, offsetKH + perPageKH);
        // const activeTabKey = this.state.activeTabKey;
        // const activeTabProducts = this.state.tabProducts[activeTabKey] || [];
        return (

            <div className="wrapper-sell">
                <br />
                <div className="content_sell">
                    <div className="content_sell_left">
                        <Tabs onChange={this.handleTabChange} activeKey={this.state.activeTabKey} type="editable-card" onEdit={this.onEdit}>
                            {this.state.tabList && this.state.tabList.map((tabinfo, index) => {
                                return (
                                    <Tabs.TabPane tab={<span><ProfileOutlined /> {tabinfo.maHoaDon}</span>}
                                        key={tabinfo.id}
                                        closable={index >= 0}
                                        forceRender={true}
                                    >
                                        <div style={{ overflowX: 'auto', overflowY: 'auto', width: '750px' }}>
                                            <Col style={{ backgroundColor: 'rgb(0,0,0,0.2)', height: '50px', padding: '10px', display: 'flex' }}>
                                                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }} >STT</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Ảnh SP</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Màu sắc</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Kích cỡ</Col>
                                                <Col span={6} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Tên SP</Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Số lượng</Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Đơn giá</Col>
                                                <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Thành tiền</Col>
                                            </Col>
                                            {this.renderProductsForTab(this.state.activeTabKey)}
                                        </div>
                                    </Tabs.TabPane>
                                )
                            })}
                        </Tabs>

                        <div><section className="section dashboard">
                            <hr />
                            <div>
                                <Button variant="btn btn-outline-primary" onClick={this.handleShowModal1}>
                                    Chọn sản phẩm
                                </Button>
                                <Modal show={this.state.showModal1} onHide={this.handleCloseModal1} backdrop="static" dialogClassName="custom-modal-size">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Chọn sản phẩm</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div><div className="row">
                                            <div className="col-2 container">
                                                <button className="btn btn-primary " style={{ margin: 10, }} onClick={this.formAdd}> <i className="bi bi-plus-circle"></i> Thêm sản phẩm </button>

                                                <input
                                                    type="text"
                                                    name="query"
                                                    placeholder="Tìm kiếm"
                                                    title="Enter search keyword"
                                                    value={searchTerm}
                                                    onChange={this.handleSearch}
                                                    onFocus={this.handleSearchFocus}
                                                />
                                            </div>
                                            <div className="col-7">
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="filterAll"
                                                        name="statusFilter"
                                                        value=""
                                                        checked={this.state.searchTerm === ""}
                                                        onChange={() => this.handleStatusFilter("")}
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="filterAll" className="form-check-label">Tất cả  <span className="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts[""]}</span></label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="filterPending"
                                                        name="statusFilter"
                                                        value="0"
                                                        checked={this.state.searchTerm === "0"}
                                                        onChange={() => this.handleStatusFilter("0")}
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="filterPending" className="form-check-label">Ngưng hoạt động  <span className="badge bg-danger translate-middle badge-number rounded-circle"></span></label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        id="filterPaid"
                                                        name="statusFilter"
                                                        value="4"
                                                        checked={this.state.searchTerm === "1"}
                                                        onChange={() => this.handleStatusFilter("1")}
                                                        className="form-check-input"
                                                    />
                                                    <label htmlFor="filterPaid" className="form-check-label">Đang hoạt động <span className="badge bg-danger translate-middle badge-number rounded-circle"></span></label>
                                                </div>
                                            </div>
                                        </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên SẢn Phẩm</th>
                                                        <th>Ảnh Sản Phẩm</th>
                                                        <th>Size</th>
                                                        <th>Màu Sắc</th>
                                                        <th>Số lượng</th>
                                                        <th>Đơn giá</th>
                                                        <th>Trạng thái</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentSanPhamChiTietList.map(
                                                            (sanPhamChiTiet, index) => {
                                                                const isSoLuongPositive = sanPhamChiTiet.soLuong > 0;
                                                                return (
                                                                    <tr key={sanPhamChiTiet.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{sanPhamChiTiet.sanPham.ten}</td>
                                                                        <td>{<img style={{ height: '60px', width: '60px', float: 'left' }} src={`/niceadmin/img/${sanPhamChiTiet.anh}`} alt="" />}</td>
                                                                        <td>{sanPhamChiTiet.kichThuoc.giaTri}</td>
                                                                        <td>{sanPhamChiTiet.mauSac.ten}</td>
                                                                        <td>{sanPhamChiTiet.soLuong}</td>
                                                                        <td>{sanPhamChiTiet.donGia}</td>
                                                                        <td>{sanPhamChiTiet.trangThai === 0 ? "Nghỉ bán" : "Đang bán"}</td>
                                                                        <td><button
                                                                            className={`btn ${isSoLuongPositive ? 'btn-outline-info' : 'btn-danger'}`}
                                                                            onClick={() => isSoLuongPositive && this.handleProductClick(sanPhamChiTiet, this.state.activeTabKey)}
                                                                            disabled={!isSoLuongPositive}
                                                                        >
                                                                            {isSoLuongPositive ? 'chọn' : 'Hết hàng'}
                                                                        </button></td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </tbody>
                                            </table>

                                            <ReactPaginate
                                                pageCount={Math.ceil(this.state.sanPhamChiTiet.length / this.state.perPage)}
                                                pageRangeDisplayed={5}
                                                marginPagesDisplayed={2}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={'pagination'}
                                                activeClassName={'active'}
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                            />
                                        </div>
                                        {this.popupContent}
                                    </Modal.Body>
                                </Modal>
                                <br />

                            </div></section>
                        </div>
                    </div>
                    <div className="content_sell_right">
                        <div>
                            <div className="checkbox_sell">
                                <span><Switch checked={this.state.checked} onChange={this.onChangeSwitch} />Giao hàng</span>
                            </div>

                            <Button variant="btn btn-outline-primary" onClick={this.handleShowModal2}>
                                Chọn khách hàng
                            </Button>
                            <Modal show={this.state.showModal2} onHide={this.handleCloseModal2} backdrop="static" dialogClassName="custom-modal-size">
                                <Modal.Header closeButton>
                                    <Modal.Title>Chọn khách hàng</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col-2 container">
                                            <button className="btn btn-primary " style={{ margin: 10 }} onClick={this.addKH}> Thêm khách hàng  </button>
                                            <input
                                                type="text"
                                                name="query"
                                                placeholder="Tìm kiếm"
                                                title="Enter search keyword"
                                                value={searchTermKH}
                                                onChange={this.handleSearchKH}
                                                onFocus={this.handleSearchFocusKH}
                                            />
                                        </div>
                                    </div>
                                    <table className="table table-borderless datatable">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Ảnh</th>
                                                <th>Tên Khách Hàng</th>
                                                <th>Số Điện Thoại</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentKHList.map((taiKhoan, index) => (
                                                <tr key={taiKhoan.id}>
                                                    <td>{index + 1}</td>
                                                    <td><img style={{ height: '60px', width: '60px', float: 'left' }} src={`/niceadmin/img/${taiKhoan.anh}`} alt="" /></td>
                                                    <td>{taiKhoan.thongTinNguoiDung.ten}</td>
                                                    <td>{taiKhoan.thongTinNguoiDung.sdt}</td>
                                                    <td><button onClick={() => this.handleAddUser(taiKhoan.thongTinNguoiDung, this.state.activeTabKey)} className="btn btn-outline-info">chọn</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <ReactPaginate
                                        pageCount={Math.ceil(this.state.taiKhoan.length / this.state.perPageKH)}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={2}
                                        onPageChange={this.handlePageClickKH}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                        previousLabel={"Previous"}
                                        nextLabel={"Next"}
                                    />
                                </Modal.Body>
                                {this.popupContent}
                            </Modal>
                            <br />
                            <br />
                            <label htmlFor="ten">Tên khách hàng:</label>
                            <input type="text" id="ten" name="ten" value={this.state.ten} placeholder="Nhập tên của khách hàng" required onChange={this.handleTenChange} /><br />
                            <br />
                            <label htmlFor="sdt">Số điện thoại:</label>
                            <input type="tel" id="sdt" name="sdt" value={this.state.sdt} placeholder="Nhập số điện thoại" pattern="[0-9]{10}" title="Số điện thoại phải có 10 chữ số" required onChange={this.handleSdtChange} /><br />
                            <br />


                            {this.state.checked === true ?
                                <div>
                                    <div>
                                        <div>
                                            <label htmlFor="tinhThanhPho">Tỉnh/Thành phố:</label>
                                            <select
                                                className="form-control"
                                                name="tinhThanhPho"
                                                onChange={(event) => this.handleCityChange(event)}
                                                value={this.state.tinhThanhPho}
                                            >
                                                <option>Chọn tỉnh thành</option>
                                                {this.state.cities.map(city => (
                                                    <option key={city.code} value={city.name}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="quanHuyen">Quận/Huyện:</label>
                                            <select
                                                className="form-control"
                                                name="quanHuyen"
                                                onChange={(event) => this.handleDistrictChange(event)}
                                                value={this.state.quanHuyen}
                                            >
                                                <option >Chọn quận huyện</option>
                                                {this.state.districts.map(district => (
                                                    <option key={district.code} value={district.name}>
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="xaPhuongThiTran">Xã/Phường/Thị trấn:</label>
                                            <select
                                                className="form-control"
                                                name="xaPhuongThiTran"
                                                onChange={(event) => this.handleWardChange(event)}
                                                value={this.state.xaPhuongThiTran}
                                            >
                                                <option >Chọn xã/phường/thị trấn</option>
                                                {this.state.wards.map(ward => (
                                                    <option key={ward.code} value={ward.name}>
                                                        {ward.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <label htmlFor="diaChiCuthe">Địa chỉ cụ thể : </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.diaChiCuThe}
                                            onChange={(event) => this.setState({ diaChiCuThe: event.target.value })}
                                        />
                                    </div>
                                </div> : null}

                            <div className="payment_sell">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Col>
                                        <Col style={{ fontSize: '16px', margin: '5px 0px 5px 0px' }}>Tổng tiền: ({this.getTotalQuantity(this.state.tabProducts)} sản phẩm)</Col>
                                        <Col style={{ fontSize: '16px' }}>Mã khuyến mãi: </Col>
                                        <Col style={{ fontSize: '16px', marginTop: '5px ' }}>Giảm giá:</Col>
                                        <Col style={{ fontSize: '16px' }}>Tiền khách đưa </Col>
                                    </Col>
                                    <Col style={{ width: '55%', borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}>
                                        {/* <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span style={{ color: 'red' }}>{this.formatCurrency(this.getTotalAmountWithoutPromotions(activeTabProducts))}</span></Col> */}
                                        <Col style={{ fontSize: '16px', textAlign: 'left' }}>
                                            <Select
                                                mode="tags"
                                                style={{ width: '100%', maxWidth: '500px' }}
                                                dropdownStyle={{ maxHeight: '300px', overflowY: 'auto', width: '350px' }}
                                                optionLabelProp="option.ma"
                                                onClick={() => this.reloadKM()}
                                                filterOption
                                                onChange={this.onChangeSearchInput}
                                                placeholder="Thêm khuyến mãi"
                                                options={this.state.khuyenMai.map((option, index) => ({
                                                    label: (
                                                        <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                                            <div style={{ color: 'red' }}>Cho hóa đơn tối thiểu :<b> {option.dieuKien} VND</b> </div>
                                                            <div >Mã giảm giá: {option.ma} <br /> {'Số lượng còn: '}{option.soLuong}</div>
                                                            <div > Giá trị: <b>{option.giamGia} {option.kieuKhuyenMai === 1 ? "%" : option.kieuKhuyenMai === 0 ? "VND" : ""}</b></div>
                                                            <div className={option.trangThai === 0 ? 'badge bg-warning text-dark' : option.trangThai === 1 ? 'badge bg-success' : 'badge bg-danger'}>{option.trangThai === 0
                                                                ? 'Chưa diễn ra'
                                                                : option.trangThai === 1
                                                                    ? 'Đang diễn ra'
                                                                    : 'Đã kết thúc'}</div>
                                                        </div>

                                                    ),
                                                    value: option.id,
                                                }))}
                                            />
                                        </Col>
                                        {/* <Col style={{ fontSize: '16px', textAlign: 'right', marginTop: '5px' }}>{this.formatCurrency(this.getTotalAmountWithoutPromotions(activeTabProducts) - this.getTotalAmount(activeTabProducts))}</Col> */}
                                        <Col style={{ fontSize: '16px', textAlign: 'right' }}><Input
                                            type="text"
                                            placeholder="Nhập tiền khách đưa..."
                                            style={{ width: '194px', float: 'left' }}
                                            onChange={this.onChangeEnteredAmount}
                                        /></Col>
                                    </Col>
                                </div>

                            </div>
                            <Col style={{ fontSize: '16px' }}>
                                Mã khuyến mãi:
                                {this.state.selectedPromotions.map((promoId) => {
                                    const promotion = this.state.khuyenMai.find((promo) => promo.id === promoId);
                                    return (
                                        <span key={promoId} className="red">
                                            {promotion ? ` ${promotion.ma}` : ''}
                                        </span>
                                    );
                                })}
                            </Col>
                            <Flex style={{ marginTop: '10px', marginBottom: '10px', borderStyle: 'solid', borderWidth: '1px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', paddingBottom: '10px' }} justify="space-between" wrap="wrap" gap={"small"} align="center">
                                {this.state.priceDemo && this.state.priceDemo.map((item, index) => {
                                    return (
                                        <Button key={index} style={{ width: '120px', color: 'black', backgroundColor: 'rgba(0,0,0,0.02)' }} shape="round">{item}</Button>
                                    )
                                })}
                            </Flex>
                            <Flex flex={"row"} align="center" justify="space-between">
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Tiền thừa trả khách</p>
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    {/* {this.state.enteredAmount >= this.getTotalAmount(activeTabProducts) ? (
                                        <span style={{ color: 'red' }}>
                                            Dư {this.formatCurrency(this.state.enteredAmount - this.getTotalAmount(activeTabProducts))}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            Thiếu {this.formatCurrency(this.getTotalAmount(activeTabProducts) - this.state.enteredAmount)}
                                        </span>
                                    )} */}
                                </p>
                            </Flex>
                        </div>
                        <div>
                            <Input id="ghiChuDonHang" placeholder="Nhập ghi chú đơn hàng" />
                            <br />
                            <br />
                            <Flex justify="space-between">
                                <Button icon={<></>} className="customButton" style={{ width: '40%', height: '70px', backgroundColor: 'white', color: 'black', fontWeight: 'bolder', borderColor: 'black', fontSize: '20px' }}>In tạm tính</Button>
                                <Button className="customButton" style={{ width: '55%', height: '70px', backgroundColor: 'white', color: 'black', fontWeight: 'bolder', borderColor: 'black', fontSize: '20px' }} onClick={this.add}>Thanh toán</Button>
                                <Button
                                    id="deleteButton"
                                    className="customButton"
                                    style={{
                                        width: '55%',
                                        height: '70px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        fontWeight: 'bolder',
                                        borderColor: 'black',
                                        fontSize: '20px',
                                    }}
                                    onClick={() => this.deleteHoaDonCho(this.state.activeTabKey)}
                                >
                                    Xóa Hóa Đơn
                                </Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BanHangOffline;