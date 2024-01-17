package com.example.datn404shoes.service;

import com.example.datn404shoes.custom.TaiKhoanVaThongTin;
import com.example.datn404shoes.entity.TaiKhoan;

public interface TaiKhoanVaThongTinService {
    TaiKhoanVaThongTin getOneByEmail(String email);
}
