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
            phone: ''
        };
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.nextTabIndex = 0
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
    }

    componentDidMount() {

        BanHangService.getSPCT().then((res) => {
            this.setState({ sanPhamChiTiet: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
        BanHangService.getKMTT().then((res) => {
            this.setState({ khuyenMai: res.data })
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
        BanHangService.getKhachHang().then((res) => {
            this.setState({ taiKhoan: res.data })
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

        const { tabProducts, activeTabKey } = this.state;
        const selectedProducts = tabProducts[activeTabKey] || [];

        const confirm = window.confirm('Bạn xác nhận muốn thanh toán hóa đơn này chứ?');
        if (!confirm) {
            return;
        }

        const ngayTao = new Date().toISOString();

        const thanhToan = {
            sanPhamChiTietList: selectedProducts,
            hoaDon: {
                tongTien: this.getTotalAmount(selectedProducts),
                ghiChu: document.getElementById("ghiChuDonHang").value
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
        if (products) {
            return products.reduce((total, product) => total + product.donGia * product.quantity, 0);
        } else {
            return 0;
        }
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
        // Update the state with the new quantity for the product with the given productId
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

    onDelete = (tabKey, productId) => {
        this.setState((prevState) => {
            const updatedProducts = prevState.tabProducts[tabKey].map((product) => {
                if (product.ma === productId) {
                    // Decrease the quantity by 1 if it's greater than 0
                    const newQuantity = Math.max(product.quantity - 1, 0);

                    // If the quantity is greater than 0, update the quantity
                    // Otherwise, remove the product from the list
                    return newQuantity > 0 ? { ...product, quantity: newQuantity } : null;
                }
                return product;
            });

            const updatedTabList = prevState.tabList.map((tab) => {
                if (tab.key === tabKey) {
                    // Remove the product from the tabList if its quantity becomes 0
                    return {
                        ...tab,
                        products: updatedProducts.filter((product) => product && product.quantity > 0),
                    };
                }
                return tab;
            });

            return {
                tabProducts: {
                    ...prevState.tabProducts,
                    [tabKey]: updatedProducts.filter((product) => product && product.quantity > 0),
                },
                tabList: updatedTabList,
            };
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
    handleAddToCart = () => {
        const { tabProducts, selectedRowKeys, activeTabKey } = this.state;

        // Get the selected products from the state based on selectedRowKeys
        const selectedProductsToAdd = this.state.sanPhamChiTiet
            .filter(product => selectedRowKeys.includes(product.ma))
            .map(product => ({ ...product, quantity: 1 }));

        // Get the existing products in the active tab
        const existingProducts = tabProducts[activeTabKey] || [];

        // Check if each selected product is already in the active tab
        selectedProductsToAdd.forEach(selectedProduct => {
            const existingProductIndex = existingProducts.findIndex(
                product => product.ma === selectedProduct.ma
            );

            if (existingProductIndex !== -1) {
                // If the product is already in the tab, increase its quantity by 1
                existingProducts[existingProductIndex].quantity += 1;
            } else {
                // If the product is not in the tab, add it with quantity 1
                existingProducts.push(selectedProduct);
            }
        });

        // Update the state with the modified tabProducts and clear selectedRowKeys
        this.setState(prevState => ({
            tabProducts: {
                ...prevState.tabProducts,
                [activeTabKey]: existingProducts,
            },
            selectedRowKeys: [], // Clear selectedRowKeys after adding to the cart
        }));

        // Reset the input value
        this.setState({ inputValue: '' });
    };

    onChangeSearchInput = (e) => {
        console.log("Event:", e);
        const inputValue = e.target.value;
        console.log("Input Value:", inputValue);
        this.setState({ inputValue });
    };
    render() {
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

                        <div>
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
                            </div>
                            <Flex wrap="wrap">
                                {this.state.sanPhamChiTiet && this.state.sanPhamChiTiet.map((sanPhamChiTiet, index) => {
                                    const handleChangeQuantity = () => {
                                        sanPhamChiTiet.soLuong -= 1
                                    }
                                    return (
                                        sanPhamChiTiet.soLuong <= 0 ? <></>
                                            : (<Flex onClick={() => this.handleProductClick(sanPhamChiTiet, this.state.activeTabKey)} key={index} style={{ width: '50%', overflowX: 'auto', overflowY: 'auto', cursor: 'pointer' }} flex={'row'}>
                                                <div onClick={handleChangeQuantity} style={{ overflowX: 'auto', overflowY: 'auto' }} className="container_sell">
                                                    <div> <img style={{ height: '60px', width: '60px', float: 'left' }} src={`/niceadmin/img/${sanPhamChiTiet.anh}`} /></div>
                                                    <div style={{ marginLeft: '75px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sanPhamChiTiet.sanPham.ten}</div>
                                                    <div style={{ marginLeft: '75px' }}>Size: {sanPhamChiTiet.kichThuoc.giaTri} - Màu: {sanPhamChiTiet.mauSac.ten}</div>
                                                    <div style={{ marginLeft: '75px' }}>Giá: {sanPhamChiTiet.donGia} VND</div>
                                                    <div style={{ marginLeft: '75px' }}>SL: {sanPhamChiTiet.soLuong}VND</div>
                                                </div>
                                            </Flex>)
                                    )
                                })}
                            </Flex>
                        </div>
                    </div>
                    <div className="content_sell_right">
                        <div>
                            <Select
                                mode="multiple"
                                style={{ width: '100%', maxWidth: '500px' }}
                                dropdownStyle={{ maxHeight: '300px', overflowY: 'auto' }}
                                optionLabelProp="label"
                                onChange={this.onChangeSearchInput}
                                placeholder="Thêm khách hàng vào hóa đơn"
                                options={this.state.taiKhoan.map((option, index) => ({
                                    label: (
                                        <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                                            <div >{option.thongTinNguoiDung.ten} {option.thongTinNguoiDung.sdt}</div>



                                        </div>

                                    ),
                                    value: option.ma,
                                }))}
                            />
                            <div className="checkbox_sell">
                                <Checkbox onChange={this.onChangeCheckbox}>Giao hàng</Checkbox>
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
                                        <Col style={{ fontSize: '16px', textAlign: 'left' }}><Select
                                            mode="multiple"
                                            style={{ width: '100%', maxWidth: '500px' }}
                                            dropdownStyle={{ maxHeight: '300px', overflowY: 'auto', width: '350px' }}
                                            optionLabelProp="label"
                                            onChange={this.onChangeSearchInput}
                                            placeholder="thêm khuyến mãi"
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
                                                value: option.ma + option.soLuong,
                                            }))}
                                        /></Col>
                                        {/* <Button style={{ maxWidth: '75px', textAlign: 'center' }}>Áp dụng</Button> */}
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