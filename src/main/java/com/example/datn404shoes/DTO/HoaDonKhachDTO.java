package com.example.datn404shoes.DTO;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import com.example.datn404shoes.request.SPCTBanHangRequest;
import lombok.Data;

import java.util.List;

@Data
public class HoaDonKhachDTO {
    private Long hoaDonId;
    private String maHoaDon;
    private List<ChiTietHoaDonDTO> chiTietHoaDon;

    // Constructors, getters, and setters
}
