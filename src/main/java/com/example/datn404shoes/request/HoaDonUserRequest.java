package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.entity.KhuyenMai;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HoaDonUserRequest {
    private List<GioHangChiTiet> gioHang;
    private Long km;
    private Integer tongTien;
    private Integer tongTienSauKhiGiam;
    private Integer tienShip;
    private Integer tienGiam;
    private Long taiKhoanId;
    private Long diaChiId;
    private Long thanhToanId;
    private String ghiChu;
}
