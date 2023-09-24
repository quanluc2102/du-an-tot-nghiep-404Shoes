package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamDanhMuc;

import java.util.List;

public interface SanPhamDanhMucService {
    void add(SanPhamDanhMuc sanPhamDanhMuc);
    void delete(Long id);
    void detail(Long id,SanPhamDanhMuc sanPhamDanhMuc);
    List<SanPhamDanhMuc> getAll();
    SanPhamDanhMuc getOne(Long id);
}
