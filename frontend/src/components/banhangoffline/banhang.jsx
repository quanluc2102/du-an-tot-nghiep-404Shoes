import React, { Fragment, useRef, useState } from "react";
import { Button, Col, Table, Tabs } from "antd";
import { ProfileOutlined, DeleteOutlined } from "@ant-design/icons/lib/icons";

function BanHangOffline() {

    const [tabList, setTabList] = useState([
    ]);

    const nextTabIndex = useRef(2)

    const onEdit = (tabKey, action) => {
        if (action === 'add' && tabList.length < 5) {
            setTabList(pre => [
                ...pre,
                {
                    tab: `New Tab ${nextTabIndex.current}`,
                    key: `${nextTabIndex.current}`
                }]);
            nextTabIndex.current += 1
        } else if (action === 'remove') {
            setTabList(pre => [...pre.filter(tab => tab.key !== tabKey)])
        } else {
            alert("Hàng chờ đã đầy! Không thể tạo thêm hóa đơn ");
        }
    };

    const onDelete = (tabKey) => {
        setTabList(pre => [...pre.filter(tab => tab.key !== tabKey)]);
    };

    {/*fix data table san pham */ }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data = [];
    for (let i = 0; i < 46; i++) {
        data.push({
            key: i,
            name: `Edward King ${i}`,
            age: 32,
            address: `London, Park Lane no. ${i}`,
        });
    }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    {/*end fix data san pham */ }


    return (
        <aside>
            <br />
            <br />
            <Tabs defaultActiveKey="1" type="editable-card" onEdit={onEdit}>
                {tabList.map((tabinfo, index) => {
                    return (
                        <Tabs.TabPane tab={
                            <span><ProfileOutlined /> {tabinfo.tab}</span>}
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
                                            onClick={() => onDelete(tabinfo.key)}
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

            <hr />
            <br />
            <hr />
            <Button style={{ marginTop: '20px' }} > Thêm sản phẩm</Button>
            <Button style={{ marginTop: '20px', marginLeft: '30px' }} >Quét QR</Button>

            {/* start test table san pham */}
            <div>
                <div
                    style={{
                        marginBottom: 6,
                    }}
                >
                    <span
                        style={{
                            marginLeft: 8,
                        }}
                    >
                        {hasSelected ? `Đã chọn ${selectedRowKeys.length} sản phẩm` : ''}
                    </span>
                </div>
                <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
            {/*end test table san pham */}
            </aside>
    )
}

export default BanHangOffline;