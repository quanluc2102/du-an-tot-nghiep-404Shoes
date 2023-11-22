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

const { Search } = Input;
class BanHangOffline extends Component {
    constructor(props) {
        super(props);


        this.state = {
            tabList: [],
            selectedRowKeys: [],
            loading: false,
            productList: [
                {
                    id: 1,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 2,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 3,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 4,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 5,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
        name: 'Nike',
                    price: 500.000
                },
                {
                    id: 6,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 7,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                },
                {
                    id: 8,
                    masp: 'sp1',
                    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/67031162-9cc5-481d-8ffe-7ada8f3d78bd/custom-nike-air-force-1-high-by-you-shoes.png',
                    name: 'Nike',
                    price: 500.000
                }
            ],
            options: [
                {
                    label: 'Tiến Hùng',
                    value: 'Tiến Hùng',
                    desc: 'Tiến Hùng(0123456789)',
                },
                {
                    label: 'Tiến Hùng',
                    value: 'Tiến Hùng',
                    desc: 'Tiến Hùng(0123456789)',
                },
                {
                    label: 'Tiến Hùng',
                    value: 'Tiến Hùng',
                    desc: 'Tiến Hùng(0123456789)',
                },
                {
                    label: 'Tiến Hùng',
                    value: 'Tiến Hùng',
                    desc: 'Tiến Hùng(0123456789)',
                },
            ],
            priceDemo: ['100.000', '150.000', '200.000', '250.000', '300.000', '350.000'],
        };
        this.nextTabIndex = 1
    }

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
                    this.nextTabIndex = 1;
                }
                return { tabList: newTabList };
            });
        } else {
            alert('Hàng chờ đã đầy');
        }
    };

    // onAddProduct = (product) => {
    //     let cart = localStorage.getItem('cart');
    //     cart = cart ? JSON.parse(cart) : [];
        
    //     let existingProduct = cart.find(item => item.id === product.id);
    //     if (existingProduct) {
    //         existingProduct.quantity += 1;
    //     } else {
    //         cart.push(product);
    //     }
    
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     console.log('cart', cart);
    // }
    
    onDelete = tabKey => {
        this.setState(prevState => {
            const newTabList = prevState.tabList.filter(tab => tab.key !== tabKey);
            if (newTabList.length === 0) {
                this.nextTabIndex = 1;
            }
            return { tabList: newTabList };
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
            <div id="wrapper">
                <div id="header">
                    <div id="header_content_left">
                        <Search placeholder="Thêm sản phẩm vào đơn" enterButton />

                    </div>
                    <div id="header_content_right">

                    </div>
                </div>
                <div id="content">
                    <div id="content_left">
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

                                            <Col style={{ backgroundColor: '#fff', height: '75px', padding: '10px', display: 'flex', alignItems: 'center' }}>
                                                <Col span={1} style={{ fontWeight: 'bold', fontSize: '15px' }} >1</Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} ><img style={{ height: '60px', width: '60px' }} src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dda507d6073c4f44abb5d314d617250e_9366/Ultra_4DFWD_Running_Shoes_Grey_ID1686_HM1.jpg" /></Col>
                                                <Col span={3} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} >SP007</Col>
                                                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} >Giày thể thao adidas siêu vjp </Col>
                                                <Col span={2} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} > <input type="number" className="soLuong" min="1" style={{ width: '50px' }} /></Col>
                                                <Col span={4} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >150.000 VND</Col>
                                                <Col span={5} style={{ fontWeight: 'bold', fontSize: '15px', textAlign: 'center' }} >450.000 VND</Col>
                                                <Col span={1} style={{ transition: 'color 0.3s' }}>
                                                    <DeleteOutlined
                                                        onClick={() => this.onDelete(tabinfo.key)}
                                                        style={{ cursor: 'pointer' }}
                                                        onMouseEnter={(e) => e.target.style.color = 'red'}
                                                        onMouseLeave={(e) => e.target.style.color = 'black'}
                                                    />
                                                </Col>
                                            </Col>
                                        </div>
                                    </Tabs.TabPane>
                                )
                            })}
                        </Tabs>

                        <div>
                            <p>Danh sách sản phẩm</p>
                            <Flex wrap="wrap">
                                {this.state.productList && this.state.productList.map((item, index) => {
                                    return (
                                        <Flex key={index} style={{ width: '20%' }} flex={'row'}>
                                            <img style={{ width: '100px', height: '100px' }} src={item.image} alt={item.masp} />
                                            <Flex flex={'column'}>
                                                <p>{item.name}</p>
                                                <p>{item.price}</p>
                                            </Flex>
                                        </Flex>
                                    )
                                })}
                            </Flex>
                        </div>
                    </div>
                    <div id="content_right">
                        <div>
                            <Select
                                mode="multiple"
                                style={{
                                    width: '100%',
                                    borderBottomWidth: '10px'
                                }}
                                placeholder="Thêm khách hàng vào đơn"
                                // onChange={handleChange}
                                optionLabelProp="label"
                                options={this.state.options}
                                optionRender={(option) => (
                                    <Space>
                                        {option.data.desc}
                                    </Space>
                                )}
                            />
                            <div id="checkbox">
                                <Checkbox onChange={this.onChangeCheckbox}>Giao hàng</Checkbox>
                            </div>
                            <div id="payment">
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                    <Col>
                                        <Col style={{ fontSize: '16px', margin: '5px 0px 5px 0px' }}>Tổng tiền: (8 sản phẩm)</Col>
                                        <Col style={{ fontSize: '16px' }}>VAT(%)</Col>
                                        <Col style={{ fontSize: '16px', marginTop: '5px ' }}>Chiết khấu</Col>
                                    </Col>
                                    <Col style={{ width: '20%', borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}>222.500</Col>
                                        <Col style={{ fontSize: '16px', textAlign: 'right' }}>0</Col>
                                        <Col style={{ fontSize: '16px', textAlign: 'right', marginTop: '5px' }}>0</Col>
                                    </Col>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
                                    <Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', margin: '5px 0px 5px 0px' }}>KHÁCH PHẢI TRẢ </Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px' }}>Tiền khách đưa</Col>
                                    </Col>
                                    <Col style={{ borderStyle: 'solid', borderTop: 'none', borderRight: 'none', borderLeft: 'none', borderWidth: '1px', paddingBottom: '10px' }}>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'right', margin: '5px 0px 5px 0px' }}>222.500</Col>
                                        <Col style={{ fontWeight: 'bold', fontSize: '16px', textAlign: 'right' }}><InputNumber onChange={this.onChangePay} style={{ border: 'none', fontSize: '19px' }} /></Col>
                                    </Col>
                                </div>
                            </div>
                            <Flex style={{ marginTop: '10px', marginBottom: '10px', borderStyle: 'solid', borderWidth: '1px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', paddingBottom: '10px' }} justify="space-between" wrap="wrap" gap={"small"} align="center">
                                {this.state.priceDemo && this.state.priceDemo.map((item, index) => {
                                    return (
                                        <Button key={index} style={{ width: '120px' }} shape="round">{item}</Button>
                                    )
                                })}
                            </Flex>
                            <Flex flex={"row"} align="center" justify="space-between">
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Tiền thừa trả khách</p>
                                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>4.500</p>
                            </Flex>
                        </div>
                        <div>
                            <Input placeholder="Nhập ghi chú đơn hàng" />
                            <Flex justify="space-between">
                                <Button style={{ width: '40%', height: '70px' }}>In tạm tính</Button>
                                <Button style={{ width: '55%', height: '70px' }}>Thanh toán</Button>
                            </Flex>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BanHangOffline;