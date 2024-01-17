import React, { Component } from "react";
import axios from "axios";
import './banhangoff.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import _ from 'lodash';
import taikhoanservice from "../../services/taikhoanservice/taikhoanservice";
import _debounce from 'lodash/debounce';

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
            thongTinNguoiDung: [],
            nhanVienQuyen1: [],
            phiShip: 0, // state này lưu phí ship để thanh toán
            ten: '', // state này lưu tên khách hàng để thanh toán
            sdt: '', // state này lưu sdt khách hàng để thanh toán
            tinhThanhPho: '',  // state này lưu thành phố để thanh toán
            quanHuyen: '',  // state này lưu quận huyện để thanh toán
            xaPhuongThiTran: '',  // state này lưu xã phường thị trấn để thanh toán
            diaChiCuThe: '',  // state này lưu địa chỉ cụ thể để thanh toán
            listTP: [],
            listQH: [],
            listXP: [],
            codeTP: 0,
            codeQH: 0,
            codeXP: "",
            kieuHoaDon: 2,
            email: '', // state này lưu email để thanh toán
            thanhToan: 4, // state này lưu kiểu thanh toán để thanh toán
            idKhachHang: '', // đây là 1 object khách hàng (khi chọn một khách hàng thì nó sẽ lưu lại thông tin khách hàng đấy ở đây)
            idNhanVien: 1,
            searchTerm: '',
            searchTermKH: '',
            selectedPromotions: [], // state này lưu lại thông tin khuyến mãi đã chọn
            taiKhoan: [], // state này lưu lại danh sách khách hàng
            khuyenMai: [], // mảng khuyến mãi
            selectedProducts: [],
            sanPhamChiTiet: [], // state này lưu thông tin sản phẩm chi tiết
            activeTabKey: '', // id hóa đơn
            tabList: [], // mảng hóa đơn chờ
            diaChi: [],
            enteredAmount: 0, // giá tiền nhập
            selectedRowKeys: [],
            showModal: false,
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            currentPage: 0,
            perPage: 4,
            currentPageKH: 0,
            perPageKH: 4,
            tabProducts: [], // mảng hóa đơn chi tiết
            tabCustomers: {
                tabKey1: [],
                tabKey2: [],
                tabKey3: [],
                tabKey4: [],
                tabKey5: [],
            },
            nguoiDungAdd: {
                cccd: '',
                ten: '',
                sdt: '',
            },
            taiKhoanAdd: {
                maTaiKhoan: '',
                email: '',
                password: '',
                anh: ''
            },
            errorAdd: {
                sdt: '',
                ten: '',
                cccd: '',
                maTaiKhoan: '',
                email: '',
                password: '',
            },
            checked: false, // check button giao hàng (có = true, không = false)        
            cities: [], // state này lưu danh sách thành phố
            districts: [],  // state này lưu danh sách quận huyện
            wards: [], // state này lưu danh sách xã phường
            currentSanPhamChiTietList: [], // state này lưu danh sách spct dựa trên phân trang
            showImage: false,
        };
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.nextTabIndex = 0
        this.addKH = this.addKH.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleDistrictChange = this.handleDistrictChange.bind(this);
        this.handleWardChange = this.handleWardChange.bind(this);
        this.add = this.add.bind(this);
        this.debouncedUpdateSoLuong = _debounce(this.updateSoLuong, 150).bind(this);

        this.thayDoiTenAdd = this.thayDoiTenAdd.bind(this);

        this.thayDoiSdtAdd = this.thayDoiSdtAdd.bind(this);

        this.thayDoiPassAdd = this.thayDoiPassAdd.bind(this);

        this.thayDoiMaNVAdd = this.thayDoiMaNVAdd.bind(this);

        this.thayDoiCCCDAdd = this.thayDoiCCCDAdd.bind(this);

        this.thayDoiEmailAdd = this.thayDoiEmailAdd.bind(this);

        this.debouncedUpdateSoLuong = _debounce(this.updateSoLuong, 300).bind(this);

    }

    componentDidMount() {
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

        this.loadTP();

        this.fetchCities();

        this.fetchHoaDonChoDauTien();

        this.fetchHDCT();
    }


    componentDidUpdate(prevProps, prevState) {

        // hiển thị lại danh sách quận huyện nếu state.tinhThanhPho hiện tại khác với state.tinhThanhPho trước
        if (this.state.tinhThanhPho !== prevState.tinhThanhPho) {
            const { cities, tinhThanhPho } = this.state;
            const selectedCity = cities.find(city => city.name === tinhThanhPho);

            if (selectedCity) {
                this.fetchDistricts(selectedCity);
            }
        }

        // hiển thị lại danh sách xã phường nếu state.quanHuyen hiện tại khác với state.quanHuyen trước
        if (this.state.quanHuyen !== prevState.quanHuyen) {
            const { districts, quanHuyen } = this.state;
            const selectedDistrict = districts.find(district => district.name === quanHuyen);

            if (selectedDistrict) {
                this.fetchWards(selectedDistrict);
            }
        }

        // hiển thị lại danh sách hdct nếu state.activeTabKey hiện tại khác với state.activeTabKey trước
        if (this.state.activeTabKey !== prevState.activeTabKey) {
            this.fetchHDCT(this.state.activeTabKey);
        }
    }

    // hàm set lại đối tượng khách hàng vào state.idKhachHang
    getIdKhachHang(id) {
        this.setState({ idKhachHang: id });
    }

    addKH(id) {
        window.location.href = '/addKhachHang';
    }

    displayImage = () => {
        this.setState({
            showImage: true,
            thanhToan: 1
        }, () => {
            console.log('kieu thanh toan: ', this.state.thanhToan);
        });
    };

    closedisplayImage = () => {
        this.setState({
            showImage: false,
            thanhToan: 4
        }, () => {
            console.log('kieu thanh toan: ', this.state.thanhToan);
        });
    };

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

    // hàm format lại giá tiền
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

    // hàm reload lại khuyến mãi
    reloadKM = () => {
        BanHangService.getKMTT(this.getTotalAmount(this.state.tabProducts)).then((res) => {
            this.setState({ khuyenMai: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }

    // hàm lấy danh sách thành phố từ API
    async fetchCities() {
        try {
            const response = await axios.get('https://provinces.open-api.vn/api/?depth=1');
            this.setState({ cities: response.data });
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    }

    // hàm lấy danh sách quận huyện từ API
    async fetchDistricts(selectedCity) {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`);
            const districtsData = response.data.districts;
            this.setState({ districts: districtsData });
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    }

    // hàm lấy danh sách xã phường từ API
    async fetchWards(selectedDistrict) {
        try {
            const response = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
            const wardsData = response.data.wards;
            this.setState({ wards: wardsData });
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    }

    // hàm xử lí khi chọn thành phố sẽ hiện ra những quận huyện tương ứng
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

    // hàm xử lí khi chọn quận huyện sẽ hiển thị ra những xã phường tương ứng
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
    sendEmail = (recipientEmail) => {
        const emailData = {
            to: recipientEmail,
            subject: 'Subject of the email',
            text: 'Body of the email',
        };

        axios.post('http://localhost:3000/tai_khoan/addKHNhanh', emailData)
            .then(response => {
                console.log('Email sent successfully:', response.data);
                // Handle success, e.g., show a success message to the user
            })
            .catch(error => {
                console.error('Error sending email:', error);
                // Handle error, e.g., show an error message to the user
            });
    };
    thayDoiTenAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    ten: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, ten: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiSdtAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    sdt: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, sdt: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiMaNVAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    maTaiKhoan: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, maTaiKhoan: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiCCCDAdd = (event) => {
        this.setState(
            prevState => ({
                nguoiDungAdd: {
                    ...prevState.nguoiDungAdd,
                    cccd: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, cccd: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiEmailAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    email: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, email: "" };
        this.setState({ errorAdd: errorAdd });
    }
    thayDoiPassAdd = (event) => {
        this.setState(
            prevState => ({
                taiKhoanAdd: {
                    ...prevState.taiKhoanAdd,
                    password: event.target.value
                }
            })
        );
        let errorAdd = { ...this.state.errorAdd, password: "" };
        this.setState({ errorAdd: errorAdd });
    }
    addKH = (e) => {
        e.preventDefault();




        const { taiKhoanAdd, nguoiDungAdd } = this.state;
        const requestData = {
            taiKhoan: {
                email: taiKhoanAdd.email,
            },
            thongTinNguoiDung: {
                ten: nguoiDungAdd.ten,
                cccd: nguoiDungAdd.cccd,
                sdt: nguoiDungAdd.sdt,

            },
        };
        console.log('nsx' + JSON.stringify(requestData));


        // Kiểm tra không được để trống
        if (!nguoiDungAdd.cccd.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD không được bỏ trống!" } });
            return;
        } else if (!/^\d+$/.test(nguoiDungAdd.cccd)) {
            // Kiểm tra là số nguyên
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải là số nguyên và không được chứa khoảng trắng !" } });
            return;
        } else if (nguoiDungAdd.cccd.length !== 12) {
            // Kiểm tra có đủ 12 số
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD phải có đủ 12 số!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.cccd === nguoiDungAdd.cccd)) {
            // Kiểm tra trùng căn cước
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "CCCD đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, cccd: "" } });
        }


        //check ten
        if (!nguoiDungAdd.ten.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên không được bỏ trống!" } });
            return;
        } else if (!/^[\p{L}\s]+$/u.test(nguoiDungAdd.ten)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên chỉ được chứa chữ cái và không có kí tự đặc biệt!" } });
            return;
            // } else if (/\s/.test(nguoiDungAdd.ten)) {
            //     this.setState({ errorAdd: { ...this.state.errorAdd, ten: "Tên không được chứa khoảng trắng!" } });
            //     return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, ten: "" } });
        }

        //check ngaySinh

        // check thanhPho

        // check sdt
        const sdtRegex = /^[0-9]{10}$/; // Regex for 10 digits

        if (!nguoiDungAdd.sdt.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT không được bỏ trống!" } });
            return;
        } else if (!sdtRegex.test(nguoiDungAdd.sdt.trim())) {
            this.setState({
                errorAdd: {
                    ...this.state.errorAdd,
                    sdt: "SDT phải là số nguyên, không có kí tự đặc biệt và phải có 10 chữ số!"
                }
            });
            return;
        } else if (/\s/.test(nguoiDungAdd.sdt.trim())) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT không được chứa khoảng trắng!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.thongTinNguoiDung.sdt === nguoiDungAdd.sdt)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "SDT đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, sdt: "" } });
        }

        // check email
        if (!taiKhoanAdd || !taiKhoanAdd.email || !taiKhoanAdd.email.trim()) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không được bỏ trống!" } });
            return;
        } else if (!/^\S+@\S+\.\S+$/.test(taiKhoanAdd.email)) {
            // Check if email is in correct format
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Địa chỉ email không đúng định dạng!" } });
            return;
        } else if (/\s/.test(taiKhoanAdd.email)) {
            // Check if email contains whitespace
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email không được chứa khoảng trắng!" } });
            return;
        } else if (this.state.nhanVienQuyen1.some(user => user.taiKhoan && user.taiKhoan.email === taiKhoanAdd.email)) {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "Email đã tồn tại trong hệ thống!" } });
            return;
        } else {
            this.setState({ errorAdd: { ...this.state.errorAdd, email: "" } });
        }

        console.log(requestData);
        // Gọi API để thêm tài khoản
        taikhoanservice.addKhachHangNhanh(requestData)
            .then((res) => {
                if (res.status === 200) {
                    // Xử lý khi thêm thành công
                    let taiKhoanMoi = res.data.taiKhoan;
                    let nguoiDungMoi = res.data.thongTinNguoiDung;

                    this.setState((prevState) => ({
                        nhanVienQuyen1: [...prevState.nhanVienQuyen1, taiKhoanMoi],
                        thongTinNguoiDung: [...prevState.thongTinNguoiDung, nguoiDungMoi],
                    }));

                    this.sendEmail(
                        taiKhoanAdd.email,
                        "Welcome to Our Company",
                        "Dear " + nguoiDungAdd.ten +
                        ",\n\nWelcome to our company! Your account has been successfully created."
                    );

                    setTimeout(() => {
                        window.location.href = (`/nhanvien`);
                    }, 20);
                    toast.success("Thêm thành công!");
                } else {
                    // Xử lý khi có lỗi trả về từ API
                    const errorMessage = res.data.message || "Có lỗi xảy ra khi thêm danh mục.";
                    toast.error("Lỗi: " + errorMessage);
                    console.log(res.data.error);
                }
            })
            .catch((error) => {
                // Xử lý lỗi khi gửi yêu cầu API
                if (error.message === "Network Error") {
                    toast.error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối của bạn.");
                } else {
                    toast.error("Lỗi khi gửi yêu cầu API: " + error);
                }
            });
    }

    handleTenChange = (event) => {
        this.setState({ ten: event.target.value });
        console.log(this.state.codeTP)
        console.log(this.state.codeQH)
        console.log(this.state.codeXP)
        console.log(this.state.phiShip)
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
    handleCloseModal4 = () => {
        this.setState({ showModal4: false });
    };
    handleShowModal4 = () => {
        this.setState({ showModal3: false });
        this.setState({ showModal4: true });
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

    // hàm validate số điện thoại
    validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^(84|0[3|5|7|8|9])+([0-9]{8})$/;
        return phoneRegex.test(phoneNumber);
    };


    // hàm thanh toán
    add = async (e) => {
        const tongTienThanhToan = this.getTotalAmount(this.state.tabProducts) + this.state.phiShip;
        const giaTienNhap = this.state.enteredAmount;
        const isAmountEnough = giaTienNhap >= tongTienThanhToan;
        if (!(giaTienNhap >= tongTienThanhToan)) {
            window.alert('Nhập đủ tiền khách đưa!');
            return;
        }
        const { selectedPromotions } = this.state;
        const firstSelectedPromotion = selectedPromotions.length > 0 ? selectedPromotions[0] : null; // hàm này lấy giá trị đầu tiên của mảng lưu khuyến mãi

        const confirm = window.confirm('Bạn xác nhận muốn thanh toán hóa đơn này chứ?');
        if (!confirm) {
            return;
        } else {

            try {
                const thanhToanDTO = {
                    ten: this.state.ten || '',
                    sdt: this.state.sdt || '',
                    taiKhoanKhachHang: this.state.idKhachHang.id || '',
                    taiKhoan: this.state.idNhanVien,
                    tongTien: this.getTotalAmountWithoutPromotions(this.state.tabProducts) + this.state.phiShip,
                    tienGiam: (this.getTotalAmountWithoutPromotions(this.state.tabProducts) + this.state.phiShip) - this.getTotalAmount(this.state.tabProducts),
                    tongTienSauGiam: this.getTotalAmount(this.state.tabProducts) + this.state.phiShip,
                    phiShip: this.state.phiShip,
                    kieuHoaDon: this.state.kieuHoaDon,
                    tinhThanhPho: this.state.tinhThanhPho || '',
                    quanHuyen: this.state.quanHuyen || '',
                    xaPhuongThiTran: this.state.xaPhuongThiTran || '',
                    diaChiCuThe: this.state.diaChiCuThe || '',
                    khuyenMai: firstSelectedPromotion,
                    thanhToan: this.state.thanhToan,
                    ghiChu: document.getElementById('ghiChuDonHang').value || '',
                }

                const response = await axios.post(`http://localhost:8080/ban_hang/thanhToan/${this.state.activeTabKey}`, thanhToanDTO);
                if (response.status === 200) {
                    const danhSachHD = response.data;
                    this.setState({
                        tabList: danhSachHD,
                        tabProducts: [],
                        activeTabKey: '',
                        diaChiCuThe: '',
                        ten: '',
                        sdt: '',
                        email: '',
                        phiShip: 0,
                        tinhThanhPho: '',
                        quanHuyen: '',
                        xaPhuongThiTran: '',
                        khuyenMai: [],
                        thanhToan: 4,
                        ghiChu: '',
                        kieuHoaDon: 2,
                        idKhachHang: '',
                    });
                    this.fetchHoaDonChoDauTien();
                    console.log('phi ship: ', this.state.phiShip);
                    toast.success('Thanh toán thành công!!!!');
                } else {
                    toast.error('Thanh toán thất bại!!!!');
                    console.log(thanhToanDTO);
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    // hàm lấy giá tiền nhập
    onChangeEnteredAmount = (e) => {
        const inputValue = e.target.value;
        const enteredAmount = parseFloat(inputValue) || 0;
        this.setState({ enteredAmount });
    };

    // hàm change phí ship
    onChangeShip = (e) => {
        const inputValue = e.target.value;
        if (inputValue === null || inputValue === undefined) {
            this.setState({ phiShip: 0 });
            return;
        }

        const enteredAmount = parseFloat(inputValue) || 0;
        this.setState({ enteredAmount });
        if (enteredAmount === null || enteredAmount === undefined) {
            this.setState({ phiShip: 0 });
        }
    };


    // lấy tổng số hdct trong hóa đơn
    getTotalQuantity = (products) => {
        return products.reduce((total, product) => total + product.soLuong, 0);
    };

    // lấy tổng tiền sau khi đã tính cả khuyến mãi
    getTotalAmount = (products) => {
        let totalAmount = products.reduce((total, product) => total + product.sanPhamChiTiet.donGia * product.soLuong, 0);
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

    // lấy tổng tiền không tính khuyến mãi
    getTotalAmountWithoutPromotions = (products) => {
        return products.reduce((total, product) => total + product.sanPhamChiTiet.donGia * product.soLuong, 0);
    };

    // lấy id hóa đơn khi thay đổi tab
    handleTabChange = (idHoaDon) => {
        this.setState({ activeTabKey: idHoaDon });
    };

    // thêm sản phẩm vào hóa đơn chờ
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
                    if (response.status === 200) {
                        this.fetchDanhSachSP();
                        this.setState({ tabProducts: response.data });
                        toast.success('Đã thêm sản phẩm vào giỏ hàng!!!');
                        this.handleCloseModal1();
                    }
                } catch (error) {
                    console.log('Error: ', error);
                }
            }
        }

    };

    // lấy thông tin user
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

    // lấy thông tin hdct dựa trên id hóa đơn
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

    // lấy danh sách sản phẩm chi tiết
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

    // hiển thị danh sách hdct dựa trên id hóa đơn
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
                                onChange={(e) => this.handleQuantityChange(e, product.sanPhamChiTiet.ma, product.id, product)}
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

    // hàm xử lí số lượng ở ô input trên (chưa hoàn thành)
    handleQuantityChange = async (e, productCode, productId, product) => {
        const newQuantity = parseInt(e.target.value, 10);

        const { sanPhamChiTiet } = this.state;

        const selectedProduct = sanPhamChiTiet.find(product => product.ma === productCode);

        const isValidQuantity = !isNaN(newQuantity) && newQuantity !== null && newQuantity !== undefined && newQuantity > 0;

        const limitedQuantity = isValidQuantity ? Math.min(newQuantity, selectedProduct ? selectedProduct.soLuong + product.soLuong : 1) : 1;

        console.log('id ctsp: ', selectedProduct.id);
        console.log('limit quantity: ', limitedQuantity);
        console.log("so luong moi: ", newQuantity);
        console.log("id hdct: ", productId);

        this.handleUpdateSoLuong(limitedQuantity, productId);
        this.fetchDanhSachSP();
    };


    // hàm update số lượng trong hdct ở ô input
    updateSoLuong = async (soLuong, idHDCT) => {

        const UpdateSoLuongHdctDTO = {
            soLuongNhap: soLuong,
        }

        try {
            const response = await axios.post(`http://localhost:8080/ban_hang/update_soluong/${idHDCT}`, UpdateSoLuongHdctDTO);
            if (response.status === 200) {
                const danhSachHDCT = response.data;
                this.setState({ tabProducts: danhSachHDCT });
                this.fetchDanhSachSP();
            }
        } catch (error) {
            console.log(error);
        }
    }

    // hàm debounce update số lượng ô input
    handleUpdateSoLuong = (soLuong, idHDCT) => {
        this.debouncedUpdateSoLuong(soLuong, idHDCT);
    };


    // hàm lấy dữ liệu hóa đơn chờ (hóa đơn hiển thị ở trên phần Tab)
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

    // hàm lấy dữ liệu hóa đơn chờ
    fetchHoaDonChoDauTien = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/ban_hang`);
            if (response.status === 200) {
                const danhSachHD = response.data;
                this.setState({ tabList: danhSachHD });
                // this.setState({ activeTabKey: response.data[0].id })
                // this.fetchHDCT(response.data[0].id);
            }
        } catch (error) {
            console.log('Lỗi lấy dữ liệu!!!', error)
        }
    }

    // hàm tạo mới hóa đơn chờ khi bấm vào +
    addHoaDon = async () => {
        try {
            const response = await axios.post(`http://localhost:8080/ban_hang/create`);
            console.log('Tạo hóa đơn thành công!!!', response.data);
            this.setState({ tabList: [...this.state.tabList, response.data] })
        } catch (error) {
            console.log('Không tạo được hóa đơn mới!!!', error);
        }
    }

    // hàm xóa hóa đơn chờ khi bấm vào button "Xóa Hóa Đơn"
    deleteHoaDonCho = async (idHoaDon) => {
        if (idHoaDon !== null && idHoaDon !== undefined) {
            const confirm = window.confirm('Bạn muốn xóa hóa đơn này chứ?');

            if (confirm) {
                const deleteHoaDonDTO = {
                    listHoaDonChiTiet: this.state.tabProducts
                }
                console.log(deleteHoaDonDTO);
                try {
                    const response = await axios.put(`http://localhost:8080/ban_hang/delete/${idHoaDon}`, deleteHoaDonDTO || { listHoaDonChiTiet: [] });
                    if (response.status === 200) {
                        this.setState({ tabList: response.data });
                        this.fetchDanhSachSP();
                        // this.setState({ activeTabKey: response.data[0].id });
                        toast.success('Xóa hóa đơn thành công!!!');
                    }
                } catch (error) {
                    console.log('Xóa hóa đơn thất bại!!!', error);
                }
            }
        } else {
            toast.error('Hãy chọn hóa đơn để xóa!!!');
        }
    }

    // hàm chuyển hướng trang xuống button "Xóa hóa đơn"
    scrollToDeleteButton = () => {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.scrollIntoView({ behavior: 'smooth' });
    }

    // hàm thêm hóa đơn chờ
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

    // hàm xóa hdct
    onDelete = async (hdctId, activeTabKey) => {

        if (activeTabKey !== null || activeTabKey !== undefined) {
            const DeleteHdctDTO = {
                hoaDonId: activeTabKey
            }
            console.log(DeleteHdctDTO);
            try {
                const response = await axios.put(`http://localhost:8080/ban_hang/delete_hdct/${hdctId}`, DeleteHdctDTO);
                if (response.status === 200) {
                    this.setState({ tabProducts: response.data });
                    this.fetchDanhSachSP();
                    console.log('Du lieu sau xoa: ', response.data);
                }
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

    // hàm set lại kiểu hóa đơn dựa trên button giao hàng
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

    loadTP = async () => {
        const responseTp = await axios.get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const provincesData = responseTp.data.data;
        this.setState({ listTP: provincesData })
        // setListThanhPho(provincesData)
    }

    loadQH = async (tp) => {
        const responseQH = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${tp}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const districtData = responseQH.data.data;
        this.setState({ listQH: districtData })

    }

    loadXP = async (qh) => {
        const responseXP = await axios.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${qh}`, {
            headers: {
                'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
            },
        });
        const wardData = responseXP.data.data;
        this.setState({ listXP: wardData })
    }

    chonTP = (event) => {
        const tp = parseInt(event.target.value)
        this.setState({ codeTP: tp })
        // setCodeTP(tp)
        this.state.listTP.map(value => {
            if (value.ProvinceID === tp) {
                // setTinhThanhPhoNew(value.ProvinceName)
                this.setState({ tinhThanhPho: value.ProvinceName })
                // setTinhThanhPho(value.ProvinceName)
            }
        })
        this.setState({ codeQH: 0, codeXP: "", phiShip: 0 })
        // setCodeQuan(0)
        // setCodeXa(0)
        // setPhiShip(0)
        this.loadQH(tp);
    }

    chonQH = (event) => {
        const qh = parseInt(event.target.value)
        this.setState({ codeQH: qh })
        this.state.listQH.map(value => {
            if (value.DistrictID === qh) {
                // setQuanHuyenNew(value.DistrictName)
                // setQuanHuyen(value.DistrictName)
                this.setState({ quanHuyen: value.DistrictName })

            }
        })
        this.setState({ codeXP: "", phiShip: 0 })
        this.loadXP(qh);
    }

    chonXP = (event) => {
        const xp = String(event.target.value)
        this.setState({ codeXP: xp })
        this.state.listXP.map(value => {
            if (value.WardCode === xp) {
                // setXaPhuongThiTranNew(value.WardName)
                // setXaPhuongThiTran(value.WardName)
                this.setState({ xaPhuongThiTran: value.WardName })

            }
        })
    }

    tinhTienShip = async () => {

        let tongTien = this.getTotalAmountWithoutPromotions(this.state.tabProducts);
        // let tongKL = SPCT.length * 100;
        try {
            const requestBody = {
                "service_type_id": 2,
                "insurance_value": tongTien,
                "coupon": null,
                "from_district_id": 1582,
                "from_ward_code": "1A1319",
                "to_district_id": this.state.codeQH,
                "to_ward_code": `${this.state.codeXP}`,
                "height": 15,
                "length": 15,
                "weight": 1000,
                "width": 15
            };

            const response = await axios.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', requestBody, {
                headers: {
                    'token': '93254e5e-a301-11ee-b394-8ac29577e80e',
                },
            });
            if (response.status === 200) {
                console.log(this.state.codeTP);
                console.log(this.state.codeQH);
                console.log(this.state.codeXP);
                return response.data.data.service_fee;
            }
            this.setState({ phiShip: response.data.data.service_fee })

        } catch (error) {
            // Xử lý lỗi tại đây
            if (error.response) {
                // Nếu có phản hồi từ server
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                // Nếu yêu cầu được gửi đi nhưng không nhận được phản hồi
                console.error('No response received');
            } else {
                // Lỗi trong quá trình thiết lập yêu cầu
                console.error('Error setting up the request:', error.message);
            }
            throw error;
        }
    };

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

        const tongTienThanhToan = this.getTotalAmount(this.state.tabProducts) + this.state.phiShip;
        const giaTienNhap = this.state.enteredAmount;
        const amountDifference = giaTienNhap - tongTienThanhToan;
        const isAmountEnough = giaTienNhap >= tongTienThanhToan;
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
                                            <Button variant="btn btn-primary " style={{ margin: 10 }} onClick={this.handleShowModal4}> Thêm khách hàng  </Button>
                                            <Modal show={this.state.showModal4} onHide={this.handleCloseModal4} backdrop="static" dialogClassName="custom-modal-size">
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Thông tin KH</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <form onSubmit={this.addKH}>
                                                        {/* CCCD */}
                                                        <div className="form-group">
                                                            <label htmlFor="cccd">CCCD:<span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${this.state.errorAdd.cccd ? 'is-invalid' : ''}`}
                                                                id="cccd"
                                                                onChange={this.thayDoiCCCDAdd}
                                                                value={this.state.nguoiDungAdd.cccd}
                                                            />
                                                            {this.state.errorAdd.cccd && <div className="invalid-feedback">{this.state.errorAdd.cccd}</div>}
                                                        </div>
                                                        {/* Họ và tên */}
                                                        <div className="form-group">
                                                            <label htmlFor="ten">Họ và tên: <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${this.state.errorAdd.ten ? 'is-invalid' : ''}`}
                                                                id="ten"
                                                                value={this.state.nguoiDungAdd.ten}
                                                                onChange={this.thayDoiTenAdd}
                                                            />
                                                            {this.state.errorAdd.ten && <div className="invalid-feedback">{this.state.errorAdd.ten}</div>}
                                                        </div>
                                                        {/* SDT */}
                                                        <div className="form-group">
                                                            <label htmlFor="sdt">SDT: <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="text"
                                                                className={`form-control ${this.state.errorAdd.sdt ? 'is-invalid' : ''}`}
                                                                id="sdt"
                                                                onChange={this.thayDoiSdtAdd}
                                                                value={this.state.nguoiDungAdd.sdt}
                                                            />
                                                            {this.state.errorAdd.sdt && <div className="invalid-feedback">{this.state.errorAdd.sdt}</div>}
                                                        </div>

                                                        {/* Email */}
                                                        <div className="form-group">
                                                            <label htmlFor="email">Email: <span style={{ color: 'red' }}>*</span></label>
                                                            <input
                                                                type="email"
                                                                className={`form-control ${this.state.errorAdd.email ? 'is-invalid' : ''}`}
                                                                id="email"
                                                                value={this.state.taiKhoanAdd.email}
                                                                onChange={this.thayDoiEmailAdd}
                                                            />
                                                            {this.state.errorAdd.email && <div className="invalid-feedback">{this.state.errorAdd.email}</div>}
                                                        </div>
                                                        <input type="submit" className="btn btn-primary" value="Add" style={{ marginTop: '10px' }} />
                                                    </form>
                                                </Modal.Body>
                                                {this.popupContent}
                                            </Modal>
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

                            {/* màn hình hiển thị popup địa chỉ */}
                            {this.state.checked === true ?
                                <div>
                                    <div>
                                        <div>
                                            <label htmlFor="tinhThanhPho">Tỉnh/Thành phố:</label>
                                            <select
                                                className="form-control"
                                                name="tinhThanhPho"
                                                onChange={(event) => this.chonTP(event)}
                                                value={this.state.codeTP}
                                            >
                                                <option>Chọn tỉnh thành</option>
                                                {this.state.listTP.map(tp => (
                                                    <option value={tp.ProvinceID}>{tp.ProvinceName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="quanHuyen">Quận/Huyện:</label>
                                            <select
                                                className="form-control"
                                                name="quanHuyen"
                                                onChange={(event) => this.chonQH(event)}
                                                value={this.state.codeQH}
                                            >
                                                <option >Chọn quận huyện</option>
                                                {this.state.listQH.map(tp => (
                                                    <option value={tp.DistrictID}>{tp.DistrictName}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="xaPhuongThiTran">Xã/Phường/Thị trấn:</label>
                                            <select
                                                className="form-control"
                                                name="xaPhuongThiTran"
                                                onChange={(event) => this.chonXP(event)}
                                                value={this.state.codeXP}
                                            >
                                                <option >Chọn xã/phường/thị trấn</option>
                                                {this.state.listXP.map(tp => (
                                                    <option value={tp.WardCode}>{tp.WardName}</option>
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
                                        <Col style={{ fontSize: '16px', margin: '5px 0px 5px 0px' }}>Tổng tiền:({this.getTotalQuantity(this.state.tabProducts)} sản phẩm)</Col>
                                        <Col style={{ fontSize: '16px' }}>Mã khuyến mãi:</Col>
                                        <Col style={{ fontSize: '16px', marginTop: '5px ' }}>Giảm giá:</Col>
                                        <Col style={{ fontSize: '16px' }}>Tiền khách đưa:</Col>
                                        <br />
                                        <Col style={{ fontSize: '16px' }}>Phí ship:</Col>
                                    </Col>
                                    <Col style={{ width: '55%', borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span style={{ color: 'red' }}>{this.formatCurrency(this.getTotalAmountWithoutPromotions(this.state.tabProducts))}</span></Col>
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
                                        <Col style={{ fontSize: '16px', textAlign: 'right', marginTop: '5px' }}>{this.formatCurrency(this.getTotalAmountWithoutPromotions(this.state.tabProducts) - this.getTotalAmount(this.state.tabProducts))}</Col>
                                        <Col style={{ fontSize: '16px', textAlign: 'right' }}><Input
                                            type="text"
                                            placeholder="Nhập tiền khách đưa..."
                                            style={{ width: '194px', float: 'left' }}
                                            onChange={this.onChangeEnteredAmount}
                                        /></Col>
                                        <br />
                                        <Col style={{ fontSize: '16px', textAlign: 'right' }}><Input
                                            type="text"
                                            placeholder="Nhập phí ship..."
                                            style={{ width: '194px', float: 'left' }}
                                            value={this.state.phiShip}
                                            onChange={this.onChangeShip}
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
                                    <span style={{ color: 'red' }}>
                                        {isAmountEnough ? (
                                            <>Dư {this.formatCurrency(amountDifference)}</>
                                        ) : (
                                            <>Thiếu {this.formatCurrency(-amountDifference)}</>
                                        )}
                                    </span>
                                </p>
                            </Flex>
                            {this.state.showImage && (
                                <img
                                    style={{ maxWidth: 300, marginTop: 20 }}
                                    src={`https://api.vietqr.io/image/970422-0362460679-vE5Br8f.jpg?accountName=BUI%20XUAN%20THIEU&amount=${this.getTotalAmount(this.state.tabProducts) + this.state.phiShip}&addInfo=TRA%20TIEN%20HOA%20DON`}
                                    alt="QR Code"
                                />
                            )}
                        </div>
                        {this.state.codeXP === "" ? (<h6 style={{ display: 'none', marginTop: 8, float: "right" }}>Phí ship : {this.formatCurrency(this.state.phiShip)}</h6>) : (<h6 style={{ display: 'none', marginTop: 8, float: "right" }}>Phí ship : {this.formatCurrency(this.tinhTienShip())}</h6>)}
                        <button onClick={this.state.showImage === false ? this.displayImage : this.closedisplayImage}>{this.state.showImage === false ? 'Xuất' : 'Đóng'} QR</button>
                        <div>
                            <Input id="ghiChuDonHang" placeholder="Nhập ghi chú đơn hàng" />
                            <br />
                            <br />
                            <Flex justify="space-between">
                                <Button icon={<></>} className="customButton"
                                    style={{
                                        width: '40%',
                                        height: '70px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        fontWeight: 'bolder',
                                        borderColor: 'black',
                                        fontSize: '20px'
                                    }}>
                                    In tạm tính
                                </Button>

                                <Button className="customButton"
                                    style={{
                                        width: '55%',
                                        height: '70px',
                                        backgroundColor: 'white',
                                        color: 'black',
                                        fontWeight: 'bolder',
                                        borderColor: 'black',
                                        fontSize: '20px'
                                    }}
                                    onClick={this.add}>Thanh toán</Button>
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