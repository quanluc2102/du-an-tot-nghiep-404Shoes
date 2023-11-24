import React, { Component } from "react";
import './banhangoff.css'
import {
    Button,
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

const { Search } = Input;
class BanHangOffline extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProducts: [],
            sanPhamChiTiet: [],
            tabList: [],
            selectedRowKeys: [],
            loading: false,

            productList: [
                {
                    id: 1,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike 1',
                    price: 500.000
                },
            ],

            priceDemo: ['100.000', '150.000', '200.000', '250.000', '300.000', '350.000'],
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

    getTotalQuantity = () => {
        const { selectedProducts } = this.state;
        return selectedProducts.reduce((total, product) => total + product.quantity, 0);
    };

    getTotalAmount = () => {
        const { selectedProducts } = this.state;
        return selectedProducts.reduce((total, product) => total + product.donGia * product.quantity, 0);
    };

    handleProductClick = (sanPhamChiTiet) => {
        const { selectedProducts, indexProduct } = this.state;

        this.setState({
            indexProduct: indexProduct + 1,
        }, () => {
            const totalQuantity = this.getTotalQuantity();
            console.log('Tổng số sản phẩm:', totalQuantity);

            const totalAmount = this.getTotalAmount();
            console.log('Tổng số tiền:', totalAmount);
        });
    };

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

    handleProductClick = (productId) => {
        const { selectedProducts } = this.state;
        const selectedProduct = selectedProducts.find(item => item.ma === productId.ma);

        if (selectedProduct) {
            const updatedSelectedProducts = selectedProducts.map(item =>
                item.ma === productId.ma ? { ...item, quantity: item.quantity + 1 } : item
            );
            this.setState({ selectedProducts: updatedSelectedProducts });
        } else {
            const newSelectedProduct = { ...productId, quantity: 1 };
            const updatedSelectedProducts = [...selectedProducts, newSelectedProduct];
            this.setState({ selectedProducts: updatedSelectedProducts });
        }
    };

    onEdit = (tabKey, action) => {
        if (action === 'add' && this.state.tabList.length < 5) {
            this.setState(prevState => ({
                tabList: [
                    ...prevState.tabList,
                    {
                        tab: `Đơn hàng ${this.nextTabIndex}`,
                        key: `${this.nextTabIndex}`
                    }
                ]
            }));
            this.nextTabIndex += 1;
        } else if (action === 'remove') {
            this.setState(prevState => {
                const newTabList = prevState.tabList.filter(tab => tab.key !== tabKey);
                if (newTabList.length === 0) {
                    this.nextTabIndex = 0;
                }
                return { tabList: newTabList };
            });
        } else {
            alert('Hàng chờ đã đầy');
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
        return (
            <div className="wrapper-sell">
                <div className="content_sell">
                    <div className="content_sell_left">
                        <Tabs defaultActiveKey="1" type="editable-card" onEdit={this.onEdit}>
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


                                            {this.state.selectedProducts.map((product, index) => (
                                                <Col style={{ backgroundColor: '#fff', height: '75px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                                                    <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }} >{index + 1}</Col>
                                                    <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} ><img style={{ height: '60px', width: '60px' }} src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda507d6073c4f44abb5d314d617250e_9366/Ultra_4DFWD_Running_Shoes_Grey_ID1686_HM1.jpg" /></Col>
                                                    <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} > {product.ma} </Col>
                                                    <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} > {product.sanPham.ten} </Col>
                                                    <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} > <input type="number" className="soLuong" min="1" style={{ width: '50px' }} value={product.quantity} /></Col>
                                                    <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >{product.donGia} VND</Col>
                                                    <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} > {product.donGia * product.quantity}VND</Col>
                                                    <Col span={1} style={{ transition: 'color 0.3s' }}>
                                                        <DeleteOutlined
                                                            onClick={() => this.onDelete(product.ma)}
                                                            style={{ cursor: 'pointer' }}
                                                            onMouseEnter={(e) => e.target.style.color = 'red'}
                                                            onMouseLeave={(e) => e.target.style.color = 'black'}
                                                        />
                                                    </Col>
                                                </Col>
                                            ))}

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

                                <Button style={{ float: 'right', marginRight: '20px', color: 'black', backgroundColor: '#fff' }}>Quét QR</Button>

                            </div>
                            <Flex wrap="wrap">
                                {this.state.sanPhamChiTiet && this.state.sanPhamChiTiet.map((sanPhamChiTiet, index) => {
                                    return (
                                        <Flex onClick={() => this.handleProductClick(sanPhamChiTiet)} key={index} style={{ width: '50%', overflowX: 'auto', overflowY: 'auto', cursor: 'pointer' }} flex={'row'}>
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
                                        <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}><span style={{ color: 'red' }}>{this.getTotalAmount()}</span></Col>
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
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'right' }}><InputNumber min={1} onChange={this.onChangePay} style={{ border: 'none', fontSize: '19px', width: '210px' }} /></Col>
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
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}><span style={{ color: 'red' }}>250.000</span></p>
                            </Flex>
                        </div>
                        <div>
                            <Input placeholder="Nhập ghi chú đơn hàng" />
                            <br />
                            <br />
                            <Flex justify="space-between">
                                <Button style={{ width: '40%', height: '70px', backgroundColor: 'rgba(255, 255, 0, 0.3)', fontWeight: 'bolder', fontSize: '20px' }}>In tạm tính</Button>
                                <Button style={{ width: '55%', height: '70px', backgroundColor: 'rgba(144, 238, 144)', fontWeight: 'bolder', fontSize: '20px' }}>Thanh toán</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BanHangOffline;