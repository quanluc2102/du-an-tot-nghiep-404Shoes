import React, { Component } from 'react';
import thongkeservice from '../../services/thongkeservice/thongkeservice';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import Chart from 'chart.js/auto';
import * as XLSX from 'xlsx'; // Import xlsx library
import { FaFileExcel } from 'react-icons/fa'; // Import the Excel icon from Font Awesome
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import CSS styles for react-tabs

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
        };
        // Create a ref for the canvas element
        this.combinedChartRef = React.createRef();
    }

    componentDidMount() {
        // Fetch data when the component mounts
        this.fetchData();
    }

    fetchData = (page = 1) => {
        const { startDate, endDate } = this.state;

        thongkeservice.getThongKeSanPham(startDate, endDate, page)
            .then(data => {
                this.setState({ thongKeSanPham: data }, () => {
                    // Call renderCombinedChart in the callback to ensure it is called after state is updated
                    this.renderCombinedChart();
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    handleStartDateChange = (event) => {
        this.setState({ startDate: event.target.value });
    };

    handleEndDateChange = (event) => {
        this.setState({ endDate: event.target.value });
    };

    handleThongKeClick = () => {
        // Fetch data when the Thong Ke button is clicked
        this.fetchData();
        // Show the table when data is fetched
        this.setState({ showTable: true });
    };

    handlePageClick = (data) => {
        const selectedPage = data.selected;

        // Assuming you have a function to fetch data based on the selected page
        this.fetchData(selectedPage + 1);
    };

    handleExportToExcel = async () => {
        const { thongKeSanPham, startDate, endDate } = this.state;

        // Check if the table is empty
        if (thongKeSanPham.length === 0) {
            toast.warn('Dữ liệu bảng đang trống.');
            return;
        }

        // Update state to indicate that export is in progress
        this.setState({ exportingToExcel: true });

        // Simulate an asynchronous operation (e.g., API call) for exporting
        try {
            // Create a new workbook
            const workbook = XLSX.utils.book_new();

            // Convert the table data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(thongKeSanPham);

            // Set column names in Excel
            const colNames = ['Sản phẩm', 'Số lượng đã bán', 'Tổng tiền'];
            colNames.forEach((col, index) => {
                const cellAddress = XLSX.utils.encode_cell({ c: index, r: 1 }); // Start from row 1 for column names
                worksheet[cellAddress].v = col; // Update the value of the cell
            });

            // Add the title row
            const titleCellAddress = XLSX.utils.encode_cell({ c: 0, r: 0 });
            worksheet[titleCellAddress].v = 'Thống kê sản phẩm';

            // Update the worksheet name
            XLSX.utils.book_append_sheet(workbook, worksheet, 'ThongKeSanPham');

            // Format the time range for the file name
            const formattedStartDate = new Date(startDate).toLocaleDateString();
            const formattedEndDate = new Date(endDate).toLocaleDateString();
            const timeRange = `${formattedStartDate}_${formattedEndDate}`;

            // Save the workbook as an Excel file with the specified name
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            XLSX.writeFile(workbook, `ThongKeSanPham_${timeRange}.xlsx`);

            console.log('Exporting to Excel completed!');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Error exporting to Excel. Please try again.');
        } finally {
            // Update state to indicate that export is completed
            this.setState({ exportingToExcel: false });
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
                            callback: function (value) {
                                return value + ' units';
                            },
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
                            callback: function (value) {
                                return '$' + value;
                            },
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
                options: chartOptions, // Add this line to include chart options
            });
        }
    }

    handleToggleTable = () => {
        this.setState((prevState) => ({
            showTable: !prevState.showTable,
        }));
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
                                    value={this.state.startDate}
                                    onChange={this.handleStartDateChange}
                                />
                                <label>Ngày kết thúc:</label>
                                <input
                                    type="date"
                                    value={this.state.endDate}
                                    onChange={this.handleEndDateChange}
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
                                            <canvas id="combinedChart" ref={this.combinedChartRef} width="400" height="200"></canvas>
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
                                                <button onClick={this.handleExportToExcel} disabled={this.state.exportingToExcel}>
                                                    {this.state.exportingToExcel ? 'Exporting...' : <FaFileExcel /> }
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
