package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuocMauSac;
import com.example.datn404shoes.entity.SanPham;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamChiTietRequest {

    private long sanPhamId;

    private long kichThuocMauSacId;

    private Integer soLuong;

    private Integer trangThai;
}
