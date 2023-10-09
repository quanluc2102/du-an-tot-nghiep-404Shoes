package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamDanhMuc;
import com.example.datn404shoes.request.SanPhamDanhMucRequest;

import java.util.List;

public interface SanPhamDanhMucService {
    SanPhamDanhMuc add(SanPhamDanhMucRequest sanPhamDanhMucRequest);
    SanPhamDanhMuc update(Long idud,SanPhamDanhMucRequest sanPhamDanhMucRequest);
    void delete(Long id);
    SanPhamDanhMuc detail(Long id);
    List<SanPhamDanhMuc> getAll();
    SanPhamDanhMuc getOne(Long id);
}
