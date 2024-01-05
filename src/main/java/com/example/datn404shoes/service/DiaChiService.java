package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.GioHangChiTiet;

import java.util.List;

public interface DiaChiService {
    void add(DiaChi diaChi);
    List<DiaChi> getAll();
    DiaChi getOne(Long id);
    List<DiaChi> getAllByIdTTND(Long id);
    void update(DiaChi diaChi);
    void updateOrAdd(DiaChi diaChi);
}

