package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.DanhMuc;

import java.util.List;

public interface DanhMucService {
    void add(DanhMuc dm);
    void delete(Long id);
    void update(Long id,DanhMuc dm);
    List<DanhMuc> getAll();
    DanhMuc getOne(Long id);
}
