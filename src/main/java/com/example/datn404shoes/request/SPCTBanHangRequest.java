package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class SPCTBanHangRequest {

    private long id;

    private String ma;

    private Date ngayTao;

    private Date ngayCapNhat;

    private Integer trangThai;

    private Integer soLuong;

    private double donGia;

    private String anh;

    private String qr;

    private KichThuoc kichThuoc;

    private MauSac mauSac;

    private SanPham sanPham;

    private Integer quantity;

}
