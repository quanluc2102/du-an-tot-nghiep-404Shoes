package com.example.datn404shoes.DTO;

import com.example.datn404shoes.entity.HoaDon;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.request.SPCTBanHangRequest;
import lombok.Data;

import java.util.List;

@Data
public class ThanhToanDTO {
    private HoaDon hoaDon;

    private Long khuyenMai;

    private List<SPCTBanHangRequest> sanPhamChiTietList;

    private String xaPhuongThiTran;

    private String quanHuyen;

    private String tinhThanhPho;

    private String diaChiCuThe;
}
