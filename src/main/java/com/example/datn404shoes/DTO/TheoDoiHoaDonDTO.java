package com.example.datn404shoes.DTO;


import lombok.Data;

@Data
public class TheoDoiHoaDonDTO {
    private String maHoaDon;
    private String sdt;

    public String getsdtString() {
        return sdt;
    }

    public void setsdtString(String sdt) {
        this.sdt = sdt;
    }


    public String getMaHoaDonString() {
        return maHoaDon;
    }

    public void stetMaHoaDonString(String maHoaDon) {
        this.maHoaDon = maHoaDon;
    }
}
