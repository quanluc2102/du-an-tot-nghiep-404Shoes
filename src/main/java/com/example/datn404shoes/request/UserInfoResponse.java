package com.example.datn404shoes.request;


import lombok.Data;

import java.sql.Date;

@Data
public class UserInfoResponse {
    private long id;
    private String maTaiKhoan;
    private String email;
    private String cccd;
    private String anh;
    private Integer gioiTinh;
    private Date ngaySinh;
    private String ten;
    private String sdt;
    private long diaChiId;
    private long thongTinNguoiDungId; // Thêm các trường cần thiết từ ThongTinNguoiDung
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
    private String diaChiCuThe;

}
