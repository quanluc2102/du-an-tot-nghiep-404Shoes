package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.DanhMuc;

import java.util.List;

public interface DanhMucService {
    DanhMuc add(DanhMuc danhMuc);

    void delete(Long id);

    DanhMuc update(Long id, DanhMuc danhMuc);

    List<DanhMuc> getAll();

    DanhMuc getOne(Long id);
}
