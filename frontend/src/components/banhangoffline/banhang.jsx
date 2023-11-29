import React, { Component } from "react";
import './banhangoff.css';
import { toast } from 'react-toastify';
import {
    Col,
    Table,
    Tabs,
    Input,
    Select,
    Space,
    Checkbox,
    Row,
    InputNumber,
    Flex
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
            selectedProducts: [],
            sanPhamChiTiet: [],
            tabList: [
                {
                    tab: 'Đơn hàng 1',
                    key: 'tabKey1',
                },
            ],
            selectedRowKeys: [],
            loading: false,
            sanPhamChiTietList: [],
            isQRReaderOn: false,
            showModal: false,
            result: 'No QR code scanned yet',
            activeTabKey: 'tabKey1',
            tabProducts: {
                tabKey1: [],
                tabKey2: [],
                tabKey3: [],
                tabKey4: [],
                tabKey5: [],
            },
        };

        this.nextTabIndex = 0
    }

    componentDidMount() {

        BanHangService.getSPCT().then((res) => {
            this.setState({ sanPhamChiTiet: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });

    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    };
    handleShowModal = () => {
        this.setState({ showModal: true });
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

    add = async (e) => {
        e.preventDefault();

        const confirm = window.confirm('Bạn xác nhận muốn thanh toán hóa đơn này chứ?');
        if (!confirm) {
            return;
        }

        const ngayTao = new Date().toISOString();

        const thanhToan = {

            sanPhamChiTietList: this.state.selectedProducts,

            hoaDon: {
                tongTien: this.getTotalAmount(),
                ghiChu: document.getElementById("ghiChuDonHang").value
            },
        };

        try {

            const response = await BanHangService.createHoaDon(thanhToan);

            if (response.status === 200) {
                toast.done('Thanh toán thành công!!!!');
                console.log(thanhToan);

            } else {
                toast.error('Thanh toán thất bại!!!!');
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
    }

    getTotalQuantity = () => {
        const { selectedProducts } = this.state;
        return selectedProducts.reduce((total, product) => total + product.quantity, 0);
    };

    getTotalAmount = () => {
        const { selectedProducts } = this.state;
        return selectedProducts.reduce((total, product) => total + product.donGia * product.quantity, 0);
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


    handleProductClick = (productId, tabKey) => {

        const { tabProducts } = this.state;
        const products = tabProducts[tabKey] || [];
        const selectedProduct = products.find(item => item.id === productId.id);

        if (selectedProduct) {
            const updatedProducts = products.map(item =>
                item.id === productId.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            this.setState(prevState => ({
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts,
                },
            }));
        } else {
            const newSelectedProduct = { ...productId, quantity: 1 };
            const updatedProducts = [...products, newSelectedProduct];
            this.setState(prevState => ({
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts,
                },
            }));
        }
    };

    renderProductsForTab = (tabKey) => {
        const { tabProducts } = this.state;
        const products = tabProducts[tabKey] || [];

        return products.map((product, index) => (
            <Col key={index} style={{ backgroundColor: '#fff', height: '75px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }}>{index + 1}</Col>
                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                    <img style={{ height: '60px', width: '60px' }} src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda507d6073c4f44abb5d314d617250e_9366/Ultra_4DFWD_Running_Shoes_Grey_ID1686_HM1.jpg" />
                </Col>
                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.ma}</Col>
                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', }}>{product.sanPham.ten}</Col>
                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>
                    <input type="number" className="soLuong" min="1" style={{ width: '50px' }} value={product.quantity} />
                </Col>
                <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.donGia} VND</Col>
                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }}>{product.donGia * product.quantity} VND</Col>
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

    onDelete = (productId) => {
        this.setState(prevState => {
            const updatedSelectedProducts = prevState.selectedProducts.filter(product => product.ma !== productId);
            return { selectedProducts: updatedSelectedProducts };
        });
    };

    onChangePay = value => {
        console.log('changed', value);
    };

    onChangeCheckbox = e => {
        console.log(`checked = ${e.target.checked}`);
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

    render() {
        const { isQRReaderOn, result } = this.state;

        if (result && result.text) {
            const slicedMaQR = result.text.slice(5);
            console.log(slicedMaQR);
        } else {
            console.error("Biến result không có giá trị hoặc không có thuộc tính 'text'.");
        }
        return (
            <div className="wrapper-sell">
                <div className="content_sell">
                    <div className="content_sell_left">
                        <Tabs onChange={this.handleTabChange} defaultActiveKey="1" type="editable-card" onEdit={this.onEdit}>
                            {this.state.tabList && this.state.tabList.map((tabinfo, index) => {
                                return (
                                    <Tabs.TabPane tab={<span><ProfileOutlined /> {tabinfo.tab}</span>}
                                        key={tabinfo.key}
                                        closable={index >= 0}>
                                        <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '350px' }}>
                                            <Col style={{ backgroundColor: 'rgb(0,0,0,0.2)', height: '50px', padding: '10px', display: 'flex' }}>
                                                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }} >STT</Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Ảnh SP</Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Mã</Col>
                                                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Tên SP</Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Số lượng</Col>
                                                <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Đơn giá</Col>
                                                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >Thành tiền</Col>
                                            </Col>
                                            {this.renderProductsForTab(this.state.activeTabKey)}
                                        </div>
                                    </Tabs.TabPane>
                                )
                            })}
                        </Tabs>

                        <div>
                            <hr />
                            <div>
                                <p style={{ fontWeight: 'bolder', fontSize: '20px' }}>Danh sách sản phẩm</p>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%', maxWidth: '500px' }}
                                    dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                                    optionLabelProp="ma"
                                    placeholder="Tìm kiếm sản phẩm"
                                    options={this.state.sanPhamChiTiet.map((option, index) => ({
                                        label: (
                                            <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                                <div>{index + 1}</div>
                                                <img style={{ height: '60px', width: '60px', float: 'left' }} src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda507d6073c4f44abb5d314d617250e_9366/Ultra_4DFWD_Running_Shoes_Grey_ID1686_HM1.jpg" />  {/** src={option.sanPham.anh} */}
                                                <div style={{ marginLeft: '75px' }}>{option.sanPham.ten} <br /> {'Size: '}{option.kichThuoc.giaTri} - {'Màu: '}{option.mauSac.ten}</div>
                                                <div style={{ marginLeft: '75px' }}> {'Giá: '}{option.donGia}{' VND'} - SL: {option.soLuong}</div>
                                            </div>
                                        ),
                                        value: option.ma,
                                    }))}
                                />

                                <Button style={{ color: 'black', backgroundColor: '#fff' }}>Thêm</Button>


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
                            </div>
                            <Flex wrap="wrap">
                                {this.state.sanPhamChiTiet && this.state.sanPhamChiTiet.map((sanPhamChiTiet, index) => {
                                    return (
                                        <Flex onClick={() => this.handleProductClick(sanPhamChiTiet, this.state.activeTabKey)} key={index} style={{ width: '50%', overflowX: 'auto', overflowY: 'auto', cursor: 'pointer' }} flex={'row'}>
                                            <div style={{ overflowX: 'auto', overflowY: 'auto' }} className="container_sell">
                                                <div> <img style={{ height: '60px', width: '60px', float: 'left' }} src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda507d6073c4f44abb5d314d617250e_9366/Ultra_4DFWD_Running_Shoes_Grey_ID1686_HM1.jpg" /></div>
                                                <div style={{ marginLeft: '75px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanPhamChiTiet.sanPham.ten}</div>
                                                <div style={{ marginLeft: '75px' }}>Size: {sanPhamChiTiet.kichThuoc.giaTri} - Màu: {sanPhamChiTiet.mauSac.ten}</div>
                                                <div style={{ marginLeft: '75px' }}>Giá: {sanPhamChiTiet.donGia} VND - SL: {sanPhamChiTiet.soLuong}</div>
                                            </div>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </div>
                    </div>
                    <div className="content_sell_right">
                        <div>
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: '10px'
                                }}
                                placeholder="Thêm khách hàng vào đơn"
                                optionLabelProp="label"
                                options={this.state.options}
                                optionRender={(option) => (
                                    <Space>

                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                            <div className="checkbox_sell">
                                <Checkbox onChange={this.onChangeCheckbox}>Giao hàng</Checkbox>
                            </div>
                            <div className="payment_sell">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Col>
                                        <Col style={{ fontSize: '16px', margin: '5px 0px 5px 0px' }}>Tổng tiền: ({this.getTotalQuantity()} sản phẩm)</Col>
                                        <Col style={{ fontSize: '16px' }}>Mã khuyến mãi: </Col>
                                        <Col style={{ fontSize: '16px', marginTop: '5px ' }}>Giảm giá:</Col>
                                    </Col>
                                    <Col style={{ width: '55%', borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span id="tongTien" style={{ color: 'red' }}>{this.getTotalAmount()}</span></Col>
                                        <Col style={{ fontSize: '16px', textAlign: 'right' }}><Input type="text" placeholder="Nhập mã..." style={{ width: '120px', float: 'left' }} /> <Button style={{ maxWidth: '75px', textAlign: 'center' }}>Áp dụng</Button></Col>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', marginTop: '5px' }}>0</Col>
                                    </Col>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
                                    <Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', margin: '5px 0px 5px 0px' }}>KHÁCH PHẢI TRẢ </Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px' }}>Tiền khách đưa</Col>
                                    </Col>
                                    <Col style={{ borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px', paddingBottom: '10px' }}>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span style={{ color: 'red' }}> {Math.max(0, this.getTotalAmount() - 0)}</span></Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'right' }}> <InputNumber min={1} onChange={this.onChangePay} style={{ border: 'none', fontSize: '19px', width: '210px' }} /></Col>
                                    </Col>
                                </div>
                            </div>

                            <Flex flex={"row"} align="center" justify="space-between">
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Tiền thừa trả khách</p>
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>250.000</span></p>
                            </Flex>
                        </div>
                        <div>
                            <Input id="ghiChuDonHang" placeholder="Nhập ghi chú đơn hàng" />
                            <br />
                            <br />
                            <Flex justify="space-between">
                                <Button style={{ width: '40%', height: '70px', backgroundColor: 'rgba(255, 255, 0, 0.3)', fontWeight: 'bolder', fontSize: '20px' }}>In tạm tính</Button>
                                <Button style={{ width: '55%', height: '70px', backgroundColor: 'rgba(144, 238, 144)', fontWeight: 'bolder', fontSize: '20px' }} onClick={this.add}>Thanh toán</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BanHangOffline;