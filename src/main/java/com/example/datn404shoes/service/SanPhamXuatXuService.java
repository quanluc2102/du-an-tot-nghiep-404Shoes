package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.SanPhamXuatXu;
import com.example.datn404shoes.request.SanPhamXuatXuRequest;

import java.util.List;

public interface SanPhamXuatXuService {
    SanPhamXuatXu add(SanPhamXuatXuRequest sanPhamXuatXuRequest);

    void delete(Long id);

    SanPhamXuatXu update(Long id, SanPhamXuatXuRequest sanPhamXuatXuRequest);

    List<SanPhamXuatXu> getAll();

    SanPhamXuatXu getOne(Long id);
    SanPhamXuatXu detail(Long id);
}
