package com.example.datn404shoes.DTO;

import jakarta.persistence.Column;
import lombok.Data;

import java.sql.Date;
@Data
public class XuatHoaDonDto {
    private Long id;
    private String maHoaDon;
    private Float tongTien;
    private String sdt;
    private String ten;
    private String diaChiCuThe;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
    private Float phiShip;
    private Float tienGiam;
    private Float tongTienSauGiam;

    public XuatHoaDonDto(Long id, String maHoaDon, Float tongTien, String sdt, String ten, String diaChiCuThe, String tinhThanhPho, String quanHuyen, String xaPhuongThiTran, Float phiShip, Float tienGiam, Float tongTienSauGiam) {
        this.id = id;
        this.maHoaDon = maHoaDon;
        this.tongTien = tongTien;
        this.sdt = sdt;
        this.ten = ten;
        this.diaChiCuThe = diaChiCuThe;
        this.tinhThanhPho = tinhThanhPho;
        this.quanHuyen = quanHuyen;
        this.xaPhuongThiTran = xaPhuongThiTran;
        this.phiShip = phiShip;
        this.tienGiam = tienGiam;
        this.tongTienSauGiam = tongTienSauGiam;
    }
}
