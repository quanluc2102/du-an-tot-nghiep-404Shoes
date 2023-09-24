package com.example.datn404shoes.service;


import com.example.datn404shoes.entity.SanPhamKhuyenMai;

import java.util.List;
import java.util.Optional;

public interface SanPhamKhuyenMaiService {
    List<SanPhamKhuyenMai>getAll();
    void add(SanPhamKhuyenMai spkm);
    void delete(Long id);
    Optional<SanPhamKhuyenMai>detail(Long id);
}
