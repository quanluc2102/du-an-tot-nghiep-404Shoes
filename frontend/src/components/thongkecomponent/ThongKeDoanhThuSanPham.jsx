import React, {Component} from 'react';
import thongkeservice from '../../services/thongkeservice/thongkeservice';
import {toast} from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import {FaFileExcel} from 'react-icons/fa';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ThongKeInfo from "./ThongKeInfo";
import './style.css'

class ThongKeDoanhThuSanPham extends Component {
    constructor(props) {
        super(props);
        const currentYear = new Date().getFullYear();
        this.state = {
            thongKeSanPham: [],
            thongKeThangNew: [],
            thongKeTocDoTangTruong: [],
            thongKeTocDoTangTruongNgay: [],
            thongKeTocDoTangTruongThang: [],
            thongKeTocDoTangTruongSanPhamNam: [],
            thongKeTocDoTangTruongSanPhamThang: [],
            thongKeTocDoTangTruongSanPhamNgay: [],
            startDate: '',
            endDate: '',
            pageCount: 0,
            exportingToExcel: false,
            showTable: false,
            currentDateRange: 'Theo ngày',
            currentDateRangeHD: 'Theo ngày',
            currentDateRangeHDHuy: 'Theo ngày',
            doanhThuNgay: 0,
            doanhThuTuan: 0,
            doanhThuThang: 0,
            doanhThuQuy: 0,
            doanhThuNam: 0,
            hoaDonNgay: 0,
            hoaDonTuan: 0,
            hoaDonThang: 0,
            hoaDonQuy: 0,
            hoaDonNam: 0,
            hoaDonHuyNgay: 0,
            hoaDonHuyTuan: 0,
            hoaDonHuyThang: 0,
            hoaDonHuyQuy: 0,
            hoaDonHuyNam: 0,
            selectedMonth: '',
            selectedYear: currentYear,
            selectedYearDoanhThu: currentYear,
            thongKeType: 'nam',
            thongKeDoanhThuType: 'nam',
            currentPage: 1, // Trang hiện tại
            // pageCount: 0,   // Tổng số trang
        };
        this.combinedChartRef = React.createRef();
        this.combinedChartRefDoanhThu = React.createRef();
    }

    componentDidMount() {
        this.fetchData();
        this.fetchDataThongKeThangNew();
        this.handleFilterChange('Theo ngày'); // Thêm dòng này
        this.fetchDoanhThuNgay();
        this.fetchDoanhThuTuan();
        this.fetchDoanhThuThang();
        this.fetchDoanhThuQuy();
        this.fetchDoanhThuNam();
        this.fetchHoaDonNgay();
        this.fetchHoaDonTuan();
        this.fetchHoaDonThang();
        this.fetchHoaDonQuy();
        this.fetchHoaDonNam();

        this.fetchHoaDonHuyNgay();
        this.fetchHoaDonHuyTuan();
        this.fetchHoaDonHuyThang();
        this.fetchHoaDonHuyQuy();
        this.fetchHoaDonHuyNam();
        this.fetchTocDoTangTruongNam();
        this.fetchTocDoTangTruongSanPhamNam();
        this.fetchTocDoTangTruongSanPhamThang();
        this.fetchTocDoTangTruongSanPhamNgay();
        this.fetchTocDoTangTruongThang();
        this.fetchTocDoTangTruongNgay();
    }

    formatNumberOrZero(value) {
        return typeof value === 'number' ? value : 0;
    }


