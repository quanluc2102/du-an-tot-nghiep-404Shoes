// ThongKeInfo.js
import React from 'react';

const ThongKeInfo = ({ currentDateRange, totalRevenue }) => {
    return (
        <div className="card-body">
            <h5 className="card-title">
                Tổng quan doanh thu <span>| {currentDateRange}</span>
            </h5>
            <div className="d-flex align-items-center">
                <div
                    className="card-icon rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                        border: '2px solid green',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                    }}
                >
                    <i className="bi bi-cart text-success"></i>
                </div>
                <div className="ps-3">
                    <h6 className="text-success pt-1 fw-bold">{totalRevenue} VND</h6>
                </div>
            </div>
        </div>
    );
};

export default ThongKeInfo;
