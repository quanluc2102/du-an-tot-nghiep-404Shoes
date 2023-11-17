import React, {Component} from 'react';
import thongkeservice from '../../services/thongkeservice/thongkeservice';
import {toast} from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx';
import {FaFileExcel} from 'react-icons/fa';
import {Tabs, TabList, Tab, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class ThongKeDoanhThuSanPham extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thongKeSanPham: [],
            startDate: '',
            endDate: '',
            pageCount: 0,
            exportingToExcel: false,
            showTable: false,
            currentDateRange: 'Trong ngày', // Initialize currentDateRange with a default value

        };
        this.combinedChartRef = React.createRef();
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = (page = 1) => {
        const {startDate, endDate} = this.state;

        thongkeservice.getThongKeSanPham(startDate, endDate, page)
            .then(data => {
                this.setState({thongKeSanPham: data}, () => {
                    this.renderCombinedChart();
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleThongKeClick = () => {
        this.fetchData();
        this.setState({showTable: true});
    };

    handlePageClick = (data) => {
        this.fetchData(data.selected + 1);
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
                const cellAddress = XLSX.utils.encode_cell({c: index, r: 1});
                worksheet[cellAddress].v = col;
            });

            const titleCellAddress = XLSX.utils.encode_cell({c: 0, r: 0});
            worksheet[titleCellAddress].v = 'Thống kê sản phẩm';

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

    handleToggleTable = () => {
        this.setState((prevState) => ({
            showTable: !prevState.showTable,
        }));
    };

    handleFilterChange = (filterOption) => {
        // Handle filter change logic here based on the selected option
        // Update state or perform other actions accordingly
        this.setState({currentDateRange: filterOption});

    };

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
                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
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
                                                    <h6>Filter</h6>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Theo ngày')}>
                                                        Trong ngày
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong tháng')}>
                                                        Trong tháng
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong quý')}>
                                                        Trong quý
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong năm')}>
                                                        Trong năm
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </h5>

                                    <div className="d-flex align-items-center">
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                border: '2px solid green',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px'
                                            }}>
                                            <i className="bi bi-cart text-success"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6 className="text-success pt-1 fw-bold">145 VND</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>                        </div>
                    </div>

                    <div className="col-xxl-4 col-md-6">
                        <div className="card info-card sales-card">
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
                                                    <h6>Filter</h6>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Theo ngày')}>
                                                        Trong ngày
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong tháng')}>
                                                        Trong tháng
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong quý')}>
                                                        Trong quý
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="#"
                                                       onClick={() => this.handleFilterChange('Trong năm')}>
                                                        Trong năm
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </h5>

                                    <div className="d-flex align-items-center">
                                        <div
                                            className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                border: '2px solid green',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px'
                                            }}>
                                            <i className="bi bi-cart text-success"></i>
                                        </div>
                                        <div className="ps-3">
                                            <h6 className="text-success pt-1 fw-bold">145 VND</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>                        </div>
                    </div>
                </div>


                <section className="section dashboard">
                    <Tabs>
                        <TabList>
                            <Tab>Biểu đồ thống kê</Tab>
                            <Tab>Bảng thống kê</Tab>
                            <Tab>Thống kê doanh thu</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="thongke-controls">
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
                                            <i className="bi bi-eye-slash"></i>
                                        ) : (
                                            <i className="bi bi-eye"></i>
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
                                                        <td>{th[2]}</td>
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
                            {/* You can add content for the new tab here */}
                            <h2>Thống kê doanh thu</h2>
                            {/* ... */}
                        </TabPanel>
                    </Tabs>
                </section>
            </div>
        );
    }
}

export default ThongKeDoanhThuSanPham;
