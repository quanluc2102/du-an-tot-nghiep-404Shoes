package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamThuongHieu;

import java.util.List;

public interface SanPhamThuongHieuService {
    void add(SanPhamThuongHieu sanPhamThuongHieu);
    void delete(Long id);
    void detail(Long id,SanPhamThuongHieu sanPhamThuongHieu);
    List<SanPhamThuongHieu> getAll();
    SanPhamThuongHieu getOne(Long id);
}
