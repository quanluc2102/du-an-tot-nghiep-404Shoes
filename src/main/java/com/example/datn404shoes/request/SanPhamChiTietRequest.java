package com.example.datn404shoes.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamChiTietRequest {

    private long kichThuoc;
    private long mauSac;

    private Integer donGia;
    private Integer soLuong;
    private String anh;
}
