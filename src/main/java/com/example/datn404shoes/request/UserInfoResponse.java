package com.example.datn404shoes.request;


import lombok.Data;

@Data
public class UserInfoResponse {
    private long id;
    private String maTaiKhoan;
    private String email;
    private long thongTinNguoiDungId; // Thêm các trường cần thiết từ ThongTinNguoiDung

}
