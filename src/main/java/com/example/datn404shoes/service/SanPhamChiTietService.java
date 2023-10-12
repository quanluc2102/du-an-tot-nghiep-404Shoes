package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamChiTiet;

import java.util.List;

public interface SanPhamChiTietService {
    SanPhamChiTiet getOne(Long id);
    List<SanPhamChiTiet> getAll();
    SanPhamChiTiet add(SanPhamChiTiet spct,Long ktmsId,Long spId);
    void delete(Long id);
    SanPhamChiTiet update(Long id,Long ktmsId,Long spId,SanPhamChiTiet spct);
}
