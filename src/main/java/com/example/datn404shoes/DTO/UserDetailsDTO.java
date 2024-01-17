package com.example.datn404shoes.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
@Getter
@Setter
@Data
public class UserDetailsDTO {
    private String anh;
    private String CCCD;
    private String ten;
    private Date ngaySinh;
    private int gioiTinh;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
    private String diaChiCuThe;
    private String sdt;
    private String email;
    private String password;

}
