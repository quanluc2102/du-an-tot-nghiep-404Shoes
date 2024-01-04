import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaClipboard,
  FaShippingFast,
  FaShoppingBag,
  FaBan,
} from "react-icons/fa";
import "./TimeLineOrder.css";
import { AiOutlineFileDone } from "react-icons/ai";
import { TiArrowRight } from "react-icons/ti";
import { FaHandshake } from "react-icons/fa";
import { format } from "date-fns";
import { BsBoxSeam } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";

const OrderStatus = ({ currentStatus, order }) => {
  const mandatoryStatusList = [
    { value: 0, label: "Chờ xác nhận", icon: IoDocumentTextOutline, dateKey: "ngayTao", note: "ghiChuXacNhan" },
    { value: 1, label: "Xác nhận", icon: AiOutlineFileDone, dateKey: "choXacNhan", note: "ghiChuChoXacNhan" },
    { value: 2, label: "Đóng gói", icon: BsBoxSeam, dateKey: "choGiao", note: "ghiChuChoGiao" },
    {
      value: 3,
      label: "Đang giao",
      icon: LiaShippingFastSolid,
      dateKey: "dangGiao",
      note: "ghiChuDangGiao",
    },
  ];

  const optionalStatusList = [
    {
      value: 4,
      label: "Hoàn thành",
      icon: FaHandshake,
      dateKey: "hoanThanh",
      note: "ghiChuHoanThanh",
    },
    { value: 7, label: "Hàng bị hoàn", icon: TiArrowRight },
  ];

  const shouldDisplayOptionalStatus =
    currentStatus === 4 || currentStatus === 6;
  const displayedOptionalStatus = optionalStatusList.find(
    (status) => status.value === currentStatus
  );

  return (
    <div className="order-status-container">
      {mandatoryStatusList.map((status, index) => {
        const isStatusActive = status.value <= currentStatus;
        const isCurrentStatus = status.value === currentStatus;
        const isLastStatus = index === mandatoryStatusList.length - 1;
        const statusDate = order[status.dateKey];

        // Check if the current status is 5
        if (currentStatus === 5) {
          // If the current status being considered is not 5, hide it
          if (status.value !== 5) {
            return null;
          }
        }

        return (
          <React.Fragment key={status.value}>
            <div className={`status-item ${isStatusActive ? "active" : ""}`}>
              <div
                className={`status-circle ${isStatusActive ? "active" : ""} ${
                  isCurrentStatus ? "current" : ""
                }`}
              >
                <div
                  className={`status-border ${isCurrentStatus ? "green" : ""}`}
                ></div>
                {status.icon && (
                  <status.icon
                    className="status-icon"
                    aria-label={status.label}
                  />
                )}
              </div>
              <span
                className={`status-label ${isStatusActive ? "active" : ""} ${
                  isCurrentStatus ? "current" : ""
                }`}
              >
                {status.label}
              </span>
              {/* Display the corresponding date and time */}
              {isStatusActive && statusDate && (
                <div className="status-date">
                  {format(new Date(statusDate), "dd/MM/yyyy HH:mm:ss", { timeZone: "yourTimeZone" })}
                  {/* Display the note */}
                  {status.note && (
                    <div className="status-note">{order[status.note]}</div>
                  )}
                </div>
              )}
            </div>
            {!isLastStatus && status.value !== 5 && (
              <div
                className={`status-connector ${isStatusActive ? "active" : ""}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}

      {/* Separate "Hủy" status from other statuses */}
      {currentStatus === 5 && (
  <div className="status-item active">
    <div className="status-circle active">
      <div className="status-border"></div>
      <FaBan className="status-icon" aria-label="Đơn hàng bị hủy" />
    </div>
    <span className="status-label active">Hủy</span>
    {/* Display the corresponding date and time */}
    {order.cancelDate && (
      <div className="status-date">
        {format(new Date(order.cancelDate), "dd/MM/yyyy HH:mm:ss", { timeZone: "yourTimeZone" })}
        {/* Display the note */}
        {mandatoryStatusList[5].note && (
          <div className="status-note">{order[mandatoryStatusList[5].note]}</div>
        )}
      </div>
    )}
  </div>
)}

      {shouldDisplayOptionalStatus && displayedOptionalStatus && (
        <React.Fragment>
          <div className="status-connector"></div>
          <div className="status-item active">
            <div className="status-circle active">
              <div className="status-border green"></div>
              {displayedOptionalStatus.icon && (
                <displayedOptionalStatus.icon
                  className="status-icon"
                  aria-label={displayedOptionalStatus.label}
                />
              )}
            </div>
            <span className="status-label active">
              {displayedOptionalStatus.label}
            </span>
            {/* Display the corresponding date and time */}
            {order[displayedOptionalStatus.dateKey] && (
              <div className="status-date">
                {format(
                  new Date(order[displayedOptionalStatus.dateKey]),
                  "dd/MM/yyyy HH:mm:ss",
                  { timeZone: "yourTimeZone" }
                )}
                {/* Display the note */}
                {displayedOptionalStatus.note && (
                  <div className="status-note">{order[displayedOptionalStatus.note]}</div>
                )}
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default OrderStatus;
