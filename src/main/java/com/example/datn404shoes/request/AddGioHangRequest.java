package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.entity.TaiKhoan;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddGioHangRequest {
    private SanPhamChiTiet spct;
    private Integer soLuong;
    private TaiKhoan nguoiDung;
}
