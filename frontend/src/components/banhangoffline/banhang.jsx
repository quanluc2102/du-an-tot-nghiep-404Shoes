// xử lý thêm khách hàng vào hoá đơn
// css lại trang
// xử lý số lượng trong chọn sản phẩm
import React, { Component } from "react";
import axios from "axios";
import './banhangoff.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import {
    Col,
    Table,
    Tabs,
    Input,
    Select,
    Space,
    // Checkbox,
    Row,
    InputNumber,
    Flex,
    Switch
} from "antd";
import { ProfileOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";
import BanHangService from "../../services/banhangservice/BanHangService";
import QrScanner from 'react-qr-scanner';
import { Modal, Button } from 'react-bootstrap';

const { Search } = Input;
class BanHangOffline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            searchTermKH: '',
            selectedPromotions: [],
            taiKhoan: [],
            khuyenMai: [],
            selectedProducts: [],
            sanPhamChiTiet: [],
            activeTabKey: 'tabKey1',
            tabList: [
                {
                    tab: 'Đơn hàng 1',
                    key: 'tabKey1',
                },
            ],
            enteredAmount: 0,
            selectedRowKeys: [],
            loading: false,
            sanPhamChiTietList: [],
            isQRReaderOn: false,
            showModal: false,
            showModal1: false,
            showModal2: false,
            currentPage: 0, // Trang hiện tại
            perPage: 4,
            currentPageKH: 0, // Trang hiện tại
            perPageKH: 4,
            result: 'No QR code scanned yet',

            tabProducts: {
                tabKey1: [],
                tabKey2: [],
                tabKey3: [],
                tabKey4: [],
                tabKey5: [],
            },
            checked: false,
            inputValue: '',
            customerDetail: [],
            name: '',
            phone: '',
            tinhThanhPho: '',
            quanHuyen: '',
            xaPhuongThiTran: '',
            diaChiCuThe: '',
            cities: [],
            districts: [],
            wards: [],
            diaChi: [],
        };
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.nextTabIndex = 0
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        // this.thayDoiDiaChiUpdate = this.thayDoiDiaChiUpdate.bind(this);
        // this.thayDoiTinhUpdate = this.thayDoiTinhUpdate.bind(this);
        // this.thayDoiHuyenUpdate = this.thayDoiHuyenUpdate.bind(this);
        // this.thayDoiXaUpdate = this.thayDoiXaUpdate.bind(this);
        // this.handleCityChange = this.handleCityChange.bind(this);
        // this.handleDistrictChange = this.handleDistrictChange.bind(this);
        // this.handleWardChange = this.handleWardChange.bind(this);
    }

    componentDidMount() {
        const { tabProducts, activeTabKey } = this.state;
        const selectedProducts = tabProducts[activeTabKey] || [];
        console.log(this.getTotalAmount(selectedProducts))
        BanHangService.getSPCT().then((res) => {
            this.setState({ sanPhamChiTiet: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
        BanHangService.getKMTT(100000000000).then((res) => {
            this.setState({ khuyenMai: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
        BanHangService.getKhachHang().then((res) => {
            this.setState({ taiKhoan: res.data })
            console.log('user', this.state.taiKhoan)
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }
    addKH(id) {
        window.location.href = '/addKhachHang';

    }
    handleSearch = (event) => {
        const searchTerm = event.target.value;
        this.setState({ searchTerm });

        // Lưu trạng thái tìm kiếm vào localStorage
        localStorage.setItem('searchTerm', searchTerm);
    }
    handleSearchKH = (event) => {
        const searchTermKH = event.target.value;
        this.setState({ searchTermKH });

        // Lưu trạng thái tìm kiếm vào localStorage
        localStorage.setItem('searchTermKH', searchTermKH);
    }
    handleStatusFilter = (filterValue) => {
        this.setState({ searchTerm: filterValue });
    }
    formAdd(){
        window.location.href=(`/sanpham/formadd`);
    }
    filteredData = () => {
        const { sanPhamChiTiet, searchTerm } = this.state;

        return _.filter(sanPhamChiTiet, (item) => {
            // Combine the values of the columns you want to search in
            const searchValues = (
                (item.sanPham.ten) + (item.soLuong) + (item.donGia) +
                (item.kichThuoc.giaTri) + (item.mauSac.ten) +
                (item.trangThai === 1 ? "Đang bán" : item.trangThai === 0 ? "Không bán" : "Chờ")
            ).toLowerCase();

            switch (searchTerm) {
                case "0":
                    return item.trangThai == 0;
                case "1":
                    return item.trangThai == 1;
                default:
                    return searchValues.includes(searchTerm.toLowerCase());
            }
        });
    }
    filteredDataKH = () => {
        const { taiKhoan, searchTermKH } = this.state;

        return _.filter(taiKhoan, (item) => {
            // Combine the values of the columns you want to search in
            const searchValues = (
                (item.thongTinNguoiDung.ten) + (item.thongTinNguoiDung.sdt)
            ).toLowerCase();

            switch (searchTermKH) {
                case "0":
                    return item.trangThai == 0;
                case "1":
                    return item.trangThai == 1;
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

    fetchCities() {
        axios.get('https://provinces.open-api.vn/api/?depth=1')
            .then((response) => {
                this.setState({ cities: response.data });
                console.log('cities', this.state.cities);
            })
            .catch((error) => {
                console.error('Error fetching cities:', error);
            });
    }

    fetchDistricts(selectedCity) {
        axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`)
            .then((response) => {
                this.setState({ districts: response.data.districts });
            })
            .catch((error) => {
                console.error('Error fetching districts:', error);
            });
    }

    fetchWards(selectedDistrict) {
        axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`)
            .then((response) => {
                this.setState({ wards: response.data.wards });
            })
            .catch((error) => {
                console.error('Error fetching wards:', error);
            });
    }

    handleCityChange(event) {
        const selectedCityName = event.target.value;
        const selectedCity = this.state.cities.find(city => city.name === selectedCityName);

        this.setState({
            tinhThanhPho: selectedCityName,
        });

        if (selectedCity) {
            this.fetchDistricts(selectedCity); // Chỉ thực hiện fetchDistricts nếu có dữ liệu cho selectedCity
        }
    }

    handleDistrictChange(event) {
        const selectedDistrictName = event.target.value;
        const selectedDistrict = this.state.districts.find(district => district.name === selectedDistrictName);

        this.setState({
            quanHuyen: selectedDistrictName,
        });

        if (selectedDistrict) {
            this.fetchWards(selectedDistrict); // Chỉ thực hiện fetchWards nếu có dữ liệu cho selectedDistrict
        }
    }

    handleWardChange(event) {
        const selectedWardName = event.target.value;
        this.setState({ xaPhuongThiTran: selectedWardName });
    }

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
    handleError = (err) => {
        console.error(err);
    };
    toggleQRReader = () => {
        this.setState((prevState) => ({
            isQRReaderOn: !prevState.isQRReaderOn,
            isQRCodeScanned: false,
            result: 'No QR code scanned yet',
        }));
    };
    handleSearchFocus = () => {
        // Đặt trang hiện tại về 0 để nhảy về trang đầu tiên
        this.setState({ currentPage: 0 });
    }
    handleSearchFocusKH = () => {
        // Đặt trang hiện tại về 0 để nhảy về trang đầu tiên
        this.setState({ currentPageKH: 0 });
    }
    handleScan = (data) => {
        const { isQRCodeScanned, selectedProducts, sanPhamChiTiet } = this.state;

        if (data && data.text && typeof data.text === 'string' && !isQRCodeScanned) {

            this.setState({ isQRCodeScanned: true });


            const slicedMaQR = data.text.slice(5);


            const existingProduct = selectedProducts.find(product => product.ma === slicedMaQR);

            if (!existingProduct) {

                const productToAdd = sanPhamChiTiet.find(product => product.ma === slicedMaQR);

                if (productToAdd) {
                    const updatedSelectedProducts = [...selectedProducts, { ...productToAdd, quantity: 1 }];
                    this.setState({ selectedProducts: updatedSelectedProducts, showModal: false });
                } else {
                    console.error("Product not found with ma:", slicedMaQR);
                }
            }

            setTimeout(() => {
                this.setState({ isQRCodeScanned: false });
            }, 1000);
        }
    };
    handlePageClickKH = (data) => {
        this.setState({ currentPage: data.selected });
    }
    handlePageClick = (data) => {
        this.setState({ currentPageKH: data.selected });
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


        const confirm = window.confirm('Bạn xác nhận muốn thanh toán hóa đơn này chứ?');
        if (!confirm) {
            return;
        }

        const ngayTao = new Date().toISOString();

        const thanhToan = {

            sanPhamChiTietList: selectedProducts,

            khuyenMai: firstSelectedPromotion ? firstSelectedPromotion : null,

            hoaDon: {
                tongTien: this.getTotalAmount(selectedProducts),
                ghiChu: document.getElementById("ghiChuDonHang").value,
            },
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
                toast.error('Lỗi dữ liệu không hợp lệ, vui lòng kiểm tra lại.');
                console.log(thanhToan);
            } else {
                console.error('Error', error);
                console.log(thanhToan);
                toast.error('Có lỗi khi thanh toán, vui lòng thử lại!!!!');
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

        // Apply discounts based on selected promotions
        const { selectedPromotions } = this.state;

        selectedPromotions.forEach((promotionId) => {
            const promotion = this.state.khuyenMai.find((promo) => promo.id === promotionId);

            if (promotion) {
                if (promotion.kieuKhuyenMai === 1) {
                    // Discount by percentage
                    totalAmount *= (100 - promotion.giamGia) / 100;
                } else if (promotion.kieuKhuyenMai === 0) {
                    // Discount by fixed amount
                    totalAmount -= promotion.giamGia;
                }
            }
        });

        return totalAmount;
    };

    handlePayment = () => {
        this.closeCurrentTab();
    }

    closeCurrentTab = () => {
        const { tabList } = this.state;
        const activeTabKey = tabList.find(tab => tab.active)?.key;
        if (activeTabKey) {
            this.onEdit(activeTabKey, 'remove');
        }
    }

    addToCurrentTab = (product, tabKey) => {
        const { tabList } = this.state;
        console.log(product, tabKey)

        const updatedTabList = tabList.map(tab => {
            if (tab.key === tabKey) {
                const updatedProducts = tab.products ? [...tab.products, product] : [product];
                return {
                    ...tab,
                    products: updatedProducts
                };
            }
            return tab;
        });

        this.setState({ tabList: updatedTabList });
        console.log(tabList)
    };

    handleTabChange = (activeKey) => {
        this.setState({ activeTabKey: activeKey })
    }


    // handleProductClick = (productId, tabKey) => {

    //     const { tabProducts } = this.state;
    //     const products = tabProducts[tabKey] || [];
    //     const selectedProduct = products.find(item => item.id === productId.id);

    //     if (selectedProduct) {
    //         const updatedProducts = products.map(item =>
    //             item.id === productId.id ? { ...item, quantity: item.quantity + 1 } : item
    //         );
    //         this.setState(prevState => ({
    //             tabProducts: {
    //                 ...prevState.tabProducts,
    //                 [tabKey]: updatedProducts,
    //             },
    //         }));
    //         const updatedSanPhamChiTiet = { ...selectedProduct };
    //         updatedSanPhamChiTiet.soLuong -= 1; // Giảm đi 1
    //         const updatedSanPhamChiTietList = currentSanPhamChiTietList.map(item =>
    //             item.id === productId.id ? updatedSanPhamChiTiet : item
    //         );
    //     } else {
    //         const newSelectedProduct = { ...productId, quantity: 1 };
    //         const updatedProducts = [...products, newSelectedProduct];
    //         this.setState(prevState => ({
    //             tabProducts: {
    //                 ...prevState.tabProducts,
    //                 [tabKey]: updatedProducts,
    //             },
    //         }));
    //     }
    //     toast.success("Đã thêm vào giỏ", { position: toast.POSITION.MID_RIGHT });

    //     // Sau khi xử lý, đóng cửa sổ modal
    //     this.handleCloseModal1();
    // };

    handleProductClick = (productId, tabKey) => {
        const { tabProducts } = this.state;
        const products = tabProducts[tabKey] || [];
        const selectedProduct = products.find(item => item.id === productId.id);

        if (selectedProduct) {
            const updatedProducts = products.map(item =>
                item.id === productId.id ? { ...item, quantity: item.quantity + 1 } : item
            );

            // Giảm số lượng sản phẩm trong sản phẩm chi tiết khi thêm vào giỏ hàng
            const updatedSanPhamChiTiet = { ...productId };
            updatedSanPhamChiTiet.soLuong -= 1; // Giảm số lượng đi 1

            const updatedSanPhamChiTietList = products.map(item =>
                item.ma === productId.ma
                    ? { ...item, quantity: item.quantity + 1, soLuong: item.soLuong - 1 }
                    : item
            );

            this.setState(prevState => ({
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts,
                },
                products: updatedSanPhamChiTietList,
            }));

            toast.success("Đã thêm vào giỏ", { position: toast.POSITION.MID_RIGHT });
            this.handleCloseModal1();
        } else {
            const newSelectedProduct = { ...productId, quantity: 1 };
            const updatedProducts = [...products, newSelectedProduct];
            this.setState(prevState => ({
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts,
                },
            }));

            toast.success("Đã thêm vào giỏ", { position: toast.POSITION.MID_RIGHT });
            this.handleCloseModal1();
        }
    };

    renderProductsForTab = (tabKey) => {
        const { tabProducts } = this.state;
        const products = tabProducts[tabKey] || [];

        return products.map((product, index) => (
            <Col key={index} style={{ backgroundColor: '#fff', height: '75px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }}>{index + 1}</Col>
                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                    <img style={{ height: '60px', width: '60px' }} src={`/niceadmin/img/${product.anh}`} />
                </Col>
                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.mauSac.ten}</Col>
                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', }}>{product.kichThuoc.giaTri}</Col>
                <Col span={6} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', }}>{product.sanPham.ten}</Col>
                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                    <input
                        type="number"
                        className="soLuong"
                        min="1"
                        style={{ width: '50px' }}
                        value={product.quantity}
                        onChange={(e) => this.handleQuantityChange(e, product.ma)}
                    />
                </Col>
                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.donGia} VND</Col>
                <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.donGia * product.quantity} VND</Col>
                <Col span={1} style={{ transition: 'color 0.3s' }}>
                    <DeleteOutlined
                        onClick={() => this.onDelete(tabKey, product.ma)}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={(e) => e.target.style.color = 'red'}
                        onMouseLeave={(e) => e.target.style.color = 'black'}
                    />
                </Col>
            </Col>
        ));
    };
    handleQuantityChange = (e, productId) => {
        const newQuantity = parseInt(e.target.value, 10);

        this.setState((prevState) => {
            const { activeTabKey, tabProducts } = prevState; // Access activeTabKey from prevState
            // Update the quantity in the state for the specific product
            const updatedProducts = tabProducts[activeTabKey].map((product) => {
                if (product.ma === productId) {
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
            // Update the state with the modified products
            return {
                tabProducts: {
                    ...tabProducts,
                    [activeTabKey]: updatedProducts,
                },
            };
        });
    };
    onEdit = (tabKey, action) => {
        if (action === 'add' && this.state.tabList.length < 5) {
            this.setState(prevState => ({
                tabList: [
                    ...prevState.tabList,
                    {
                        tab: `Đơn hàng ${this.nextTabIndex + 1}`,
                        key: `${this.nextTabIndex}`
                    }
                ]
            }));
            this.nextTabIndex += 1;
        } else if (action === 'remove') {

            const tabIndexToRemove = this.state.tabList.findIndex(tab => tab.key === tabKey);

            if (tabIndexToRemove !== -1) {

                const newTabList = [...this.state.tabList];
                newTabList.splice(tabIndexToRemove, 1);

                this.setState({ tabList: newTabList });

                if (newTabList.length === 0) {
                    this.nextTabIndex = 0;
                }
            }
        } else if (action === 'add') {
            alert('Hàng chờ đã đầy');
        } else if (action === 'prev') {
            this.nextTabIndex -= 1;
        } else if (action === 'next') {
            this.nextTabIndex += 1;
        }
    };

    // onDelete = (tabKey, productId) => {
    //     this.setState((prevState) => {
    //         const updatedProducts = prevState.tabProducts[tabKey].map((product) => {
    //             if (product.ma === productId) {

    //                 const newQuantity = Math.max(product.quantity - 1, 0);

    //                 return newQuantity > 0 ? { ...product, quantity: newQuantity } : null;
    //             }
    //             return product;
    //         });

    //         const updatedTabList = prevState.tabList.map((tab) => {
    //             if (tab.key === tabKey) {

    //                 return {
    //                     ...tab,
    //                     products: updatedProducts.filter((product) => product && product.quantity > 0),
    //                 };
    //             }
    //             return tab;
    //         });

    //         return {
    //             tabProducts: {
    //                 ...prevState.tabProducts,
    //                 [tabKey]: updatedProducts.filter((product) => product && product.quantity > 0),
    //             },
    //             tabList: updatedTabList,
    //         };
    //     });
    // };

    onDelete = (tabKey, productId) => {
        this.setState(prevState => {
            const updatedProducts = prevState.tabProducts[tabKey].map(product => {
                if (product.ma === productId) {
                    const newQuantity = Math.max(product.quantity - 1, 0);

                    return newQuantity > 0
                        ? { ...product, quantity: newQuantity, soLuong: product.soLuong + 1 }
                        : null;
                }
                return product;
            });

            const updatedTabList = prevState.tabList.map(tab => {
                if (tab.key === tabKey) {
                    return {
                        ...tab,
                        products: updatedProducts.filter(product => product && product.quantity > 0),
                    };
                }
                return tab;
            });

            return {
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts.filter(product => product && product.quantity > 0),
                },
                tabList: updatedTabList,
            };
        });
    };

    onChangePay = value => {
        console.log('changed', value);
    };

    onChangeSwitch = () => {
        // console.log('tài khoản', this.state.taiKhoan);
        this.setState(prevState => ({ checked: !prevState.checked }), () => {
            console.log('checked', this.state.checked); // Đây là cách để log giá trị mới của checked
        });
    };

    start = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ selectedRowKeys: [], loading: false });
        }, 1000);
    };

    onSelectChange = newSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        this.setState({ selectedRowKeys: newSelectedRowKeys });
    };
    handleAddToCart = () => {
        const { tabProducts, selectedRowKeys, activeTabKey } = this.state;


        const selectedProductsToAdd = this.state.sanPhamChiTiet
            .filter(product => selectedRowKeys.includes(product.ma))
            .map(product => ({ ...product, quantity: 1 }));


        const existingProducts = tabProducts[activeTabKey] || [];

        selectedProductsToAdd.forEach(selectedProduct => {
            const existingProductIndex = existingProducts.findIndex(
                product => product.ma === selectedProduct.ma
            );

            if (existingProductIndex !== -1) {

                existingProducts[existingProductIndex].quantity += 1;
            } else {

                existingProducts.push(selectedProduct);
            }
        });

        this.setState(prevState => ({
            tabProducts: {
                ...prevState.tabProducts,
                [activeTabKey]: existingProducts,
            },
            selectedRowKeys: [],
        }));

        this.setState({ inputValue: '' });
    };

    onChangeSearchInput = (selectedValues) => {
        const { selectedPromotion } = this.state;

        if (selectedValues.length > 0) {
            const newlySelectedPromotion = selectedValues[selectedValues.length - 1];

            if (selectedPromotion && selectedPromotion !== newlySelectedPromotion) {
                // Hiển thị thông báo và không cho phép chọn nếu đã có mã khác được chọn trước đó
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

            // Cập nhật state với mã khuyến mãi được chọn
            this.setState({ selectedPromotion: newlySelectedPromotion });
        } else {
            // Nếu không có mã nào được chọn, reset selectedPromotion về null
            this.setState({ selectedPromotion: null });
        }

        // Cập nhật state với các mã khuyến mãi được chọn
        this.setState({ selectedPromotions: selectedValues });
    };
    getStatusCounts = () => {
        const { sanPhamChiTiet } = this.state;
        const statusCounts = {
            "": sanPhamChiTiet.length, // All
            "0": 0, // Chờ xác nhận
            "1": 0, // Đã xác nhận
            // Hủy
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
        /* 
         
        */
        const searchTermKH = localStorage.getItem('searchTermKH') || this.state.searchTermKH;
        const statusCountsKH = this.getStatusCounts();
        const ListKH = this.filteredDataKH();
        const { currentPageKH, perPageKH } = this.state;
        const offsetKH = currentPageKH * perPageKH;
        const currentKHList = ListKH.slice(offsetKH, offsetKH + perPageKH);
        const { isQRReaderOn, result } = this.state;

        if (result && result.text) {
            const slicedMaQR = result.text.slice(5);
            console.log(slicedMaQR);
        } else {
            console.error("Biến result không có giá trị hoặc không có thuộc tính 'text'.");
        }
        const activeTabKey = this.state.activeTabKey;
        const activeTabProducts = this.state.tabProducts[activeTabKey] || [];
        return (
            
            <div className="wrapper-sell">
                <br />
                
                <div className="content_sell">
                    <div className="content_sell_left">
                     
                        <Tabs onChange={this.handleTabChange} defaultActiveKey="1" type="editable-card" onEdit={this.onEdit}>
                            {this.state.tabList && this.state.tabList.map((tabinfo, index) => {
                                return (
                                    <Tabs.TabPane tab={<span><ProfileOutlined /> {tabinfo.tab}</span>}
                                        key={tabinfo.key}
                                        closable={index >= 0}
                                        forceRender={true}>
                                        <div style={{ overflowX: 'auto', overflowY: 'auto', width: '750px' }}>
                                            <Col style={{ backgroundColor: 'rgb(0,0,0,0.2)', height: '50px', padding: '10px', display: 'flex' }}>
                                                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }} >STT</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Ảnh SP</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Màu sắc</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Size</Col>
                                                <Col span={6} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Tên SP</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Số lượng</Col>
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
                                <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>Danh sách sản phẩm</p>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%', maxWidth: '500px' }}
                                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                                    optionLabelProp="label"
                                    onChange={this.onChangeSearchInput}
                                    placeholder="Tìm kiếm sản phẩm"
                                    options={this.state.sanPhamChiTiet.map((option, index) => ({
                                        label: (
                                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                                <div>{index + 1}</div>
                                                <div>
                                                    {option.anh && <img src={`/niceadmin/img/${option.anh}`} width="100px" height="100px" />}

                                                </div>
                                                <div style={{ marginLeft: '75px' }}>{option.sanPham.ten} <br /> {'Size: '}{option.kichThuoc.giaTri} - {'Màu: '}{option.mauSac.ten}</div>
                                                <div style={{ marginLeft: '75px' }}> {'Giá: '}{option.donGia}{' VND'} - SL: {option.soLuong}</div>
                                            </div>
                                        ),
                                        value: option.ma,
                                    }))}
                                />
                                <Button style={{ color: 'black', backgroundColor: '#fff' }} onClick={this.handleAddToCart}>
                                    Thêm
                                </Button>
                                <Button variant="btn btn-outline-primary" onClick={this.handleShowModal}>
                                    Quét QR
                                </Button>
                                <Modal show={this.state.showModal} onHide={this.handleCloseModal} backdrop="static">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Quét QR</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Button style={{ float: 'right', marginRight: '20px', color: 'black', backgroundColor: '#fff' }} onClick={this.toggleQRReader}>
                                            {isQRReaderOn ? 'Turn Off QR Scanner' : 'Turn On QR Scanner'}
                                        </Button>
                                        <div>
                                            {isQRReaderOn && (
                                                <QrScanner
                                                    ref={this.myRef}
                                                    onScan={this.handleScan}
                                                    onError={this.handleError}
                                                    style={{ width: '300px', height: '300px' }}
                                                />
                                            )}
                                            <p>QR Code Result: {result.text}</p>
                                        </div>
                                        {this.popupContent}
                                    </Modal.Body>
                                </Modal>
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
                                            <button className="btn btn-primary " style={{margin:10, }} onClick={this.formAdd}> <i class="bi bi-plus-circle"></i> Thêm sản phẩm </button>

                                                <input
                                                    type="text"
                                                    name="query"
                                                    placeholder="Tìm kiếm"
                                                    title="Enter search keyword"
                                                    value={searchTerm}
                                                    onChange={this.handleSearch}
                                                    onFocus={this.handleSearchFocus} // Thêm sự kiện onFocus
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
                                                    <label htmlFor="filterAll" className="form-check-label">Tất cả  <span class="badge bg-danger translate-middle badge-number rounded-circle">{statusCounts[""]}</span></label>
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
                                                    <label htmlFor="filterPending" className="form-check-label">Ngưng hoạt động  <span class="badge bg-danger translate-middle badge-number rounded-circle"></span></label>
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
                                                    <label htmlFor="filterPaid" className="form-check-label">Đang hoạt động <span class="badge bg-danger translate-middle badge-number rounded-circle"></span></label>
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
                                                                return (
                                                                    <tr key={sanPhamChiTiet.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{sanPhamChiTiet.sanPham.ten}</td>
                                                                        <td>{<img style={{ height: '60px', width: '60px', float: 'left' }} src={`/niceadmin/img/${sanPhamChiTiet.anh}`} />}</td>
                                                                        <td>{sanPhamChiTiet.kichThuoc.giaTri}</td>
                                                                        <td>{sanPhamChiTiet.mauSac.ten}</td>
                                                                        <td>{sanPhamChiTiet.soLuong}</td>
                                                                        <td>{sanPhamChiTiet.donGia}</td>
                                                                        <td>{sanPhamChiTiet.trangThai == 0 ? "Nghỉ bán" : "Đang bán"}</td>
                                                                        <td ><button className="btn btn-outline-info" onClick={() => this.handleProductClick(sanPhamChiTiet, this.state.activeTabKey)}>chọn</button></td>
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
                                <br/>
                                
                            </div>  </section>
                            {this.state.checked === true ?
                                
                                <div>
                                    <section className="section dashboard"> 
                                    <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>Thông tin khách hàng</p>
                                    <Button variant="btn btn-outline-primary" onClick={this.handleShowModal2}>
                                    Chọn khách hàng
                                </Button>
                                <Modal show={this.state.showModal2} onHide={this.handleCloseModal2} backdrop="static" dialogClassName="custom-modal-size">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Chọn sản phẩm</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>

                                        <div><div className="row">
                                            <div className="col-2 container">
                                            <button className="btn btn-primary " style={{margin:10}} onClick={this.addKH}> Thêm khách hàng  </button>

                                                <input
                                                    type="text"
                                                    name="query"
                                                    placeholder="Tìm kiếm"
                                                    title="Enter search keyword"
                                                    value={searchTermKH}
                                                    onChange={this.handleSearchKH}
                                                    onFocus={this.handleSearchFocusKH} // Thêm sự kiện onFocus
                                                />
                                            </div>
                                            
                                        </div>
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Ảnh </th>
                                                        <th>Tên Khách Hàng</th>                           
                                                        <th>Số Điện Thoại</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        currentKHList.map(
                                                            (taiKhoan, index) => {
                                                                return (
                                                                    <tr key={taiKhoan.id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{taiKhoan.thongTinNguoiDung.ten}</td>
                                                                        <td>{<img style={{ height: '60px', width: '60px', float: 'left' }} src={`/niceadmin/img/${taiKhoan.anh}`} />}</td>
                                                                        <td>{taiKhoan.thongTinNguoiDung.sdt}</td>
                                                                        <td ><button className="btn btn-outline-info">chọn</button></td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )
                                                    }
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
                                        </div>
                                        {this.popupContent}
                                    </Modal.Body>
                                </Modal>
                                <div>
                                
                                    <label htmlFor="ten">Tên khách hàng :</label> <br/>
                                    
                                    <label htmlFor="sdt">Số điện thoại :</label><br/>
                                <label htmlFor="tinhThanhPho">Tỉnh/Thành phố:</label>
                                                    <select
                                                        className="form-control"
                                                        name="tinhThanhPho"
                                                        onChange={(event) => this.handleCityChange(event)}
                                                    >
                                                        <option value={this.state.tinhThanhPho}>Chọn tỉnh thành</option>
                                                        {this.state.cities.map(city => (
                                                            <option key={city.code} value={city.name} selected={city.name === this.state.tinhThanhPho}>
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
                                                    >
                                                        <option value={this.state.quanHuyen}>Chọn quận huyện</option>
                                                        {this.state.districts.map(district => (
                                                            <option key={district.code} value={district.name} selected={district.name === this.state.quanHuyen}>
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
                                                    >
                                                        <option value={this.state.xaPhuongThiTran}>Chọn phường xã</option>
                                                        {this.state.wards.map(ward => (
                                                            <option key={ward.code} value={ward.name} selected={ward.name === this.state.xaPhuongThiTran}>
                                                                {ward.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                           </section> </div> : null}                        
                        </div>
                    </div>
                    <div className="content_sell_right">
                        <div>
                           
                            <div className="checkbox_sell">
                                <span><Switch checked={this.state.checked} onChange={this.onChangeSwitch} />Giao hàng</span>
                            </div>
                            <div className="payment_sell">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Col>
                                        <Col style={{ fontSize: '16px', margin: '5px 0px 5px 0px' }}>Tổng tiền: ({this.getTotalQuantity(activeTabProducts)} sản phẩm)</Col>
                                        <Col style={{ fontSize: '16px' }}>Mã khuyến mãi: </Col>
                                        <Col style={{ fontSize: '16px', marginTop: '5px ' }}>Giảm giá:</Col>
                                        <Col style={{ fontSize: '16px' }}>Tiền khách đưa </Col>
                                    </Col>
                                    <Col style={{ width: '55%', borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span style={{ color: 'red' }}>{this.getTotalAmount(activeTabProducts)}</span></Col>
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
                                        <Col style={{ fontSize: '16px', textAlign: 'right', marginTop: '5px' }}>0</Col>
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
                                    {this.state.enteredAmount >= this.getTotalAmount(activeTabProducts) ? (
                                        <span style={{ color: 'red' }}>
                                            {this.state.enteredAmount - this.getTotalAmount(activeTabProducts)}
                                        </span>
                                    ) : (
                                        <span style={{ color: 'red' }}>
                                            Thiếu {this.getTotalAmount(activeTabProducts) - this.state.enteredAmount} VND
                                        </span>
                                    )}
                                </p>
                            </Flex>
                        </div>
                        <div>
                            <Input id="ghiChuDonHang" placeholder="Nhập ghi chú đơn hàng" />
                            <br />
                            <br />
                            <Flex justify="space-between">
                                <Button className="customButton" style={{ width: '40%', height: '70px', backgroundColor: 'white', color: 'black', fontWeight: 'bolder', borderColor: 'black', fontSize: '20px' }}>In tạm tính</Button>
                                <Button className="customButton" style={{ width: '55%', height: '70px', backgroundColor: 'white', color: 'black', fontWeight: 'bolder', borderColor: 'black', fontSize: '20px' }} onClick={this.add}>Thanh toán</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BanHangOffline;