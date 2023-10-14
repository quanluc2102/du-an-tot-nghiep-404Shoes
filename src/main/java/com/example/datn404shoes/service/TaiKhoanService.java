package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.XuatXu;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface TaiKhoanService {
    TaiKhoan add(TaiKhoan taiKhoan);

    void delete(Long id);

    TaiKhoan update(Long id, TaiKhoan taiKhoan);

    List<TaiKhoan> getAll();

    TaiKhoan getOne(Long id);
}
