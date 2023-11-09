package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.GioHangChiTiet;

import java.util.List;

public interface DiaChiService {
    void add(DiaChi diaChi);
    List<DiaChi> getAll();

    void update(DiaChi diaChi);
}
