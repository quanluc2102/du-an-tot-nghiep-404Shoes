package com.example.datn404shoes.DTO;


import lombok.Data;

@Data
public class TheoDoiHoaDonDTO {
    private String maHoaDon;
    private String email;

    public String getemailString() {
        return email;
    }

    public void setemailString(String email) {
        this.email = email;
    }


    public String getMaHoaDonString() {
        return maHoaDon;
    }

    public void stetMaHoaDonString(String maHoaDon) {
        this.maHoaDon = maHoaDon;
    }
}
