package com.example.datn404shoes.DTO;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import lombok.Data;

import java.util.List;

@Data
public class ThanhToanDTO {
    private HoaDon hoaDon;

    private List<SanPhamChiTiet> sanPhamChiTietList;
}
