package com.example.datn404shoes.DTO;

import lombok.Data;

@Data
public class HoaDonChiTietDto {
    private int soLuong;
    private String ten;
    private double giaBan;

    public HoaDonChiTietDto(int soLuong, String ten, double giaBan) {
        this.soLuong = soLuong;
        this.ten = ten;
        this.giaBan = giaBan;
    }
}