    fetchData = (page = 1) => {
        const {startDate, endDate, thongKeType, selectedMonth, selectedYear} = this.state;
        console.log(selectedMonth);
        console.log(selectedYear);

        let apiFunction;

        switch (thongKeType) {
            case 'ngay':
                apiFunction = () => thongkeservice.getThongKeSanPham(startDate, endDate, page);
                break;
            case 'thang':
                apiFunction = () => thongkeservice.getDoanhThuThangCustom(selectedMonth, page);
                break;
            case 'nam':
                apiFunction = () => thongkeservice.getDoanhThuNamCustom(selectedYear, page);
                break;
            default:
                // Xử lý trường hợp mà thongKeType không khớp với bất kỳ giá trị nào
                return;
        }

        apiFunction()
            .then(data => {
                this.setState({thongKeSanPham: data}, () => {
                    this.renderCombinedChart();
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };


    fetchDataThongKeThangNew = (page = 2) => {
        const {startDate, endDate, thongKeDoanhThuType, selectedMonth, selectedYearDoanhThu} = this.state;
        console.log(selectedMonth)
        console.log(selectedYearDoanhThu)
        if (thongKeDoanhThuType === 'nam') {
            thongkeservice.getDoanhThuThangNew(selectedYearDoanhThu, page)
                .then(data => {
                    this.setState({thongKeThangNew: data}, () => {
                        this.renderCombinedChartThongKeDoanhThuNew();
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {

        }

    };

    fetchTocDoTangTruongNam = () => {
        thongkeservice.toc_do_tang_truong()
            .then(data => {
                this.setState({thongKeTocDoTangTruong: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };

    fetchTocDoTangTruongSanPhamNam = () => {
        thongkeservice.toc_do_tang_truong_san_pham()
            .then(data => {
                this.setState({thongKeTocDoTangTruongSanPhamNam: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };
    fetchTocDoTangTruongSanPhamThang = () => {
        thongkeservice.toc_do_tang_truong_san_pham_thang()
            .then(data => {
                this.setState({thongKeTocDoTangTruongSanPhamThang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };

    fetchTocDoTangTruongSanPhamNgay = () => {
        thongkeservice.toc_do_tang_truong_san_pham_ngay()
            .then(data => {
                this.setState({thongKeTocDoTangTruongSanPhamNgay: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };


    fetchTocDoTangTruongThang = () => {
        thongkeservice.toc_do_tang_truong_thang()
            .then(data => {
                this.setState({thongKeTocDoTangTruongThang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };

    fetchTocDoTangTruongNgay = () => {
        thongkeservice.toc_do_tang_truong_ngay()
            .then(data => {
                this.setState({thongKeTocDoTangTruongNgay: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };


    fetchDoanhThuNgay = () => {
        thongkeservice.getDoanhThuNgay()
            .then(data => {
                this.setState({doanhThuNgay: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };

    fetchDoanhThuTuan = () => {
        // Lấy ngày đầu tuần và cuối tuần
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        thongkeservice.getDoanhThuTuan(startOfWeek, endOfWeek)
            .then(data => {
                this.setState({doanhThuTuan: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuTuan:', error);
            });
    };

    fetchDoanhThuThang = () => {
        thongkeservice.getDoanhThuThang()
            .then(data => {
                this.setState({doanhThuThang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
            });
    };

    fetchDoanhThuQuy = () => {
        thongkeservice.getDoanhThuQuy()
            .then(data => {
                this.setState({doanhThuQuy: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuQuy:', error);
            });
    };

    fetchDoanhThuNam = () => {
        thongkeservice.getDoanhThuNam()
            .then(data => {
                this.setState({doanhThuNam: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNam:', error);
            });
    };

    fetchHoaDonNgay = () => {
        thongkeservice.getHoaDonNgay()
            .then(data => {
                this.setState({hoaDonNgay: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonNgay:', error);
            });
    };

    fetchHoaDonTuan = () => {
        // Lấy ngày đầu tuần và cuối tuần
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        thongkeservice.getHoaDonTuan(startOfWeek, endOfWeek)
            .then(data => {
                this.setState({hoaDonTuan: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonTuan:', error);
            });
    };

    fetchHoaDonThang = () => {
        thongkeservice.getHoaDonThang()
            .then(data => {
                this.setState({hoaDonThang: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonThang:', error);
            });
    };

    fetchHoaDonQuy = () => {
        thongkeservice.getHoaDonQuy()
            .then(data => {
                this.setState({hoaDonQuy: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonQuy:', error);
            });
    };

    fetchHoaDonNam = () => {
        thongkeservice.getHoaDonNam()
            .then(data => {
                this.setState({hoaDonNam: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonNam:', error);
            });
    };


    fetchHoaDonHuyNgay = () => {
        thongkeservice.getHoaDonHuyNgay()
            .then(data => {
                this.setState({hoaDonHuyNgay: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonHuyNgay:', error);
            });
    };

    fetchHoaDonHuyTuan = () => {
        // Lấy ngày đầu tuần và cuối tuần
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        thongkeservice.getHoaDonHuyTuan(startOfWeek, endOfWeek)
            .then(data => {
                this.setState({hoaDonHuyTuan: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonHuyTuan:', error);
            });
    };

    fetchHoaDonHuyThang = () => {
        thongkeservice.getHoaDonHuyThang()
            .then(data => {
                this.setState({hoaDonHuyThang: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonHuyThang:', error);
            });
    };

    fetchHoaDonHuyQuy = () => {
        thongkeservice.getHoaDonHuyQuy()
            .then(data => {
                this.setState({hoaDonHuyQuy: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonHuyQuy:', error);
            });
    };

    fetchHoaDonHuyNam = () => {
        thongkeservice.getHoaDonHuyNam()
            .then(data => {
                this.setState({hoaDonHuyNam: data});
            })
            .catch(error => {
                console.error('Error fetching hoaDonHuyNam:', error);
            });
    };


    calculateTotalRevenue = () => {
        // Calculate total revenue from fetched data
        const totalRevenue = this.state.thongKeSanPham.reduce(
            (total, item) => total + item[2],
            0
        );
        this.setState({totalRevenue});
    };

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };
    handleInputChangeDoanhThu = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleThongKeClick = () => {
        this.fetchData();
        this.setState({showTable: false});
    };

    handleThongKeThangNewClick = () => {
        this.fetchDataThongKeThangNew();
        this.setState({showTable: false});
    };


    handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // Vì trang bắt đầu từ 0
        this.setState({
            currentPage: selectedPage,
        }, () => {
            this.fetchData(selectedPage); // Gọi hàm fetch data với trang mới
        });
    };


    handleExportToExcel = async () => {
        const {thongKeSanPham, startDate, endDate} = this.state;

        if (thongKeSanPham.length === 0) {
            toast.warn('Dữ liệu bảng đang trống.');
            return;
        }

        this.setState({exportingToExcel: true});

        try {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(thongKeSanPham);

            const colNames = ['Sản phẩm', 'Số lượng đã bán', 'Tổng tiền'];
            colNames.forEach((col, index) => {
                const cellAddress = XLSX.utils.encode_cell({c: index, r: 0});
                worksheet[cellAddress].v = col;
            });


            XLSX.utils.book_append_sheet(workbook, worksheet, 'ThongKeSanPham');

            const formattedStartDate = new Date(startDate).toLocaleDateString();
            const formattedEndDate = new Date(endDate).toLocaleDateString();
            const timeRange = `${formattedStartDate}_${formattedEndDate}`;

            await new Promise(resolve => setTimeout(resolve, 1000));
            XLSX.writeFile(workbook, `ThongKeSanPham_${timeRange}.xlsx`);

            console.log('Exporting to Excel completed!');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Error exporting to Excel. Please try again.');
        } finally {
            this.setState({exportingToExcel: false});
        }
    };

    handleExportToExcelDoanhThuTheoThang = async () => {
        const thongKeDoanhThu = this.state.thongKeThangNew;
        const selectYear = this.state.selectedYearDoanhThu;
        if (!thongKeDoanhThu || thongKeDoanhThu.length === 0) {
            toast.warn('Dữ liệu bảng đang trống.');
            return;
        }

        this.setState({exportingToExcelDoanhThuThang: true});

        try {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(thongKeDoanhThu);

            const colNames = ['Tháng', 'Tổng số sản phẩm đã bán', 'Tổng tiền', 'Giá mua nhỏ nhất', 'Giá mua lớn nhất', 'Giá mua trung bình'];
            colNames.forEach((col, index) => {
                const cellAddress = XLSX.utils.encode_cell({c: index, r: 0});
                worksheet[cellAddress].v = col;
            });


            XLSX.utils.book_append_sheet(workbook, worksheet, 'ThongKeDoanhThuTheoThang');

            const formattedStartDate = new Date(selectYear).toLocaleDateString();

            const timeRange = `${formattedStartDate}`;

            await new Promise(resolve => setTimeout(resolve, 1000));
            XLSX.writeFile(workbook, `ThongKeDoanhThuTheoThang${timeRange}.xlsx`);

            console.log('Exporting to Excel completed!');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Error exporting to Excel. Please try again.');
        } finally {
            this.setState({exportingToExcelDoanhThuThang: false});
        }
    };

    combinedChart = null;

    renderCombinedChart() {
        const chartData = {
            labels: this.state.thongKeSanPham.map(th => th[0]),
            datasets: [
                {
                    label: 'Tổng tiền',
                    type: 'bar',
                    data: this.state.thongKeSanPham.map(th => th[2]),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3,
                    yAxisID: 'y-axis-total',
                    order: 1,
                },
                {
                    label: 'Số lượng đã bán',
                    data: this.state.thongKeSanPham.map(th => th[1]),
                    borderColor: 'rgba(75, 192, 192, 2)',
                    borderWidth: 4,
                    fill: true,
                    yAxisID: 'y-axis-quantity',
                    order: 1,
                },
            ],
        };

        const chartOptions = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-quantity',
                        type: 'linear',
                        position: 'right',
                        grid: {
                            drawOnChartArea: true,
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            callback: (value) => value + ' units',
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Số lượng đã bán',
                            font: {
                                size: 14,
                            },
                            position: 'top',
                        },
                    },
                    {
                        id: 'y-axis-total',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            callback: (value) => '$' + value,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Tổng tiền',
                            font: {
                                size: 14,
                            },
                            position: 'top',
                        },
                    },
                ],
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Biểu đồ kết hợp - Số lượng đã bán và Tổng tiền',
                    font: {
                        size: 16,
                    },
                },
            },
        };

        const ctx = this.combinedChartRef.current?.getContext('2d');

        if (this.combinedChart) {
            this.combinedChart.destroy();
        }

        if (ctx) {
            this.combinedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });
        }
    }

    renderCombinedChartThongKeDoanhThuNew() {
        const chartData = {
            labels: this.state.thongKeThangNew.map(th => {
                const month = th[0];
                const numberOfMonths = th[3]; // Thêm một cột trong mảng chứa số tháng
                return `Tháng ${month}`;
            }),
            datasets: [
                {
                    label: 'Doanh thu',
                    type: 'bar',
                    data: this.state.thongKeThangNew.map(th => th[2]),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 3,
                    yAxisID: 'y-axis-total',
                    order: 1,
                },
                {
                    label: 'Số lượng đã bán',
                    data: this.state.thongKeThangNew.map(th => th[1]),
                    borderColor: 'rgba(75, 192, 192, 2)',
                    borderWidth: 4,
                    fill: true,
                    yAxisID: 'y-axis-quantity',
                    order: 1,
                },
            ],
        };

        const chartOptions = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-quantity',
                        type: 'linear',
                        position: 'right',
                        grid: {
                            drawOnChartArea: true,
                        },
                        ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            callback: (value) => value + ' units',
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Số lượng',
                            font: {
                                size: 14,
                            },
                            position: 'top',
                        },
                    },
                    {
                        id: 'y-axis-total',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            beginAtZero: true,
                            callback: (value) => '$' + value,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Doanh thu',
                            font: {
                                size: 14,
                            },
                            position: 'top',
                        },
                    },
                ],
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Biểu đồ doanh thu theo tháng',
                    font: {
                        size: 16,
                    },
                },
            },
        };

        const ctx = this.combinedChartRefDoanhThu.current?.getContext('2d');

        if (this.combinedChart) {
            this.combinedChart.destroy();
        }

        if (ctx) {
            this.combinedChart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions,
            });
        }
    }

    handleToggleTable = () => {
        this.setState((prevState) => ({
            showTable: !prevState.showTable,
        }));
    };

    formatCurrency(amount) {
        // Sử dụng toLocaleString để định dạng số và chèn dấu chấm phân tách
        return amount.toLocaleString('vi-VN');
    }

    handleFilterChange = async (filterOption) => {
        // Handle filter change logic here based on the selected option
        // Update state or perform other actions accordingly
        this.setState({currentDateRange: filterOption});

        // Fetch the corresponding data based on the selected option
        switch (filterOption) {
            case 'Theo ngày':
                await this.fetchDoanhThuNgay();
                break;
            case 'Trong tuần':
                await this.fetchDoanhThuTuan();
                break;
            case 'Trong tháng':
                await this.fetchDoanhThuThang();
                break;
            case 'Trong quý':
                await this.fetchDoanhThuQuy();
                break;
            case 'Trong năm':
                await this.fetchDoanhThuNam();
                break;
            default:
                break;
        }
    };

    handleFilterChangeSoHoaDon = async (filterOption) => {
        // Handle filter change logic here based on the selected option
        // Update state or perform other actions accordingly
        this.setState({currentDateRangeHD: filterOption});

        // Fetch the corresponding data based on the selected option
        switch (filterOption) {
            case 'Theo ngày':
                await this.fetchHoaDonNgay();
                break;
            case 'Trong tuần':
                await this.fetchHoaDonTuan();
                break;
            case 'Trong tháng':
                await this.fetchHoaDonThang();
                break;
            case 'Trong quý':
                await this.fetchHoaDonQuy();
                break;
            case 'Trong năm':
                await this.fetchHoaDonNam();
                break;
            default:
                break;
        }
    };

    handleFilterChangeSoHoaDonHuy = async (filterOption) => {
        // Handle filter change logic here based on the selected option
        // Update state or perform other actions accordingly
        this.setState({currentDateRangeHDHuy: filterOption});

        // Fetch the corresponding data based on the selected option
        switch (filterOption) {
            case 'Theo ngày':
                await this.fetchHoaDonHuyNgay();
                break;
            case 'Trong tuần':
                await this.fetchHoaDonHuyTuan();
                break;
            case 'Trong tháng':
                await this.fetchHoaDonHuyThang();
                break;
            case 'Trong quý':
                await this.fetchHoaDonHuyQuy();
                break;
            case 'Trong năm':
                await this.fetchHoaDonHuyNam();
                break;
            default:
                break;
        }
    };

    fetchDoanhThuNgay = () => {
        thongkeservice.getDoanhThuNgay()
            .then(data => {
                this.setState({doanhThuNgay: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNgay:', error);
            });
    };

    fetchDoanhThuTuan = () => {
        // Lấy ngày đầu tuần và cuối tuần
        const startOfWeek = new Date();
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 6);

        thongkeservice.getDoanhThuTuan(startOfWeek, endOfWeek)
            .then(data => {
                this.setState({doanhThuTuan: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuTuan:', error);
            });
    };

    fetchDoanhThuThang = () => {
        thongkeservice.getDoanhThuThang()
            .then(data => {
                this.setState({doanhThuThang: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuThang:', error);
            });
    };

    fetchDoanhThuQuy = () => {
        thongkeservice.getDoanhThuQuy()
            .then(data => {
                this.setState({doanhThuQuy: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuQuy:', error);
            });
    };

    fetchDoanhThuNam = () => {
        thongkeservice.getDoanhThuNam()
            .then(data => {
                this.setState({doanhThuNam: data});
            })
            .catch(error => {
                console.error('Error fetching doanhThuNam:', error);
            });
    };

    handleThongKeTypeChange = (event) => {
        this.setState({
            thongKeType: event.target.value,
            thongKeDoanhThuType: event.target.value,
            startDate: '',
            endDate: '',
            selectedMonth: '', // Thêm dòng này để đặt lại giá trị selectedMonth khi thay đổi kiểu thống kê
            selectedYear: '',  // Thêm dòng này để đặt lại giá trị selectedYear khi thay đổi kiểu thống kê
            selectedYearDoanhThu: '',  // Thêm dòng này để đặt lại giá trị selectedYear khi thay đổi kiểu thống kê
        });
    };


    renderFilterOptions() {
        return (
            <>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChange('Theo ngày')}>
                        Theo ngày
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChange('Trong tuần')}>
                        Trong tuần
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChange('Trong tháng')}>
                        Trong tháng
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChange('Trong quý')}>
                        Trong quý
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChange('Trong năm')}>
                        Trong năm
                    </a>
                </li>
            </>
        );
    }

    renderFilterOptionsHD() {
        return (
            <>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChangeSoHoaDon('Theo ngày')}>
                        Theo ngày
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChangeSoHoaDon('Trong tuần')}>
                        Trong tuần
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDon('Trong tháng')}>
                        Trong tháng
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChangeSoHoaDon('Trong quý')}>
                        Trong quý
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#" onClick={() => this.handleFilterChangeSoHoaDon('Trong năm')}>
                        Trong năm
                    </a>
                </li>
            </>
        );
    }

    renderFilterOptionsHDHuy() {
        return (
            <>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDonHuy('Theo ngày')}>
                        Theo ngày
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDonHuy('Trong tuần')}>
                        Trong tuần
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDonHuy('Trong tháng')}>
                        Trong tháng
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDonHuy('Trong quý')}>
                        Trong quý
                    </a>
                </li>
                <li>
                    <a className="dropdown-item" href="#"
                       onClick={() => this.handleFilterChangeSoHoaDonHuy('Trong năm')}>
                        Trong năm
                    </a>
                </li>
            </>
        );
    }

    renderDoanhThu() {
        switch (this.state.currentDateRange) {
            case 'Theo ngày':
                return `${this.formatCurrency(this.state.doanhThuNgay)} `;
            case 'Trong tuần':
                return `${this.formatCurrency(this.state.doanhThuTuan)} `;
            case 'Trong tháng':
                return `${this.formatCurrency(this.state.doanhThuThang)} `;
            case 'Trong quý':
                return `${this.formatCurrency(this.state.doanhThuQuy)} `;
            case 'Trong năm':
                return `${this.formatCurrency(this.state.doanhThuNam)} `;
            default:
                return '';
        }
    }

    renderSoHoaDon() {
        switch (this.state.currentDateRangeHD) {
            case 'Theo ngày':
                return `${this.formatCurrency(this.state.hoaDonNgay)} Hóa đơn`;
            case 'Trong tuần':
                return `${this.formatCurrency(this.state.hoaDonTuan)} Hóa đơn`;
            case 'Trong tháng':
                return `${this.formatCurrency(this.state.hoaDonThang)} Hóa đơn`;
            case 'Trong quý':
                return `${this.formatCurrency(this.state.hoaDonQuy)} Hóa đơn`;
            case 'Trong năm':
                return `${this.formatCurrency(this.state.hoaDonNam)} Hóa đơn`;
            default:
                return '';
        }
    }

    renderSoHoaDonDaHuy() {
        switch (this.state.currentDateRangeHDHuy) {
            case 'Theo ngày':
                return `${this.formatCurrency(this.state.hoaDonHuyNgay)} `;
            case 'Trong tuần':
                return `${this.formatCurrency(this.state.hoaDonHuyTuan)} `;
            case 'Trong tháng':
                return `${this.formatCurrency(this.state.hoaDonHuyThang)} `;
            case 'Trong quý':
                return `${this.formatCurrency(this.state.hoaDonHuyQuy)} `;
            case 'Trong năm':
                return `${this.formatCurrency(this.state.hoaDonHuyNam)} `;
            default:
                return '';
        }
    }


    render() {
        return (
            <div>
                <div className="pagetitle">
                    <h1>Thống kê</h1>
                    <nav>
                        <ol className="breadcrumb"></ol>
                    </nav>

                </div>
                <div className="col-xxl-4 col-md-6">


                </div>

                <div className="row">
                    <div className="col-xxl-6 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Tổng quan doanh thu <span>| {this.state.currentDateRange}</span>
                                    <div className="filter">
                                        <a className="icon" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-chevron-compact-down"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header">
                                                <h6>Thống kê theo</h6>
                                            </li>
                                            {this.renderFilterOptions()}
                                        </ul>
                                    </div>
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'green', // Màu xanh lá cây
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-currency-dollar text-white"></i> {/* Sử dụng biểu tượng tiền */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-success pt-1 fw-bold">
                                            {this.renderDoanhThu()}
                                            VNĐ
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Số hóa đơn <span>| {this.state.currentDateRangeHD}</span>
                                    <div className="filter">
                                        <a className="icon" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-chevron-compact-down"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header">
                                                <h6>Thống kê theo</h6>
                                            </li>
                                            {this.renderFilterOptionsHD()}
                                        </ul>
                                    </div>
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'blue', // Màu xanh dương
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-receipt text-white"></i> {/* Sử dụng biểu tượng receipt thay vì cart */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-primary pt-1 fw-bold">
                                            {this.renderSoHoaDon()}

                                        </h6>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-md-6">
                        <div className="card info-card sales-card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Đã hủy <span>| {this.state.currentDateRangeHDHuy}</span>
                                    <div className="filter">
                                        <a className="icon" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-chevron-compact-down"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header">
                                                <h6>Thống kê theo</h6>
                                            </li>
                                            {this.renderFilterOptionsHDHuy()}
                                        </ul>
                                    </div>
                                </h5>

                                <div className="d-flex align-items-center">
                                    <div
                                        className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            backgroundColor: 'red', // Màu xanh dương
                                            border: '2px solid white',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px'
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-x text-white"></i> {/* Sử dụng biểu tượng file-earmark-x thay vì receipt */}
                                    </div>
                                    <div className="ps-3">
                                        <h6 className="text-danger pt-1 fw-bold">
                                            {this.renderSoHoaDonDaHuy()} Hóa đơn bị
                                            hủy {/* Thêm phần "Hóa đơn bị hủy" */}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <section className="section dashboard">
                    <Tabs>
                        <TabList>
                            <Tab>Thống kê theo sản phẩm đã bán</Tab>
                            <Tab>Thống kê doanh thu</Tab>
                            <Tab>Thống kê tăng trưởng</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="thongke-controls">
                                <label>Chọn kiểu thống kê:</label>
                                <select
                                    name="thongKeType"
                                    value={this.state.thongKeType}
                                    onChange={this.handleThongKeTypeChange}
                                >
                                    <option value="ngay">Theo ngày</option>
                                    <option value="thang">Theo tháng</option>
                                    <option value="nam">Theo năm</option>
                                </select>

                                {this.state.thongKeType === 'ngay' && (
                                    <>
                                        <label>Ngày bắt đầu:</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={this.state.startDate}
                                            onChange={this.handleInputChange}
                                        />
                                        <label>Ngày kết thúc:</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={this.state.endDate}
                                            onChange={this.handleInputChange}
                                        />
                                    </>
                                )}

                                {this.state.thongKeType === 'thang' && (
                                    <>
                                        <label>Chọn tháng:</label>
                                        <input
                                            type="month"
                                            name="selectedMonth"
                                            value={this.state.selectedMonth}
                                            onChange={this.handleInputChange}
                                        />
                                    </>
                                )}

                                {this.state.thongKeType === 'nam' && (
                                    <>
                                        <label>Chọn năm:</label>
                                        <select
                                            name="selectedYear"
                                            value={this.state.selectedYear}
                                            onChange={this.handleInputChange}
                                        >
                                            {/* Tạo các option từ năm 1990 đến 10 năm sau tính từ thời điểm hiện tại */}
                                            {Array.from({length: new Date().getFullYear() - 1990 + 11}, (_, index) => {
                                                const year = 1990 + index;
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </>
                                )}


                                <button onClick={this.handleThongKeClick}>Thống kê</button>
                            </div>

                            <div className="card combined-chart overflow-auto">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Biểu đồ thống kê doanh thu theo sản phẩm <span>| </span>
                                    </h5>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <canvas id="combinedChart" ref={this.combinedChartRef} width="400"
                                                    height="200"></canvas>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-secondary" onClick={this.handleToggleTable}>
                                        {this.state.showTable ? (
                                            <i className="bi bi-eye-slash">Ẩn bảng</i>
                                        ) : (
                                            <i className="bi bi-eye">Xuất bảng</i>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {this.state.showTable && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title">Bảng thống kê theo sản phẩm <span>|</span></h5>
                                            <div>
                                                <button onClick={this.handleExportToExcel}
                                                        disabled={this.state.exportingToExcel}>
                                                    {this.state.exportingToExcel ? 'Exporting...' : <FaFileExcel/>}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Sản phẩm</th>
                                                    <th>Số lượng đã bán</th>
                                                    <th>Tổng tiền</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.thongKeSanPham.map((th, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{th[0]}</td>
                                                        <td>{th[1]}</td>
                                                        <td>{this.formatCurrency(th[2])} VND</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <ReactPaginate
                                            previousLabel={"<"}
                                            nextLabel={">"}
                                            breakLabel={"..."}
                                            breakClassName={"page-item"}
                                            breakLinkClassName={"page-link"}
                                            pageClassName={"page-item"}
                                            pageLinkClassName={"page-link"}
                                            previousClassName={"page-item"}
                                            previousLinkClassName={"page-link"}
                                            nextClassName={"page-item"}
                                            nextLinkClassName={"page-link"}
                                            pageCount={this.state.pageCount}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={this.handlePageClick}
                                            containerClassName={"pagination justify-content-center"}
                                            activeClassName={"active"}
                                        />
                                    </div>
                                </div>
                            )}
                        </TabPanel>

                        {/* Add new TabPanel for "Thống kê doanh thu" */}
                        <TabPanel>
                            <div className="thongke-controls">
                                {/*<label>Chọn kiểu thống kê:</label>*/}
                                {/*<select*/}
                                {/*    name="thongKeType"*/}
                                {/*    value={this.state.thongKeType}*/}
                                {/*    onChange={this.handleThongKeTypeChange}*/}
                                {/*>*/}
                                {/*    <option value="ngay">Theo ngày</option>*/}
                                {/*    <option value="thang">Theo tháng</option>*/}
                                {/*    <option value="nam">Theo năm</option>*/}
                                {/*</select>*/}


                                {this.state.thongKeDoanhThuType === 'nam' && (
                                    <>
                                        <label>Chọn năm:</label>
                                        <select
                                            name="selectedYearDoanhThu"
                                            value={this.state.selectedYearDoanhThu}
                                            onChange={this.handleInputChangeDoanhThu}
                                        >
                                            {/* Tạo các option từ năm 1990 đến 10 năm sau tính từ thời điểm hiện tại */}
                                            {Array.from({length: new Date().getFullYear() - 1990 + 11}, (_, index) => {
                                                const year = 1990 + index;
                                                return (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </>
                                )}


                                <button onClick={this.handleThongKeThangNewClick}>Thống kê</button>
                            </div>
                            <button className="btn btn-outline-secondary" onClick={this.handleToggleTable}>
                                {this.state.showTable ? (
                                    <i className="bi bi-eye-slash">Ẩn bảng</i>
                                ) : (
                                    <i className="bi bi-eye">Xuất bảng</i>
                                )}
                            </button>
                            {this.state.showTable && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title">Bảng thống kê doanh thu theo tháng <span>|</span>
                                            </h5>
                                            <div>
                                                <button onClick={this.handleExportToExcelDoanhThuTheoThang}
                                                        disabled={this.state.handleExportToExcelDoanhThuTheoThang}>
                                                    {this.state.handleExportToExcelDoanhThuTheoThang ? 'Exporting...' :
                                                        <FaFileExcel/>}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="table table-borderless datatable">
                                                <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tháng</th>
                                                    <th>Tổng số sản phẩm đã bán</th>
                                                    <th>Tổng tiền</th>
                                                    <th>Giá mua nhỏ nhất</th>
                                                    <th>Giá mua lớn nhất</th>
                                                    <th>Giá mua trung bình</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.thongKeThangNew.map((th, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{th[0]}</td>
                                                        <td>{th[1]}</td>
                                                        <td>{this.formatCurrency(th[2])} VND</td>
                                                        <td>{this.formatCurrency(th[3])} VND</td>
                                                        <td>{this.formatCurrency(th[4])} VND</td>
                                                        <td>{this.formatCurrency(th[5])} VND</td>

                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="card combined-chart overflow-auto">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Biểu đồ thống kê doanh thu <span>| </span>
                                    </h5>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <canvas id="combinedChart" ref={this.combinedChartRefDoanhThu} width="400"
                                                    height="200"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className="col-12">
                                <div className="card top-selling overflow-auto">

                                    <div className="filter">
                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i
                                            className="bi bi-three-dots"></i></a>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                        </ul>
                                    </div>

                                    <div className="card-body pb-0">
                                        <h5 className="card-title">Tốc độ tăng trưởng <span>| Today</span></h5>

                                        <table className="table table-dark">
                                            {/*<thead>*/}
                                            {/*<tr>*/}
                                            {/*    <th scope="col">Ảnh</th>*/}
                                            {/*    <th scope="col">Sản phẩm</th>*/}
                                            {/*    <th scope="col">Price</th>*/}
                                            {/*    <th scope="col">Sold</th>*/}
                                            {/*    <th scope="col">Revenue</th>*/}
                                            {/*</tr>*/}
                                            {/*</thead>*/}
                                            <tbody>
                                            {this.state.thongKeTocDoTangTruongNgay.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Doanh thu ngày</th>
                                                    <td>Ngày hôm trước: {this.formatCurrency(th[2])} VND</td>
                                                    <td>Ngày hôm nay: {this.formatCurrency(th[1])} VND</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : ''}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}{this.state.thongKeTocDoTangTruongThang.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Doanh thu tháng</th>
                                                    <td>Tháng trước: {this.formatCurrency(th[2])} VND</td>
                                                    <td>Tháng này: {this.formatCurrency(th[1])} VND</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : '-'}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {this.state.thongKeTocDoTangTruong.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Doanh thu năm</th>
                                                    <td>Năm ngoái: {this.formatCurrency(th[2])} VND</td>
                                                    <td>Năm nay: {this.formatCurrency(th[1])} VND</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : '-'}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {this.state.thongKeTocDoTangTruongSanPhamNgay.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Sản phẩm ngày</th>
                                                    <td>Ngày hôm trước: {this.formatCurrency(th[2])} Sản phẩm</td>
                                                    <td>Ngày hôm nay: {this.formatCurrency(th[1])} Sản phẩm</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : '-'}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {this.state.thongKeTocDoTangTruongSanPhamThang.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Sản phẩm tháng</th>
                                                    <td>Tháng trước: {this.formatCurrency(th[2])} Sản phẩm</td>
                                                    <td>Tháng này: {this.formatCurrency(th[1])} Sản phẩm</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : '-'}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            {this.state.thongKeTocDoTangTruongSanPhamNam.map((th, index) => (
                                                <tr key={index}>
                                                    <th>Sản phẩm năm</th>
                                                    <td>Năm ngoái: {this.formatCurrency(th[2])} Sản phẩm</td>
                                                    <td>Năm nay: {this.formatCurrency(th[1])} Sản phẩm</td>
                                                    <td><span
                                                        className={`${th[3] === 'Tang' ? 'badge bg-success' : 'badge bg-danger'}`}><i
                                                        className={`${th[3] === 'Tang' ? 'bi bi-graph-up' : 'bi bi-graph-down'}`}></i> | {`${th[3] === 'Tang' ? '+' : '-'}`} {this.formatCurrency(th[4])}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </section>
            </div>
        );
    }
}

export default ThongKeDoanhThuSanPham;
