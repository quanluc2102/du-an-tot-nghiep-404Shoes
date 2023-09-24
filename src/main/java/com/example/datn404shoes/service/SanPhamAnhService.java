package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamAnh;

import java.util.List;

public interface SanPhamAnhService {
    void save(SanPhamAnh spa);
    void delete(Long id);
    List<SanPhamAnh> getAll();
    SanPhamAnh getOne(Long id);
}
