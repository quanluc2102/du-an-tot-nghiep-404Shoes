package com.example.datn404shoes.DTO;

import lombok.Builder;
import lombok.Data;

import java.sql.Date;
@Data
@Builder
public class TaiKhoanDTO {
    private String ten;
    private String sdt;
    private Date ngaySinh;
    private String email;
    private String password;
    private Long thongTinNguoiDungId;
}
