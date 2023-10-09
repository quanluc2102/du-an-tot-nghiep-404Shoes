package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamThuongHieu;
import com.example.datn404shoes.request.SanPhamThuongHieuRequest;

import java.util.List;

public interface SanPhamThuongHieuService {
    SanPhamThuongHieu add(SanPhamThuongHieuRequest sanPhamThuongHieuRequest);
    void delete(Long id);
    SanPhamThuongHieu update(Long id,SanPhamThuongHieuRequest sanPhamThuongHieuRequest);
    SanPhamThuongHieu detail(Long id);
    List<SanPhamThuongHieu> getAll();
    SanPhamThuongHieu getOne(Long id);
}
